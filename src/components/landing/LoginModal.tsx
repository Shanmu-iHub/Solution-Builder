import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import snsLogo from '../../assets/SNS Square Logo.png';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.98)',
          border: '1px solid rgba(0,102,255,0.15)',
          animation: 'loginModalIn 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg,#0066FF,#00AAFF,#0066FF)' }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-8 py-8">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-7">
            <img src={snsLogo} alt="SNS Square" className="w-9 h-9 object-contain rounded-xl shadow-sm" />
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">Welcome back</h2>
              <p className="text-xs text-gray-500">Sign in to SNS Square</p>
            </div>
          </div>

          {/* Quick-fill hint */}
          <div className="mb-5 p-3 rounded-xl text-xs text-blue-700 flex items-start gap-2"
            style={{ background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.12)' }}>
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
            <span>Demo mode — enter any email & password to sign in.</span>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl text-xs text-red-700 flex items-center gap-2"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': '#0066FF40' } as React.CSSProperties}
                  onFocus={e => (e.target.style.borderColor = '#0066FF')}
                  onBlur={e => (e.target.style.borderColor = '')}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <button type="button" className="text-xs font-medium" style={{ color: '#0066FF' }}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  onFocus={e => (e.target.style.borderColor = '#0066FF')}
                  onBlur={e => (e.target.style.borderColor = '')}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 mt-2"
              style={{
                background: loading ? '#4D90FF' : 'linear-gradient(135deg,#0066FF,#0044CC)',
                boxShadow: '0 4px 14px rgba(0,102,255,0.35)',
              }}
              onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = '')}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Don't have an account?{' '}
              <button className="font-semibold" style={{ color: '#0066FF' }}>
                Request Access
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loginModalIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};
