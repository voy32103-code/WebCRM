import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Tải biến môi trường từ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Khởi tạo Gemini AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Middleware
app.use(cors());
app.use(express.json());

// Thiết lập kết nối CSDL PostgreSQL với pg_pool
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Khởi tạo Database và Table
const initDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Đã kết nối thành công tới Database PostgreSQL (Neon)');
    
    // Tự động tạo bảng leads nếu chưa có
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        ai_draft TEXT,
        status VARCHAR(50) DEFAULT 'MỚI',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    // Đảm bảo cột notes tồn tại (do cập nhật thêm sau)
    try {
      await client.query('ALTER TABLE leads ADD COLUMN notes TEXT;');
    } catch (e) {}

    // Tự động tạo bảng users
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Khởi tạo tài khoản Master Admin mặc định nếu DB trống
    const adminCheck = await client.query("SELECT * FROM users WHERE email = 'admin@studio.com'");
    if (adminCheck.rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('admin123', salt);
      await client.query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'admin')",
        ['admin@studio.com', hash]
      );
      console.log('✅ Đã tạo tài khoản Admin mặc định: admin@studio.com / admin123');
    }

    console.log('✅ Đã kiểm tra/khởi tạo bảng Database');
    client.release();
  } catch (err) {
    console.error('❌ Lỗi khởi tạo Database:', err);
  }
};
initDB();

// ================= API PHÂN QUYỀN (AUTH) =================

// Đăng Ký Tài Khoản
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Kiểm tra trùng
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) return res.status(400).json({ success: false, error: 'Email đã tồn tại!' });

    // Mã hoá mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Lưu và gán role là 'user'
    const newUser = await pool.query(
      "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'user') RETURNING id, email, role",
      [email, hash]
    );

    res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (error) {
    console.error('Lỗi Register:', error);
    res.status(500).json({ success: false, error: 'Lỗi Database: ' + error.message });
  }
});

// Đăng Nhập
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Tìm user
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userRes.rows.length === 0) return res.status(400).json({ success: false, error: 'Email không tồn tại!' });
    
    const user = userRes.rows[0];
    
    // So khớp mã băm
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Sai mật khẩu!' });

    delete user.password_hash;
    res.json({ success: true, user });
  } catch (error) {
    console.error('Lỗi Login:', error);
    res.status(500).json({ success: false, error: 'Lỗi hệ thống: ' + error.message });
  }
});


// --- Định nghĩa các API ---

// 1. API Test (Kiểm tra Server chạy bình thường)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Ok', message: 'Backend Server đang khởi chạy!' });
});

// 2. API Test truy vấn tới Database
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time;');
    res.json({
      success: true,
      message: 'Kết nối Database thành công!',
      timestamp: result.rows[0].current_time
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Database lỗi' });
  }
});

// 3. API Thêm Khách hàng mới (Leads) vào DB
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, message, aiDraft, status, notes } = req.body;
    
    const result = await pool.query(
      `INSERT INTO leads (name, email, message, ai_draft, status, notes) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, email, message, aiDraft || '', status || 'MỚI', notes || '']
    );
    
    res.status(201).json({
      success: true,
      message: 'Lưu khách hàng thành công',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Lỗi API POST /api/leads:', error);
    res.status(500).json({ success: false, error: 'Không thể lưu dữ liệu' });
  }
});

// 4. Lấy danh sách khách hàng (GET)
app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// 4.1. Lấy danh sách khách hàng theo Email (Dành cho Khách hàng)
app.get('/api/user-leads/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await pool.query('SELECT * FROM leads WHERE email = $1 ORDER BY created_at DESC', [email]);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Lỗi API GET /api/user-leads/:email :', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// 5. Cập nhật trạng thái hoặc ghi chú (PUT)
app.put('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    let updateQuery = [];
    let values = [];
    let counter = 1;
    
    if (status !== undefined) {
      updateQuery.push(`status = $${counter++}`);
      values.push(status);
    }
    if (notes !== undefined) {
      updateQuery.push(`notes = $${counter++}`);
      values.push(notes);
    }
    
    if (updateQuery.length === 0) return res.status(400).json({ error: 'No fields to update' });
    
    values.push(id);
    const sql = `UPDATE leads SET ${updateQuery.join(', ')} WHERE id = $${counter} RETURNING *`;
    
    const result = await pool.query(sql, values);
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// 6. Xoá khách hàng (DELETE)
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM leads WHERE id = $1', [id]);
    res.json({ success: true, message: 'Đã xoá thành công' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// 7. Gửi email trực tiếp cho khách hàng (POST)
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ success: false, error: 'Chưa cấu hình thông tin SMTP_USER và SMTP_PASS trên server' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: subject || 'Phản hồi từ Antigravity Studio',
      text
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Đã gửi email thành công', messageId: info.messageId });
  } catch (error) {
    console.error('Lỗi API POST /api/send-email:', error);
    res.status(500).json({ success: false, error: 'Gửi email thất bại: ' + error.message });
  }
});

// 8. AI: Gemini soạn nội dung email cá nhân hoá
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

Hãy soạn một email phản hồi chuyên nghiệp bằng tiếng Việt để gửi cho khách hàng này.
Email phải:
1. Cá nhân hoá theo tên và nhu cầu thực sự của khách hàng
2. Phân tích đúng intent (giá, timeline, loại dịch vụ...)
3. Đề xuất bước tiếp theo rõ ràng
4. Tone: chuyên nghiệp nhưng thân thiện
5. Độ dài: 150-250 từ

Trả về JSON với đúng 2 trường: {"subject": "...", "body": "..."}`;

    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON từ response (Gemini đôi khi wrap trong markdown code block)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Gemini không trả về JSON hợp lệ');
    const draft = JSON.parse(jsonMatch[0]);

    res.json({ success: true, subject: draft.subject, body: draft.body });
  } catch (error) {
    console.error('Lỗi /api/ai/draft-email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 9. AI: Gemini phân tích lead và gợi ý chiến lược tiếp cận
app.post('/api/ai/analyze-lead', async (req, res) => {
  try {
    const { lead } = req.body;
    if (!lead) return res.status(400).json({ success: false, error: 'Thiếu thông tin lead' });

    const prompt = `Bạn là chuyên gia CRM và bán hàng của Antigravity Studio - agency thiết kế web cao cấp.

Thông tin khách hàng tiềm năng:
- Tên: ${lead.name || 'Không rõ'}
- Email: ${lead.email}
- Yêu cầu: "${lead.message || 'Không có'}"
- Trạng thái: ${lead.status}
- Ngày gửi: ${new Date(lead.date).toLocaleDateString('vi-VN')}
- Phụ trách: ${lead.assignee || 'Chưa gán'}
- Số lần liên hệ: ${lead.comments?.length || 0}

Hãy phân tích và đưa ra gợi ý tiếp cận tốt nhất. Bao gồm:
1. Đánh giá mức độ tiềm năng của lead này
2. Chiến lược tiếp cận phù hợp nhất
3. Cảnh báo hoặc điểm cần lưu ý

Viết bằng tiếng Việt, súc tích, tối đa 120 từ. Không dùng markdown, chỉ dùng text thuần.`;

    const result = await geminiModel.generateContent(prompt);
    const analysis = result.response.text();

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('Lỗi /api/ai/analyze-lead:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server Backend dang chay tai http://localhost:${PORT}`);
});
