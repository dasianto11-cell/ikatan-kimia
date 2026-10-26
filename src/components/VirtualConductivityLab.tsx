/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Zap, Play, Pause, RotateCcw, Eye, ShieldAlert, CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';
import { LabMascot } from './LabMascot';
import { sound } from '../utils/audio';

type SampleId = 'solid_nacl' | 'aqueous_nacl' | 'molten_nacl' | 'distilled_water';

interface ExperimentRecord {
  id: SampleId;
  name: string;
  prediction: boolean | null;
  conducts: boolean;
  ammeterCurrent: string;
  bulbBrightness: 'none' | 'bright';
  completed: boolean;
}

export const VirtualConductivityLab: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<SampleId>('aqueous_nacl');
  const [isTesting, setIsTesting] = useState(false);
  const [electrodesDipped, setElectrodesDipped] = useState(false);
  const [viewParticles, setViewParticles] = useState(true);
  const [prediction, setPrediction] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Experiment log
  const [records, setRecords] = useState<Record<SampleId, ExperimentRecord>>({
    distilled_water: {
      id: 'distilled_water',
      name: 'Air Suling (Aquadest H₂O Murni)',
      prediction: null,
      conducts: false,
      ammeterCurrent: '0.00 mA',
      bulbBrightness: 'none',
      completed: false
    },
    solid_nacl: {
      id: 'solid_nacl',
      name: 'Padatan Natrium Klorida (NaCl Padat)',
      prediction: null,
      conducts: false,
      ammeterCurrent: '0.00 mA',
      bulbBrightness: 'none',
      completed: false
    },
    aqueous_nacl: {
      id: 'aqueous_nacl',
      name: 'Larutan Natrium Klorida dalam Air (NaCl aq)',
      prediction: null,
      conducts: true,
      ammeterCurrent: '142.5 mA',
      bulbBrightness: 'bright',
      completed: false
    },
    molten_nacl: {
      id: 'molten_nacl',
      name: 'Lelehan Natrium Klorida (> 801 °C)',
      prediction: null,
      conducts: true,
      ammeterCurrent: '185.0 mA',
      bulbBrightness: 'bright',
      completed: false
    }
  });

  const currentRecord = records[selectedSample];

  const handleStartTest = () => {
    sound.playClick();
    setIsTesting(true);
    setElectrodesDipped(true);

    // Simulate connection delay
    setTimeout(() => {
      if (currentRecord.conducts) {
        sound.playElectricHum();
      } else {
        sound.playClick();
      }
      setShowExplanation(true);

      // Update log
      setRecords((prev) => ({
        ...prev,
        [selectedSample]: {
          ...prev[selectedSample],
          prediction: prediction,
          completed: true
        }
      }));
    }, 800);
  };

  const handleReset = () => {
    sound.playClick();
    setIsTesting(false);
    setElectrodesDipped(false);
    setShowExplanation(false);
    setPrediction(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 6 • Eksperimen Virtual Daya Hantar Listrik
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Dapatkah Senyawa Ionik Menghantarkan Listrik?
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Lakukan penyelidikan laboratorium virtual untuk menguji konduktivitas listrik pada sampel padatan, larutan, dan lelehan senyawa ionik dengan alat uji elektrolit.
          </p>
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Eksperimen</span>
        </button>
      </div>

      {/* Main Virtual Lab Apparatus Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Test Rig (Beaker, Electrodes, Lamp, Battery, Ammeter) */}
        <div className="lg:col-span-8 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Subtle laboratory glow background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Apparatus Status Bar: Battery, Circuit Switch, Ammeter, Lamp */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-white">
            {/* Battery / Power Source */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-7 rounded-md bg-amber-600 border border-amber-400 flex items-center justify-center font-mono font-bold text-[11px] shadow">
                9V DC
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block font-semibold">Catu Daya</span>
                <span className="font-bold text-slate-200">Baterai 9V</span>
              </div>
            </div>

            {/* Digital Ammeter */}
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">
              <Zap className="w-4 h-4 text-amber-400" />
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase">Arus Terukur</span>
                <span className={`text-base font-extrabold ${electrodesDipped && currentRecord.conducts ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {electrodesDipped ? currentRecord.ammeterCurrent : '0.00 mA'}
                </span>
              </div>
            </div>

            {/* Light Bulb */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                {/* Glow ring */}
                {electrodesDipped && currentRecord.conducts && (
                  <div className="absolute w-12 h-12 rounded-full bg-amber-400/30 blur-md animate-pulse" />
                )}
                {/* Bulb SVG */}
                <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow">
                  <path
                    d="M9 21h6m-4 0v-2m-2-2h6m-7-5a5 5 0 118 0c-.8 1-1.5 2-1.5 4h-5c0-2-.7-3-1.5-4z"
                    fill={electrodesDipped && currentRecord.conducts ? '#facc15' : '#475569'}
                    stroke={electrodesDipped && currentRecord.conducts ? '#fbbf24' : '#64748b'}
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block font-semibold">Lampu Indikator</span>
                <span className={`font-bold ${electrodesDipped && currentRecord.conducts ? 'text-amber-300' : 'text-slate-500'}`}>
                  {electrodesDipped ? (currentRecord.conducts ? 'Menyala Terang' : 'Mati / Tidak Menyala') : 'Siap Diuji'}
                </span>
              </div>
            </div>

            {/* Particle view toggle button */}
            <button
              onClick={() => {
                sound.playClick();
                setViewParticles(!viewParticles);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewParticles ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Mikroskopis: {viewParticles ? 'Aktif' : 'Nonaktif'}</span>
            </button>
          </div>

          {/* Central Lab Scene: Beaker with Electrodes & Moving Particles */}
          <div className="relative h-64 flex flex-col items-center justify-end">
            {/* Hanging Electrodes & Connecting Wires */}
            <div className="absolute top-0 inset-x-0 flex justify-center gap-16 pointer-events-none">
              {/* Positive electrode wire */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-16 bg-red-500" />
                <div className={`w-3.5 rounded-t-sm bg-neutral-800 border border-neutral-600 transition-all duration-700 ${
                  electrodesDipped ? 'h-36 translate-y-6' : 'h-24'
                }`}>
                  <span className="text-[8px] text-red-400 font-bold block text-center mt-1">+</span>
                </div>
              </div>

              {/* Negative electrode wire */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-16 bg-blue-500" />
                <div className={`w-3.5 rounded-t-sm bg-neutral-800 border border-neutral-600 transition-all duration-700 ${
                  electrodesDipped ? 'h-36 translate-y-6' : 'h-24'
                }`}>
                  <span className="text-[8px] text-blue-400 font-bold block text-center mt-1">−</span>
                </div>
              </div>
            </div>

            {/* Glass Beaker / Container */}
            <div className="relative w-64 h-48 border-4 border-t-0 border-slate-500/60 rounded-b-3xl bg-slate-900/60 backdrop-blur-xs overflow-hidden flex flex-col justify-end p-2 shadow-2xl">
              {/* Liquid fill */}
              <div className={`w-full transition-all duration-500 rounded-b-2xl relative overflow-hidden ${
                selectedSample === 'distilled_water'
                  ? 'h-36 bg-sky-500/20'
                  : selectedSample === 'aqueous_nacl'
                  ? 'h-36 bg-teal-500/30'
                  : selectedSample === 'molten_nacl'
                  ? 'h-32 bg-amber-500/40 border-t-2 border-amber-400 animate-pulse'
                  : 'h-28 bg-slate-300/40 border-t border-slate-400'
              }`}>
                {/* Surface line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-white/30" />

                {/* Sub-microscopic Particle Animation */}
                {viewParticles && (
                  <div className="w-full h-full flex flex-wrap items-center justify-around p-2">
                    {selectedSample === 'solid_nacl' && (
                      <div className="w-full h-full flex flex-col items-center justify-center space-y-1">
                        <div className="grid grid-cols-5 gap-1.5 p-2 bg-slate-800/80 rounded-xl border border-slate-700">
                          {Array.from({ length: 15 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${
                                idx % 2 === 0 ? 'bg-sky-400 text-slate-900' : 'bg-emerald-400 text-slate-900'
                              }`}
                            >
                              {idx % 2 === 0 ? '+' : '−'}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] text-amber-300 font-bold">
                          Ion Terkunci Kaku di Kisi (Tidak Bebas Bergerak)
                        </span>
                      </div>
                    )}

                    {selectedSample === 'aqueous_nacl' && (
                      <div className="w-full h-full relative">
                        {/* Moving solvated ions */}
                        {Array.from({ length: 8 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`absolute rounded-full flex items-center justify-center font-black shadow-md ${
                              idx % 2 === 0
                                ? 'w-5 h-5 bg-sky-400 text-slate-950 text-[9px]'
                                : 'w-6 h-6 bg-emerald-400 text-slate-950 text-[10px]'
                            } ${electrodesDipped ? 'animate-bounce' : ''}`}
                            style={{
                              left: `${(idx * 22) % 80 + 10}%`,
                              top: `${(idx * 28) % 70 + 15}%`,
                            }}
                          >
                            {idx % 2 === 0 ? 'Na⁺' : 'Cl⁻'}
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedSample === 'molten_nacl' && (
                      <div className="w-full h-full relative">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`absolute rounded-full flex items-center justify-center font-black ${
                              idx % 2 === 0
                                ? 'w-5 h-5 bg-amber-400 text-slate-950 text-[9px]'
                                : 'w-6 h-6 bg-rose-400 text-slate-950 text-[10px]'
                            } ${electrodesDipped ? 'animate-ping' : ''}`}
                            style={{
                              left: `${(idx * 19) % 85 + 5}%`,
                              top: `${(idx * 24) % 75 + 10}%`,
                            }}
                          >
                            {idx % 2 === 0 ? 'Na⁺' : 'Cl⁻'}
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedSample === 'distilled_water' && (
                      <div className="w-full h-full flex items-center justify-center text-center p-2">
                        <span className="text-xs text-slate-300 font-medium">
                          Hampir tidak ada ion bebas (H₂O murni praktis non-konduktif)
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Beaker Volume Label */}
              <div className="text-[10px] text-slate-400 font-mono text-center pt-1">
                250 mL Pyrex Beaker
              </div>
            </div>
          </div>

          {/* Workbench Controls & Sample Switcher */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            {/* Sample Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Pilih Sampel:</span>
              {(['distilled_water', 'solid_nacl', 'aqueous_nacl', 'molten_nacl'] as SampleId[]).map((sId) => {
                const isSelected = selectedSample === sId;
                const rec = records[sId];
                return (
                  <button
                    key={sId}
                    onClick={() => {
                      sound.playClick();
                      setSelectedSample(sId);
                      handleReset();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {sId === 'distilled_water' && 'Air Suling'}
                    {sId === 'solid_nacl' && 'NaCl Padat'}
                    {sId === 'aqueous_nacl' && 'NaCl Larutan'}
                    {sId === 'molten_nacl' && 'NaCl Lelehan (801°C)'}
                  </button>
                );
              })}
            </div>

            {/* Test Action Trigger */}
            <button
              onClick={handleStartTest}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>CELUPKAN ELEKTRODA & UJI</span>
            </button>
          </div>
        </div>

        {/* Right Column: Prediction Step, Explanation & Experiment Log */}
        <div className="lg:col-span-4 space-y-4">
          {/* Pre-Experiment Prediction Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Langkah 1: Ajukan Prediksimu!
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Apakah sampel <strong>{currentRecord.name}</strong> akan menghantarkan arus listrik?
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setPrediction(true);
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  prediction === true
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ya, Menghantar</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setPrediction(false);
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  prediction === false
                    ? 'bg-rose-100 border-rose-400 text-rose-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Tidak Menghantar</span>
              </button>
            </div>
          </div>

          {/* Scientific Explanation after test */}
          {showExplanation && (
            <div className="bg-teal-50 border-2 border-teal-200 rounded-3xl p-5 space-y-3 animate-in zoom-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 uppercase flex items-center gap-1">
                  <Info className="w-4 h-4 text-teal-600" />
                  Hasil Pengamatan & Penjelasan
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                  currentRecord.conducts ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-white'
                }`}>
                  {currentRecord.conducts ? 'KONDUKTOR' : 'ISOLATOR'}
                </span>
              </div>

              <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                {selectedSample === 'solid_nacl' && (
                  <p>
                    <strong>NaCl Padat:</strong> Lampu tidak menyala dan ammeter membaca 0.00 mA. Walaupun padatan kaya akan ion Na⁺ dan Cl⁻, ion-ion tersebut <strong>terkunci rapat pada kisi kristal</strong> sehingga tidak dapat mengalir membawa muatan.
                  </p>
                )}
                {selectedSample === 'aqueous_nacl' && (
                  <p>
                    <strong>NaCl Larutan:</strong> Lampu menyala terang dan arus terukur 142.5 mA! Molekul air melarutkan kisi kristal menjadi ion Na⁺ dan Cl⁻ yang <strong>bebas bergerak mengalir</strong> menuju anoda dan katoda.
                  </p>
                )}
                {selectedSample === 'molten_nacl' && (
                  <p>
                    <strong>NaCl Lelehan:</strong> Pada suhu lelehnya (&gt; 801 °C), kisi kristal runtuh oleh energi termal sehingga ion-ion dalam cairan lelehan <strong>bebas bergerak</strong> menghantarkan arus listrik tanpa air.
                  </p>
                )}
                {selectedSample === 'distilled_water' && (
                  <p>
                    <strong>Air Suling:</strong> Air murni praktis tidak menghantarkan listrik karena derajat ionisasi H₂O sangat kecil sekali (~10⁻⁷ M).
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Safety Notice per prompt requirements */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 flex items-start gap-2.5 text-xs text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Pemberitahuan Keselamatan Lab:</strong> Eksperimen lelehan garam memerlukan suhu ekstrem (&gt; 800 °C) dan hanya dilakukan dalam simulasi digital ini. Di laboratorium nyata, praktikum daya hantar listrik dilakukan menggunakan larutan encer di bawah pengawasan guru.
            </div>
          </div>

          <LabMascot
            mood="explaining"
            message="Ingat kunci utamanya: Agar dapat menghantarkan arus listrik, bahan harus memiliki partikel bermuatan (ion) DAN partikel tersebut harus bebas bergerak!"
          />
        </div>
      </div>

      {/* Observation Log Table */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
          Tabel Log Hasil Pengamatan Laboratorium
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">Nama Sampel</th>
                <th className="p-3">Prediksi Siswa</th>
                <th className="p-3">Hasil Uji Lampu</th>
                <th className="p-3">Arus Listrik</th>
                <th className="p-3">Status Mobilitas Ion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.values(records).map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold text-slate-800">{rec.name}</td>
                  <td className="p-3">
                    {rec.prediction === null ? (
                      <span className="text-slate-400">Belum diprediksi</span>
                    ) : rec.prediction ? (
                      <span className="text-emerald-600 font-bold">Menghantar</span>
                    ) : (
                      <span className="text-rose-600 font-bold">Tidak menghantar</span>
                    )}
                  </td>
                  <td className="p-3">
                    {rec.completed ? (
                      rec.conducts ? (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                          Menyala Terang
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-bold">
                          Mati / Padam
                        </span>
                      )
                    ) : (
                      <span className="text-slate-400">Belum diuji</span>
                    )}
                  </td>
                  <td className="p-3 font-mono font-bold">
                    {rec.completed ? rec.ammeterCurrent : '—'}
                  </td>
                  <td className="p-3">
                    {rec.id === 'solid_nacl' && 'Ion terkunci kaku pada kisi'}
                    {rec.id === 'aqueous_nacl' && 'Ion terhidrasi bebas bergerak'}
                    {rec.id === 'molten_nacl' && 'Ion lelehan bebas bergerak'}
                    {rec.id === 'distilled_water' && 'Tidak ada ion bebas signifikan'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
