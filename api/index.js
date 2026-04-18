import express from 'express';
import cors from 'cors';
import pg from 'pg';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

// Khởi tạo Gemini AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Khởi tạo DB (chạy 1 lần)
let dbInitialized = false;
const initDB = async () => {
  if (dbInitialized) return;
  dbInitialized = true;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        ai_draft TEXT,
        status VARCHAR(50) DEFAULT 'MỚI',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const adminCheck = await pool.query("SELECT * FROM users WHERE email = 'admin@studio.com'");
    if (adminCheck.rows.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await pool.query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'admin')",
        ['admin@studio.com', hash]
      );
    }
  } catch (err) {
    console.error('DB init error:', err);
  }
};

// ── AUTH ──────────────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  await initDB();
  try {
    const { email, password } = req.body;
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length > 0) return res.status(400).json({ success: false, error: 'Email đã tồn tại!' });
    const hash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'user') RETURNING id, email, role",
      [email, hash]
    );
    res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  await initDB();
  try {
    const { email, password } = req.body;
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userRes.rows.length === 0) return res.status(400).json({ success: false, error: 'Email không tồn tại!' });
    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Sai mật khẩu!' });
    delete user.password_hash;
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── HEALTH ────────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'Ok', message: 'Serverless Function đang chạy!' });
});

// ── LEADS ─────────────────────────────────────────────────────────────────────
app.post('/api/leads', async (req, res) => {
  await initDB();
  try {
    const { name, email, message, aiDraft, status, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO leads (name, email, message, ai_draft, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, message, aiDraft || '', status || 'MỚI', notes || '']
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/leads', async (req, res) => {
  await initDB();
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/user-leads/:email', async (req, res) => {
  await initDB();
  try {
    const result = await pool.query(
      'SELECT * FROM leads WHERE email = $1 ORDER BY created_at DESC',
      [req.params.email]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    let updateQuery = [], values = [], counter = 1;
    if (status !== undefined) { updateQuery.push(`status = $${counter++}`); values.push(status); }
    if (notes !== undefined)  { updateQuery.push(`notes = $${counter++}`);  values.push(notes); }
    if (updateQuery.length === 0) return res.status(400).json({ error: 'No fields to update' });
    values.push(id);
    const result = await pool.query(
      `UPDATE leads SET ${updateQuery.join(', ')} WHERE id = $${counter} RETURNING *`,
      values
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM leads WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Đã xoá thành công' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── EMAIL ─────────────────────────────────────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS)
      return res.status(500).json({ success: false, error: 'Chưa cấu hình SMTP' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: subject || 'Phản hồi từ Antigravity Studio',
      text
    });
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── AI ────────────────────────────────────────────────────────────────────────
app.post('/api/ai/draft-email', async (req, res) => {
  try {
    const { lead } = req.body;
    if (!lead) return res.status(400).json({ success: false, error: 'Thiếu thông tin lead' });
    const prompt = `Bạn là chuyên gia tư vấn bán hàng của Antigravity Studio - một agency thiết kế web cao cấp.
Khách hàng tiềm năng:
- Tên: ${lead.name || 'Không rõ'}
- Email: ${lead.email}
- Nội dung yêu cầu: "${lead.message || 'Không có'}"
- Trạng thái: ${lead.status || 'MỚI'}
Hãy soạn email phản hồi chuyên nghiệp tiếng Việt, cá nhân hoá, 150-250 từ.
Trả về JSON: {"subject": "...", "body": "..."}`;
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Gemini không trả về JSON hợp lệ');
    const draft = JSON.parse(jsonMatch[0]);
    res.json({ success: true, subject: draft.subject, body: draft.body });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/ai/analyze-lead', async (req, res) => {
  try {
    const { lead } = req.body;
    if (!lead) return res.status(400).json({ success: false, error: 'Thiếu thông tin lead' });
    const prompt = `Bạn là chuyên gia CRM của Antigravity Studio.
Thông tin lead:
- Tên: ${lead.name || 'Không rõ'}, Email: ${lead.email}
- Yêu cầu: "${lead.message || 'Không có'}"
- Trạng thái: ${lead.status}
Phân tích mức độ tiềm năng, chiến lược tiếp cận, cảnh báo. Tiếng Việt, tối đa 120 từ, text thuần.`;
    const result = await geminiModel.generateContent(prompt);
    res.json({ success: true, analysis: result.response.text() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export cho Vercel Serverless
export default app;
