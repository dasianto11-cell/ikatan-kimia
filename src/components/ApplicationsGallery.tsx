/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REAL_WORLD_APPLICATIONS } from '../data/chemistryData';
import { RealWorldApplication } from '../types/chemistry';
import { LabMascot } from './LabMascot';
import { Sparkles, Eye, ArrowLeft, Layers, ShieldCheck, ExternalLink } from 'lucide-react';
import { sound } from '../utils/audio';

interface GalleryProps {
  onNavigateToCrystal?: () => void;
}

export const ApplicationsGallery: React.FC<GalleryProps> = ({ onNavigateToCrystal }) => {
  const [selectedApp, setSelectedApp] = useState<RealWorldApplication | null>(null);

  const handleCardClick = (app: RealWorldApplication) => {
    sound.playBubble();
    setSelectedApp(app);
  };

  const closeModal = () => {
    sound.playClick();
    setSelectedApp(null);
  };

  const renderIllustration = (type: RealWorldApplication['visualType']) => {
    switch (type) {
      case 'salt':
        return (
          <svg viewBox="0 0 200 140" className="w-full h-36">
            <rect width="200" height="140" fill="#f0f9ff" rx="16" />
            {/* Salt shaker & cubic crystals */}
            <g transform="translate(40, 20)">
              {/* Shaker body */}
              <path d="M20 30 L30 100 L70 100 L80 30 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" opacity="0.9" />
              {/* Shaker metal cap */}
              <path d="M24 30 L76 30 L70 15 L30 15 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
              {/* Holes */}
              <circle cx="45" cy="22" r="2" fill="#334155" />
              <circle cx="55" cy="22" r="2" fill="#334155" />
              {/* Grains inside */}
              <rect x="35" y="60" width="30" height="35" fill="#ffffff" opacity="0.7" rx="4" />
            </g>
            {/* 3D Cubic Salt Crystals scattered */}
            <g transform="translate(120, 50)">
              {/* Cube 1 */}
              <polygon points="20,10 40,0 60,10 40,20" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <polygon points="20,10 40,20 40,40 20,30" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
              <polygon points="60,10 40,20 40,40 60,30" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Sparkles */}
              <circle cx="45" cy="8" r="2" fill="#38bdf8" />
              <circle cx="68" cy="25" r="1.5" fill="#38bdf8" />
            </g>
          </svg>
        );

      case 'fertilizer':
        return (
          <svg viewBox="0 0 200 140" className="w-full h-36">
            <rect width="200" height="140" fill="#f0fdf4" rx="16" />
            {/* Growing plant shoot */}
            <g transform="translate(45, 25)">
              <path d="M50 90 Q48 50 25 35 Q40 45 50 65 Q60 45 75 35 Q52 50 50 90" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
              <circle cx="25" cy="35" r="3" fill="#86efac" />
              <circle cx="75" cy="35" r="3" fill="#86efac" />
            </g>
            {/* Fertilizer sack & granules */}
            <g transform="translate(110, 45)">
              <path d="M10 20 L50 20 L55 75 L5 75 Z" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
              <text x="30" y="52" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="800">NPK</text>
              {/* Granules on ground */}
              <circle cx="5" cy="80" r="3" fill="#f59e0b" />
              <circle cx="15" cy="83" r="2.5" fill="#f59e0b" />
              <circle cx="25" cy="81" r="3" fill="#f59e0b" />
              <circle cx="45" cy="82" r="2.5" fill="#f59e0b" />
            </g>
          </svg>
        );

      case 'construction':
        return (
          <svg viewBox="0 0 200 140" className="w-full h-36">
            <rect width="200" height="140" fill="#fffbeb" rx="16" />
            {/* Marble pillars & limestone blocks */}
            <g transform="translate(30, 25)">
              {/* Limestone block */}
              <polygon points="10,20 40,10 70,20 40,30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
              <polygon points="10,20 40,30 40,60 10,50" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
              <polygon points="70,20 40,30 40,60 70,50" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
            </g>
            {/* Cement building structure */}
            <g transform="translate(110, 20)">
              <rect x="10" y="20" width="60" height="70" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="4" />
              <rect x="20" y="30" width="15" height="15" fill="#93c5fd" />
              <rect x="45" y="30" width="15" height="15" fill="#93c5fd" />
              <rect x="20" y="55" width="15" height="15" fill="#93c5fd" />
              <rect x="45" y="55" width="15" height="15" fill="#93c5fd" />
            </g>
          </svg>
        );

      case 'ceramic':
        return (
          <svg viewBox="0 0 200 140" className="w-full h-36">
            <rect width="200" height="140" fill="#fef2f2" rx="16" />
            {/* Industrial refractory furnace & ceramic pot */}
            <g transform="translate(35, 25)">
              {/* Furnace lining */}
              <rect x="10" y="20" width="50" height="65" rx="6" fill="#fca5a5" stroke="#dc2626" strokeWidth="2" />
              <path d="M25 65 Q35 40 45 65 Z" fill="#ef4444" />
              <circle cx="35" cy="50" r="4" fill="#fbbf24" />
            </g>
            {/* Glazed Ceramic bowl */}
            <g transform="translate(110, 45)">
              <ellipse cx="40" cy="30" rx="35" ry="12" fill="#99f6e4" stroke="#0d9488" strokeWidth="2" />
              <path d="M5 30 Q40 75 75 30 Z" fill="#2dd4bf" stroke="#0d9488" strokeWidth="2" />
              <ellipse cx="40" cy="65" rx="15" ry="4" fill="#0f766e" />
            </g>
          </svg>
        );

      case 'battery':
        return (
          <svg viewBox="0 0 200 140" className="w-full h-36">
            <rect width="200" height="140" fill="#faf5ff" rx="16" />
            {/* Battery cell with electrolyte and moving ions */}
            <g transform="translate(35, 25)">
              {/* Outer battery casing */}
              <rect x="10" y="15" width="110" height="60" rx="8" fill="#e9d5ff" stroke="#7c3aed" strokeWidth="2" />
              {/* Terminals */}
              <rect x="120" y="32" width="8" height="26" rx="2" fill="#a855f7" />
              {/* Internal electrodes */}
              <rect x="22" y="20" width="8" height="50" fill="#ef4444" rx="2" />
              <rect x="100" y="20" width="8" height="50" fill="#3b82f6" rx="2" />
              {/* Electrolyte fluid */}
              <rect x="35" y="20" width="60" height="50" fill="#f3e8ff" />
              {/* Floating Li+ ions */}
              <circle cx="50" cy="35" r="4" fill="#7c3aed" />
              <circle cx="70" cy="50" r="4" fill="#7c3aed" />
              <circle cx="85" cy="35" r="4" fill="#7c3aed" />
            </g>
          </svg>
        );

      case 'watertreatment':
        return (
          <svg viewBox="0 0 200 140" className="w-full h-36">
            <rect width="200" height="140" fill="#ecfeff" rx="16" />
            {/* Water filtration cone & drop */}
            <g transform="translate(35, 20)">
              {/* Filter funnel */}
              <polygon points="20,15 90,15 65,65 45,65" fill="#cffafe" stroke="#0891b2" strokeWidth="2" />
              <rect x="50" y="65" width="10" height="20" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
              {/* Filter paper layer */}
              <polygon points="28,25 82,25 60,55 50,55" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
              {/* Pure water droplets */}
              <circle cx="55" cy="95" r="4" fill="#06b6d4" />
              <circle cx="55" cy="108" r="3" fill="#06b6d4" />
            </g>
            {/* Chemical reagent bottle */}
            <g transform="translate(125, 35)">
              <rect x="10" y="20" width="40" height="55" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <rect x="22" y="12" width="16" height="8" fill="#64748b" rx="2" />
              <rect x="16" y="35" width="28" height="20" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" rx="2" />
              <text x="30" y="49" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="800">CaCl₂</text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 7 • Galeri Aplikasi Nyata Senyawa Ionik
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Senyawa Ionik di Sekitar Kita!
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Dari meja makan hingga baterai kendaraan listrik dan tungku peleburan baja berteknologi tinggi, senyawa ionik memegang peranan krusial bagi kehidupan dan peradaban manusia.
          </p>
        </div>
      </div>

      {/* 6 Illustrated Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REAL_WORLD_APPLICATIONS.map((app) => (
          <div
            key={app.id}
            onClick={() => handleCardClick(app)}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Illustration Header */}
              <div className="p-3 border-b border-slate-100">
                {renderIllustration(app.visualType)}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full inline-block">
                  {app.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-800 group-hover:text-teal-700 transition">
                  {app.title}
                </h3>
                <div className="text-xs font-mono font-bold text-slate-500 flex items-center gap-2">
                  <span>Rumus:</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-black">{app.formula}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {app.description}
                </p>
              </div>
            </div>

            {/* Card Footer action */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:bg-teal-50/50 transition">
              <span>Buka Detail & Model Ion</span>
              <Eye className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal Overlay */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
                  {selectedApp.category}
                </span>
                <h3 className="text-xl font-black text-slate-800">{selectedApp.title}</h3>
                <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                  Senyawa: {selectedApp.compoundName} ({selectedApp.formula})
                </span>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Illustration */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                {renderIllustration(selectedApp.visualType)}
              </div>

              {/* Ions Present */}
              <div className="p-3.5 bg-teal-50/60 border border-teal-200 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">
                  Ion-Ion Pembentuk yang Terlibat:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.ions.map((ionStr, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white border border-teal-300 text-teal-800 font-bold rounded-lg text-xs font-mono shadow-xs"
                    >
                      {ionStr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-1 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block">Peran & Fungsi Kimia:</span>
                <p>{selectedApp.description}</p>
                <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-medium">
                  <strong>Manfaat Kunci:</strong> {selectedApp.keyRole}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Kembali ke Galeri
              </button>

              {onNavigateToCrystal && (
                <button
                  onClick={() => {
                    closeModal();
                    onNavigateToCrystal();
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Lihat Model Kisi 3D</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mascot note */}
      <LabMascot
        mood="excited"
        message="Banyak produk komersial (seperti garam dapur atau pupuk) adalah campuran dengan bahan pengaya yang bermanfaat. Namun komponen utamanya selalu mengandalkan ikatan ionik yang kuat dan kestabilan kisi kristal!"
      />
    </div>
  );
};
