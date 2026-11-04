import { BBUStatus, TBUStatus, BBTBStatus, LKUStatus, WeightGainStatus, Gender } from '@/types';

// ==========================================================
// STANDAR WHO ANTROPOMETRI & KEMENKES RI (Permenkes No. 2/2020)
// ==========================================================

// Kenaikan Berat Badan Minimal (KBM) per bulan dalam gram
export const KBM_TABLE: Record<number, number> = {
  1: 800,
  2: 900,
  3: 800,
  4: 600,
  5: 500,
  6: 400,
  7: 300,
  8: 300,
  9: 300,
  10: 300,
  11: 300,
  12: 200,
};

export function getTargetKBM(ageMonths: number): number {
  if (ageMonths <= 0) return 0;
  if (ageMonths <= 12) return KBM_TABLE[ageMonths] || 200;
  return 200; // Umur 12 - 59 bulan: KBM 200 gram
}

// Standar Berat Badan menurut Umur (BB/U) Anak Perempuan (0 - 24 bulan) dalam kg
export const WHO_WEIGHT_GIRLS: Record<number, { sd3neg: number; sd2neg: number; median: number; sd2pos: number; sd3pos: number }> = {
  0: { sd3neg: 2.4, sd2neg: 2.8, median: 3.2, sd2pos: 4.2, sd3pos: 4.8 },
  1: { sd3neg: 3.2, sd2neg: 3.6, median: 4.2, sd2pos: 5.5, sd3pos: 6.2 },
  2: { sd3neg: 3.9, sd2neg: 4.5, median: 5.1, sd2pos: 6.6, sd3pos: 7.5 },
  3: { sd3neg: 4.5, sd2neg: 5.2, median: 5.8, sd2pos: 7.5, sd3pos: 8.5 },
  4: { sd3neg: 5.0, sd2neg: 5.7, median: 6.4, sd2pos: 8.2, sd3pos: 9.3 },
  5: { sd3neg: 5.4, sd2neg: 6.1, median: 6.9, sd2pos: 8.8, sd3pos: 10.0 },
  6: { sd3neg: 5.7, sd2neg: 6.5, median: 7.3, sd2pos: 9.3, sd3pos: 10.6 },
  7: { sd3neg: 6.0, sd2neg: 6.8, median: 7.6, sd2pos: 9.8, sd3pos: 11.1 },
  8: { sd3neg: 6.3, sd2neg: 7.0, median: 7.9, sd2pos: 10.2, sd3pos: 11.6 },
  9: { sd3neg: 6.5, sd2neg: 7.3, median: 8.2, sd2pos: 10.5, sd3pos: 12.0 },
  10: { sd3neg: 6.7, sd2neg: 7.5, median: 8.5, sd2pos: 10.9, sd3pos: 12.4 },
  11: { sd3neg: 6.9, sd2neg: 7.7, median: 8.7, sd2pos: 11.2, sd3pos: 12.8 },
  12: { sd3neg: 7.0, sd2neg: 7.9, median: 8.9, sd2pos: 11.5, sd3pos: 13.1 },
  15: { sd3neg: 7.6, sd2neg: 8.5, median: 9.6, sd2pos: 12.4, sd3pos: 14.1 },
  18: { sd3neg: 8.1, sd2neg: 9.1, median: 10.2, sd2pos: 13.2, sd3pos: 15.1 },
  24: { sd3neg: 9.0, sd2neg: 10.2, median: 11.5, sd2pos: 14.8, sd3pos: 17.0 },
  36: { sd3neg: 10.8, sd2neg: 12.2, median: 13.9, sd2pos: 18.1, sd3pos: 20.9 },
  48: { sd3neg: 12.3, sd2neg: 14.0, median: 16.1, sd2pos: 21.2, sd3pos: 24.8 },
  60: { sd3neg: 13.7, sd2neg: 15.8, median: 18.2, sd2pos: 24.2, sd3pos: 28.5 },
};

// Standar Berat Badan menurut Umur (BB/U) Anak Laki-Laki (0 - 24 bulan) dalam kg
export const WHO_WEIGHT_BOYS: Record<number, { sd3neg: number; sd2neg: number; median: number; sd2pos: number; sd3pos: number }> = {
  0: { sd3neg: 2.5, sd2neg: 2.9, median: 3.3, sd2pos: 4.4, sd3pos: 5.0 },
  1: { sd3neg: 3.4, sd2neg: 3.9, median: 4.5, sd2pos: 5.8, sd3pos: 6.6 },
  2: { sd3neg: 4.3, sd2neg: 4.9, median: 5.6, sd2pos: 7.1, sd3pos: 8.0 },
  3: { sd3neg: 5.0, sd2neg: 5.7, median: 6.4, sd2pos: 8.0, sd3pos: 9.0 },
  4: { sd3neg: 5.6, sd2neg: 6.2, median: 7.0, sd2pos: 8.7, sd3pos: 9.7 },
  5: { sd3neg: 6.0, sd2neg: 6.7, median: 7.5, sd2pos: 9.3, sd3pos: 10.4 },
  6: { sd3neg: 6.4, sd2neg: 7.1, median: 7.9, sd2pos: 9.8, sd3pos: 10.9 },
  7: { sd3neg: 6.7, sd2neg: 7.4, median: 8.3, sd2pos: 10.3, sd3pos: 11.4 },
  8: { sd3neg: 6.9, sd2neg: 7.7, median: 8.6, sd2pos: 10.7, sd3pos: 11.9 },
  9: { sd3neg: 7.1, sd2neg: 8.0, median: 8.9, sd2pos: 11.0, sd3pos: 12.3 },
  10: { sd3neg: 7.4, sd2neg: 8.2, median: 9.2, sd2pos: 11.4, sd3pos: 12.7 },
  11: { sd3neg: 7.6, sd2neg: 8.4, median: 9.4, sd2pos: 11.7, sd3pos: 13.0 },
  12: { sd3neg: 7.7, sd2neg: 8.6, median: 9.6, sd2pos: 12.0, sd3pos: 13.3 },
  15: { sd3neg: 8.3, sd2neg: 9.2, median: 10.3, sd2pos: 12.8, sd3pos: 14.3 },
  18: { sd3neg: 8.8, sd2neg: 9.8, median: 10.9, sd2pos: 13.7, sd3pos: 15.3 },
  24: { sd3neg: 9.7, sd2neg: 10.8, median: 12.2, sd2pos: 15.3, sd3pos: 17.1 },
  36: { sd3neg: 11.3, sd2neg: 12.7, median: 14.3, sd2pos: 18.3, sd3pos: 20.8 },
  48: { sd3neg: 12.7, sd2neg: 14.4, median: 16.3, sd2pos: 21.2, sd3pos: 24.5 },
  60: { sd3neg: 14.1, sd2neg: 16.0, median: 18.3, sd2pos: 24.2, sd3pos: 28.2 },
};

// Standar Tinggi/Panjang Badan menurut Umur (TB/U) - Deteksi Stunting (cm)
export const WHO_HEIGHT_GIRLS: Record<number, { sd3neg: number; sd2neg: number; median: number; sd2pos: number; sd3pos: number }> = {
  0: { sd3neg: 45.4, sd2neg: 47.3, median: 49.1, sd2pos: 52.9, sd3pos: 54.7 },
  1: { sd3neg: 49.8, sd2neg: 51.7, median: 53.7, sd2pos: 57.6, sd3pos: 59.5 },
  2: { sd3neg: 53.0, sd2neg: 55.0, median: 57.1, sd2pos: 61.1, sd3pos: 63.2 },
  3: { sd3neg: 55.6, sd2neg: 57.7, median: 59.8, sd2pos: 64.0, sd3pos: 66.1 },
  4: { sd3neg: 57.8, sd2neg: 59.9, median: 62.1, sd2pos: 66.4, sd3pos: 68.6 },
  5: { sd3neg: 59.6, sd2neg: 61.8, median: 64.0, sd2pos: 68.5, sd3pos: 70.7 },
  6: { sd3neg: 61.2, sd2neg: 63.5, median: 65.7, sd2pos: 70.3, sd3pos: 72.5 },
  7: { sd3neg: 62.7, sd2neg: 65.0, median: 67.3, sd2pos: 71.9, sd3pos: 74.2 },
  8: { sd3neg: 64.0, sd2neg: 66.4, median: 68.7, sd2pos: 73.5, sd3pos: 75.8 },
  9: { sd3neg: 65.3, sd2neg: 67.7, median: 70.1, sd2pos: 75.0, sd3pos: 77.4 },
  10: { sd3neg: 66.5, sd2neg: 69.0, median: 71.5, sd2pos: 76.4, sd3pos: 78.9 },
  11: { sd3neg: 67.7, sd2neg: 70.3, median: 72.8, sd2pos: 77.8, sd3pos: 80.3 },
  12: { sd3neg: 68.9, sd2neg: 71.4, median: 74.0, sd2pos: 79.2, sd3pos: 81.7 },
  18: { sd3neg: 74.9, sd2neg: 77.9, median: 80.7, sd2pos: 86.5, sd3pos: 89.4 },
  24: { sd3neg: 80.0, sd2neg: 82.5, median: 85.7, sd2pos: 92.2, sd3pos: 95.3 },
  36: { sd3neg: 87.4, sd2neg: 91.2, median: 95.1, sd2pos: 102.7, sd3pos: 106.5 },
  48: { sd3neg: 94.1, sd2neg: 98.4, median: 102.7, sd2pos: 111.3, sd3pos: 115.7 },
  60: { sd3neg: 99.9, sd2neg: 104.7, median: 109.4, sd2pos: 118.9, sd3pos: 123.7 },
};

export const WHO_HEIGHT_BOYS: Record<number, { sd3neg: number; sd2neg: number; median: number; sd2pos: number; sd3pos: number }> = {
  0: { sd3neg: 46.1, sd2neg: 48.0, median: 49.9, sd2pos: 53.7, sd3pos: 55.6 },
  1: { sd3neg: 50.8, sd2neg: 52.8, median: 54.7, sd2pos: 58.6, sd3pos: 60.6 },
  2: { sd3neg: 54.4, sd2neg: 56.4, median: 58.4, sd2pos: 62.4, sd3pos: 64.4 },
  3: { sd3neg: 57.3, sd2neg: 59.4, median: 61.4, sd2pos: 65.5, sd3pos: 67.6 },
  4: { sd3neg: 59.7, sd2neg: 61.8, median: 63.9, sd2pos: 68.0, sd3pos: 70.1 },
  5: { sd3neg: 61.7, sd2neg: 63.8, median: 65.9, sd2pos: 70.1, sd3pos: 72.2 },
  6: { sd3neg: 63.3, sd2neg: 65.5, median: 67.6, sd2pos: 71.9, sd3pos: 74.0 },
  7: { sd3neg: 64.8, sd2neg: 67.0, median: 69.2, sd2pos: 73.5, sd3pos: 75.7 },
  8: { sd3neg: 66.2, sd2neg: 68.4, median: 70.6, sd2pos: 75.0, sd3pos: 77.2 },
  9: { sd3neg: 67.5, sd2neg: 69.7, median: 72.0, sd2pos: 76.5, sd3pos: 78.7 },
  10: { sd3neg: 68.7, sd2neg: 71.0, median: 73.3, sd2pos: 77.9, sd3pos: 80.1 },
  11: { sd3neg: 69.9, sd2neg: 72.2, median: 74.5, sd2pos: 79.2, sd3pos: 81.5 },
  12: { sd3neg: 71.0, sd2neg: 73.4, median: 75.7, sd2pos: 80.5, sd3pos: 82.9 },
  18: { sd3neg: 76.9, sd2neg: 79.6, median: 82.3, sd2pos: 87.7, sd3pos: 90.4 },
  24: { sd3neg: 81.0, sd2neg: 83.5, median: 87.8, sd2pos: 93.9, sd3pos: 97.0 },
  36: { sd3neg: 88.7, sd2neg: 92.4, median: 96.1, sd2pos: 103.5, sd3pos: 107.2 },
  48: { sd3neg: 94.9, sd2neg: 99.1, median: 103.3, sd2pos: 111.7, sd3pos: 115.9 },
  60: { sd3neg: 100.7, sd2neg: 105.3, median: 110.0, sd2pos: 119.2, sd3pos: 123.9 },
};

// Hitung Umur dalam Bulan & Hari dari Tanggal Lahir ke Tanggal Kunjungan
export function calculateDetailedAge(birthDateStr: string, visitDateStr: string): { months: number; days: number; text: string } {
  const birth = new Date(birthDateStr);
  const visit = new Date(visitDateStr);

  let months = (visit.getFullYear() - birth.getFullYear()) * 12 + (visit.getMonth() - birth.getMonth());
  let days = visit.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(visit.getFullYear(), visit.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) months = 0;
  if (days < 0) days = 0;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let text = '';
  if (years > 0) {
    text = `${years} th ${remainingMonths} bln`;
  } else {
    text = `${months} bln ${days} hr`;
  }

  return { months, days, text };
}

// Evaluasi Berat Badan menurut Umur (BB/U)
export function evaluateBBU(weightKg: number, ageMonths: number, gender: Gender): BBUStatus {
  const table = gender === 'P' ? WHO_WEIGHT_GIRLS : WHO_WEIGHT_BOYS;
  const ref = table[ageMonths] || table[12] || { sd3neg: 7.0, sd2neg: 7.9, median: 8.9, sd2pos: 11.5, sd3pos: 13.1 };

  if (weightKg < ref.sd3neg) return 'severely_underweight';
  if (weightKg < ref.sd2neg) return 'underweight';
  if (weightKg > ref.sd2pos) return 'risk_overweight';
  return 'normal';
}

// Evaluasi Tinggi Badan menurut Umur (TB/U) - Skrining Stunting
export function evaluateTBU(heightCm: number, ageMonths: number, gender: Gender): TBUStatus {
  const table = gender === 'P' ? WHO_HEIGHT_GIRLS : WHO_HEIGHT_BOYS;
  const ref = table[ageMonths] || table[12] || { sd3neg: 68.9, sd2neg: 71.4, median: 74.0, sd2pos: 79.2, sd3pos: 81.7 };

  if (heightCm < ref.sd3neg) return 'severely_stunted';
  if (heightCm < ref.sd2neg) return 'stunted';
  if (heightCm > ref.sd3pos) return 'tall';
  return 'normal';
}

// Evaluasi BB/TB (Status Gizi Akut / Wasting)
export function evaluateBBTB(weightKg: number, heightCm: number): BBTBStatus {
  // BMI approximation untuk balita: Weight / (Height in m)^2
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 12.5) return 'severely_wasted';
  if (bmi < 14.0) return 'wasted';
  if (bmi >= 14.0 && bmi <= 17.5) return 'normal';
  if (bmi > 17.5 && bmi <= 18.5) return 'risk_overweight';
  if (bmi > 18.5 && bmi <= 20.0) return 'overweight';
  return 'obese';
}

// Evaluasi Lingkar Kepala (LK/U)
export function evaluateLKU(headCircCm: number, ageMonths: number): LKUStatus {
  // Lingkar kepala perkiraan median: ~34 cm saat lahir, ~45 cm saat 12 bln
  const approxMedian = 34 + Math.min(ageMonths, 12) * 0.9;
  if (headCircCm < approxMedian - 3) return 'microcephaly';
  if (headCircCm > approxMedian + 3) return 'macrocephaly';
  return 'normal';
}

// Evaluasi Kenaikan Berat Badan Minimal (KBM)
export function evaluateKBM(
  ageMonths: number,
  currentWeightKg: number,
  prevWeightKg?: number
): { status: WeightGainStatus; deltaGram: number; targetGram: number; description: string } {
  if (prevWeightKg === undefined || prevWeightKg === null || prevWeightKg <= 0 || ageMonths === 0) {
    return {
      status: 'B',
      deltaGram: 0,
      targetGram: 0,
      description: 'Pengukuran Baru (Bulan Pertama)',
    };
  }

  const deltaGram = Math.round((currentWeightKg - prevWeightKg) * 1000);
  const targetGram = getTargetKBM(ageMonths);

  if (deltaGram >= targetGram) {
    return {
      status: 'N',
      deltaGram,
      targetGram,
      description: `Naik (N): Bertambah +${deltaGram}g (Target: min +${targetGram}g)`,
    };
  } else {
    return {
      status: 'T',
      deltaGram,
      targetGram,
      description: deltaGram <= 0 
        ? `Tidak Naik (T): Turun ${deltaGram}g (Target: min +${targetGram}g)`
        : `Tidak Naik (T): Naik hanya +${deltaGram}g, kurang dari target +${targetGram}g`,
    };
  }
}

// Label & Color Formatters
export const BBU_CONFIG: Record<BBUStatus, { label: string; badgeClass: string; desc: string }> = {
  severely_underweight: {
    label: 'BB Sangat Kurang',
    badgeClass: 'bg-red-100 text-red-700 border-red-300',
    desc: 'Di bawah -3 SD (Perlu rujukan segera ke Puskesmas/Sp.A)',
  },
  underweight: {
    label: 'BB Kurang',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: 'Di bawah -2 SD (Perlu peningkatan kalori MPASI/ASI)',
  },
  normal: {
    label: 'BB Normal',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: 'Sesuai kurva pertumbuhan ideal WHO',
  },
  risk_overweight: {
    label: 'Risiko BB Lebih',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    desc: 'Di atas +1 SD WHO, pantau asupan manis/gula',
  },
};

export const TBU_CONFIG: Record<TBUStatus, { label: string; badgeClass: string; isStunted: boolean; desc: string }> = {
  severely_stunted: {
    label: 'Sangat Pendek (Severely Stunted)',
    badgeClass: 'bg-red-600 text-white font-bold',
    isStunted: true,
    desc: 'Indikasi Stunting Berat (< -3 SD). Memerlukan intervensi medis spesialis anak.',
  },
  stunted: {
    label: 'Pendek (Stunted)',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 font-semibold',
    isStunted: true,
    desc: 'Indikasi Stunting (-3 SD s/d -2 SD). Perlu suplementasi zat besi & protein hewani.',
  },
  normal: {
    label: 'Tinggi Badan Normal',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    isStunted: false,
    desc: 'Tinggi badan tumbuh optimal sesuai standar usia.',
  },
  tall: {
    label: 'Tinggi',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    isStunted: false,
    desc: 'Di atas rata-rata tinggi badan seusianya.',
  },
};

export const BBTB_CONFIG: Record<BBTBStatus, { label: string; badgeClass: string }> = {
  severely_wasted: { label: 'Gizi Buruk', badgeClass: 'bg-red-500 text-white' },
  wasted: { label: 'Gizi Kurang', badgeClass: 'bg-amber-100 text-amber-800 border-amber-300' },
  normal: { label: 'Gizi Baik (Normal)', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  risk_overweight: { label: 'Berisiko Gizi Lebih', badgeClass: 'bg-blue-100 text-blue-800 border-blue-300' },
  overweight: { label: 'Gizi Lebih', badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  obese: { label: 'Obesitas', badgeClass: 'bg-purple-100 text-purple-800 border-purple-300' },
};

export const KBM_STATUS_CONFIG: Record<WeightGainStatus, { label: string; icon: string; badgeClass: string; note: string }> = {
  N: {
    label: 'N (Naik)',
    icon: '📈',
    badgeClass: 'bg-emerald-500 text-white',
    note: 'Pertumbuhan baik, berat badan naik memenuhi target minimal bulan ini.',
  },
  T: {
    label: 'T (Tidak Naik)',
    icon: '⚠️',
    badgeClass: 'bg-amber-500 text-white',
    note: 'Waspada: Berat badan tidak naik / di bawah target KBM. Cek asupan makan & kesehatan.',
  },
  B: {
    label: 'B (Baru)',
    icon: '⭐',
    badgeClass: 'bg-blue-500 text-white',
    note: 'Kunjungan pertama / data dasar anak.',
  },
};
