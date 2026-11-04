'use client';

import React, { useState } from 'react';
import { usePosyanduStore } from '@/lib/store/usePosyanduStore';
import { PosyanduVisit } from '@/types';
import {
  evaluateBBU,
  evaluateTBU,
  evaluateBBTB,
  evaluateLKU,
  evaluateKBM,
  BBU_CONFIG,
  TBU_CONFIG,
  BBTB_CONFIG,
} from '@/lib/whoGrowthStandards';
import { X, Scale, Calendar, Trash2 } from 'lucide-react';

interface EditVisitModalProps {
  visit: PosyanduVisit;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditVisitModal({ visit, isOpen, onClose }: EditVisitModalProps) {
  const { getActiveChild, updateVisit, deleteVisit, getActiveVisits } = usePosyanduStore();
  const activeChild = getActiveChild();
  const visits = getActiveVisits();

  // Cari kunjungan sebelumnya untuk KBM delta
  const prevVisit = visits
    .filter((v) => v.ageMonths < visit.ageMonths)
    .sort((a, b) => b.ageMonths - a.ageMonths)[0];

  const [visitDate, setVisitDate] = useState(visit.visitDate);
  const [ageMonths, setAgeMonths] = useState(visit.ageMonths);
  const [weightKg, setWeightKg] = useState(visit.weightKg.toString());
  const [heightCm, setHeightCm] = useState(visit.heightCm.toString());
  const [headCircCm, setHeadCircCm] = useState(visit.headCircCm?.toString() || '');
  const [armCircCm, setArmCircCm] = useState(visit.armCircCm?.toString() || '');
  const [vitaminA, setVitaminA] = useState(visit.vitaminA);
  const [dewormingMed, setDewormingMed] = useState(visit.dewormingMed);
  const [pmtReceived, setPmtReceived] = useState(visit.pmtReceived);
  const [oralitZinc, setOralitZinc] = useState(visit.oralitZinc);
  const [ironSupplements, setIronSupplements] = useState(visit.ironSupplements);
  const [kpspStatus, setKpspStatus] = useState(visit.kpspStatus);
  const [complaints, setComplaints] = useState(visit.complaints || '');
  const [cadreNotes, setCadreNotes] = useState(visit.cadreNotes || '');
  const [examinerName, setExaminerName] = useState(visit.examinerName || '');

  if (!isOpen || !activeChild) return null;

  const currentWeightNum = parseFloat(weightKg) || 0;
  const currentHeightNum = parseFloat(heightCm) || 0;
  const currentHeadCircNum = parseFloat(headCircCm) || undefined;
  const currentArmCircNum = parseFloat(armCircCm) || undefined;

  const kbmEval = evaluateKBM(
    ageMonths,
    currentWeightNum,
    prevVisit ? prevVisit.weightKg : activeChild.birthWeight
  );
  const bbuEval = evaluateBBU(currentWeightNum, ageMonths, activeChild.gender);
  const tbuEval = evaluateTBU(currentHeightNum, ageMonths, activeChild.gender);
  const bbtbEval = evaluateBBTB(currentWeightNum, currentHeightNum);
  const lkuEval = evaluateLKU(currentHeadCircNum || 35, ageMonths);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateVisit({
      ...visit,
      visitDate,
      ageMonths,
      weightKg: currentWeightNum,
      heightCm: currentHeightNum,
      headCircCm: currentHeadCircNum,
      armCircCm: currentArmCircNum,
      weightGainStatus: kbmEval.status,
      weightGainGram: kbmEval.deltaGram,
      bbuStatus: bbuEval,
      tbuStatus: tbuEval,
      bbtbStatus: bbtbEval,
      lkuStatus: lkuEval,
      vitaminA,
      dewormingMed,
      pmtReceived,
      oralitZinc,
      ironSupplements,
      kpspStatus,
      complaints,
      cadreNotes,
      examinerName,
    });
    onClose();
  };

  const handleDelete = async () => {
    if (confirm(`Yakin ingin menghapus data kunjungan bulan ke-${visit.ageMonths}?`)) {
      await deleteVisit(visit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6">
        <div className="bg-slate-800 p-5 text-white flex items-center justify-between">
          <div>
            <span className="text-slate-300 text-xs font-semibold uppercase">Ubah Data Kunjungan</span>
            <h2 className="text-lg font-bold">Bulan ke-{visit.ageMonths} ({visit.visitDate})</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Kunjungan</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Usia (Bulan)</label>
              <input
                type="number"
                min="0"
                max="60"
                value={ageMonths}
                onChange={(e) => setAgeMonths(parseInt(e.target.value) || 0)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">BB (kg) *</label>
                <input
                  type="number"
                  step="0.05"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">TB (cm) *</label>
                <input
                  type="number"
                  step="0.1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">LK (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={headCircCm}
                  onChange={(e) => setHeadCircCm(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">LiLA (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={armCircCm}
                  onChange={(e) => setArmCircCm(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-sm"
                />
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Status KBM:</span>
                <span className="font-bold text-emerald-700">{kbmEval.status === 'N' ? 'Naik (N)' : 'Tidak Naik (T)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">BB/U WHO:</span>
                <span className="font-semibold">{BBU_CONFIG[bbuEval].label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TB/U (Stunting):</span>
                <span className="font-semibold text-slate-800">{TBU_CONFIG[tbuEval].label}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2 p-2 border rounded-xl">
              <input type="checkbox" checked={vitaminA} onChange={(e) => setVitaminA(e.target.checked)} />
              <span>Vitamin A</span>
            </label>
            <label className="flex items-center gap-2 p-2 border rounded-xl">
              <input type="checkbox" checked={dewormingMed} onChange={(e) => setDewormingMed(e.target.checked)} />
              <span>Obat Cacing</span>
            </label>
            <label className="flex items-center gap-2 p-2 border rounded-xl">
              <input type="checkbox" checked={pmtReceived} onChange={(e) => setPmtReceived(e.target.checked)} />
              <span>PMT Balita</span>
            </label>
            <label className="flex items-center gap-2 p-2 border rounded-xl">
              <input type="checkbox" checked={ironSupplements} onChange={(e) => setIronSupplements(e.target.checked)} />
              <span>Zat Besi</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Bidan / Kader</label>
            <textarea
              rows={2}
              value={cadreNotes}
              onChange={(e) => setCadreNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Kunjungan</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-200"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
