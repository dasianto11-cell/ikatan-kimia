/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, RotateCcw, CheckCircle2, Sparkles, Send, Download } from 'lucide-react';
import { LabMascot } from './LabMascot';
import { sound } from '../utils/audio';

export const LearningReflection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });

  const [saved, setSaved] = useState(false);

  const prompts = [
    {
      id: 'q1',
      title: '1. Pelepasan Elektron pada Kation',
      prompt: 'Apa yang terjadi pada elektron valensi ketika atom natrium (Na) berubah menjadi kation Na⁺?'
    },
    {
      id: 'q2',
      title: '2. Prinsip Kenetralan Muatan',
      prompt: 'Mengapa suatu senyawa ionik yang stabil harus bermuatan listrik netral (total muatan positif + muatan negatif = 0)?'
    },
    {
      id: 'q3',
      title: '3. Konduktivitas Larutan vs Padatan',
      prompt: 'Mengapa larutan natrium klorida dalam air dapat menghantarkan listrik dengan baik, sedangkan kristal garam padat pada umumnya tidak dapat?'
    },
    {
      id: 'q4',
      title: '4. Pasangan Ion vs Kisi Kristal 3D',
      prompt: 'Apa perbedaan esensial antara visualisasi satu pasang ion (Na⁺ Cl⁻) dengan struktur kisi kristal ionik 3 dimensi yang sesungguhnya di alam?'
    },
    {
      id: 'q5',
      title: '5. Evaluasi Pengalaman Belajarmu',
      prompt: 'Stasiun laboratorium virtual mana yang paling membantumu memahami konsep ikatan ionik secara mendalam, dan mengapa?'
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setSaved(true);
  };

  const handleReset = () => {
    sound.playClick();
    setAnswers({ q1: '', q2: '', q3: '', q4: '', q5: '' });
    setSaved(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 9 • Refleksi & Sintesis Pembelajaran
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Apa yang Telah Kamu Temukan?
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Tuliskan pemahaman dan wawasan baru yang kamu peroleh dari petualangan laboratorium virtual. Refleksi membantu memperkuat pemahaman konsep kimia SMA.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Refleksi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reflection Form */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <form onSubmit={handleSave} className="space-y-5">
            {prompts.map((p) => (
              <div key={p.id} className="space-y-2">
                <label htmlFor={`textarea-${p.id}`} className="text-xs font-extrabold text-slate-800 block">
                  {p.title}
                </label>
                <p className="text-xs text-slate-600 leading-relaxed">{p.prompt}</p>
                <textarea
                  id={`textarea-${p.id}`}
                  rows={2}
                  value={answers[p.id]}
                  onChange={(e) => setAnswers({ ...answers, [p.id]: e.target.value })}
                  placeholder="Ketik refleksimu di sini..."
                  className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-slate-200 focus:outline-teal-500 font-medium text-slate-800 bg-slate-50/50"
                />
              </div>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Simpan Lembar Refleksi</span>
              </button>

              {saved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Refleksi Berhasil Disimpan di Sesi Ini!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Mascot & Synthesis Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-teal-100 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Pesan Inti Pembelajaran
            </div>
            <blockquote className="text-sm font-semibold italic leading-relaxed text-teal-50">
              “Memahami ikatan ionik bukan sekadar menghafal rumus kimia, tetapi menelusuri bagaimana ion terbentuk, bagaimana muatan diseimbangkan, dan bagaimana gaya elektrostatik menyusun materi di sekitar kita.”
            </blockquote>
            <div className="pt-2 border-t border-teal-400/40 text-xs text-teal-100 font-medium">
              — Dr. Kimi, Instruktur Laboratorium Kimia SMA
            </div>
          </div>

          <LabMascot
            mood="happy"
            message="Kerja yang luar biasa! Kamu telah menjelajahi seluruh sudut laboratorium virtual ikatan ionik dari skala atomik hingga aplikasi industri modern!"
          />
        </div>
      </div>
    </div>
  );
};
