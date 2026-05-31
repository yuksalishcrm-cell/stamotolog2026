import express from 'express';
import { prisma } from '../db/prisma.js';
import { authRequired } from '../middleware/auth.js';
import { sendFollowupNow, scheduleFollowupJob } from '../jobs/followup.scheduler.js';

export const followupRouter = express.Router();

followupRouter.use(authRequired);

followupRouter.get('/', async (req, res) => {
  const status = req.query.status ? String(req.query.status) : undefined;

  const followups = await prisma.followup.findMany({
    where: { doctorId: req.user.id, status },
    include: { patient: true },
    orderBy: { scheduledAt: 'asc' }
  });

  res.json(followups);
});

followupRouter.get('/today', async (req, res) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const followups = await prisma.followup.findMany({
    where: {
      doctorId: req.user.id,
      scheduledAt: { gte: start, lt: end }
    },
    include: { patient: true },
    orderBy: { scheduledAt: 'asc' }
  });

  res.json(followups);
});

followupRouter.post('/:id/send-now', async (req, res) => {
  const id = Number(req.params.id);
  const followup = await prisma.followup.findFirst({ where: { id, doctorId: req.user.id } });

  if (!followup) {
    return res.status(404).json({ message: 'Follow-up topilmadi' });
  }

  await sendFollowupNow(id);
  res.json({ ok: true });
});

followupRouter.post('/:id/complete', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.followup.updateMany({
    where: { id, doctorId: req.user.id },
    data: { status: 'completed', responseAt: new Date() }
  });
  res.json({ ok: true });
});

followupRouter.post('/:id/reschedule', async (req, res) => {
  const id = Number(req.params.id);
  const scheduledAt = new Date(req.body.scheduledAt);

  const followup = await prisma.followup.findFirst({ where: { id, doctorId: req.user.id } });
  if (!followup) {
    return res.status(404).json({ message: 'Follow-up topilmadi' });
  }

  const updated = await prisma.followup.update({
    where: { id },
    data: { scheduledAt, status: 'pending', sentAt: null, responseAt: null }
  });

  await scheduleFollowupJob(id, scheduledAt);
  res.json(updated);
});
