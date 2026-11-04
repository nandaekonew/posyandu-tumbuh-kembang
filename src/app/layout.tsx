import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientShell from '@/components/layout/ClientShell';

export const metadata: Metadata = {
  title: 'SiKembang Posyandu - Pemantauan Tumbuh Kembang Anak (KMS & KIA Digital)',
  description:
    'Aplikasi pemantauan hasil pemeriksaan bulanan Posyandu, kurva pertumbuhan KMS WHO, deteksi dini stunting, roadmap imunisasi lengkap, dan skrining perkembangan KPSP Kemenkes RI.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#059669',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
