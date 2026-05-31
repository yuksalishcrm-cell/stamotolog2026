import { useEffect, useState } from 'react';
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
    [t.totalPatients, data.cards.totalPatients],
    [t.todayVisits, data.cards.todayVisits],
    [t.todayFollowups, data.cards.todayFollowups],
    [t.upcomingFollowups, data.cards.upcomingFollowups],
    [t.confirmed, data.cards.confirmed],
    [t.declined, data.cards.declined],
    [t.noResponse, data.cards.noResponse],
    [t.pending, data.cards.pending]
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">{t.dashboard}</h2>
        <p className="text-sm text-slate-500">{t.dashboardSubtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cards.map(([label, value]) => (
          <div key={label} className="card">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-teal-800">{value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="mb-3 font-bold">{t.recentFollowups}</h3>
        <div className="space-y-3">
          {data.recentFollowups.length === 0 && <p className="text-sm text-slate-500">{t.empty}</p>}
          {data.recentFollowups.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-50 p-3">
              <p className="font-semibold">{item.patient.fullName}</p>
              <p className="text-sm text-slate-500">
                {new Date(item.scheduledAt).toLocaleString()} В· {trStatus(item.status, t)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
