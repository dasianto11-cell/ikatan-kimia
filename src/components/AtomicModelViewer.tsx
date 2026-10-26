/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ELEMENTS } from '../data/chemistryData';
import { ChemicalElement } from '../types/chemistry';
import { LabMascot } from './LabMascot';
import { Atom, Sparkles, Layers, Info, Check, Eye, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export const AtomicModelViewer: React.FC = () => {
  const [selectedElementId, setSelectedElementId] = useState<string>('na');
  const [compareElementId, setCompareElementId] = useState<string | null>(null);
  const [showShellLabels, setShowShellLabels] = useState(true);
  const [highlightValence, setHighlightValence] = useState(true);
  const [hoveredElectron, setHoveredElectron] = useState<string | null>(null);

  const element1 = ELEMENTS.find((e) => e.id === selectedElementId) || ELEMENTS[0];
  const element2 = compareElementId ? ELEMENTS.find((e) => e.id === compareElementId) : null;

  const shellNames = ['K (n=1)', 'L (n=2)', 'M (n=3)', 'N (n=4)'];

  const renderBohrModel = (elem: ChemicalElement, isSecondary: boolean = false) => {
    const baseRadius = 38;
    const shellGap = 24;
    const totalShells = elem.shells.length;
    const svgSize = Math.max(260, (totalShells * shellGap + baseRadius + 30) * 2);
    const center = svgSize / 2;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center p-2 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
          {/* Subtle cosmic background glow */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none blur-2xl" 
            style={{ background: `radial-gradient(circle at center, ${elem.color}, transparent 70%)` }} 
          />

          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="w-full h-full select-none"
          >
            {/* Shell concentric circles */}
            {elem.shells.map((electronCount, shellIdx) => {
              const r = baseRadius + (shellIdx + 1) * shellGap;
              const isValenceShell = shellIdx === totalShells - 1;

              return (
                <g key={`shell-${shellIdx}`}>
                  {/* Orbit circle path */}
                  <circle
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke={isValenceShell && highlightValence ? '#38bdf8' : '#475569'}
                    strokeWidth={isValenceShell && highlightValence ? 2 : 1.2}
                    strokeDasharray={isValenceShell && highlightValence ? '4 3' : undefined}
                    opacity={isValenceShell && highlightValence ? 0.9 : 0.5}
                  />

                  {/* Shell Label if enabled */}
                  {showShellLabels && (
                    <text
                      x={center + r + 4}
                      y={center - 3}
                      fill={isValenceShell && highlightValence ? '#38bdf8' : '#94a3b8'}
                      fontSize="9"
                      fontWeight="600"
                    >
                      {shellNames[shellIdx]}
                    </text>
                  )}

                  {/* Orbiting Electrons */}
                  {Array.from({ length: electronCount }).map((_, eIdx) => {
                    const angle = (2 * Math.PI * eIdx) / electronCount - Math.PI / 2;
                    const cx = center + r * Math.cos(angle);
                    const cy = center + r * Math.sin(angle);
                    const electronId = `${elem.id}-s${shellIdx}-e${eIdx}`;
                    const isValenceElectron = isValenceShell;
                    const isHovered = hoveredElectron === electronId;

                    return (
                      <g key={electronId}>
                        {/* Glow halo on valence electrons */}
                        {isValenceElectron && highlightValence && (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={7.5}
                            fill="#38bdf8"
                            opacity={0.35}
                            className="animate-pulse"
                          />
                        )}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isValenceElectron && highlightValence ? 4.5 : 3.5}
                          fill={isValenceElectron && highlightValence ? '#38bdf8' : '#e2e8f0'}
                          stroke="#0f172a"
                          strokeWidth="1.2"
                          className="cursor-pointer transition-transform hover:scale-150"
                          onMouseEnter={() => {
                            setHoveredElectron(electronId);
                            sound.playBubble();
                          }}
                          onMouseLeave={() => setHoveredElectron(null)}
                        />
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* Nucleus in center with protons & neutrons count */}
            <g>
              {/* Outer halo */}
              <circle cx={center} cy={center} r={baseRadius - 8} fill={elem.color} opacity={0.2} />
              {/* Core */}
              <circle
                cx={center}
                cy={center}
                r={baseRadius - 14}
                fill={elem.color}
                stroke="#ffffff"
                strokeWidth="2"
                className="drop-shadow-md"
              />
              {/* Symbol */}
              <text
                x={center}
                y={center - 2}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
                fontWeight="800"
              >
                {elem.symbol}
              </text>
              {/* Z count */}
              <text
                x={center}
                y={center + 12}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="9"
                fontWeight="700"
                opacity="0.9"
              >
                Z = {elem.atomicNumber}
              </text>
            </g>
          </svg>

          {/* Quick Valence badge */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700 text-[11px] text-white">
            <span className="text-slate-400">Elektron Valensi:</span>{' '}
            <strong className="text-teal-400 font-extrabold">{elem.valenceElectrons}</strong>
          </div>
        </div>

        {/* Atom Subtitle Info */}
        <div className="mt-3 text-center">
          <h4 className="font-extrabold text-slate-800 text-base flex items-center justify-center gap-1.5">
            {elem.name} ({elem.symbol})
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
              elem.category === 'metal' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {elem.category === 'metal' ? 'Logam' : 'Nonlogam'}
            </span>
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Konfigurasi Kulit: [{elem.shells.join(', ')}]
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Station Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 1 • Struktur Atom & Elektron Valensi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Kenali Atom & Elektron Valensi!
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Amati bagaimana elektron tersusun pada kulit-kulit atom. Elektron pada kulit terluar (elektron valensi) menentukan kecenderungan atom untuk melepaskan atau menangkap elektron dalam membentuk ikatan ionik.
          </p>
        </div>

        {/* Quick controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setHighlightValence(!highlightValence);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              highlightValence ? 'bg-teal-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Sorot Valensi: {highlightValence ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowShellLabels(!showShellLabels);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              showShellLabels ? 'bg-teal-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Label Kulit: {showShellLabels ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Element Selector Strip (8 Elements) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pilih Unsur Kimia (8 Unsur Utama Pembentuk Ikatan Ionik):
          </span>
          <span className="text-xs text-teal-600 font-semibold hidden sm:inline">
            Klik unsur untuk menampilkan model atom
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {ELEMENTS.map((el) => {
            const isSelected = selectedElementId === el.id;
            return (
              <button
                key={el.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedElementId(el.id);
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/80 shadow-md scale-102'
                    : 'border-slate-100 bg-slate-50/60 hover:border-teal-200 hover:bg-teal-50/30'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-bold">{el.atomicNumber}</span>
                <span className="text-xl font-black text-slate-800">{el.symbol}</span>
                <span className="text-[11px] font-semibold text-slate-600 truncate max-w-full">{el.name}</span>
                <span className={`mt-1 text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                  el.category === 'metal' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {el.category === 'metal' ? 'Logam' : 'Nonlogam'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage: Atom Model + Side-by-Side Compare + Explanation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Center Column: 3D/Bohr Visualizer */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Atom className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Visualisasi Model Atom Bohr
              </h3>
            </div>

            {/* Compare Selector Toggle */}
            <div className="flex items-center gap-2">
              <label htmlFor="compare-select" className="text-xs text-slate-500 font-semibold">
                Bandingkan dengan:
              </label>
              <select
                id="compare-select"
                value={compareElementId || ''}
                onChange={(e) => {
                  sound.playClick();
                  setCompareElementId(e.target.value ? e.target.value : null);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 font-semibold focus:outline-teal-500 cursor-pointer"
              >
                <option value="">(Tidak Ada / Tunggal)</option>
                {ELEMENTS.filter((e) => e.id !== selectedElementId).map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name} ({e.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Model Display: Single or Side-by-Side */}
          <div className={`grid gap-6 items-center justify-center ${compareElementId ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            {renderBohrModel(element1)}
            {element2 && renderBohrModel(element2, true)}
          </div>

          {/* Scientific Bohr Model Disclaimer */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Catatan Ilmiah:</strong> Model Bohr di atas adalah representasi visual edukatif untuk mempermudah perhitungan elektron valensi. Dalam mekanika kuantum modern, elektron tidak bergerak dalam lintasan lingkaran kaku, melainkan menempati awan probabilitas (orbital).
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Scientific Explanation Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-teal-600 uppercase">Analisis Termodinamika & Ion</span>
                <h3 className="text-xl font-extrabold text-slate-800">
                  {element1.name} ({element1.symbol})
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-semibold">Nomor Atom</span>
                <span className="text-lg font-black text-slate-800">Z = {element1.atomicNumber}</span>
              </div>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-semibold block mb-1">Konfigurasi Kulit</span>
                <span className="font-mono font-bold text-slate-800 text-sm">
                  {element1.shells.join(' , ')}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  ({element1.shells.length} kulit elektron)
                </span>
              </div>

              <div className="bg-teal-50 p-3 rounded-2xl border border-teal-100">
                <span className="text-teal-700 font-semibold block mb-1">Elektron Valensi</span>
                <span className="font-mono font-black text-teal-900 text-lg">
                  {element1.valenceElectrons} elektron
                </span>
                <span className="text-[11px] text-teal-700 block mt-0.5">
                  Kulit terluar (valensi)
                </span>
              </div>
            </div>

            {/* Subshell Ground-State Notation */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
              <span className="text-slate-400 font-semibold block mb-1">Konfigurasi Subkulit (Orbital Asli)</span>
              <span className="font-mono font-bold text-slate-700 text-xs sm:text-sm">
                {element1.subshellConfig}
              </span>
            </div>

            {/* Ion Formation Tendency */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-900">Ion yang Umum Terbentuk:</span>
                <span className="px-3 py-1 bg-teal-600 text-white rounded-xl font-black text-sm shadow-xs">
                  {element1.typicalIon}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {element1.ionReason}
              </p>
            </div>

            {/* Fun Fact / Real-World Context */}
            <div className="text-xs bg-slate-50 p-3.5 rounded-2xl text-slate-600 leading-relaxed border border-slate-100">
              <strong className="text-slate-800 block mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Tahukah Kamu?
              </strong>
              {element1.funFact}
            </div>
          </div>

          {/* Dr. Kimi Mascot Guidance */}
          <LabMascot
            mood="explaining"
            message={`Ingat: Unsur logam seperti ${element1.category === 'metal' ? element1.name : 'Natrium'} cenderung melepaskan elektron membentuk kation (+), sedangkan unsur nonlogam cenderung menangkap elektron membentuk anion (-)!`}
          />
        </div>
      </div>
    </div>
  );
};
