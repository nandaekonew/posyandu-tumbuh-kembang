# 👶 SiKembang Posyandu - Pemantauan Tumbuh Kembang Anak (KMS & KIA Digital)

Aplikasi web modern **Kartu Menuju Sehat (KMS) & Buku KIA Digital** untuk memantau pertumbuhan dan perkembangan balita dari hasil penimbangan rutin Posyandu setiap bulannya secara terperinci, akurat sesuai standar antropometri **WHO & Permenkes RI No. 2 Tahun 2020**.

Terintegrasi dengan database **Supabase (PostgreSQL)**, siap di-upload ke **GitHub Repository**, dan siap dideploy langsung ke **Vercel**.

---

## 🌟 Modul & Fitur Unggulan

### 1. 📊 Dashboard Tumbuh Kembang & Early Warning System
- **Ringkasan Profil Balita**: Nama, tanggal lahir, usia terperinci (bulan & hari), Posyandu, NIK, dan Nomor Buku KIA.
- **Kartu Indikator Antropometri**:
  - Berat Badan (BB) terkini + Status BB/U (Sangat Kurang, Kurang, Normal, Risiko Lebih).
  - Panjang / Tinggi Badan (TB) terkini + Status TB/U Deteksi Dini Stunting (Sangat Pendek, Pendek, Normal, Tinggi).
  - Status Gizi Akut BB/TB (Gizi Buruk, Gizi Kurang, Gizi Baik, Berisiko Lebih, Obesitas).
  - Lingkar Kepala (LK) + Evaluasi mikrosefali/makrosefali.
- **Smart Stunting Alert Banner**:
  - Peringatan keras **2T** (Berat badan tidak naik 2 bulan berturut-turut) dengan anjuran rujukan Puskesmas.
  - Peringatan waspada stunting jika tinggi badan di bawah -2 SD standar WHO.
  - Notifikasi status pertumbuhan prima jika anak berkembang optimal.

### 2. 📈 Grafik KMS Digital Interaktif (WHO Growth Standards)
- Visualisasi kurva pertumbuhan interaktif menggunakan **Recharts**:
  - Kurva BB menurut Umur (BB/U) lengkap dengan garis median ideal WHO (0 SD), batas atas (+2 SD), batas bawah (-2 SD), dan Garis Merah / BGM (-3 SD).
  - Kurva TB/PB menurut Umur (TB/U) penentu stunting.
  - Kurva Lingkar Kepala menurut Umur (LK/U).
- Plotting titik kunjungan bulanan riil anak dengan tooltip informatif dan evaluasi kenaikan.
- Tabel Pemenuhan **Target KBM (Kenaikan Berat Badan Minimal)** Kemenkes per bulan (+800g, +900g, +800g, dst.) dengan status **N (Naik)** atau **T (Tidak Naik)**.

### 3. 📋 Pencatatan Kunjungan Posyandu Bulanan Terperinci
- Input data kunjungan lengkap:
  - Tanggal kunjungan & usia otomatis dihitung.
  - Berat Badan (kg), Tinggi Badan (cm), Lingkar Kepala (cm), Lingkar Lengan Atas / LiLA (cm).
  - Auto-evaluasi KBM (Naik / Tidak Naik dibanding timbangan bulan lalu).
  - Checklist Suplementasi Posyandu: Kapsul Vitamin A (Biru / Merah), Obat Cacing, PMT (Pemberian Makanan Tambahan), Oralit/Zinc, dan Tetes Zat Besi.
  - Checklist Imunisasi yang diberikan saat kunjungan.
  - Evaluasi Skrining KPSP (Sesuai, Meragukan, Penyimpangan).
  - Catatan keluhan orang tua dan saran/edukasi Bidan Posyandu.
- Fitur Edit dan Hapus data kunjungan.
- Pencarian dan filter status KBM.

### 4. 💉 Roadmap & Tracker Imunisasi Nasional Lengkap
- Checklist imunisasi dasar dan booster balita: HB-0, BCG, Polio tetes (bOPV 1-4), DPT-HB-Hib (Pentabio 1-3), PCV (Pneumokokus 1-3), Rotavirus (RV 1-3), Polio suntik (IPV 1-2), Campak-Rubella (MR 1-2), dan booster lanjutan.
- Interaktif 1-klik untuk menandai status vaksin (Sudah/Belum), tanggal penyuntikan, dan nomor batch vaksin.
- Progress bar capaian imunisasi balita.

### 5. 🧠 Skrining Perkembangan KPSP (Kemenkes RI)
- Kuesioner Pra-Skrining Perkembangan sesuai kelompok umur (3, 6, 9, 12 bulan).
- 4 Sektor Perkembangan: Motorik Kasar, Motorik Halus, Bicara & Bahasa, Sosialisasi & Kemandirian.
- Tips stimulasi praktis bagi Ayah dan Bunda untuk melatih kecerdasan balita di rumah.

### 6. 🥗 Panduan Gizi, Menu MPASI & Anti-Stunting
- Panduan MPASI bertahap: ASI Eksklusif (0-6 bln), Bubur Lumat (6-8 bln), Cincang Halus (9-11 bln), Makanan Keluarga (12-23 bln).
- Contoh resep menu tinggi protein hewani (prohe) anti-stunting (telur, hati ayam, ikan kembung, daging sapi).
- Jadwal pemberian Kapsul Vitamin A (Februari & Agustus) dan Obat Cacing tiap 6 bulan.

### 7. 🖨️ Cetak Resume KMS & Export Excel/CSV
- Tampilan cetak resmi (Print View A4) Kartu Menuju Sehat lengkap dengan kop resmi dan kolom tanda tangan Bidan / Posyandu.
- Fitur Export data rekapitulasi riwayat bulanan ke format **CSV / Microsoft Excel**.

### 8. 👥 Manajemen Data Multi-Anak
- Dapat mengelola lebih dari 1 balita dalam satu dashboard dengan penggantian profil instan.
- Sudah dilengkapi data awal balita **Delisa Zafira Widianto** beserta 10 riwayat kunjungan bulanan lengkap.

---

## 🛠️ Tech Stack & Arsitektur

| Lapisan | Teknologi | Penjelasan |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14+ (App Router)** | Rendering cepat, SEO-friendly, struktur bersih |
| **Bahasa** | **TypeScript** | Type-safe, minim bug antropometri & perhitungan medis |
| **Styling** | **Tailwind CSS** | Antarmuka bersih, responsif smartphone, tema Posyandu |
| **Komponen UI & Ikon** | **Lucide React** | Ikon modern, jelas, dan ringan |
| **Grafik & Visualisasi** | **Recharts** | Rendering kurva KMS WHO responsif |
| **State Management** | **Zustand** | State cepat, persistensi LocalStorage + Supabase sync |
| **Database Cloud** | **Supabase (PostgreSQL)** | Database relasional kuat, RLS security, cloud sync |
| **Deployment** | **Vercel** | Hosting global instan dan otomatis dari GitHub |

---

## ⚙️ Petunjuk Menjalankan di Komputer Lokal

1. Pastikan dependensi sudah terpasang:
   ```bash
   npm install
   ```
2. Jalankan aplikasi menggunakan file skrip:
   - Cukup **dobel-klik file `JALANKAN_APLIKASI_POSYANDU.bat`**, atau
   - Jalankan perintah:
     ```bash
     npm run dev
     ```
3. Buka browser di alamat: `http://localhost:3000`.

---

## 🗄️ Setup Database Supabase

Aplikasi sudah memiliki mode offline/lokal bawaan dengan data default yang lengkap. Untuk sinkronisasi cloud:

1. Buka [https://supabase.com](https://supabase.com) dan buat project baru.
2. Buka menu **SQL Editor**, buka file `supabase/schema.sql` pada repository ini, salin dan jalankan (Run).
3. Salin juga file `supabase/seed.sql` untuk mengisi data awal balita.
4. Buat file `.env.local` pada folder utama proyek:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. Restart server: `npm run dev`.

---

## 📤 Upload ke GitHub & Deploy ke Vercel

Panduan terperinci langkah demi langkah tersedia pada file [`DEPLOY_VERCEL_GUIDE.md`](./DEPLOY_VERCEL_GUIDE.md).

Cukup jalankan:
```cmd
PUSH_KE_GITHUB.bat
```
Lalu hubungkan repository GitHub tersebut ke akun [Vercel](https://vercel.com) dengan satu klik.
