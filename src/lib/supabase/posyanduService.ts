import { createClient, isSupabaseConfigured } from './client';
import { Child, PosyanduVisit, ChildImmunization } from '@/types';

export const posyanduService = {
  // 1. DATA ANAK
  async getChildren(): Promise<Child[] | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.warn('Supabase getChildren error:', error.message);
        return null;
      }

      return (data || []).map((row) => ({
        id: row.id,
        name: row.name,
        nickname: row.nickname || row.name,
        nik: row.nik || '',
        gender: row.gender,
        birthDate: row.birth_date,
        birthWeight: Number(row.birth_weight),
        birthHeight: Number(row.birth_height),
        birthHeadCirc: Number(row.birth_head_circ || 34),
        bloodType: row.blood_type,
        fatherName: row.father_name || '',
        motherName: row.mother_name || '',
        posyanduName: row.posyandu_name || 'Posyandu Melati',
        village: row.village || '',
        address: row.address || '',
        kiaBookNo: row.kia_book_no || '',
        avatarUrl: row.avatar_url || '',
        createdAt: row.created_at || new Date().toISOString(),
      }));
    } catch (err) {
      console.warn('Failed to fetch children from Supabase:', err);
      return null;
    }
  },

  async saveChild(child: Child): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('children').upsert({
        id: child.id,
        name: child.name,
        nickname: child.nickname,
        nik: child.nik,
        gender: child.gender,
        birth_date: child.birthDate,
        birth_weight: child.birthWeight,
        birth_height: child.birthHeight,
        birth_head_circ: child.birthHeadCirc,
        blood_type: child.bloodType,
        father_name: child.fatherName,
        mother_name: child.motherName,
        posyandu_name: child.posyanduName,
        village: child.village,
        address: child.address,
        kia_book_no: child.kiaBookNo,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Error saving child to Supabase:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Exception saving child:', err);
      return false;
    }
  },

  async deleteChild(childId: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('children').delete().eq('id', childId);
      if (error) {
        console.error('Error deleting child:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Exception deleting child:', err);
      return false;
    }
  },

  // 2. HASIL KUNJUNGAN POSYANDU BULANAN
  async getVisits(childId: string): Promise<PosyanduVisit[] | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('posyandu_visits')
        .select('*')
        .eq('child_id', childId)
        .order('age_months', { ascending: true });

      if (error) {
        console.warn('Supabase getVisits error:', error.message);
        return null;
      }

      return (data || []).map((row) => ({
        id: row.id,
        childId: row.child_id,
        visitDate: row.visit_date,
        ageMonths: Number(row.age_months),
        weightKg: Number(row.weight_kg),
        heightCm: Number(row.height_cm),
        headCircCm: row.head_circ_cm ? Number(row.head_circ_cm) : undefined,
        armCircCm: row.arm_circ_cm ? Number(row.arm_circ_cm) : undefined,
        weightGainStatus: row.weight_gain_status || 'N',
        weightGainGram: Number(row.weight_gain_gram || 0),
        bbuStatus: row.bbu_status || 'normal',
        tbuStatus: row.tbu_status || 'normal',
        bbtbStatus: row.bbtb_status || 'normal',
        lkuStatus: row.lku_status || 'normal',
        vitaminA: Boolean(row.vitamin_a),
        vitaminAType: row.vitamin_a_type,
        dewormingMed: Boolean(row.deworming_med),
        pmtReceived: Boolean(row.pmt_received),
        oralitZinc: Boolean(row.oralit_zinc),
        ironSupplements: Boolean(row.iron_supplements),
        immunizationsGiven: row.immunizations_given || [],
        kpspStatus: row.kpsp_status || 'sesuai',
        kpspScore: row.kpsp_score,
        complaints: row.complaints,
        cadreNotes: row.cadre_notes,
        examinerName: row.examiner_name,
        createdAt: row.created_at || new Date().toISOString(),
      }));
    } catch (err) {
      console.warn('Failed to fetch visits from Supabase:', err);
      return null;
    }
  },

  async saveVisit(visit: PosyanduVisit): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('posyandu_visits').upsert({
        id: visit.id,
        child_id: visit.childId,
        visit_date: visit.visitDate,
        age_months: visit.ageMonths,
        weight_kg: visit.weightKg,
        height_cm: visit.heightCm,
        head_circ_cm: visit.headCircCm,
        arm_circ_cm: visit.armCircCm,
        weight_gain_status: visit.weightGainStatus,
        weight_gain_gram: visit.weightGainGram,
        bbu_status: visit.bbuStatus,
        tbu_status: visit.tbuStatus,
        bbtb_status: visit.bbtbStatus,
        lku_status: visit.lkuStatus,
        vitamin_a: visit.vitaminA,
        vitamin_a_type: visit.vitaminAType,
        deworming_med: visit.dewormingMed,
        pmt_received: visit.pmtReceived,
        oralit_zinc: visit.oralitZinc,
        iron_supplements: visit.ironSupplements,
        immunizations_given: visit.immunizationsGiven,
        kpsp_status: visit.kpspStatus,
        kpsp_score: visit.kpspScore,
        complaints: visit.complaints,
        cadre_notes: visit.cadreNotes,
        examiner_name: visit.examinerName,
      });

      if (error) {
        console.error('Error saving visit to Supabase:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Exception saving visit:', err);
      return false;
    }
  },

  async deleteVisit(visitId: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('posyandu_visits').delete().eq('id', visitId);
      if (error) {
        console.error('Error deleting visit from Supabase:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Exception deleting visit:', err);
      return false;
    }
  },

  // 3. IMUNISASI
  async getImmunizations(childId: string): Promise<ChildImmunization[] | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('child_immunizations')
        .select('*')
        .eq('child_id', childId)
        .order('target_age_months', { ascending: true });

      if (error) {
        console.warn('Supabase getImmunizations error:', error.message);
        return null;
      }

      return (data || []).map((row) => ({
        id: row.id,
        childId: row.child_id,
        vaccineCode: row.vaccine_code,
        vaccineName: row.vaccine_name,
        targetAgeMonths: Number(row.target_age_months),
        isGiven: Boolean(row.is_given),
        givenDate: row.given_date,
        batchNo: row.batch_no,
        location: row.location,
        notes: row.notes,
      }));
    } catch (err) {
      console.warn('Failed to fetch immunizations from Supabase:', err);
      return null;
    }
  },

  async saveImmunization(immunization: ChildImmunization): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('child_immunizations').upsert({
        id: immunization.id,
        child_id: immunization.childId,
        vaccine_code: immunization.vaccineCode,
        vaccine_name: immunization.vaccineName,
        target_age_months: immunization.targetAgeMonths,
        is_given: immunization.isGiven,
        given_date: immunization.givenDate,
        batch_no: immunization.batchNo,
        location: immunization.location,
        notes: immunization.notes,
      });

      if (error) {
        console.error('Error saving immunization:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Exception saving immunization:', err);
      return false;
    }
  },
};
