import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Error Boundary — bắt lỗi runtime của toàn bộ component tree con.
 * Hiển thị fallback UI thay vì crash màn hình trắng.
 *
 * @example
 * <ErrorBoundary>
 *   <Dashboard />
 * </ErrorBoundary>
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to monitoring service in production (e.g. Sentry)
    console.error('[ErrorBoundary] Caught an error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Đã xảy ra lỗi không mong muốn</h2>
            <p className="text-white/50 text-sm mb-2">
              Hệ thống gặp phải lỗi và không thể tiếp tục. Vui lòng thử tải lại trang.
            </p>
            {this.state.error && (
              <p className="text-red-400/70 text-xs font-mono bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-left break-all">
                {this.state.error.message}
              </p>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Thử lại
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white text-sm font-medium transition-colors"
              >
                Tải lại trang
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
