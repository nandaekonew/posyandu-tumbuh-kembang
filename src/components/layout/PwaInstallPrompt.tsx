'use client';

import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle, ExternalLink, HelpCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker untuk mendukung PWA installability
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('SW registration failed:', err);
      });
    }

    // 2. Deteksi apakah sudah terpasang dan dibuka dalam mode Standalone / Native WebView
    if (typeof window !== 'undefined') {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');

      setIsStandalone(isStandaloneMode);

      // Tangkap event instalasi browser Android
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Jika browser belum melempar event prompt otomatis, tampilkan panduan 2 langkah mudah
      setShowGuideModal(true);
    }
  };

  // Jangan tampilkan jika sudah di mode aplikasi standalone atau user menutupnya
  if (isStandalone || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Banner Ringkas Khusus Tampilan Handphone / Webview */}
      <div className="md:hidden mb-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-3 rounded-2xl shadow-sm border border-emerald-700/80 flex items-center justify-between gap-3 animate-in fade-in duration-300">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 border border-emerald-600/80 flex items-center justify-center flex-shrink-0 text-emerald-200">
            <Smartphone className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-white truncate">Pasang di HP Android</p>
            <p className="text-[10px] text-emerald-200/90 truncate">Akses cepat tanpa buka browser</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black transition-colors shadow-2xs"
            aria-label="Pasang aplikasi SiKembang di HP Android"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" aria-hidden="true" />
            <span>Instal</span>
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
            aria-label="Tutup rekomendasi instal"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Modal Panduan Instalasi Manual di Android Chrome */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Instal Aplikasi SiKembang</h3>
                  <p className="text-[11px] text-slate-500">Bisa diinstal di semua HP Android</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                aria-label="Tutup panduan"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="font-semibold text-slate-800">
                Aplikasi ini mendukung teknologi <strong>PWA (Progressive Web App)</strong> resmi Google. Cara pasang:
              </p>
              <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Buka menu browser Chrome di HP (ketuk ikon titik tiga <strong>⋮</strong> di pojok kanan atas).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Pilih opsi <strong>&quot;Instal Aplikasi&quot;</strong> atau <strong>&quot;Tambahkan ke Layar Utama&quot;</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Ikon <strong>SiKembang</strong> akan otomatis terpasang di layar utama HP Anda dan dapat dibuka fullscreen tanpa URL bar layaknya aplikasi Android bawaan (APK).</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
