import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import { useLang } from '../utils/i18n.js';

export default function NewVisit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const [form, setForm] = useState({
    complaint: '',
    treatment: '',
    recommendation: '',
    followupDays: '10',
    followupTime: '10:00',
    messageText: ''
  });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');

    try {
      await api.post('/visits', {
        patientId: Number(id),
        complaint: form.complaint,
        treatment: form.treatment,
        recommendation: form.recommendation,
        followupDays: form.followupDays ? Number(form.followupDays) : null,
        followupTime: form.followupTime,
        messageText: form.messageText
      });
      navigate(`/patients/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || t.error);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">{t.newVisit}</h2>
        <p className="text-sm text-slate-500">{t.newVisitSubtitle}</p>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <textarea className="input min-h-24" placeholder={t.complaint} value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} />
        <textarea className="input min-h-28" placeholder={t.treatment} value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })} />
        <textarea className="input min-h-24" placeholder={t.recommendation} value={form.recommendation} onChange={(e) => setForm({ ...form, recommendation: e.target.value })} />

        <div className="grid grid-cols-2 gap-3">
          <select className="input" value={form.followupDays} onChange={(e) => setForm({ ...form, followupDays: e.target.value })}>
            <option value="3">{t.days3}</option>
            <option value="7">{t.days7}</option>
            <option value="10">{t.days10}</option>
            <option value="30">{t.days30}</option>
            <option value="">{t.noFollowup}</option>
          </select>
          <input className="input" type="time" value={form.followupTime} onChange={(e) => setForm({ ...form, followupTime: e.target.value })} />
        </div>

        <textarea className="input min-h-24" placeholder={t.telegramMessage} value={form.messageText} onChange={(e) => setForm({ ...form, messageText: e.target.value })} />

        {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <button className="btn btn-primary w-full">{t.save}</button>
      </form>
    </div>
  );
}
