import { create } from 'zustand';
import { Child, PosyanduVisit, ChildImmunization } from '@/types';
import { posyanduService } from '../supabase/posyanduService';
import { isSupabaseConfigured } from '../supabase/client';

// Data Awal Standar Default: Nabila & Delisa
export const DEFAULT_CHILDREN: Child[] = [
  {
    id: 'child-nabila-001',
    name: 'Nabila Azzahra Widianto',
    nickname: 'Nabila',
    nik: '3578016604240004',
    gender: 'P',
    birthOrder: 1, // Anak Pertama
    birthDate: '2024-04-26',
    birthWeight: 3.15,
    birthHeight: 48.5,
    birthHeadCirc: 33.5,
    bloodType: 'O',
    fatherName: 'Nanda Eko Widianto',
    motherName: 'Devi Asmarani',
    posyanduName: 'Posyandu Warugunung RW 02',
    village: 'Warugunung, Karang Pilang',
    address: 'Warugunung RT 002 / RW 002, Karang Pilang, Surabaya',
    kiaBookNo: 'KIA-SBY-2024-0426',
    avatarUrl: '',
    createdAt: '2024-04-26T08:00:00Z',
  },
  {
    id: 'child-delisa-002',
    name: 'Delisa Zafira Widianto',
    nickname: 'Delisa',
    nik: '3578014801260004',
    gender: 'P',
    birthOrder: 2, // Anak Kedua
    birthDate: '2026-01-08',
    birthWeight: 3.2,
    birthHeight: 49.0,
    birthHeadCirc: 33.5,
    bloodType: 'O',
    fatherName: 'Nanda Eko Widianto',
    motherName: 'Devi Asmarani',
    posyanduName: 'Posyandu Warugunung RW 02',
    village: 'Warugunung, Karang Pilang',
    address: 'Warugunung RT 002 / RW 002, Karang Pilang, Surabaya',
    kiaBookNo: 'KIA-SBY-2026-0108',
    avatarUrl: '',
    createdAt: '2026-01-08T08:00:00Z',
  },
];

export const DEFAULT_VISITS: PosyanduVisit[] = [
  {
    id: 'visit-nabila-000',
    childId: 'child-nabila-001',
    visitDate: '2024-04-26',
    ageMonths: 0,
    weightKg: 3.15,
    heightCm: 48.5,
    headCircCm: 33.5,
    armCircCm: 11.0,
    weightGainStatus: 'B',
    weightGainGram: 0,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: false,
    oralitZinc: false,
    ironSupplements: false,
    immunizationsGiven: ['Hepatitis B0 (HB-0)'],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Bayi baru lahir sehat, menangis kuat, bugar.',
    cadreNotes: 'Berikan ASI Eksklusif sesering mungkin setiap 2 jam. Jaga kehangatan bayi.',
    examinerName: 'Bidan Desa Warugunung',
    createdAt: '2024-04-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-001',
    childId: 'child-nabila-001',
    visitDate: '2024-05-26',
    ageMonths: 1,
    weightKg: 4.10,
    heightCm: 53.0,
    headCircCm: 36.2,
    armCircCm: 12.0,
    weightGainStatus: 'N',
    weightGainGram: 950,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: false,
    oralitZinc: false,
    ironSupplements: false,
    immunizationsGiven: ['BCG', 'Polio 1 (Tetes)'],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Bayi menyusu aktif, tidak ada keluhan.',
    cadreNotes: 'Kenaikan berat badan optimal (+950g). Pertahankan ASI Eksklusif.',
    examinerName: 'Kader Posyandu Warugunung',
    createdAt: '2024-05-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-002',
    childId: 'child-nabila-001',
    visitDate: '2024-06-26',
    ageMonths: 2,
    weightKg: 5.05,
    heightCm: 56.5,
    headCircCm: 38.0,
    armCircCm: 12.7,
    weightGainStatus: 'N',
    weightGainGram: 950,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: false,
    oralitZinc: false,
    ironSupplements: false,
    immunizationsGiven: ['DPT-HB-Hib 1', 'Polio 2', 'PCV 1', 'Rotavirus 1'],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Demam ringan pasca imunisasi, membaik setelah paracetamol.',
    cadreNotes: 'Kenaikan BB di atas KBM 900g. Imunisasi lengkap usia 2 bulan.',
    examinerName: 'Bidan Desa Warugunung',
    createdAt: '2024-06-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-003',
    childId: 'child-nabila-001',
    visitDate: '2024-07-26',
    ageMonths: 3,
    weightKg: 5.90,
    heightCm: 59.5,
    headCircCm: 39.4,
    armCircCm: 13.3,
    weightGainStatus: 'N',
    weightGainGram: 850,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: false,
    oralitZinc: false,
    ironSupplements: false,
    immunizationsGiven: ['DPT-HB-Hib 2', 'Polio 3', 'PCV 2', 'Rotavirus 2'],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Bayi aktif mengoceh dan tersenyum saat diajak bercanda.',
    cadreNotes: 'Motorik kasar sangat bagus, kepala sudah mulai tegak saat ditengkurapkan.',
    examinerName: 'Kader Posyandu Warugunung',
    createdAt: '2024-07-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-004',
    childId: 'child-nabila-001',
    visitDate: '2024-08-26',
    ageMonths: 4,
    weightKg: 6.55,
    heightCm: 62.0,
    headCircCm: 40.7,
    armCircCm: 13.8,
    weightGainStatus: 'N',
    weightGainGram: 650,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: false,
    oralitZinc: false,
    ironSupplements: false,
    immunizationsGiven: ['DPT-HB-Hib 3', 'Polio 4', 'Polio Suntik (IPV 1)', 'Rotavirus 3'],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Kondisi bugar, menyusu lancar.',
    cadreNotes: 'Kurva KMS konsisten berada di garis hijau median WHO.',
    examinerName: 'Bidan Desa Warugunung',
    createdAt: '2024-08-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-005',
    childId: 'child-nabila-001',
    visitDate: '2024-09-26',
    ageMonths: 5,
    weightKg: 7.10,
    heightCm: 64.2,
    headCircCm: 41.5,
    armCircCm: 14.1,
    weightGainStatus: 'N',
    weightGainGram: 550,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: false,
    oralitZinc: false,
    ironSupplements: false,
    immunizationsGiven: [],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Mulai tertarik melihat makanan keluarga.',
    cadreNotes: 'Siapkan MPASI tepat usia 6 bulan, utamakan protein hewani.',
    examinerName: 'Kader Posyandu Warugunung',
    createdAt: '2024-09-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-006',
    childId: 'child-nabila-001',
    visitDate: '2024-10-26',
    ageMonths: 6,
    weightKg: 7.55,
    heightCm: 66.0,
    headCircCm: 42.3,
    armCircCm: 14.4,
    weightGainStatus: 'N',
    weightGainGram: 450,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: true,
    vitaminAType: 'biru',
    dewormingMed: false,
    pmtReceived: true,
    oralitZinc: false,
    ironSupplements: true,
    immunizationsGiven: [],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Mulai MPASI bubur lumat hati ayam dan telur puyuh.',
    cadreNotes: 'Diberikan Kapsul Vit A Biru & PMT Balita. Porsi makan 2-3 sendok makan.',
    examinerName: 'Bidan Desa Warugunung',
    createdAt: '2024-10-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-007',
    childId: 'child-nabila-001',
    visitDate: '2024-11-26',
    ageMonths: 7,
    weightKg: 7.90,
    heightCm: 67.5,
    headCircCm: 42.9,
    armCircCm: 14.5,
    weightGainStatus: 'N',
    weightGainGram: 350,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: false,
    oralitZinc: false,
    ironSupplements: true,
    immunizationsGiven: [],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Makan lahap 2-3 kali sehari, suka bubur ikan lele & sayur.',
    cadreNotes: 'Kenaikan BB di atas target KBM 300g.',
    examinerName: 'Kader Posyandu Warugunung',
    createdAt: '2024-11-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-008',
    childId: 'child-nabila-001',
    visitDate: '2024-12-26',
    ageMonths: 8,
    weightKg: 8.25,
    heightCm: 69.2,
    headCircCm: 43.5,
    armCircCm: 14.7,
    weightGainStatus: 'N',
    weightGainGram: 350,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: true,
    oralitZinc: false,
    ironSupplements: false,
    immunizationsGiven: [],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Sudah bisa duduk sendiri tanpa ditopang dan merangkak aktif.',
    cadreNotes: 'Tekstur MPASI bisa mulai ditingkatkan ke cincang halus.',
    examinerName: 'Kader Posyandu Warugunung',
    createdAt: '2024-12-26T09:00:00Z',
  },
  {
    id: 'visit-nabila-009',
    childId: 'child-nabila-001',
    visitDate: '2025-01-26',
    ageMonths: 9,
    weightKg: 8.60,
    heightCm: 71.0,
    headCircCm: 44.0,
    armCircCm: 14.9,
    weightGainStatus: 'N',
    weightGainGram: 350,
    bbuStatus: 'normal',
    tbuStatus: 'normal',
    bbtbStatus: 'normal',
    lkuStatus: 'normal',
    vitaminA: false,
    dewormingMed: false,
    pmtReceived: false,
    oralitZinc: false,
    ironSupplements: false,
    immunizationsGiven: ['Campak-Rubella (MR 1)', 'IPV 2'],
    kpspStatus: 'sesuai',
    kpspScore: 10,
    complaints: 'Mulai belajar berdiri berpegangan meja/kursi.',
    cadreNotes: 'Imunisasi MR 1 & IPV 2 berhasil diberikan. Tumbuh kembang prima.',
    examinerName: 'Bidan Desa Warugunung',
    createdAt: '2025-01-26T09:00:00Z',
  },
];

export const DEFAULT_IMMUNIZATIONS: ChildImmunization[] = [
  { id: 'imun-001', childId: 'child-nabila-001', vaccineCode: 'hb0', vaccineName: 'Hepatitis B (HB-0)', targetAgeMonths: 0, isGiven: true, givenDate: '2024-04-26', batchNo: 'HB240109', location: 'RSIA Tulungagung / Surabaya', notes: 'Diberikan saat lahir (<24 jam)' },
  { id: 'imun-002', childId: 'child-nabila-001', vaccineCode: 'bcg', vaccineName: 'BCG (Tuberkulosis)', targetAgeMonths: 1, isGiven: true, givenDate: '2024-05-26', batchNo: 'BCG240211', location: 'Posyandu Warugunung', notes: 'Lengan kanan atas, scar muncul baik' },
  { id: 'imun-003', childId: 'child-nabila-001', vaccineCode: 'polio1', vaccineName: 'Polio Tetes 1 (bOPV 1)', targetAgeMonths: 1, isGiven: true, givenDate: '2024-05-26', batchNo: 'POL240188', location: 'Posyandu Warugunung', notes: '2 tetes oral' },
  { id: 'imun-004', childId: 'child-nabila-001', vaccineCode: 'dpt1', vaccineName: 'DPT-HB-Hib 1 (Pentabio)', targetAgeMonths: 2, isGiven: true, givenDate: '2024-06-26', batchNo: 'PENT240319', location: 'Posyandu Warugunung', notes: 'Paha kiri' },
  { id: 'imun-005', childId: 'child-nabila-001', vaccineCode: 'polio2', vaccineName: 'Polio Tetes 2 (bOPV 2)', targetAgeMonths: 2, isGiven: true, givenDate: '2024-06-26', batchNo: 'POL240245', location: 'Posyandu Warugunung', notes: '2 tetes oral' },
  { id: 'imun-006', childId: 'child-nabila-001', vaccineCode: 'pcv1', vaccineName: 'PCV 1 (Pneumokokus)', targetAgeMonths: 2, isGiven: true, givenDate: '2024-06-26', batchNo: 'PCV240290', location: 'Posyandu Warugunung', notes: 'Paha kanan' },
  { id: 'imun-007', childId: 'child-nabila-001', vaccineCode: 'rv1', vaccineName: 'Rotavirus 1', targetAgeMonths: 2, isGiven: true, givenDate: '2024-06-26', batchNo: 'ROTA240112', location: 'Posyandu Warugunung', notes: 'Pencegah diare rotavirus' },
  { id: 'imun-008', childId: 'child-nabila-001', vaccineCode: 'dpt2', vaccineName: 'DPT-HB-Hib 2', targetAgeMonths: 3, isGiven: true, givenDate: '2024-07-26', batchNo: 'PENT240402', location: 'Posyandu Warugunung', notes: 'Paha kiri' },
  { id: 'imun-009', childId: 'child-nabila-001', vaccineCode: 'polio3', vaccineName: 'Polio Tetes 3 (bOPV 3)', targetAgeMonths: 3, isGiven: true, givenDate: '2024-07-26', batchNo: 'POL240381', location: 'Posyandu Warugunung', notes: '2 tetes oral' },
  { id: 'imun-010', childId: 'child-nabila-001', vaccineCode: 'pcv2', vaccineName: 'PCV 2', targetAgeMonths: 3, isGiven: true, givenDate: '2024-07-26', batchNo: 'PCV240356', location: 'Posyandu Warugunung', notes: 'Paha kanan' },
  { id: 'imun-011', childId: 'child-nabila-001', vaccineCode: 'rv2', vaccineName: 'Rotavirus 2', targetAgeMonths: 3, isGiven: true, givenDate: '2024-07-26', batchNo: 'ROTA240221', location: 'Posyandu Warugunung', notes: 'Tetes oral' },
  { id: 'imun-012', childId: 'child-nabila-001', vaccineCode: 'dpt3', vaccineName: 'DPT-HB-Hib 3', targetAgeMonths: 4, isGiven: true, givenDate: '2024-08-26', batchNo: 'PENT240510', location: 'Posyandu Warugunung', notes: 'Paha kiri' },
  { id: 'imun-013', childId: 'child-nabila-001', vaccineCode: 'polio4', vaccineName: 'Polio Tetes 4 (bOPV 4)', targetAgeMonths: 4, isGiven: true, givenDate: '2024-08-26', batchNo: 'POL240499', location: 'Posyandu Warugunung', notes: '2 tetes oral' },
  { id: 'imun-014', childId: 'child-nabila-001', vaccineCode: 'ipv1', vaccineName: 'Polio Suntik (IPV 1)', targetAgeMonths: 4, isGiven: true, givenDate: '2024-08-26', batchNo: 'IPV240187', location: 'Posyandu Warugunung', notes: 'Paha kanan' },
  { id: 'imun-015', childId: 'child-nabila-001', vaccineCode: 'rv3', vaccineName: 'Rotavirus 3', targetAgeMonths: 4, isGiven: true, givenDate: '2024-08-26', batchNo: 'ROTA240301', location: 'Posyandu Warugunung', notes: 'Tetes oral' },
  { id: 'imun-016', childId: 'child-nabila-001', vaccineCode: 'mr1', vaccineName: 'Campak-Rubella (MR 1)', targetAgeMonths: 9, isGiven: true, givenDate: '2025-01-26', batchNo: 'MR250112', location: 'Posyandu Warugunung', notes: 'Lengan kiri atas' },
  { id: 'imun-017', childId: 'child-nabila-001', vaccineCode: 'ipv2', vaccineName: 'Polio Suntik (IPV 2)', targetAgeMonths: 9, isGiven: true, givenDate: '2025-01-26', batchNo: 'IPV250125', location: 'Posyandu Warugunung', notes: 'Paha kiri' },
  { id: 'imun-018', childId: 'child-nabila-001', vaccineCode: 'pcv3', vaccineName: 'PCV 3 (Booster)', targetAgeMonths: 12, isGiven: true, givenDate: '2025-04-26', batchNo: 'PCV250410', location: 'Posyandu Warugunung', notes: 'Usia 12 bulan' },
  { id: 'imun-019', childId: 'child-nabila-001', vaccineCode: 'dpt_boost', vaccineName: 'DPT-HB-Hib Lanjutan (Booster)', targetAgeMonths: 18, isGiven: true, givenDate: '2025-10-26', batchNo: 'PENT251008', location: 'Posyandu Warugunung', notes: 'Usia 18 bulan' },
  { id: 'imun-020', childId: 'child-nabila-001', vaccineCode: 'mr_boost', vaccineName: 'Campak-Rubella 2 (Booster)', targetAgeMonths: 18, isGiven: true, givenDate: '2025-10-26', batchNo: 'MR251020', location: 'Posyandu Warugunung', notes: 'Usia 18 bulan' },
];

// Helper untuk memastikan setiap anak memiliki nomor urutan kelahiran (Anak ke-1, 2, dst.)
export function ensureBirthOrders(list: Child[]): Child[] {
  const sorted = [...list].sort(
    (a, b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime()
  );
  return list.map((c) => {
    if (c.birthOrder && c.birthOrder > 0) return c;
    const order = sorted.findIndex((s) => s.id === c.id) + 1;
    return { ...c, birthOrder: order > 0 ? order : 1 };
  });
}

const LOCAL_STORAGE_KEY = 'posyandu_kembang_anak_v1';

interface PosyanduStoreState {
  children: Child[];
  visits: PosyanduVisit[];
  immunizations: ChildImmunization[];
  activeChildId: string;
  isCloudConnected: boolean;
  isLoading: boolean;
  isSyncing: boolean;

  // Actions
  init: () => Promise<void>;
  setActiveChildId: (id: string) => void;
  addChild: (child: Omit<Child, 'id' | 'createdAt'>) => Promise<Child>;
  updateChild: (child: Child) => Promise<void>;
  deleteChild: (childId: string) => Promise<boolean>;
  addVisit: (visit: Omit<PosyanduVisit, 'id' | 'createdAt'>) => Promise<PosyanduVisit>;
  updateVisit: (visit: PosyanduVisit) => Promise<void>;
  deleteVisit: (visitId: string) => Promise<void>;
  toggleImmunization: (id: string, isGiven: boolean, givenDate?: string, batchNo?: string) => Promise<void>;
  syncWithCloud: () => Promise<void>;

  // Getters
  getActiveChild: () => Child | undefined;
  getActiveVisits: () => PosyanduVisit[];
  getActiveImmunizations: () => ChildImmunization[];
  getLatestVisit: () => PosyanduVisit | undefined;
  getPreviousVisit: () => PosyanduVisit | undefined;
}

export const usePosyanduStore = create<PosyanduStoreState>((set, get) => ({
  children: DEFAULT_CHILDREN,
  visits: DEFAULT_VISITS,
  immunizations: DEFAULT_IMMUNIZATIONS,
  activeChildId: 'child-nabila-001',
  isCloudConnected: false,
  isLoading: true,
  isSyncing: false,

  init: async () => {
    // 1. Coba baca dari LocalStorage terlebih dahulu agar render instan
    let localChildren = DEFAULT_CHILDREN;
    let localVisits = DEFAULT_VISITS;
    let localImmunizations = DEFAULT_IMMUNIZATIONS;
    let localActiveId = 'child-nabila-001';

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.children && parsed.children.length > 0) localChildren = parsed.children;
          if (parsed.visits && parsed.visits.length > 0) localVisits = parsed.visits;
          if (parsed.immunizations && parsed.immunizations.length > 0) localImmunizations = parsed.immunizations;
          if (parsed.activeChildId) localActiveId = parsed.activeChildId;
        }
      } catch (e) {
        console.warn('Gagal membaca local storage:', e);
      }
    }

    set({
      children: ensureBirthOrders(localChildren),
      visits: localVisits,
      immunizations: localImmunizations,
      activeChildId: localActiveId,
      isLoading: false,
      isCloudConnected: isSupabaseConfigured(),
    });

    // 2. Jika Supabase dikonfigurasi, coba sync data dari cloud
    if (isSupabaseConfigured()) {
      try {
        const rawCloudChildren = await posyanduService.getChildren();
        if (rawCloudChildren && rawCloudChildren.length > 0) {
          const cloudChildren = ensureBirthOrders(rawCloudChildren);
          const activeChild = cloudChildren[0];
          const [cloudVisits, cloudImmunizations] = await Promise.all([
            posyanduService.getVisits(activeChild.id),
            posyanduService.getImmunizations(activeChild.id),
          ]);

          set({
            children: cloudChildren,
            activeChildId: activeChild.id,
            visits: cloudVisits && cloudVisits.length > 0 ? cloudVisits : localVisits,
            immunizations: cloudImmunizations && cloudImmunizations.length > 0 ? cloudImmunizations : localImmunizations,
            isCloudConnected: true,
          });
        }
      } catch (err) {
        console.warn('Sync Supabase awal dilewati:', err);
      }
    }
  },

  setActiveChildId: (id: string) => {
    set({ activeChildId: id });
    if (typeof window !== 'undefined') {
      const state = get();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          children: state.children,
          visits: state.visits,
          immunizations: state.immunizations,
          activeChildId: id,
        })
      );
    }
  },

  addChild: async (childData) => {
    const existing = get().children;
    const newChild: Child = {
      ...childData,
      id: `child-${Date.now()}`,
      birthOrder: childData.birthOrder || existing.length + 1,
      createdAt: new Date().toISOString(),
    };

    const updatedChildren = ensureBirthOrders([...existing, newChild]);
    set({ children: updatedChildren, activeChildId: newChild.id });

    if (typeof window !== 'undefined') {
      const state = get();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          children: updatedChildren,
          visits: state.visits,
          immunizations: state.immunizations,
          activeChildId: newChild.id,
        })
      );
    }

    if (isSupabaseConfigured()) {
      await posyanduService.saveChild(newChild);
    }

    return newChild;
  },

  updateChild: async (child) => {
    const updated = ensureBirthOrders(get().children.map((c) => (c.id === child.id ? child : c)));
    set({ children: updated });

    if (typeof window !== 'undefined') {
      const state = get();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          children: updated,
          visits: state.visits,
          immunizations: state.immunizations,
          activeChildId: state.activeChildId,
        })
      );
    }

    if (isSupabaseConfigured()) {
      await posyanduService.saveChild(child);
    }
  },

  deleteChild: async (childId: string) => {
    const currentChildren = get().children;
    if (currentChildren.length <= 1) return false;

    const remaining = currentChildren.filter((c) => c.id !== childId);
    const nextActive = get().activeChildId === childId ? remaining[0].id : get().activeChildId;

    set({ children: remaining, activeChildId: nextActive });

    if (typeof window !== 'undefined') {
      const state = get();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          children: remaining,
          visits: state.visits,
          immunizations: state.immunizations,
          activeChildId: nextActive,
        })
      );
    }

    if (isSupabaseConfigured()) {
      await posyanduService.deleteChild(childId);
    }

    return true;
  },

  addVisit: async (visitData) => {
    const newVisit: PosyanduVisit = {
      ...visitData,
      id: `visit-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updatedVisits = [...get().visits, newVisit].sort((a, b) => a.ageMonths - b.ageMonths);
    set({ visits: updatedVisits });

    if (typeof window !== 'undefined') {
      const state = get();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          children: state.children,
          visits: updatedVisits,
          immunizations: state.immunizations,
          activeChildId: state.activeChildId,
        })
      );
    }

    if (isSupabaseConfigured()) {
      await posyanduService.saveVisit(newVisit);
    }

    return newVisit;
  },

  updateVisit: async (visit) => {
    const updated = get().visits.map((v) => (v.id === visit.id ? visit : v)).sort((a, b) => a.ageMonths - b.ageMonths);
    set({ visits: updated });

    if (typeof window !== 'undefined') {
      const state = get();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          children: state.children,
          visits: updated,
          immunizations: state.immunizations,
          activeChildId: state.activeChildId,
        })
      );
    }

    if (isSupabaseConfigured()) {
      await posyanduService.saveVisit(visit);
    }
  },

  deleteVisit: async (visitId) => {
    const updated = get().visits.filter((v) => v.id !== visitId);
    set({ visits: updated });

    if (typeof window !== 'undefined') {
      const state = get();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          children: state.children,
          visits: updated,
          immunizations: state.immunizations,
          activeChildId: state.activeChildId,
        })
      );
    }

    if (isSupabaseConfigured()) {
      await posyanduService.deleteVisit(visitId);
    }
  },

  toggleImmunization: async (id, isGiven, givenDate, batchNo) => {
    const updated = get().immunizations.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isGiven,
          givenDate: isGiven ? givenDate || new Date().toISOString().split('T')[0] : undefined,
          batchNo: isGiven ? batchNo || item.batchNo : undefined,
        };
      }
      return item;
    });

    set({ immunizations: updated });

    if (typeof window !== 'undefined') {
      const state = get();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          children: state.children,
          visits: state.visits,
          immunizations: updated,
          activeChildId: state.activeChildId,
        })
      );
    }

    if (isSupabaseConfigured()) {
      const target = updated.find((i) => i.id === id);
      if (target) await posyanduService.saveImmunization(target);
    }
  },

  syncWithCloud: async () => {
    if (!isSupabaseConfigured()) return;
    set({ isSyncing: true });
    try {
      const state = get();
      // Upload semua children & visits yang ada di lokal ke Supabase
      for (const child of state.children) {
        await posyanduService.saveChild(child);
      }
      for (const visit of state.visits) {
        await posyanduService.saveVisit(visit);
      }
      for (const imun of state.immunizations) {
        await posyanduService.saveImmunization(imun);
      }
      set({ isCloudConnected: true, isSyncing: false });
    } catch (err) {
      console.error('Sync failed:', err);
      set({ isSyncing: false });
    }
  },

  // Getters
  getActiveChild: () => {
    const state = get();
    return state.children.find((c) => c.id === state.activeChildId) || state.children[0];
  },

  getActiveVisits: () => {
    const state = get();
    return state.visits
      .filter((v) => v.childId === state.activeChildId)
      .sort((a, b) => a.ageMonths - b.ageMonths);
  },

  getActiveImmunizations: () => {
    const state = get();
    return state.immunizations.filter((i) => i.childId === state.activeChildId);
  },

  getLatestVisit: () => {
    const activeVisits = get().getActiveVisits();
    if (activeVisits.length === 0) return undefined;
    return activeVisits[activeVisits.length - 1];
  },

  getPreviousVisit: () => {
    const activeVisits = get().getActiveVisits();
    if (activeVisits.length < 2) return undefined;
    return activeVisits[activeVisits.length - 2];
  },
}));
