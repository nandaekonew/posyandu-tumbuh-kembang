import { create } from 'zustand';
import { Child, PosyanduVisit, ChildImmunization } from '@/types';
import { posyanduService } from '../supabase/posyanduService';
import { isSupabaseConfigured } from '../supabase/client';

// Data Awal Standar Default: Delisa Zafira Widianto
export const DEFAULT_CHILDREN: Child[] = [
  {
    id: 'child-delisa-001',
    name: 'Delisa Zafira Widianto',
    nickname: 'Delisa',
    nik: '3578016701240002',
    gender: 'P',
    birthDate: '2024-01-27',
    birthWeight: 3.2,
    birthHeight: 49.0,
    birthHeadCirc: 33.5,
    bloodType: 'O',
    fatherName: 'Nanda Eko Widianto',
    motherName: 'Dina Rahmawati',
    posyanduName: 'Posyandu Melati RW 05',
    village: 'Rungkut Menanggal',
    address: 'Jl. Rungkut Asri Timur No. 12, Surabaya',
    kiaBookNo: 'KIA-SBY-2024-0198',
    avatarUrl: '',
    createdAt: '2024-01-27T08:00:00Z',
  },
];

export const DEFAULT_VISITS: PosyanduVisit[] = [
  {
    id: 'visit-000',
    childId: 'child-delisa-001',
    visitDate: '2024-01-27',
    ageMonths: 0,
    weightKg: 3.2,
    heightCm: 49.0,
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
    complaints: 'Kondisi bayi baru lahir sehat, menangis kuat, APGAR Score 9/10.',
    cadreNotes: 'Berikan ASI Eksklusif sesering mungkin setiap 2 jam. Jaga kehangatan bayi.',
    examinerName: 'Bidan Siti Rahayu, Amd.Keb',
    createdAt: '2024-01-27T09:00:00Z',
  },
  {
    id: 'visit-001',
    childId: 'child-delisa-001',
    visitDate: '2024-02-27',
    ageMonths: 1,
    weightKg: 4.15,
    heightCm: 53.5,
    headCircCm: 36.5,
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
    complaints: 'Tidak ada keluhan. Bayi menyusu sangat aktif.',
    cadreNotes: 'Kenaikan berat badan bagus (+950g, melebihi KBM 800g). Lanjutkan ASI eksklusif.',
    examinerName: 'Kader Ibu Endang',
    createdAt: '2024-02-27T09:00:00Z',
  },
  {
    id: 'visit-002',
    childId: 'child-delisa-001',
    visitDate: '2024-03-27',
    ageMonths: 2,
    weightKg: 5.1,
    heightCm: 57.0,
    headCircCm: 38.2,
    armCircCm: 12.8,
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
    complaints: 'Agak rewel setelah disuntik, tidak demam tinggi.',
    cadreNotes: 'Kompres bekas suntikan jika bengkak. Kenaikan BB optimal.',
    examinerName: 'Bidan Siti Rahayu, Amd.Keb',
    createdAt: '2024-03-27T09:00:00Z',
  },
  {
    id: 'visit-003',
    childId: 'child-delisa-001',
    visitDate: '2024-04-27',
    ageMonths: 3,
    weightKg: 5.95,
    heightCm: 60.0,
    headCircCm: 39.6,
    armCircCm: 13.5,
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
    complaints: 'Bayi sudah bisa tersenyum lebar dan mengoceh (cooing).',
    cadreNotes: 'Perkembangan motorik sangat baik, kepala mulai tegak saat tengkurap.',
    examinerName: 'Kader Ibu Endang',
    createdAt: '2024-04-27T09:00:00Z',
  },
  {
    id: 'visit-004',
    childId: 'child-delisa-001',
    visitDate: '2024-05-27',
    ageMonths: 4,
    weightKg: 6.6,
    heightCm: 62.5,
    headCircCm: 40.8,
    armCircCm: 14.0,
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
    complaints: 'Sempat demam ringan pasca imunisasi, membaik setelah paracetamol.',
    cadreNotes: 'Pertumbuhan fisik sangat selaras dengan kurva hijau KMS WHO.',
    examinerName: 'Bidan Siti Rahayu, Amd.Keb',
    createdAt: '2024-05-27T09:00:00Z',
  },
  {
    id: 'visit-005',
    childId: 'child-delisa-001',
    visitDate: '2024-06-27',
    ageMonths: 5,
    weightKg: 7.15,
    heightCm: 64.6,
    headCircCm: 41.7,
    armCircCm: 14.2,
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
    complaints: 'Mulai tertarik melihat makanan orang dewasa.',
    cadreNotes: 'Siapkan edukasi MPASI untuk bulan depan (tepat 6 bulan). Tetap ASI sampai 6 bulan genap.',
    examinerName: 'Kader Ibu Titik',
    createdAt: '2024-06-27T09:00:00Z',
  },
  {
    id: 'visit-006',
    childId: 'child-delisa-001',
    visitDate: '2024-07-27',
    ageMonths: 6,
    weightKg: 7.6,
    heightCm: 66.4,
    headCircCm: 42.4,
    armCircCm: 14.5,
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
    complaints: 'Mulai MPASI perdana bubur lumat hati ayam dan labu siam.',
    cadreNotes: 'Diberikan Kapsul Vitamin A Biru (100.000 IU) & PMT Biskuit Balita. Prioritaskan protein hewani.',
    examinerName: 'Bidan Siti Rahayu, Amd.Keb',
    createdAt: '2024-07-27T09:00:00Z',
  },
  {
    id: 'visit-007',
    childId: 'child-delisa-001',
    visitDate: '2024-08-27',
    ageMonths: 7,
    weightKg: 7.95,
    heightCm: 68.0,
    headCircCm: 43.0,
    armCircCm: 14.6,
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
    complaints: 'Makan lahap 2-3 kali sehari, suka bubur telur puyuh & sayur.',
    cadreNotes: 'Kenaikan BB di atas KBM 300g. Koordinasi motorik halus meraih mainan sangat aktif.',
    examinerName: 'Kader Ibu Endang',
    createdAt: '2024-08-27T09:00:00Z',
  },
  {
    id: 'visit-008',
    childId: 'child-delisa-001',
    visitDate: '2024-09-27',
    ageMonths: 8,
    weightKg: 8.3,
    heightCm: 69.8,
    headCircCm: 43.6,
    armCircCm: 14.8,
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
    complaints: 'Sudah bisa duduk tanpa ditopang dan merangkak lancar.',
    cadreNotes: 'Tekstur MPASI bisa ditingkatkan perlahan menjadi cincang halus (finger food lembut).',
    examinerName: 'Kader Ibu Titik',
    createdAt: '2024-09-27T09:00:00Z',
  },
  {
    id: 'visit-009',
    childId: 'child-delisa-001',
    visitDate: '2024-10-27',
    ageMonths: 9,
    weightKg: 8.65,
    heightCm: 71.4,
    headCircCm: 44.1,
    armCircCm: 15.0,
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
    complaints: 'Mulai belajar berdiri berpegangan. Imunisasi MR 1 & IPV 2 lancar.',
    cadreNotes: 'Tumbuh kembang Delisa sangat prima, grafik KMS terus berada di garis hijau ideal WHO.',
    examinerName: 'Bidan Siti Rahayu, Amd.Keb',
    createdAt: '2024-10-27T09:00:00Z',
  },
];

export const DEFAULT_IMMUNIZATIONS: ChildImmunization[] = [
  { id: 'imun-001', childId: 'child-delisa-001', vaccineCode: 'hb0', vaccineName: 'Hepatitis B (HB-0)', targetAgeMonths: 0, isGiven: true, givenDate: '2024-01-27', batchNo: 'HB240109', location: 'RSIA Surabaya', notes: 'Diberikan saat lahir (<24 jam)' },
  { id: 'imun-002', childId: 'child-delisa-001', vaccineCode: 'bcg', vaccineName: 'BCG (Tuberkulosis)', targetAgeMonths: 1, isGiven: true, givenDate: '2024-02-27', batchNo: 'BCG240211', location: 'Posyandu Melati', notes: 'Lengan kanan atas, scar muncul baik' },
  { id: 'imun-003', childId: 'child-delisa-001', vaccineCode: 'polio1', vaccineName: 'Polio Tetes 1 (bOPV 1)', targetAgeMonths: 1, isGiven: true, givenDate: '2024-02-27', batchNo: 'POL240188', location: 'Posyandu Melati', notes: '2 tetes oral' },
  { id: 'imun-004', childId: 'child-delisa-001', vaccineCode: 'dpt1', vaccineName: 'DPT-HB-Hib 1 (Pentabio)', targetAgeMonths: 2, isGiven: true, givenDate: '2024-03-27', batchNo: 'PENT240319', location: 'Posyandu Melati', notes: 'Paha kiri' },
  { id: 'imun-005', childId: 'child-delisa-001', vaccineCode: 'polio2', vaccineName: 'Polio Tetes 2 (bOPV 2)', targetAgeMonths: 2, isGiven: true, givenDate: '2024-03-27', batchNo: 'POL240245', location: 'Posyandu Melati', notes: '2 tetes oral' },
  { id: 'imun-006', childId: 'child-delisa-001', vaccineCode: 'pcv1', vaccineName: 'PCV 1 (Pneumokokus)', targetAgeMonths: 2, isGiven: true, givenDate: '2024-03-27', batchNo: 'PCV240290', location: 'Posyandu Melati', notes: 'Paha kanan' },
  { id: 'imun-007', childId: 'child-delisa-001', vaccineCode: 'rv1', vaccineName: 'Rotavirus 1', targetAgeMonths: 2, isGiven: true, givenDate: '2024-03-27', batchNo: 'ROTA240112', location: 'Posyandu Melati', notes: 'Pencegah diare rotavirus' },
  { id: 'imun-008', childId: 'child-delisa-001', vaccineCode: 'dpt2', vaccineName: 'DPT-HB-Hib 2', targetAgeMonths: 3, isGiven: true, givenDate: '2024-04-27', batchNo: 'PENT240402', location: 'Posyandu Melati', notes: 'Paha kiri' },
  { id: 'imun-009', childId: 'child-delisa-001', vaccineCode: 'polio3', vaccineName: 'Polio Tetes 3 (bOPV 3)', targetAgeMonths: 3, isGiven: true, givenDate: '2024-04-27', batchNo: 'POL240381', location: 'Posyandu Melati', notes: '2 tetes oral' },
  { id: 'imun-010', childId: 'child-delisa-001', vaccineCode: 'pcv2', vaccineName: 'PCV 2', targetAgeMonths: 3, isGiven: true, givenDate: '2024-04-27', batchNo: 'PCV240356', location: 'Posyandu Melati', notes: 'Paha kanan' },
  { id: 'imun-011', childId: 'child-delisa-001', vaccineCode: 'rv2', vaccineName: 'Rotavirus 2', targetAgeMonths: 3, isGiven: true, givenDate: '2024-04-27', batchNo: 'ROTA240221', location: 'Posyandu Melati', notes: 'Tetes oral' },
  { id: 'imun-012', childId: 'child-delisa-001', vaccineCode: 'dpt3', vaccineName: 'DPT-HB-Hib 3', targetAgeMonths: 4, isGiven: true, givenDate: '2024-05-27', batchNo: 'PENT240510', location: 'Posyandu Melati', notes: 'Paha kiri' },
  { id: 'imun-013', childId: 'child-delisa-001', vaccineCode: 'polio4', vaccineName: 'Polio Tetes 4 (bOPV 4)', targetAgeMonths: 4, isGiven: true, givenDate: '2024-05-27', batchNo: 'POL240499', location: 'Posyandu Melati', notes: '2 tetes oral' },
  { id: 'imun-014', childId: 'child-delisa-001', vaccineCode: 'ipv1', vaccineName: 'Polio Suntik (IPV 1)', targetAgeMonths: 4, isGiven: true, givenDate: '2024-05-27', batchNo: 'IPV240187', location: 'Posyandu Melati', notes: 'Paha kanan' },
  { id: 'imun-015', childId: 'child-delisa-001', vaccineCode: 'rv3', vaccineName: 'Rotavirus 3', targetAgeMonths: 4, isGiven: true, givenDate: '2024-05-27', batchNo: 'ROTA240301', location: 'Posyandu Melati', notes: 'Tetes oral' },
  { id: 'imun-016', childId: 'child-delisa-001', vaccineCode: 'mr1', vaccineName: 'Campak-Rubella (MR 1)', targetAgeMonths: 9, isGiven: true, givenDate: '2024-10-27', batchNo: 'MR240912', location: 'Posyandu Melati', notes: 'Lengan kiri atas' },
  { id: 'imun-017', childId: 'child-delisa-001', vaccineCode: 'ipv2', vaccineName: 'Polio Suntik (IPV 2)', targetAgeMonths: 9, isGiven: true, givenDate: '2024-10-27', batchNo: 'IPV240250', location: 'Posyandu Melati', notes: 'Paha kiri' },
  { id: 'imun-018', childId: 'child-delisa-001', vaccineCode: 'pcv3', vaccineName: 'PCV 3 (Booster)', targetAgeMonths: 12, isGiven: false, notes: 'Terjadwal pada usia 12 bulan' },
  { id: 'imun-019', childId: 'child-delisa-001', vaccineCode: 'dpt_boost', vaccineName: 'DPT-HB-Hib Lanjutan (Booster)', targetAgeMonths: 18, isGiven: false, notes: 'Terjadwal pada usia 18 bulan' },
  { id: 'imun-020', childId: 'child-delisa-001', vaccineCode: 'mr_boost', vaccineName: 'Campak-Rubella 2 (Booster)', targetAgeMonths: 18, isGiven: false, notes: 'Terjadwal pada usia 18 bulan' },
];

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
  activeChildId: 'child-delisa-001',
  isCloudConnected: false,
  isLoading: true,
  isSyncing: false,

  init: async () => {
    // 1. Coba baca dari LocalStorage terlebih dahulu agar render instan
    let localChildren = DEFAULT_CHILDREN;
    let localVisits = DEFAULT_VISITS;
    let localImmunizations = DEFAULT_IMMUNIZATIONS;
    let localActiveId = 'child-delisa-001';

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
      children: localChildren,
      visits: localVisits,
      immunizations: localImmunizations,
      activeChildId: localActiveId,
      isLoading: false,
      isCloudConnected: isSupabaseConfigured(),
    });

    // 2. Jika Supabase dikonfigurasi, coba sync data dari cloud
    if (isSupabaseConfigured()) {
      try {
        const cloudChildren = await posyanduService.getChildren();
        if (cloudChildren && cloudChildren.length > 0) {
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
    const newChild: Child = {
      ...childData,
      id: `child-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updatedChildren = [...get().children, newChild];
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
    const updated = get().children.map((c) => (c.id === child.id ? child : c));
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
