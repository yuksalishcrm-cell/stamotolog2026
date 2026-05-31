import { useEffect, useState } from 'react';
import { Activity, CalendarCheck, Clock, Users } from 'lucide-react';
import { api } from '../api/client.js';
import { trStatus, useLang } from '../utils/i18n.js';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { t } = useLang();

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <p>{t.loading}</p>;

  const cards = [
    [t.totalPatients, data.cards.totalPatients, <Users size={22} />],
    [t.todayVisits, data.cards.todayVisits, <CalendarCheck size={22} />],
    [t.todayFollowups, data.cards.todayFollowups, <Clock size={22} />],
    [t.upcomingFollowups, data.cards.upcomingFollowups, <Activity size={22} />],
    [t.confirmed, data.cards.confirmed, <CalendarCheck size={22} />],
    [t.declined, data.cards.declined, <Clock size={22} />],
    [t.noResponse, data.cards.noResponse, <Activity size={22} />],
    [t.pending, data.cards.pending, <Clock size={22} />]
  ];

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 p-5 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-4xl shadow-lg">
            🦷
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">Dental Clinic</p>
            <h2 className="mt-1 text-3xl font-black">{t.dashboard}</h2>
            <p className="mt-1 text-sm text-white/85">{t.dashboardSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cards.map(([label, value, icon]) => (
          <div key={label} className="rounded-[1.6rem] border border-teal-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              {icon}
            </div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-teal-800">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[1.8rem] border border-teal-100 bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-bold">{t.recentFollowups}</h3>
        <div className="space-y-3">
          {data.recentFollowups.length === 0 && <p className="text-sm text-slate-500">{t.empty}</p>}
          {data.recentFollowups.map((item) => (
            <div key={item.id} className="rounded-2xl bg-teal-50 p-3">
              <p className="font-semibold">{item.patient.fullName}</p>
              <p className="text-sm text-slate-500">
                {new Date(item.scheduledAt).toLocaleString()} · {trStatus(item.status, t)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
