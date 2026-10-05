import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { login, navigate } = useApp();
  const [form, setForm] = useState({ name: '', email: '', studentId: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.studentId || !form.password)
      return setError('Please fill in all fields.');
    if (form.password !== form.confirm)
      return setError('Passwords do not match.');
    if (form.password.length < 6)
      return setError('Password must be at least 6 characters.');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    login(form.email, form.password, { name: form.name, studentId: form.studentId });
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
          <h1 className="font-display text-4xl text-[#141412] mb-1">Create account.</h1>
          <p className="text-[#7A7970] text-sm mb-8">Join SmartBite and spend your break enjoying your food.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full name', type: 'text', placeholder: 'Arjun Sharma' },
              { key: 'email', label: 'College email', type: 'email', placeholder: 'you@college.edu' },
              { key: 'studentId', label: 'Student ID', type: 'text', placeholder: 'CS2021042' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-[#7A7970] mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={set(f.key)}
                  placeholder={f.placeholder}
                  className="w-full border border-[#E2E0D8] bg-white rounded-xl px-4 py-3 text-sm text-[#141412] placeholder:text-[#C8C6BC] focus:border-[#141412] transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-[#7A7970] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="At least 6 characters"
                  className="w-full border border-[#E2E0D8] bg-white rounded-xl px-4 py-3 text-sm text-[#141412] placeholder:text-[#C8C6BC] focus:border-[#141412] transition-colors pr-10"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7970]">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#7A7970] mb-1.5">Confirm password</label>
              <input
                type={showPw ? 'text' : 'password'}
                value={form.confirm}
                onChange={set('confirm')}
                placeholder="Repeat password"
                className="w-full border border-[#E2E0D8] bg-white rounded-xl px-4 py-3 text-sm text-[#141412] placeholder:text-[#C8C6BC] focus:border-[#141412] transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-[#B04040] bg-[#FDF2F2] px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#141412] text-white text-sm font-medium py-3 rounded-xl hover:bg-[#2A6B43] transition-colors disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E2E0D8] text-center">
            <p className="text-sm text-[#7A7970]">
              Already have an account?{' '}
              <button onClick={() => navigate('login')} className="text-[#141412] font-medium hover:text-[#2A6B43] transition-colors">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
