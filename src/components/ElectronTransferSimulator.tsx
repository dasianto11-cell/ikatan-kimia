/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, Sparkles, CheckCircle2, Info, Atom, Zap } from 'lucide-react';
import { LabMascot } from './LabMascot';
import { sound } from '../utils/audio';

type SimType = 'nacl' | 'mgo' | 'cacl2';

export const ElectronTransferSimulator: React.FC = () => {
  const [selectedSim, setSelectedSim] = useState<SimType>('nacl');
  const [stage, setStage] = useState<'initial' | 'highlighting' | 'transferring' | 'attracting' | 'complete'>('initial');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfig, setShowConfig] = useState(true);
  const [showExplanation, setShowExplanation] = useState(true);

  // Animation timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount or sim change
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleReset = () => {
    sound.playClick();
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
    setStage('initial');
  };

  const startTransfer = () => {
    sound.playClick();
    setIsPlaying(true);

    if (stage === 'initial') {
      setStage('highlighting');
      sound.playBubble();

      timerRef.current = setTimeout(() => {
        setStage('transferring');
        sound.playTransfer();

        timerRef.current = setTimeout(() => {
          setStage('attracting');
          sound.playSnap();

          timerRef.current = setTimeout(() => {
            setStage('complete');
            sound.playSuccess();
            setIsPlaying(false);
          }, 1200);
        }, 1800);
      }, 1200);
    } else if (stage === 'highlighting') {
      setStage('transferring');
      sound.playTransfer();
      timerRef.current = setTimeout(() => {
        setStage('attracting');
        sound.playSnap();
        timerRef.current = setTimeout(() => {
          setStage('complete');
          sound.playSuccess();
          setIsPlaying(false);
        }, 1200);
      }, 1800);
    } else if (stage === 'transferring') {
      setStage('attracting');
      sound.playSnap();
      timerRef.current = setTimeout(() => {
        setStage('complete');
        sound.playSuccess();
        setIsPlaying(false);
      }, 1200);
    } else if (stage === 'attracting') {
      setStage('complete');
      sound.playSuccess();
      setIsPlaying(false);
    } else {
      handleReset();
    }
  };

  const pauseTransfer = () => {
    sound.playClick();
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 2 • Simulasi Transfer Elektron
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Kemana Elektron Berpindah?
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Saksikan proses pelepasan elektron oleh atom logam berenergi ionisasi rendah dan penangkapannya oleh atom nonlogam ber-afinitas elektron tinggi, membentuk kation dan anion yang saling tarik-menarik.
          </p>
        </div>

        {/* Reaction System Selector */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-teal-200 shadow-xs">
          {[
            { id: 'nacl' as SimType, label: 'Na + Cl (NaCl)', sub: '1e⁻ Transfer' },
            { id: 'mgo' as SimType, label: 'Mg + O (MgO)', sub: '2e⁻ Transfer' },
            { id: 'cacl2' as SimType, label: 'cacl2' as SimType, labelText: 'Ca + 2Cl (CaCl₂)', sub: '1:2 Rasio' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                setSelectedSim(item.id);
                handleReset();
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSim === item.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50'
              }`}
            >
              {item.labelText || item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {/* Stage Status & Simulation Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tahap Simulasi:</span>
            <span className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-xs font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              {stage === 'initial' && '1. Keadaan Awal (Atom Netral)'}
              {stage === 'highlighting' && '2. Eksitasi Elektron Valensi'}
              {stage === 'transferring' && '3. Perpindahan Elektron Aktif'}
              {stage === 'attracting' && '4. Pembentukan Ion & Tarikan Elektrostatik'}
              {stage === 'complete' && '5. Pasangan Ion Stabil (Kenetralan Muatan)'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={startTransfer}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{stage === 'initial' ? 'Mulai Transfer' : stage === 'complete' ? 'Ulangi' : 'Lanjutkan'}</span>
              </button>
            ) : (
              <button
                onClick={pauseTransfer}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Jeda</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setShowConfig(!showConfig);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                showConfig ? 'bg-teal-50 text-teal-800 border border-teal-200' : 'bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              Konfigurasi: {showConfig ? 'Tampil' : 'Sembunyi'}
            </button>
          </div>
        </div>

        {/* Visual Animation Canvas Area */}
        <div className="relative min-h-[380px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-6 overflow-hidden flex flex-col justify-center items-center shadow-inner">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

          {/* SIMULATION A: NaCl */}
          {selectedSim === 'nacl' && (
            <div className="relative w-full max-w-2xl flex items-center justify-around py-4">
              {/* Sodium (Na) Atom / Ion */}
              <div className={`flex flex-col items-center transition-all duration-700 ${
                stage === 'attracting' || stage === 'complete' ? 'translate-x-12' : ''
              }`}>
                {/* Visual Ring Model */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {/* Innermost shell n=1 (2 e-) */}
                  <div className="absolute w-16 h-16 rounded-full border border-slate-600/60" />
                  {/* Middle shell n=2 (8 e-) */}
                  <div className="absolute w-28 h-28 rounded-full border border-slate-600/60" />
                  {/* Valence shell n=3 (1 e-) - vanishes after transfer */}
                  <div className={`absolute w-40 h-40 rounded-full border transition-all duration-700 ${
                    stage === 'transferring' || stage === 'attracting' || stage === 'complete'
                      ? 'border-transparent scale-90 opacity-0'
                      : stage === 'highlighting'
                      ? 'border-sky-400 border-dashed animate-pulse'
                      : 'border-slate-600/60'
                  }`} />

                  {/* Nucleus */}
                  <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-white font-extrabold shadow-lg transition-transform duration-500 ${
                    stage === 'complete' ? 'bg-sky-500 scale-105' : 'bg-sky-600'
                  }`}>
                    <span className="text-sm font-black">
                      {stage === 'complete' || stage === 'attracting' ? 'Na⁺' : 'Na'}
                    </span>
                    <span className="text-[9px] text-sky-100 font-bold">11p⁺</span>
                  </div>

                  {/* Valence Electron being transferred */}
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-sky-300 shadow-md shadow-sky-400/80 transition-all duration-1000 ${
                      stage === 'initial'
                        ? 'right-0 top-1/2 -translate-y-1/2'
                        : stage === 'highlighting'
                        ? 'right-0 top-1/2 -translate-y-1/2 scale-150 ring-4 ring-sky-400/40'
                        : stage === 'transferring'
                        ? 'translate-x-56 top-1/2 -translate-y-1/2 scale-125'
                        : 'translate-x-60 top-1/2 -translate-y-1/2 opacity-0'
                    }`}
                  />
                </div>

                {/* Subtitle Label */}
                <div className="mt-3 text-center">
                  <span className="text-xs font-extrabold text-white block">
                    {stage === 'complete' || stage === 'attracting' ? 'Kation Natrium (Na⁺)' : 'Atom Natrium (Na)'}
                  </span>
                  {showConfig && (
                    <span className="text-[11px] text-sky-400 font-mono block mt-0.5">
                      {stage === 'complete' || stage === 'attracting' ? '2, 8 (Stabil [Ne])' : '2, 8, 1 (1e⁻ valensi)'}
                    </span>
                  )}
                  {(stage === 'attracting' || stage === 'complete') && (
                    <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-900/80 text-sky-300 border border-sky-600">
                      Muatan: +1
                    </span>
                  )}
                </div>
              </div>

              {/* Electrostatic Attraction Sparkle in center */}
              <div className="flex flex-col items-center justify-center px-2">
                {(stage === 'attracting' || stage === 'complete') ? (
                  <div className="flex flex-col items-center animate-in zoom-in duration-500">
                    <div className="flex items-center gap-1 text-amber-400 font-black text-sm tracking-wider">
                      <Zap className="w-4 h-4 fill-amber-400 animate-bounce" />
                      <span>TARIKAN COULOMB</span>
                      <Zap className="w-4 h-4 fill-amber-400 animate-bounce" />
                    </div>
                    <span className="text-[11px] text-emerald-400 font-bold mt-1 bg-slate-800/80 px-3 py-1 rounded-full border border-emerald-500/40">
                      Rumus Empiris: NaCl (Netral)
                    </span>
                  </div>
                ) : (
                  <ArrowRight className={`w-8 h-8 transition-colors ${
                    stage === 'transferring' ? 'text-amber-400 animate-pulse' : 'text-slate-600'
                  }`} />
                )}
              </div>

              {/* Chlorine (Cl) Atom / Ion */}
              <div className={`flex flex-col items-center transition-all duration-700 ${
                stage === 'attracting' || stage === 'complete' ? '-translate-x-12' : ''
              }`}>
                {/* Visual Ring Model */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute w-16 h-16 rounded-full border border-slate-600/60" />
                  <div className="absolute w-28 h-28 rounded-full border border-slate-600/60" />
                  <div className={`absolute w-40 h-40 rounded-full border transition-all ${
                    stage === 'complete' || stage === 'attracting' ? 'border-emerald-400' : 'border-slate-600/60'
                  }`} />

                  {/* Nucleus */}
                  <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-white font-extrabold shadow-lg transition-transform duration-500 ${
                    stage === 'complete' ? 'bg-emerald-500 scale-105' : 'bg-emerald-600'
                  }`}>
                    <span className="text-sm font-black">
                      {stage === 'complete' || stage === 'attracting' ? 'Cl⁻' : 'Cl'}
                    </span>
                    <span className="text-[9px] text-emerald-100 font-bold">17p⁺</span>
                  </div>

                  {/* Extra captured electron slot */}
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-sky-300 shadow-md shadow-sky-400/80 left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ${
                      stage === 'attracting' || stage === 'complete' ? 'opacity-100 scale-125' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Subtitle Label */}
                <div className="mt-3 text-center">
                  <span className="text-xs font-extrabold text-white block">
                    {stage === 'complete' || stage === 'attracting' ? 'Anion Klorida (Cl⁻)' : 'Atom Klorin (Cl)'}
                  </span>
                  {showConfig && (
                    <span className="text-[11px] text-emerald-400 font-mono block mt-0.5">
                      {stage === 'complete' || stage === 'attracting' ? '2, 8, 8 (Stabil [Ar])' : '2, 8, 7 (Butuh 1e⁻)'}
                    </span>
                  )}
                  {(stage === 'attracting' || stage === 'complete') && (
                    <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-600">
                      Muatan: -1
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SIMULATION B: MgO */}
          {selectedSim === 'mgo' && (
            <div className="relative w-full max-w-2xl flex items-center justify-around py-4">
              {/* Magnesium (Mg) */}
              <div className={`flex flex-col items-center transition-all duration-700 ${
                stage === 'attracting' || stage === 'complete' ? 'translate-x-12' : ''
              }`}>
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute w-16 h-16 rounded-full border border-slate-600/60" />
                  <div className="absolute w-28 h-28 rounded-full border border-slate-600/60" />
                  <div className={`absolute w-40 h-40 rounded-full border transition-all duration-700 ${
                    stage === 'transferring' || stage === 'attracting' || stage === 'complete'
                      ? 'border-transparent opacity-0'
                      : stage === 'highlighting'
                      ? 'border-purple-400 border-dashed animate-pulse'
                      : 'border-slate-600/60'
                  }`} />

                  <div className="w-12 h-12 rounded-full bg-purple-600 flex flex-col items-center justify-center text-white font-extrabold shadow-lg">
                    <span className="text-sm font-black">{stage === 'complete' || stage === 'attracting' ? 'Mg²⁺' : 'Mg'}</span>
                    <span className="text-[9px] text-purple-100 font-bold">12p⁺</span>
                  </div>

                  {/* 2 Valence electrons */}
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-purple-300 shadow-md transition-all duration-1000 ${
                      stage === 'initial'
                        ? 'right-1 top-10'
                        : stage === 'highlighting'
                        ? 'right-1 top-10 scale-150 ring-4 ring-purple-400/40'
                        : stage === 'transferring'
                        ? 'translate-x-56 top-10 scale-125'
                        : 'opacity-0'
                    }`}
                  />
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-purple-300 shadow-md transition-all duration-1000 ${
                      stage === 'initial'
                        ? 'right-1 bottom-10'
                        : stage === 'highlighting'
                        ? 'right-1 bottom-10 scale-150 ring-4 ring-purple-400/40'
                        : stage === 'transferring'
                        ? 'translate-x-56 bottom-10 scale-125'
                        : 'opacity-0'
                    }`}
                  />
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-extrabold text-white block">
                    {stage === 'complete' || stage === 'attracting' ? 'Kation Magnesium (Mg²⁺)' : 'Atom Magnesium (Mg)'}
                  </span>
                  {showConfig && (
                    <span className="text-[11px] text-purple-400 font-mono block mt-0.5">
                      {stage === 'complete' || stage === 'attracting' ? '2, 8 (Stabil [Ne])' : '2, 8, 2 (Lepas 2e⁻)'}
                    </span>
                  )}
                  {(stage === 'attracting' || stage === 'complete') && (
                    <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-300 border border-purple-600">
                      Muatan: +2
                    </span>
                  )}
                </div>
              </div>

              {/* Electrostatic Link */}
              <div className="flex flex-col items-center justify-center px-2">
                {(stage === 'attracting' || stage === 'complete') ? (
                  <div className="flex flex-col items-center animate-in zoom-in duration-500">
                    <div className="flex items-center gap-1 text-rose-400 font-black text-sm tracking-wider">
                      <Zap className="w-4 h-4 fill-rose-400 animate-bounce" />
                      <span>TARIKAN +2 & -2 SANGAT KUAT</span>
                      <Zap className="w-4 h-4 fill-rose-400 animate-bounce" />
                    </div>
                    <span className="text-[11px] text-emerald-400 font-bold mt-1 bg-slate-800/80 px-3 py-1 rounded-full border border-emerald-500/40">
                      Rumus: MgO ((+2) + (-2) = 0)
                    </span>
                  </div>
                ) : (
                  <ArrowRight className="w-8 h-8 text-slate-600" />
                )}
              </div>

              {/* Oxygen (O) */}
              <div className={`flex flex-col items-center transition-all duration-700 ${
                stage === 'attracting' || stage === 'complete' ? '-translate-x-12' : ''
              }`}>
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute w-16 h-16 rounded-full border border-slate-600/60" />
                  <div className={`absolute w-32 h-32 rounded-full border transition-all ${
                    stage === 'complete' || stage === 'attracting' ? 'border-rose-400' : 'border-slate-600/60'
                  }`} />

                  <div className="w-12 h-12 rounded-full bg-rose-600 flex flex-col items-center justify-center text-white font-extrabold shadow-lg">
                    <span className="text-sm font-black">{stage === 'complete' || stage === 'attracting' ? 'O²⁻' : 'O'}</span>
                    <span className="text-[9px] text-rose-100 font-bold">8p⁺</span>
                  </div>

                  {/* 2 accepted electrons */}
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-purple-300 left-3 top-8 transition-all duration-500 ${
                      stage === 'attracting' || stage === 'complete' ? 'opacity-100 scale-125' : 'opacity-0'
                    }`}
                  />
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-purple-300 left-3 bottom-8 transition-all duration-500 ${
                      stage === 'attracting' || stage === 'complete' ? 'opacity-100 scale-125' : 'opacity-0'
                    }`}
                  />
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-extrabold text-white block">
                    {stage === 'complete' || stage === 'attracting' ? 'Anion Oksida (O²⁻)' : 'Atom Oksigen (O)'}
                  </span>
                  {showConfig && (
                    <span className="text-[11px] text-rose-400 font-mono block mt-0.5">
                      {stage === 'complete' || stage === 'attracting' ? '2, 8 (Stabil [Ne])' : '2, 6 (Tangkap 2e⁻)'}
                    </span>
                  )}
                  {(stage === 'attracting' || stage === 'complete') && (
                    <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-900/80 text-rose-300 border border-rose-600">
                      Muatan: -2
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SIMULATION C: CaCl2 */}
          {selectedSim === 'cacl2' && (
            <div className="relative w-full max-w-2xl flex items-center justify-around py-4">
              {/* Chlorine 1 (Top Right) */}
              {/* Calcium (Center-Left) */}
              <div className="flex flex-col items-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute w-14 h-14 rounded-full border border-slate-600/60" />
                  <div className="absolute w-24 h-24 rounded-full border border-slate-600/60" />
                  <div className="absolute w-32 h-32 rounded-full border border-slate-600/60" />
                  <div className={`absolute w-42 h-42 rounded-full border transition-all duration-700 ${
                    stage === 'transferring' || stage === 'attracting' || stage === 'complete'
                      ? 'border-transparent opacity-0'
                      : stage === 'highlighting'
                      ? 'border-amber-400 border-dashed animate-pulse'
                      : 'border-slate-600/60'
                  }`} />

                  <div className="w-12 h-12 rounded-full bg-amber-600 flex flex-col items-center justify-center text-white font-extrabold shadow-lg">
                    <span className="text-sm font-black">{stage === 'complete' || stage === 'attracting' ? 'Ca²⁺' : 'Ca'}</span>
                    <span className="text-[9px] text-amber-100 font-bold">20p⁺</span>
                  </div>

                  {/* 2 valence electrons going to 2 different Cl atoms */}
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-amber-300 shadow-md transition-all duration-1000 ${
                      stage === 'initial'
                        ? 'right-1 top-6'
                        : stage === 'highlighting'
                        ? 'right-1 top-6 scale-150'
                        : stage === 'transferring'
                        ? 'translate-x-52 -translate-y-12'
                        : 'opacity-0'
                    }`}
                  />
                  <div
                    className={`absolute w-3.5 h-3.5 rounded-full bg-amber-300 shadow-md transition-all duration-1000 ${
                      stage === 'initial'
                        ? 'right-1 bottom-6'
                        : stage === 'highlighting'
                        ? 'right-1 bottom-6 scale-150'
                        : stage === 'transferring'
                        ? 'translate-x-52 translate-y-12'
                        : 'opacity-0'
                    }`}
                  />
                </div>

                <div className="mt-2 text-center">
                  <span className="text-xs font-extrabold text-white block">
                    {stage === 'complete' || stage === 'attracting' ? 'Kation Kalsium (Ca²⁺)' : 'Atom Kalsium (Ca)'}
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono block">
                    {stage === 'complete' || stage === 'attracting' ? '2, 8, 8 (Stabil [Ar])' : '2, 8, 8, 2 (Lepas 2e⁻)'}
                  </span>
                  {(stage === 'attracting' || stage === 'complete') && (
                    <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-900/80 text-amber-300 border border-amber-600">
                      Muatan: +2
                    </span>
                  )}
                </div>
              </div>

              {/* Electrostatic Bridge */}
              <div className="flex flex-col items-center justify-center">
                {(stage === 'attracting' || stage === 'complete') ? (
                  <div className="text-center bg-slate-800/90 px-3 py-2 rounded-2xl border border-teal-500/40">
                    <span className="text-xs font-bold text-teal-400 block">Rasio 1 : 2</span>
                    <span className="text-sm font-extrabold text-white">CaCl₂</span>
                    <span className="text-[10px] text-slate-300 block mt-0.5">(+2) + 2(-1) = 0</span>
                  </div>
                ) : (
                  <ArrowRight className="w-6 h-6 text-slate-600" />
                )}
              </div>

              {/* Two Cl Atoms / Ions */}
              <div className="flex flex-col gap-6">
                {/* Cl 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-emerald-700/80 text-white font-extrabold text-xs shadow-md">
                    {stage === 'complete' || stage === 'attracting' ? 'Cl⁻ #1' : 'Cl #1'}
                  </div>
                  <div className="text-xs text-white">
                    <span className="block font-bold">Klorida 1</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {stage === 'complete' || stage === 'attracting' ? '2, 8, 8 (Muatan -1)' : '2, 8, 7'}
                    </span>
                  </div>
                </div>

                {/* Cl 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-emerald-700/80 text-white font-extrabold text-xs shadow-md">
                    {stage === 'complete' || stage === 'attracting' ? 'Cl⁻ #2' : 'Cl #2'}
                  </div>
                  <div className="text-xs text-white">
                    <span className="block font-bold">Klorida 2</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {stage === 'complete' || stage === 'attracting' ? '2, 8, 8 (Muatan -1)' : '2, 8, 7'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chemical Equation & Reaction Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Persamaan Setengah Reaksi (Transfer Elektron):
            </span>
            <div className="font-mono text-xs sm:text-sm font-bold text-slate-800 space-y-1">
              {selectedSim === 'nacl' && (
                <>
                  <div className="text-sky-700">Na → Na⁺ + e⁻ &nbsp;&nbsp;(Oksidasi / Lepas 1e⁻)</div>
                  <div className="text-emerald-700">Cl + e⁻ → Cl⁻ &nbsp;&nbsp;(Reduksi / Tangkap 1e⁻)</div>
                  <div className="pt-1 border-t border-slate-300 text-slate-900 font-extrabold">
                    Reaksi Makroskopis: 2Na(s) + Cl₂(g) → 2NaCl(s)
                  </div>
                </>
              )}
              {selectedSim === 'mgo' && (
                <>
                  <div className="text-purple-700">Mg → Mg²⁺ + 2e⁻ &nbsp;&nbsp;(Lepas 2e⁻)</div>
                  <div className="text-rose-700">O + 2e⁻ → O²⁻ &nbsp;&nbsp;(Tangkap 2e⁻)</div>
                  <div className="pt-1 border-t border-slate-300 text-slate-900 font-extrabold">
                    Reaksi Makroskopis: 2Mg(s) + O₂(g) → 2MgO(s)
                  </div>
                </>
              )}
              {selectedSim === 'cacl2' && (
                <>
                  <div className="text-amber-700">Ca → Ca²⁺ + 2e⁻ &nbsp;&nbsp;(Lepas 2e⁻)</div>
                  <div className="text-emerald-700">2Cl + 2e⁻ → 2Cl⁻ &nbsp;&nbsp;(Masing-masing Cl tangkap 1e⁻)</div>
                  <div className="pt-1 border-t border-slate-300 text-slate-900 font-extrabold">
                    Reaksi Makroskopis: Ca(s) + Cl₂(g) → CaCl₂(s)
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200 space-y-2 text-xs">
            <span className="font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Prinsip Kenetralan Muatan Listrik
            </span>
            <p className="text-slate-700 leading-relaxed">
              {selectedSim === 'nacl' &&
                'Kation Na⁺ bermuatan +1 dan anion Cl⁻ bermuatan -1. Jumlah muatan: (+1) + (-1) = 0. Perbandingan ion adalah 1 : 1, membentuk rumus kimia NaCl.'}
              {selectedSim === 'mgo' &&
                'Kation Mg²⁺ (+2) dan anion O²⁻ (-2) berpasangan 1 : 1 karena (+2) + (-2) = 0. Muatan ganda menghasilkan tarikan elektrostatik yang jauh lebih kuat.'}
              {selectedSim === 'cacl2' &&
                'Karena kalsium melepaskan 2 elektron (membentuk Ca²⁺), dibutuhkan dua atom klorin (masing-masing membentuk Cl⁻) agar total muatan listrik seimbang menjadi netral: (+2) + 2(-1) = 0. Rumus kimia adalah CaCl₂.'}
            </p>
          </div>
        </div>

        {/* Mascot Explanation Card */}
        <LabMascot
          mood="excited"
          message="Simulasi satu pasang ion di atas mempermudah pemahaman kita tentang transfer elektron. Di dunia nyata, ion-ion yang terbentuk tidak berhenti sebagai molekul terpisah, melainkan menyusun diri menjadi kisi kristal tiga dimensi raksasa!"
        />
      </div>
    </div>
  );
};
