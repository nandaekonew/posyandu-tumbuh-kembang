import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientShell from '@/components/layout/ClientShell';

export const metadata: Metadata = {
  title: 'SiKembang - Posyandu & KIA Digital',
  description:
    'Aplikasi pemantauan hasil pemeriksaan bulanan Posyandu, kurva pertumbuhan KMS WHO, deteksi dini stunting, roadmap imunisasi lengkap, dan skrining perkembangan KPSP Kemenkes RI.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SiKembang',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#064e3b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#064e3b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
