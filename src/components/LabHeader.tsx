/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  Home, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/audio';

export type StationId = 
  | 'home' 
  | 'atomic' 
  | 'transfer' 
  | 'builder' 
  | 'lattice' 
  | 'properties' 
  | 'conductivity' 
  | 'applications' 
  | 'quiz' 
  | 'reflection';

interface LabHeaderProps {
  currentStation: StationId;
  onSelectStation: (station: StationId) => void;
  visitedStations: Set<StationId>;
}

export const STATIONS = [
  { id: 'home' as StationId, label: 'Lab Utama', icon: Home, short: 'Lab' },
  { id: 'atomic' as StationId, label: '1. Struktur Atom', icon: Atom, short: 'Atom' },
  { id: 'transfer' as StationId, label: '2. Transfer Elektron', icon: ArrowRightLeft, short: 'Transfer' },
  { id: 'builder' as StationId, label: '3. Rakit Senyawa', icon: Scale, short: 'Rakit' },
  { id: 'lattice' as StationId, label: '4. Kisi Kristal 3D', icon: Box, short: 'Kisi 3D' },
  { id: 'properties' as StationId, label: '5. Sifat Senyawa', icon: Flame, short: 'Sifat' },
  { id: 'conductivity' as StationId, label: '6. Uji Konduktivitas', icon: Zap, short: 'Uji Lab' },
  { id: 'applications' as StationId, label: '7. Aplikasi Nyata', icon: Sparkles, short: 'Aplikasi' },
  { id: 'quiz' as StationId, label: '8. Kuis Tantangan', icon: HelpCircle, short: 'Kuis (20p)' },
  { id: 'reflection' as StationId, label: '9. Refleksi', icon: BookOpen, short: 'Refleksi' },
];

export const LabHeader: React.FC<LabHeaderProps> = ({
  currentStation,
  onSelectStation,
  visitedStations
}) => {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    sound.enabled = newState;
    if (newState) sound.playClick();
  };

  const handleNav = (st: StationId) => {
    sound.playClick();
    onSelectStation(st);
    setMobileMenuOpen(false);
  };

  const progressPercent = Math.round((visitedStations.size / STATIONS.length) * 100);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Atom className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <div className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight tracking-tight flex items-center gap-1.5">
                IONIC BOND LAB <span className="text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded text-xs border border-teal-200">3D</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Laboratorium Virtual Kimia SMA Kelas X
              </p>
            </div>
          </button>

          {/* Desktop Nav Items (scrollable if screen is medium) */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {STATIONS.map((st) => {
              const Icon = st.icon;
              const isActive = currentStation === st.id;
              const isVisited = visitedStations.has(st.id);
              return (
                <button
                  key={st.id}
                  onClick={() => handleNav(st.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{st.short}</span>
                  {isVisited && !isActive && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls: Audio Toggle, Progress Indicator, Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Progress indicator pill */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100/80 border border-slate-200/80 rounded-full px-2.5 py-1 text-xs">
              <span className="text-slate-500 font-medium text-[11px]">Progres:</span>
              <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <span className="font-bold text-slate-700 text-[11px]">{visitedStations.size}/{STATIONS.length}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundOn ? 'Nonaktifkan Efek Suara' : 'Aktifkan Efek Suara'}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition border border-slate-200 cursor-pointer"
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-teal-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition border border-slate-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-teal-100 px-4 py-3 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Daftar Stasiun Laboratorium
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {STATIONS.map((st) => {
              const Icon = st.icon;
              const isActive = currentStation === st.id;
              const isVisited = visitedStations.has(st.id);
              return (
                <button
                  key={st.id}
                  onClick={() => handleNav(st.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-700 hover:bg-teal-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{st.label}</span>
                  </div>
                  {isVisited && (
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-teal-200' : 'text-emerald-500'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
