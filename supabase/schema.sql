-- ==========================================================
-- APLIKASI PEMANTAUAN TUMBUH KEMBANG ANAK POSYANDU
-- (KMS & BUKU KIA DIGITAL)
-- PostgreSQL / Supabase Schema
-- ==========================================================

-- Hapus tabel lama jika ada
DROP TABLE IF EXISTS kpsp_screenings CASCADE;
DROP TABLE IF EXISTS child_immunizations CASCADE;
DROP TABLE IF EXISTS posyandu_visits CASCADE;
DROP TABLE IF EXISTS children CASCADE;

-- 1. TABEL DATA ANAK & KELUARGA
CREATE TABLE children (
    id TEXT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    nickname VARCHAR(50),
    nik VARCHAR(20),
    gender VARCHAR(1) NOT NULL CHECK (gender IN ('L', 'P')),
    birth_order INTEGER DEFAULT 1,                   -- Urutan anak (1 = Pertama, 2 = Kedua, dst.)
    birth_date DATE NOT NULL,
    birth_weight DECIMAL(4,2) NOT NULL DEFAULT 3.00, -- dalam kg
    birth_height DECIMAL(4,1) NOT NULL DEFAULT 50.0, -- dalam cm
    birth_head_circ DECIMAL(4,1) DEFAULT 34.0,       -- dalam cm
    blood_type VARCHAR(5) DEFAULT '-',
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    posyandu_name VARCHAR(100) DEFAULT 'Posyandu Melati',
    village VARCHAR(100),
    address TEXT,
    kia_book_no VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL HASIL KUNJUNGAN POSYANDU BULANAN
CREATE TABLE posyandu_visits (
    id TEXT PRIMARY KEY,
    child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    visit_date DATE NOT NULL,
    age_months INTEGER NOT NULL CHECK (age_months >= 0 AND age_months <= 72),
    weight_kg DECIMAL(5,2) NOT NULL,
    height_cm DECIMAL(5,1) NOT NULL,
    head_circ_cm DECIMAL(4,1),
    arm_circ_cm DECIMAL(4,1), -- LiLA (Lingkar Lengan Atas)
    weight_gain_status VARCHAR(5) DEFAULT 'N', -- 'N' (Naik), 'T' (Tidak Naik), 'B' (Baru)
    weight_gain_gram INTEGER DEFAULT 0,
    bbu_status VARCHAR(30) DEFAULT 'normal', -- severely_underweight, underweight, normal, risk_overweight
    tbu_status VARCHAR(30) DEFAULT 'normal', -- severely_stunted, stunted, normal, tall
    bbtb_status VARCHAR(30) DEFAULT 'normal', -- severely_wasted, wasted, normal, risk_overweight, overweight, obese
    lku_status VARCHAR(30) DEFAULT 'normal', -- microcephaly, normal, macrocephaly
    vitamin_a BOOLEAN DEFAULT FALSE,
    vitamin_a_type VARCHAR(10), -- 'biru' (100k IU 6-11 bln) atau 'merah' (200k IU 12-59 bln)
    deworming_med BOOLEAN DEFAULT FALSE, -- Obat Cacing
    pmt_received BOOLEAN DEFAULT FALSE, -- Pemberian Makanan Tambahan
    oralit_zinc BOOLEAN DEFAULT FALSE, -- Oralit / Zinc
    iron_supplements BOOLEAN DEFAULT FALSE, -- Tetes Zat Besi
    immunizations_given TEXT[] DEFAULT '{}', -- Daftar imunisasi yang disuntikkan saat kunjungan
    kpsp_status VARCHAR(20) DEFAULT 'sesuai', -- sesuai, meragukan, penyimpangan
    kpsp_score INTEGER,
    complaints TEXT, -- Keluhan orang tua (batuk, pilek, nafsu makan, dll)
    cadre_notes TEXT, -- Saran & anjuran kader / bidan
    examiner_name VARCHAR(100) DEFAULT 'Bidan Desa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL ROADMAP IMUNISASI ANAK
CREATE TABLE child_immunizations (
    id TEXT PRIMARY KEY,
    child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    vaccine_code VARCHAR(30) NOT NULL,
    vaccine_name VARCHAR(100) NOT NULL,
    target_age_months INTEGER NOT NULL,
    is_given BOOLEAN DEFAULT FALSE,
    given_date DATE,
    batch_no VARCHAR(50),
    location VARCHAR(100) DEFAULT 'Posyandu',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL SKRINING PERKEMBANGAN KPSP
CREATE TABLE kpsp_screenings (
    id TEXT PRIMARY KEY,
    child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    age_group_months INTEGER NOT NULL,
    screening_date DATE NOT NULL,
    yes_count INTEGER NOT NULL DEFAULT 10,
    no_count INTEGER NOT NULL DEFAULT 0,
    result_status VARCHAR(20) NOT NULL CHECK (result_status IN ('sesuai', 'meragukan', 'penyimpangan')),
    answers JSONB DEFAULT '{}'::jsonb,
    examiner VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEKS PERFORMA QUERY
CREATE INDEX idx_posyandu_child_id ON posyandu_visits(child_id);
CREATE INDEX idx_posyandu_visit_date ON posyandu_visits(visit_date);
CREATE INDEX idx_immunizations_child_id ON child_immunizations(child_id);
CREATE INDEX idx_kpsp_child_id ON kpsp_screenings(child_id);

-- AKTIFKAN ROW LEVEL SECURITY (RLS)
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE posyandu_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_immunizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpsp_screenings ENABLE ROW LEVEL SECURITY;

-- POLICY PUBLIC PERMISSIVE (Untuk kemudahan akses dashboard & input)
CREATE POLICY "Public full access children" ON children FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access visits" ON posyandu_visits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access immunizations" ON child_immunizations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access kpsp" ON kpsp_screenings FOR ALL USING (true) WITH CHECK (true);

-- PUBLIKASIKAN KE REALTIME SUPABASE
ALTER PUBLICATION supabase_realtime ADD TABLE children;
ALTER PUBLICATION supabase_realtime ADD TABLE posyandu_visits;
ALTER PUBLICATION supabase_realtime ADD TABLE child_immunizations;
ALTER PUBLICATION supabase_realtime ADD TABLE kpsp_screenings;
