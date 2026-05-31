import express from 'express';
import { z } from 'zod';
import { prisma } from '../db/prisma.js';
import { authRequired } from '../middleware/auth.js';

export const patientRouter = express.Router();

patientRouter.use(authRequired);

const patientSchema = z.object({
  fullName: z.string().min(2),
  age: z.coerce.number().int().min(0).max(130).optional().nullable(),
  phone: z.string().min(5),
  telegramUsername: z.string().optional().nullable(),
  complaint: z.string().optional().nullable()
});

patientRouter.get('/', async (req, res) => {
  const q = String(req.query.q || '').trim();

  const patients = await prisma.patient.findMany({
    where: {
      doctorId: req.user.id,
      OR: q
        ? [
            { fullName: { contains: q, mode: 'insensitive' } },
            { phone: { contains: q, mode: 'insensitive' } },
            { telegramUsername: { contains: q, mode: 'insensitive' } }
          ]
        : undefined
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json(patients);
});

patientRouter.post('/', async (req, res) => {
  try {
    const data = patientSchema.parse(req.body);
    const patient = await prisma.patient.create({
      data: {
        ...data,
        doctorId: req.user.id,
        telegramUsername: data.telegramUsername?.replace('@', '') || null
      }
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Bemor qo‘shishda xatolik' });
  }
});

patientRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const patient = await prisma.patient.findFirst({
    where: { id, doctorId: req.user.id },
    include: {
      visits: { orderBy: { createdAt: 'desc' } },
      followups: { orderBy: { scheduledAt: 'desc' } }
    }
  });

  if (!patient) {
    return res.status(404).json({ message: 'Bemor topilmadi' });
  }

  res.json(patient);
});

patientRouter.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = patientSchema.parse(req.body);

    const exists = await prisma.patient.findFirst({ where: { id, doctorId: req.user.id } });
    if (!exists) {
      return res.status(404).json({ message: 'Bemor topilmadi' });
    }

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        ...data,
        telegramUsername: data.telegramUsername?.replace('@', '') || null
      }
    });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Bemorni tahrirlashda xatolik' });
  }
});

patientRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.patient.deleteMany({ where: { id, doctorId: req.user.id } });
  res.json({ ok: true });
});
