'use client';

import React from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { ShieldCheck, AlertTriangle, AlertOctagon, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StuntingAlertBanner() {
  const { getActiveVisits, getActiveChild } = usePosyanduStore();
  const visits = getActiveVisits();
  const child = getActiveChild();

  if (visits.length === 0 || !child) return null;

  const latest = visits[visits.length - 1];
  const prev = visits.length >= 2 ? visits[visits.length - 2] : null;

  // Cek apakah 2T (2 bulan berturut-turut Tidak Naik)
  const is2T = latest?.weightGainStatus === 'T' && prev?.weightGainStatus === 'T';
  const is1T = latest?.weightGainStatus === 'T' && !is2T;
  const isStunted = latest?.tbuStatus === 'stunted' || latest?.tbuStatus === 'severely_stunted';

  if (is2T) {
    return (
      <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-5 text-white shadow-lg shadow-red-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertOctagon className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-white text-red-700 text-xs font-black tracking-wide uppercase">
                Peringatan Dini 2T
              </span>
              <span className="text-xs text-red-100">Buku KIA Kemenkes RI</span>
            </div>
            <h3 className="text-lg font-extrabold mt-1">Berat Badan Tidak Naik 2 Bulan Berturut-Turut</h3>
            <p className="text-xs text-red-100 mt-0.5 max-w-2xl leading-relaxed">
              Bunda/Ayah, pertumbuhan berat badan {child.nickname} berada di bawah target KBM selama 2 kali penimbangan berurutan. Segera bawa anak ke <strong>Puskesmas atau Dokter Spesialis Anak</strong> untuk skrining penyebab (infeksi, asupan MPASI, atau absorpsi nutrisi).
            </p>
          </div>
        </div>
        <Link
          href="/gizi-mpasi"
          className="px-4 py-2.5 rounded-xl bg-white text-red-700 font-bold text-xs hover:bg-red-50 flex items-center gap-1.5 transition-colors flex-shrink-0"
        >
          <span>Panduan Nutrisi</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (isStunted) {
    return (
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-5 text-white shadow-lg shadow-amber-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="px-2 py-0.5 rounded-md bg-white text-amber-800 text-xs font-black tracking-wide uppercase">
              Perhatian Khusus TB/U
            </span>
            <h3 className="text-lg font-extrabold mt-1">Indikasi Tinggi Badan Di Bawah Standar (-2 SD)</h3>
            <p className="text-xs text-amber-100 mt-0.5 max-w-2xl leading-relaxed">
              Tinggi badan {child.nickname} tercatat {latest.heightCm} cm. Perbanyak konsumsi <strong>Protein Hewani (Telur 1-2 butir/hari, Ikan, Hati Ayam, Daging Sapi)</strong> serta suplementasi zat besi untuk merangsang hormon pertumbuhan linear anak.
            </p>
          </div>
        </div>
        <Link
          href="/gizi-mpasi"
          className="px-4 py-2.5 rounded-xl bg-white text-amber-800 font-bold text-xs hover:bg-amber-50 flex items-center gap-1.5 transition-colors flex-shrink-0"
        >
          <span>Menu Anti-Stunting</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-5 text-white shadow-lg shadow-emerald-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-emerald-200" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-[11px] font-bold">
              Status Tumbuh Kembang Prima 🌟
            </span>
            <span className="text-xs text-emerald-100">Bebas Stunting • Garis Hijau KMS</span>
          </div>
          <h3 className="text-lg font-extrabold mt-0.5">Pertumbuhan {child.nickname} Sangat Baik & Optimal!</h3>
          <p className="text-xs text-emerald-100 mt-0.5 max-w-2xl">
            Kenaikan berat badan bulan ini memenuhi target KBM (+{latest.weightGainGram}g). Tinggi dan lingkar kepala berkembang harmonis di garis standar WHO. Pertahankan gizi seimbang dan stimulasi harian!
          </p>
        </div>
      </div>
      <Link
        href="/kms"
        className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5 transition-colors flex-shrink-0 shadow-sm"
      >
        <span>Lihat Grafik KMS</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
