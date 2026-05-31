import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.routes.js';
import { patientRouter } from './routes/patient.routes.js';
import { visitRouter } from './routes/visit.routes.js';
import { followupRouter } from './routes/followup.routes.js';
import { dashboardRouter } from './routes/dashboard.routes.js';
import { getBot } from './bot/telegram.js';
import { startFollowupScheduler } from './jobs/followup.scheduler.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'stamotolog-backend' });
});

app.use('/api/auth', authRouter);
app.use('/api/patients', patientRouter);
app.use('/api/visits', visitRouter);
app.use('/api/followups', followupRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(env.port, () => {
  console.log(`Backend running on port ${env.port}`);
  getBot();
  startFollowupScheduler();
});
