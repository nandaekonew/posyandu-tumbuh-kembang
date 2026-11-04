-- ==========================================================
-- DATA AWAL (SEED) POSYANDU TUMBUH KEMBANG ANAK
-- ==========================================================

-- 1. Input Profil Anak: Delisa Zafira Widianto
INSERT INTO children (
    id, name, nickname, nik, gender, birth_date,
    birth_weight, birth_height, birth_head_circ, blood_type,
    father_name, mother_name, posyandu_name, village, address, kia_book_no
) VALUES (
    'child-delisa-001',
    'Delisa Zafira Widianto',
    'Delisa',
    '3578016701240002',
    'P',
    '2024-01-27',
    3.20,
    49.0,
    33.5,
    'O',
    'Nanda Eko Widianto',
    'Dina Rahmawati',
    'Posyandu Melati RW 05',
    'Rungkut Menanggal',
    'Jl. Rungkut Asri Timur No. 12, Surabaya',
    'KIA-SBY-2024-0198'
) ON CONFLICT (id) DO NOTHING;

-- 2. Input 10 Kunjungan Posyandu Bulanan Delisa
-- Bulan 0: Lahir (27 Jan 2024)
INSERT INTO posyandu_visits (
    id, child_id, visit_date, age_months, weight_kg, height_cm, head_circ_cm, arm_circ_cm,
    weight_gain_status, weight_gain_gram, bbu_status, tbu_status, bbtb_status, lku_status,
    vitamin_a, deworming_med, pmt_received, oralit_zinc, iron_supplements,
    immunizations_given, kpsp_status, kpsp_score, complaints, cadre_notes, examiner_name
) VALUES 
(
    'visit-000', 'child-delisa-001', '2024-01-27', 0, 3.20, 49.0, 33.5, 11.0,
    'B', 0, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['Hepatitis B0 (HB-0)'], 'sesuai', 10,
    'Kondisi bayi baru lahir sehat, menangis kuat, APGAR Score 9/10.',
    'Berikan ASI Eksklusif sesering mungkin setiap 2 jam. Jaga kehangatan bayi.',
    'Bidan Siti Rahayu, Amd.Keb'
),
-- Bulan 1: 27 Feb 2024
(
    'visit-001', 'child-delisa-001', '2024-02-27', 1, 4.15, 53.5, 36.5, 12.0,
    'N', 950, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['BCG', 'Polio 1 (Tetes)'], 'sesuai', 10,
    'Tidak ada keluhan. Bayi menyusu aktif.',
    'Kenaikan berat badan bagus (+950g, melebihi KBM 800g). Lanjutkan ASI eksklusif.',
    'Kader Ibu Endang'
),
-- Bulan 2: 27 Mar 2024
(
    'visit-002', 'child-delisa-001', '2024-03-27', 2, 5.10, 57.0, 38.2, 12.8,
    'N', 950, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['DPT-HB-Hib 1', 'Polio 2', 'PCV 1', 'Rotavirus 1'], 'sesuai', 10,
    'Agak rewel setelah disuntik, tidak demam tinggi.',
    'Kompres bekas suntikan jika bengkak. Kenaikan BB optimal.',
    'Bidan Siti Rahayu, Amd.Keb'
),
-- Bulan 3: 27 Apr 2024
(
    'visit-003', 'child-delisa-001', '2024-04-27', 3, 5.95, 60.0, 39.6, 13.5,
    'N', 850, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['DPT-HB-Hib 2', 'Polio 3', 'PCV 2', 'Rotavirus 2'], 'sesuai', 10,
    'Bayi sudah bisa tersenyum dan mengoceh (cooing).',
    'Perkembangan motorik sangat baik, kepala mulai tegak saat tengkurap.',
    'Kader Ibu Endang'
),
-- Bulan 4: 27 Mei 2024
(
    'visit-004', 'child-delisa-001', '2024-05-27', 4, 6.60, 62.5, 40.8, 14.0,
    'N', 650, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['DPT-HB-Hib 3', 'Polio 4', 'Polio Suntik (IPV 1)', 'Rotavirus 3'], 'sesuai', 10,
    'Sempat demam ringan pasca imunisasi, membaik setelah paracetamol.',
    'Pertumbuhan fisik sangat selaras dengan kurva hijau KMS WHO.',
    'Bidan Siti Rahayu, Amd.Keb'
),
-- Bulan 5: 27 Jun 2024
(
    'visit-005', 'child-delisa-001', '2024-06-27', 5, 7.15, 64.6, 41.7, 14.2,
    'N', 550, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY[]::text[], 'sesuai', 10,
    'Mulai tertarik melihat makanan orang dewasa.',
    'Siapkan edukasi MPASI untuk bulan depan (tepat 6 bulan). Tetap ASI sampai 6 bulan genap.',
    'Kader Ibu Titik'
),
-- Bulan 6: 27 Jul 2024
(
    'visit-006', 'child-delisa-001', '2024-07-27', 6, 7.60, 66.4, 42.4, 14.5,
    'N', 450, 'normal', 'normal', 'normal', 'normal',
    true, false, true, false, true,
    ARRAY[]::text[], 'sesuai', 10,
    'Mulai MPASI perdana bubur lumat hati ayam dan labu siam.',
    'Diberikan Kapsul Vitamin A Biru (100.000 IU) & PMT Biskuit Balita. Prioritaskan protein hewani.',
    'Bidan Siti Rahayu, Amd.Keb'
),
-- Bulan 7: 27 Agu 2024
(
    'visit-007', 'child-delisa-001', '2024-08-27', 7, 7.95, 68.0, 43.0, 14.6,
    'N', 350, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, true,
    ARRAY[]::text[], 'sesuai', 10,
    'Makan lahap 2-3 kali sehari, suka bubur telur puyuh & sayur.',
    'Kenaikan BB di atas KBM 300g. Koordinasi motorik halus meraih mainan sangat aktif.',
    'Kader Ibu Endang'
),
-- Bulan 8: 27 Sep 2024
(
    'visit-008', 'child-delisa-001', '2024-09-27', 8, 8.30, 69.8, 43.6, 14.8,
    'N', 350, 'normal', 'normal', 'normal', 'normal',
    false, false, true, false, false,
    ARRAY[]::text[], 'sesuai', 10,
    'Sudah bisa duduk tanpa ditopang dan merangkak lancar.',
    'Tekstur MPASI bisa ditingkatkan perlahan menjadi cincang halus (finger food lembut).',
    'Kader Ibu Titik'
),
-- Bulan 9: 27 Okt 2024
(
    'visit-009', 'child-delisa-001', '2024-10-27', 9, 8.65, 71.4, 44.1, 15.0,
    'N', 350, 'normal', 'normal', 'normal', 'normal',
    false, false, false, false, false,
    ARRAY['Campak-Rubella (MR 1)', 'IPV 2'], 'sesuai', 10,
    'Mulai belajar berdiri berpegangan. Imunisasi MR 1 & IPV 2 lancar.',
    'Tumbuh kembang Delisa sangat prima, grafik KMS terus berada di garis hijau ideal WHO.',
    'Bidan Siti Rahayu, Amd.Keb'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Input Checklist Imunisasi Lengkap Delisa
INSERT INTO child_immunizations (
    id, child_id, vaccine_code, vaccine_name, target_age_months,
    is_given, given_date, batch_no, location, notes
) VALUES
('imun-001', 'child-delisa-001', 'hb0', 'Hepatitis B (HB-0)', 0, true, '2024-01-27', 'HB240109', 'RSIA Surabaya', 'Diberikan dalam 24 jam setelah lahir'),
('imun-002', 'child-delisa-001', 'bcg', 'BCG (Tuberkulosis)', 1, true, '2024-02-27', 'BCG240211', 'Posyandu Melati', 'Lengan kanan atas, timbul scar normal'),
('imun-003', 'child-delisa-001', 'polio1', 'Polio Tetes 1 (bOPV 1)', 1, true, '2024-02-27', 'POL240188', 'Posyandu Melati', '2 tetes oral'),
('imun-004', 'child-delisa-001', 'dpt1', 'DPT-HB-Hib 1 (Pentabio)', 2, true, '2024-03-27', 'PENT240319', 'Posyandu Melati', 'Paha kiri anterolateral'),
('imun-005', 'child-delisa-001', 'polio2', 'Polio Tetes 2 (bOPV 2)', 2, true, '2024-03-27', 'POL240245', 'Posyandu Melati', '2 tetes oral'),
('imun-006', 'child-delisa-001', 'pcv1', 'PCV 1 (Pneumokokus)', 2, true, '2024-03-27', 'PCV240290', 'Posyandu Melati', 'Paha kanan'),
('imun-007', 'child-delisa-001', 'rv1', 'Rotavirus 1', 2, true, '2024-03-27', 'ROTA240112', 'Posyandu Melati', 'Tetes oral pencegah diare'),
('imun-008', 'child-delisa-001', 'dpt2', 'DPT-HB-Hib 2', 3, true, '2024-04-27', 'PENT240402', 'Posyandu Melati', 'Paha kiri'),
('imun-009', 'child-delisa-001', 'polio3', 'Polio Tetes 3 (bOPV 3)', 3, true, '2024-04-27', 'POL240381', 'Posyandu Melati', '2 tetes oral'),
('imun-010', 'child-delisa-001', 'pcv2', 'PCV 2', 3, true, '2024-04-27', 'PCV240356', 'Posyandu Melati', 'Paha kanan'),
('imun-011', 'child-delisa-001', 'rv2', 'Rotavirus 2', 3, true, '2024-04-27', 'ROTA240221', 'Posyandu Melati', 'Tetes oral'),
('imun-012', 'child-delisa-001', 'dpt3', 'DPT-HB-Hib 3', 4, true, '2024-05-27', 'PENT240510', 'Posyandu Melati', 'Paha kiri'),
('imun-013', 'child-delisa-001', 'polio4', 'Polio Tetes 4 (bOPV 4)', 4, true, '2024-05-27', 'POL240499', 'Posyandu Melati', '2 tetes oral'),
('imun-014', 'child-delisa-001', 'ipv1', 'Polio Suntik (IPV 1)', 4, true, '2024-05-27', 'IPV240187', 'Posyandu Melati', 'Paha kanan'),
('imun-015', 'child-delisa-001', 'rv3', 'Rotavirus 3', 4, true, '2024-05-27', 'ROTA240301', 'Posyandu Melati', 'Tetes oral'),
('imun-016', 'child-delisa-001', 'mr1', 'Campak-Rubella (MR 1)', 9, true, '2024-10-27', 'MR240912', 'Posyandu Melati', 'Lengan kiri atas subkutan'),
('imun-017', 'child-delisa-001', 'ipv2', 'Polio Suntik (IPV 2)', 9, true, '2024-10-27', 'IPV240250', 'Posyandu Melati', 'Paha kiri'),
('imun-018', 'child-delisa-001', 'pcv3', 'PCV 3 (Booster)', 12, false, NULL, NULL, 'Posyandu Melati', 'Terjadwal pada usia 12 bulan (Januari 2025)'),
('imun-019', 'child-delisa-001', 'dpt_boost', 'DPT-HB-Hib Lanjutan (Booster)', 18, false, NULL, NULL, 'Posyandu Melati', 'Terjadwal pada usia 18 bulan (Juli 2025)'),
('imun-020', 'child-delisa-001', 'mr_boost', 'Campak-Rubella 2 (Booster)', 18, false, NULL, NULL, 'Posyandu Melati', 'Terjadwal pada usia 18 bulan (Juli 2025)')
ON CONFLICT (id) DO NOTHING;
