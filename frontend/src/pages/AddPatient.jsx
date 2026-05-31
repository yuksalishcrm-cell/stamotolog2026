import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';

export default function AddPatient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    phone: '+998',
    telegramUsername: '',
    complaint: ''
  });
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/patients', {
        ...form,
        age: form.age ? Number(form.age) : null
      });
      navigate(`/patients/${data.id}/visit`);
    } catch (err) {
      setError(err.response?.data?.message || 'Saqlashda xatolik');
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Yangi bemor</h2>
        <p className="text-sm text-slate-500">Qabul vaqtida tez kiritish</p>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="FISH" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="input" placeholder="Yosh" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
        <input className="input" placeholder="+998901234567" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="input" placeholder="@jamshed_artikov" value={form.telegramUsername} onChange={(e) => setForm({ ...form, telegramUsername: e.target.value })} />
        <textarea className="input min-h-28" placeholder="Shikoyati" value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} />

        {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <button className="btn btn-primary w-full">Saqlash va muolajaga o‘tish</button>
      </form>
    </div>
  );
}
