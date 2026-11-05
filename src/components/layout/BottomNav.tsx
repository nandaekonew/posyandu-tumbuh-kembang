'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Baby, LineChart, Syringe, Users } from 'lucide-react';

const mobileNav = [
  { name: 'Beranda', href: '/', icon: Activity },
  { name: 'Kunjungan', href: '/kunjungan', icon: Baby },
  { name: 'KMS WHO', href: '/kms', icon: LineChart },
  { name: 'Imunisasi', href: '/imunisasi', icon: Syringe },
  { name: 'Data Anak', href: '/anak', icon: Users },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom,0.5rem))] flex items-center justify-around"
      role="navigation"
      aria-label="Navigasi Utama Mobile"
    >
      {mobileNav.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`min-h-[44px] min-w-[54px] flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
              isActive
                ? 'text-emerald-800 font-extrabold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              className={`px-3 py-1 rounded-full transition-all ${
                isActive
                  ? 'bg-emerald-100 text-emerald-800 shadow-2xs'
                  : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-semibold">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
