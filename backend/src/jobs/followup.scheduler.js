import { prisma } from '../db/prisma.js';
import { sendTelegramFollowup } from '../bot/telegram.js';

let schedulerStarted = false;

export async function scheduleFollowupJob(followupId, scheduledAt) {
  // Docker/Redis ishlatmaydigan MVP uchun alohida queue kerak emas.
  // Follow-up bazada pending holatda turadi.
  // Scheduler har 60 soniyada bazani tekshiradi va vaqti kelgan xabarlarni yuboradi.
  return { followupId, scheduledAt };
}

export async function sendFollowupNow(followupId) {
  await processOneFollowup(followupId);
}

export function startFollowupScheduler() {
  if (schedulerStarted) return;
  schedulerStarted = true;

  const intervalSeconds = Number(process.env.SCHEDULER_INTERVAL_SECONDS || 60);

  console.log(`Follow-up scheduler started. Interval: ${intervalSeconds}s`);

  processDueFollowups().catch((error) => {
    console.error('Initial scheduler run failed:', error.message);
  });

  setInterval(() => {
    processDueFollowups().catch((error) => {
      console.error('Scheduler error:', error.message);
    });
  }, intervalSeconds * 1000);
}

async function processDueFollowups() {
  const due = await prisma.followup.findMany({
    where: {
      status: 'pending',
      scheduledAt: { lte: new Date() }
    },
    include: { patient: true },
    orderBy: { scheduledAt: 'asc' },
    take: 20
  });

  for (const followup of due) {
    await processLoadedFollowup(followup);
  }
}

async function processOneFollowup(followupId) {
  const followup = await prisma.followup.findUnique({
    where: { id: followupId },
    include: { patient: true }
  });

  if (!followup) {
    throw new Error('Follow-up topilmadi');
  }

  await processLoadedFollowup(followup, true);
}

async function processLoadedFollowup(followup, force = false) {
  if (!force && followup.status !== 'pending') return;

  try {
    await sendTelegramFollowup({ followup, patient: followup.patient });

    await prisma.followup.update({
      where: { id: followup.id },
      data: { status: 'sent', sentAt: new Date() }
    });
  } catch (error) {
    await prisma.followup.update({
      where: { id: followup.id },
      data: { status: 'failed' }
    });

    await prisma.telegramLog.create({
      data: {
        followupId: followup.id,
        chatId: followup.patient.telegramChatId,
        message: error.message,
        status: 'failed'
      }
    });

    console.error(`Follow-up #${followup.id} failed:`, error.message);
  }
}
