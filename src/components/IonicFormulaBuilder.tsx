/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CATIONS, ANIONS } from '../data/chemistryData';
import { Ion } from '../types/chemistry';
import { LabMascot } from './LabMascot';
import { Plus, Minus, RotateCcw, CheckCircle2, AlertCircle, Sparkles, Scale, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const IonicFormulaBuilder: React.FC = () => {
  const [selectedCation, setSelectedCation] = useState<Ion>(CATIONS[0]); // Na+
  const [selectedAnion, setSelectedAnion] = useState<Ion>(ANIONS[0]); // Cl-
  const [cationCount, setCationCount] = useState<number>(1);
  const [anionCount, setAnionCount] = useState<number>(1);

  // Challenges list
  const challenges = [
    { name: 'Natrium Klorida (Garam Dapur)', targetCation: 'na_plus', targetAnion: 'cl_minus', targetC: 1, targetA: 1, formula: 'NaCl' },
    { name: 'Magnesium Klorida', targetCation: 'mg_2plus', targetAnion: 'cl_minus', targetC: 1, targetA: 2, formula: 'MgCl₂' },
    { name: 'Aluminium Oksida (Alumina)', targetCation: 'al_3plus', targetAnion: 'o_2minus', targetC: 2, targetA: 3, formula: 'Al₂O₃' },
    { name: 'Kalsium Oksida (Kapur Tohor)', targetCation: 'ca_2plus', targetAnion: 'o_2minus', targetC: 1, targetA: 1, formula: 'CaO' },
    { name: 'Kalium Sulfida', targetCation: 'k_plus', targetAnion: 's_2minus', targetC: 2, targetA: 1, formula: 'K₂S' },
  ];

  const totalPositive = cationCount * selectedCation.charge;
  const totalNegative = anionCount * selectedAnion.charge;
  const netCharge = totalPositive + totalNegative;
  const isNeutral = netCharge === 0;

  // Calculate greatest common divisor to check simplest ratio
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const getEmpiricalFormula = () => {
    if (!isNeutral) return null;
    const factor = gcd(cationCount, anionCount);
    const simpC = cationCount / factor;
    const simpA = anionCount / factor;

    // Symbol cleanup (e.g. Na+ -> Na, Cl- -> Cl)
    const cSymbol = selectedCation.symbol.replace(/[⁺\d]/g, '');
    const aSymbol = selectedAnion.symbol.replace(/[⁻\d]/g, '');

    const cSub = simpC === 1 ? '' : simpC === 2 ? '₂' : simpC === 3 ? '₃' : `${simpC}`;
    const aSub = simpA === 1 ? '' : simpA === 2 ? '₂' : simpA === 3 ? '₃' : `${simpA}`;

    return `${cSymbol}${cSub}${aSymbol}${aSub}`;
  };

  const handleReset = () => {
    sound.playClick();
    setCationCount(1);
    setAnionCount(1);
  };

  const loadChallenge = (ch: typeof challenges[0]) => {
    sound.playBubble();
    const c = CATIONS.find((cat) => cat.id === ch.targetCation);
    const a = ANIONS.find((an) => an.id === ch.targetAnion);
    if (c) setSelectedCation(c);
    if (a) setSelectedAnion(a);
    setCationCount(1);
    setAnionCount(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 3 • Rakit Senyawa Ionik
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Rakit Senyawa & Seimbangkan Muatan!
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Kombinasikan kation positif dan anion negatif pada neraca muatan virtual. Senyawa ionik yang stabil harus memiliki total muatan listrik sama dengan nol (netral).
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Komposisi</span>
        </button>
      </div>

      {/* Preset Challenges Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Tantangan Cepat:
        </span>
        {challenges.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => loadChallenge(ch)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-teal-50 hover:border-teal-300 border border-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            {ch.name} ({ch.formula})
          </button>
        ))}
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Ion Selection Library */}
        <div className="lg:col-span-5 space-y-4">
          {/* Cations Selection */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                1. Pilih Kation (Ion Positif +)
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">Pelepas Elektron</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATIONS.map((c) => {
                const isSelected = selectedCation.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCation(c);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 shadow-sm'
                        : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-lg font-black text-sky-800">{c.symbol}</span>
                    <span className="text-xs font-semibold text-slate-700">{c.name}</span>
                    <span className="text-[10px] text-sky-600 font-bold mt-0.5">Muatan: {c.chargeString}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Anions Selection */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                2. Pilih Anion (Ion Negatif −)
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">Penangkap Elektron</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ANIONS.map((a) => {
                const isSelected = selectedAnion.id === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedAnion(a);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                        : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-lg font-black text-emerald-800">{a.symbol}</span>
                    <span className="text-xs font-semibold text-slate-700">{a.name}</span>
                    <span className="text-[10px] text-emerald-600 font-bold mt-0.5">Muatan: {a.chargeString}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <LabMascot
            mood={isNeutral ? 'happy' : 'thinking'}
            message={
              isNeutral
                ? `Hebat! Jumlah muatan positif (${totalPositive > 0 ? '+' + totalPositive : totalPositive}) dan muatan negatif (${totalNegative}) saling meniadakan menjadi 0! Rumus empirisnya adalah ${getEmpiricalFormula()}.`
                : `Perhatikan muatan bersihnya: ${netCharge > 0 ? '+' + netCharge : netCharge}. Muatan belum seimbang! Ubah jumlah kation atau anion hingga total muatan menjadi 0.`
            }
          />
        </div>

        {/* Right: Virtual Balance & Empirical Formula Box */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
          {/* Counters and Visual Ion Flasks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cation Plate */}
            <div className="bg-sky-50/60 border border-sky-200 rounded-3xl p-5 flex flex-col items-center text-center space-y-3">
              <span className="text-xs font-extrabold text-sky-800 uppercase">Piringan Kation (+)</span>
              <div className="w-16 h-16 rounded-full bg-sky-500 text-white flex flex-col items-center justify-center shadow-md">
                <span className="text-xl font-black">{selectedCation.symbol}</span>
              </div>
              <div className="text-xs text-slate-600">
                <strong className="text-slate-800">{selectedCation.name}</strong>
                <span className="block text-sky-700 font-bold font-mono">
                  {selectedCation.chargeString} per ion
                </span>
              </div>

              {/* Counter Controls */}
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border border-sky-200 shadow-xs">
                <button
                  onClick={() => {
                    if (cationCount > 1) {
                      sound.playClick();
                      setCationCount(cationCount - 1);
                    }
                  }}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold cursor-pointer disabled:opacity-40"
                  disabled={cationCount <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-black text-slate-800 w-6">{cationCount}</span>
                <button
                  onClick={() => {
                    if (cationCount < 6) {
                      sound.playBubble();
                      setCationCount(cationCount + 1);
                    }
                  }}
                  className="w-8 h-8 rounded-xl bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white font-bold cursor-pointer disabled:opacity-40"
                  disabled={cationCount >= 6}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-bold text-sky-900 bg-sky-100/80 px-3 py-1 rounded-full">
                Total Muatan (+): +{totalPositive}
              </div>
            </div>

            {/* Anion Plate */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-5 flex flex-col items-center text-center space-y-3">
              <span className="text-xs font-extrabold text-emerald-800 uppercase">Piringan Anion (−)</span>
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex flex-col items-center justify-center shadow-md">
                <span className="text-xl font-black">{selectedAnion.symbol}</span>
              </div>
              <div className="text-xs text-slate-600">
                <strong className="text-slate-800">{selectedAnion.name}</strong>
                <span className="block text-emerald-700 font-bold font-mono">
                  {selectedAnion.chargeString} per ion
                </span>
              </div>

              {/* Counter Controls */}
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border border-emerald-200 shadow-xs">
                <button
                  onClick={() => {
                    if (anionCount > 1) {
                      sound.playClick();
                      setAnionCount(anionCount - 1);
                    }
                  }}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold cursor-pointer disabled:opacity-40"
                  disabled={anionCount <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-black text-slate-800 w-6">{anionCount}</span>
                <button
                  onClick={() => {
                    if (anionCount < 6) {
                      sound.playBubble();
                      setAnionCount(anionCount + 1);
                    }
                  }}
                  className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white font-bold cursor-pointer disabled:opacity-40"
                  disabled={anionCount >= 6}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-bold text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-full">
                Total Muatan (−): {totalNegative}
              </div>
            </div>
          </div>

          {/* Virtual Balance Indicator */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white text-center space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                Indikator Neraca Muatan Listrik
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                isNeutral ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}>
                {isNeutral ? 'SEIMBANG (NETRAL)' : 'TIDAK SEIMBANG'}
              </span>
            </div>

            {/* Charge Meter visualization */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-sm font-mono text-slate-300">
                ({totalPositive > 0 ? `+${totalPositive}` : totalPositive}) + ({totalNegative}) ={' '}
                <span className={`font-black text-xl ${isNeutral ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {netCharge > 0 ? `+${netCharge}` : netCharge}
                </span>
              </div>

              {/* Graphical Balance beam tilt */}
              <div className="relative w-64 h-12 flex items-center justify-center">
                <div 
                  className="w-48 h-2 rounded-full bg-slate-700 transition-transform duration-500"
                  style={{
                    transform: `rotate(${Math.min(25, Math.max(-25, netCharge * 6))}deg)`
                  }}
                >
                  {/* Left weight */}
                  <div className="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white shadow">
                    +{totalPositive}
                  </div>
                  {/* Right weight */}
                  <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white shadow">
                    {totalNegative}
                  </div>
                </div>
                {/* Fulcrum base */}
                <div className="absolute bottom-0 w-6 h-5 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-slate-600" />
              </div>
            </div>

            {/* Formula Generated */}
            {isNeutral ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 animate-in zoom-in duration-300 space-y-1">
                <span className="text-[11px] text-emerald-300 uppercase tracking-wider font-bold">
                  Rumus Empiris yang Dihasilkan:
                </span>
                <div className="text-3xl font-black text-white tracking-wide">
                  {getEmpiricalFormula()}
                </div>
                <p className="text-xs text-emerald-200/90 pt-1">
                  Rasio kation {selectedCation.name} terhadap anion {selectedAnion.name} adalah {cationCount} : {anionCount}.
                </p>
              </div>
            ) : (
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  Muatan belum seimbang (selisih {Math.abs(netCharge)}). Tambahkan atau kurangi ion agar total muatan listrik bernilai 0.
                </span>
              </div>
            )}
          </div>

          {/* Shortcut note: Criss-Cross vs Fundamentals */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <strong className="text-slate-800 block text-xs flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              Metode Silang (Criss-Cross Shortcut) vs Prinsip Hakiki
            </strong>
            <p className="leading-relaxed">
              Metode silang (menukar angka muatan ion menjadi indeks senyawa) adalah jalan pintas praktis untuk menentukan rumus kimia. Namun ingat: <strong>prinsip hakikinya adalah kenetralan muatan listrik</strong> dan rasio bilangan bulat paling sederhana. Pada CaO, muatan (+2) dan (-2) seimbang dengan rasio 1:1, sehingga ditulis CaO, bukan Ca₂O₂.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
