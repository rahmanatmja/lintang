// ───────────────────────── Lintang · data Jawa (lengkap) ─────────────────────────
// Diringkas dari tradisi primbon & pawukon. Untuk refleksi dan hiburan.

// Detail tambahan untuk tiap hari (Saptawara), index = Date.getUTCDay()
const HARI_X = [
  { // Minggu
    planet: 'Matahari', unsur: 'Api', simbol: 'Srengenge',
    watak: 'Orang Minggu seperti matahari: hangat, ingin bersinar, dan senang diakui. Mudah murah hati pada orang dekat, punya bakat memimpin, dan tidak betah dianggap remeh. Di balik kepercayaan dirinya ada kebutuhan besar untuk dihargai.',
    kelebihan: ['Percaya diri dan berani tampil', 'Murah hati dan suka melindungi', 'Bisa membangkitkan semangat orang lain'],
    tantangan: ['Gengsi, sulit mengakui salah', 'Mudah tersinggung kalau diabaikan', 'Kadang ingin semua berjalan menurut caranya'],
    karier: 'Cocok di posisi yang terlihat: pemimpin tim, wirausaha, panggung, pemerintahan, dunia kreatif yang butuh figur.',
    asmara: 'Romantis dan royal, tapi butuh pasangan yang mengagumi dan memberi ruang untuk bersinar.',
    energi: { tema: 'Bersinar & memimpin', teks: 'Energi Minggu adalah energi matahari: terang, terbuka, dan memancar. Hari yang baik untuk tampil, memulai sesuatu yang ingin dilihat orang, dan berkumpul dengan keluarga. Ego juga lebih mudah tersulut, jadi bedakan antara memimpin dan memaksa.', baik: ['Bertemu keluarga', 'Menampilkan karya', 'Mengambil inisiatif'], hindari: ['Adu gengsi', 'Pamer berlebihan'] }
  },
  { // Senin
    planet: 'Bulan', unsur: 'Air', simbol: 'Rembulan',
    watak: 'Orang Senin seperti rembulan: lembut, perasa, dan pandai membaca suasana. Mudah berempati, suka merawat, tapi suasana hatinya naik-turun mengikuti keadaan. Sering memikirkan pendapat orang lain lebih dari perlu.',
    kelebihan: ['Peka dan penuh perhatian', 'Sabar menghadapi orang', 'Intuisi kuat soal perasaan orang lain'],
    tantangan: ['Moody dan mudah terbawa perasaan', 'Sulit menolak permintaan', 'Cenderung memendam kecewa'],
    karier: 'Cocok di bidang yang merawat dan melayani: kesehatan, pendidikan, kuliner, konseling, hospitality, seni.',
    asmara: 'Setia dan penuh kasih, butuh rasa aman dan pasangan yang lembut dalam berkata.',
    energi: { tema: 'Merasa & merawat', teks: 'Energi Senin dingin dan reflektif seperti cahaya bulan. Perasaan lebih mudah muncul ke permukaan, jadi ini hari yang baik untuk merawat diri, rumah, dan hubungan. Keputusan besar yang didorong emosi sebaiknya ditunda sehari.', baik: ['Merapikan rumah', 'Menelepon orang tua', 'Memasak & merawat diri'], hindari: ['Keputusan impulsif karena baper', 'Konfrontasi'] }
  },
  { // Selasa
    planet: 'Mars', unsur: 'Api', simbol: 'Geni',
    watak: 'Orang Selasa berani, terus terang, dan tahan banting. Tidak suka berbelit, cepat bertindak, dan siap pasang badan untuk orang yang dibelanya. Nada bicaranya kadang lebih keras dari maksud hatinya.',
    kelebihan: ['Pemberani dan tegas', 'Pekerja keras, tidak gampang menyerah', 'Jujur apa adanya'],
    tantangan: ['Mudah marah dan terburu-buru', 'Kurang sabar pada proses', 'Kata-kata bisa melukai'],
    karier: 'Cocok di bidang yang butuh keberanian dan gerak: teknik, militer/aparat, olahraga, bisnis kompetitif, lapangan.',
    asmara: 'Bergairah dan melindungi, perlu belajar melembutkan cara menyampaikan keinginan.',
    energi: { tema: 'Bertindak & berani', teks: 'Energi Selasa panas dan bergerak. Cocok untuk menyelesaikan pekerjaan yang butuh tenaga, mengambil keputusan tegas, atau berolahraga. Karena api sedang tinggi, gesekan juga mudah terjadi: pilih pertempuran yang memang perlu.', baik: ['Olahraga', 'Menuntaskan tugas berat', 'Negosiasi tegas'], hindari: ['Debat kusir', 'Mengemudi terburu-buru'] }
  },
  { // Rabu
    planet: 'Merkurius', unsur: 'Udara', simbol: 'Angin',
    watak: 'Orang Rabu luwes, cerdas, dan pandai bergaul. Pikirannya cepat, mudah beradaptasi dengan siapa saja, dan senang belajar hal baru. Kadang terlalu banyak yang dipikirkan sehingga sulit fokus.',
    kelebihan: ['Komunikatif dan supel', 'Cepat belajar', 'Pandai mencari jalan keluar'],
    tantangan: ['Mudah bosan', 'Banyak rencana, sedikit selesai', 'Bisa terkesan tidak konsisten'],
    karier: 'Cocok di bidang komunikasi dan perdagangan: penulis, marketing, dagang, guru, teknologi informasi, perantara.',
    asmara: 'Menyenangkan diajak bicara, butuh pasangan yang bisa jadi teman ngobrol dan tidak mengekang.',
    energi: { tema: 'Berkomunikasi & berdagang', teks: 'Energi Rabu adalah energi pertukaran: kata, kabar, dan barang mengalir lebih lancar. Hari yang baik untuk rapat, menulis, menawarkan sesuatu, dan belajar. Jaga fokus, karena pikiran juga mudah melompat ke banyak arah.', baik: ['Rapat & presentasi', 'Menulis', 'Jual-beli'], hindari: ['Janji tanpa catatan', 'Gosip'] }
  },
  { // Kamis
    planet: 'Jupiter', unsur: 'Udara', simbol: 'Guru',
    watak: 'Orang Kamis berwibawa, bijak, dan suka memberi nasihat. Punya pegangan hidup yang kuat dan ingin hidupnya bermakna. Disegani, tetapi kadang terlalu yakin dirinya paling benar.',
    kelebihan: ['Berwibawa dan dipercaya', 'Berpikiran luas', 'Dermawan ilmu'],
    tantangan: ['Suka menggurui', 'Keras pada prinsip', 'Bisa terlalu optimis soal janji'],
    karier: 'Cocok sebagai pengajar, pemuka, konsultan, hukum, keuangan, manajemen, atau pemimpin organisasi.',
    asmara: 'Bertanggung jawab dan mengayomi, butuh pasangan yang menghormati prinsipnya.',
    energi: { tema: 'Bertumbuh & belajar', teks: 'Energi Kamis luas dan murah hati, dipengaruhi Jupiter. Rezeki dan peluang terasa lebih terbuka, cocok untuk belajar, meminta restu, membuat rencana jangka panjang, dan bersedekah. Waspadai sikap berlebihan: terlalu banyak janji atau belanja.', baik: ['Belajar & mengajar', 'Meminta restu', 'Merencanakan jangka panjang'], hindari: ['Janji berlebihan', 'Belanja impulsif'] }
  },
  { // Jumat
    planet: 'Venus', unsur: 'Air', simbol: 'Banyu',
    watak: 'Orang Jumat tenang, sabar, dan tulus. Tidak suka ribut, lebih memilih jalan damai, dan punya rasa estetika yang halus. Dalam diamnya ia menimbang banyak hal.',
    kelebihan: ['Sabar dan pendamai', 'Tulus dan setia', 'Punya selera keindahan'],
    tantangan: ['Menghindari konflik sampai masalah menumpuk', 'Mudah dimanfaatkan karena tidak enakan', 'Lambat mengambil keputusan'],
    karier: 'Cocok di bidang seni, desain, kecantikan, diplomasi, keagamaan, layanan, dan pekerjaan yang butuh ketelitian rasa.',
    asmara: 'Penuh kasih dan romantis, butuh suasana tenang dan pasangan yang tidak kasar.',
    energi: { tema: 'Menyelaraskan & mencintai', teks: 'Energi Jumat lembut dan menyatukan, dipengaruhi Venus. Hari yang baik untuk ibadah, silaturahmi, memperbaiki hubungan, dan menikmati keindahan. Energi ini kurang cocok untuk konfrontasi keras, lebih cocok untuk mendamaikan.', baik: ['Ibadah & silaturahmi', 'Kencan', 'Memperbaiki hubungan'], hindari: ['Konflik terbuka', 'Kerja sampai lupa rasa'] }
  },
  { // Sabtu
    planet: 'Saturnus', unsur: 'Tanah', simbol: 'Bumi',
    watak: 'Orang Sabtu teguh, pekerja keras, dan bisa diandalkan. Menyimpan banyak hal di dalam, tidak mudah percaya, tapi sekali setia akan bertahan lama. Hidupnya sering dibangun pelan-pelan dari bawah.',
    kelebihan: ['Tekun dan bertanggung jawab', 'Tahan uji', 'Hemat dan berhitung'],
    tantangan: ['Tertutup dan sulit diajak terbuka', 'Keras kepala', 'Mudah pesimis'],
    karier: 'Cocok di bidang yang butuh ketekunan: konstruksi, pertanian, akuntansi, birokrasi, riset, properti, manufaktur.',
    asmara: 'Setia dan serius, butuh waktu untuk membuka diri; menunjukkan cinta lewat tindakan.',
    energi: { tema: 'Membangun & menuntaskan', teks: 'Energi Sabtu berat dan membumi, dipengaruhi Saturnus. Hari yang baik untuk pekerjaan yang butuh disiplin, membereskan urusan lama, dan membayar kewajiban. Rasa lelah dan berat lebih terasa, jadi beri jeda yang cukup.', baik: ['Bersih-bersih & beres-beres', 'Menyelesaikan kewajiban', 'Menabung'], hindari: ['Memulai hal besar terburu-buru', 'Memaksakan diri'] }
  }
];

const PASARAN_X = [
  { // Legi
    sifat: 'Murah hati', dewa: 'Batara Iswara', aksara: 'Manis',
    watak: 'Legi berarti manis. Orang Legi ringan tangan, senang memberi, dan mudah dipercaya. Kehadirannya menyenangkan, tapi karena terlalu baik ia kadang lupa menjaga dirinya sendiri, termasuk soal uang.',
    kelebihan: ['Dermawan dan tulus', 'Mudah disukai', 'Pandai menjaga suasana'],
    tantangan: ['Sulit berkata tidak', 'Kurang hati-hati soal uang', 'Gampang percaya'],
    energi: { tema: 'Manis & memberi', teks: 'Pasaran Legi membawa energi timur, arah matahari terbit: awal yang segar dan niat baik. Hari Legi cocok untuk memberi, memulai kerja sama, dan menyapa orang baru. Orang lebih mudah luluh, jadi sampaikan permintaan dengan manis.', baik: ['Bersedekah', 'Memulai kerja sama', 'Berkenalan'], hindari: ['Meminjamkan uang tanpa hitungan'] }
  },
  { // Pahing
    sifat: 'Berkemauan keras', dewa: 'Batara Brahma', aksara: 'Pahit',
    watak: 'Pahing berenergi api selatan. Orang Pahing tekun dan berkemauan keras; kalau sudah menginginkan sesuatu, ia kejar sampai dapat. Pandai mengurus harta, tapi bisa terkesan perhitungan dan mudah tersulut.',
    kelebihan: ['Gigih dan ambisius', 'Pandai mengelola materi', 'Berani bersaing'],
    tantangan: ['Mudah marah', 'Bisa terlalu perhitungan', 'Ingin menang sendiri'],
    energi: { tema: 'Mengejar & menguasai', teks: 'Pasaran Pahing membawa api dari selatan: dorongan untuk memiliki dan mencapai. Hari Pahing baik untuk urusan materi, menagih, dan mengejar target. Api yang sama membuat emosi lebih panas, jadi jaga lidah.', baik: ['Urusan keuangan', 'Mengejar target', 'Menagih janji'], hindari: ['Bertengkar soal uang', 'Serakah'] }
  },
  { // Pon
    sifat: 'Meyakinkan', dewa: 'Batara Mahadewa', aksara: 'Kuning',
    watak: 'Pon berenergi barat, arah matahari terbenam. Orang Pon tutur katanya meyakinkan, suka tampil rapi, dan menjaga nama baik. Senang dipandang terhormat, kadang terlalu memikirkan citra.',
    kelebihan: ['Pandai bicara dan meyakinkan', 'Rapi dan berwibawa', 'Punya selera tinggi'],
    tantangan: ['Gengsi dan menjaga citra', 'Sulit menerima kritik', 'Bisa boros untuk penampilan'],
    energi: { tema: 'Tampil & meyakinkan', teks: 'Pasaran Pon membawa energi barat: menuai dan menampilkan hasil. Hari Pon cocok untuk presentasi, wawancara, berdandan, dan urusan yang butuh kesan baik. Hati-hati agar penampilan tidak mengalahkan isi.', baik: ['Wawancara & presentasi', 'Merapikan penampilan', 'Lobi'], hindari: ['Pamer', 'Belanja demi gengsi'] }
  },
  { // Wage
    sifat: 'Teguh', dewa: 'Batara Wisnu', aksara: 'Hitam',
    watak: 'Wage berenergi tanah dari utara. Orang Wage setia, teguh pendirian, dan tidak mudah goyah. Ia pekerja yang tenang, tapi bisa keras kepala dan sulit mengubah kebiasaan.',
    kelebihan: ['Setia dan konsisten', 'Tahan banting', 'Tidak mudah terpengaruh'],
    tantangan: ['Keras kepala', 'Lambat beradaptasi', 'Kadang pendiam sampai disalahpahami'],
    energi: { tema: 'Bertahan & mengakar', teks: 'Pasaran Wage membawa energi utara yang dingin dan stabil. Hari Wage cocok untuk pekerjaan rutin, menanam, menabung, dan menjaga komitmen. Kurang cocok untuk perubahan mendadak; lebih baik memperkuat yang sudah ada.', baik: ['Menanam & merawat', 'Pekerjaan rutin', 'Menepati janji'], hindari: ['Perubahan mendadak', 'Keras kepala dalam diskusi'] }
  },
  { // Kliwon
    sifat: 'Peka', dewa: 'Batara Guru', aksara: 'Kasih',
    watak: 'Kliwon ada di tengah, pusat dari empat arah. Orang Kliwon peka, intuitif, dan pandai bicara. Punya “rasa” yang tajam terhadap keadaan dan orang. Kadang sulit ditebak dan mudah gelisah bila batinnya tidak tenang.',
    kelebihan: ['Intuitif dan bijak', 'Pandai berkata-kata', 'Punya daya tarik misterius'],
    tantangan: ['Mudah gelisah', 'Bisa terlalu banyak bicara', 'Sulit ditebak'],
    energi: { tema: 'Batin & keseimbangan', teks: 'Pasaran Kliwon adalah pusat, tempat semua arah bertemu. Dalam tradisi Jawa, malam dan hari Kliwon (apalagi Jumat Kliwon dan Selasa Kliwon) dianggap kuat untuk laku batin. Baik untuk berdoa, merenung, ziarah, dan mendengar intuisi; kurang cocok untuk keputusan yang tergesa-gesa.', baik: ['Berdoa & meditasi', 'Ziarah', 'Mendengar intuisi'], hindari: ['Keputusan tergesa', 'Bicara asal'] }
  }
];

// Laku (lengkap) berdasarkan jumlah neptu 7–18
const LAKU_X = {
  7:  { teks: 'Cita-citanya banyak dan berpindah-pindah seperti debu tertiup angin. Sering memulai banyak hal, tapi jarang yang tuntas. Orangnya mudah bergaul dan tidak suka terikat.', saran: 'Pilih satu jangkar: satu tujuan, satu kebiasaan, satu orang kepercayaan. Ketekunan kecil akan membuatmu melayang ke arah yang benar.' },
  8:  { teks: 'Seperti api: bersemangat, cepat bereaksi, dan hangat bagi yang dekat. Mudah tersulut emosi, tapi juga cepat padam dan memaafkan.', saran: 'Salurkan api ke kerja dan karya, bukan ke amarah. Tarik napas tiga kali sebelum menjawab sesuatu yang memancing.' },
  9:  { teks: 'Seperti angin: bebas, mudah menyesuaikan diri, kehadirannya terasa walau sering tak terlihat. Pendiriannya bisa berubah mengikuti keadaan.', saran: 'Tetapkan prinsip yang tidak ikut berubah arah. Kebebasanmu akan lebih berharga kalau ada pegangan.' },
  10: { teks: 'Seperti pendeta yang bertapa: suka merenung, mencari makna, dan nasihatnya sering dicari orang. Tidak terlalu mengejar keramaian dunia.', saran: 'Bagikan kebijaksanaanmu, tapi jangan lupa bertindak. Renungan perlu langkah nyata agar berbuah.' },
  11: { teks: 'Yang ditunjuk: sering dipilih memimpin atau dimintai tolong. Punya daya tarik alami dan dipercaya orang banyak, tapi rawan dibebani terlalu banyak.', saran: 'Belajar memilih mana amanah yang perlu kamu terima. Tidak semua tunjukan harus kamu jawab “ya”.' },
  12: { teks: 'Seperti bunga: menyenangkan, disukai banyak orang, pandai membuat suasana indah. Hidupnya banyak dihiasi pergaulan.', saran: 'Rawat akarmu juga, bukan hanya kelopak. Pastikan keindahan luar didukung isi dan ketenangan batin.' },
  13: { teks: 'Seperti bintang: bersinar dengan caranya sendiri, tenang, sedikit misterius, dan jadi penunjuk arah. Sering dihormati diam-diam.', saran: 'Cahayamu tidak perlu dipamerkan, tapi jangan juga disembunyikan. Orang membutuhkan arahmu.' },
  14: { teks: 'Seperti rembulan: meneduhkan, penuh perhatian, memberi terang ketika orang lain dalam gelap. Mudah dicintai karena kelembutannya.', saran: 'Kamu memantulkan cahaya untuk banyak orang. Pastikan kamu juga mengisi ulang cahayamu sendiri.' },
  15: { teks: 'Seperti matahari: berwawasan luas, memberi energi, cocok jadi pusat dan penggerak. Kehadirannya menghangatkan, tapi bisa terasa menyilaukan.', saran: 'Pimpin dengan hangat, bukan membakar. Beri ruang bagi orang lain untuk ikut bersinar.' },
  16: { teks: 'Seperti air: sabar dan mengalir, tenang di permukaan namun dalam di dasarnya. Mudah menyesuaikan diri tanpa kehilangan diri.', saran: 'Air yang tenang tetap perlu arah agar tidak menggenang. Tentukan muara yang ingin kamu tuju.' },
  17: { teks: 'Seperti bumi: penyabar, mengayomi, jadi tempat bersandar bagi banyak orang. Murah hati dan tidak mudah membalas.', saran: 'Bumi juga perlu dirawat. Jangan biarkan dirimu terus dipijak tanpa diberi kembali.' },
  18: { teks: 'Paripurna: berwibawa, berpendirian, bicaranya didengar dan langkahnya dipertimbangkan. Neptu tertinggi, sering dianggap membawa keberuntungan dan tanggung jawab besar.', saran: 'Wibawa yang besar butuh kerendahan hati yang besar. Gunakan pengaruhmu untuk mengangkat orang lain.' }
};

// Pancasuda: neptu weton dibagi 7, sisanya
const PANCASUDA = {
  1: { nama: 'Wasesa Segara', arti: 'Kuasa seperti samudra', nada: 'baik', teks: 'Berwibawa, luas hati, dan pemaaf seperti lautan. Mampu menampung masalah orang lain dan cenderung mudah mendapat rezeki.' },
  2: { nama: 'Tunggak Semi', arti: 'Tunggul yang bersemi', nada: 'baik', teks: 'Rezekinya terus bertunas: walau ditebang, tumbuh lagi. Cocok berdagang dan usaha; jatuh-bangun tetap bisa pulih.' },
  3: { nama: 'Satriya Wibawa', arti: 'Ksatria berwibawa', nada: 'baik', teks: 'Mendapat kemuliaan dan dihormati. Punya bakat memimpin dan wibawa yang membuat orang segan.' },
  4: { nama: 'Sumur Sinaba', arti: 'Sumur yang didatangi', nada: 'baik', teks: 'Seperti sumur yang didatangi banyak orang: menjadi tempat bertanya dan berguru. Ilmu dan nasihatnya dicari.' },
  5: { nama: 'Bumi Kapetak', arti: 'Bumi yang terkubur', nada: 'netral', teks: 'Pekerja keras dan tahan banting, tapi hasilnya sering tidak langsung terlihat. Perlu kesabaran; sifatnya tertutup dan teguh.' },
  6: { nama: 'Satriya Wirang', arti: 'Ksatria yang menanggung malu', nada: 'waspada', teks: 'Hidupnya banyak ujian dan rawan merasa dipermalukan. Bila sabar dan rendah hati, ujian itu menempanya jadi pribadi yang kuat.' },
  0: { nama: 'Lebu Katiup Angin', arti: 'Debu tertiup angin', nada: 'waspada', teks: 'Rawan berpindah-pindah dan kehilangan pegangan; rezeki datang dan pergi. Kuncinya kedisiplinan dan menetapkan tujuan.' }
};

// Petung Sri–Lungguh–Gedhong–Lara–Pati: (neptu lahir + neptu hari) mod 5
const PETUNG5 = {
  1: { nama: 'Sri', nada: 'baik', skor: 2, arti: 'rezeki', teks: 'Hari Sri: membawa rezeki dan kelancaran. Baik untuk memulai usaha, berdagang, melamar kerja, atau urusan yang menyangkut nafkah.' },
  2: { nama: 'Lungguh', nada: 'baik', skor: 1.5, arti: 'kedudukan', teks: 'Hari Lungguh: membawa kedudukan dan penghormatan. Baik untuk urusan karier, bertemu atasan, wawancara, dan meminta restu.' },
  3: { nama: 'Gedhong', nada: 'baik', skor: 1.5, arti: 'simpanan', teks: 'Hari Gedhong: membawa kemapanan dan simpanan. Baik untuk menabung, membeli barang berharga, dan merapikan keuangan.' },
  4: { nama: 'Lara', nada: 'waspada', skor: -1, arti: 'sakit', teks: 'Hari Lara: energi tubuh dan hati lebih rapuh. Jaga kesehatan, kurangi begadang, dan tunda hal berisiko bila bisa.' },
  0: { nama: 'Pati', nada: 'waspada', skor: -2, arti: 'putus', teks: 'Hari Pati: secara primbon dianggap kurang baik untuk memulai hal penting. Pakai untuk menyelesaikan, beristirahat, dan berhati-hati di jalan.' }
};

// Paringkelan (Sadwara), siklus 6 hari
const PARINGKELAN = [
  { nama: 'Tungle',    arti: 'daun', teks: 'Hari daun: kurang baik untuk menebang atau memangkas tanaman. Baik untuk hal-hal yang bersifat tumbuh dan memperindah.' },
  { nama: 'Aryang',    arti: 'manusia', teks: 'Hari manusia: kurang baik untuk urusan yang bisa melukai sesama. Baik untuk bekerja sama dan menyelesaikan urusan antarmanusia dengan damai.' },
  { nama: 'Wurukung',  arti: 'hewan', teks: 'Hari hewan: kurang baik untuk menyembelih atau menyakiti hewan. Baik untuk merawat ternak dan peliharaan.' },
  { nama: 'Paningron', arti: 'mina (ikan)', teks: 'Hari ikan: kurang baik untuk memancing atau menjaring. Baik untuk urusan air dan kebersihan.' },
  { nama: 'Uwas',      arti: 'burung', teks: 'Hari burung: kurang baik untuk menangkap burung. Baik untuk bepergian dan menyebar kabar.' },
  { nama: 'Mawulu',    arti: 'benih', teks: 'Hari benih: kurang baik untuk menanam biji, tetapi baik untuk merencanakan dan menyiapkan lahan.' }
];

// Wuku (Pawukon) — 30 wuku, masing-masing 7 hari, mulai Minggu
const WUKU = [
  { nama: 'Sinta', dewa: 'Yamadipati', watak: 'Pemberani dan berwibawa, tetapi mudah tersinggung. Tekun bila sudah punya tujuan.', energi: 'Wuku pembuka siklus: awal yang membawa tekad. Baik untuk niat baru, berhati-hati terhadap amarah.' },
  { nama: 'Landep', dewa: 'Mahadewa', watak: 'Tajam pikirannya seperti senjata yang diasah. Cerdas, cepat paham, kadang lidahnya terlalu tajam.', energi: 'Wuku ketajaman: cocok untuk belajar, mengasah keterampilan, dan menyelesaikan masalah teknis.' },
  { nama: 'Wukir', dewa: 'Mahayekti', watak: 'Teguh seperti gunung, berpendirian, sering jadi tempat bersandar. Bisa keras kepala.', energi: 'Wuku gunung: baik untuk memperkuat fondasi dan komitmen, kurang cocok untuk perubahan mendadak.' },
  { nama: 'Kurantil', dewa: 'Langsur', watak: 'Suka menolong dan banyak kenalan, tetapi kadang ceroboh dalam berjanji.', energi: 'Wuku pergaulan: baik untuk bersilaturahmi dan meminta bantuan, berhati-hati dengan janji.' },
  { nama: 'Tolu', dewa: 'Bayu', watak: 'Bertenaga seperti angin, giat dan suka bergerak, tetapi mudah berubah pikiran.', energi: 'Wuku angin: baik untuk bepergian dan bekerja keras, jaga fokus agar tidak tercerai.' },
  { nama: 'Gumbreg', dewa: 'Candra', watak: 'Lembut, menenangkan, dan pemaaf seperti cahaya bulan. Pandai menjaga perasaan.', energi: 'Wuku bulan: baik untuk merawat hubungan dan menenangkan diri.' },
  { nama: 'Warigalit', dewa: 'Asmara', watak: 'Penuh pesona dan kasih, mudah jatuh cinta, pandai bergaul.', energi: 'Wuku asmara: baik untuk urusan hati, perkenalan, dan seni.' },
  { nama: 'Warigagung', dewa: 'Maharesi', watak: 'Bijak dan berpengetahuan, suka memberi nasihat, sabar.', energi: 'Wuku resi: baik untuk belajar, berguru, dan mengambil keputusan dengan matang.' },
  { nama: 'Julungwangi', dewa: 'Sambu', watak: 'Harum namanya, disenangi orang, murah hati, tetapi kurang tegas.', energi: 'Wuku nama harum: baik untuk membangun reputasi dan berbuat baik.' },
  { nama: 'Sungsang', dewa: 'Gana', watak: 'Cerdik dan penuh akal, bisa membalik keadaan, kadang tergesa-gesa.', energi: 'Wuku terbalik: cocok untuk memecahkan masalah dengan cara baru, waspadai keputusan terburu-buru.' },
  { nama: 'Galungan', dewa: 'Kamajaya', watak: 'Tampan/cantik budi, penuh cinta, pandai menyenangkan hati orang, tapi mudah tergoda.', energi: 'Wuku kemenangan kebaikan: baik untuk perayaan, syukur, dan menyatukan hati.' },
  { nama: 'Kuningan', dewa: 'Indra', watak: 'Berwibawa seperti raja, suka kemewahan, dermawan, dan ingin dihormati.', energi: 'Wuku kemuliaan: baik untuk syukur, berbagi, dan urusan kedudukan.' },
  { nama: 'Langkir', dewa: 'Kala', watak: 'Kuat dan berani, sulit dikalahkan, tetapi bisa kasar bila marah.', energi: 'Wuku Kala: energi kuat namun keras. Bijak untuk berhati-hati dan tidak memancing perkara.' },
  { nama: 'Mandasiya', dewa: 'Brahma', watak: 'Bersemangat seperti api, rajin bekerja, kadang emosinya meledak.', energi: 'Wuku api: baik untuk kerja keras dan menempa diri, jaga emosi.' },
  { nama: 'Julungpujut', dewa: 'Guritna', watak: 'Pendiam, teliti, dan hemat. Banyak menyimpan rahasia.', energi: 'Wuku tenang: baik untuk pekerjaan yang butuh ketelitian dan menabung.' },
  { nama: 'Pahang', dewa: 'Tantra', watak: 'Cerdas dan berwibawa, pandai mengatur, tapi bisa angkuh.', energi: 'Wuku tata: baik untuk mengatur rencana, administrasi, dan kepemimpinan.' },
  { nama: 'Kuruwelut', dewa: 'Wisnu', watak: 'Pemelihara dan pelindung, sabar, banyak akal, sering jadi penengah.', energi: 'Wuku pemelihara: baik untuk merawat, memperbaiki, dan mendamaikan.' },
  { nama: 'Marakeh', dewa: 'Suranggana', watak: 'Pemberani dan teguh, setia kawan, tapi keras hati.', energi: 'Wuku keberanian: baik untuk menghadapi tantangan, kurangi sikap keras.' },
  { nama: 'Tambir', dewa: 'Siwa', watak: 'Bijak, berwawasan, dan religius. Kadang terlalu memikirkan banyak hal.', energi: 'Wuku Siwa: baik untuk ibadah, perenungan, dan melepaskan yang lama.' },
  { nama: 'Medangkungan', dewa: 'Basuki', watak: 'Pemurah dan tenang, kaya hati, disayang banyak orang.', energi: 'Wuku Basuki: baik untuk rezeki, kesejahteraan, dan berbagi.' },
  { nama: 'Maktal', dewa: 'Sakri', watak: 'Cekatan, pekerja keras, dan banyak akal, tetapi mudah curiga.', energi: 'Wuku cekatan: baik untuk menyelesaikan pekerjaan praktis.' },
  { nama: 'Wuye', dewa: 'Kowera', watak: 'Pandai mencari rezeki, hemat, tetapi bisa terlalu perhitungan.', energi: 'Wuku Kowera (dewa kekayaan): baik untuk urusan harta dan berdagang.' },
  { nama: 'Manahil', dewa: 'Citragotra', watak: 'Kreatif dan banyak keinginan, pandai merangkai cerita, kadang tidak sabaran.', energi: 'Wuku kreatif: baik untuk karya, desain, dan menyusun rencana.' },
  { nama: 'Prangbakat', dewa: 'Bisma', watak: 'Teguh memegang janji seperti Bisma, berani berkorban, keras pada prinsip.', energi: 'Wuku janji: baik untuk membuat komitmen, berat untuk mengubah keputusan.' },
  { nama: 'Bala', dewa: 'Durga', watak: 'Kuat dan berpengaruh, tegas, tetapi perlu menjaga amarah dan kata-kata.', energi: 'Wuku Durga: energi kuat dan berat. Lebih baik menjaga diri dan menahan diri dari pertengkaran.' },
  { nama: 'Wugu', dewa: 'Singajalma', watak: 'Pemberani dan teguh, ingin menang, pandai menjaga diri.', energi: 'Wuku singa: baik untuk menegakkan batas diri dan bertahan.' },
  { nama: 'Wayang', dewa: 'Sri', watak: 'Penuh pesona, suka keindahan, dan membawa kesuburan/rezeki.', energi: 'Wuku Dewi Sri: baik untuk rezeki, menanam, dan seni.' },
  { nama: 'Kulawu', dewa: 'Sadana', watak: 'Pandai mengelola harta, rajin, dan berhati-hati.', energi: 'Wuku Sadana: baik untuk menata keuangan dan pekerjaan rumah.' },
  { nama: 'Dukut', dewa: 'Sakri', watak: 'Sederhana dan tekun seperti rumput, tetap tumbuh di mana saja.', energi: 'Wuku rumput: baik untuk kerja sederhana yang konsisten dan merendah.' },
  { nama: 'Watugunung', dewa: 'Anantaboga', watak: 'Kuat dan berwibawa, berpendirian keras, berjiwa pemimpin.', energi: 'Wuku penutup siklus: baik untuk menuntaskan, mengevaluasi, dan bersiap untuk awal baru.' }
];

// Pranata Mangsa (kalender musim Jawa) — [nama, mulai bulan, mulai tgl, teks]
const MANGSA = [
  { nama: 'Kasa (Kartika)', mulai: [6, 22], teks: 'Daun-daun berguguran, tanah mengering. Musim untuk membakar jerami dan menyiapkan lahan; secara batin, waktunya melepas.' },
  { nama: 'Karo (Pusa)', mulai: [8, 2], teks: 'Tanah merekah, pohon randu dan mangga mulai berbunga. Musim kering puncak; hemat tenaga dan air.' },
  { nama: 'Katelu (Manggasri)', mulai: [8, 25], teks: 'Umbi-umbian dipanen, tanaman merambat tumbuh. Musim menuai hasil kecil dari kerja sebelumnya.' },
  { nama: 'Kapat (Sitra)', mulai: [9, 18], teks: 'Mata air mengering, pohon kapuk berbuah, burung mulai bersarang. Waktu menyiapkan bibit dan rencana.' },
  { nama: 'Kalima (Manggala)', mulai: [10, 13], teks: 'Hujan pertama turun, pohon asam bersemi. Saatnya memperbaiki saluran dan memulai tanam.' },
  { nama: 'Kanem (Naya)', mulai: [11, 9], teks: 'Buah-buahan melimpah (rambutan, durian, manggis), sawah mulai dibajak. Musim kelimpahan dan kerja di sawah.' },
  { nama: 'Kapitu (Palguna)', mulai: [12, 22], teks: 'Hujan lebat, sungai meluap, banyak penyakit. Musim untuk berhati-hati dan menjaga kesehatan.' },
  { nama: 'Kawolu (Wisaka)', mulai: [2, 3], teks: 'Padi menghijau, banyak ulat dan hama. Musim merawat dengan telaten.' },
  { nama: 'Kasanga (Jita)', mulai: [3, 1], teks: 'Padi berbunga, tonggeret dan jangkrik bersuara. Musim harapan menjelang panen.' },
  { nama: 'Kasadasa (Srawana)', mulai: [3, 26], teks: 'Padi menguning, burung-burung bertelur. Saatnya bersiap menuai.' },
  { nama: 'Dhesta (Padrawana)', mulai: [4, 19], teks: 'Panen raya, burung menyuapi anaknya. Musim syukur dan berbagi hasil.' },
  { nama: 'Sadha (Asuji)', mulai: [5, 12], teks: 'Udara dingin, jarang hujan, orang menjemur hasil panen. Musim menyimpan dan beristirahat.' }
];

// Bulan Jawa (mengikuti Hijriah) & windu
const BULAN_JAWA = ['Sura', 'Sapar', 'Mulud', 'Bakda Mulud', 'Jumadilawal', 'Jumadilakir', 'Rejeb', 'Ruwah', 'Pasa', 'Sawal', 'Sela', 'Besar'];
const BULAN_JAWA_TEKS = [
  'Bulan sakral pembuka tahun Jawa. Waktunya prihatin, introspeksi, dan laku batin; secara tradisi kurang dipilih untuk hajatan besar.',
  'Bulan Sapar: tradisi menolak bala (Rebo Wekasan). Baik untuk sedekah dan membersihkan diri.',
  'Bulan Mulud: memperingati kelahiran Nabi, penuh syukur dan perayaan (Sekaten, Grebeg Mulud).',
  'Bulan Bakda Mulud: masih dalam suasana syukur; baik untuk hajatan dan memulai usaha.',
  'Bulan Jumadilawal: bulan biasa yang tenang, baik untuk menyelesaikan urusan.',
  'Bulan Jumadilakir: penutup paruh pertama; baik untuk merapikan rencana.',
  'Bulan Rejeb: bulan mulia (Isra Mi\'raj). Baik untuk ibadah dan mempersiapkan diri.',
  'Bulan Ruwah: waktu mengenang leluhur (nyadran, ziarah) dan membersihkan diri menjelang Pasa.',
  'Bulan Pasa: bulan puasa, menahan diri dan memperbanyak ibadah.',
  'Bulan Sawal: bulan kemenangan dan saling memaafkan; baik untuk silaturahmi dan hajatan.',
  'Bulan Sela (Dulkangidah): bulan “sela/antara”; secara tradisi kurang dipilih untuk menikah.',
  'Bulan Besar: bulan haji dan kurban; dianggap baik untuk hajatan dan syukuran.'
];
const WINDU = ['Alip', 'Ehe', 'Jimawal', 'Je', 'Dal', 'Be', 'Wawu', 'Jimakir'];

// Afirmasi harian
const AFIRMASI = [
  'Aku tidak harus terburu-buru untuk sampai.',
  'Langkah kecil hari ini tetap langkah.',
  'Aku cukup, dan aku sedang bertumbuh.',
  'Aku melepaskan yang bukan bagianku untuk dipikul.',
  'Aku memilih tenang, bukan menang.',
  'Rezeki yang untukku tidak akan tertukar.',
  'Aku mendengarkan tubuh dan hatiku.',
  'Hari ini aku memberi tanpa kehilangan diriku.',
  'Aku berhak beristirahat tanpa merasa bersalah.',
  'Aku menghadapi hari ini dengan hati yang lapang.',
  'Aku jujur pada diriku sendiri.',
  'Yang kutanam dengan sabar akan tumbuh pada waktunya.',
  'Aku boleh berubah pikiran ketika aku belajar.',
  'Aku menjaga kata-kataku seperti menjaga api.',
  'Aku percaya pada intuisi yang tenang di dalam diriku.',
  'Kebaikan kecil hari ini akan kembali padaku.',
  'Aku tidak membandingkan musimku dengan musim orang lain.',
  'Aku memaafkan agar aku bisa melangkah ringan.',
  'Aku fokus pada yang bisa kukendalikan.',
  'Aku bersyukur atas yang sudah ada di tanganku.'
];
