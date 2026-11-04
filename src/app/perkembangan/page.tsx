'use client';

import React, { useState } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { KPSP_QUESTIONS_DATA } from '@/lib/kpspMilestones';
import { Brain, CheckCircle2, XCircle, Lightbulb, Sparkles, AlertCircle } from 'lucide-react';

export default function PerkembanganKPSPPage() {
  const { getActiveChild, getLatestVisit } = usePosyanduStore();
  const child = getActiveChild();
  const latestVisit = getLatestVisit();

  const [selectedAgeGroup, setSelectedAgeGroup] = useState<number>(
    latestVisit ? Math.min(12, Math.max(3, Math.round(latestVisit.ageMonths / 3) * 3)) : 6
  );

  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  if (!child) return null;

  const currentQuestions = KPSP_QUESTIONS_DATA.filter((q) => q.ageGroup === selectedAgeGroup);

  const handleToggle = (id: string, val: boolean) => {
    setAnswers({ ...answers, [id]: val });
  };

  // Hitung jumlah Ya
  const answeredKeys = currentQuestions.map((q) => q.id);
  const yesCount = answeredKeys.filter((id) => answers[id] === true).length;
  const totalQuestions = currentQuestions.length;

  let evaluationResult = 'Sesuai Umur (Normal)';
  let evaluationBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  let advice = 'Pertahankan stimulasi yang telah diberikan. Lanjutkan ke kelompok usia berikutnya.';

  if (yesCount < totalQuestions * 0.7) {
    evaluationResult = 'Perlu Stimulasi Intensif / Konsultasi';
    evaluationBadge = 'bg-amber-100 text-amber-800 border-amber-300';
    advice = 'Berikan stimulasi harian intensif selama 2 minggu, lalu evaluasi kembali atau konsultasikan dengan Bidan/Puskesmas.';
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              Skrining KPSP Kemenkes RI
            </span>
            <span className="text-xs text-slate-400 font-medium">Buku KIA Kemenkes</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Evaluasi Perkembangan Motorik & Bahasa (KPSP)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Panduan skrining kemampuan tumbuh kembang <strong>{child.name}</strong>
          </p>
        </div>

        {/* Hasil Evaluasi Cepat */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 min-w-[220px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Status KPSP ({yesCount}/{totalQuestions} Kemampuan)
          </span>
          <span className={`inline-block mt-1 text-xs font-extrabold px-2.5 py-1 rounded-xl border ${evaluationBadge}`}>
            {evaluationResult}
          </span>
        </div>
      </div>

      {/* Selector Kelompok Umur KPSP */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[3, 6, 9, 12].map((age) => (
          <button
            key={age}
            onClick={() => setSelectedAgeGroup(age)}
            className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedAgeGroup === age
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>KPSP Usia {age} Bulan</span>
          </button>
        ))}
      </div>

      {/* Pertanyaan Skrining KPSP */}
      <div className="space-y-3.5">
        {currentQuestions.map((q, idx) => {
          const isYes = answers[q.id] === true;
          const isNo = answers[q.id] === false;

          return (
            <div
              key={q.id}
              className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase tracking-wider">
                      {q.sectorLabel}
                    </span>
                    <p className="text-sm font-bold text-slate-900 mt-1 leading-snug">{q.question}</p>
                  </div>
                </div>

                {/* Tombol Pilihan Ya / Tidak */}
                <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                  <button
                    onClick={() => handleToggle(q.id, true)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isYes
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Bisa (Ya)</span>
                  </button>
                  <button
                    onClick={() => handleToggle(q.id, false)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isNo
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Belum Bisa</span>
                  </button>
                </div>
              </div>

              {/* Tips Stimulasi di Rumah */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-950">Tips Stimulasi Orang Tua:</strong> {q.tip}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rangkuman & Anjuran Medis */}
      <div className="p-5 bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Kesimpulan & Saran Skrining</span>
        </div>
        <p className="text-sm font-semibold">{advice}</p>
        <p className="text-xs text-slate-400">
          Setiap anak berkembang dengan kecepatan unik. Yang terpenting adalah stimulasi yang penuh kasih sayang, interaksi tatap muka, dan tidak membandingkan dengan balita lain secara berlebihan.
        </p>
      </div>
    </div>
  );
}
