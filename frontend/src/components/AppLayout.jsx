import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { CalendarDays, Home, LogOut, Plus, Users } from 'lucide-react';
import { useLang } from '../utils/i18n.js';

export default function AppLayout() {
  const navigate = useNavigate();
  const { lang, t, setLang } = useLang();

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('doctor');
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 pb-24">
      <header className="sticky top-0 z-10 border-b border-teal-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-600 text-2xl text-white shadow-lg">
              🦷
            </div>
            <div>
              <h1 className="text-lg font-black text-teal-900">{t.appTitle}</h1>
              <p className="text-xs text-slate-500">{t.appSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang('uz')} className={`rounded-full px-3 py-2 text-sm font-bold shadow-sm ${lang === 'uz' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'}`}>UZ</button>
            <button onClick={() => setLang('ru')} className={`rounded-full px-3 py-2 text-sm font-bold shadow-sm ${lang === 'ru' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'}`}>RU</button>
            <button onClick={logout} className="rounded-full bg-white p-3 text-slate-700 shadow-sm">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-teal-100 bg-white/90 backdrop-blur-xl shadow-2xl">
        <div className="mx-auto grid max-w-3xl grid-cols-4 px-2 py-2 text-xs">
          <NavItem to="/" icon={<Home size={20} />} label={t.dashboard} />
          <NavItem to="/patients" icon={<Users size={20} />} label={t.patients} />
          <NavItem to="/patients/new" icon={<Plus size={20} />} label={t.add.replace('+ ', '')} />
          <NavItem to="/followups" icon={<CalendarDays size={20} />} label={t.followups} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 rounded-2xl py-2 transition ${
          isActive ? 'bg-teal-100 text-teal-800 shadow-sm' : 'text-slate-500'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
