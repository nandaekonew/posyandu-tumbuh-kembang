'use client';

import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const { init } = usePosyanduStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar Tetap di Kolom Kiri (Desktop) */}
      <Sidebar />

      {/* Area Konten Utama di Kolom Kanan */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Header />
        <main className="flex-1 px-3 sm:px-6 lg:px-8 py-5 pb-24 md:pb-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
