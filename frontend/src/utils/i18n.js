import { useEffect, useState } from 'react';

export const TEXT = {
  uz: {
    appTitle: 'Stamotolog',
    appSubtitle: 'Follow-Up dashboard',

    loginTitle: 'Stamotolog Follow-Up',
    loginSubtitle: 'Shifokorlar uchun bemor eslatma tizimi',
    doctorName: 'Shifokor FISH',
    email: 'Email',
    phonePlaceholder: '+998901234567',
    password: 'Parol',
    login: 'Kirish',
    register: 'Ro‘yxatdan o‘tish',
    createAccount: 'Yangi akkaunt ochish',
    haveAccount: 'Akkaunt bor, kirish',
    error: 'Xatolik yuz berdi',

    dashboard: 'Dashboard',
    dashboardSubtitle: 'Bemorlar va follow-up statistikasi',
    totalPatients: 'Jami bemorlar',
    todayVisits: 'Bugun qabul',
    todayFollowups: 'Bugun kelishi kerak',
    upcomingFollowups: '7 kunda kutilmoqda',
    confirmed: 'Kelaman dedi',
    declined: 'Kela olmayman',
    noResponse: 'Javob yo‘q',
    pending: 'Kutilmoqda',
    sent: 'Yuborilgan',
    failed: 'Xato',
    completed: 'Keldi',
    recentFollowups: 'Yaqin follow-up’lar',
    empty: 'Hozircha yo‘q',

    patients: 'Bemorlar',
    patientsSubtitle: 'Ro‘yxat va qidiruv',
    add: '+ Qo‘shish',
    searchPatient: 'FISH, telefon yoki Telegram...',
    newPatient: 'Yangi bemor',
    newPatientSubtitle: 'Qabul vaqtida tez kiritish',
    fullName: 'FISH',
    age: 'Yosh',
    yearsOld: 'yosh',
    telegramUsername: '@jamshed_artikov',
    complaint: 'Shikoyati',
    saveAndVisit: 'Saqlash va muolajaga o‘tish',

    newVisit: 'Muolaja va follow-up',
    newVisitSubtitle: 'Masalan: 10 kundan keyin qayta ko‘rik',
    treatment: 'Qilingan muolaja',
    recommendation: 'Tavsiya',
    noFollowup: 'Follow-up yo‘q',
    days3: '3 kundan keyin',
    days7: '7 kundan keyin',
    days10: '10 kundan keyin',
    days30: '1 oydan keyin',
    telegramMessage: 'Telegram eslatma matni',
    save: 'Saqlash',
    visitSaved: 'Muolaja saqlandi',

    addVisit: '+ Yangi muolaja / follow-up',
    telegramConnect: 'Telegram ulash',
    telegramConnectText: 'Bemor Telegram eslatma olishi uchun mana shu maxsus link orqali botga kirib /start bosishi kerak.',
    telegramNotConfigured: 'Bot username sozlanmagan. Railway frontend Variables ichiga VITE_TELEGRAM_BOT_USERNAME qo‘shing.',
    telegramLinkHelp: 'Shu linkni bemorga yuboring yoki bemorning telefonida ochib bering.',
    telegramConnected: 'Telegram ulangan',
    telegramConnectedText: 'Endi bu bemorga follow-up eslatmalar Telegram orqali yuboriladi.',
    visitsHistory: 'Muolajalar tarixi',
    followupHistory: 'Follow-up tarixi',
    noVisits: 'Hozircha muolaja yo‘q',
    treatmentMissing: 'Muolaja yozilmagan',

    followups: 'Follow-up',
    followupsSubtitle: 'Rejalashtirilgan eslatmalar',
    status: 'Status',
    sendNow: 'Yuborish',
    markCompleted: 'Keldi',
    loading: 'Yuklanmoqda...'
  },

  ru: {
    appTitle: 'Stamotolog',
    appSubtitle: 'Панель Follow-Up',

    loginTitle: 'Stamotolog Follow-Up',
    loginSubtitle: 'Система напоминаний для врачей',
    doctorName: 'ФИО врача',
    email: 'Email',
    phonePlaceholder: '+998901234567',
    password: 'Пароль',
    login: 'Войти',
    register: 'Зарегистрироваться',
    createAccount: 'Создать аккаунт',
    haveAccount: 'Уже есть аккаунт, войти',
    error: 'Произошла ошибка',

    dashboard: 'Панель',
    dashboardSubtitle: 'Статистика пациентов и повторных визитов',
    totalPatients: 'Всего пациентов',
    todayVisits: 'Приём сегодня',
    todayFollowups: 'Должны прийти сегодня',
    upcomingFollowups: 'Ожидаются за 7 дней',
    confirmed: 'Подтвердили приход',
    declined: 'Не смогут прийти',
    noResponse: 'Нет ответа',
    pending: 'В ожидании',
    sent: 'Отправлено',
    failed: 'Ошибка',
    completed: 'Завершено',
    recentFollowups: 'Ближайшие follow-up',
    empty: 'Пока нет данных',

    patients: 'Пациенты',
    patientsSubtitle: 'Список и поиск',
    add: '+ Добавить',
    searchPatient: 'ФИО, телефон или Telegram...',
    newPatient: 'Новый пациент',
    newPatientSubtitle: 'Быстрое добавление во время приёма',
    fullName: 'ФИО',
    age: 'Возраст',
    yearsOld: 'лет',
    telegramUsername: '@jamshed_artikov',
    complaint: 'Жалоба',
    saveAndVisit: 'Сохранить и перейти к лечению',

    newVisit: 'Лечение и follow-up',
    newVisitSubtitle: 'Например: повторный осмотр через 10 дней',
    treatment: 'Проведённое лечение',
    recommendation: 'Рекомендация',
    noFollowup: 'Без follow-up',
    days3: 'Через 3 дня',
    days7: 'Через 7 дней',
    days10: 'Через 10 дней',
    days30: 'Через 1 месяц',
    telegramMessage: 'Текст Telegram-напоминания',
    save: 'Сохранить',
    visitSaved: 'Лечение сохранено',

    addVisit: '+ Новое лечение / follow-up',
    telegramConnect: 'Подключить Telegram',
    telegramConnectText: 'Чтобы пациент получал Telegram-напоминания, он должен открыть эту специальную ссылку и нажать /start в боте.',
    telegramNotConfigured: 'Username бота не настроен. Добавьте VITE_TELEGRAM_BOT_USERNAME в Railway frontend Variables.',
    telegramLinkHelp: 'Отправьте эту ссылку пациенту или откройте её на телефоне пациента.',
    telegramConnected: 'Telegram подключён',
    telegramConnectedText: 'Теперь этому пациенту будут отправляться follow-up напоминания через Telegram.',
    visitsHistory: 'История лечения',
    followupHistory: 'История follow-up',
    noVisits: 'Лечений пока нет',
    treatmentMissing: 'Лечение не указано',

    followups: 'Follow-up',
    followupsSubtitle: 'Запланированные напоминания',
    status: 'Статус',
    sendNow: 'Отправить',
    markCompleted: 'Пришёл',
    loading: 'Загрузка...'
  }
};

export function getLang() {
  return localStorage.getItem('lang') || 'uz';
}

export function saveLang(lang) {
  localStorage.setItem('lang', lang);
  window.dispatchEvent(new Event('lang-change'));
}

export function useLang() {
  const [lang, setLangState] = useState(getLang());

  useEffect(() => {
    const onChange = () => setLangState(getLang());
    window.addEventListener('lang-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('lang-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  return { lang, t: TEXT[lang] || TEXT.uz, setLang: saveLang };
}

export function trStatus(status, t) {
  const map = {
    pending: t.pending,
    sent: t.sent,
    failed: t.failed,
    completed: t.completed,
    confirmed: t.confirmed,
    declined: t.declined,
    no_response: t.noResponse
  };
  return map[status] || status;
}
