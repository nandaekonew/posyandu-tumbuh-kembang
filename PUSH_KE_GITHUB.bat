@echo off
title Push Aplikasi SiKembang Posyandu ke GitHub
color 0B
cd /d "%~dp0"
set "PATH=D:\git\cmd;%PATH%"

echo ============================================================
echo   PUSH APLIKASI SIKEMBANG POSYANDU KE GITHUB
echo ============================================================
echo Lokasi Folder Proyek: %~dp0
echo.
echo Pastikan Anda sudah membuat Repository baru di https://github.com/new
echo Contoh nama repository: posyandu-tumbuh-kembang
echo.
set /p REPO_URL="Masukkan URL Git Repository Tujuan (contoh: https://github.com/nandaekonew/posyandu.git): "

if not "%REPO_URL%"=="" (
    if not exist ".git" (
        git init
    )
    git remote remove origin 2>nul
    git remote add origin %REPO_URL%
)

echo.
echo Menambahkan file dan membuat commit...
git add .
git commit -m "feat: inisialisasi aplikasi pemantauan tumbuh kembang anak posyandu (KMS & KIA digital)"

echo.
echo Mengirim kode ke branch main di GitHub...
git branch -M main
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ============================================================
    echo   BERHASIL! Kode sudah ter-push ke GitHub.
    echo   Anda sekarang dapat menghubungkan repo ini ke Vercel.
    echo ============================================================
) else (
    echo ============================================================
    echo   Gagal melakukan push. Pastikan URL repository benar dan
    echo   Anda memiliki izin akses / sudah login ke GitHub.
    echo ============================================================
)
pause
