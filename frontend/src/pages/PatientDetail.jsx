import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client.js';

export default function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    api.get(`/patients/${id}`).then((res) => setPatient(res.data));
  }, [id]);

  if (!patient) return <p>Yuklanmoqda...</p>;

  const botLink = `https://t.me/YOUR_BOT_USERNAME?start=patient_${patient.id}`;

  return (
    <div className="space-y-5">
      <div className="card">
        <h2 className="text-2xl font-bold">{patient.fullName}</h2>
        <p className="text-sm text-slate-500">{patient.phone} · {patient.age || '-'} yosh</p>
        {patient.telegramUsername && <p className="text-sm text-teal-700">@{patient.telegramUsername}</p>}
        <p className="mt-3">{patient.complaint}</p>
      </div>

      <Link to={`/patients/${patient.id}/visit`} className="btn btn-primary block text-center">
        + Yangi muolaja / follow-up
      </Link>

      {!patient.telegramChatId && (
        <div className="card">
          <h3 className="font-bold">Telegram ulash</h3>
          <p className="mt-1 text-sm text-slate-500">
            Bemor botga bir marta /start bosishi kerak. Bot username’ni keyin sozlamadan o‘zgartiring.
          </p>
          <p className="mt-3 break-all rounded-2xl bg-slate-50 p-3 text-sm">{botLink}</p>
        </div>
      )}

      <div className="card">
        <h3 className="mb-3 font-bold">Muolajalar tarixi</h3>
        <div className="space-y-3">
          {patient.visits.map((v) => (
            <div key={v.id} className="rounded-2xl bg-slate-50 p-3">
              <p className="font-semibold">{new Date(v.visitDate).toLocaleString()}</p>
              <p className="text-sm">{v.treatment || 'Muolaja yozilmagan'}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="mb-3 font-bold">Follow-up tarixi</h3>
        <div className="space-y-3">
          {patient.followups.map((f) => (
            <div key={f.id} className="rounded-2xl bg-slate-50 p-3">
              <p className="font-semibold">{new Date(f.scheduledAt).toLocaleString()}</p>
              <p className="text-sm text-slate-500">{f.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
