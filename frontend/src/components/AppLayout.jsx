import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { CalendarDays, Home, LogOut, Plus, Users } from 'lucide-react';

export default function AppLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('doctor');
    navigate('/login');
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-teal-800">Stamotolog</h1>
            <p className="text-xs text-slate-500">Follow-Up dashboard</p>
          </div>
          <button onClick={logout} className="rounded-full bg-slate-100 p-3">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="mx-auto grid max-w-3xl grid-cols-4 px-2 py-2 text-xs">
          <NavItem to="/" icon={<Home size={20} />} label="Dashboard" />
          <NavItem to="/patients" icon={<Users size={20} />} label="Bemorlar" />
          <NavItem to="/patients/new" icon={<Plus size={20} />} label="Qabul" />
          <NavItem to="/followups" icon={<CalendarDays size={20} />} label="Follow-up" />
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
        `flex flex-col items-center gap-1 rounded-2xl py-2 ${isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-500'}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
