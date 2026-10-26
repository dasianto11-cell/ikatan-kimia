/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Flame, Zap, Droplets, Hammer, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { LabMascot } from './LabMascot';
import { sound } from '../utils/audio';

type PropertyTab = 'melting' | 'conductivity' | 'solubility' | 'mechanical';

export const PropertiesInvestigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PropertyTab>('melting');

  // Melting point simulator state
  const [temperature, setTemperature] = useState<number>(25);

  // Solubility state
  const [selectedSubstance, setSelectedSubstance] = useState<'nacl' | 'kno3' | 'agcl' | 'caco3'>('nacl');
  const [dissolved, setDissolved] = useState<boolean>(false);

  // Mechanical properties state (layer shift)
  const [shearForce, setShearForce] = useState<number>(0); // 0 to 100

  const handleTabChange = (t: PropertyTab) => {
    sound.playClick();
    setActiveTab(t);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 5 • Penyelidikan Sifat-Sifat Senyawa Ionik
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Bagaimana Sifat Senyawa Ionik?
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Sifat makroskopis senyawa ionik (titik leleh tinggi, kerapuhan, daya hantar listrik, dan kelarutan) berakar langsung pada gaya tarik elektrostatik antarion dalam kisi kristal 3 dimensi.
          </p>
        </div>

        {/* 4 Investigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-teal-200 shadow-xs">
          {[
            { id: 'melting' as PropertyTab, label: 'A. Titik Leleh', icon: Flame },
            { id: 'conductivity' as PropertyTab, label: 'B. Daya Hantar', icon: Zap },
            { id: 'solubility' as PropertyTab, label: 'C. Kelarutan', icon: Droplets },
            { id: 'mechanical' as PropertyTab, label: 'D. Sifat Mekanik', icon: Hammer },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Investigation Panel */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {/* INVESTIGATION A: MELTING POINT */}
        {activeTab === 'melting' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Simulasi Pemanasan Termal & Titik Leleh Senyawa
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Geser pengatur suhu untuk melihat perubahan wujud pada senyawa ionik vs molekuler.
                </p>
              </div>

              {/* Temperature display */}
              <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-sm">
                <Flame className={`w-4 h-4 ${temperature > 800 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
                <span className="text-xs text-slate-400 font-bold">Suhu Termal:</span>
                <span className="text-base font-black text-amber-300 font-mono">{temperature} °C</span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>0 °C (Titik Beku Air)</span>
                <span>801 °C (Titik Leleh NaCl)</span>
                <span>2.852 °C (Titik Leleh MgO)</span>
                <span>3.000 °C</span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="25"
                value={temperature}
                onChange={(e) => {
                  setTemperature(Number(e.target.value));
                  if (Number(e.target.value) % 200 === 0) sound.playClick();
                }}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Substances Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Water (H2O - Molecular) */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-700 uppercase">Senyawa Kovalen Molekuler</span>
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">
                      H₂O
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1">Air (H₂O)</h4>
                  <p className="text-xs text-slate-500">Titik Leleh: ~0 °C | Titik Didih: 100 °C</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-500 block mb-0.5">Wujud pada {temperature} °C:</span>
                  <span className={`text-base font-black ${temperature >= 100 ? 'text-amber-600' : temperature > 0 ? 'text-blue-600' : 'text-slate-600'}`}>
                    {temperature >= 100 ? 'Gas (Uap Air)' : temperature > 0 ? 'Cair (Air)' : 'Padat (Es)'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Molekul H₂O hanya diikat oleh gaya antarmolekul (ikatan hidrogen) yang relatif mudah diputus pada suhu rendah.
                </p>
              </div>

              {/* NaCl (Ionic) */}
              <div className="bg-teal-50/50 border border-teal-200 rounded-3xl p-5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-700 uppercase">Senyawa Ionik Tunggal</span>
                    <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                      NaCl
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1">Garam Dapur (NaCl)</h4>
                  <p className="text-xs text-slate-500">Titik Leleh: ~801 °C | Muatan: +1 & -1</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-teal-200 text-center">
                  <span className="text-xs font-bold text-slate-500 block mb-0.5">Wujud pada {temperature} °C:</span>
                  <span className={`text-base font-black ${temperature >= 801 ? 'text-rose-600' : 'text-teal-700'}`}>
                    {temperature >= 801 ? 'Cair (Lelehan Ionik NaCl)' : 'Padat (Kisi Kristal Utuh)'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Memerlukan suhu 801 °C untuk memberikan energi kinetik termal yang cukup guna meruntuhkan kisi kristal ion Na⁺ dan Cl⁻.
                </p>
              </div>

              {/* MgO (Ionic double charge) */}
              <div className="bg-purple-50/50 border border-purple-200 rounded-3xl p-5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700 uppercase">Senyawa Ionik Muatan Ganda</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                      MgO
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1">Magnesium Oksida (MgO)</h4>
                  <p className="text-xs text-slate-500">Titik Leleh: ~2.852 °C | Muatan: +2 & -2</p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-purple-200 text-center">
                  <span className="text-xs font-bold text-slate-500 block mb-0.5">Wujud pada {temperature} °C:</span>
                  <span className={`text-base font-black ${temperature >= 2852 ? 'text-rose-600' : 'text-purple-700'}`}>
                    {temperature >= 2852 ? 'Cair (Lelehan MgO)' : 'Padat (Sangat Stabil / Tahan Api)'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Karena ion Mg²⁺ dan O²⁻ bermuatan ganda dengan ukuran kecil, energi kisinya ~4 kali lipat NaCl, sehingga titik lelehnya mencapai 2.852 °C!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* INVESTIGATION B: ELECTRICAL CONDUCTIVITY */}
        {activeTab === 'conductivity' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">
                Mengapa Senyawa Ionik Menghantarkan Listrik dalam Wujud Tertentu?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kunci konduktivitas listrik adalah: <strong>adanya partikel bermuatan (ion) DAN partikel tersebut harus bebas bergerak (mobile)</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Solid NaCl */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                  1
                </div>
                <h4 className="font-extrabold text-slate-800">Padatan NaCl (Kristal Kering)</h4>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-bold">
                  Hasil: TIDAK Menghantarkan Listrik (Lampu Mati)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Partikel ion Na⁺ dan Cl⁻ ada banyak, tetapi <strong>terkunci rapat pada kisi kristal</strong> sehingga tidak dapat bergerak menuju elektroda.
                </p>
              </div>

              {/* Aqueous NaCl */}
              <div className="bg-teal-50 border border-teal-200 rounded-3xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-200 flex items-center justify-center text-teal-800 font-bold text-sm">
                  2
                </div>
                <h4 className="font-extrabold text-slate-800">Larutan NaCl dalam Air (Aqueous)</h4>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold">
                  Hasil: MENGHANTARKAN LISTRIK (Lampu Terang)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Molekul air memisahkan ion-ion menjadi Na⁺(aq) dan Cl⁻(aq). Ion-ion ini <strong>bebas bergerak mengalir</strong> membawa muatan listrik.
                </p>
              </div>

              {/* Molten NaCl */}
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-sm">
                  3
                </div>
                <h4 className="font-extrabold text-slate-800">Lelehan NaCl (&gt; 801 °C)</h4>
                <div className="p-3 bg-amber-100 border border-amber-300 rounded-2xl text-amber-900 text-xs font-bold">
                  Hasil: MENGHANTARKAN LISTRIK (Lampu Terang)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Suhu tinggi meruntuhkan kisi kaku sehingga ion Na⁺ dan Cl⁻ mencair dan <strong>bebas bergerak</strong> dalam fase cair tanpa bantuan pelarut air.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* INVESTIGATION C: SOLUBILITY */}
        {activeTab === 'solubility' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Kelarutan Senyawa Ionik dalam Air (Pelarut Polar)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Apakah semua senyawa ionik mudah larut dalam air? Ternyata tidak selalu!
                </p>
              </div>

              {/* Substance select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Pilih Sampel:</span>
                <select
                  value={selectedSubstance}
                  onChange={(e) => {
                    sound.playClick();
                    setSelectedSubstance(e.target.value as any);
                    setDissolved(false);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <option value="nacl">Natrium Klorida (NaCl) - Larut</option>
                  <option value="kno3">Kalium Nitrat (KNO₃) - Larut</option>
                  <option value="agcl">Perak Klorida (AgCl) - Sukar Larut</option>
                  <option value="caco3">Kalsium Karbonat (CaCO₃) - Sukar Larut</option>
                </select>
              </div>
            </div>

            {/* Dissolution Simulation Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 bg-slate-900 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[260px] text-white space-y-4">
                <div className="relative w-48 h-40 border-2 border-slate-600 rounded-b-3xl bg-sky-950/40 overflow-hidden flex flex-col justify-end p-3">
                  {/* Water liquid line */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-sky-500/20 border-t border-sky-400/30" />

                  {/* Solute particles */}
                  {!dissolved ? (
                    <div className="relative z-10 mx-auto w-16 h-8 bg-slate-300 rounded-md border border-slate-400 flex items-center justify-center text-[10px] text-slate-800 font-bold">
                      Kristal Padat
                    </div>
                  ) : (
                    <div className="relative z-10 w-full h-full flex flex-wrap items-center justify-around p-2 gap-2">
                      {selectedSubstance === 'nacl' || selectedSubstance === 'kno3' ? (
                        <>
                          <span className="w-5 h-5 rounded-full bg-sky-400 text-slate-900 flex items-center justify-center text-[9px] font-black animate-bounce">
                            +
                          </span>
                          <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[9px] font-black animate-pulse">
                            −
                          </span>
                          <span className="w-5 h-5 rounded-full bg-sky-400 text-slate-900 flex items-center justify-center text-[9px] font-black animate-bounce">
                            +
                          </span>
                          <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[9px] font-black animate-pulse">
                            −
                          </span>
                        </>
                      ) : (
                        <div className="mx-auto w-16 h-8 bg-slate-400 rounded-md flex items-center justify-center text-[9px] text-slate-900 font-bold">
                          Mengendap
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    sound.playBubble();
                    setDissolved(!dissolved);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  {dissolved ? 'Reset Kristal' : 'Larutkan dalam Air'}
                </button>
              </div>

              <div className="md:col-span-6 space-y-3 text-xs leading-relaxed">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="font-bold text-slate-500 uppercase block mb-1">Status Kelarutan:</span>
                  <span className={`text-base font-extrabold block ${
                    selectedSubstance === 'nacl' || selectedSubstance === 'kno3' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {selectedSubstance === 'nacl' && 'NaCl: Sangat Mudah Larut dalam Air (~360 g/L)'}
                    {selectedSubstance === 'kno3' && 'KNO₃: Sangat Mudah Larut dalam Air (~316 g/L)'}
                    {selectedSubstance === 'agcl' && 'AgCl: Sukar Larut (Mengendap Putih, Ksp ~1,8 × 10⁻¹⁰)'}
                    {selectedSubstance === 'caco3' && 'CaCO₃: Sukar Larut dalam Air Murni (Membentuk Endapan Kapur)'}
                  </span>
                </div>

                <p className="text-slate-600">
                  <strong>Prinsip Ilmiah:</strong> Kelarutan adalah pertempuran termodinamika antara <em>Energi Kisi (Lattice Energy)</em> yang menyatukan kristal melawan <em>Energi Hidrasi (Hydration Energy)</em> dari molekul air yang menarik ion-ion keluar. Jika energi hidrasi mampu mengimbangi energi kisi, kristal akan larut.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* INVESTIGATION D: MECHANICAL PROPERTIES (BRITTLENESS) */}
        {activeTab === 'mechanical' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">
                Mengapa Kristal Ionik Keras tetapi Mudah Pecah (Rapuh / Brittle)?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Geser palu mekanik untuk memberikan gaya geser (shear stress) pada kisi kristal.
              </p>
            </div>

            {/* Slider control */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Gaya Normal (Tanpa Gesekan)</span>
                <span className="text-rose-600">Gaya Geser Maksimal (Patah)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={shearForce}
                onChange={(e) => {
                  setShearForce(Number(e.target.value));
                  if (Number(e.target.value) > 60) sound.playSnap();
                }}
                className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Visual Crystal Cleavage Demonstration */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 bg-slate-950 p-6 rounded-3xl min-h-[260px] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Top Layer of Ions */}
                <div 
                  className="flex gap-2 transition-transform duration-200"
                  style={{ transform: `translateX(${shearForce * 0.45}px)` }}
                >
                  <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                    +
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                    −
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                    +
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                    −
                  </div>
                </div>

                {/* Cleavage crack gap */}
                <div className={`w-64 h-1 my-2 transition-all duration-300 ${
                  shearForce > 50 ? 'bg-rose-500 shadow-lg shadow-rose-500/50 scale-y-150' : 'bg-transparent'
                }`} />

                {/* Bottom Layer of Ions (Fixed) */}
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                    −
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                    +
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                    −
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                    +
                  </div>
                </div>

                {/* Repulsion Alert indicator when shifted */}
                {shearForce > 50 && (
                  <div className="absolute top-3 bg-rose-600/90 text-white px-3 py-1 rounded-full text-xs font-black animate-bounce shadow-md">
                    ⚡ TOLAKAN MUATAN SEJENIS (+ dengan +, − dengan −) ⚡
                  </div>
                )}
              </div>

              <div className="md:col-span-5 space-y-3 text-xs text-slate-700 leading-relaxed">
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl">
                  <strong className="text-rose-900 block mb-1">Mekanisme Kerapuhan (Brittleness):</strong>
                  <p>
                    Saat tidak digeser, ion berlawanan muatan saling tarik-menarik erat sehingga kristal terasa <strong>sangat keras</strong>. Namun ketika gaya geser mendorong lapisan sejauh satu posisi ion, muatan sejenis seketika berhadapan berdampingan.
                  </p>
                </div>
                <p>
                  Gaya tolak elektrostatik Coulomb yang mendadak muncul seketika <strong>membelah (cleave)</strong> kristal di sepanjang bidang geser tersebut. Itulah sebabnya garam batu mudah hancur menjadi bubuk saat diulek atau dipukul.
                </p>
              </div>
            </div>
          </div>
        )}

        <LabMascot
          mood="explaining"
          message="Perhatikan bagaimana seluruh sifat fisik senyawa ionik di atas (titik leleh, kerapuhan, daya hantar, dan kelarutan) bermuara pada satu hukum fundamental fisika: gaya tarik dan tolak elektrostatik antarion bermuatan!"
        />
      </div>
    </div>
  );
};
