import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Yuklanmoqda...</p>;

  const cards = [
    ['Jami bemorlar', data.cards.totalPatients],
    ['Bugun qabul', data.cards.todayVisits],
    ['Bugun kelishi kerak', data.cards.todayFollowups],
    ['7 kunda kutilmoqda', data.cards.upcomingFollowups],
    ['Kelaman dedi', data.cards.confirmed],
    ['Kela olmayman', data.cards.declined],
    ['Javob yo‘q', data.cards.noResponse],
    ['Kutilmoqda', data.cards.pending]
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-slate-500">Bemorlar va follow-up statistikasi</p>
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
        <h3 className="mb-3 font-bold">Yaqin follow-up’lar</h3>
        <div className="space-y-3">
          {data.recentFollowups.length === 0 && <p className="text-sm text-slate-500">Hozircha yo‘q</p>}
          {data.recentFollowups.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-50 p-3">
              <p className="font-semibold">{item.patient.fullName}</p>
              <p className="text-sm text-slate-500">
                {new Date(item.scheduledAt).toLocaleString()} · {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
