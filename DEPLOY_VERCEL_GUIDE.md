# 🚀 Panduan Lengkap Deploy Aplikasi SiKembang Posyandu ke Vercel

Aplikasi **SiKembang Posyandu** dibangun menggunakan **Next.js 14 App Router** sehingga sangat mudah dan direkomendasikan untuk di-deploy secara instan di **Vercel** (platform resmi pembuat Next.js).

---

## 📋 Langkah 1: Persiapan Database Supabase

Jika Anda ingin menyimpan data secara online real-time di cloud Supabase:

1. Buka [https://supabase.com](https://supabase.com) dan login/daftar akun.
2. Buat Project baru (misal diberi nama `posyandu-anak`).
3. Buka menu **SQL Editor** pada sidebar kiri dashboard Supabase.
4. Salin seluruh isi file `supabase/schema.sql` di repository ini, lalu klik **Run**.
5. *(Opsional)* Salin juga isi file `supabase/seed.sql` lalu klik **Run** untuk mengisi contoh data lengkap balita Delisa Zafira Widianto dengan 10 riwayat posyandu bulanan.
6. Buka menu **Project Settings** > **API**, salin dua data penting:
   - **Project URL** (misal: `https://igaydwinzhgoocvoyrbo.supabase.co`)
   - **anon / public key** (API Key publik)

---

## 📤 Langkah 2: Upload Coding ke GitHub Repository

1. Buka [https://github.com/new](https://github.com/new) di browser Anda.
2. Buat repository baru, contoh nama: `posyandu-tumbuh-kembang-anak` (bisa pilih Public atau Private).
3. Setelah repository dibuat, salin URL repository Anda (misal: `https://github.com/nandaekonew/posyandu-tumbuh-kembang-anak.git`).
4. Di folder komputer Anda, klik ganda file:
   ```
   PUSH_KE_GITHUB.bat
   ```
5. Masukkan URL repository GitHub baru Anda saat diminta, lalu tekan **Enter**.
6. Skrip akan otomatis meng-commit semua file dan melakukan push ke branch `main`.

---

## 🌐 Langkah 3: Deploy ke Vercel (Metode 1-Klik Paling Mudah via GitHub)

1. Buka [https://vercel.com](https://vercel.com) dan masuk menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** di kanan atas, lalu pilih **"Project"**.
3. Di daftar repository GitHub Anda, pilih repository `posyandu-tumbuh-kembang-anak` lalu klik **"Import"**.
4. Di halaman konfigurasi proyek Vercel:
   - **Framework Preset**: Biarkan otomatis `Next.js`.
   - Buka menu dropdown **Environment Variables**, tambahkan 2 variabel:
     - Key: `NEXT_PUBLIC_SUPABASE_URL` | Value: *(URL Supabase Anda)*
     - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Value: *(Anon Key Supabase Anda)*
5. Klik tombol **"Deploy"**.
6. Tunggu sekitar 1 - 2 menit hingga muncul confetti perayaan.
7. Aplikasi Posyandu Anda sudah aktif secara global dan dapat diakses melalui link Vercel (misal: `https://posyandu-tumbuh-kembang.vercel.app`).

---

## 💻 Metode Alternatif: Deploy via Vercel CLI di Terminal

Jika Anda lebih menyukai baris perintah:

```powershell
# 1. Pasang Vercel CLI jika belum terpasang
npm install -g vercel

# 2. Login ke Vercel
vercel login

# 3. Deploy langsung dari folder proyek
vercel

# 4. Untuk deploy ke domain production:
vercel --prod
```

---

## ✨ Fitur-Fitur Utama yang Siap Digunakan:

- 📊 **Dashboard Tumbuh Kembang**: Indikator BB, TB, Lingkar Kepala, dan status gizi secara real-time.
- 📈 **Grafik KMS Interaktif**: Kurva standar WHO dan Kemenkes RI untuk deteksi stunting dan gagal tumbuh.
- 📋 **Rekam Kunjungan Bulanan**: Pencatatan detail antropometri, kenaikan berat badan (KBM Naik/Tidak Naik), vitamin A, obat cacing, PMT, vaksin, dan catatan kader.
- 💉 **Roadmap Imunisasi Lengkap**: Pantauan vaksin dasar dan lanjutan balita.
- 🧠 **Skrining Perkembangan KPSP**: Evaluasi motorik kasar, halus, bicara-bahasa, dan sosial kemandirian.
- 🥗 **Panduan MPASI & Gizi Seimbang**: Resep dan takaran prohe anti-stunting.
- 🖨️ **Cetak Rekap & Export CSV**: Format siap cetak resmi A4 dan download file Excel.
