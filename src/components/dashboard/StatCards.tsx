'use client';

import React from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import {
  calculateDetailedAge,
  BBU_CONFIG,
  TBU_CONFIG,
  BBTB_CONFIG,
  KBM_STATUS_CONFIG,
} from '@/lib/whoGrowthStandards';
import { Scale, Ruler, Brain, Heart, Activity } from 'lucide-react';

export default function StatCards() {
  const { getActiveChild, getLatestVisit } = usePosyanduStore();
  const child = getActiveChild();
  const latest = getLatestVisit();

  if (!child) return null;

  const currentAge = latest
    ? `${latest.ageMonths} Bulan`
    : calculateDetailedAge(child.birthDate, new Date().toISOString().split('T')[0]).text;

  const bbuConfig = latest ? BBU_CONFIG[latest.bbuStatus] : null;
  const tbuConfig = latest ? TBU_CONFIG[latest.tbuStatus] : null;
  const bbtbConfig = latest ? BBTB_CONFIG[latest.bbtbStatus] : null;
  const kbmConfig = latest ? KBM_STATUS_CONFIG[latest.weightGainStatus] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Indikator Utama: Berat Badan (BB) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Scale className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-slate-700">Berat Badan (BB)</span>
            </div>
            {kbmConfig && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${kbmConfig.badgeClass}`}>
                {kbmConfig.label}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {latest ? latest.weightKg : child.birthWeight}
            </span>
            <span className="text-xs font-semibold text-slate-500">kg</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">Status BB/U:</span>
          <span className={`font-semibold px-2 py-0.5 rounded-md text-[10px] ${bbuConfig?.badgeClass || 'bg-slate-100 text-slate-700'}`}>
            {bbuConfig?.label || 'Normal'}
          </span>
        </div>
      </div>

      {/* 2. Indikator Utama: Tinggi / Panjang Badan (TB) & Status Stunting */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Ruler className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-slate-700">Panjang / Tinggi (TB)</span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                tbuConfig?.isStunted
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-teal-50 text-teal-800 border border-teal-200'
              }`}
            >
              {tbuConfig?.isStunted ? 'Waspada Stunting' : 'Tinggi Normal'}
            </span>
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {latest ? latest.heightCm : child.birthHeight}
            </span>
            <span className="text-xs font-semibold text-slate-500">cm</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">Status TB/U:</span>
          <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[130px]">
            {tbuConfig?.label || 'Normal'}
          </span>
        </div>
      </div>

      {/* 3. Indikator Pendukung: Status Gizi (BB/TB) & LiLA */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Heart className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-slate-700">Status Gizi (BB/TB)</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              LiLA: {latest?.armCircCm ? `${latest.armCircCm} cm` : '-'}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-2xl font-black text-slate-900 block truncate">
              {bbtbConfig?.label || 'Gizi Baik'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">Kenaikan Bulan Lalu:</span>
          <span className="font-bold text-emerald-700 text-xs">
            {latest?.weightGainGram && latest.weightGainGram > 0 ? `+${latest.weightGainGram} g` : 'Data Registrasi'}
          </span>
        </div>
      </div>

      {/* 4. Indikator Pendukung: Lingkar Kepala & Usia Kronologis */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Brain className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold text-slate-700">Lingkar Kepala (LK)</span>
            </div>
            <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {currentAge}
            </span>
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {latest?.headCircCm || child.birthHeadCirc || 34.0}
            </span>
            <span className="text-xs font-semibold text-slate-500">cm</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">Perkembangan Motorik:</span>
          <span className="font-semibold text-emerald-700 text-[11px]">Sesuai Umur (KPSP)</span>
        </div>
      </div>
    </div>
  );
}
