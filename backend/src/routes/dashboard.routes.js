import express from 'express';
import { prisma } from '../db/prisma.js';
import { authRequired } from '../middleware/auth.js';

export const dashboardRouter = express.Router();

dashboardRouter.use(authRequired);

dashboardRouter.get('/', async (req, res) => {
  const doctorId = req.user.id;
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

  const [
    totalPatients,
    todayVisits,
    todayFollowups,
    upcomingFollowups,
    confirmed,
    declined,
    noResponse,
    pending,
    recentFollowups
  ] = await Promise.all([
    prisma.patient.count({ where: { doctorId } }),
    prisma.visit.count({ where: { doctorId, visitDate: { gte: todayStart, lt: todayEnd } } }),
    prisma.followup.count({ where: { doctorId, scheduledAt: { gte: todayStart, lt: todayEnd } } }),
    prisma.followup.count({ where: { doctorId, scheduledAt: { gte: todayStart, lt: weekEnd }, status: 'pending' } }),
    prisma.followup.count({ where: { doctorId, status: 'confirmed' } }),
    prisma.followup.count({ where: { doctorId, status: 'declined' } }),
    prisma.followup.count({ where: { doctorId, status: 'no_response' } }),
    prisma.followup.count({ where: { doctorId, status: 'pending' } }),
    prisma.followup.findMany({
      where: { doctorId },
      include: { patient: true },
      orderBy: { scheduledAt: 'asc' },
      take: 10
    })
  ]);

  res.json({
    cards: {
      totalPatients,
      todayVisits,
      todayFollowups,
      upcomingFollowups,
      confirmed,
      declined,
      noResponse,
      pending
    },
    recentFollowups
  });
});
