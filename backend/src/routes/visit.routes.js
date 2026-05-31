import express from 'express';
import { z } from 'zod';
import dayjs from 'dayjs';
import { prisma } from '../db/prisma.js';
import { authRequired } from '../middleware/auth.js';
import { scheduleFollowupJob } from '../jobs/followup.scheduler.js';

export const visitRouter = express.Router();

visitRouter.use(authRequired);

const createVisitSchema = z.object({
  patientId: z.coerce.number().int(),
  complaint: z.string().optional().nullable(),
  treatment: z.string().optional().nullable(),
  recommendation: z.string().optional().nullable(),
  followupDays: z.coerce.number().int().min(1).max(365).optional().nullable(),
  followupTime: z.string().default('10:00'),
  messageText: z.string().optional().nullable()
});

visitRouter.post('/', async (req, res) => {
  try {
    const data = createVisitSchema.parse(req.body);
    const patient = await prisma.patient.findFirst({
      where: { id: data.patientId, doctorId: req.user.id }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Bemor topilmadi' });
    }

    const visit = await prisma.visit.create({
      data: {
        doctorId: req.user.id,
        patientId: data.patientId,
        complaint: data.complaint,
        treatment: data.treatment,
        recommendation: data.recommendation
      }
    });

    let followup = null;

    if (data.followupDays) {
      const [hour, minute] = data.followupTime.split(':').map(Number);
      const scheduledAt = dayjs()
        .add(data.followupDays, 'day')
        .hour(hour || 10)
        .minute(minute || 0)
        .second(0)
        .millisecond(0)
        .toDate();

      followup = await prisma.followup.create({
        data: {
          doctorId: req.user.id,
          patientId: patient.id,
          visitId: visit.id,
          scheduledAt,
          messageText:
            data.messageText ||
            `Assalomu alaykum, ${patient.fullName}. Sizga shifokor qabuliga qayta kelish eslatmasi.`
        }
      });

      await scheduleFollowupJob(followup.id, scheduledAt);
    }

    res.status(201).json({ visit, followup });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Qabulni saqlashda xatolik' });
  }
});
