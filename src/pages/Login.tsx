import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(email, password);
    if (!ok) { setError('Incorrect email or password.'); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
      <header className="border-b border-[#E2E0D8]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <button onClick={() => navigate('landing')} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#141412] flex items-center justify-center">
              <span className="font-mono text-[10px] font-medium text-white">SB</span>
            </div>
            <span className="font-semibold text-[#141412] text-sm tracking-tight">SmartBite</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-4xl text-[#141412] mb-1">Welcome back.</h1>
          <p className="text-[#7A7970] text-sm mb-8">Sign in to order ahead and skip the queue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#7A7970] mb-1.5">College email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="w-full border border-[#E2E0D8] bg-white rounded-xl px-4 py-3 text-sm text-[#141412] placeholder:text-[#C8C6BC] focus:border-[#141412] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A7970] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#E2E0D8] bg-white rounded-xl px-4 py-3 text-sm text-[#141412] placeholder:text-[#C8C6BC] focus:border-[#141412] transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7970] hover:text-[#141412]"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-[#B04040] bg-[#FDF2F2] px-3 py-2 rounded-lg">{error}</p>
            )}

            <div className="flex justify-end">
              <button type="button" className="text-xs text-[#7A7970] hover:text-[#141412] transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#141412] text-white text-sm font-medium py-3 rounded-xl hover:bg-[#2A6B43] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E2E0D8] text-center">
            <p className="text-sm text-[#7A7970]">
              New here?{' '}
              <button onClick={() => navigate('register')} className="text-[#141412] font-medium hover:text-[#2A6B43] transition-colors">
                Create an account
              </button>
            </p>
          </div>

          <div className="mt-6 bg-[#EAE9E3] rounded-xl p-4">
            <p className="text-xs text-[#7A7970] font-medium mb-2">Demo accounts</p>
            <p className="text-xs text-[#7A7970] font-mono">Student: any email / any password</p>
            <p className="text-xs text-[#7A7970] font-mono">Admin: admin@canteen.edu / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
