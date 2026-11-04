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
  BookOpen,
  Edit,
  Building2,
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700" role="status" aria-label="Memuat data profil anak..."></div>
      </div>
    );
  }

  const ageDetail = calculateDetailedAge(
    activeChild.birthDate,
    new Date().toISOString().split('T')[0]
  );

  // Estimasi jadwal posyandu bulan berikutnya berdasarkan tanggal lahir / kunjungan rutin
  const birthDay = new Date(activeChild.birthDate).getDate();

  return (
    <div className="space-y-6">
      {/* 1. Header Profile Anak Aktif */}
      <div className="bg-emerald-950 border border-emerald-800/90 rounded-2xl p-5 sm:p-6 text-white shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-emerald-900 border border-emerald-700/80 flex items-center justify-center text-white font-black text-2xl sm:text-3xl flex-shrink-0 shadow-inner">
            {activeChild.nickname ? activeChild.nickname[0].toUpperCase() : 'A'}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-900 border border-emerald-700 text-emerald-200">
                {activeChild.gender === 'P' ? '♀ Anak Perempuan' : '♂ Anak Laki-Laki'}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-300 text-amber-950">
                {formatBirthOrder(activeChild.birthOrder).label}
              </span>
              <span className="text-xs text-emerald-200/90 font-medium">
                Lahir: {activeChild.birthDate}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              {activeChild.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200/90 mt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>Usia: <strong className="text-white font-bold">{ageDetail.text}</strong> ({ageDetail.months} Bulan)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>{activeChild.posyanduName}</span>
              </span>
              {activeChild.kiaBookNo && (
                <span className="bg-emerald-900/80 border border-emerald-700/70 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-100">
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
            className="px-3.5 py-2 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-700/80 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            title="Ubah profil anak"
            aria-label="Ubah profil anak"
          >
            <Edit className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ubah Profil</span>
          </button>
          <Link
            href="/laporan"
            className="px-3.5 py-2 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-700/80 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            aria-label="Buka format rekap cetak KMS dan Posyandu"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-300" aria-hidden="true" />
            <span className="hidden sm:inline">Cetak KMS</span>
          </Link>
          <button
            onClick={() => setIsAddVisitModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-xs"
            aria-label="Catat hasil penimbangan Posyandu baru"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" aria-hidden="true" />
            <span>+ Catat Posyandu</span>
          </button>
        </div>
      </div>

      {/* 2. Banner Status Pertumbuhan & Pencegahan Stunting */}
      <StuntingAlertBanner />

      {/* 3. Kartu Indikator Antropometri Utama */}
      <StatCards />

      {/* 4. Grafik Kartu Menuju Sehat (KMS) & Pertumbuhan WHO */}
      <KMSChart
        visits={visits}
        gender={activeChild.gender}
        childName={activeChild.nickname || activeChild.name}
      />

      {/* 5. Riwayat Kunjungan Posyandu & Navigasi Panduan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentVisitsWidget />
        </div>

        {/* Kolom Informasi Layanan Posyandu */}
        <div className="space-y-4">
          {/* Jadwal Pelayanan Posyandu */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Calendar className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>Jadwal Penimbangan Posyandu</span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Pelayanan Rutin Bulanan
              </span>
              <p className="text-sm font-bold text-slate-900">
                Setiap Tanggal {birthDay || 26} (atau Sesuai Jadwal RW)
              </p>
              <div className="flex items-start gap-1.5 text-xs text-slate-600 pt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{activeChild.posyanduName}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Selalu bawa <strong>Buku KIA (Kesehatan Ibu & Anak)</strong> fisik saat berkunjung untuk verifikasi pencatatan KMS dan paraf bidan/kader.
            </p>
          </div>

          {/* Akses Panduan Buku KIA Digital */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-white shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Buku KIA Online
              </span>
              <BookOpen className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </div>
            <p className="text-sm font-bold text-white">Panduan Tumbuh Kembang</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/imunisasi"
                className="p-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs font-semibold flex flex-col items-center gap-2 transition-colors text-center"
                aria-label="Buka jadwal dan roadmap imunisasi lengkap"
              >
                <Syringe className="w-4 h-4 text-purple-300" aria-hidden="true" />
                <span>Jadwal Imunisasi</span>
              </Link>
              <Link
                href="/gizi-mpasi"
                className="p-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs font-semibold flex flex-col items-center gap-2 transition-colors text-center"
                aria-label="Buka panduan menu gizi dan MPASI"
              >
                <Apple className="w-4 h-4 text-emerald-300" aria-hidden="true" />
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
