'use client';

import React from 'react';
import { NUTRITION_GUIDES } from '@/lib/kpspMilestones';
import { Apple, Utensils, ShieldCheck, Pill, HeartHandshake, Sparkles, AlertTriangle } from 'lucide-react';

export default function GiziMPASIPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Nutrisi & MPASI Posyandu
            </span>
            <span className="text-xs text-slate-400 font-medium">Strategi Nasional Pencegahan Stunting</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Panduan Gizi, Menu MPASI & Vitamin Balita
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Rekomendasi tekstur, takaran porsi, dan jadwal asupan nutrisi optimal usia 0 - 24 bulan
          </p>
        </div>
      </div>

      {/* Hero Banner Protein Hewani Anti-Stunting */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            Kunci Utama Bebas Stunting (Kemenkes RI)
          </span>
          <h2 className="text-xl font-black">
            "Satu Telur Sehari & Minimal 1 Protein Hewani Setiap Makan"
          </h2>
          <p className="text-xs text-teal-100 leading-relaxed">
            Asam amino esensial lengkap dari <strong>Hati Ayam, Telur, Ikan (Kembung/Lele/Salmon), dan Daging Sapi</strong> memicu pelepasan hormon pertumbuhan linear (IGF-1) yang mencegah balita tumbuh pendek/stunting.
          </p>
        </div>
        <div className="p-3 bg-white/10 rounded-2xl border border-white/20 text-center flex-shrink-0">
          <Utensils className="w-7 h-7 text-emerald-300 mx-auto mb-1" />
          <span className="text-xs font-bold block">MPASI Padat Gizi</span>
        </div>
      </div>

      {/* Program Posyandu: Kapsul Vitamin A & Obat Cacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Bulan Kapsul Vitamin A (Februari & Agustus)</h3>
              <p className="text-xs text-slate-500">Mencegah rabun senja & meningkatkan daya tahan tubuh</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
              <span className="font-bold text-blue-900">Kapsul Biru (100.000 IU)</span>
              <span className="font-semibold text-blue-700">Untuk Bayi 6 - 11 Bulan</span>
            </div>
            <div className="p-2.5 rounded-xl bg-red-50/70 border border-red-100 flex items-center justify-between">
              <span className="font-bold text-red-900">Kapsul Merah (200.000 IU)</span>
              <span className="font-semibold text-red-700">Untuk Anak 12 - 59 Bulan</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Pencegahan Cacingan (Setiap 6 Bulan)</h3>
              <p className="text-xs text-slate-500">Diberikan pada balita usia ≥ 1 tahun</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Infeksi cacing menyerap darah dan nutrisi balita sehingga memicu anemia dan stunting. Pastikan anak meminum <strong>Albendazole</strong> gratis di Posyandu setiap 6 bulan sekali serta selalu mencuci tangan dengan sabun.
          </p>
        </div>
      </div>

      {/* Detail Panduan MPASI per Rentang Usia */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
          <Apple className="w-5 h-5 text-emerald-600" />
          <span>Panduan MPASI Bertahap (WHO & Kemenkes)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NUTRITION_GUIDES.map((guide) => (
            <div
              key={guide.ageRange}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3 hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    Usia {guide.ageRange}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{guide.frequency}</span>
                </div>

                <h4 className="font-black text-slate-900 text-base">{guide.title}</h4>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                  <p>
                    <strong className="text-slate-800">Tekstur:</strong>{' '}
                    <span className="text-slate-600">{guide.texture}</span>
                  </p>
                  <p>
                    <strong className="text-slate-800">Takaran Porsi:</strong>{' '}
                    <span className="text-slate-600">{guide.portion}</span>
                  </p>
                </div>

                {/* Contoh Menu */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                    Contoh Menu Harian:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                    {guide.sampleMenu.map((menu, i) => (
                      <li key={i}>{menu}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tips & Warning */}
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-500">
                {guide.tips.map((tip, idx) => (
                  <p key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{tip}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
