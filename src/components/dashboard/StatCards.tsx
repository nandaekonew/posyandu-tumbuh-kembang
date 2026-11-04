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
import { Scale, Ruler, Brain, TrendingUp, Calendar, Heart } from 'lucide-react';

export default function StatCards() {
  const { getActiveChild, getLatestVisit, getPreviousVisit } = usePosyanduStore();
  const child = getActiveChild();
  const latest = getLatestVisit();
  const prev = getPreviousVisit();

  if (!child) return null;

  const currentAge = latest
    ? `${latest.ageMonths} Bulan`
    : calculateDetailedAge(child.birthDate, new Date().toISOString().split('T')[0]).text;

  const bbuConfig = latest ? BBU_CONFIG[latest.bbuStatus] : null;
  const tbuConfig = latest ? TBU_CONFIG[latest.tbuStatus] : null;
  const bbtbConfig = latest ? BBTB_CONFIG[latest.bbtbStatus] : null;
  const kbmConfig = latest ? KBM_STATUS_CONFIG[latest.weightGainStatus] : null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* 1. Berat Badan & KBM */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          {kbmConfig && (
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${kbmConfig.badgeClass}`}>
              {kbmConfig.label}
            </span>
          )}
        </div>
        <p className="text-xs font-semibold text-slate-500">Berat Badan (BB)</p>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {latest ? latest.weightKg : child.birthWeight}
          </span>
          <span className="text-xs font-bold text-slate-500">kg</span>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Status BB/U:</span>
          <span className={`font-semibold px-2 py-0.5 rounded-md text-[10px] ${bbuConfig?.badgeClass || 'bg-slate-100 text-slate-700'}`}>
            {bbuConfig?.label || 'Normal'}
          </span>
        </div>
      </div>

      {/* 2. Tinggi/Panjang Badan & Status Stunting */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-teal-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Ruler className="w-5 h-5" />
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tbuConfig?.isStunted ? 'bg-rose-500 text-white' : 'bg-teal-100 text-teal-800'}`}>
            {tbuConfig?.isStunted ? '⚠️ Waspada Stunting' : 'Bebas Stunting'}
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-500">Tinggi / Panjang (TB)</p>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {latest ? latest.heightCm : child.birthHeight}
          </span>
          <span className="text-xs font-bold text-slate-500">cm</span>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Status TB/U:</span>
          <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[120px]">
            {tbuConfig?.label || 'Normal'}
          </span>
        </div>
      </div>

      {/* 3. Status Gizi (BB/TB) & LiLA */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-500">LiLA: {latest?.armCircCm ? `${latest.armCircCm} cm` : '-'}</span>
        </div>
        <p className="text-xs font-semibold text-slate-500">Status Gizi (BB/TB)</p>
        <div className="mt-1">
          <span className="text-lg sm:text-xl font-bold text-slate-900 block truncate">
            {bbtbConfig?.label || 'Gizi Baik'}
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Kenaikan Bln Lalu:</span>
          <span className="font-bold text-emerald-600">
            {latest?.weightGainGram && latest.weightGainGram > 0 ? `+${latest.weightGainGram}g` : 'Data Awal'}
          </span>
        </div>
      </div>

      {/* 4. Lingkar Kepala & Usia Terkini */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Brain className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
            {currentAge}
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-500">Lingkar Kepala (LK)</p>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {latest?.headCircCm || child.birthHeadCirc || 34.0}
          </span>
          <span className="text-xs font-bold text-slate-500">cm</span>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Pertumbuhan Otak:</span>
          <span className="font-semibold text-emerald-700 text-[11px]">Optimal (Normal)</span>
        </div>
      </div>
    </div>
  );
}
