'use client';

import React from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { ShieldCheck, AlertTriangle, AlertOctagon, ArrowRight } from 'lucide-react';
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
  const isStunted = latest?.tbuStatus === 'stunted' || latest?.tbuStatus === 'severely_stunted';

  if (is2T) {
    return (
      <div className="bg-rose-950 border border-rose-800 rounded-2xl p-5 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-900 border border-rose-700 flex items-center justify-center flex-shrink-0">
            <AlertOctagon className="w-5 h-5 text-rose-300" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-rose-900 text-rose-200 border border-rose-700 text-[11px] font-bold uppercase tracking-wide">
                Peringatan Dini 2T
              </span>
              <span className="text-xs text-rose-200 font-medium">Buku KIA Kemenkes RI</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Berat badan tidak mengalami kenaikan selama 2 penimbangan berturut-turut
            </h3>
            <p className="text-xs text-rose-100/90 mt-0.5 max-w-2xl leading-relaxed">
              Pertumbuhan berat badan {child.nickname} berada di bawah target Kenaikan Berat Minimal (KBM). Disarankan membawa anak ke <strong>Puskesmas atau Faskes rujukan</strong> untuk evaluasi asupan MPASI dan skrining infeksi.
            </p>
          </div>
        </div>
        <Link
          href="/gizi-mpasi"
          className="px-3.5 py-2 rounded-xl bg-rose-900 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0 border border-rose-700"
          aria-label="Buka panduan nutrisi untuk anak dengan berat badan tidak naik"
        >
          <span>Panduan Nutrisi</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  if (isStunted) {
    return (
      <div className="bg-amber-950 border border-amber-800 rounded-2xl p-5 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-900 border border-amber-700 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-300" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-900 text-amber-200 border border-amber-700 text-[11px] font-bold uppercase tracking-wide">
                Perhatian Khusus TB/U
              </span>
              <span className="text-xs text-amber-200 font-medium">Standar Pertumbuhan WHO</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Tinggi badan berada di bawah ambang batas standar normal (-2 SD)
            </h3>
            <p className="text-xs text-amber-100/90 mt-0.5 max-w-2xl leading-relaxed">
              Tinggi badan {child.nickname} tercatat {latest.heightCm} cm. Utamakan asupan protein hewani harian (telur, ikan, hati ayam, atau daging sapi) dan konsultasikan dengan petugas posyandu untuk pemantauan linear.
            </p>
          </div>
        </div>
        <Link
          href="/gizi-mpasi"
          className="px-3.5 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0 border border-amber-700"
          aria-label="Buka panduan menu gizi pencegahan stunting"
        >
          <span>Menu Nutrisi</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-emerald-950 border border-emerald-800/90 rounded-2xl p-5 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-emerald-900 border border-emerald-700 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-300" aria-hidden="true" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-900 text-emerald-200 border border-emerald-700 text-[11px] font-bold">
              Pertumbuhan Optimal
            </span>
            <span className="text-xs text-emerald-200/90 font-medium">Standar Kurva KMS WHO</span>
          </div>
          <h3 className="text-base font-bold text-white mt-1">
            Status pertumbuhan fisik {child.nickname} terpantau sesuai standar
          </h3>
          <p className="text-xs text-emerald-100/90 mt-0.5 max-w-2xl leading-relaxed">
            Kenaikan berat badan pada penimbangan terakhir mencapai +{latest.weightGainGram} gram (memenuhi KBM). Kurva panjang badan dan lingkar kepala berkembang selaras pada zona hijau.
          </p>
        </div>
      </div>
      <Link
        href="/kms"
        className="px-3.5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0 border border-emerald-700"
        aria-label="Buka grafik kurva pertumbuhan KMS WHO"
      >
        <span>Lihat Grafik KMS</span>
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
