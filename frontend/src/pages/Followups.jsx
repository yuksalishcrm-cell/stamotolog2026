import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import { trStatus, useLang } from '../utils/i18n.js';

export default function Followups() {
  const [items, setItems] = useState([]);
  const { t } = useLang();

  async function load() {
    const { data } = await api.get('/followups');
    setItems(data);
  }

  async function sendNow(id) {
    await api.post(`/followups/${id}/send-now`);
    await load();
  }

  async function complete(id) {
    await api.post(`/followups/${id}/complete`);
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">{t.followups}</h2>
        <p className="text-sm text-slate-500">{t.followupsSubtitle}</p>
      </div>

      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-slate-500">{t.empty}</p>}
        {items.map((f) => (
          <div key={f.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold">{f.patient.fullName}</p>
                <p className="text-sm text-slate-500">{new Date(f.scheduledAt).toLocaleString()}</p>
                <p className="mt-1 text-sm">{t.status}: <b>{trStatus(f.status, t)}</b></p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => sendNow(f.id)} className="btn btn-light text-sm">{t.sendNow}</button>
                <button onClick={() => complete(f.id)} className="btn btn-primary text-sm">{t.markCompleted}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
