/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChemicalElement {
  id: string;
  name: string;
  symbol: string;
  atomicNumber: number;
  massNumber: number;
  shells: number[]; // e.g. [2, 8, 1]
  valenceElectrons: number;
  subshellConfig: string; // e.g. "1s² 2s² 2p⁶ 3s¹"
  category: 'metal' | 'nonmetal';
  color: string;
  typicalIon: string;
  ionCharge: number;
  ionReason: string;
  ionicRadiusPm: number;
  atomicRadiusPm: number;
  funFact: string;
}

export interface Ion {
  id: string;
  name: string;
  symbol: string;
  charge: number; // positive for cations, negative for anions
  chargeString: string; // e.g. "+1", "+2", "-1", "-2"
  color: string;
  radius: number; // visual scale
  type: 'cation' | 'anion';
  electronConfig: string;
  originAtom: string;
}

export interface CrystalType {
  id: 'nacl' | 'mgo' | 'cscl';
  name: string;
  formula: string;
  cation: string;
  anion: string;
  cationColor: string;
  anionColor: string;
  cationRadius: number;
  anionRadius: number;
  coordinationNumber: string;
  latticeType: string;
  meltingPoint: string;
  description: string;
  whySimplestRatio: string;
}

export interface QuizQuestion {
  id: number;
  type: 'tf' | 'mcma' | 'essay';
  title: string;
  question: string;
  diagramType?: 'transfer' | 'lattice' | 'table';
  points: number;
  // For True/False
  tfCorrect?: boolean;
  // For MCMA
  options?: string[];
  correctOptions?: number[]; // indices of correct answers
  // For Essay
  modelAnswer?: string;
  rubricCriteria?: {
    score3: string;
    score2: string;
    score1: string;
    score0: string;
  };
  explanation: string;
}

export interface RealWorldApplication {
  id: string;
  title: string;
  category: string;
  compoundName: string;
  formula: string;
  ions: string[];
  description: string;
  keyRole: string;
  visualType: 'salt' | 'fertilizer' | 'construction' | 'ceramic' | 'battery' | 'watertreatment';
  colorTheme: string;
}
