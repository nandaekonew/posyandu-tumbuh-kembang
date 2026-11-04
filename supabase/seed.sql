-- ==========================================================
-- DATA AWAL (SEED) POSYANDU TUMBUH KEMBANG ANAK
-- ==========================================================

-- 1. Input Profil Balita 1: Nabila Azzahra Widianto (Anak Pertama) & Balita 2: Delisa Zafira Widianto (Anak Kedua)
INSERT INTO children (
    id, name, nickname, nik, gender, birth_order, birth_date,
    birth_weight, birth_height, birth_head_circ, blood_type,
    father_name, mother_name, posyandu_name, village, address, kia_book_no
) VALUES (
    'child-nabila-001',
    'Nabila Azzahra Widianto',
    'Nabila',
    '3578016604240004',
    'P',
    1, -- Anak Pertama
    '2024-04-26',
    3.15,
    48.5,
    33.5,
    'O',
    'Nanda Eko Widianto',
    'Devi Asmarani',
    'Posyandu Warugunung RW 02',
    'Warugunung, Karang Pilang',
    'Warugunung RT 002 / RW 002, Karang Pilang, Kota Surabaya',
    'KIA-SBY-2024-0426'
),
-- Balita 2: Delisa Zafira Widianto
(
    'child-delisa-002',
    'Delisa Zafira Widianto',
    'Delisa',
    '3578014801260004',
    'P',
    2, -- Anak Kedua
    '2026-01-08',
    3.20,
    49.0,
    33.5,
    'O',
    'Nanda Eko Widianto',
    'Devi Asmarani',
    'Posyandu Warugunung RW 02',
    'Warugunung, Karang Pilang',
    'Warugunung RT 002 / RW 002, Karang Pilang, Kota Surabaya',
    'KIA-SBY-2026-0108'
) ON CONFLICT (id) DO NOTHING;

-- 2. Input 10 Kunjungan Posyandu Bulanan Nabila Azzahra Widianto
INSERT INTO posyandu_visits (
    id, child_id, visit_date, age_months, weight_kg, height_cm, head_circ_cm, arm_circ_cm,
    weight_gain_status, weight_gain_gram, bbu_status, tbu_status, bbtb_status, lku_status,
    vitamin_a, deworming_med, pmt_received, oralit_zinc, iron_supplements,
    immunizations_given, kpsp_status, kpsp_score, complaints, cadre_notes, examiner_name
) VALUES 
(
    'visit-nabila-000', 'child-nabila-001', '2024-04-26', 0, 3.15, 48.5, 33.5, 11.0,
    'B', 0, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['Hepatitis B0 (HB-0)'], 'sesuai', 10,
    'Kondisi bayi baru lahir sehat, menangis kuat, APGAR Score 9/10.',
    'Berikan ASI Eksklusif sesering mungkin setiap 2 jam. Jaga kehangatan bayi.',
    'Bidan Desa Warugunung'
),
(
    'visit-nabila-001', 'child-nabila-001', '2024-05-26', 1, 4.10, 53.0, 36.2, 12.0,
    'N', 950, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['BCG', 'Polio 1 (Tetes)'], 'sesuai', 10,
    'Tidak ada keluhan. Bayi menyusu aktif.',
    'Kenaikan berat badan bagus (+950g, melebihi KBM 800g). Lanjutkan ASI eksklusif.',
    'Kader Posyandu Warugunung'
),
(
    'visit-nabila-002', 'child-nabila-001', '2024-06-26', 2, 5.05, 56.5, 38.0, 12.7,
    'N', 950, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['DPT-HB-Hib 1', 'Polio 2', 'PCV 1', 'Rotavirus 1'], 'sesuai', 10,
    'Sempat demam ringan pasca imunisasi, membaik setelah paracetamol.',
    'Kompres bekas suntikan jika bengkak. Kenaikan BB optimal.',
    'Bidan Desa Warugunung'
),
(
    'visit-nabila-003', 'child-nabila-001', '2024-07-26', 3, 5.90, 59.5, 39.4, 13.3,
    'N', 850, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['DPT-HB-Hib 2', 'Polio 3', 'PCV 2', 'Rotavirus 2'], 'sesuai', 10,
    'Bayi sudah bisa tersenyum dan mengoceh (cooing).',
    'Perkembangan motorik sangat baik, kepala mulai tegak saat tengkurap.',
    'Kader Posyandu Warugunung'
),
(
    'visit-nabila-004', 'child-nabila-001', '2024-08-26', 4, 6.55, 62.0, 40.7, 13.8,
    'N', 650, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['DPT-HB-Hib 3', 'Polio 4', 'Polio Suntik (IPV 1)', 'Rotavirus 3'], 'sesuai', 10,
    'Menyusu aktif dan tidur teratur.',
    'Pertumbuhan fisik sangat selaras dengan kurva hijau KMS WHO.',
    'Bidan Desa Warugunung'
),
(
    'visit-nabila-005', 'child-nabila-001', '2024-09-26', 5, 7.10, 64.2, 41.5, 14.1,
    'N', 550, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY[]::text[], 'sesuai', 10,
    'Mulai tertarik melihat makanan orang dewasa.',
    'Siapkan edukasi MPASI untuk bulan depan (tepat 6 bulan). Tetap ASI sampai 6 bulan genap.',
    'Kader Posyandu Warugunung'
),
(
    'visit-nabila-006', 'child-nabila-001', '2024-10-26', 6, 7.55, 66.0, 42.3, 14.4,
    'N', 450, 'normal', 'normal', 'normal', 'normal',
    true, false, true, false, true,
    ARRAY[]::text[], 'sesuai', 10,
    'Mulai MPASI perdana bubur lumat hati ayam dan labu siam.',
    'Diberikan Kapsul Vitamin A Biru (100.000 IU) & PMT Biskuit Balita. Prioritaskan protein hewani.',
    'Bidan Desa Warugunung'
),
(
    'visit-nabila-007', 'child-nabila-001', '2024-11-26', 7, 7.90, 67.5, 42.9, 14.5,
    'N', 350, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, true,
    ARRAY[]::text[], 'sesuai', 10,
    'Makan lahap 2-3 kali sehari, suka bubur telur puyuh & sayur.',
    'Kenaikan BB di atas KBM 300g. Koordinasi motorik halus meraih mainan sangat aktif.',
    'Kader Posyandu Warugunung'
),
(
    'visit-nabila-008', 'child-nabila-001', '2024-12-26', 8, 8.25, 69.2, 43.5, 14.7,
    'N', 350, 'normal', 'normal', 'normal', 'normal',
    false, false, true, false, false,
    ARRAY[]::text[], 'sesuai', 10,
    'Sudah bisa duduk tanpa ditopang dan merangkak lancar.',
    'Tekstur MPASI bisa ditingkatkan perlahan menjadi cincang halus (finger food lembut).',
    'Kader Posyandu Warugunung'
),
(
    'visit-nabila-009', 'child-nabila-001', '2025-01-26', 9, 8.60, 71.0, 44.0, 14.9,
    'N', 350, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['Campak-Rubella (MR 1)', 'IPV 2'], 'sesuai', 10,
    'Mulai belajar berdiri berpegangan. Imunisasi MR 1 & IPV 2 lancar.',
    'Tumbuh kembang Nabila sangat prima, grafik KMS terus berada di garis hijau ideal WHO.',
    'Bidan Desa Warugunung'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Input Checklist Imunisasi Lengkap Nabila
INSERT INTO child_immunizations (
    id, child_id, vaccine_code, vaccine_name, target_age_months,
    is_given, given_date, batch_no, location, notes
) VALUES
('imun-nabila-001', 'child-nabila-001', 'hb0', 'Hepatitis B (HB-0)', 0, true, '2024-04-26', 'HB240109', 'RSIA Tulungagung / Surabaya', 'Diberikan dalam 24 jam setelah lahir'),
('imun-nabila-002', 'child-nabila-001', 'bcg', 'BCG (Tuberkulosis)', 1, true, '2024-05-26', 'BCG240211', 'Posyandu Warugunung', 'Lengan kanan atas, timbul scar normal'),
('imun-nabila-003', 'child-nabila-001', 'polio1', 'Polio Tetes 1 (bOPV 1)', 1, true, '2024-05-26', 'POL240188', 'Posyandu Warugunung', '2 tetes oral'),
('imun-nabila-004', 'child-nabila-001', 'dpt1', 'DPT-HB-Hib 1 (Pentabio)', 2, true, '2024-06-26', 'PENT240319', 'Posyandu Warugunung', 'Paha kiri anterolateral'),
('imun-nabila-005', 'child-nabila-001', 'polio2', 'Polio Tetes 2 (bOPV 2)', 2, true, '2024-06-26', 'POL240245', 'Posyandu Warugunung', '2 tetes oral'),
('imun-nabila-006', 'child-nabila-001', 'pcv1', 'PCV 1 (Pneumokokus)', 2, true, '2024-06-26', 'PCV240290', 'Posyandu Warugunung', 'Paha kanan'),
('imun-nabila-007', 'child-nabila-001', 'rv1', 'Rotavirus 1', 2, true, '2024-06-26', 'ROTA240112', 'Posyandu Warugunung', 'Tetes oral pencegah diare'),
('imun-nabila-008', 'child-nabila-001', 'dpt2', 'DPT-HB-Hib 2', 3, true, '2024-07-26', 'PENT240402', 'Posyandu Warugunung', 'Paha kiri'),
('imun-nabila-009', 'child-nabila-001', 'polio3', 'Polio Tetes 3 (bOPV 3)', 3, true, '2024-07-26', 'POL240381', 'Posyandu Warugunung', '2 tetes oral'),
('imun-nabila-010', 'child-nabila-001', 'pcv2', 'PCV 2', 3, true, '2024-07-26', 'PCV240356', 'Posyandu Warugunung', 'Paha kanan'),
('imun-nabila-011', 'child-nabila-001', 'rv2', 'Rotavirus 2', 3, true, '2024-07-26', 'ROTA240221', 'Posyandu Warugunung', 'Tetes oral'),
('imun-nabila-012', 'child-nabila-001', 'dpt3', 'DPT-HB-Hib 3', 4, true, '2024-08-26', 'PENT240510', 'Posyandu Warugunung', 'Paha kiri'),
('imun-nabila-013', 'child-nabila-001', 'polio4', 'Polio Tetes 4 (bOPV 4)', 4, true, '2024-08-26', 'POL240499', 'Posyandu Warugunung', '2 tetes oral'),
('imun-nabila-014', 'child-nabila-001', 'ipv1', 'Polio Suntik (IPV 1)', 4, true, '2024-08-26', 'IPV240187', 'Posyandu Warugunung', 'Paha kanan'),
('imun-nabila-015', 'child-nabila-001', 'rv3', 'Rotavirus 3', 4, true, '2024-08-26', 'ROTA240301', 'Posyandu Warugunung', 'Tetes oral'),
('imun-nabila-016', 'child-nabila-001', 'mr1', 'Campak-Rubella (MR 1)', 9, true, '2025-01-26', 'MR250112', 'Posyandu Warugunung', 'Lengan kiri atas subkutan'),
('imun-nabila-017', 'child-nabila-001', 'ipv2', 'Polio Suntik (IPV 2)', 9, true, '2025-01-26', 'IPV250125', 'Posyandu Warugunung', 'Paha kiri'),
('imun-nabila-018', 'child-nabila-001', 'pcv3', 'PCV 3 (Booster)', 12, true, '2025-04-26', 'PCV250410', 'Posyandu Warugunung', 'Usia 12 bulan'),
('imun-nabila-019', 'child-nabila-001', 'dpt_boost', 'DPT-HB-Hib Lanjutan (Booster)', 18, true, '2025-10-26', 'PENT251008', 'Posyandu Warugunung', 'Usia 18 bulan'),
('imun-nabila-020', 'child-nabila-001', 'mr_boost', 'Campak-Rubella 2 (Booster)', 18, true, '2025-10-26', 'MR251020', 'Posyandu Warugunung', 'Usia 18 bulan')
ON CONFLICT (id) DO NOTHING;
