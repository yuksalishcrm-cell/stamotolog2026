import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import { useLang } from '../utils/i18n.js';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [q, setQ] = useState('');
  const { t } = useLang();

  useEffect(() => {
    const timer = setTimeout(() => {
      api.get('/patients', { params: { q } }).then((res) => setPatients(res.data));
    }, 300);
    return () => clearTimeout(timer);
  }, [q]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">{t.patients}</h2>
          <p className="text-sm text-slate-500">{t.patientsSubtitle}</p>
        </div>
        <Link to="/patients/new" className="btn btn-primary whitespace-nowrap">{t.add}</Link>
      </div>

      <input className="input" placeholder={t.searchPatient} value={q} onChange={(e) => setQ(e.target.value)} />

      <div className="space-y-3">
        {patients.map((p) => (
          <Link to={`/patients/${p.id}`} key={p.id} className="card block">
            <p className="font-bold">{p.fullName}</p>
            <p className="text-sm text-slate-500">
              {p.phone} {p.telegramUsername ? `· @${p.telegramUsername}` : ''}
            </p>
            <p className="mt-1 line-clamp-2 text-sm">{p.complaint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
