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
    register: 'RoвЂyxatdan oвЂtish',
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
    noResponse: 'Javob yoвЂq',
    pending: 'Kutilmoqda',
    sent: 'Yuborilgan',
    failed: 'Xato',
    completed: 'Keldi',
    recentFollowups: 'Yaqin follow-upвЂ™lar',
    empty: 'Hozircha yoвЂq',

    patients: 'Bemorlar',
    patientsSubtitle: 'RoвЂyxat va qidiruv',
    add: '+ QoвЂshish',
    searchPatient: 'FISH, telefon yoki Telegram...',
    newPatient: 'Yangi bemor',
    newPatientSubtitle: 'Qabul vaqtida tez kiritish',
    fullName: 'FISH',
    age: 'Yosh',
    yearsOld: 'yosh',
    telegramUsername: '@jamshed_artikov',
    complaint: 'Shikoyati',
    saveAndVisit: 'Saqlash va muolajaga oвЂtish',

    newVisit: 'Muolaja va follow-up',
    newVisitSubtitle: 'Masalan: 10 kundan keyin qayta koвЂrik',
    treatment: 'Qilingan muolaja',
    recommendation: 'Tavsiya',
    noFollowup: 'Follow-up yoвЂq',
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
    telegramNotConfigured: 'Bot username sozlanmagan. Railway frontend Variables ichiga VITE_TELEGRAM_BOT_USERNAME qoвЂshing.',
    telegramLinkHelp: 'Shu linkni bemorga yuboring yoki bemorning telefonida ochib bering.',
    telegramConnected: 'Telegram ulangan',
    telegramConnectedText: 'Endi bu bemorga follow-up eslatmalar Telegram orqali yuboriladi.',
    visitsHistory: 'Muolajalar tarixi',
    followupHistory: 'Follow-up tarixi',
    noVisits: 'Hozircha muolaja yoвЂq',
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
    appSubtitle: 'РџР°РЅРµР»СЊ Follow-Up',

    loginTitle: 'Stamotolog Follow-Up',
    loginSubtitle: 'РЎРёСЃС‚РµРјР° РЅР°РїРѕРјРёРЅР°РЅРёР№ РґР»СЏ РІСЂР°С‡РµР№',
    doctorName: 'Р¤РРћ РІСЂР°С‡Р°',
    email: 'Email',
    phonePlaceholder: '+998901234567',
    password: 'РџР°СЂРѕР»СЊ',
    login: 'Р’РѕР№С‚Рё',
    register: 'Р—Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°С‚СЊСЃСЏ',
    createAccount: 'РЎРѕР·РґР°С‚СЊ Р°РєРєР°СѓРЅС‚',
    haveAccount: 'РЈР¶Рµ РµСЃС‚СЊ Р°РєРєР°СѓРЅС‚, РІРѕР№С‚Рё',
    error: 'РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°',

    dashboard: 'РџР°РЅРµР»СЊ',
    dashboardSubtitle: 'РЎС‚Р°С‚РёСЃС‚РёРєР° РїР°С†РёРµРЅС‚РѕРІ Рё РїРѕРІС‚РѕСЂРЅС‹С… РІРёР·РёС‚РѕРІ',
    totalPatients: 'Р’СЃРµРіРѕ РїР°С†РёРµРЅС‚РѕРІ',
    todayVisits: 'РџСЂРёС‘Рј СЃРµРіРѕРґРЅСЏ',
    todayFollowups: 'Р”РѕР»Р¶РЅС‹ РїСЂРёР№С‚Рё СЃРµРіРѕРґРЅСЏ',
    upcomingFollowups: 'РћР¶РёРґР°СЋС‚СЃСЏ Р·Р° 7 РґРЅРµР№',
    confirmed: 'РџРѕРґС‚РІРµСЂРґРёР»Рё РїСЂРёС…РѕРґ',
    declined: 'РќРµ СЃРјРѕРіСѓС‚ РїСЂРёР№С‚Рё',
    noResponse: 'РќРµС‚ РѕС‚РІРµС‚Р°',
    pending: 'Р’ РѕР¶РёРґР°РЅРёРё',
    sent: 'РћС‚РїСЂР°РІР»РµРЅРѕ',
    failed: 'РћС€РёР±РєР°',
    completed: 'Р—Р°РІРµСЂС€РµРЅРѕ',
    recentFollowups: 'Р‘Р»РёР¶Р°Р№С€РёРµ follow-up',
    empty: 'РџРѕРєР° РЅРµС‚ РґР°РЅРЅС‹С…',

    patients: 'РџР°С†РёРµРЅС‚С‹',
    patientsSubtitle: 'РЎРїРёСЃРѕРє Рё РїРѕРёСЃРє',
    add: '+ Р”РѕР±Р°РІРёС‚СЊ',
    searchPatient: 'Р¤РРћ, С‚РµР»РµС„РѕРЅ РёР»Рё Telegram...',
    newPatient: 'РќРѕРІС‹Р№ РїР°С†РёРµРЅС‚',
    newPatientSubtitle: 'Р‘С‹СЃС‚СЂРѕРµ РґРѕР±Р°РІР»РµРЅРёРµ РІРѕ РІСЂРµРјСЏ РїСЂРёС‘РјР°',
    fullName: 'Р¤РРћ',
    age: 'Р’РѕР·СЂР°СЃС‚',
    yearsOld: 'Р»РµС‚',
    telegramUsername: '@jamshed_artikov',
    complaint: 'Р–Р°Р»РѕР±Р°',
    saveAndVisit: 'РЎРѕС…СЂР°РЅРёС‚СЊ Рё РїРµСЂРµР№С‚Рё Рє Р»РµС‡РµРЅРёСЋ',

    newVisit: 'Р›РµС‡РµРЅРёРµ Рё follow-up',
    newVisitSubtitle: 'РќР°РїСЂРёРјРµСЂ: РїРѕРІС‚РѕСЂРЅС‹Р№ РѕСЃРјРѕС‚СЂ С‡РµСЂРµР· 10 РґРЅРµР№',
    treatment: 'РџСЂРѕРІРµРґС‘РЅРЅРѕРµ Р»РµС‡РµРЅРёРµ',
    recommendation: 'Р РµРєРѕРјРµРЅРґР°С†РёСЏ',
    noFollowup: 'Р‘РµР· follow-up',
    days3: 'Р§РµСЂРµР· 3 РґРЅСЏ',
    days7: 'Р§РµСЂРµР· 7 РґРЅРµР№',
    days10: 'Р§РµСЂРµР· 10 РґРЅРµР№',
    days30: 'Р§РµСЂРµР· 1 РјРµСЃСЏС†',
    telegramMessage: 'РўРµРєСЃС‚ Telegram-РЅР°РїРѕРјРёРЅР°РЅРёСЏ',
    save: 'РЎРѕС…СЂР°РЅРёС‚СЊ',
    visitSaved: 'Р›РµС‡РµРЅРёРµ СЃРѕС…СЂР°РЅРµРЅРѕ',

    addVisit: '+ РќРѕРІРѕРµ Р»РµС‡РµРЅРёРµ / follow-up',
    telegramConnect: 'РџРѕРґРєР»СЋС‡РёС‚СЊ Telegram',
    telegramConnectText: 'Р§С‚РѕР±С‹ РїР°С†РёРµРЅС‚ РїРѕР»СѓС‡Р°Р» Telegram-РЅР°РїРѕРјРёРЅР°РЅРёСЏ, РѕРЅ РґРѕР»Р¶РµРЅ РѕС‚РєСЂС‹С‚СЊ СЌС‚Сѓ СЃРїРµС†РёР°Р»СЊРЅСѓСЋ СЃСЃС‹Р»РєСѓ Рё РЅР°Р¶Р°С‚СЊ /start РІ Р±РѕС‚Рµ.',
    telegramNotConfigured: 'Username Р±РѕС‚Р° РЅРµ РЅР°СЃС‚СЂРѕРµРЅ. Р”РѕР±Р°РІСЊС‚Рµ VITE_TELEGRAM_BOT_USERNAME РІ Railway frontend Variables.',
    telegramLinkHelp: 'РћС‚РїСЂР°РІСЊС‚Рµ СЌС‚Сѓ СЃСЃС‹Р»РєСѓ РїР°С†РёРµРЅС‚Сѓ РёР»Рё РѕС‚РєСЂРѕР№С‚Рµ РµС‘ РЅР° С‚РµР»РµС„РѕРЅРµ РїР°С†РёРµРЅС‚Р°.',
    telegramConnected: 'Telegram РїРѕРґРєР»СЋС‡С‘РЅ',
    telegramConnectedText: 'РўРµРїРµСЂСЊ СЌС‚РѕРјСѓ РїР°С†РёРµРЅС‚Сѓ Р±СѓРґСѓС‚ РѕС‚РїСЂР°РІР»СЏС‚СЊСЃСЏ follow-up РЅР°РїРѕРјРёРЅР°РЅРёСЏ С‡РµСЂРµР· Telegram.',
    visitsHistory: 'РСЃС‚РѕСЂРёСЏ Р»РµС‡РµРЅРёСЏ',
    followupHistory: 'РСЃС‚РѕСЂРёСЏ follow-up',
    noVisits: 'Р›РµС‡РµРЅРёР№ РїРѕРєР° РЅРµС‚',
    treatmentMissing: 'Р›РµС‡РµРЅРёРµ РЅРµ СѓРєР°Р·Р°РЅРѕ',

    followups: 'Follow-up',
    followupsSubtitle: 'Р—Р°РїР»Р°РЅРёСЂРѕРІР°РЅРЅС‹Рµ РЅР°РїРѕРјРёРЅР°РЅРёСЏ',
    status: 'РЎС‚Р°С‚СѓСЃ',
    sendNow: 'РћС‚РїСЂР°РІРёС‚СЊ',
    markCompleted: 'РџСЂРёС€С‘Р»',
    loading: 'Р—Р°РіСЂСѓР·РєР°...'
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
