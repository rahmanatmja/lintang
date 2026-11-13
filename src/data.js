// ───────────────────────── Lintang · data ─────────────────────────
// Semua teks ringkas, untuk refleksi & hiburan.

const HARI = [
  // index mengikuti Date.getUTCDay(): 0 = Minggu
  { nama: 'Minggu', neptu: 5, watak: 'Hangat dan ingin dihargai. Mudah jadi pusat perhatian, tapi juga cepat murah hati pada orang dekat.' },
  { nama: 'Senin',  neptu: 4, watak: 'Lembut dan perasa. Pandai membaca suasana, kadang terlalu memikirkan pendapat orang lain.' },
  { nama: 'Selasa', neptu: 3, watak: 'Berani dan terus terang. Tahan banting, tapi perlu belajar meredam nada bicara.' },
  { nama: 'Rabu',   neptu: 7, watak: 'Luwes dan pandai bergaul. Pikirannya cepat, mudah beradaptasi dengan siapa saja.' },
  { nama: 'Kamis',  neptu: 8, watak: 'Berwibawa dan suka memberi nasihat. Punya pegangan hidup yang kuat.' },
  { nama: 'Jumat',  neptu: 6, watak: 'Tenang, sabar, dan tulus. Tidak suka ribut, lebih memilih jalan damai.' },
  { nama: 'Sabtu',  neptu: 9, watak: 'Teguh dan pekerja keras. Menyimpan banyak hal di dalam, tapi bisa diandalkan.' }
];

const PASARAN = [
  { nama: 'Legi',   neptu: 5, arah: 'Timur',   warna: 'Putih',      unsur: 'Udara', watak: 'Murah hati dan ringan tangan. Senang membantu, mudah dipercaya orang.' },
  { nama: 'Pahing', neptu: 9, arah: 'Selatan', warna: 'Merah',      unsur: 'Api',   watak: 'Tekun dan berkemauan keras. Kalau sudah ingin sesuatu, dikejar sampai dapat.' },
  { nama: 'Pon',    neptu: 7, arah: 'Barat',   warna: 'Kuning',     unsur: 'Air',   watak: 'Tutur katanya meyakinkan. Suka tampil rapi dan menjaga nama baik.' },
  { nama: 'Wage',   neptu: 4, arah: 'Utara',   warna: 'Hitam',      unsur: 'Tanah', watak: 'Setia dan teguh pendirian. Kadang keras kepala, tapi tidak mudah goyah.' },
  { nama: 'Kliwon', neptu: 8, arah: 'Tengah',  warna: 'Manca warna', unsur: 'Eter', watak: 'Peka dan intuitif. Pandai bicara, punya “rasa” yang tajam terhadap keadaan.' }
];

// Laku (watak) berdasarkan jumlah neptu 7–18
const LAKU = {
  7:  { nama: 'Lebu Katiup Angin', arti: 'Debu tertiup angin', teks: 'Cita-citanya banyak dan berpindah-pindah. Perlu satu jangkar supaya langkahnya tidak tercerai.' },
  8:  { nama: 'Lakune Geni',       arti: 'Laku api',           teks: 'Bersemangat dan cepat bereaksi. Hangat bagi yang dekat, tapi jaga agar tidak membakar.' },
  9:  { nama: 'Lakune Angin',      arti: 'Laku angin',         teks: 'Bebas dan mudah menyesuaikan diri. Kehadirannya terasa walau sering tak terlihat.' },
  10: { nama: 'Pandito Mbangun Teki', arti: 'Pendeta yang bertapa', teks: 'Suka merenung dan mencari makna. Nasihatnya sering dicari orang.' },
  11: { nama: 'Aras Tuding',       arti: 'Yang ditunjuk',      teks: 'Sering dipilih untuk memimpin atau dimintai tolong. Punya daya tarik alami.' },
  12: { nama: 'Aras Kembang',      arti: 'Bunga',              teks: 'Menyenangkan dan disukai banyak orang. Pandai membuat suasana jadi indah.' },
  13: { nama: 'Lakune Lintang',    arti: 'Laku bintang',       teks: 'Bersinar dengan caranya sendiri. Tenang, misterius, dan jadi penunjuk arah bagi orang lain.' },
  14: { nama: 'Lakune Rembulan',   arti: 'Laku bulan',         teks: 'Meneduhkan dan penuh perhatian. Memberi terang di saat orang lain gelap.' },
  15: { nama: 'Lakune Srengenge',  arti: 'Laku matahari',      teks: 'Berwawasan luas dan memberi energi. Cocok jadi pusat dan penggerak.' },
  16: { nama: 'Lakune Banyu',      arti: 'Laku air',           teks: 'Sabar dan mengalir. Tenang di permukaan, dalam di dasarnya.' },
  17: { nama: 'Lakune Bumi',       arti: 'Laku bumi',          teks: 'Penyabar dan mengayomi. Jadi tempat bersandar bagi banyak orang.' },
  18: { nama: 'Lakune Paripurna',  arti: 'Laku paripurna',     teks: 'Berwibawa dan berpendirian. Bicaranya didengar, langkahnya dipertimbangkan.' }
};

// Petung jodoh: total neptu berdua, sisa bagi 8
const JODOH = {
  1: { nama: 'Pegat',   nada: 'waspada', teks: 'Rawan berselisih soal hal kecil. Butuh komitmen dan komunikasi yang jujur sejak awal.' },
  2: { nama: 'Ratu',    nada: 'baik',    teks: 'Pasangan yang dihormati lingkungan. Serasi dan sering jadi panutan.' },
  3: { nama: 'Jodoh',   nada: 'baik',    teks: 'Saling menerima kelebihan dan kekurangan. Rukun sampai tua.' },
  4: { nama: 'Topo',    nada: 'netral',  teks: 'Awalnya penuh ujian, tapi berbuah manis bila dijalani dengan sabar.' },
  5: { nama: 'Tinari',  nada: 'baik',    teks: 'Rezeki mudah datang dan hidup terasa lapang. Sering dinaungi keberuntungan.' },
  6: { nama: 'Padu',    nada: 'netral',  teks: 'Sering beradu pendapat, tapi tidak sampai berpisah. Ributnya justru mendekatkan.' },
  7: { nama: 'Sujanan', nada: 'waspada', teks: 'Rawan cemburu dan curiga. Kepercayaan adalah kunci yang harus dijaga.' },
  0: { nama: 'Pesthi',  nada: 'baik',    teks: 'Tenteram, damai, dan langgeng. Masalah datang tapi tak sampai mengguncang.' }
};

// ───────────────────────── Zodiak ─────────────────────────
const ZODIAK = [
  { nama: 'Aries',       glyph: '♈', mulai: [3, 21],  unsur: 'Api',   sifat: 'Kardinal', planet: 'Mars',    kunci: 'Pemberani, spontan, pelopor',          bayang: 'Tidak sabar, mudah tersulut' },
  { nama: 'Taurus',      glyph: '♉', mulai: [4, 20],  unsur: 'Tanah', sifat: 'Tetap',    planet: 'Venus',   kunci: 'Setia, tenang, menikmati hidup',       bayang: 'Keras kepala, sulit berubah' },
  { nama: 'Gemini',      glyph: '♊', mulai: [5, 21],  unsur: 'Udara', sifat: 'Mutabel',  planet: 'Merkurius', kunci: 'Cerdas, komunikatif, serba ingin tahu', bayang: 'Mudah bosan, plin-plan' },
  { nama: 'Cancer',      glyph: '♋', mulai: [6, 21],  unsur: 'Air',   sifat: 'Kardinal', planet: 'Bulan',   kunci: 'Pengasuh, peka, protektif',            bayang: 'Moody, sulit melepas' },
  { nama: 'Leo',         glyph: '♌', mulai: [7, 23],  unsur: 'Api',   sifat: 'Tetap',    planet: 'Matahari', kunci: 'Hangat, murah hati, ekspresif',       bayang: 'Haus pengakuan, gengsi' },
  { nama: 'Virgo',       glyph: '♍', mulai: [8, 23],  unsur: 'Tanah', sifat: 'Mutabel',  planet: 'Merkurius', kunci: 'Teliti, rapi, suka menolong',       bayang: 'Perfeksionis, terlalu kritis' },
  { nama: 'Libra',       glyph: '♎', mulai: [9, 23],  unsur: 'Udara', sifat: 'Kardinal', planet: 'Venus',   kunci: 'Adil, diplomatis, cinta keindahan',    bayang: 'Peragu, menghindari konflik' },
  { nama: 'Scorpio',     glyph: '♏', mulai: [10, 23], unsur: 'Air',   sifat: 'Tetap',    planet: 'Pluto',   kunci: 'Intens, setia, tajam membaca orang',   bayang: 'Tertutup, pendendam' },
  { nama: 'Sagitarius',  glyph: '♐', mulai: [11, 22], unsur: 'Api',   sifat: 'Mutabel',  planet: 'Jupiter', kunci: 'Optimis, bebas, haus pengalaman',      bayang: 'Ceroboh, sulit berkomitmen' },
  { nama: 'Kaprikornus', glyph: '♑', mulai: [12, 22], unsur: 'Tanah', sifat: 'Kardinal', planet: 'Saturnus', kunci: 'Ambisius, disiplin, bertanggung jawab', bayang: 'Kaku, terlalu serius' },
  { nama: 'Akuarius',    glyph: '♒', mulai: [1, 20],  unsur: 'Udara', sifat: 'Tetap',    planet: 'Uranus',  kunci: 'Orisinal, visioner, peduli sesama',    bayang: 'Berjarak, keras pada ide sendiri' },
  { nama: 'Pisces',      glyph: '♓', mulai: [2, 19],  unsur: 'Air',   sifat: 'Mutabel',  planet: 'Neptunus', kunci: 'Imajinatif, empatik, spiritual',     bayang: 'Mudah larut, kabur dari kenyataan' }
];

const FASE_BULAN = [
  { nama: 'Bulan Baru',    saran: 'Waktu menanam niat. Tulis apa yang ingin kamu mulai.' },
  { nama: 'Sabit Awal',    saran: 'Niat mulai bertunas. Ambil langkah kecil pertama.' },
  { nama: 'Paruh Awal',    saran: 'Hambatan pertama muncul. Putuskan, lalu bergerak.' },
  { nama: 'Cembung Awal',  saran: 'Perhalus dan sesuaikan. Hampir sampai.' },
  { nama: 'Purnama',       saran: 'Puncak terang. Lihat apa yang sudah tumbuh, rayakan.' },
  { nama: 'Cembung Akhir', saran: 'Bagikan hasil dan rasa syukur.' },
  { nama: 'Paruh Akhir',   saran: 'Lepaskan yang tidak lagi perlu dibawa.' },
  { nama: 'Sabit Akhir',   saran: 'Istirahat dan merenung sebelum siklus baru.' }
];

// ───────────────────────── Tarot ─────────────────────────
const MAYOR = [
  ['The Fool', 'Si Pengembara', 'awal baru · spontan · lompatan iman', 'ceroboh · ragu melangkah · nekat tanpa arah'],
  ['The Magician', 'Sang Penyihir', 'kemauan · keterampilan · mewujudkan', 'manipulasi · potensi terbuang · kurang fokus'],
  ['The High Priestess', 'Pendeta Agung', 'intuisi · misteri · suara batin', 'rahasia · mengabaikan firasat'],
  ['The Empress', 'Sang Permaisuri', 'kelimpahan · merawat · kreativitas', 'ketergantungan · kreativitas tersumbat'],
  ['The Emperor', 'Sang Kaisar', 'struktur · otoritas · stabilitas', 'kaku · terlalu mengontrol'],
  ['The Hierophant', 'Sang Guru', 'tradisi · bimbingan · nilai bersama', 'memberontak · dogma · jalan sendiri'],
  ['The Lovers', 'Sepasang Kekasih', 'cinta · keselarasan · pilihan hati', 'tidak selaras · pilihan yang ragu'],
  ['The Chariot', 'Sang Kereta', 'tekad · kemenangan · arah jelas', 'hilang kendali · tanpa arah'],
  ['Strength', 'Kekuatan', 'keberanian lembut · sabar · kendali diri', 'ragu diri · emosi meledak'],
  ['The Hermit', 'Sang Pertapa', 'perenungan · menyendiri · mencari makna', 'mengisolasi diri · kesepian'],
  ['Wheel of Fortune', 'Roda Nasib', 'siklus · takdir · titik balik', 'melawan arus · nasib sedang turun'],
  ['Justice', 'Keadilan', 'kejujuran · sebab-akibat · adil', 'tidak adil · lari dari tanggung jawab'],
  ['The Hanged Man', 'Yang Tergantung', 'jeda · sudut pandang baru · berserah', 'menunda · pengorbanan sia-sia'],
  ['Death', 'Kematian', 'akhir · transformasi · melepas', 'menolak berubah · stagnan'],
  ['Temperance', 'Keseimbangan', 'sabar · takaran pas · harmoni', 'berlebihan · tidak seimbang'],
  ['The Devil', 'Sang Iblis', 'keterikatan · godaan · sisi bayang', 'melepaskan diri · sadar akan jerat'],
  ['The Tower', 'Menara', 'guncangan · kebenaran terbuka · runtuhnya ilusi', 'takut berubah · menunda yang tak terelakkan'],
  ['The Star', 'Bintang', 'harapan · pemulihan · ketenangan', 'putus asa · kehilangan arah'],
  ['The Moon', 'Bulan', 'ilusi · cemas · alam bawah sadar', 'kebingungan mereda · kebenaran muncul'],
  ['The Sun', 'Matahari', 'sukacita · sukses · kejernihan', 'optimisme redup · bahagia tertunda'],
  ['Judgement', 'Kebangkitan', 'panggilan · evaluasi diri · bangkit', 'ragu diri · menghakimi diri'],
  ['The World', 'Dunia', 'tuntas · pencapaian · utuh', 'belum selesai · jalan pintas']
];

const SUIT = {
  Wands:     { id: 'Tongkat', unsur: 'Api',   ranah: 'semangat & tindakan' },
  Cups:      { id: 'Piala',   unsur: 'Air',   ranah: 'perasaan & hubungan' },
  Swords:    { id: 'Pedang',  unsur: 'Udara', ranah: 'pikiran & keputusan' },
  Pentacles: { id: 'Koin',    unsur: 'Tanah', ranah: 'materi & pekerjaan' }
};

const RANK = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
const RANK_ID = ['As', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Putri', 'Ksatria', 'Ratu', 'Raja'];

const MINOR = {
  Wands: [
    ['inspirasi · awal proyek · gairah', 'tertunda · kurang motivasi'],
    ['rencana · visi ke depan · keputusan', 'takut melangkah · rencana kabur'],
    ['ekspansi · menunggu hasil · peluang jauh', 'hambatan · hasil molor'],
    ['perayaan · rumah · harmoni', 'ketegangan di rumah · masa transisi'],
    ['persaingan · gesekan · adu ide', 'menghindari konflik · gencatan senjata'],
    ['kemenangan · pengakuan publik', 'ego · pengakuan tertunda'],
    ['bertahan · membela prinsip', 'kewalahan · ingin menyerah'],
    ['gerak cepat · kabar datang · momentum', 'tertunda · terburu-buru'],
    ['tangguh · waspada · hampir sampai', 'lelah · terlalu curiga'],
    ['beban berat · tanggung jawab', 'melepas beban · belajar mendelegasi'],
    ['antusias · eksplorasi · kabar baik', 'ide mentah · kurang arah'],
    ['berani · petualangan · impulsif', 'gegabah · mudah bosan'],
    ['percaya diri · karismatik · hangat', 'cemburu · goyah percaya diri'],
    ['pemimpin visioner · wirausaha', 'sombong · terlalu memaksa']
  ],
  Cups: [
    ['cinta baru · perasaan meluap · intuisi', 'emosi terpendam · terasa kosong'],
    ['kemitraan · saling tertarik', 'putus komunikasi · tidak seimbang'],
    ['persahabatan · berkumpul · merayakan', 'gosip · berlebihan'],
    ['jenuh · merenung · melewatkan tawaran', 'bangkit · mulai menerima'],
    ['kecewa · kehilangan · sedih', 'menerima · mulai bangkit'],
    ['nostalgia · kenangan · ketulusan', 'terjebak masa lalu'],
    ['banyak pilihan · angan-angan', 'kejernihan · mulai fokus'],
    ['pergi · mencari makna lebih', 'bertahan karena takut'],
    ['puas · keinginan terkabul', 'puas semu · berpuas diri'],
    ['bahagia bersama · harmoni', 'retak · ekspektasi terlalu ideal'],
    ['pesan hati · kreatif · peka', 'emosi labil · kekanakan'],
    ['romantis · membawa tawaran · idealis', 'murung · janji kosong'],
    ['welas asih · intuitif · tenang', 'tertutup · bergantung secara emosi'],
    ['bijak mengelola emosi · diplomatis', 'manipulatif · emosi dipendam']
  ],
  Swords: [
    ['kejernihan · kebenaran · terobosan', 'bingung · salah paham'],
    ['buntu · menimbang-nimbang', 'informasi berlebih · keputusan dipaksa'],
    ['patah hati · luka · duka', 'pulih · memaafkan'],
    ['istirahat · pemulihan', 'gelisah · burnout'],
    ['konflik · menang tapi kalah', 'berdamai · menyesal'],
    ['transisi · meninggalkan masalah', 'urusan belum selesai'],
    ['strategi · diam-diam · cerdik', 'ketahuan · memilih jujur'],
    ['terjebak · pikiran membatasi', 'bebas · sudut pandang baru'],
    ['cemas · overthinking · susah tidur', 'mulai lega · ada harapan'],
    ['titik terendah · akhir yang pahit', 'pulih · bangkit pelan-pelan'],
    ['ingin tahu · waspada · ide baru', 'gosip · bicara tanpa pikir'],
    ['ambisius · cepat bertindak', 'ceroboh · kasar'],
    ['tegas · mandiri · jernih', 'dingin · sinis'],
    ['logika · otoritas intelektual', 'manipulatif · sewenang-wenang']
  ],
  Pentacles: [
    ['peluang materi · rezeki baru', 'peluang lepas · boros'],
    ['menyeimbangkan · adaptasi', 'kewalahan · keuangan kacau'],
    ['kerja tim · keahlian', 'kurang kolaborasi · kerja sendirian'],
    ['menabung · rasa aman · kontrol', 'pelit · takut kehilangan'],
    ['kesulitan · merasa tersisih', 'pulih · bantuan datang'],
    ['berbagi · memberi dan menerima', 'utang budi · pamrih'],
    ['sabar · investasi jangka panjang', 'hasil kecil · tidak sabar'],
    ['tekun · mengasah keahlian', 'perfeksionis · kerja tanpa arah'],
    ['mandiri · nyaman · mapan', 'terlalu sibuk kerja · kesepian'],
    ['warisan · keluarga · kemakmuran langgeng', 'masalah keluarga · harta goyah'],
    ['belajar · rencana konkret', 'malas · menunda'],
    ['rajin · rutin · bisa diandalkan', 'jenuh · stagnan'],
    ['praktis · mengayomi · mapan', 'kerja melulu · abai diri'],
    ['sukses · makmur · disiplin', 'serakah · materialistis']
  ]
};

function buildDeck() {
  const deck = MAYOR.map((m, i) => ({ id: i, arcana: 'mayor', nomor: i, nama: m[0], sub: m[1], tegak: m[2], terbalik: m[3], unsur: null }));
  Object.keys(MINOR).forEach((suit) => {
    MINOR[suit].forEach((m, r) => {
      deck.push({
        id: deck.length, arcana: 'minor', suit, rank: r,
        nama: `${RANK[r]} of ${suit}`, sub: `${RANK_ID[r]} ${SUIT[suit].id}`,
        tegak: m[0], terbalik: m[1], unsur: SUIT[suit].unsur
      });
    });
  });
  return deck;
}
const DECK = buildDeck();
