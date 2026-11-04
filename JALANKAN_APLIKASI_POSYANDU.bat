@echo off
title Menjalankan Aplikasi SiKembang Posyandu
color 0A
cd /d "%~dp0"
set "PATH=D:\nodejs;D:\git\cmd;%PATH%"

echo ============================================================
echo   SIKEMBANG POSYANDU - PEMANTAUAN TUMBUH KEMBANG ANAK
echo   (KMS & BUKU KIA DIGITAL TERINTEGRASI SUPABASE)
echo ============================================================
echo.
echo Sedang menyiapkan server aplikasi...
echo Lokasi Folder: %~dp0
echo Jangan tutup jendela ini selama menggunakan aplikasi.
echo.

start "" "http://localhost:3000"
npm run dev
pause
