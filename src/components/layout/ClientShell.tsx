'use client';

import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import PwaInstallPrompt from './PwaInstallPrompt';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const { init } = usePosyanduStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 selection:bg-emerald-700 selection:text-white">
      {/* Sidebar Tetap di Kolom Kiri (Desktop) */}
      <Sidebar />

      {/* Area Konten Utama di Kolom Kanan */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Header />
        <main className="flex-1 px-3 sm:px-6 lg:px-8 py-3.5 sm:py-5 pb-28 md:pb-10 w-full max-w-7xl mx-auto">
          {/* Banner Instalasi PWA khusus HP Android */}
          <PwaInstallPrompt />
          {children}
        </main>
        {/* Navigasi Bawah Khusus Tampilan Handphone / WebView */}
        <BottomNav />
      </div>
    </div>
  );
}
