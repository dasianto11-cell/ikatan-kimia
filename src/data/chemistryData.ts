/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChemicalElement, Ion, CrystalType, QuizQuestion, RealWorldApplication } from '../types/chemistry';

export const ELEMENTS: ChemicalElement[] = [
  {
    id: 'na',
    name: 'Natrium',
    symbol: 'Na',
    atomicNumber: 11,
    massNumber: 23,
    shells: [2, 8, 1],
    valenceElectrons: 1,
    subshellConfig: '1s² 2s² 2p⁶ 3s¹',
    category: 'metal',
    color: '#38bdf8', // soft cyan/blue
    typicalIon: 'Na⁺',
    ionCharge: 1,
    ionReason: 'Natrium memiliki 1 elektron valensi pada kulit ke-3 (3s¹). Melepaskan 1 elektron ini membutuhkan energi ionisasi yang relatif rendah dan menghasilkan kation Na⁺ yang isoelektronik dengan gas mulia Neon ([Ne] 2, 8).',
    ionicRadiusPm: 102,
    atomicRadiusPm: 186,
    funFact: 'Natrium adalah logam alkali lunak yang sangat reaktif. Namun ketika berikatan ionik dengan klorin, membentuk garam dapur yang kita konsumsi setiap hari!'
  },
  {
    id: 'cl',
    name: 'Klorin',
    symbol: 'Cl',
    atomicNumber: 17,
    massNumber: 35.5,
    shells: [2, 8, 7],
    valenceElectrons: 7,
    subshellConfig: '1s² 2s² 2p⁶ 3s² 3p⁵',
    category: 'nonmetal',
    color: '#34d399', // soft emerald
    typicalIon: 'Cl⁻',
    ionCharge: -1,
    ionReason: 'Klorin memiliki 7 elektron valensi. Dengan afinitas elektron yang tinggi, klorin mudah menangkap 1 elektron tambahan untuk melengkapi kulit valensinya menjadi oktet (3s² 3p⁶), membentuk anion Cl⁻ yang isoelektronik dengan Argon ([Ar] 2, 8, 8).',
    ionicRadiusPm: 181,
    atomicRadiusPm: 99,
    funFact: 'Gas klorin berwarna kuning-kehijauan dan beracun, tetapi ion klorida (Cl⁻) justru penting bagi keseimbangan elektrolit cairan tubuh manusia.'
  },
  {
    id: 'mg',
    name: 'Magnesium',
    symbol: 'Mg',
    atomicNumber: 12,
    massNumber: 24,
    shells: [2, 8, 2],
    valenceElectrons: 2,
    subshellConfig: '1s² 2s² 2p⁶ 3s²',
    category: 'metal',
    color: '#a78bfa', // soft purple
    typicalIon: 'Mg²⁺',
    ionCharge: 2,
    ionReason: 'Magnesium memiliki 2 elektron valensi pada orbital 3s². Magnesium cenderung melepaskan kedua elektron valensi ini untuk membentuk kation Mg²⁺ dengan konfigurasi stabil seperti gas mulia Neon ([Ne] 2, 8).',
    ionicRadiusPm: 72,
    atomicRadiusPm: 160,
    funFact: 'Ion Mg²⁺ memiliki muatan +2 dengan jari-jari ion kecil, sehingga tarikan elektrostatiknya dalam kisi MgO sangat kuat, menghasilkan titik leleh luar biasa tinggi (2.852°C)!'
  },
  {
    id: 'o',
    name: 'Oksigen',
    symbol: 'O',
    atomicNumber: 8,
    massNumber: 16,
    shells: [2, 6],
    valenceElectrons: 6,
    subshellConfig: '1s² 2s² 2p⁴',
    category: 'nonmetal',
    color: '#f87171', // soft red/coral
    typicalIon: 'O²⁻',
    ionCharge: -2,
    ionReason: 'Oksigen memiliki 6 elektron valensi pada kulit ke-2. Memerlukan 2 elektron tambahan untuk mencapai kestabilan konfigurasi oktet (2s² 2p⁶), menghasilkan ion oksida O²⁻ yang isoelektronik dengan Neon ([Ne] 2, 8).',
    ionicRadiusPm: 140,
    atomicRadiusPm: 73,
    funFact: 'Oksigen adalah unsur nonlogam paling melimpah di kerak bumi, sebagian besar terikat dalam bentuk mineral oksida ionik dan silikat.'
  },
  {
    id: 'ca',
    name: 'Kalsium',
    symbol: 'Ca',
    atomicNumber: 20,
    massNumber: 40,
    shells: [2, 8, 8, 2],
    valenceElectrons: 2,
    subshellConfig: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²',
    category: 'metal',
    color: '#fbbf24', // warm amber
    typicalIon: 'Ca²⁺',
    ionCharge: 2,
    ionReason: 'Kalsium memiliki 2 elektron valensi pada subkulit 4s². Logam alkali tanah ini melepaskan 2 elektron tersebut untuk membentuk kation Ca²⁺ yang stabil dengan konfigurasi gas mulia Argon ([Ar] 2, 8, 8).',
    ionicRadiusPm: 100,
    atomicRadiusPm: 197,
    funFact: 'Senyawa ionik kalsium seperti kalsium karbonat (CaCO₃) merupakan komponen utama pembentuk batu kapur, marmer, cangkang kerang, serta tulang dan gigi kita!'
  },
  {
    id: 'f',
    name: 'Fluorin',
    symbol: 'F',
    atomicNumber: 9,
    massNumber: 19,
    shells: [2, 7],
    valenceElectrons: 7,
    subshellConfig: '1s² 2s² 2p⁵',
    category: 'nonmetal',
    color: '#2dd4bf', // teal/mint
    typicalIon: 'F⁻',
    ionCharge: -1,
    ionReason: 'Fluorin adalah unsur dengan keelektronegatifan tertinggi dalam tabel periodik (3,98 Pauling). Fluorin sangat kuat menarik 1 elektron untuk melengkapi orbital 2p⁵ menjadi 2p⁶, membentuk ion fluorida F⁻.',
    ionicRadiusPm: 133,
    atomicRadiusPm: 71,
    funFact: 'Ion fluorida (F⁻) ditambahkan dalam pasta gigi dalam jumlah terkontrol untuk memperkuat enamel gigi dari serangan asam bakteri.'
  },
  {
    id: 'k',
    name: 'Kalium',
    symbol: 'K',
    atomicNumber: 19,
    massNumber: 39,
    shells: [2, 8, 8, 1],
    valenceElectrons: 1,
    subshellConfig: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹',
    category: 'metal',
    color: '#60a5fa', // blue
    typicalIon: 'K⁺',
    ionCharge: 1,
    ionReason: 'Kalium memiliki 1 elektron valensi pada subkulit 4s¹. Karena jarak elektron terluar ini cukup jauh dari inti dan terlindungi oleh kulit dalam, kalium sangat mudah melepaskannya untuk membentuk ion K⁺ dengan konfigurasi gas Argon.',
    ionicRadiusPm: 138,
    atomicRadiusPm: 227,
    funFact: 'Kalium adalah unsur penting dalam pupuk NPK dan ion K⁺ sangat vital untuk transmisi impuls saraf pada tubuh makhluk hidup.'
  },
  {
    id: 'br',
    name: 'Bromin',
    symbol: 'Br',
    atomicNumber: 35,
    massNumber: 80,
    shells: [2, 8, 18, 7],
    valenceElectrons: 7,
    subshellConfig: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁵',
    category: 'nonmetal',
    color: '#fb923c', // orange/amber
    typicalIon: 'Br⁻',
    ionCharge: -1,
    ionReason: 'Bromin memiliki 7 elektron valensi pada kulit ke-4 (4s² 4p⁵). Unsur halogen ini menangkap 1 elektron valensi untuk membentuk ion bromida Br⁻ yang memiliki konfigurasi stabil gas Kripton ([Kr]).',
    ionicRadiusPm: 196,
    atomicRadiusPm: 114,
    funFact: 'Bromin adalah satu-satunya unsur nonlogam yang berwujud cair pada suhu ruang dengan warna cokelat kemerahan pekat.'
  }
];

export const CATIONS: Ion[] = [
  { id: 'na_plus', name: 'Natrium', symbol: 'Na⁺', charge: 1, chargeString: '+1', color: '#38bdf8', radius: 1.0, type: 'cation', electronConfig: '2, 8', originAtom: 'Na (Z=11)' },
  { id: 'k_plus', name: 'Kalium', symbol: 'K⁺', charge: 1, chargeString: '+1', color: '#60a5fa', radius: 1.3, type: 'cation', electronConfig: '2, 8, 8', originAtom: 'K (Z=19)' },
  { id: 'mg_2plus', name: 'Magnesium', symbol: 'Mg²⁺', charge: 2, chargeString: '+2', color: '#a78bfa', radius: 0.85, type: 'cation', electronConfig: '2, 8', originAtom: 'Mg (Z=12)' },
  { id: 'ca_2plus', name: 'Kalsium', symbol: 'Ca²⁺', charge: 2, chargeString: '+2', color: '#fbbf24', radius: 1.15, type: 'cation', electronConfig: '2, 8, 8', originAtom: 'Ca (Z=20)' },
  { id: 'al_3plus', name: 'Aluminium', symbol: 'Al³⁺', charge: 3, chargeString: '+3', color: '#c084fc', radius: 0.75, type: 'cation', electronConfig: '2, 8', originAtom: 'Al (Z=13)' }
];

export const ANIONS: Ion[] = [
  { id: 'cl_minus', name: 'Klorida', symbol: 'Cl⁻', charge: -1, chargeString: '-1', color: '#34d399', radius: 1.4, type: 'anion', electronConfig: '2, 8, 8', originAtom: 'Cl (Z=17)' },
  { id: 'br_minus', name: 'Bromida', symbol: 'Br⁻', charge: -1, chargeString: '-1', color: '#fb923c', radius: 1.55, type: 'anion', electronConfig: '2, 8, 18, 8', originAtom: 'Br (Z=35)' },
  { id: 'f_minus', name: 'Fluorida', symbol: 'F⁻', charge: -1, chargeString: '-1', color: '#2dd4bf', radius: 1.1, type: 'anion', electronConfig: '2, 8', originAtom: 'F (Z=9)' },
  { id: 'o_2minus', name: 'Oksida', symbol: 'O²⁻', charge: -2, chargeString: '-2', color: '#f87171', radius: 1.25, type: 'anion', electronConfig: '2, 8', originAtom: 'O (Z=8)' },
  { id: 's_2minus', name: 'Sulfida', symbol: 'S²⁻', charge: -2, chargeString: '-2', color: '#eab308', radius: 1.45, type: 'anion', electronConfig: '2, 8, 8', originAtom: 'S (Z=16)' }
];

export const CRYSTALS: CrystalType[] = [
  {
    id: 'nacl',
    name: 'Natrium Klorida (Garam Dapur)',
    formula: 'NaCl',
    cation: 'Na⁺',
    anion: 'Cl⁻',
    cationColor: '#38bdf8',
    anionColor: '#34d399',
    cationRadius: 0.42,
    anionRadius: 0.65,
    coordinationNumber: '6 : 6 (Oktahedral)',
    latticeType: 'Face-Centered Cubic (FCC / Rock-Salt)',
    meltingPoint: '801 °C',
    description: 'Setiap kation Na⁺ dikelilingi oleh 6 anion Cl⁻ sebagai tetangga terdekat dalam susunan oktahedral, dan sebaliknya setiap anion Cl⁻ juga dikelilingi oleh 6 kation Na⁺. Susunan kisi kristal ini meminimalkan tolakan antarmuatan sejenis dan memaksimalkan gaya tarik elektrostatik antar muatan berlawanan.',
    whySimplestRatio: 'Rumus kimia NaCl bukan berarti satu molekul yang terisolasi berisi 1 atom Na dan 1 atom Cl. Padatan ionik adalah kisi kristal 3 dimensi raksasa yang berulang. Karena jumlah total ion Na⁺ dan ion Cl⁻ dalam kisi seimbang 1:1 untuk mencapai kenetralan muatan listrik, maka rumus empiris yang ditulis adalah NaCl (rasio bilangan bulat tersederhana).'
  },
  {
    id: 'mgo',
    name: 'Magnesium Oksida (Periklas)',
    formula: 'MgO',
    cation: 'Mg²⁺',
    anion: 'O²⁻',
    cationColor: '#a78bfa',
    anionColor: '#f87171',
    cationRadius: 0.38,
    anionRadius: 0.58,
    coordinationNumber: '6 : 6 (Oktahedral)',
    latticeType: 'Face-Centered Cubic (Rock-Salt Structure)',
    meltingPoint: '2.852 °C',
    description: 'MgO memiliki struktur kisi kristal tipe garam batu yang serupa dengan NaCl, namun tersusun dari kation Mg²⁺ dan anion O²⁻. Karena kedua ion memiliki muatan ganda (+2 dan -2) serta jari-jari ion yang relatif kecil, energi kisi (lattice energy) MgO jauh lebih besar daripada NaCl, menghasilkan titik leleh yang luar biasa tinggi (2.852 °C).',
    whySimplestRatio: 'Dengan muatan (+2) pada Mg²⁺ dan (-2) pada O²⁻, perbandingan 1 ion Mg²⁺ berpasangan secara elektrostatik dengan 1 ion O²⁻ menghasilkan total muatan netral: (+2) + (-2) = 0. Oleh karena itu rumus empirisnya adalah MgO, mewakili rasio 1:1 dalam kisi kristal tak terbatas.'
  },
  {
    id: 'cscl',
    name: 'Sesium Klorida',
    formula: 'CsCl',
    cation: 'Cs⁺',
    anion: 'Cl⁻',
    cationColor: '#f59e0b',
    anionColor: '#34d399',
    cationRadius: 0.68,
    anionRadius: 0.65,
    coordinationNumber: '8 : 8 (Kubus Sederhana)',
    latticeType: 'Body-Centered Cubic Type (BCC-like)',
    meltingPoint: '645 °C',
    description: 'Karena kation Cs⁺ memiliki ukuran jari-jari ion yang jauh lebih besar (167 pm) mendekati ukuran Cl⁻ (181 pm), geometri kisi yang paling efisien bukanlah 6:6 melainkan 8:8. Dalam satu unit sel, satu ion berada di pusat kubus dan dikelilingi oleh 8 ion berlawanan muatan pada delapan sudut kubus.',
    whySimplestRatio: 'Meskipun bilangan koordinasinya 8:8 (berbeda dengan NaCl yang 6:6), perbandingan stoikiometri ion Cs⁺ (+1) terhadap Cl⁻ (-1) tetaplah 1:1 sehingga rumus empirisnya adalah CsCl.'
  }
];

export const REAL_WORLD_APPLICATIONS: RealWorldApplication[] = [
  {
    id: 'food_salt',
    title: 'Garam Dapur & Pengawetan Pangan',
    category: 'Pangan & Rumah Tangga',
    compoundName: 'Natrium Klorida (dan aditif KIO₃)',
    formula: 'NaCl',
    ions: ['Na⁺', 'Cl⁻', 'IO₃⁻ (kalium iodat pengaya)'],
    description: 'Garam dapur murni terdiri dari kisi kristal natrium klorida (NaCl). Pada garam beryodium komersial, ditambahkan sedikit kalium iodat (KIO₃) untuk mencegah gangguan tiroid dan gondok. NaCl menarik air dari mikroorganisme melalui osmosis, menjadikannya agen pengawet alami sejak ribuan tahun lalu.',
    keyRole: 'Mengatur keseimbangan osmotik sel tubuh, transmisi impuls saraf, dan penambah cita rasa pangan.',
    visualType: 'salt',
    colorTheme: '#0284c7'
  },
  {
    id: 'fertilizer',
    title: 'Pupuk Pertanian & Nutrisi Tanaman',
    category: 'Pertanian & Agrikultur',
    compoundName: 'Kalium Nitrat & Amonium Fosfat',
    formula: 'KNO₃ / (NH₄)₂HPO₄',
    ions: ['K⁺', 'NO₃⁻', 'NH₄⁺', 'HPO₄²⁻'],
    description: 'Tumbuhan tidak dapat menyerap nitrogen atau kalium dalam bentuk logam atau gas secara langsung. Mereka menyerapnya dalam bentuk ion terlarut dalam air tanah. Senyawa ionik kalium nitrat (KNO₃) sangat mudah larut dan langsung menyediakan ion K⁺ (untuk aktivasi enzim tanaman) dan ion NO₃⁻ (untuk sintesis protein dan klorofil).',
    keyRole: 'Menyediakan unsur hara esensial N, P, dan K yang larut air untuk produktivitas pertanian pangan global.',
    visualType: 'fertilizer',
    colorTheme: '#059669'
  },
  {
    id: 'construction',
    title: 'Bahan Konstruksi & Semen',
    category: 'Infrastruktur & Geologi',
    compoundName: 'Kalsium Karbonat & Kalsium Oksida',
    formula: 'CaCO₃ / CaO',
    ions: ['Ca²⁺', 'CO₃²⁻', 'O²⁻'],
    description: 'Batu kapur (limestone) dan marmer tersusun dari kristal kalsium karbonat (CaCO₃). Ketika dipanaskan pada suhu tinggi di industri semen, CaCO₃ terdekomposisi menjadi kalsium oksida (CaO, kapur tohor). Pencampuran dengan silika dan air membentuk ikatan hidrasi kristal yang sangat kokoh dalam beton.',
    keyRole: 'Bahan baku utama semen Portland, beton bangunan, jembatan, dan jalan raya modern.',
    visualType: 'construction',
    colorTheme: '#d97706'
  },
  {
    id: 'ceramics',
    title: 'Keramik & Pelapis Refraktori Suhu Tinggi',
    category: 'Material Maju & Industri',
    compoundName: 'Magnesium Oksida (Magnesia)',
    formula: 'MgO',
    ions: ['Mg²⁺', 'O²⁻'],
    description: 'Karena memiliki energi kisi yang sangat tinggi berkat muatan ionik ganda (+2 dan -2) serta ikatan elektrostatik yang luar biasa rapat, magnesium oksida memiliki titik leleh mencapai 2.852 °C. Sifat ini menjadikannya batu bata tahan api (refractory bricks) untuk melapisi tungku peleburan baja dan reaktor industri.',
    keyRole: 'Material tahan api ekstrem yang menjaga struktur tungku metalurgi pada suhu ribuan derajat Celsius.',
    visualType: 'ceramic',
    colorTheme: '#dc2626'
  },
  {
    id: 'battery',
    title: 'Elektrolit Baterai & Sistem Elektrokimia',
    category: 'Energi Terbarukan & Gadget',
    compoundName: 'Litium Heksafluorofosfat / Garam Ionik',
    formula: 'LiPF₆ / LiClO₄',
    ions: ['Li⁺', 'PF₆⁻', 'ClO₄⁻'],
    description: 'Baterai smartphone dan kendaraan listrik bekerja berdasarkan pergerakan ion litium (Li⁺) bolak-balik antara anoda dan katoda melalui larutan elektrolit ionik. Elektrolit ini harus mampu menghantarkan kation bermuatan tanpa menghantarkan elektron bebas di dalam sel (yang akan menyebabkan korsleting).',
    keyRole: 'Memungkinkan perpindahan muatan ionik internal selama proses pengisian (charging) dan pengosongan daya (discharging).',
    visualType: 'battery',
    colorTheme: '#7c3aed'
  },
  {
    id: 'water_treatment',
    title: 'Pengolahan Air Bersih & Reagen Laboratorium',
    category: 'Kesehatan Lingkungan',
    compoundName: 'Kalsium Klorida & Aluminium Sulfat',
    formula: 'CaCl₂ / Al₂(SO₄)₃',
    ions: ['Ca²⁺', 'Al³⁺', 'Cl⁻', 'SO₄²⁻'],
    description: 'Dalam instalasi pengolahan air minum, garam ionik aluminium sulfat atau kalsium klorida dilarutkan ke dalam air baku. Ion Al³⁺ dan Ca²⁺ yang bermuatan positif tinggi menetralkan muatan negatif partikel lumpur dan koloid tersuspensi, menyebabkan partikel menggumpal (flokulasi) dan mengendap dengan cepat.',
    keyRole: 'Menjernihkan air keruh dan mengikat kotoran mikroba sehingga layak menjadi air minum higienis.',
    visualType: 'watertreatment',
    colorTheme: '#0891b2'
  }
];

// Exactly 10 questions.
// Q1-Q3: True/False (1 pt each = 3 pts)
// Q4-Q7: Multiple Correct Answers (MCMA) with 5 options (2 pts each = 8 pts)
// Q8-Q10: Essay questions with clear model answers and 3-point self-assessment rubrics (3 pts each = 9 pts)
// TOTAL SCORE = 3 + 8 + 9 = 20 POINTS EXACTLY!
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'tf',
    title: 'Soal 1: Konsep Dasar Ikatan Ionik',
    question: 'Ikatan ionik pada dasarnya merupakan gaya tarik-menarik elektrostatik antara ion-ion yang berlawanan muatan (kation dan anion) yang tersusun dalam kisi kristal 3 dimensi.',
    points: 1,
    tfCorrect: true,
    explanation: 'BENAR. Ikatan ionik terjadi karena gaya elektrostatik (hukum Coulomb) antara kation bermuatan positif dan anion bermuatan negatif, membentuk kisi kristal makroskopis yang berulang.'
  },
  {
    id: 2,
    type: 'tf',
    title: 'Soal 2: Konduktivitas Padatan Ionik',
    question: 'Kristal garam dapur (NaCl) dalam wujud padat pada suhu ruang dapat menghantarkan arus listrik dengan sangat baik karena kaya akan ion Na⁺ dan Cl⁻.',
    points: 1,
    tfCorrect: false,
    explanation: 'SALAH. Meskipun padatan NaCl tersusun dari ion-ion bermuatan, ion-ion tersebut terikat sangat kaku pada posisi kisi kristal dan tidak dapat bergerak bebas. Akibatnya, padatan ionik adalah isolator listrik yang buruk pada kondisi normal. NaCl baru menghantarkan listrik saat dilarutkan dalam air atau dilelehkan.'
  },
  {
    id: 3,
    type: 'tf',
    title: 'Soal 3: Rumus Kimia vs Molekul',
    question: 'Rumus kimia NaCl menunjukkan bahwa senyawa tersebut tersusun atas molekul-molekul terpisah yang masing-masing terdiri dari satu atom Na terikat pada satu atom Cl.',
    points: 1,
    tfCorrect: false,
    explanation: 'SALAH. Senyawa ionik tidak terdiri atas molekul individual yang terisolasi. Padatan ionik adalah kisi kristal kontinu tak terbatas. Rumus kimia NaCl adalah rumus empiris yang menyatakan rasio stoikiometri paling sederhana antara ion Na⁺ dan Cl⁻ (yaitu 1 : 1) agar muatan total bernilai netral.'
  },
  {
    id: 4,
    type: 'mcma',
    title: 'Soal 4: Pembentukan Kation dan Anion (Pilihan Ganda Kompleks)',
    question: 'Pilihlah SEMUA pernyataan yang BENAR mengenai proses transfer elektron dan pembentukan ion berikut ini (Pilih semua opsi yang valid):',
    points: 2,
    options: [
      'Atom Magnesium (Z=12) cenderung melepaskan 2 elektron valensi untuk membentuk kation Mg²⁺ dengan konfigurasi stabil 2, 8.',
      'Atom Oksigen (Z=8) menerima 2 elektron untuk membentuk ion oksida O²⁻ dengan konfigurasi kulit terluar oktet.',
      'Atom Klorin (Z=17) melepaskan 7 elektron valensinya agar stabil membentuk kation Cl⁷⁺ pada pembentukan garam dapur biasa.',
      'Kation selalu bermuatan positif karena jumlah proton di dalam inti lebih banyak daripada jumlah elektron di kulitnya.',
      'Anion selalu bermuatan negatif karena atom netral telah menangkap satu atau lebih elektron ekstra.'
    ],
    correctOptions: [0, 1, 3, 4],
    explanation: 'Opsi 1, 2, 4, dan 5 BENAR. Opsi 3 SALAH karena klorin memiliki afinitas elektron yang sangat tinggi dan energi ionisasi yang besar, sehingga klorin menangkap 1 elektron membentuk anion Cl⁻, bukan melepaskan 7 elektron.'
  },
  {
    id: 5,
    type: 'mcma',
    title: 'Soal 5: Sifat Fisik Senyawa Ionik (Pilihan Ganda Kompleks)',
    question: 'Manakah karakteristik berikut yang secara umum dimiliki oleh senyawa ionik? (Pilih semua opsi yang valid):',
    points: 2,
    options: [
      'Memiliki titik leleh dan titik didih yang relatif tinggi karena kuatnya gaya tarik elektrostatik antarion dalam kisi.',
      'Bersifat keras namun rapuh (brittle) bila dikenai gaya mekanik geser.',
      'Dapat menghantarkan arus listrik ketika berada dalam fase lelehan (cair) atau dilarutkan dalam air.',
      'Selalu mudah menguap pada suhu kamar seperti alkohol dan eter.',
      'Sebagian besar larut dalam pelarut polar seperti air melalui proses solvasi/hidrasi ion.'
    ],
    correctOptions: [0, 1, 2, 4],
    explanation: 'Opsi 1, 2, 3, dan 5 BENAR. Opsi 4 SALAH karena ikatan ionik sangat kuat dan energi kisi tinggi, sehingga senyawa ionik tidak mudah menguap (titik didih sangat tinggi di atas ratusan hingga ribuan derajat Celsius).'
  },
  {
    id: 6,
    type: 'mcma',
    title: 'Soal 6: Analisis Diagram Transfer Elektron & Kenetralan Muatan (Pilihan Ganda Kompleks)',
    diagramType: 'transfer',
    question: 'Ketika kalsium (Ca, elektron valensi = 2) bereaksi dengan klorin (Cl, elektron valensi = 7), pernyataan manakah yang BENAR mengenai pembentukan CaCl₂? (Pilih semua opsi yang valid):',
    points: 2,
    options: [
      'Satu atom kalsium memberikan 2 elektron valensinya, masing-masing 1 elektron kepada dua atom klorin yang berbeda.',
      'Terbentuk satu kation Ca²⁺ dan dua anion Cl⁻.',
      'Total muatan kation (+2) seimbang dengan total muatan anion (2 × -1 = -2), sehingga muatan bersih senyawa bernilai 0 (netral).',
      'Rumus kimia senyawa yang terbentuk ditulis sebagai Ca₂Cl karena kalsium melepaskan 2 elektron.',
      'Ion Ca²⁺ dan Cl⁻ yang terbentuk keduanya memiliki konfigurasi elektron stabil yang isoelektronik dengan gas mulia Argon.'
    ],
    correctOptions: [0, 1, 2, 4],
    explanation: 'Opsi 1, 2, 3, dan 5 BENAR. Opsi 4 SALAH karena rumus kimia yang benar adalah CaCl₂ (satu ion Ca²⁺ berpasangan dengan dua ion Cl⁻), bukan Ca₂Cl.'
  },
  {
    id: 7,
    type: 'mcma',
    title: 'Soal 7: Struktur Kisi Kristal 3 Dimensi (Pilihan Ganda Kompleks)',
    diagramType: 'lattice',
    question: 'Berdasarkan model 3D kisi kristal NaCl dan MgO yang telah kamu pelajari di laboratorium, manakah pernyataan yang BENAR? (Pilih semua opsi yang valid):',
    points: 2,
    options: [
      'Dalam kisi NaCl bertipe garam batu, setiap ion Na⁺ dikelilingi oleh 6 ion Cl⁻ tetangga terdekat (bilangan koordinasi 6).',
      'Setiap ion Cl⁻ dalam kisi NaCl juga dikelilingi oleh 6 ion Na⁺ terdekat.',
      'Garis penghubung dalam model kisi 3D menggambarkan ikatan kovalen sejati yang berbagi sepasang elektron.',
      'Magnesium oksida (MgO) memiliki titik leleh jauh lebih tinggi daripada NaCl karena muatan ionnya (+2 dan -2) menghasilkan gaya tarik elektrostatik dan energi kisi yang jauh lebih besar.',
      'Kisi kristal tersusun berulang secara teratur untuk memaksimalkan gaya tarik muatan berlawanan dan meminimalkan gaya tolak muatan sejenis.'
    ],
    correctOptions: [0, 1, 3, 4],
    explanation: 'Opsi 1, 2, 3, dan 5 BENAR. Opsi 3 SALAH karena garis kisi hanyalah alat bantu visual geometris, bukan ikatan kovalen lokalisir. Ikatan ionik bersifat nondireksional (ke segala arah).'
  },
  {
    id: 8,
    type: 'essay',
    title: 'Soal 8: Esai — Mekanisme Transfer Elektron dan Pembentukan Aluminium Oksida (Al₂O₃)',
    question: 'Jelaskan bagaimana ion Al³⁺ dan O²⁻ terbentuk dari atom netralnya masing-masing berdasarkan jumlah elektron valensinya! Selanjutnya, jelaskan mengapa rumus kimia yang terbentuk harus Al₂O₃ dan bukan AlO atau Al₃O₂ berdasarkan prinsip kenetralan muatan listrik!',
    points: 3,
    modelAnswer: '1) Atom Aluminium (Al, Z=13) memiliki konfigurasi elektron 2, 8, 3 dengan 3 elektron valensi. Al melepaskan ketiga elektron ini membentuk kation Al³⁺ dengan konfigurasi stabil 2, 8 (seperti gas Neon). Atom Oksigen (O, Z=8) memiliki konfigurasi 2, 6 dengan 6 elektron valensi. O menangkap 2 elektron membentuk anion O²⁻ dengan konfigurasi stabil 2, 8.\n\n2) Agar senyawa yang terbentuk stabil dan bermuatan listrik netral (total muatan = 0), jumlah muatan positif harus tepat meniadakan muatan negatif. KPK dari muatan 3 dan 2 adalah 6. Diperlukan 2 kation Al³⁺ (total muatan: 2 × (+3) = +6) dan 3 anion O²⁻ (total muatan: 3 × (-2) = -6). Total muatan: (+6) + (-6) = 0. Rasio bilangan bulat paling sederhana adalah 2 : 3, sehingga rumus empiris yang tepat adalah Al₂O₃.',
    rubricCriteria: {
      score3: 'Siswa menjelaskan dengan tepat pembentukan Al³⁺ (lepas 3e⁻) dan O²⁻ (tangkap 2e⁻) serta menunjukkan perhitungan matematis kenetralan muatan: 2(+3) + 3(-2) = 0 sehingga rumus empiris Al₂O₃ terbukti.',
      score2: 'Siswa menyebutkan ion Al³⁺ dan O²⁻ dengan benar dan menyatakan rumus Al₂O₃ karena netral, namun penjelasan perpindahan elektron atau perhitungan muatan belum lengkap.',
      score1: 'Siswa hanya menyebutkan rumus atau hanya menjelaskan salah satu ion saja tanpa menghubungkan dengan prinsip kenetralan listrik.',
      score0: 'Jawaban salah atau tidak relevan dengan konsep ionik.'
    },
    explanation: 'Kunci konsep: Pembentukan kation dan anion berakar pada pelepasan dan penerimaan elektron valensi, sedangkan rumus empiris ditentukan mutlak oleh kondisi kenetralan muatan listrik total bernilai nol.'
  },
  {
    id: 9,
    type: 'essay',
    title: 'Soal 9: Esai — Mengapa Kristal Ionik Keras tetapi Mudah Pecah (Rapuh)?',
    question: 'Berdasarkan susunan lapisan ion dalam kisi kristal 3 dimensi, jelaskan fenomena mengapa senyawa ionik (seperti garam batu) sangat keras saat ditekan biasa, namun langsung retak atau pecah berhamburan (rapuh/brittle) ketika dipukul atau digeser dengan palu!',
    points: 3,
    modelAnswer: '1) Kristal ionik bersifat keras karena ion positif dan ion negatif tersusun berselang-seling dalam kisi 3D yang sangat teratur dan terikat oleh gaya elektrostatik yang sangat kuat ke segala arah. Menekan atau menggores kristal membutuhkan energi besar untuk mengatasi gaya tarik ini.\n\n2) Namun ketika kristal dipukul atau dikenai gaya geser (shear force), satu lapisan ion akan bergeser sejauh satu posisi ion. Akibat pergeseran ini, ion-ion yang bermuatan sejenis (kation dengan kation, anion dengan anion) yang semula berselang-seling tiba-tiba berada tepat berhadapan berdampingan.\n\n3) Hal ini menimbulkan gaya tolak-menolak elektrostatik yang sangat kuat antarion bermuatan sejenis, yang seketika membelah dan memecahkan kisi kristal sepanjang bidang geser tersebut. Itulah sebabnya kristal ionik bersifat rapuh (brittle).',
    rubricCriteria: {
      score3: 'Siswa menjelaskan dengan jelas bahwa pergeseran lapisan ion akibat gaya mekanis membuat ion bermuatan sejenis saling berhadapan, menimbulkan gaya tolak elektrostatik masif yang memecahkan kristal.',
      score2: 'Siswa menyebutkan pergeseran lapisan dan gaya tolak muatan sejenis, tetapi penjelasan mekanismenya kurang terstruktur atau tidak menyebutkan alasan kekerasan awalnya.',
      score1: 'Siswa hanya menyebutkan kristal mudah pecah karena tersusun dari garam atau tidak fleksibel tanpa menjelaskan peran tolakan muatan sejenis.',
      score0: 'Jawaban salah atau tidak menyentuh konsep susunan muatan ion.'
    },
    explanation: 'Kunci konsep: Gaya mekanik menggeser lapisan kisi kristal sehingga muatan sejenis (+ dengan +, - dengan -) berhadapan, memicu gaya tolak elektrostatik Coulomb yang memecahkan kisi kristal.'
  },
  {
    id: 10,
    type: 'essay',
    title: 'Soal 10: Esai — Analisis Hasil Eksperimen Daya Hantar Listrik',
    question: 'Di stasiun eksperimen virtual, kamu menguji daya hantar listrik dari (a) Padatan NaCl, (b) Larutan NaCl dalam air, dan (c) Lelehan NaCl pada suhu 801 °C. Jelaskan perbedaan hasil uji daya hantar listrik pada ketiga kondisi tersebut berdasarkan mobilitas partikel bermuatan (ion)!',
    points: 3,
    modelAnswer: '1) Padatan NaCl: Lampu TIDAK MENYALA (tidak menghantarkan listrik). Penjelasan: Meskipun padatan tersusun dari ion Na⁺ dan Cl⁻, ion-ion tersebut terkunci sangat rapat pada posisi kisi kristal yang kaku dan tidak memiliki mobilitas (tidak dapat bergerak bebas membawa muatan listrik).\n\n2) Larutan NaCl dalam air: Lampu MENYALA TERANG (penghantar listrik/elektrolit kuat). Penjelasan: Molekul air yang bersifat polar menghidrasi dan memisahkan kisi kristal menjadi ion-ion Na⁺(aq) dan Cl⁻(aq) yang bebas bergerak ke seluruh larutan menuju elektroda yang berlawanan muatan untuk menghantarkan arus listrik.\n\n3) Lelehan NaCl: Lampu MENYALA TERANG (menghantarkan listrik). Penjelasan: Pada suhu lelehnya (~801 °C), energi termal telah mengatasi sebagian energi kisi sehingga struktur kaku kisi kristal runtuh. Ion Na⁺(l) dan Cl⁻(l) dalam cairan lelehan dapat bergerak bebas mengalir membawa arus listrik.',
    rubricCriteria: {
      score3: 'Siswa membedakan dengan sempurna hasil konduktivitas ketiga kondisi (padatan isolator, larutan dan lelehan konduktor) dan menjelaskan secara tepat bahwa kuncinya adalah mobilitas (kebebasan gerak) ion.',
      score2: 'Siswa menyebutkan hasil ketiga kondisi dengan benar, namun penjelasan mobilitas partikel bermuatan pada salah satu kondisi masih kurang mendalam.',
      score1: 'Siswa hanya menghafal hasil lampu menyala/mati tanpa mampu mengaitkannya dengan gerak bebas ion-ion dalam cairan vs keterikatan dalam kisi padat.',
      score0: 'Jawaban salah secara ilmiah.'
    },
    explanation: 'Kunci konsep: Hantaran listrik dalam elektrolit membutuhkan dua syarat: adanya partikel bermuatan (ion) DAN partikel tersebut harus bebas bergerak (mobile). Padatan gagal memenuhi syarat mobilitas, sedangkan larutan dan lelehan memenuhinya.'
  }
];
