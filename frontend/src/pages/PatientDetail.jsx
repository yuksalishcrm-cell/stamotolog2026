import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import { trStatus, useLang } from '../utils/i18n.js';

export default function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const { t } = useLang();

  useEffect(() => {
    api.get(`/patients/${id}`).then((res) => setPatient(res.data));
  }, [id]);

  if (!patient) return <p>{t.loading}</p>;

  const botUsername = (import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'bothruchunbot').replace('@', '');
  const botLink = `https://t.me/${botUsername}?start=patient_${patient.id}`;

  return (
    <div className="space-y-5">
      <div className="card">
        <h2 className="text-2xl font-bold">{patient.fullName}</h2>
        <p className="text-sm text-slate-500">{patient.phone} · {patient.age || '-'} {t.yearsOld}</p>
        {patient.telegramUsername && <p className="text-sm text-teal-700">@{patient.telegramUsername}</p>}
        <p className="mt-3">{patient.complaint}</p>
      </div>

      <Link to={`/patients/${patient.id}/visit`} className="btn btn-primary block text-center">{t.addVisit}</Link>

      {!patient.telegramChatId && (
        <div className="card">
          <h3 className="font-bold">{t.telegramConnect}</h3>
          <p className="mt-1 text-sm text-slate-500">{t.telegramConnectText}</p>

          <a href={botLink} target="_blank" rel="noreferrer" className="mt-3 block break-all rounded-2xl bg-teal-50 p-3 text-sm text-teal-800">
            {botLink}
          </a>
          <p className="mt-2 text-xs text-slate-500">{t.telegramLinkHelp}</p>
        </div>
      )}

      {patient.telegramChatId && (
        <div className="card border-teal-100 bg-teal-50">
          <h3 className="font-bold text-teal-800">{t.telegramConnected}</h3>
          <p className="mt-1 text-sm text-teal-700">{t.telegramConnectedText}</p>
        </div>
      )}

      <div className="card">
        <h3 className="mb-3 font-bold">{t.visitsHistory}</h3>
        <div className="space-y-3">
          {patient.visits.length === 0 && <p className="text-sm text-slate-500">{t.noVisits}</p>}
          {patient.visits.map((v) => (
            <div key={v.id} className="rounded-2xl bg-slate-50 p-3">
              <p className="font-semibold">{new Date(v.visitDate).toLocaleString()}</p>
              <p className="text-sm">{v.treatment || t.treatmentMissing}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="mb-3 font-bold">{t.followupHistory}</h3>
        <div className="space-y-3">
          {patient.followups.length === 0 && <p className="text-sm text-slate-500">{t.empty}</p>}
          {patient.followups.map((f) => (
            <div key={f.id} className="rounded-2xl bg-slate-50 p-3">
              <p className="font-semibold">{new Date(f.scheduledAt).toLocaleString()}</p>
              <p className="text-sm text-slate-500">{trStatus(f.status, t)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
