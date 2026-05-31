import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function Followups() {
  const [items, setItems] = useState([]);

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
        <h2 className="text-2xl font-bold">Follow-up</h2>
        <p className="text-sm text-slate-500">Rejalashtirilgan eslatmalar</p>
      </div>

      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold">{f.patient.fullName}</p>
                <p className="text-sm text-slate-500">{new Date(f.scheduledAt).toLocaleString()}</p>
                <p className="mt-1 text-sm">Status: <b>{f.status}</b></p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => sendNow(f.id)} className="btn btn-light text-sm">Yuborish</button>
                <button onClick={() => complete(f.id)} className="btn btn-primary text-sm">Keldi</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
