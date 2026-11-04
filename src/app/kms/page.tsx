'use client';

import React from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import KMSChart from '@/components/charts/KMSChart';
import { KBM_TABLE } from '@/lib/whoGrowthStandards';
import { LineChart, Info, ShieldAlert, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

export default function KMSDigitalPage() {
  const { getActiveChild, getActiveVisits } = usePosyanduStore();
  const child = getActiveChild();
  const visits = getActiveVisits();

  if (!child) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              KMS Digital Kemenkes RI
            </span>
            <span className="text-xs text-slate-400 font-medium">WHO Child Growth Standards</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Kartu Menuju Sehat (KMS) & Kurva Pertumbuhan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Grafik pemantauan status gizi dan antropometri balita: <strong>{child.name}</strong>
          </p>
        </div>
      </div>

      {/* Main Interactive Chart */}
      <KMSChart visits={visits} gender={child.gender} childName={child.nickname || child.name} />

      {/* Tabel Pemenuhan Target KBM Bulanan */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Tabel Evaluasi Kenaikan Berat Badan Minimal (KBM) Bulanan</span>
          </h3>
          <p className="text-xs text-slate-500">
            KBM adalah patokan gram kenaikan minimal setiap bulan agar anak tidak jatuh ke zona stunting.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider bg-slate-50">
                <th className="py-3 px-4 rounded-l-xl">Bulan Ke</th>
                <th className="py-3 px-4">Tanggal Kunjungan</th>
                <th className="py-3 px-4">Berat Badan (BB)</th>
                <th className="py-3 px-4">Target KBM Kemenkes</th>
                <th className="py-3 px-4">Kenaikan Riil</th>
                <th className="py-3 px-4">Status KBM</th>
                <th className="py-3 px-4 rounded-r-xl">Keterangan Medis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visits.map((v, idx) => {
                const targetKBM = KBM_TABLE[v.ageMonths] || 200;
                const isFirst = idx === 0 || v.ageMonths === 0;

                return (
                  <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-black text-slate-800">
                      Bulan {v.ageMonths}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-600">{v.visitDate}</td>
                    <td className="py-3 px-4 font-extrabold text-slate-900">{v.weightKg} kg</td>
                    <td className="py-3 px-4 font-semibold text-slate-500">
                      {isFirst ? '-' : `+${targetKBM} g`}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {isFirst ? (
                        <span className="text-slate-400">Berat Lahir</span>
                      ) : (
                        <span className={v.weightGainGram >= targetKBM ? 'text-emerald-700' : 'text-amber-600'}>
                          +{v.weightGainGram} g
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {isFirst ? (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                          B (Baru)
                        </span>
                      ) : v.weightGainStatus === 'N' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1 w-max">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          N (Naik)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center gap-1 w-max">
                          <ShieldAlert className="w-3 h-3 text-amber-600" />
                          T (Tidak Naik)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {isFirst
                        ? 'Pengukuran awal / lahir'
                        : v.weightGainStatus === 'N'
                        ? 'Memenuhi target pertumbuhan normal'
                        : 'Waspada: Perlu evaluasi asupan MPASI/ASI'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edukasi Kartu Menuju Sehat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1.5">
          <span className="font-bold text-emerald-900 block">🟢 Jalur Hijau (Ideal WHO)</span>
          <p className="text-emerald-800 leading-relaxed">
            Menunjukkan pertumbuhan berat dan tinggi badan yang optimal. Otak dan fisik balita berkembang sesuai potensi genetik terbaiknya.
          </p>
        </div>
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1.5">
          <span className="font-bold text-amber-900 block">🟡 Jalur Kuning (Perhatian)</span>
          <p className="text-amber-800 leading-relaxed">
            Titik pengukuran mulai bergeser menjauh dari kurva median. Kader dan orang tua perlu mengevaluasi nafsu makan, kebiasaan tidur, dan asupan gizi hewani.
          </p>
        </div>
        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs space-y-1.5">
          <span className="font-bold text-rose-900 block">🔴 Bawah Garis Merah / BGM</span>
          <p className="text-rose-800 leading-relaxed">
            Kondisi darurat gizi buruk atau stunting kronis. Anak wajib dirujuk ke Puskesmas atau Dokter Spesialis Anak untuk terapi nutrisi medis.
          </p>
        </div>
      </div>
    </div>
  );
}
