'use client';

import React, { useState } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { Syringe, CheckCircle2, Clock, AlertCircle, ShieldCheck, Calendar, Filter } from 'lucide-react';

export default function ImunisasiPage() {
  const { getActiveChild, getActiveImmunizations, toggleImmunization } = usePosyanduStore();
  const child = getActiveChild();
  const immunizations = getActiveImmunizations();

  const [filter, setFilter] = useState<'all' | 'given' | 'pending'>('all');

  if (!child) return null;

  const total = immunizations.length;
  const completed = immunizations.filter((i) => i.isGiven).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const filteredItems = immunizations.filter((item) => {
    if (filter === 'given') return item.isGiven;
    if (filter === 'pending') return !item.isGiven;
    return true;
  });

  const handleToggle = (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    const today = new Date().toISOString().split('T')[0];
    toggleImmunization(id, nextStatus, nextStatus ? today : undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
              Program Imunisasi Nasional
            </span>
            <span className="text-xs text-slate-400 font-medium">Kemenkes RI IDAI</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Jadwal & Catatan Imunisasi Lengkap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Daftar imunisasi wajib dan booster untuk <strong>{child.name}</strong>
          </p>
        </div>

        {/* Progress Capaian */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 min-w-[200px]">
          <div className="flex justify-between items-center text-xs font-bold mb-1">
            <span className="text-slate-600">Capaian Imunisasi:</span>
            <span className="text-emerald-700">{percentage}% ({completed}/{total})</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Semua Jadwal ({total})
        </button>
        <button
          onClick={() => setFilter('given')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'given'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Sudah Vaksin ({completed})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'pending'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Belum / Terjadwal ({total - completed})
        </button>
      </div>

      {/* Roadmap List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id, item.isGiven)}
            className={`p-4 rounded-3xl border transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
              item.isGiven
                ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  item.isGiven ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {item.isGiven ? <CheckCircle2 className="w-5 h-5" /> : <Syringe className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    Usia {item.targetAgeMonths} Bulan
                  </span>
                  {item.isGiven ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      ✓ Sudah Diberikan
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      Belum / Terjadwal
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm mt-1">{item.vaccineName}</h3>

                {item.isGiven ? (
                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                    <p>
                      Tanggal: <strong className="text-slate-700">{item.givenDate}</strong>
                    </p>
                    {item.batchNo && (
                      <p>
                        No. Batch: <span className="font-mono text-slate-600">{item.batchNo}</span>
                      </p>
                    )}
                    {item.location && <p>Faskes: {item.location}</p>}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 mt-1">{item.notes || 'Jadwalkan di Posyandu'}</p>
                )}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-semibold self-center">
              Klik untuk {item.isGiven ? 'batal' : 'tandai'}
            </div>
          </div>
        ))}
      </div>

      {/* Edukasi Pentingnya Imunisasi */}
      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Imunisasi Lengkap Melindungi Masa Depan Balita: </span>
          Vaksinasi terbukti klinis memberikan kekebalan spesifik terhadap penyakit berbahaya seperti Polio, Difteri, Tetanus, Campak, Pneumonia (PCV), dan Diare Rotavirus. Semua vaksin wajib tersedia gratis di Posyandu & Puskesmas terdekat.
        </div>
      </div>
    </div>
  );
}
