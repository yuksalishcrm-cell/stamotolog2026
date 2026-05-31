import TelegramBot from 'node-telegram-bot-api';
import { env } from '../config/env.js';
import { prisma } from '../db/prisma.js';

let bot = null;

export function getBot() {
  if (!env.telegramBotToken || env.telegramBotToken === 'put_your_bot_token_here') {
    return null;
  }

  if (!bot) {
    bot = new TelegramBot(env.telegramBotToken, { polling: true });

    bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
      const chatId = String(msg.chat.id);
      const startParam = match?.[1];

      if (startParam?.startsWith('patient_')) {
        const patientId = Number(startParam.replace('patient_', ''));
        const patient = await prisma.patient.findUnique({ where: { id: patientId } });

        if (patient) {
          await prisma.patient.update({
            where: { id: patientId },
            data: {
              telegramChatId: chatId,
              telegramUsername: msg.from?.username || patient.telegramUsername
            }
          });

          await bot.sendMessage(
            chatId,
            `Assalomu alaykum, ${patient.fullName}. Siz DocFollowUp eslatmalariga ulandingiz.`
          );
          return;
        }
      }

      await bot.sendMessage(
        chatId,
        'Assalomu alaykum. Bu DocFollowUp eslatma botidir. Shifokor bergan maxsus link orqali ulaning.'
      );
    });

    bot.on('callback_query', async (query) => {
      const data = query.data || '';
      const chatId = String(query.message?.chat.id || query.from.id);

      if (!data.startsWith('followup:')) return;

      const [, idRaw, action] = data.split(':');
      const followupId = Number(idRaw);

      const statusMap = {
        confirm: 'confirmed',
        reschedule: 'reschedule',
        decline: 'declined'
      };

      const status = statusMap[action];
      if (!status) return;

      await prisma.followup.update({
        where: { id: followupId },
        data: { status, responseAt: new Date() }
      });

      const reply =
        action === 'confirm'
          ? 'Rahmat. Kelishingiz tasdiqlandi.'
          : action === 'reschedule'
            ? 'Rahmat. Shifokor siz bilan vaqtni o‘zgartirish uchun bog‘lanadi.'
            : 'Rahmat. Shifokorga kela olmasligingiz haqida xabar berildi.';

      await bot.answerCallbackQuery(query.id);
      await bot.sendMessage(chatId, reply);
    });
  }

  return bot;
}

export async function sendTelegramFollowup({ followup, patient }) {
  const activeBot = getBot();

  if (!activeBot) {
    throw new Error('Telegram bot token sozlanmagan');
  }

  if (!patient.telegramChatId) {
    throw new Error('Bemor Telegram botga ulanmagan');
  }

  const text =
    followup.messageText ||
    `Assalomu alaykum, ${patient.fullName}. Sizga shifokor qabuliga qayta kelish eslatmasi.`;

  await activeBot.sendMessage(patient.telegramChatId, text, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✅ Kelaman', callback_data: `followup:${followup.id}:confirm` },
          { text: '📅 Vaqtni o‘zgartiraman', callback_data: `followup:${followup.id}:reschedule` }
        ],
        [{ text: '❌ Kela olmayman', callback_data: `followup:${followup.id}:decline` }]
      ]
    }
  });

  await prisma.telegramLog.create({
    data: {
      followupId: followup.id,
      chatId: patient.telegramChatId,
      message: text,
      status: 'sent'
    }
  });
}
