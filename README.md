# Stamotolog / DocFollowUp MVP — Docker'siz versiya

Bu versiya **Docker va Redis talab qilmaydi**.

## Nima ishlaydi?

- Mobilga mos web panel / PWA
- Shifokor login
- Bemor qo‘shish: FISH, yosh, telefon, Telegram username, shikoyat
- Muolaja yozish
- 3/7/10/30 kundan keyingi follow-up
- Telegram eslatma
- Bemor javobi: Kelaman / Vaqtni o‘zgartiraman / Kela olmayman
- Dashboard statistikasi

## Muhim

Telegram bot bemorga xabar yuborishi uchun bemor botga bir marta `/start` bosib ulanishi kerak.

## Lokal ishga tushirish

Kompyuterda kerak bo‘ladi:

- Node.js
- PostgreSQL yoki Railway PostgreSQL `DATABASE_URL`

### Backend

```powershell
cd "D:\My Project\Stamotolog\backend"
copy .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Backend: http://localhost:4000

### Frontend

Yangi PowerShell oynasida:

```powershell
cd "D:\My Project\Stamotolog\frontend"
copy .env.example .env
npm install
npm run dev
```

Frontend: http://localhost:5173

## Railway deploy

Backend ENV:

```env
DATABASE_URL=
JWT_SECRET=
TELEGRAM_BOT_TOKEN=
FRONTEND_URL=
BACKEND_URL=
PORT=4000
SCHEDULER_INTERVAL_SECONDS=60
```

Frontend ENV:

```env
VITE_API_URL=https://your-backend.up.railway.app/api
```

## Eslatma yuborish qanday ishlaydi?

Redis/BullMQ o‘rniga backend ichida oddiy scheduler ishlaydi:

- har 60 soniyada database tekshiriladi;
- `status=pending` va `scheduledAt <= now` bo‘lgan follow-up’lar topiladi;
- Telegram xabar yuboriladi;
- status `sent` bo‘ladi.

Bu MVP uchun yetarli. Keyinchalik katta klinikalar uchun Redis queue qo‘shish mumkin.
