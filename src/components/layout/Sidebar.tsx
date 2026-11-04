'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Baby,
  Activity,
  LineChart,
  Syringe,
  Brain,
  Apple,
  FileSpreadsheet,
  Users,
  ShieldCheck,
  ChevronRight,
  UserPlus,
  Edit,
} from 'lucide-react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { formatBirthOrder } from '@/lib/utils';
import AddChildModal from '../forms/AddChildModal';
import EditChildModal from '../forms/EditChildModal';

const navigation = [
  { name: 'Ringkasan Tumbuh', href: '/', icon: Activity },
  { name: 'Hasil Kunjungan', href: '/kunjungan', icon: Baby },
  { name: 'Grafik KMS Digital', href: '/kms', icon: LineChart },
  { name: 'Jadwal Imunisasi', href: '/imunisasi', icon: Syringe },
  { name: 'Perkembangan KPSP', href: '/perkembangan', icon: Brain },
  { name: 'Panduan Gizi & MPASI', href: '/gizi-mpasi', icon: Apple },
  { name: 'Cetak Rekap & KMS', href: '/laporan', icon: FileSpreadsheet },
  { name: 'Kelola Data Anak', href: '/anak', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { getActiveChild, isCloudConnected } = usePosyanduStore();
  const activeChild = getActiveChild();

  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [isEditChildModalOpen, setIsEditChildModalOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-30 select-none flex-shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
              <Baby className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-800 text-lg leading-tight tracking-tight">
                SiKembang<span className="text-emerald-600">.ID</span>
              </h1>
              <p className="text-[11px] font-medium text-slate-400">Posyandu & KIA Digital</p>
            </div>
          </Link>
        </div>

        {/* Profil Anak Aktif Ringkas dengan Tombol Edit & Tambah Langsung */}
        {activeChild && (
          <div className="mx-4 mt-4 p-3 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-100/80 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                {activeChild.nickname ? activeChild.nickname[0].toUpperCase() : 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider">
                    {formatBirthOrder(activeChild.birthOrder).label}
                  </p>
                </div>
                <p className="text-sm font-bold text-slate-800 truncate">{activeChild.nickname || activeChild.name}</p>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white text-emerald-700 font-bold border border-emerald-200">
                {activeChild.gender === 'P' ? '♀ Putri' : '♂ Putra'}
              </span>
            </div>

            {/* Quick Actions Langsung di Sidebar */}
            <div className="flex items-center gap-1.5 pt-1 border-t border-emerald-100/60">
              <button
                type="button"
                onClick={() => setIsEditChildModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-1 py-1 rounded-xl bg-white hover:bg-emerald-100/70 text-[10px] font-bold text-emerald-800 border border-emerald-200/80 transition-colors"
                title="Ubah data profil anak aktif"
              >
                <Edit className="w-3 h-3 text-emerald-600" />
                <span>Ubah Profil</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAddChildModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-1 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold text-white shadow-xs transition-colors"
                title="Daftarkan balita baru"
              >
                <UserPlus className="w-3 h-3" />
                <span>+ Anak</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Menu Utama Posyandu
          </div>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-emerald-100" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Cloud Sync Status */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isCloudConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="font-medium text-slate-600">
                {isCloudConnected ? 'Supabase Terhubung' : 'Mode Offline / Lokal'}
              </span>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Standar WHO & Kemenkes RI 2024</p>
        </div>
      </aside>

      {/* Modals dari Sidebar */}
      {isAddChildModalOpen && (
        <AddChildModal isOpen={isAddChildModalOpen} onClose={() => setIsAddChildModalOpen(false)} />
      )}
      {isEditChildModalOpen && activeChild && (
        <EditChildModal
          child={activeChild}
          isOpen={isEditChildModalOpen}
          onClose={() => setIsEditChildModalOpen(false)}
        />
      )}
    </>
  );
}
