/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StationId } from './LabHeader';
import { LabMascot } from './LabMascot';
import { 
  Atom, 
  ArrowRightLeft, 
  Scale, 
  Box, 
  Flame, 
  Zap, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  ArrowRight,
  Play
} from 'lucide-react';
import { sound } from '../utils/audio';

interface HomeProps {
  onSelectStation: (st: StationId) => void;
  visitedStations: Set<StationId>;
}

export const LaboratoryHome: React.FC<HomeProps> = ({ onSelectStation, visitedStations }) => {
  const handleGo = (st: StationId) => {
    sound.playBubble();
    onSelectStation(st);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Hero Virtual Chemistry Laboratory Scene */}
      <div className="relative bg-gradient-to-b from-[#e6f4f1] via-[#faf7ee] to-[#f4ebe1] rounded-3xl p-6 sm:p-10 border-2 border-teal-200/80 shadow-lg overflow-hidden">
        {/* Laboratory Windows & Architectural Lines in background */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4/5 h-32 border-2 border-teal-200/40 rounded-3xl bg-white/40 backdrop-blur-xs pointer-events-none flex items-center justify-around overflow-hidden">
          {/* Subtle outdoor sky through lab window */}
          <div className="w-1/3 h-full border-r border-teal-100 flex items-center justify-center">
            <span className="text-[11px] font-mono text-teal-600/40 font-bold uppercase tracking-widest">
              LAB KIMIA SMA 3D
            </span>
          </div>
          <div className="w-1/3 h-full border-r border-teal-100 flex items-center justify-center">
            <span className="text-[11px] font-mono text-teal-600/40 font-bold uppercase tracking-widest">
              ZONA REAKSI IONIK
            </span>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <span className="text-[11px] font-mono text-teal-600/40 font-bold uppercase tracking-widest">
              SIMULASI KISI 3D
            </span>
          </div>
        </div>

        {/* Hero Title & Subtitle Banner */}
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-teal-300 text-teal-800 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            LABORATORIUM VIRTUAL INTERAKTIF 3D • KELAS X SMA
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-none">
            IONIC BOND LAB <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">3D</span>
          </h1>

          <p className="text-base sm:text-lg font-bold text-slate-700 tracking-wide">
            Jelajahi Atom. Transfer Elektron. Temukan Ikatan Ionik.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Selamat datang di laboratorium virtual kimia! Masuki meja kerja interaktif untuk mengamati perpindahan elektron secara nyata, merakit rumus senyawa netral, dan memutar kisi kristal 3 dimensi.
          </p>

          {/* Two Prominent Action Buttons requested in spec */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => handleGo('atomic')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-teal-600/30 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>MASUK LABORATORIUM (ENTER THE LAB)</span>
            </button>

            <button
              onClick={() => handleGo('transfer')}
              className="px-6 py-3 bg-white hover:bg-teal-50 text-teal-800 border-2 border-teal-300 font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>MULAI BELAJAR (START LEARNING)</span>
            </button>
          </div>
        </div>

        {/* Illustrated Interactive Laboratory Workbench Scene */}
        <div className="relative z-10 mt-10 pt-6 border-t-2 border-teal-200/60">
          {/* Workstation Hotspots on Bench */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-teal-100 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Meja Praktikum Laboratorium — Klik Stasiun untuk Eksplorasi:
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                8 Stasiun Utama + Refleksi
              </span>
            </div>

            {/* Interactive Equipment Hotspots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Station 1: Atomic Structure */}
              <button
                onClick={() => handleGo('atomic')}
                className="group p-4 rounded-2xl bg-gradient-to-b from-sky-50 to-white border-2 border-sky-100 hover:border-sky-400 transition-all text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <Atom className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                    Stasiun 1
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-sky-700 transition">
                    Struktur Atom 3D
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Kenali 8 atom, konfigurasi kulit, dan elektron valensi.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-sky-100 flex items-center justify-between text-[11px] font-bold text-sky-600">
                  <span>Eksplorasi Atom</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Station 2: Electron Transfer */}
              <button
                onClick={() => handleGo('transfer')}
                className="group p-4 rounded-2xl bg-gradient-to-b from-teal-50 to-white border-2 border-teal-100 hover:border-teal-400 transition-all text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                    Stasiun 2
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-teal-700 transition">
                    Transfer Elektron
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Simulasi animasi NaCl, MgO, dan CaCl₂ dengan persamaan reaksi.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-teal-100 flex items-center justify-between text-[11px] font-bold text-teal-600">
                  <span>Mulai Simulasi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Station 3: Ionic Formula Builder */}
              <button
                onClick={() => handleGo('builder')}
                className="group p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-white border-2 border-amber-100 hover:border-amber-400 transition-all text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <Scale className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    Stasiun 3
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-amber-700 transition">
                    Rakit Senyawa Ionik
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Neraca muatan virtual untuk menyeimbangkan kation dan anion.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-100 flex items-center justify-between text-[11px] font-bold text-amber-600">
                  <span>Rakit Rumus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Station 4: 3D Crystal Lattice */}
              <button
                onClick={() => handleGo('lattice')}
                className="group p-4 rounded-2xl bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-100 hover:border-emerald-400 transition-all text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <Box className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Stasiun 4
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-emerald-700 transition">
                    Kisi Kristal 3D
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Three.js kristal NaCl, MgO, dan CsCl dengan putaran dan inspeksi ion.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] font-bold text-emerald-600">
                  <span>Lihat Kisi 3D</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Station 5: Properties Investigation */}
              <button
                onClick={() => handleGo('properties')}
                className="group p-4 rounded-2xl bg-gradient-to-b from-rose-50 to-white border-2 border-rose-100 hover:border-rose-400 transition-all text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    Stasiun 5
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-rose-700 transition">
                    Sifat Senyawa Ionik
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Uji titik leleh, kelarutan, dan mekanisme kerapuhan mekanik.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-rose-100 flex items-center justify-between text-[11px] font-bold text-rose-600">
                  <span>Uji Sifat Fisik</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Station 6: Virtual Conductivity Lab */}
              <button
                onClick={() => handleGo('conductivity')}
                className="group p-4 rounded-2xl bg-gradient-to-b from-indigo-50 to-white border-2 border-indigo-100 hover:border-indigo-400 transition-all text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                    Stasiun 6
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-indigo-700 transition">
                    Uji Konduktivitas Lab
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Aparatus nyata: elektroda, lampu, ammeter, dan pandangan ionik.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-indigo-100 flex items-center justify-between text-[11px] font-bold text-indigo-600">
                  <span>Mulai Praktikum</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Station 7: Applications Gallery */}
              <button
                onClick={() => handleGo('applications')}
                className="group p-4 rounded-2xl bg-gradient-to-b from-purple-50 to-white border-2 border-purple-100 hover:border-purple-400 transition-all text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    Stasiun 7
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-purple-700 transition">
                    Aplikasi Dunia Nyata
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    Garam, pupuk pertanian, semen, keramik, baterai, dan air.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-purple-100 flex items-center justify-between text-[11px] font-bold text-purple-600">
                  <span>Buka Galeri</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Station 8: Quiz Challenge */}
              <button
                onClick={() => handleGo('quiz')}
                className="group p-4 rounded-2xl bg-gradient-to-b from-teal-50 to-emerald-50 border-2 border-teal-200 hover:border-teal-500 transition-all text-left flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Stasiun 8 (20 Poin)
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-teal-700 transition">
                    Tantangan Kuis
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    10 soal interaktif (Benar/Salah, Pilihan Ganda, dan Esai).
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-teal-200 flex items-center justify-between text-[11px] font-bold text-teal-700">
                  <span>Mulai Uji Mandiri</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mascot Greeting at workbench base */}
        <div className="relative z-10 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 p-4 sm:p-5 rounded-3xl border border-teal-200 shadow-sm">
          <LabMascot
            mood="happy"
            size="md"
            message="Halo peneliti muda! Saya Dr. Kimi. Ikatan ionik bukan sekadar rumus di atas kertas, tapi rahasia mengapa garam dapur berbentuk kristal kubus dan mengapa lelehan garam bisa menghantarkan listrik! Pilih stasiun mana saja untuk memulai penyelidikanmu!"
          />

          <button
            onClick={() => handleGo('atomic')}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-xs transition shadow-sm whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Mulai dari Stasiun 1</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
