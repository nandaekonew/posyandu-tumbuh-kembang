'use client';

import React, { useState } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { PosyanduVisit } from '@/types';
import {
  BBU_CONFIG,
  TBU_CONFIG,
  BBTB_CONFIG,
  KBM_STATUS_CONFIG,
} from '@/lib/whoGrowthStandards';
import {
  Baby,
  PlusCircle,
  Calendar,
  Scale,
  Ruler,
  Brain,
  Pill,
  Syringe,
  Edit3,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import AddVisitModal from '@/components/forms/AddVisitModal';
import EditVisitModal from '@/components/forms/EditVisitModal';

export default function KunjunganPage() {
  const { getActiveChild, getActiveVisits } = usePosyanduStore();
  const activeChild = getActiveChild();
  const visits = getActiveVisits();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVisitForEdit, setSelectedVisitForEdit] = useState<PosyanduVisit | null>(null);

  if (!activeChild) return null;

  // Filter list
  const filteredVisits = visits.filter((v) => {
    const matchesSearch =
      v.visitDate.includes(searchTerm) ||
      v.examinerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.cadreNotes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.immunizationsGiven?.some((im) => im.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'N' && v.weightGainStatus === 'N') ||
      (filterStatus === 'T' && v.weightGainStatus === 'T');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Rekam Medis Posyandu
            </span>
            <span className="text-xs text-slate-400 font-medium">Buku KIA Digital</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Riwayat Hasil Posyandu Bulanan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Data pemantauan tumbuh kembang terperinci untuk <strong>{activeChild.name}</strong> ({activeChild.posyanduName})
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-200 self-start sm:self-auto transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Catat Posyandu Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tanggal, vaksin, catatan kader, atau bidan..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 bg-white rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">Semua Status KBM</option>
            <option value="N">Hanya Naik (N) 📈</option>
            <option value="T">Hanya Tidak Naik (T) ⚠️</option>
          </select>
        </div>
      </div>

      {/* Daftar Kunjungan (Tabel Desktop & Kartu Mobile) */}
      <div className="space-y-4">
        {filteredVisits.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Baby className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-base">Belum Ada Catatan Posyandu</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Klik tombol "+ Catat Posyandu Baru" di atas untuk menambahkan hasil timbangan dan pengukuran anak.
            </p>
          </div>
        ) : (
          filteredVisits.map((visit) => {
            const kbmConfig = KBM_STATUS_CONFIG[visit.weightGainStatus];
            const bbuConfig = BBU_CONFIG[visit.bbuStatus];
            const tbuConfig = TBU_CONFIG[visit.tbuStatus];
            const bbtbConfig = BBTB_CONFIG[visit.bbtbStatus];

            return (
              <div
                key={visit.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4 hover:border-emerald-300 transition-all"
              >
                {/* Header Kartu Kunjungan */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 font-black text-sm flex flex-col items-center justify-center border border-emerald-100">
                      <span className="text-[10px] text-emerald-600 font-semibold uppercase">Bulan</span>
                      <span>{visit.ageMonths}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900">
                          {visit.visitDate}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${kbmConfig.badgeClass}`}>
                          {kbmConfig.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Pemeriksa: <span className="font-medium text-slate-600">{visit.examinerName || 'Bidan Desa'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setSelectedVisitForEdit(visit)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ubah Data</span>
                    </button>
                  </div>
                </div>

                {/* 4 Pilar Antropometri */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* BB */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <Scale className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Berat Badan</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-slate-900">{visit.weightKg}</span>
                      <span className="text-xs text-slate-500 font-bold">kg</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Delta KBM:</span>
                      <span className="font-bold text-emerald-700">
                        {visit.weightGainGram > 0 ? `+${visit.weightGainGram}g` : `${visit.weightGainGram}g`}
                      </span>
                    </div>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md font-semibold ${bbuConfig.badgeClass}`}>
                      {bbuConfig.label}
                    </span>
                  </div>

                  {/* TB */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <Ruler className="w-3.5 h-3.5 text-teal-600" />
                      <span>Tinggi / Panjang</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-slate-900">{visit.heightCm}</span>
                      <span className="text-xs text-slate-500 font-bold">cm</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Skrining:</span>
                      <span className={`font-bold ${tbuConfig.isStunted ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {tbuConfig.isStunted ? 'Stunted' : 'Normal'}
                      </span>
                    </div>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md font-semibold ${tbuConfig.badgeClass}`}>
                      {tbuConfig.label}
                    </span>
                  </div>

                  {/* LK & LiLA */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <Brain className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Lingkar Kepala & LiLA</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-black text-slate-900">{visit.headCircCm || '-'}</span>
                      <span className="text-xs text-slate-500 font-bold">cm</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">LiLA:</span>
                      <span className="font-bold text-slate-800">{visit.armCircCm ? `${visit.armCircCm} cm` : '-'}</span>
                    </div>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md font-semibold bg-indigo-50 text-indigo-700">
                      LK Normal (WHO)
                    </span>
                  </div>

                  {/* Status Gizi & KPSP */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <span>Status Gizi (BB/TB)</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-sm font-black text-slate-900 block truncate">
                        {bbtbConfig.label}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">KPSP:</span>
                      <span className="font-bold text-emerald-700 capitalize">
                        {visit.kpspStatus || 'Sesuai'}
                      </span>
                    </div>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md font-semibold bg-emerald-100 text-emerald-800">
                      Gizi Baik Optimal
                    </span>
                  </div>
                </div>

                {/* Pemberian Suplemen & Vaksin */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  {visit.vitaminA && (
                    <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 font-semibold border border-blue-200 flex items-center gap-1.5">
                      <Pill className="w-3.5 h-3.5 text-blue-600" />
                      Kapsul Vitamin A ({visit.vitaminAType === 'merah' ? 'Merah 200k IU' : 'Biru 100k IU'})
                    </span>
                  )}
                  {visit.dewormingMed && (
                    <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 font-semibold border border-amber-200 flex items-center gap-1.5">
                      <Pill className="w-3.5 h-3.5 text-amber-600" />
                      Obat Cacing
                    </span>
                  )}
                  {visit.pmtReceived && (
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1.5">
                      PMT Biskuit Balita
                    </span>
                  )}
                  {visit.ironSupplements && (
                    <span className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-800 font-semibold border border-purple-200 flex items-center gap-1.5">
                      Tetes Zat Besi
                    </span>
                  )}
                  {visit.immunizationsGiven && visit.immunizationsGiven.map((imun) => (
                    <span
                      key={imun}
                      className="px-2.5 py-1 rounded-xl bg-violet-100 text-violet-800 font-bold border border-violet-200 flex items-center gap-1.5"
                    >
                      <Syringe className="w-3.5 h-3.5 text-violet-600" />
                      {imun}
                    </span>
                  ))}
                </div>

                {/* Catatan Kader & Edukasi */}
                {(visit.cadreNotes || visit.complaints) && (
                  <div className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/60 text-xs space-y-1">
                    {visit.complaints && (
                      <p className="text-slate-600">
                        <strong className="text-slate-800">Keluhan:</strong> {visit.complaints}
                      </p>
                    )}
                    {visit.cadreNotes && (
                      <p className="text-slate-700">
                        <strong className="text-emerald-800">Catatan & Saran Bidan:</strong> {visit.cadreNotes}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddVisitModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      )}
      {selectedVisitForEdit && (
        <EditVisitModal
          visit={selectedVisitForEdit}
          isOpen={!!selectedVisitForEdit}
          onClose={() => setSelectedVisitForEdit(null)}
        />
      )}
    </div>
  );
}
