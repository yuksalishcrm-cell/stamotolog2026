import { useState } from 'react';
import { api } from '../api/client.js';

const TEXT = {
  uz: {
    title: 'Stamotolog Follow-Up',
    subtitle: 'Shifokorlar uchun bemor eslatma tizimi',
    name: 'Shifokor FISH',
    email: 'Email',
    phone: '+998901234567',
    password: 'Parol',
    login: 'Kirish',
    register: 'Ro‘yxatdan o‘tish',
    createAccount: 'Yangi akkaunt ochish',
    haveAccount: 'Akkaunt bor, kirish',
    error: 'Xatolik yuz berdi'
  },
  ru: {
    title: 'Stamotolog Follow-Up',
    subtitle: 'Система напоминаний для врачей',
    name: 'ФИО врача',
    email: 'Email',
    phone: '+998901234567',
    password: 'Пароль',
    login: 'Войти',
    register: 'Зарегистрироваться',
    createAccount: 'Создать аккаунт',
    haveAccount: 'Уже есть аккаунт, войти',
    error: 'Произошла ошибка'
  }
};

export default function Login() {
  const [mode, setMode] = useState('login');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
  const [form, setForm] = useState({
    name: '',
    phone: '+998',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const t = TEXT[lang];

  function changeLang(nextLang) {
    setLang(nextLang);
    localStorage.setItem('lang', nextLang);
  }

  async function submit(e) {
    e.preventDefault();
    setError('');

    try {
      const url = mode === 'login' ? '/auth/login' : '/auth/register';
      const { data } = await api.post(url, form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('doctor', JSON.stringify(data.doctor));
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || t.error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => changeLang('uz')}
            className={`rounded-full px-3 py-2 text-xl ${lang === 'uz' ? 'bg-teal-100' : 'bg-slate-100'}`}
            title="O‘zbekcha"
          >
            🇺🇿
          </button>
          <button
            type="button"
            onClick={() => changeLang('ru')}
            className={`rounded-full px-3 py-2 text-xl ${lang === 'ru' ? 'bg-teal-100' : 'bg-slate-100'}`}
            title="Русский"
          >
            🇷🇺
          </button>
        </div>

        <h1 className="text-2xl font-bold text-teal-800">{t.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.subtitle}</p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          {mode === 'register' && (
            <>
              <input
                className="input"
                placeholder={t.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="input"
                placeholder={t.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </>
          )}

          <input
            className="input"
            placeholder={t.phone}
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

          {error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button className="btn btn-primary w-full">
            {mode === 'login' ? t.login : t.register}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="mt-4 w-full text-sm text-teal-700"
        >
          {mode === 'login' ? t.createAccount : t.haveAccount}
        </button>
      </div>
    </div>
  );
}