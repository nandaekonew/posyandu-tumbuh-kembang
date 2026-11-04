export type Gender = 'L' | 'P';

export type BBUStatus = 'severely_underweight' | 'underweight' | 'normal' | 'risk_overweight';
export type TBUStatus = 'severely_stunted' | 'stunted' | 'normal' | 'tall';
export type BBTBStatus = 'severely_wasted' | 'wasted' | 'normal' | 'risk_overweight' | 'overweight' | 'obese';
export type LKUStatus = 'microcephaly' | 'normal' | 'macrocephaly';
export type WeightGainStatus = 'N' | 'T' | 'B'; // N: Naik, T: Tidak Naik, B: Baru pertama kali
export type KPSPStatus = 'sesuai' | 'meragukan' | 'penyimpangan';

export interface Child {
  id: string;
  name: string;
  nickname: string;
  nik: string;
  gender: Gender;
  birthOrder?: number; // Urutan anak: 1 = Pertama, 2 = Kedua, dst.
  birthDate: string; // YYYY-MM-DD
  birthWeight: number; // kg
  birthHeight: number; // cm
  birthHeadCirc: number; // cm
  bloodType?: string;
  fatherName: string;
  motherName: string;
  posyanduName: string;
  village?: string;
  address?: string;
  kiaBookNo?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface PosyanduVisit {
  id: string;
  childId: string;
  visitDate: string; // YYYY-MM-DD
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  headCircCm?: number;
  armCircCm?: number; // LiLA
  weightGainStatus: WeightGainStatus;
  weightGainGram: number;
  bbuStatus: BBUStatus;
  tbuStatus: TBUStatus;
  bbtbStatus: BBTBStatus;
  lkuStatus: LKUStatus;
  vitaminA: boolean;
  vitaminAType?: 'biru' | 'merah' | null;
  dewormingMed: boolean;
  pmtReceived: boolean;
  oralitZinc: boolean;
  ironSupplements: boolean;
  immunizationsGiven: string[];
  kpspStatus: KPSPStatus;
  kpspScore?: number;
  complaints?: string;
  cadreNotes?: string;
  examinerName?: string;
  createdAt: string;
}

export interface ChildImmunization {
  id: string;
  childId: string;
  vaccineCode: string;
  vaccineName: string;
  targetAgeMonths: number;
  isGiven: boolean;
  givenDate?: string;
  batchNo?: string;
  location?: string;
  notes?: string;
}

export interface KPSPQuestionItem {
  id: string;
  ageGroup: number;
  sector: 'motorik_kasar' | 'motorik_halus' | 'bicara_bahasa' | 'sosialisasi_kemandirian';
  sectorLabel: string;
  question: string;
  tip: string;
}

export interface NutritionGuide {
  ageRange: string;
  title: string;
  texture: string;
  frequency: string;
  portion: string;
  sampleMenu: string[];
  tips: string[];
  warningNote?: string;
}
