import { KPSPQuestionItem, NutritionGuide } from '@/types';

export const KPSP_QUESTIONS_DATA: KPSPQuestionItem[] = [
  // 3 Bulan
  {
    id: 'kpsp-3-1',
    ageGroup: 3,
    sector: 'motorik_kasar',
    sectorLabel: 'Motorik Kasar',
    question: 'Pada waktu bayi telentang, apakah ia dapat mengikuti gerakan Anda dengan memalingkan kepala dari satu sisi ke sisi lain?',
    tip: 'Gerakkan mainan berwarna mencolok atau wajah Anda perlahan dari sisi kiri ke kanan bayi.',
  },
  {
    id: 'kpsp-3-2',
    ageGroup: 3,
    sector: 'bicara_bahasa',
    sectorLabel: 'Bicara & Bahasa',
    question: 'Apakah bayi dapat mengeluarkan suara-suara lain (mengoceh / cooing) selain menangis?',
    tip: 'Ajak bayi berbicara dengan tatapan mata hangat dan suara lembut.',
  },
  {
    id: 'kpsp-3-3',
    ageGroup: 3,
    sector: 'sosialisasi_kemandirian',
    sectorLabel: 'Sosialisasi & Kemandirian',
    question: 'Apakah bayi tersenyum saat Anda mengajak bicara atau tersenyum kepadanya?',
    tip: 'Tersenyumlah dekat dengan wajah bayi (jarak ~30 cm).',
  },
  {
    id: 'kpsp-3-4',
    ageGroup: 3,
    sector: 'motorik_kasar',
    sectorLabel: 'Motorik Kasar',
    question: 'Pada posisi telungkup di atas alas datar, apakah bayi dapat mengangkat kepalanya setinggi 45 derajat?',
    tip: 'Lakukan tummy time setiap hari selama 3-5 menit saat bayi bugar.',
  },

  // 6 Bulan
  {
    id: 'kpsp-6-1',
    ageGroup: 6,
    sector: 'motorik_kasar',
    sectorLabel: 'Motorik Kasar',
    question: 'Apakah bayi dapat telungkup dan berguling sendiri bolak-balik dari telentang ke telungkup?',
    tip: 'Beri ruang di matras bersih dan pancing dengan mainan di sisi tubuhnya.',
  },
  {
    id: 'kpsp-6-2',
    ageGroup: 6,
    sector: 'motorik_halus',
    sectorLabel: 'Motorik Halus',
    question: 'Dapatkah bayi meraih dan memegang benda kecil seperti balok kayu atau kerincingan?',
    tip: 'Ulurkan mainan tepat di depan jangkauan kedua tangannya.',
  },
  {
    id: 'kpsp-6-3',
    ageGroup: 6,
    sector: 'bicara_bahasa',
    sectorLabel: 'Bicara & Bahasa',
    question: 'Apakah bayi berpaling ke arah sumber suara atau memanggil nama ketika Anda bersuara lembut dari samping?',
    tip: 'Panggil namanya dari arah samping atau bunyikan kerincingan lembut.',
  },
  {
    id: 'kpsp-6-4',
    ageGroup: 6,
    sector: 'sosialisasi_kemandirian',
    sectorLabel: 'Sosialisasi & Kemandirian',
    question: 'Apakah bayi menikmati bermain cilukba (peek-a-boo) dan tertawa ceria?',
    tip: 'Tutup wajah dengan kain tipis lalu buka sambil berkata "Ciluk... Ba!".',
  },

  // 9 Bulan
  {
    id: 'kpsp-9-1',
    ageGroup: 9,
    sector: 'motorik_kasar',
    sectorLabel: 'Motorik Kasar',
    question: 'Apakah bayi dapat duduk sendiri di lantai tanpa ditopang oleh bantal atau tangan Anda minimal 60 detik?',
    tip: 'Dudukkan anak di matras empuk dengan mainan ditaruh di antara kedua kakinya.',
  },
  {
    id: 'kpsp-9-2',
    ageGroup: 9,
    sector: 'motorik_halus',
    sectorLabel: 'Motorik Halus',
    question: 'Dapatkah anak memindahkan benda dari satu tangan ke tangan yang lain tanpa menjatuhkannya?',
    tip: 'Berikan sendok plastik atau biskuit balita di satu tangan lalu sodorkan mainan lain.',
  },
  {
    id: 'kpsp-9-3',
    ageGroup: 9,
    sector: 'bicara_bahasa',
    sectorLabel: 'Bicara & Bahasa',
    question: 'Apakah anak mulai mengucapkan suku kata ganda seperti "ma-ma", "da-da", "pa-pa" walaupun belum spesifik?',
    tip: 'Tirukan ocehan anak dan ulangi kata-kata sederhana dengan jelas.',
  },
  {
    id: 'kpsp-9-4',
    ageGroup: 9,
    sector: 'sosialisasi_kemandirian',
    sectorLabel: 'Sosialisasi & Kemandirian',
    question: 'Apakah anak melambaikan tangan saat diajak berkata "dadah / bye-bye"?',
    tip: 'Latih lambaian tangan saat anggota keluarga berpamitan.',
  },

  // 12 Bulan (1 Tahun)
  {
    id: 'kpsp-12-1',
    ageGroup: 12,
    sector: 'motorik_kasar',
    sectorLabel: 'Motorik Kasar',
    question: 'Apakah anak dapat berdiri tegak sendiri selama minimal 5-10 detik tanpa berpegangan?',
    tip: 'Pegang kedua tangannya lalu lepas perlahan saat keseimbangan stabil.',
  },
  {
    id: 'kpsp-12-2',
    ageGroup: 12,
    sector: 'motorik_halus',
    sectorLabel: 'Motorik Halus',
    question: 'Apakah anak dapat menjepit benda kecil (seperti kismis/biji jagung) menggunakan ujung ibu jari dan telunjuk (pincer grasp)?',
    tip: 'Sajikan finger food potongan kecil seperti wortel rebus lunak.',
  },
  {
    id: 'kpsp-12-3',
    ageGroup: 12,
    sector: 'bicara_bahasa',
    sectorLabel: 'Bicara & Bahasa',
    question: 'Apakah anak dapat menyebut minimal 1 kata bermakna (misal "mama", "papa", "mimik", "dada")?',
    tip: 'Kaitkan kata dengan objek nyata saat berinteraksi.',
  },
  {
    id: 'kpsp-12-4',
    ageGroup: 12,
    sector: 'sosialisasi_kemandirian',
    sectorLabel: 'Sosialisasi & Kemandirian',
    question: 'Apakah anak bisa menunjuk benda yang ia inginkan dan minum dari cangkir dengan bantuan?',
    tip: 'Ajarkan penggunaan cangkir kecil dengan pegangan ganda.',
  },
];

export const NUTRITION_GUIDES: NutritionGuide[] = [
  {
    ageRange: '0 - 6 Bulan',
    title: 'ASI Eksklusif (Tanpa Makanan/Minuman Lain)',
    texture: 'Cair (Air Susu Ibu saja)',
    frequency: 'Sesuai kebutuhan bayi (On Demand), minimal 8 - 12 kali sehari',
    portion: 'Menyusu sampai payudara terasa kosong dan bayi puas tertidur',
    sampleMenu: [
      'ASI langsung dari payudara ibu (Direct Breastfeeding)',
      'ASI Perah (ASIP) jika ibu bekerja dengan media cup feeder / sendok',
    ],
    tips: [
      'Jangan berikan air putih, teh, madu, madu hutan, ataupun pisang sebelum genap 6 bulan.',
      'Kolostrum (cairan ASI pertama warna kekuningan) sangat kaya antibodi alami.',
      'Ibu menyusui perlu asupan cairan 2.5 - 3 liter/hari dan konsumsi makanan kaya gizi.',
    ],
    warningNote: 'Pencegah stunting paling ampuh di 6 bulan pertama adalah ASI Eksklusif murni.',
  },
  {
    ageRange: '6 - 8 Bulan',
    title: 'MPASI Awal (Tekstur Bubur Saring / Puree Lumat)',
    texture: 'Bubur saring kental (tidak tumpah saat sendok dimiringkan)',
    frequency: '2 - 3 kali makanan utama + 1 - 2 kali makanan selingan (snack)',
    portion: '2 - 3 sendok makan dewasa bertahap naik hingga 1/2 mangkuk ukuran 250 ml',
    sampleMenu: [
      'Bubur beras putih + hati ayam kampung cincang halus + bayam + minyak kelapa (lemak tambahan)',
      'Puree telur puyuh + kentang lumat + labu kuning + santan matang',
      'Bubur daging sapi giling lumat + wortel parut + tempe lumat',
      'Selingan: Puree alpukat mentega / pisang ambon kerok halus',
    ],
    tips: [
      'Wajib utamakan Protein Hewani (Prohe) setiap kali makan: hati ayam, telur, daging sapi, ikan kembung.',
      'Tambahkan lemak tambahan: 1 sendok teh minyak kelapa / unsalted butter / santan.',
      'Jangan beri garam dan gula berlebih pada usia di bawah 1 tahun.',
    ],
    warningNote: 'Protein hewani adalah kunci utama pembentukan sel otak dan pencegahan stunting!',
  },
  {
    ageRange: '9 - 11 Bulan',
    title: 'MPASI Lanjutan (Tekstur Cincang Halus / Finger Food)',
    texture: 'Makanan dicincang halus (minced) atau cincang kasar (chopped) + finger food lembut',
    frequency: '3 - 4 kali makanan utama + 1 - 2 kali makanan selingan buah/kue sehat',
    portion: '1/2 mangkuk ukuran 250 ml (sekitar 125 ml) per porsi makan',
    sampleMenu: [
      'Nasi tim ikan kembung cincang + tahu sutra + brokoli cincang + minyak zaitun/sawit',
      'Orak-arik telur ayam + nasi lembek + wortel cincang + kaldu ayam kampung',
      'Nasi tim hati sapi + bayam merah + jagung manis pipil lumat',
      'Selingan: Potongan pepaya manis matang lembut, biskuit balita Posyandu',
    ],
    tips: [
      'Biarkan anak mulai belajar makan sendiri menggunakan sendok atau tangan (finger food).',
      'Variasikan menu setiap hari agar anak tidak bosan dan mengenal berbagai cita rasa.',
      'Tetap lanjutkan pemberian ASI hingga usia 2 tahun atau lebih.',
    ],
  },
  {
    ageRange: '12 - 23 Bulan (1 - 2 Tahun)',
    title: 'Makanan Keluarga Bergizi Seimbang',
    texture: 'Makanan keluarga normal (nasi biasa, lauk potong kecil)',
    frequency: '3 kali makanan utama + 2 kali makanan selingan padat gizi',
    portion: '3/4 mangkuk hingga 1 mangkuk penuh ukuran 250 ml',
    sampleMenu: [
      'Nasi putih + sup ikan salmon / kakap kuah bening + tempe goreng empuk + wortel',
      'Nasi + semur ayam telur + sayur bayam bening + buah pisang',
      'Nasi + perkedel daging sapi + sayur sop buncis wortel + buah semangka',
      'Selingan: Puding susu buah, telur rebus, ubi manis kukus',
    ],
    tips: [
      'Pastikan anak minum obat cacing setiap 6 bulan sekali di Posyandu (usia > 1 tahun).',
      'Dapatkan Kapsul Vitamin A Merah (200.000 IU) di Posyandu setiap Februari dan Agustus.',
      'Batasi jajanan kemasan tinggi gula, garam, dan pengawet buatan.',
    ],
  },
];
