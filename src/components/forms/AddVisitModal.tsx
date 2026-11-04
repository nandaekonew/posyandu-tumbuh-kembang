'use client';

import React, { useState, useEffect } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import {
  calculateDetailedAge,
  evaluateBBU,
  evaluateTBU,
  evaluateBBTB,
  evaluateLKU,
  evaluateKBM,
  BBU_CONFIG,
  TBU_CONFIG,
  BBTB_CONFIG,
  KBM_STATUS_CONFIG,
} from '@/lib/whoGrowthStandards';
import { X, Calendar, Scale, Ruler, HeartPulse, Check, AlertTriangle, ShieldAlert } from 'lucide-react';

interface AddVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMON_VACCINES = [
  'Hepatitis B0 (HB-0)',
  'BCG',
  'Polio 1 (bOPV 1)',
  'DPT-HB-Hib 1',
  'Polio 2 (bOPV 2)',
  'PCV 1',
  'Rotavirus 1',
  'DPT-HB-Hib 2',
  'Polio 3 (bOPV 3)',
  'PCV 2',
  'Rotavirus 2',
  'DPT-HB-Hib 3',
  'Polio 4 (bOPV 4)',
  'Polio Suntik (IPV 1)',
  'Rotavirus 3',
  'Campak-Rubella (MR 1)',
  'Polio Suntik (IPV 2)',
  'PCV 3 (Booster 12 bln)',
  'DPT-HB-Hib Lanjutan (Booster 18 bln)',
  'Campak-Rubella 2 (Booster 18 bln)',
];

export default function AddVisitModal({ isOpen, onClose }: AddVisitModalProps) {
  const { getActiveChild, getActiveVisits, addVisit } = usePosyanduStore();
  const activeChild = getActiveChild();
  const visits = getActiveVisits();
  const latestVisit = visits.length > 0 ? visits[visits.length - 1] : undefined;

  const todayStr = new Date().toISOString().split('T')[0];

  const [visitDate, setVisitDate] = useState(todayStr);
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [headCircCm, setHeadCircCm] = useState<string>('');
  const [armCircCm, setArmCircCm] = useState<string>('');
  const [vitaminA, setVitaminA] = useState(false);
  const [vitaminAType, setVitaminAType] = useState<'biru' | 'merah'>('biru');
  const [dewormingMed, setDewormingMed] = useState(false);
  const [pmtReceived, setPmtReceived] = useState(false);
  const [oralitZinc, setOralitZinc] = useState(false);
  const [ironSupplements, setIronSupplements] = useState(false);
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);
  const [kpspStatus, setKpspStatus] = useState<'sesuai' | 'meragukan' | 'penyimpangan'>('sesuai');
  const [complaints, setComplaints] = useState('');
  const [cadreNotes, setCadreNotes] = useState('');
  const [examinerName, setExaminerName] = useState('Bidan Desa');

  // Auto-calculated age
  const ageDetail = activeChild
    ? calculateDetailedAge(activeChild.birthDate, visitDate)
    : { months: 0, days: 0, text: '0 bln' };

  // Set default values based on latest visit when modal opens
  useEffect(() => {
    if (latestVisit) {
      // Suggest realistic next weight / height
      setWeightKg((latestVisit.weightKg + 0.3).toFixed(2));
      setHeightCm((latestVisit.heightCm + 1.2).toFixed(1));
      if (latestVisit.headCircCm) setHeadCircCm((latestVisit.headCircCm + 0.5).toFixed(1));
      if (latestVisit.armCircCm) setArmCircCm(latestVisit.armCircCm.toFixed(1));
    } else if (activeChild) {
      setWeightKg(activeChild.birthWeight.toFixed(2));
      setHeightCm(activeChild.birthHeight.toFixed(1));
      setHeadCircCm(activeChild.birthHeadCirc.toFixed(1));
    }
  }, [latestVisit, activeChild]);

  if (!isOpen || !activeChild) return null;

  const currentWeightNum = parseFloat(weightKg) || 0;
  const currentHeightNum = parseFloat(heightCm) || 0;
  const currentHeadCircNum = parseFloat(headCircCm) || 0;
  const currentArmCircNum = parseFloat(armCircCm) || undefined;

  // Real-time evaluation
  const kbmEval = evaluateKBM(
    ageDetail.months,
    currentWeightNum,
    latestVisit ? latestVisit.weightKg : activeChild.birthWeight
  );
  const bbuEval = evaluateBBU(currentWeightNum, ageDetail.months, activeChild.gender);
  const tbuEval = evaluateTBU(currentHeightNum, ageDetail.months, activeChild.gender);
  const bbtbEval = evaluateBBTB(currentWeightNum, currentHeightNum);
  const lkuEval = evaluateLKU(currentHeadCircNum, ageDetail.months);

  const toggleVaccine = (v: string) => {
    if (selectedVaccines.includes(v)) {
      setSelectedVaccines(selectedVaccines.filter((x) => x !== v));
    } else {
      setSelectedVaccines([...selectedVaccines, v]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightKg || !heightCm) {
      alert('Mohon isi Berat Badan dan Tinggi/Panjang Badan');
      return;
    }

    await addVisit({
      childId: activeChild.id,
      visitDate,
      ageMonths: ageDetail.months,
      weightKg: currentWeightNum,
      heightCm: currentHeightNum,
      headCircCm: currentHeadCircNum > 0 ? currentHeadCircNum : undefined,
      armCircCm: currentArmCircNum,
      weightGainStatus: kbmEval.status,
      weightGainGram: kbmEval.deltaGram,
      bbuStatus: bbuEval,
      tbuStatus: tbuEval,
      bbtbStatus: bbtbEval,
      lkuStatus: lkuEval,
      vitaminA,
      vitaminAType: vitaminA ? (ageDetail.months >= 12 ? 'merah' : 'biru') : null,
      dewormingMed,
      pmtReceived,
      oralitZinc,
      ironSupplements,
      immunizationsGiven: selectedVaccines,
      kpspStatus,
      kpspScore: kpspStatus === 'sesuai' ? 10 : kpspStatus === 'meragukan' ? 8 : 6,
      complaints,
      cadreNotes,
      examinerName,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white flex items-center justify-between">
          <div>
            <span className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">
              Pencatatan Hasil Posyandu Bulanan
            </span>
            <h2 className="text-xl font-bold">{activeChild.name}</h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              Usia saat kunjungan: <span className="font-semibold text-white">{ageDetail.text}</span> ({ageDetail.months} Bulan)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          {/* Tanggal & Pemeriksa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Tanggal Kunjungan Posyandu
              </label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Petugas / Bidan Pemeriksa</label>
              <input
                type="text"
                value={examinerName}
                onChange={(e) => setExaminerName(e.target.value)}
                placeholder="misal: Bidan Siti Rahayu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Pengukuran Antropometri (BB, TB, LK, LiLA) */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              Hasil Pengukuran Antropometri
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Berat Badan (kg) *
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="1"
                  max="40"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  required
                  placeholder="contoh 8.4"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-base text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Tinggi/PB (cm) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="130"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  required
                  placeholder="contoh 71.5"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-base text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Lingkar Kepala (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  min="25"
                  max="60"
                  value={headCircCm}
                  onChange={(e) => setHeadCircCm(e.target.value)}
                  placeholder="contoh 44.0"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">LiLA (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  min="8"
                  max="25"
                  value={armCircCm}
                  onChange={(e) => setArmCircCm(e.target.value)}
                  placeholder="contoh 14.5"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Live Indicator Hasil Analisis Otomatis WHO & KBM */}
            {currentWeightNum > 0 && currentHeightNum > 0 && (
              <div className="mt-3 p-3 bg-white rounded-xl border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Analisis Otomatis Standar WHO / Kemenkes:</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${KBM_STATUS_CONFIG[kbmEval.status].badgeClass}`}>
                    Status KBM: {KBM_STATUS_CONFIG[kbmEval.status].label}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">BB/U (Berat Badan):</span>
                    <span className="font-semibold text-slate-800">{BBU_CONFIG[bbuEval].label}</span>
                  </div>
                  <div className={`p-2 rounded-lg border ${TBU_CONFIG[tbuEval].isStunted ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-100'}`}>
                    <span className="text-slate-400 block text-[10px]">TB/U (Indikator Stunting):</span>
                    <span className={`font-semibold ${TBU_CONFIG[tbuEval].isStunted ? 'text-rose-700 font-bold' : 'text-slate-800'}`}>
                      {TBU_CONFIG[tbuEval].label}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">BB/TB (Status Gizi):</span>
                    <span className="font-semibold text-slate-800">{BBTB_CONFIG[bbtbEval].label}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  💡 {kbmEval.description}
                </p>
              </div>
            )}
          </div>

          {/* Pemberian Vitamin & Suplemen Posyandu */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pemberian Vitamin, Obat & Suplemen Posyandu
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <label className={`p-3 rounded-xl border cursor-pointer text-xs flex items-start gap-2.5 transition-colors ${vitaminA ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900' : 'bg-white border-slate-200 text-slate-700'}`}>
                <input
                  type="checkbox"
                  checked={vitaminA}
                  onChange={(e) => setVitaminA(e.target.checked)}
                  className="rounded text-emerald-600 mt-0.5"
                />
                <div>
                  <span className="block font-bold">Kapsul Vitamin A</span>
                  <span className="text-[10px] text-slate-500">
                    {ageDetail.months >= 12 ? 'Merah (200.000 IU)' : 'Biru (100.000 IU)'}
                  </span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer text-xs flex items-start gap-2.5 transition-colors ${dewormingMed ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900' : 'bg-white border-slate-200 text-slate-700'}`}>
                <input
                  type="checkbox"
                  checked={dewormingMed}
                  onChange={(e) => setDewormingMed(e.target.checked)}
                  className="rounded text-emerald-600 mt-0.5"
                />
                <div>
                  <span className="block font-bold">Obat Cacing</span>
                  <span className="text-[10px] text-slate-500">Albendazole (tiap 6 bln)</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer text-xs flex items-start gap-2.5 transition-colors ${pmtReceived ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900' : 'bg-white border-slate-200 text-slate-700'}`}>
                <input
                  type="checkbox"
                  checked={pmtReceived}
                  onChange={(e) => setPmtReceived(e.target.checked)}
                  className="rounded text-emerald-600 mt-0.5"
                />
                <div>
                  <span className="block font-bold">PMT Balita</span>
                  <span className="text-[10px] text-slate-500">Makanan Tambahan Bergizi</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer text-xs flex items-start gap-2.5 transition-colors ${ironSupplements ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900' : 'bg-white border-slate-200 text-slate-700'}`}>
                <input
                  type="checkbox"
                  checked={ironSupplements}
                  onChange={(e) => setIronSupplements(e.target.checked)}
                  className="rounded text-emerald-600 mt-0.5"
                />
                <div>
                  <span className="block font-bold">Tetes Zat Besi</span>
                  <span className="text-[10px] text-slate-500">Pencegah anemia balita</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer text-xs flex items-start gap-2.5 transition-colors ${oralitZinc ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900' : 'bg-white border-slate-200 text-slate-700'}`}>
                <input
                  type="checkbox"
                  checked={oralitZinc}
                  onChange={(e) => setOralitZinc(e.target.checked)}
                  className="rounded text-emerald-600 mt-0.5"
                />
                <div>
                  <span className="block font-bold">Oralit & Zinc</span>
                  <span className="text-[10px] text-slate-500">Riwayat pencegahan diare</span>
                </div>
              </label>
            </div>
          </div>

          {/* Imunisasi yang Diberikan Hari Ini */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Imunisasi Yang Diberikan Hari Ini (Opsional)
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
              {COMMON_VACCINES.map((vac) => {
                const isSelected = selectedVaccines.includes(vac);
                return (
                  <button
                    type="button"
                    key={vac}
                    onClick={() => toggleVaccine(vac)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{vac}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skrining Perkembangan KPSP */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Hasil Evaluasi Perkembangan KPSP
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setKpspStatus('sesuai')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  kpspStatus === 'sesuai'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Sesuai Umur (S)
              </button>
              <button
                type="button"
                onClick={() => setKpspStatus('meragukan')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  kpspStatus === 'meragukan'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Meragukan (M)
              </button>
              <button
                type="button"
                onClick={() => setKpspStatus('penyimpangan')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  kpspStatus === 'penyimpangan'
                    ? 'bg-red-500 text-white border-red-500 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Penyimpangan (P)
              </button>
            </div>
          </div>

          {/* Keluhan & Catatan Kader */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Keluhan Orang Tua / Kondisi Anak</label>
              <textarea
                rows={2}
                value={complaints}
                onChange={(e) => setComplaints(e.target.value)}
                placeholder="misal: Anak sempat demam ringan, makan agak susah 2 hari..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Bidan & Edukasi Kader</label>
              <textarea
                rows={2}
                value={cadreNotes}
                onChange={(e) => setCadreNotes(e.target.value)}
                placeholder="misal: Tingkatkan porsi prohe telur/hati ayam, stimulasi bicara..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-200 active:scale-95 transition-all"
            >
              Simpan Hasil Posyandu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
