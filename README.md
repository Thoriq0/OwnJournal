# 🧠 Own Journal

**Own Journal** adalah aplikasi jurnal pribadi berbasis web yang dibuat dengan **Next.js 16**, **PostgreSQL**, dan **Prisma ORM**.  
Tujuannya sederhana — biar lo bisa nulis, nyimpen, dan ngatur catatan pribadi lo sendiri, *tanpa tergantung layanan pihak ketiga.*

---

Gw ada upload ke vercel buat preview : https://own-journal.vercel.app/
Note : Catatan Pertama jangan di hapus

## 🚀 Fitur Utama
- ✍️ Tulis dan simpan jurnal pribadi lo
- 🔒 Data disimpan lokal di server lo (pakai PostgreSQL)
- ⚡ Dibangun dengan Next.js 16 + React 19 untuk performa cepat
- 🎨 Animasi lembut pakai Framer Motion
- 🧩 ORM modern: Prisma
- 🌈 Styling modern dengan Tailwind CSS v4
- 🐳 Siap jalan di Docker (optional)

---

## 🧰 Teknologi & Package Utama

| Kategori | Package | Keterangan |
|-----------|----------|------------|
| Framework | [Next.js 16](https://nextjs.org) | Fullstack React Framework |
| UI/Animasi | [Framer Motion](https://www.framer.com/motion/) | Animasi interaktif |
| UI Icon | [Lucide React](https://lucide.dev) | Icon set ringan dan modern |
| ORM | [Prisma](https://www.prisma.io) | Abstraksi database PostgreSQL |
| Database | PostgreSQL | Database relasional |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS framework |
| Environment | [dotenv](https://www.npmjs.com/package/dotenv) | Manajemen variabel environment |

---

## ⚙️ Persiapan Awal

### 1️⃣ Clone repo ini
```bash
git clone https://github.com/<username>/own-journal.git
cd own-journal
```

### 2️⃣ Install dependencies
```bash
npm install
# atau
pnpm install
```

### 3️⃣ Buat file environment
```bash
cp .env.example .env
cp src/app/.env.local.example src/app/.env.local
```
Terus ubah isi DATABASE_URL dan NEXT_PUBLIC_BASE_URL sesuai kebutuhan lo.. **CEK ENV NYA**

### 4️⃣ Inisialisasi Prisma
npx prisma migrate dev

## 💻 Jalankan Project di Local
Mode Development :
```bash
npm run dev
```
Buka di browser: 👉 http://localhost:3000
