import { useState } from 'react';
import { api } from '../api/client.js';
import { useLang } from '../utils/i18n.js';

export default function Login() {
  const [mode, setMode] = useState('login');
  const { lang, t, setLang } = useLang();
  const [form, setForm] = useState({ name: '', phone: '+998', password: '' });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');

    try {
      const url = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload =
        mode === 'login'
          ? { phone: form.phone, password: form.password }
          : { name: form.name, phone: form.phone, password: form.password };

      const { data } = await api.post(url, payload);
      localStorage.setItem('token', data.token);
      localStorage.setItem('doctor', JSON.stringify(data.doctor));
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || t.error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2.2rem] border border-teal-100 bg-white shadow-2xl">
          <div className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 px-6 pb-10 pt-6 text-white">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-14 -left-10 h-32 w-32 rounded-full bg-white/10" />

            <div className="relative z-10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setLang('uz')}
                className={`rounded-full px-3 py-2 text-sm font-bold ${lang === 'uz' ? 'bg-white text-teal-700' : 'bg-white/15 text-white'}`}
              >
                🇺🇿 UZ
              </button>
              <button
                type="button"
                onClick={() => setLang('ru')}
                className={`rounded-full px-3 py-2 text-sm font-bold ${lang === 'ru' ? 'bg-white text-teal-700' : 'bg-white/15 text-white'}`}
              >
                🇷🇺 RU
              </button>
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-white text-5xl shadow-xl">
                🦷
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">Dental CRM</p>
                <h1 className="mt-1 text-3xl font-black leading-tight">{t.loginTitle}</h1>
              </div>
            </div>

            <p className="relative z-10 mt-4 text-sm leading-6 text-white/85">
              {t.loginSubtitle}
            </p>
          </div>

          <div className="-mt-6 rounded-t-[2rem] bg-white px-6 pb-7 pt-8">
            <form onSubmit={submit} className="space-y-3">
              {mode === 'register' && (
                <input
                  className="input"
                  placeholder={t.doctorName}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              )}

              <input
                className="input"
                placeholder={t.phonePlaceholder}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="input"
                placeholder={t.password}
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

              <button className="btn btn-primary w-full">
                {mode === 'login' ? t.login : t.register}
              </button>
            </form>

            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="mt-4 w-full text-sm font-semibold text-teal-700"
            >
              {mode === 'login' ? t.createAccount : t.haveAccount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
