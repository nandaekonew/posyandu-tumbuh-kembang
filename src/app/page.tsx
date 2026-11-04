'use client';

import React, { useState } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import StatCards from '@/components/dashboard/StatCards';
import StuntingAlertBanner from '@/components/dashboard/StuntingAlertBanner';
import KMSChart from '@/components/charts/KMSChart';
import RecentVisitsWidget from '@/components/dashboard/RecentVisitsWidget';
import AddVisitModal from '@/components/forms/AddVisitModal';
import EditChildModal from '@/components/forms/EditChildModal';
import { calculateDetailedAge } from '@/lib/whoGrowthStandards';
import { formatBirthOrder } from '@/lib/utils';
import {
  Baby,
  Calendar,
  PlusCircle,
  FileSpreadsheet,
  Syringe,
  Apple,
  MapPin,
  Clock,
  Sparkles,
  Edit,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  const { getActiveChild, getActiveVisits } = usePosyanduStore();
  const activeChild = getActiveChild();
  const visits = getActiveVisits();

  const [isAddVisitModalOpen, setIsAddVisitModalOpen] = useState(false);
  const [isEditChildModalOpen, setIsEditChildModalOpen] = useState(false);

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const ageDetail = calculateDetailedAge(
    activeChild.birthDate,
    new Date().toISOString().split('T')[0]
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Profile Anak Aktif */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-5 sm:p-6 text-white shadow-xl shadow-emerald-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl shadow-inner flex-shrink-0">
            {activeChild.nickname ? activeChild.nickname[0].toUpperCase() : 'D'}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-emerald-100">
                {activeChild.gender === 'P' ? '♀ Anak Perempuan' : '♂ Anak Laki-Laki'}
              </span>
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm flex items-center gap-1">
                ⭐ {formatBirthOrder(activeChild.birthOrder).label}
              </span>
              <span className="text-xs text-emerald-200">
                Lahir: {activeChild.birthDate}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
              {activeChild.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-100 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Usia: <strong className="text-white">{ageDetail.text}</strong> ({ageDetail.months} Bulan)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {activeChild.posyanduName}
              </span>
              {activeChild.kiaBookNo && (
                <span className="hidden sm:inline bg-black/20 px-2 py-0.5 rounded-md text-[10px] font-mono">
                  {activeChild.kiaBookNo}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end flex-wrap">
          <button
            type="button"
            onClick={() => setIsEditChildModalOpen(true)}
            className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Ubah profil anak"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Ubah Profil</span>
          </button>
          <Link
            href="/laporan"
            className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Cetak KMS</span>
          </Link>
          <button
            onClick={() => setIsAddVisitModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-50 shadow-md shadow-emerald-900/10 flex items-center gap-2 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>+ Catat Posyandu</span>
          </button>
        </div>
      </div>

      {/* 2. Banner Peringatan Dini Stunting / Status Prima */}
      <StuntingAlertBanner />

      {/* 3. Kartu Statistik Antropometri Utama */}
      <StatCards />

      {/* 4. Grafik Kartu Menuju Sehat (KMS) & Pertumbuhan WHO */}
      <KMSChart
        visits={visits}
        gender={activeChild.gender}
        childName={activeChild.nickname || activeChild.name}
      />

      {/* 5. Riwayat Kunjungan Posyandu & Shortcut Menu Posyandu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentVisitsWidget />
        </div>

        {/* Info Posyandu & Edukasi Cepat */}
        <div className="space-y-4">
          {/* Jadwal Posyandu Bulan Berikutnya */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Jadwal Posyandu Berikutnya</span>
            </div>
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                Penimbangan Rutin Bulanan
              </span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">
                Tanggal 27 Setiap Bulan
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Lokasi: Balai RW / {activeChild.posyanduName}
              </p>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Bawa selalu <strong>Buku KIA (Kesehatan Ibu & Anak)</strong> saat hadir di Posyandu untuk update KMS dan imunisasi balita.
            </p>
          </div>

          {/* Akses Cepat Buku KIA Digital */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-3xl text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Buku KIA Digital
              </span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-sm font-bold">Panduan Imunisasi & Gizi Balita</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/imunisasi"
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors text-center"
              >
                <Syringe className="w-5 h-5 text-purple-300" />
                <span>Roadmap Imunisasi</span>
              </Link>
              <Link
                href="/gizi-mpasi"
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors text-center"
              >
                <Apple className="w-5 h-5 text-emerald-300" />
                <span>Menu MPASI & Gizi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tambah Kunjungan */}
      {isAddVisitModalOpen && (
        <AddVisitModal
          isOpen={isAddVisitModalOpen}
          onClose={() => setIsAddVisitModalOpen(false)}
        />
      )}

      {/* Modal Edit Profil Anak Aktif */}
      {isEditChildModalOpen && activeChild && (
        <EditChildModal
          child={activeChild}
          isOpen={isEditChildModalOpen}
          onClose={() => setIsEditChildModalOpen(false)}
        />
      )}
    </div>
  );
}
