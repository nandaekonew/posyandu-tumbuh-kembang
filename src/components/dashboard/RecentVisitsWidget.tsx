'use client';

import React, { useState } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { PosyanduVisit } from '@/types';
import { BBU_CONFIG, TBU_CONFIG, KBM_STATUS_CONFIG } from '@/lib/whoGrowthStandards';
import { Calendar, Baby, Syringe, Pill, ChevronRight, Edit3, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import EditVisitModal from '../forms/EditVisitModal';

export default function RecentVisitsWidget() {
  const { getActiveVisits, getActiveChild } = usePosyanduStore();
  const visits = getActiveVisits();
  const child = getActiveChild();

  const [selectedVisitForEdit, setSelectedVisitForEdit] = useState<PosyanduVisit | null>(null);

  // Ambil 5 kunjungan terakhir, diurutkan dari yang terbaru
  const recentVisits = [...visits].reverse().slice(0, 5);

  return (
    <>
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-700" aria-hidden="true" />
              <span>Riwayat Kunjungan Posyandu Terakhir</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Catatan pemeriksaan berkala di {child?.posyanduName}</p>
          </div>
          {visits.length > 0 && (
            <Link
              href="/kunjungan"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              aria-label={`Lihat semua ${visits.length} riwayat kunjungan posyandu`}
            >
              <span>Lihat Semua ({visits.length})</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Empty State */}
        {recentVisits.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-50 border border-dashed border-slate-200 space-y-2">
            <Baby className="w-8 h-8 text-slate-400 mx-auto" aria-hidden="true" />
            <p className="text-sm font-semibold text-slate-700">Belum Ada Riwayat Kunjungan</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Klik tombol &quot;+ Catat Posyandu&quot; di bagian atas untuk mencatat hasil penimbangan dan imunisasi pertama balita Anda.
            </p>
          </div>
        ) : (
          /* List of Visits */
          <div className="space-y-2.5">
            {recentVisits.map((visit) => {
              const kbmConfig = KBM_STATUS_CONFIG[visit.weightGainStatus];
              const bbuConfig = BBU_CONFIG[visit.bbuStatus];

              return (
                <div
                  key={visit.id}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs flex-shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Usia</span>
                      <span className="text-sm font-black text-slate-800">{visit.ageMonths} bln</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{visit.visitDate}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${kbmConfig.badgeClass}`}>
                          {kbmConfig.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                        <span>
                          BB: <strong className="text-slate-900">{visit.weightKg} kg</strong>
                        </span>
                        <span>
                          TB: <strong className="text-slate-900">{visit.heightCm} cm</strong>
                        </span>
                        {visit.headCircCm && (
                          <span>
                            LK: <strong className="text-slate-900">{visit.headCircCm} cm</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {visit.vitaminA && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-semibold border border-blue-200 flex items-center gap-1">
                          <Pill className="w-3 h-3" aria-hidden="true" /> Vit A
                        </span>
                      )}
                      {visit.immunizationsGiven && visit.immunizationsGiven.length > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 font-semibold border border-purple-200 flex items-center gap-1">
                          <Syringe className="w-3 h-3" aria-hidden="true" /> {visit.immunizationsGiven.length} Vaksin
                        </span>
                      )}
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${bbuConfig.badgeClass}`}>
                        {bbuConfig.label}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedVisitForEdit(visit)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                      title={`Ubah data kunjungan usia ${visit.ageMonths} bulan`}
                      aria-label={`Ubah data kunjungan posyandu usia ${visit.ageMonths} bulan`}
                    >
                      <Edit3 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Edit Kunjungan */}
      {selectedVisitForEdit && (
        <EditVisitModal
          visit={selectedVisitForEdit}
          isOpen={!!selectedVisitForEdit}
          onClose={() => setSelectedVisitForEdit(null)}
        />
      )}
    </>
  );
}
