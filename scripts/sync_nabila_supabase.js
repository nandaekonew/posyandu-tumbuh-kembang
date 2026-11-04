const https = require('https');

const SUPABASE_URL = 'igaydwinzhgoocvoyrbo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_hae3-WYeuL2lYU62fVkyDg_IEcR5CWq';

const visits = [
  {
    id: 'visit-nabila-000',
    child_id: 'child-nabila-001',
    visit_date: '2024-04-26',
    age_months: 0,
    weight_kg: 3.15,
    height_cm: 48.5,
    head_circ_cm: 33.5,
    arm_circ_cm: 11.0,
    weight_gain_status: 'B',
    weight_gain_gram: 0,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: false,
    oralit_zinc: false,
    iron_supplements: false,
    immunizations_given: ['Hepatitis B0 (HB-0)'],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Kondisi bayi baru lahir sehat, menangis kuat, APGAR Score 9/10.',
    cadre_notes: 'Berikan ASI Eksklusif sesering mungkin setiap 2 jam. Jaga kehangatan bayi.',
    examiner_name: 'Bidan Desa Warugunung'
  },
  {
    id: 'visit-nabila-001',
    child_id: 'child-nabila-001',
    visit_date: '2024-05-26',
    age_months: 1,
    weight_kg: 4.10,
    height_cm: 53.0,
    head_circ_cm: 36.2,
    arm_circ_cm: 12.0,
    weight_gain_status: 'N',
    weight_gain_gram: 950,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: false,
    oralit_zinc: false,
    iron_supplements: false,
    immunizations_given: ['BCG', 'Polio 1 (Tetes)'],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Tidak ada keluhan. Bayi menyusu aktif.',
    cadre_notes: 'Kenaikan berat badan bagus (+950g, melebihi KBM 800g). Lanjutkan ASI eksklusif.',
    examiner_name: 'Kader Posyandu Warugunung'
  },
  {
    id: 'visit-nabila-002',
    child_id: 'child-nabila-001',
    visit_date: '2024-06-26',
    age_months: 2,
    weight_kg: 5.05,
    height_cm: 56.5,
    head_circ_cm: 38.0,
    arm_circ_cm: 12.7,
    weight_gain_status: 'N',
    weight_gain_gram: 950,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: false,
    oralit_zinc: false,
    iron_supplements: false,
    immunizations_given: ['DPT-HB-Hib 1', 'Polio 2', 'PCV 1', 'Rotavirus 1'],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Sempat demam ringan pasca imunisasi, membaik setelah paracetamol.',
    cadre_notes: 'Kompres bekas suntikan jika bengkak. Kenaikan BB optimal.',
    examiner_name: 'Bidan Desa Warugunung'
  },
  {
    id: 'visit-nabila-003',
    child_id: 'child-nabila-001',
    visit_date: '2024-07-26',
    age_months: 3,
    weight_kg: 5.90,
    height_cm: 59.5,
    head_circ_cm: 39.4,
    arm_circ_cm: 13.3,
    weight_gain_status: 'N',
    weight_gain_gram: 850,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: false,
    oralit_zinc: false,
    iron_supplements: false,
    immunizations_given: ['DPT-HB-Hib 2', 'Polio 3', 'PCV 2', 'Rotavirus 2'],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Bayi sudah bisa tersenyum dan mengoceh (cooing).',
    cadre_notes: 'Perkembangan motorik sangat baik, kepala mulai tegak saat tengkurap.',
    examiner_name: 'Kader Posyandu Warugunung'
  },
  {
    id: 'visit-nabila-004',
    child_id: 'child-nabila-001',
    visit_date: '2024-08-26',
    age_months: 4,
    weight_kg: 6.55,
    height_cm: 62.0,
    head_circ_cm: 40.7,
    arm_circ_cm: 13.8,
    weight_gain_status: 'N',
    weight_gain_gram: 650,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: false,
    oralit_zinc: false,
    iron_supplements: false,
    immunizations_given: ['DPT-HB-Hib 3', 'Polio 4', 'Polio Suntik (IPV 1)', 'Rotavirus 3'],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Menyusu aktif dan tidur teratur.',
    cadre_notes: 'Pertumbuhan fisik sangat selaras dengan kurva hijau KMS WHO.',
    examiner_name: 'Bidan Desa Warugunung'
  },
  {
    id: 'visit-nabila-005',
    child_id: 'child-nabila-001',
    visit_date: '2024-09-26',
    age_months: 5,
    weight_kg: 7.10,
    height_cm: 64.2,
    head_circ_cm: 41.5,
    arm_circ_cm: 14.1,
    weight_gain_status: 'N',
    weight_gain_gram: 550,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: false,
    oralit_zinc: false,
    iron_supplements: false,
    immunizations_given: [],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Mulai tertarik melihat makanan orang dewasa.',
    cadre_notes: 'Siapkan edukasi MPASI untuk bulan depan (tepat 6 bulan). Tetap ASI sampai 6 bulan genap.',
    examiner_name: 'Kader Posyandu Warugunung'
  },
  {
    id: 'visit-nabila-006',
    child_id: 'child-nabila-001',
    visit_date: '2024-10-26',
    age_months: 6,
    weight_kg: 7.55,
    height_cm: 66.0,
    head_circ_cm: 42.3,
    arm_circ_cm: 14.4,
    weight_gain_status: 'N',
    weight_gain_gram: 450,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: true,
    vitamin_a_type: 'biru',
    deworming_med: false,
    pmt_received: true,
    oralit_zinc: false,
    iron_supplements: true,
    immunizations_given: [],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Mulai MPASI perdana bubur lumat hati ayam dan labu siam.',
    cadre_notes: 'Diberikan Kapsul Vitamin A Biru (100.000 IU) & PMT Biskuit Balita. Prioritaskan protein hewani.',
    examiner_name: 'Bidan Desa Warugunung'
  },
  {
    id: 'visit-nabila-007',
    child_id: 'child-nabila-001',
    visit_date: '2024-11-26',
    age_months: 7,
    weight_kg: 7.90,
    height_cm: 67.5,
    head_circ_cm: 42.9,
    arm_circ_cm: 14.5,
    weight_gain_status: 'N',
    weight_gain_gram: 350,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: false,
    oralit_zinc: false,
    iron_supplements: true,
    immunizations_given: [],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Makan lahap 2-3 kali sehari, suka bubur telur puyuh & sayur.',
    cadre_notes: 'Kenaikan BB di atas KBM 300g. Koordinasi motorik halus meraih mainan sangat aktif.',
    examiner_name: 'Kader Posyandu Warugunung'
  },
  {
    id: 'visit-nabila-008',
    child_id: 'child-nabila-001',
    visit_date: '2024-12-26',
    age_months: 8,
    weight_kg: 8.25,
    height_cm: 69.2,
    head_circ_cm: 43.5,
    arm_circ_cm: 14.7,
    weight_gain_status: 'N',
    weight_gain_gram: 350,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: true,
    oralit_zinc: false,
    iron_supplements: false,
    immunizations_given: [],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Sudah bisa duduk tanpa ditopang dan merangkak lancar.',
    cadre_notes: 'Tekstur MPASI bisa ditingkatkan perlahan menjadi cincang halus (finger food lembut).',
    examiner_name: 'Kader Posyandu Warugunung'
  },
  {
    id: 'visit-nabila-009',
    child_id: 'child-nabila-001',
    visit_date: '2025-01-26',
    age_months: 9,
    weight_kg: 8.60,
    height_cm: 71.0,
    head_circ_cm: 44.0,
    arm_circ_cm: 14.9,
    weight_gain_status: 'N',
    weight_gain_gram: 350,
    bbu_status: 'normal',
    tbu_status: 'normal',
    bbtb_status: 'normal',
    lku_status: 'normal',
    vitamin_a: false,
    vitamin_a_type: null,
    deworming_med: false,
    pmt_received: false,
    oralit_zinc: false,
    iron_supplements: false,
    immunizations_given: ['Campak-Rubella (MR 1)', 'IPV 2'],
    kpsp_status: 'sesuai',
    kpsp_score: 10,
    complaints: 'Mulai belajar berdiri berpegangan. Imunisasi MR 1 & IPV 2 lancar.',
    cadre_notes: 'Tumbuh kembang Nabila sangat prima, grafik KMS terus berada di garis hijau ideal WHO.',
    examiner_name: 'Bidan Desa Warugunung'
  }
];

const immunizations = [
  { id: 'imun-nabila-001', child_id: 'child-nabila-001', vaccine_code: 'hb0', vaccine_name: 'Hepatitis B (HB-0)', target_age_months: 0, is_given: true, given_date: '2024-04-26', batch_no: 'HB240109', location: 'RSIA Tulungagung / Surabaya', notes: 'Diberikan dalam 24 jam setelah lahir' },
  { id: 'imun-nabila-002', child_id: 'child-nabila-001', vaccine_code: 'bcg', vaccine_name: 'BCG (Tuberkulosis)', target_age_months: 1, is_given: true, given_date: '2024-05-26', batch_no: 'BCG240211', location: 'Posyandu Warugunung', notes: 'Lengan kanan atas, timbul scar normal' },
  { id: 'imun-nabila-003', child_id: 'child-nabila-001', vaccine_code: 'polio1', vaccine_name: 'Polio Tetes 1 (bOPV 1)', target_age_months: 1, is_given: true, given_date: '2024-05-26', batch_no: 'POL240188', location: 'Posyandu Warugunung', notes: '2 tetes oral' },
  { id: 'imun-nabila-004', child_id: 'child-nabila-001', vaccine_code: 'dpt1', vaccine_name: 'DPT-HB-Hib 1 (Pentabio)', target_age_months: 2, is_given: true, given_date: '2024-06-26', batch_no: 'PENT240319', location: 'Posyandu Warugunung', notes: 'Paha kiri anterolateral' },
  { id: 'imun-nabila-005', child_id: 'child-nabila-001', vaccine_code: 'polio2', vaccine_name: 'Polio Tetes 2 (bOPV 2)', target_age_months: 2, is_given: true, given_date: '2024-06-26', batch_no: 'POL240245', location: 'Posyandu Warugunung', notes: '2 tetes oral' },
  { id: 'imun-nabila-006', child_id: 'child-nabila-001', vaccine_code: 'pcv1', vaccine_name: 'PCV 1 (Pneumokokus)', target_age_months: 2, is_given: true, given_date: '2024-06-26', batch_no: 'PCV240290', location: 'Posyandu Warugunung', notes: 'Paha kanan' },
  { id: 'imun-nabila-007', child_id: 'child-nabila-001', vaccine_code: 'rv1', vaccine_name: 'Rotavirus 1', target_age_months: 2, is_given: true, given_date: '2024-06-26', batch_no: 'ROTA240112', location: 'Posyandu Warugunung', notes: 'Tetes oral pencegah diare' },
  { id: 'imun-nabila-008', child_id: 'child-nabila-001', vaccine_code: 'dpt2', vaccine_name: 'DPT-HB-Hib 2', target_age_months: 3, is_given: true, given_date: '2024-07-26', batch_no: 'PENT240402', location: 'Posyandu Warugunung', notes: 'Paha kiri' },
  { id: 'imun-nabila-009', child_id: 'child-nabila-001', vaccine_code: 'polio3', vaccine_name: 'Polio Tetes 3 (bOPV 3)', target_age_months: 3, is_given: true, given_date: '2024-07-26', batch_no: 'POL240381', location: 'Posyandu Warugunung', notes: '2 tetes oral' },
  { id: 'imun-nabila-010', child_id: 'child-nabila-001', vaccine_code: 'pcv2', vaccine_name: 'PCV 2', target_age_months: 3, is_given: true, given_date: '2024-07-26', batch_no: 'PCV240356', location: 'Posyandu Warugunung', notes: 'Paha kanan' },
  { id: 'imun-nabila-011', child_id: 'child-nabila-001', vaccine_code: 'rv2', vaccine_name: 'Rotavirus 2', target_age_months: 3, is_given: true, given_date: '2024-07-26', batch_no: 'ROTA240221', location: 'Posyandu Warugunung', notes: 'Tetes oral' },
  { id: 'imun-nabila-012', child_id: 'child-nabila-001', vaccine_code: 'dpt3', vaccine_name: 'DPT-HB-Hib 3', target_age_months: 4, is_given: true, given_date: '2024-08-26', batch_no: 'PENT240510', location: 'Posyandu Warugunung', notes: 'Paha kiri' },
  { id: 'imun-nabila-013', child_id: 'child-nabila-001', vaccine_code: 'polio4', vaccine_name: 'Polio Tetes 4 (bOPV 4)', target_age_months: 4, is_given: true, given_date: '2024-08-26', batch_no: 'POL240499', location: 'Posyandu Warugunung', notes: '2 tetes oral' },
  { id: 'imun-nabila-014', child_id: 'child-nabila-001', vaccine_code: 'ipv1', vaccine_name: 'Polio Suntik (IPV 1)', target_age_months: 4, is_given: true, given_date: '2024-08-26', batch_no: 'IPV240187', location: 'Posyandu Warugunung', notes: 'Paha kanan' },
  { id: 'imun-nabila-015', child_id: 'child-nabila-001', vaccine_code: 'rv3', vaccine_name: 'Rotavirus 3', target_age_months: 4, is_given: true, given_date: '2024-08-26', batch_no: 'ROTA240301', location: 'Posyandu Warugunung', notes: 'Tetes oral' },
  { id: 'imun-nabila-016', child_id: 'child-nabila-001', vaccine_code: 'mr1', vaccine_name: 'Campak-Rubella (MR 1)', target_age_months: 9, is_given: true, given_date: '2025-01-26', batch_no: 'MR250112', location: 'Posyandu Warugunung', notes: 'Lengan kiri atas subkutan' },
  { id: 'imun-nabila-017', child_id: 'child-nabila-001', vaccine_code: 'ipv2', vaccine_name: 'Polio Suntik (IPV 2)', target_age_months: 9, is_given: true, given_date: '2025-01-26', batch_no: 'IPV250125', location: 'Posyandu Warugunung', notes: 'Paha kiri' },
  { id: 'imun-nabila-018', child_id: 'child-nabila-001', vaccine_code: 'pcv3', vaccine_name: 'PCV 3 (Booster)', target_age_months: 12, is_given: false, given_date: null, batch_no: null, location: 'Posyandu Warugunung', notes: 'Direncanakan usia 12 bulan' },
  { id: 'imun-nabila-019', child_id: 'child-nabila-001', vaccine_code: 'dpt_boost', vaccine_name: 'DPT-HB-Hib Lanjutan (Booster)', target_age_months: 18, is_given: false, given_date: null, batch_no: null, location: 'Posyandu Warugunung', notes: 'Direncanakan usia 18 bulan' },
  { id: 'imun-nabila-020', child_id: 'child-nabila-001', vaccine_code: 'mr_boost', vaccine_name: 'Campak-Rubella 2 (Booster)', target_age_months: 18, is_given: false, given_date: null, batch_no: null, location: 'Posyandu Warugunung', notes: 'Direncanakan usia 18 bulan' },
];

function postData(endpoint, body) {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(body);
    const options = {
      hostname: SUPABASE_URL,
      port: 443,
      path: `/rest/v1/${endpoint}`,
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(responseBody);
        } else {
          reject(new Error(`Status ${res.statusCode}: ${responseBody}`));
        }
      });
    });

    req.on('error', reject);
    req.write(dataString);
    req.end();
  });
}

async function run() {
  try {
    console.log('1. Uploading Nabila visits...');
    await postData('posyandu_visits', visits);
    console.log('✅ Visits uploaded successfully!');

    console.log('2. Uploading Nabila immunizations...');
    await postData('child_immunizations', immunizations);
    console.log('✅ Immunizations uploaded successfully!');
    
    console.log('🎉 Semua data Nabila Azzahra Widianto berhasil dipush ke Supabase!');
  } catch (err) {
    console.error('❌ Error uploading:', err.message);
  }
}

run();
