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
    <div className="min-h-screen pb-24">
      <header className="glass-header sticky top-0 z-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="top-brand">
            <div className="top-brand-icon">🦷</div>
            <div>
              <h1 className="text-lg font-bold text-teal-800">{t.appTitle}</h1>
              <p className="text-xs text-slate-500">{t.appSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang('uz')} className={`lang-btn ${lang === 'uz' ? 'active' : ''}`}>🇺🇿</button>
            <button onClick={() => setLang('ru')} className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}>🇷🇺</button>
            <button onClick={logout} className="rounded-full border border-white/70 bg-white/90 p-3 shadow-sm transition hover:bg-slate-50">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5">
        <Outlet />
      </main>

      <nav className="bottom-nav fixed bottom-0 left-0 right-0">
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
          isActive ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
