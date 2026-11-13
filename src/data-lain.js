// ───────────────────────── Lintang · numerologi, shio, astrologi ─────────────────────────

// ── Numerologi (Pythagoras) ──
const LIFE_PATH = {
  1: { nama: 'Sang Perintis', kunci: 'mandiri · berani · pemimpin',
    teks: 'Kamu datang untuk belajar berdiri di atas kaki sendiri. Angka 1 adalah awal: penuh inisiatif, ambisi, dan dorongan menjadi yang pertama. Kamu bekerja paling baik ketika diberi kebebasan untuk memimpin jalanmu sendiri.',
    kekuatan: 'Tegas, kreatif, penuh tekad, berani mengambil risiko.', tantangan: 'Egois, keras kepala, sulit meminta bantuan, mudah tidak sabar.',
    karier: 'Wirausaha, manajer, inovator, freelancer, posisi apa pun yang memberi otonomi.', cinta: 'Butuh pasangan yang mandiri dan tidak mengekang; belajar berbagi kendali.' },
  2: { nama: 'Sang Pendamai', kunci: 'peka · kooperatif · diplomatis',
    teks: 'Kamu datang untuk belajar tentang kebersamaan. Angka 2 adalah jembatan: lembut, intuitif, dan pandai merasakan apa yang tidak diucapkan. Kekuatanmu ada pada kerja sama, bukan persaingan.',
    kekuatan: 'Empati tinggi, sabar, pendengar yang baik, penengah alami.', tantangan: 'Terlalu sensitif, sulit memutuskan, takut konflik, bergantung pada orang lain.',
    karier: 'Konselor, mediator, HR, perawat, asisten, musisi, desainer kolaboratif.', cinta: 'Sangat setia dan romantis; perlu belajar menyuarakan kebutuhan sendiri.' },
  3: { nama: 'Sang Pencerita', kunci: 'ekspresif · kreatif · ceria',
    teks: 'Kamu datang untuk mengekspresikan diri. Angka 3 adalah sukacita dan kreativitas: kata, warna, nada, dan tawa. Kamu membuat hidup orang lain lebih ringan, dan hidupmu paling bermakna ketika kamu berkarya.',
    kekuatan: 'Kreatif, komunikatif, optimis, menginspirasi.', tantangan: 'Mudah terpencar, dangkal bila takut pada kedalaman, boros energi.',
    karier: 'Penulis, content creator, seniman, pengajar, marketing, entertainer.', cinta: 'Menyenangkan dan hangat; butuh pasangan yang ikut tertawa dan memberi ruang ekspresi.' },
  4: { nama: 'Sang Pembangun', kunci: 'stabil · disiplin · jujur',
    teks: 'Kamu datang untuk membangun fondasi. Angka 4 adalah struktur dan kerja nyata: teratur, bisa diandalkan, dan sabar menyusun hidup batu demi batu. Kamu menghargai kejujuran dan proses.',
    kekuatan: 'Tekun, terorganisir, loyal, praktis.', tantangan: 'Kaku, terlalu serius, sulit menerima perubahan, workaholic.',
    karier: 'Teknik, akuntansi, manajemen proyek, arsitek, administrasi, bidang teknis.', cinta: 'Setia dan serius; tunjukkan cinta dengan tindakan, perlu belajar spontan.' },
  5: { nama: 'Sang Petualang', kunci: 'bebas · dinamis · ingin tahu',
    teks: 'Kamu datang untuk mengalami kebebasan. Angka 5 adalah perubahan dan petualangan: cepat beradaptasi, haus pengalaman, dan tidak betah dengan rutinitas. Kamu belajar lewat mencoba.',
    kekuatan: 'Adaptif, berani, karismatik, cerdas membaca peluang.', tantangan: 'Gelisah, impulsif, sulit berkomitmen, mudah berlebihan.',
    karier: 'Sales, traveling, jurnalis, event, startup, pekerjaan yang dinamis.', cinta: 'Seru dan bergairah; butuh pasangan yang tidak mengekang tapi tetap jadi rumah.' },
  6: { nama: 'Sang Pengasuh', kunci: 'bertanggung jawab · penyayang · harmonis',
    teks: 'Kamu datang untuk belajar mencintai dan melayani. Angka 6 adalah rumah dan keluarga: kamu merasa hidup ketika merawat orang lain dan menciptakan keindahan serta keharmonisan.',
    kekuatan: 'Penyayang, setia, bertanggung jawab, berjiwa seni.', tantangan: 'Terlalu ikut campur, perfeksionis, mengorbankan diri berlebihan.',
    karier: 'Guru, tenaga kesehatan, desain interior, kuliner, pelayanan sosial, konselor keluarga.', cinta: 'Pasangan yang sangat peduli; jangan sampai cinta berubah jadi mengatur.' },
  7: { nama: 'Sang Pencari', kunci: 'analitis · spiritual · introspektif',
    teks: 'Kamu datang untuk mencari kebenaran. Angka 7 adalah perenungan: kamu ingin memahami makna di balik segala hal, menyukai kesendirian yang berkualitas, dan punya intuisi yang dalam.',
    kekuatan: 'Cerdas, intuitif, mendalam, peneliti alami.', tantangan: 'Tertutup, skeptis, sulit percaya, merasa terasing.',
    karier: 'Peneliti, analis, ilmuwan, penulis, programmer, bidang spiritual atau filsafat.', cinta: 'Butuh koneksi yang dalam dan ruang pribadi; membuka diri pelan-pelan.' },
  8: { nama: 'Sang Penguasa', kunci: 'ambisius · berwibawa · berorientasi hasil',
    teks: 'Kamu datang untuk belajar tentang kekuatan dan materi. Angka 8 adalah otoritas dan kelimpahan: kamu punya naluri bisnis, tahan tekanan, dan ingin membangun sesuatu yang besar.',
    kekuatan: 'Visioner, tegas, pandai mengelola uang dan orang.', tantangan: 'Materialistis, gila kerja, mengontrol, sulit menunjukkan sisi lembut.',
    karier: 'Eksekutif, bisnis, keuangan, hukum, properti, kepemimpinan organisasi.', cinta: 'Melindungi dan menyediakan; belajar bahwa kehadiran lebih penting dari pemberian.' },
  9: { nama: 'Sang Pemberi', kunci: 'welas asih · idealis · bijak',
    teks: 'Kamu datang untuk melayani yang lebih besar dari dirimu. Angka 9 adalah penutup siklus: penuh welas asih, toleran, dan berjiwa kemanusiaan. Kamu sering merasa “tua” dalam jiwa.',
    kekuatan: 'Murah hati, artistik, berpandangan luas, pemaaf.', tantangan: 'Sulit melepaskan masa lalu, mudah kecewa pada dunia, berkorban berlebihan.',
    karier: 'Kemanusiaan, NGO, seni, penyembuhan, pendidikan, diplomasi.', cinta: 'Mencintai dengan tulus dan luas; perlu memastikan cintamu juga kembali padamu.' },
  11: { nama: 'Sang Pencerah (Master)', kunci: 'intuisi · inspirasi · kepekaan tinggi',
    teks: 'Angka master 11 membawa getaran 2 yang diperkuat. Kamu sangat intuitif, peka terhadap energi, dan punya potensi menginspirasi banyak orang. Tantangannya: kepekaan itu juga mudah membuatmu cemas.',
    kekuatan: 'Visioner, spiritual, karismatik, inspiratif.', tantangan: 'Gugup, overthinking, merasa tidak dipahami, tekanan ekspektasi diri.',
    karier: 'Pembicara, penyembuh, seniman, konselor, pemimpin spiritual, pendidik.', cinta: 'Butuh pasangan yang lembut dan membumi untuk menyeimbangkan kepekaanmu.' },
  22: { nama: 'Sang Arsitek (Master)', kunci: 'visi besar · praktis · membangun warisan',
    teks: 'Angka master 22 adalah pembangun mimpi besar menjadi nyata. Kamu menggabungkan intuisi angka 11 dengan ketekunan angka 4. Potensimu besar, begitu pula tekanannya.',
    kekuatan: 'Visioner yang praktis, pemimpin, pengorganisir ulung.', tantangan: 'Beban berat, takut gagal, bisa terlalu mengontrol.',
    karier: 'Pendiri organisasi, arsitek, perencana kota, pemimpin proyek besar.', cinta: 'Setia dan stabil; jangan biarkan misi besar menelan waktu bersama.' },
  33: { nama: 'Sang Guru Kasih (Master)', kunci: 'welas asih · pengabdian · penyembuhan',
    teks: 'Angka master 33 adalah getaran 6 yang diperkuat: cinta yang melayani. Kamu punya bakat menyembuhkan dan mengajar lewat kasih. Jalanmu tentang memberi tanpa kehilangan diri.',
    kekuatan: 'Penyayang, bijak, kreatif, menenangkan.', tantangan: 'Memikul beban orang lain, idealis berlebihan, lupa merawat diri.',
    karier: 'Pengajar, penyembuh, konselor, seniman, pemimpin komunitas.', cinta: 'Sangat memberi; carilah pasangan yang juga merawatmu.' }
};

const PERSONAL_YEAR = {
  1: 'Tahun awal baru. Tanam benih, mulai proyek, ambil inisiatif. Apa yang kamu mulai sekarang mewarnai sembilan tahun ke depan.',
  2: 'Tahun kesabaran dan kerja sama. Bangun hubungan, tunggu benih tumbuh, jangan memaksa hasil.',
  3: 'Tahun ekspresi dan sosial. Berkarya, berbicara, bersenang-senang; jaga energi agar tidak terpencar.',
  4: 'Tahun kerja keras dan fondasi. Disiplin, rapikan keuangan, kesehatan, dan rutinitas.',
  5: 'Tahun perubahan. Peluang, perjalanan, dan kejutan. Bersikap luwes dan berani mencoba.',
  6: 'Tahun keluarga dan tanggung jawab. Rumah, hubungan, dan komitmen jadi pusat perhatian.',
  7: 'Tahun introspeksi. Belajar, mendalami spiritualitas, beristirahat dari keramaian.',
  8: 'Tahun panen dan kekuatan. Karier dan keuangan bisa melonjak bila kamu berani mengambil kendali.',
  9: 'Tahun penutup siklus. Lepaskan yang sudah selesai, maafkan, rapikan sebelum babak baru.',
  11: 'Tahun pencerahan (11/2). Intuisi menguat, peluang menginspirasi; jaga ketenangan batin.',
  22: 'Tahun pembangun (22/4). Kesempatan mewujudkan rencana besar dengan kerja yang terstruktur.'
};
const PERSONAL_DAY = {
  1: ['Hari memulai', 'Ambil inisiatif dan putuskan sesuatu yang sudah lama tertunda.'],
  2: ['Hari bekerja sama', 'Dengarkan, kompromi, dan biarkan hal-hal berjalan pelan.'],
  3: ['Hari berekspresi', 'Ngobrol, menulis, berkarya, dan bertemu teman.'],
  4: ['Hari bekerja', 'Selesaikan tugas, rapikan jadwal, fokus pada detail.'],
  5: ['Hari perubahan', 'Bersiap untuk kejutan; coba rute atau cara yang baru.'],
  6: ['Hari merawat', 'Perhatikan rumah, keluarga, dan orang yang membutuhkanmu.'],
  7: ['Hari merenung', 'Kurangi keramaian, baca, berdoa, dan dengarkan intuisi.'],
  8: ['Hari mengambil kendali', 'Urus keuangan, negosiasi, dan keputusan penting.'],
  9: ['Hari menuntaskan', 'Selesaikan, lepaskan, dan maafkan. Jangan mulai hal besar.'],
  11: ['Hari intuisi (11)', 'Inspirasi datang tiba-tiba; catat dan percayai firasatmu.'],
  22: ['Hari membangun (22)', 'Energi besar untuk mewujudkan rencana yang konkret.']
};
const EXPRESSION_TEKS = {
  1: 'Kamu mengekspresikan diri lewat kepemimpinan dan keberanian memulai.',
  2: 'Kamu mengekspresikan diri lewat kepekaan, kerja sama, dan diplomasi.',
  3: 'Kamu mengekspresikan diri lewat kata, kreativitas, dan keceriaan.',
  4: 'Kamu mengekspresikan diri lewat kerja nyata, keteraturan, dan keandalan.',
  5: 'Kamu mengekspresikan diri lewat kebebasan, petualangan, dan komunikasi.',
  6: 'Kamu mengekspresikan diri lewat kasih, tanggung jawab, dan keindahan.',
  7: 'Kamu mengekspresikan diri lewat pemikiran mendalam dan pencarian makna.',
  8: 'Kamu mengekspresikan diri lewat pencapaian, otoritas, dan pengelolaan.',
  9: 'Kamu mengekspresikan diri lewat welas asih dan cita-cita kemanusiaan.',
  11: 'Kamu mengekspresikan diri lewat inspirasi dan intuisi yang menerangi orang lain.',
  22: 'Kamu mengekspresikan diri lewat membangun hal besar yang berguna bagi banyak orang.',
  33: 'Kamu mengekspresikan diri lewat kasih yang mengajar dan menyembuhkan.'
};
const SOUL_TEKS = {
  1: 'Jiwamu rindu kemandirian dan menjadi diri sendiri.',
  2: 'Jiwamu rindu kedamaian, kebersamaan, dan dicintai dengan lembut.',
  3: 'Jiwamu rindu kebebasan berekspresi dan sukacita.',
  4: 'Jiwamu rindu rasa aman, keteraturan, dan kepastian.',
  5: 'Jiwamu rindu petualangan dan pengalaman baru.',
  6: 'Jiwamu rindu rumah yang hangat dan merasa dibutuhkan.',
  7: 'Jiwamu rindu ketenangan, kebenaran, dan waktu sendiri.',
  8: 'Jiwamu rindu pencapaian dan pengakuan atas kerja kerasmu.',
  9: 'Jiwamu rindu memberi makna bagi dunia.',
  11: 'Jiwamu rindu pencerahan dan koneksi spiritual.',
  22: 'Jiwamu rindu meninggalkan warisan yang nyata.',
  33: 'Jiwamu rindu menyembuhkan dan mengasihi tanpa syarat.'
};

// ── Shio ──
const SHIO = [
  { nama: 'Tikus', hanzi: '鼠', watak: 'Cerdik, cepat membaca peluang, dan pandai bertahan. Ramah di luar, penuh perhitungan di dalam.', kekuatan: 'Cerdas, hemat, adaptif, pandai bergaul.', kelemahan: 'Licik bila terdesak, gelisah, terlalu hati-hati soal uang.', karier: 'Bisnis, penulis, analis, perdagangan.', cinta: 'Romantis dan perhatian, cocok dengan pasangan yang stabil.', angka: [2, 3], warna: ['Biru', 'Emas', 'Hijau'] },
  { nama: 'Kerbau', hanzi: '牛', watak: 'Tekun, sabar, dan bisa diandalkan. Bekerja dalam diam dan membangun hidup pelan tapi pasti.', kekuatan: 'Pekerja keras, jujur, konsisten, kuat.', kelemahan: 'Keras kepala, kaku, sulit mengungkapkan perasaan.', karier: 'Pertanian, teknik, manufaktur, keuangan, real estate.', cinta: 'Setia dan serius, tidak suka basa-basi.', angka: [1, 4], warna: ['Putih', 'Kuning', 'Hijau'] },
  { nama: 'Macan', hanzi: '虎', watak: 'Pemberani, karismatik, dan penuh semangat. Pemimpin alami yang tidak suka diatur.', kekuatan: 'Berani, percaya diri, protektif, kompetitif.', kelemahan: 'Impulsif, mudah marah, sulit diatur.', karier: 'Pemimpin, militer, atlet, wirausaha, aktivis.', cinta: 'Bergairah dan intens, butuh pasangan yang tangguh.', angka: [1, 3, 4], warna: ['Biru', 'Abu-abu', 'Oranye'] },
  { nama: 'Kelinci', hanzi: '兔', watak: 'Lembut, elegan, dan diplomatis. Menyukai kedamaian dan keindahan, pandai menghindari konflik.', kekuatan: 'Sopan, peka, artistik, berhati-hati.', kelemahan: 'Mudah cemas, menghindari masalah, terlalu berhati-hati.', karier: 'Seni, desain, diplomasi, pendidikan, kesehatan.', cinta: 'Romantis dan setia, butuh suasana yang harmonis.', angka: [3, 4, 6], warna: ['Merah muda', 'Ungu', 'Biru'] },
  { nama: 'Naga', hanzi: '龍', watak: 'Agung, ambisius, dan berenergi besar. Kehadirannya menarik perhatian dan membawa semangat.', kekuatan: 'Percaya diri, cerdas, visioner, dermawan.', kelemahan: 'Arogan, tidak sabaran, menuntut kesempurnaan.', karier: 'Kepemimpinan, bisnis, politik, seni pertunjukan.', cinta: 'Penuh gairah dan setia, tapi ingin dikagumi.', angka: [1, 6, 7], warna: ['Emas', 'Perak', 'Abu-abu'] },
  { nama: 'Ular', hanzi: '蛇', watak: 'Bijak, misterius, dan intuitif. Berpikir dalam dan bergerak dengan perhitungan.', kekuatan: 'Cerdas, tenang, elegan, intuitif.', kelemahan: 'Pencemburu, tertutup, curiga.', karier: 'Riset, psikologi, keuangan, filsafat, seni.', cinta: 'Memikat dan setia, tapi posesif bila tidak aman.', angka: [2, 8, 9], warna: ['Hitam', 'Merah', 'Kuning'] },
  { nama: 'Kuda', hanzi: '馬', watak: 'Bebas, energik, dan bersemangat. Suka bergerak, bergaul, dan mengejar hal baru.', kekuatan: 'Ceria, mandiri, pekerja keras, komunikatif.', kelemahan: 'Tidak sabar, mudah bosan, kurang konsisten.', karier: 'Sales, jurnalis, pariwisata, olahraga, hiburan.', cinta: 'Romantis dan spontan, butuh kebebasan.', angka: [2, 3, 7], warna: ['Kuning', 'Hijau', 'Ungu'] },
  { nama: 'Kambing', hanzi: '羊', watak: 'Lembut, kreatif, dan berhati baik. Penuh empati dan menyukai ketenangan.', kekuatan: 'Artistik, sabar, penyayang, pemaaf.', kelemahan: 'Pesimis, mudah khawatir, kurang tegas.', karier: 'Seni, desain, kesehatan, pelayanan sosial.', cinta: 'Lembut dan setia, butuh rasa aman.', angka: [2, 7], warna: ['Hijau', 'Merah', 'Ungu'] },
  { nama: 'Monyet', hanzi: '猴', watak: 'Cerdas, lucu, dan penuh akal. Pandai memecahkan masalah dan cepat belajar.', kekuatan: 'Kreatif, inovatif, fleksibel, humoris.', kelemahan: 'Iseng berlebihan, gelisah, kurang serius.', karier: 'Teknologi, bisnis, hiburan, riset, perdagangan.', cinta: 'Menyenangkan, butuh pasangan yang bisa mengimbangi kecerdikannya.', angka: [4, 9], warna: ['Putih', 'Biru', 'Emas'] },
  { nama: 'Ayam', hanzi: '雞', watak: 'Teliti, jujur, dan percaya diri. Suka tampil rapi dan bekerja dengan standar tinggi.', kekuatan: 'Rajin, teliti, berani bicara, setia.', kelemahan: 'Kritis berlebihan, sombong, perfeksionis.', karier: 'Akuntansi, militer, jurnalis, administrasi, mode.', cinta: 'Setia dan terus terang, butuh dihargai.', angka: [5, 7, 8], warna: ['Emas', 'Coklat', 'Kuning'] },
  { nama: 'Anjing', hanzi: '狗', watak: 'Setia, jujur, dan adil. Teman yang bisa dipercaya dan pelindung bagi yang lemah.', kekuatan: 'Loyal, bertanggung jawab, tulus, berani.', kelemahan: 'Mudah cemas, sinis, keras kepala.', karier: 'Hukum, kesehatan, pendidikan, layanan sosial, keamanan.', cinta: 'Sangat setia dan melindungi.', angka: [3, 4, 9], warna: ['Hijau', 'Merah', 'Ungu'] },
  { nama: 'Babi', hanzi: '豬', watak: 'Murah hati, tulus, dan menikmati hidup. Penuh kasih dan mudah memaafkan.', kekuatan: 'Dermawan, jujur, sabar, penyayang.', kelemahan: 'Naif, mudah dimanfaatkan, terlalu memanjakan diri.', karier: 'Kuliner, hiburan, pelayanan, bisnis, seni.', cinta: 'Romantis dan tulus, membawa kehangatan.', angka: [2, 5, 8], warna: ['Kuning', 'Abu-abu', 'Coklat'] }
];
const UNSUR_SHIO = [
  { nama: 'Kayu', teks: 'Unsur Kayu: tumbuh, murah hati, kreatif, dan suka bekerja sama.' },
  { nama: 'Api', teks: 'Unsur Api: bersemangat, berani, penuh gairah, dan dinamis.' },
  { nama: 'Tanah', teks: 'Unsur Tanah: stabil, sabar, praktis, dan bisa diandalkan.' },
  { nama: 'Logam', teks: 'Unsur Logam: tegas, berprinsip, ambisius, dan disiplin.' },
  { nama: 'Air', teks: 'Unsur Air: bijak, intuitif, luwes, dan pandai berkomunikasi.' }
];
const SAN_HE = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]]; // segitiga harmoni
const LIU_HE = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]]; // pasangan rahasia
const LIU_HAI = [[0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10]]; // saling merugikan

// ── Astrologi ──
const PLANET = {
  Sun:     { id: 'Matahari', glyph: '☉', inti: 'identitas inti, ego, vitalitas' },
  Moon:    { id: 'Bulan', glyph: '☽', inti: 'emosi, kebutuhan batin, rasa aman' },
  Mercury: { id: 'Merkurius', glyph: '☿', inti: 'pikiran, cara berkomunikasi, belajar' },
  Venus:   { id: 'Venus', glyph: '♀', inti: 'cinta, keindahan, nilai, apa yang kamu sukai' },
  Mars:    { id: 'Mars', glyph: '♂', inti: 'dorongan, keberanian, cara bertindak & marah' },
  Jupiter: { id: 'Jupiter', glyph: '♃', inti: 'pertumbuhan, keberuntungan, keyakinan' },
  Saturn:  { id: 'Saturnus', glyph: '♄', inti: 'disiplin, batasan, pelajaran hidup' },
  Uranus:  { id: 'Uranus', glyph: '♅', inti: 'perubahan, keunikan, kebebasan (generasi)' },
  Neptune: { id: 'Neptunus', glyph: '♆', inti: 'mimpi, intuisi, spiritualitas (generasi)' }
};
// Cara tiap tanda "mewarnai" planet (kata sifat ringkas)
const SIGN_GAYA = ['berani dan langsung', 'tenang dan sensual', 'ingin tahu dan lincah', 'lembut dan protektif', 'hangat dan ekspresif', 'teliti dan rapi', 'harmonis dan diplomatis', 'intens dan mendalam', 'bebas dan optimis', 'disiplin dan ambisius', 'unik dan visioner', 'imajinatif dan empatik'];
const BULAN_TEKS = ['Emosimu cepat menyala dan cepat reda. Kamu butuh ruang untuk bertindak dan merasa bebas.', 'Kamu merasa aman lewat kenyamanan fisik, rutinitas, dan hal-hal yang stabil.', 'Kamu memproses perasaan dengan membicarakannya. Pikiran yang sibuk perlu teman ngobrol.', 'Perasaanmu dalam dan protektif. Rumah dan keluarga adalah sumber rasa amanmu.', 'Kamu butuh dihargai dan diperhatikan. Hatimu murah dan hangat.', 'Kamu merasa tenang ketika hidup rapi dan berguna bagi orang lain.', 'Kamu butuh harmoni dan pasangan; konflik membuatmu gelisah.', 'Perasaanmu intens dan tertutup. Kamu butuh kepercayaan penuh sebelum membuka diri.', 'Kamu butuh kebebasan dan makna; optimisme adalah caramu bertahan.', 'Kamu menjaga perasaan dengan kendali diri. Rasa aman datang dari pencapaian.', 'Kamu butuh ruang untuk menjadi diri sendiri; emosi diproses lewat logika.', 'Kamu sangat peka, mudah menyerap suasana orang lain. Butuh waktu sendiri untuk memulihkan diri.'];
const ASC_TEKS = ['Kamu terlihat berani, spontan, dan langsung ke inti.', 'Kamu terlihat tenang, kalem, dan dapat diandalkan.', 'Kamu terlihat ramah, lincah, dan banyak bicara.', 'Kamu terlihat lembut, hangat, dan mengayomi.', 'Kamu terlihat percaya diri dan memancarkan kehangatan.', 'Kamu terlihat rapi, sopan, dan cermat.', 'Kamu terlihat menawan, ramah, dan seimbang.', 'Kamu terlihat misterius, tajam, dan berkharisma.', 'Kamu terlihat ceria, terbuka, dan suka bercanda.', 'Kamu terlihat serius, dewasa, dan berwibawa.', 'Kamu terlihat unik, ramah, tapi sedikit berjarak.', 'Kamu terlihat lembut, dreamy, dan mudah didekati.'];
// Tema rumah (whole-sign) — dipakai untuk horoskop harian via transit Bulan
const RUMAH = [
  { nama: 'Diri', teks: 'Bulan menyinari dirimu sendiri. Energi dan perasaanmu lebih terasa; waktunya mengutamakan kebutuhan pribadi dan memulai sesuatu untuk dirimu.', fokus: { cinta: 0, karier: 1, uang: 0, sehat: 1 } },
  { nama: 'Harta', teks: 'Fokus beralih ke uang, harta, dan rasa aman. Baik untuk merapikan anggaran dan menghargai apa yang sudah kamu miliki.', fokus: { cinta: 0, karier: 0, uang: 2, sehat: 0 } },
  { nama: 'Komunikasi', teks: 'Hari penuh pesan, obrolan, dan perjalanan dekat. Ide mengalir; sampaikan apa yang perlu disampaikan.', fokus: { cinta: 0, karier: 1, uang: 0, sehat: 0 } },
  { nama: 'Rumah', teks: 'Hatimu ingin pulang. Perhatikan keluarga, rumah, dan akar dirimu. Hari yang baik untuk istirahat di tempat yang nyaman.', fokus: { cinta: 1, karier: -1, uang: 0, sehat: 1 } },
  { nama: 'Asmara & kreasi', teks: 'Energi bermain dan romansa meningkat. Lakukan sesuatu yang membuatmu bahagia, berkarya, atau berkencan.', fokus: { cinta: 2, karier: 0, uang: 0, sehat: 1 } },
  { nama: 'Rutinitas & kesehatan', teks: 'Waktunya membereskan pekerjaan dan memperhatikan tubuh. Kebiasaan kecil hari ini berdampak besar.', fokus: { cinta: -1, karier: 1, uang: 0, sehat: -1 } },
  { nama: 'Pasangan', teks: 'Sorotan pada hubungan satu-satu: pasangan, rekan, klien. Dengarkan sudut pandang orang lain.', fokus: { cinta: 2, karier: 0, uang: 0, sehat: 0 } },
  { nama: 'Transformasi', teks: 'Emosi bisa lebih dalam dan intens. Baik untuk urusan keuangan bersama, riset, dan melepas yang lama.', fokus: { cinta: 0, karier: 0, uang: 1, sehat: -1 } },
  { nama: 'Wawasan', teks: 'Pikiranmu ingin terbang jauh: belajar, merencanakan perjalanan, atau mencari makna. Optimisme naik.', fokus: { cinta: 0, karier: 1, uang: 0, sehat: 1 } },
  { nama: 'Karier', teks: 'Perhatian tertuju pada pekerjaan dan reputasi. Tampil profesional; orang yang tepat sedang memperhatikan.', fokus: { cinta: -1, karier: 2, uang: 1, sehat: 0 } },
  { nama: 'Pertemanan', teks: 'Hari yang sosial: teman, komunitas, dan harapan masa depan. Kolaborasi membawa keberuntungan.', fokus: { cinta: 1, karier: 1, uang: 1, sehat: 0 } },
  { nama: 'Batin', teks: 'Energi lebih pelan dan ke dalam. Istirahat, berdoa, dan selesaikan urusan yang tertunda diam-diam.', fokus: { cinta: -1, karier: -1, uang: 0, sehat: 0 } }
];
const KOTA = [
  ['Jakarta', -6.2, 106.82, 7], ['Bandung', -6.91, 107.61, 7], ['Bogor', -6.6, 106.8, 7], ['Bekasi', -6.24, 107.0, 7], ['Tangerang', -6.18, 106.63, 7], ['Serang', -6.12, 106.15, 7],
  ['Cirebon', -6.71, 108.56, 7], ['Tasikmalaya', -7.33, 108.22, 7], ['Semarang', -6.97, 110.42, 7], ['Solo', -7.57, 110.82, 7], ['Yogyakarta', -7.8, 110.36, 7],
  ['Magelang', -7.47, 110.22, 7], ['Purwokerto', -7.42, 109.23, 7], ['Tegal', -6.87, 109.14, 7], ['Pekalongan', -6.89, 109.67, 7], ['Kudus', -6.8, 110.84, 7],
  ['Surabaya', -7.25, 112.75, 7], ['Malang', -7.98, 112.63, 7], ['Kediri', -7.82, 112.01, 7], ['Madiun', -7.63, 111.52, 7], ['Jember', -8.17, 113.7, 7], ['Banyuwangi', -8.22, 114.37, 7],
  ['Medan', 3.6, 98.67, 7], ['Banda Aceh', 5.55, 95.32, 7], ['Padang', -0.95, 100.35, 7], ['Pekanbaru', 0.51, 101.45, 7], ['Palembang', -2.98, 104.76, 7], ['Jambi', -1.61, 103.61, 7],
  ['Bengkulu', -3.8, 102.27, 7], ['Bandar Lampung', -5.43, 105.26, 7], ['Batam', 1.13, 104.05, 7], ['Pangkalpinang', -2.13, 106.11, 7], ['Pontianak', -0.03, 109.33, 7], ['Palangka Raya', -2.21, 113.92, 7],
  ['Denpasar', -8.65, 115.22, 8], ['Mataram', -8.58, 116.12, 8], ['Kupang', -10.18, 123.6, 8], ['Banjarmasin', -3.32, 114.59, 8], ['Balikpapan', -1.27, 116.83, 8], ['Samarinda', -0.5, 117.15, 8],
  ['Makassar', -5.15, 119.43, 8], ['Manado', 1.47, 124.84, 8], ['Palu', -0.9, 119.87, 8], ['Kendari', -3.97, 122.51, 8], ['Gorontalo', 0.54, 123.06, 8],
  ['Ambon', -3.7, 128.18, 9], ['Ternate', 0.79, 127.38, 9], ['Jayapura', -2.53, 140.72, 9], ['Sorong', -0.88, 131.25, 9], ['Merauke', -8.49, 140.4, 9],
  ['Kuala Lumpur', 3.14, 101.69, 8], ['Singapura', 1.35, 103.82, 8]
];
const WARNA_ANGKA = { 1: 'Merah', 2: 'Jingga', 3: 'Kuning', 4: 'Hijau', 5: 'Biru muda', 6: 'Biru tua', 7: 'Ungu', 8: 'Coklat keemasan', 9: 'Putih', 11: 'Perak', 22: 'Emas', 33: 'Merah muda' };
