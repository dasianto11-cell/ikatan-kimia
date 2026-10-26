/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LabHeader, StationId } from './components/LabHeader';
import { LaboratoryHome } from './components/LaboratoryHome';
import { AtomicModelViewer } from './components/AtomicModelViewer';
import { ElectronTransferSimulator } from './components/ElectronTransferSimulator';
import { IonicFormulaBuilder } from './components/IonicFormulaBuilder';
import { CrystalLatticeViewer } from './components/CrystalLatticeViewer';
import { PropertiesInvestigation } from './components/PropertiesInvestigation';
import { VirtualConductivityLab } from './components/VirtualConductivityLab';
import { ApplicationsGallery } from './components/ApplicationsGallery';
import { QuizStation } from './components/QuizStation';
import { LearningReflection } from './components/LearningReflection';
import { Atom, Heart, Sparkles } from 'lucide-react';
import { sound } from './utils/audio';

export default function App() {
  const [currentStation, setCurrentStation] = useState<StationId>('home');
  const [visitedStations, setVisitedStations] = useState<Set<StationId>>(
    new Set<StationId>(['home'])
  );

  const handleSelectStation = (st: StationId) => {
    setCurrentStation(st);
    setVisitedStations((prev) => {
      const updated = new Set(prev);
      updated.add(st);
      return updated;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-800 flex flex-col font-sans selection:bg-teal-200 selection:text-teal-900">
      {/* Global Lab Navigation Bar */}
      <LabHeader
        currentStation={currentStation}
        onSelectStation={handleSelectStation}
        visitedStations={visitedStations}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentStation === 'home' && (
          <LaboratoryHome
            onSelectStation={handleSelectStation}
            visitedStations={visitedStations}
          />
        )}
        {currentStation === 'atomic' && <AtomicModelViewer />}
        {currentStation === 'transfer' && <ElectronTransferSimulator />}
        {currentStation === 'builder' && <IonicFormulaBuilder />}
        {currentStation === 'lattice' && <CrystalLatticeViewer />}
        {currentStation === 'properties' && <PropertiesInvestigation />}
        {currentStation === 'conductivity' && <VirtualConductivityLab />}
        {currentStation === 'applications' && (
          <ApplicationsGallery
            onNavigateToCrystal={() => handleSelectStation('lattice')}
          />
        )}
        {currentStation === 'quiz' && <QuizStation />}
        {currentStation === 'reflection' && <LearningReflection />}
      </main>

      {/* Modern Lab Footer */}
      <footer className="bg-white border-t border-teal-100 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Atom className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-slate-800">
              IONIC BOND LAB 3D
            </span>
            <span>— Laboratorium Virtual Kimia SMA</span>
          </div>

          <div className="text-center sm:text-right font-medium">
            <p>Dirancang untuk Presentasi Pembelajaran Kimia Interaktif Kelas X SMA</p>
            <p className="text-[11px] text-teal-700 mt-0.5">
              “Memahami ikatan ionik bukan sekadar menghafal rumus, melainkan memahami kestabilan elektrostatik materi.”
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
