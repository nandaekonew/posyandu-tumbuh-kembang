'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { PosyanduVisit, Gender } from '@/types';
import {
  WHO_WEIGHT_GIRLS,
  WHO_WEIGHT_BOYS,
  WHO_HEIGHT_GIRLS,
  WHO_HEIGHT_BOYS,
} from '@/lib/whoGrowthStandards';
import { Scale, Ruler, Brain, Info } from 'lucide-react';

interface KMSChartProps {
  visits: PosyanduVisit[];
  gender: Gender;
  childName: string;
}

type ChartMetric = 'weight' | 'height' | 'head';

export default function KMSChart({ visits, gender, childName }: KMSChartProps) {
  const [metric, setMetric] = useState<ChartMetric>('weight');

  // Siapkan data 0 s/d 12 bulan (atau hingga max kunjungan anak)
  const maxMonth = Math.max(12, ...visits.map((v) => v.ageMonths));
  const weightTable = gender === 'P' ? WHO_WEIGHT_GIRLS : WHO_WEIGHT_BOYS;
  const heightTable = gender === 'P' ? WHO_HEIGHT_GIRLS : WHO_HEIGHT_BOYS;

  // Bangun dataset gabungan antara standar WHO dan data riil kunjungan
  const chartData = [];
  for (let m = 0; m <= Math.min(24, maxMonth + 2); m++) {
    const realVisit = visits.find((v) => v.ageMonths === m);
    const wRef = weightTable[m] || weightTable[12];
    const hRef = heightTable[m] || heightTable[12];

    chartData.push({
      month: `${m} bln`,
      monthNum: m,
      // Data riil anak
      realWeight: realVisit ? realVisit.weightKg : null,
      realHeight: realVisit ? realVisit.heightCm : null,
      realHead: realVisit?.headCircCm || null,
      visitDate: realVisit?.visitDate || null,
      kbmStatus: realVisit?.weightGainStatus || null,
      // Standar WHO BB (kg)
      whoWeightMedian: wRef.median,
      whoWeightPlus2: wRef.sd2pos,
      whoWeightMinus2: wRef.sd2neg,
      whoWeightBGM: wRef.sd3neg, // Garis Merah
      // Standar WHO TB (cm)
      whoHeightMedian: hRef.median,
      whoHeightPlus2: hRef.sd2pos,
      whoHeightStunted: hRef.sd2neg, // Garis Batas Stunting (-2 SD)
      whoHeightSeverelyStunted: hRef.sd3neg, // Sangat Pendek (-3 SD)
    });
  }

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
      {/* Metric Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            {metric === 'weight' && 'Grafik KMS (Berat Badan menurut Umur - BB/U)'}
            {metric === 'height' && 'Grafik Deteksi Stunting (Panjang/Tinggi Badan - TB/U)'}
            {metric === 'head' && 'Grafik Lingkar Kepala menurut Umur (LK/U)'}
          </h3>
          <p className="text-xs text-slate-500">
            Standar Pertumbuhan WHO & Kemenkes RI untuk balita {gender === 'P' ? 'Perempuan ♀' : 'Laki-laki ♂'}
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setMetric('weight')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              metric === 'weight'
                ? 'bg-white text-emerald-800 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>Berat Badan (KMS)</span>
          </button>
          <button
            onClick={() => setMetric('height')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              metric === 'height'
                ? 'bg-white text-emerald-800 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ruler className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tinggi (Stunting)</span>
          </button>
          <button
            onClick={() => setMetric('head')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              metric === 'head'
                ? 'bg-white text-emerald-800 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lingkar Kepala</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-80 sm:h-96 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'weight' ? (
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
              <YAxis
                unit=" kg"
                domain={[2, 14]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1 border border-slate-700">
                        <p className="font-bold text-emerald-400">Usia: {data.month}</p>
                        {data.realWeight !== null ? (
                          <>
                            <p className="text-sm font-extrabold text-white">
                              BB {childName}: <span className="text-emerald-300">{data.realWeight} kg</span>
                            </p>
                            <p className="text-[11px] text-slate-300">Tgl: {data.visitDate}</p>
                            <p className="text-[11px] text-slate-300">
                              Status KBM: {data.kbmStatus === 'N' ? '📈 Naik (N)' : data.kbmStatus === 'T' ? '⚠️ Tidak Naik (T)' : 'Baru'}
                            </p>
                          </>
                        ) : (
                          <p className="text-slate-400 italic">Belum ada kunjungan posyandu</p>
                        )}
                        <hr className="border-slate-700 my-1" />
                        <p className="text-[10px] text-slate-400">Median Ideal WHO: {data.whoWeightMedian} kg</p>
                        <p className="text-[10px] text-rose-400">Batas BGM (-3 SD): {data.whoWeightBGM} kg</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
              />

              {/* Garis Batas WHO */}
              <Line
                type="monotone"
                dataKey="whoWeightPlus2"
                name="Batas Atas (+2 SD)"
                stroke="#93c5fd"
                strokeDasharray="4 4"
                dot={false}
                strokeWidth={1.5}
              />
              <Line
                type="monotone"
                dataKey="whoWeightMedian"
                name="Garis Hijau Median Ideal WHO (0 SD)"
                stroke="#10b981"
                dot={false}
                strokeWidth={2.5}
              />
              <Line
                type="monotone"
                dataKey="whoWeightMinus2"
                name="Batas Bawah Normal (-2 SD)"
                stroke="#f59e0b"
                strokeDasharray="4 4"
                dot={false}
                strokeWidth={1.5}
              />
              <Line
                type="monotone"
                dataKey="whoWeightBGM"
                name="Bawah Garis Merah / BGM (-3 SD)"
                stroke="#ef4444"
                dot={false}
                strokeWidth={2}
              />

              {/* Plot Kunjungan Riil Anak */}
              <Line
                type="monotone"
                dataKey="realWeight"
                name={`BB Riil ${childName}`}
                stroke="#0f172a"
                strokeWidth={3.5}
                dot={{ r: 6, fill: '#0f172a', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#10b981', stroke: '#ffffff', strokeWidth: 3 }}
                connectNulls
              />
            </ComposedChart>
          ) : metric === 'height' ? (
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
              <YAxis
                unit=" cm"
                domain={[45, 90]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1 border border-slate-700">
                        <p className="font-bold text-teal-400">Usia: {data.month}</p>
                        {data.realHeight !== null ? (
                          <>
                            <p className="text-sm font-extrabold text-white">
                              Tinggi {childName}: <span className="text-teal-300">{data.realHeight} cm</span>
                            </p>
                            <p className="text-[11px] text-slate-300">Tgl: {data.visitDate}</p>
                          </>
                        ) : (
                          <p className="text-slate-400 italic">Belum ada kunjungan posyandu</p>
                        )}
                        <hr className="border-slate-700 my-1" />
                        <p className="text-[10px] text-slate-400">Median WHO: {data.whoHeightMedian} cm</p>
                        <p className="text-[10px] text-rose-400">Batas Stunting (-2 SD): {data.whoHeightStunted} cm</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }} />

              <Line
                type="monotone"
                dataKey="whoHeightPlus2"
                name="Tinggi (+2 SD)"
                stroke="#67e8f9"
                strokeDasharray="4 4"
                dot={false}
                strokeWidth={1.5}
              />
              <Line
                type="monotone"
                dataKey="whoHeightMedian"
                name="Median TB Ideal WHO"
                stroke="#0d9488"
                dot={false}
                strokeWidth={2.5}
              />
              <Line
                type="monotone"
                dataKey="whoHeightStunted"
                name="Garis Batas Stunting (-2 SD)"
                stroke="#f43f5e"
                strokeDasharray="4 4"
                dot={false}
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="realHeight"
                name={`TB Riil ${childName}`}
                stroke="#0f172a"
                strokeWidth={3.5}
                dot={{ r: 6, fill: '#0f172a', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#0d9488', stroke: '#ffffff', strokeWidth: 3 }}
                connectNulls
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
              <YAxis unit=" cm" domain={[30, 52]} tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }} />
              <Line
                type="monotone"
                dataKey="realHead"
                name={`Lingkar Kepala ${childName} (cm)`}
                stroke="#6366f1"
                strokeWidth={3.5}
                dot={{ r: 6, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
                connectNulls
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Edukasi Membaca Grafik KMS */}
      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Petunjuk Membaca KMS: </span>
          {metric === 'weight' ? (
            <span>
              Titik berat badan anak harus selalu bergerak <strong>naik mengikuti garis pita hijau</strong>. Jika titik mendatar atau memotong garis ke bawah (Status Tidak Naik / T berturut-turut), segera konsultasikan ke Bidan / Dokter Anak Posyandu untuk mencegah gagal tumbuh (growth faltering).
            </span>
          ) : metric === 'height' ? (
            <span>
              Tinggi badan yang berada di atas garis merah putus-putus (-2 SD) menunjukkan anak bebas dari stunting. Pemberian protein hewani (telur, ikan, daging, susu) sejak masa MPASI sangat krusial untuk pacuan tinggi badan.
            </span>
          ) : (
            <span>
              Lingkar kepala menggambarkan volume pertumbuhan otak balita. Pada tahun pertama kehidupan, perkembangan otak mencapai 80% dari ukuran otak dewasa.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
