'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Baby, LineChart, Syringe, Brain, FileSpreadsheet } from 'lucide-react';

const mobileNav = [
  { name: 'Beranda', href: '/', icon: Activity },
  { name: 'Kunjungan', href: '/kunjungan', icon: Baby },
  { name: 'Grafik KMS', href: '/kms', icon: LineChart },
  { name: 'Imunisasi', href: '/imunisasi', icon: Syringe },
  { name: 'KPSP', href: '/perkembangan', icon: Brain },
  { name: 'Laporan', href: '/laporan', icon: FileSpreadsheet },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {mobileNav.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
              isActive ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-transform ${
                isActive ? 'bg-emerald-50 scale-110' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
