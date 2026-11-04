'use client';

import React from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { Printer, Download, Baby, Calendar, Scale, Ruler, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BBU_CONFIG, TBU_CONFIG, BBTB_CONFIG } from '@/lib/whoGrowthStandards';
import { formatBirthOrder } from '@/lib/utils';

export default function LaporanPage() {
  const { getActiveChild, getActiveVisits, getActiveImmunizations } = usePosyanduStore();
  const child = getActiveChild();
  const visits = getActiveVisits();
  const immunizations = getActiveImmunizations();

  if (!child) return null;

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Export CSV function
  const handleExportCSV = () => {
    const headers = [
      'Bulan Ke',
      'Tanggal Kunjungan',
      'Berat Badan (kg)',
      'Tinggi Badan (cm)',
      'Lingkar Kepala (cm)',
      'LiLA (cm)',
      'Status KBM',
      'Kenaikan (gram)',
      'Status BB/U WHO',
      'Status TB/U (Stunting)',
      'Status BB/TB (Gizi)',
      'Vitamin A',
      'Obat Cacing',
      'PMT',
      'Imunisasi Diberikan',
      'Catatan Petugas',
    ];

    const rows = visits.map((v) => [
      v.ageMonths,
      v.visitDate,
      v.weightKg,
      v.heightCm,
      v.headCircCm || '-',
      v.armCircCm || '-',
      v.weightGainStatus === 'N' ? 'Naik' : v.weightGainStatus === 'T' ? 'Tidak Naik' : 'Baru',
      v.weightGainGram,
      BBU_CONFIG[v.bbuStatus].label,
      TBU_CONFIG[v.tbuStatus].label,
      BBTB_CONFIG[v.bbtbStatus].label,
      v.vitaminA ? 'Ya' : 'Tidak',
      v.dewormingMed ? 'Ya' : 'Tidak',
      v.pmtReceived ? 'Ya' : 'Tidak',
      v.immunizationsGiven ? `"${v.immunizationsGiven.join('; ')}"` : '-',
      `"${v.cadreNotes || '-'}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Posyandu_${child.nickname}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Disembunyikan saat dicetak) */}
      <div className="print:hidden bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            Laporan Cetak & Arsip
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Rekap Pertumbuhan KMS & Posyandu
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dokumen resmi siap cetak (PDF / Kertas A4) untuk rujukan dokter anak atau arsip keluarga.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export CSV / Excel</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-200 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen (Print)</span>
          </button>
        </div>
      </div>

      {/* DOKUMEN CETAK RESMI (PRINT AREA) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Kop Surat Laporan Posyandu */}
        <div className="text-center pb-5 border-b-2 border-slate-900 space-y-1">
          <p className="text-xs uppercase tracking-widest font-extrabold text-slate-500">
            KEMENTERIAN KESEHATAN REPUBLIK INDONESIA • POS PELAYANAN TERPADU
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            KARTU MENUJU SEHAT (KMS) & RESUME TUMBUH KEMBANG BALITA
          </h2>
          <p className="text-xs text-slate-600">
            {child.posyanduName} • {child.village || 'Kelurahan Rungkut'} • No. Buku KIA: {child.kiaBookNo || '-'}
          </p>
        </div>

        {/* Biodata Pasien Balita */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Nama Lengkap</span>
            <span className="font-extrabold text-slate-900 text-sm">{child.name}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Urutan Anak</span>
            <span className="font-black text-emerald-800 text-xs block">
              {formatBirthOrder(child.birthOrder).label} (Ke-{child.birthOrder || 1})
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Jenis Kelamin / Gol. Darah</span>
            <span className="font-bold text-slate-800">
              {child.gender === 'P' ? 'Perempuan (♀)' : 'Laki-Laki (♂)'} / Gol. {child.bloodType || 'O'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Tanggal Lahir</span>
            <span className="font-bold text-slate-800">{child.birthDate}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Kondisi Lahir</span>
            <span className="font-bold text-slate-800">
              {child.birthWeight} kg • {child.birthHeight} cm • LK {child.birthHeadCirc} cm
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Nama Ayah</span>
            <span className="font-bold text-slate-800">{child.fatherName || '-'}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Nama Ibu</span>
            <span className="font-bold text-slate-800">{child.motherName || '-'}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">No. Buku KIA</span>
            <span className="font-mono text-slate-800 font-bold">{child.kiaBookNo || '-'}</span>
          </div>
          <div className="col-span-2 sm:col-span-4">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Alamat Domisili</span>
            <span className="font-medium text-slate-800">{child.address || '-'}</span>
          </div>
        </div>

        {/* Tabel Lengkap Riwayat Posyandu Bulanan */}
        <div className="space-y-2">
          <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
            1. Rekapitulasi Penimbangan & Pengukuran Antropometri Bulanan
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-black text-slate-700 uppercase text-[10px]">
                  <th className="py-2.5 px-3 border-r border-slate-200">Bln</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Tgl Periksa</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">BB (kg)</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">TB (cm)</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">LK (cm)</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">KBM</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">BB/U (WHO)</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">TB/U (Stunting)</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Suplemen / Vaksin</th>
                  <th className="py-2.5 px-3">Petugas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visits.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 border-r border-slate-200 font-bold text-center">
                      {v.ageMonths}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 whitespace-nowrap">{v.visitDate}</td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center font-black">
                      {v.weightKg}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center font-bold">
                      {v.heightCm}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center">
                      {v.headCircCm || '-'}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-center font-black">
                      {v.weightGainStatus === 'N' ? (
                        <span className="text-emerald-700">N (+{v.weightGainGram}g)</span>
                      ) : v.weightGainStatus === 'T' ? (
                        <span className="text-amber-700">T ({v.weightGainGram}g)</span>
                      ) : (
                        'Baru'
                      )}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 font-semibold">
                      {BBU_CONFIG[v.bbuStatus].label}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 font-semibold">
                      {TBU_CONFIG[v.tbuStatus].label}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 text-[10px]">
                      {v.vitaminA && <span className="mr-1 text-blue-700 font-bold">[Vit A]</span>}
                      {v.dewormingMed && <span className="mr-1 text-amber-700 font-bold">[Obat Cacing]</span>}
                      {v.immunizationsGiven?.join(', ')}
                    </td>
                    <td className="py-2 px-3 whitespace-nowrap text-slate-600">
                      {v.examinerName || 'Bidan Desa'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Imunisasi Ringkas */}
        <div className="space-y-2">
          <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
            2. Capaian Roadmap Imunisasi Nasional
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {immunizations.map((im) => (
              <div
                key={im.id}
                className={`p-2 rounded-xl border flex items-center justify-between ${
                  im.isGiven ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span className="font-bold text-[11px] truncate">{im.vaccineName}</span>
                <span className="text-[10px] font-bold">
                  {im.isGiven ? '✓ Sudah' : 'Belum'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Tanda Tangan Resmi */}
        <div className="pt-8 grid grid-cols-2 text-center text-xs text-slate-800">
          <div>
            <p className="font-semibold text-slate-500">Mengetahui Orang Tua / Wali,</p>
            <div className="h-16" />
            <p className="font-extrabold text-slate-900 underline">
              {child.fatherName || child.motherName || 'Orang Tua Pasien'}
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-500">Bidan / Petugas Penanggung Jawab Posyandu,</p>
            <div className="h-16" />
            <p className="font-extrabold text-slate-900 underline">
              Bidan Siti Rahayu, Amd.Keb
            </p>
            <p className="text-[10px] text-slate-400">NIP / STR: 19880214 201201 2 004</p>
          </div>
        </div>
      </div>
    </div>
  );
}
