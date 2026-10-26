/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/chemistryData';
import { QuizQuestion } from '../types/chemistry';
import { LabMascot } from './LabMascot';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  BookOpen, 
  Eye, 
  Check,
  AlertTriangle
} from 'lucide-react';
import { sound } from '../utils/audio';

export const QuizStation: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // User responses
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean | null>>({});
  const [mcmaAnswers, setMcmaAnswers] = useState<Record<number, number[]>>({});
  const [essayScores, setEssayScores] = useState<Record<number, number>>({
    8: 0,
    9: 0,
    10: 0
  });
  const [essayTexts, setEssayTexts] = useState<Record<number, string>>({});
  const [essayReviewed, setEssayReviewed] = useState<Record<number, boolean>>({});

  const [quizFinished, setQuizFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  // Scoring calculation
  const calculateTotalScore = () => {
    let score = 0;

    // Q1 - Q3 (True/False - 1 pt each)
    QUIZ_QUESTIONS.filter((q) => q.type === 'tf').forEach((q) => {
      if (tfAnswers[q.id] === q.tfCorrect) {
        score += 1;
      }
    });

    // Q4 - Q7 (MCMA - 2 pts each if all correct matches, 1 pt if partial with no wrong choices)
    QUIZ_QUESTIONS.filter((q) => q.type === 'mcma').forEach((q) => {
      const selected = mcmaAnswers[q.id] || [];
      const correct = q.correctOptions || [];

      // Check exact match
      const isExact =
        selected.length === correct.length &&
        selected.every((val) => correct.includes(val));

      if (isExact) {
        score += 2;
      } else {
        // Partial credit: if at least 2 correct selected and 0 incorrect selected
        const hasWrong = selected.some((val) => !correct.includes(val));
        const correctCount = selected.filter((val) => correct.includes(val)).length;
        if (!hasWrong && correctCount >= 2) {
          score += 1;
        }
      }
    });

    // Q8 - Q10 (Essay self-assessment rubric - 3 pts each)
    score += (essayScores[8] || 0) + (essayScores[9] || 0) + (essayScores[10] || 0);

    return Math.min(20, score);
  };

  const handleTfSelect = (ans: boolean) => {
    sound.playClick();
    setTfAnswers((prev) => ({ ...prev, [question.id]: ans }));
  };

  const handleMcmaToggle = (optionIdx: number) => {
    sound.playClick();
    const current = mcmaAnswers[question.id] || [];
    const updated = current.includes(optionIdx)
      ? current.filter((i) => i !== optionIdx)
      : [...current, optionIdx];
    setMcmaAnswers((prev) => ({ ...prev, [question.id]: updated }));
  };

  const handleFinishQuiz = () => {
    sound.playSuccess();
    setQuizFinished(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleResetQuiz = () => {
    sound.playClick();
    setCurrentIdx(0);
    setTfAnswers({});
    setMcmaAnswers({});
    setEssayScores({ 8: 0, 9: 0, 10: 0 });
    setEssayTexts({});
    setEssayReviewed({});
    setQuizFinished(false);
    setShowReview(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-3xl border border-teal-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            Stasiun 8 • Kuis Uji Pemahaman Mandiri
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Tantangan Ikatan Ionik (Total 20 Poin)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Tepat 10 soal kimia SMA Kelas X: 3 Soal Benar/Salah (3p), 4 Soal Pilihan Ganda Kompleks (8p), dan 3 Soal Esai Analisis Kisi & Konduktivitas (9p).
          </p>
        </div>

        <button
          onClick={handleResetQuiz}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Mulai Ulang Kuis</span>
        </button>
      </div>

      {!quizFinished ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          {/* Progress Bar & Question Jump Pills */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Nomor Soal: {currentIdx + 1} dari 10</span>
              <span className="text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Bobot Soal: {question.points} Poin
              </span>
            </div>

            {/* Jump Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isActive = currentIdx === idx;
                const isAnswered =
                  q.type === 'tf'
                    ? tfAnswers[q.id] !== undefined
                    : q.type === 'mcma'
                    ? (mcmaAnswers[q.id] || []).length > 0
                    : essayReviewed[q.id];

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playClick();
                      setCurrentIdx(idx);
                    }}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-sm scale-105'
                        : isAnswered
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Box */}
          <div className="border-t border-slate-100 pt-5 space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                {question.title}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {question.question}
              </h3>
            </div>

            {/* Visual Diagrams for Q6 & Q7 if applicable */}
            {question.diagramType === 'transfer' && (
              <div className="p-4 bg-slate-950 rounded-2xl text-white text-center flex flex-col items-center justify-center space-y-2">
                <span className="text-xs text-amber-300 font-bold uppercase">
                  Diagram Transfer: Kalsium & Klorin
                </span>
                <div className="flex items-center gap-4 text-xs font-mono font-bold">
                  <span className="px-3 py-1.5 bg-amber-600/80 rounded-xl">Ca (2, 8, 8, 2)</span>
                  <span className="text-amber-400">melepas 2e⁻ ➔</span>
                  <span className="px-3 py-1.5 bg-emerald-600/80 rounded-xl">2 × Cl (2, 8, 7)</span>
                </div>
              </div>
            )}

            {question.diagramType === 'lattice' && (
              <div className="p-4 bg-slate-950 rounded-2xl text-white text-center flex flex-col items-center justify-center space-y-2">
                <span className="text-xs text-teal-300 font-bold uppercase">
                  Diagram Geometri Kisi Kristal Garam Batu (NaCl & MgO)
                </span>
                <p className="text-xs text-slate-300 max-w-md">
                  Setiap ion dikelilingi oleh 6 ion berlawanan muatan dalam geometri oktahedral 3 dimensi.
                </p>
              </div>
            )}

            {/* FORMAT 1: TRUE / FALSE (Q1 - Q3) */}
            {question.type === 'tf' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { value: true, label: 'BENAR', desc: 'Pernyataan ilmiah di atas adalah valid.' },
                  { value: false, label: 'SALAH', desc: 'Pernyataan ilmiah di atas tidak tepat.' },
                ].map((item) => {
                  const isSelected = tfAnswers[question.id] === item.value;
                  return (
                    <button
                      key={String(item.value)}
                      onClick={() => handleTfSelect(item.value)}
                      className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/80 shadow-xs'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                        isSelected ? 'bg-teal-600 text-white' : 'bg-slate-300 text-slate-700'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 text-sm block">{item.label}</span>
                        <span className="text-xs text-slate-500">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* FORMAT 2: MULTIPLE CORRECT ANSWERS (MCMA - Q4 - Q7) */}
            {question.type === 'mcma' && (
              <div className="space-y-3 pt-2">
                <div className="text-xs text-teal-800 bg-teal-50 p-2.5 rounded-xl border border-teal-200 font-semibold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>
                    Petunjuk: Pertanyaan ini memiliki <strong>lebih dari satu jawaban benar</strong>. Beri centang pada semua opsi yang tepat.
                  </span>
                </div>

                <div className="space-y-2">
                  {question.options?.map((optText, optIdx) => {
                    const isChecked = (mcmaAnswers[question.id] || []).includes(optIdx);
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleMcmaToggle(optIdx)}
                        className={`w-full text-left p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'border-teal-500 bg-teal-50/70 shadow-xs'
                            : 'border-slate-200 bg-slate-50/40 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0 ${
                          isChecked ? 'bg-teal-600 text-white' : 'border border-slate-300 bg-white'
                        }`}>
                          {isChecked && '✓'}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-800 flex-1 leading-relaxed">
                          {optText}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FORMAT 3: ESSAY QUESTIONS WITH TRANSPARENT RUBRICS (Q8 - Q10) */}
            {question.type === 'essay' && (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label htmlFor="essay-input" className="text-xs font-bold text-slate-700 block">
                    Tuliskan Jawaban & Penjelasan Ilmiahmu:
                  </label>
                  <textarea
                    id="essay-input"
                    rows={4}
                    value={essayTexts[question.id] || ''}
                    onChange={(e) => {
                      setEssayTexts({ ...essayTexts, [question.id]: e.target.value });
                    }}
                    placeholder="Ketik analisis konsep kimiamu di sini..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-slate-300 focus:outline-teal-500 font-medium text-slate-800 bg-slate-50/50"
                  />
                </div>

                {/* Model Answer & Self-Assessment Rubric Toggle */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-teal-600" />
                      Kunci Jawaban Model & Rubrik Mandiri (3 Poin)
                    </span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setEssayReviewed({
                          ...essayReviewed,
                          [question.id]: !essayReviewed[question.id]
                        });
                      }}
                      className="text-xs text-teal-700 font-bold hover:underline cursor-pointer"
                    >
                      {essayReviewed[question.id] ? 'Sembunyikan Kunci' : 'Tampilkan Kunci & Beri Skor Mandiri'}
                    </button>
                  </div>

                  {essayReviewed[question.id] && (
                    <div className="space-y-3 text-xs text-slate-700 leading-relaxed border-t border-slate-200 pt-3 animate-in fade-in">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                        <strong className="text-teal-800 block">Kunci Jawaban Model:</strong>
                        <p className="whitespace-pre-line text-slate-800">{question.modelAnswer}</p>
                      </div>

                      {/* 3-Point Rubric Criteria */}
                      <div className="space-y-1.5">
                        <span className="font-bold text-slate-700 block">Pilih Skor Sesuai Kriteria Rubrik:</span>
                        {[
                          { score: 3, label: '3 Poin (Lengkap & Tepat)', desc: question.rubricCriteria?.score3 },
                          { score: 2, label: '2 Poin (Cukup Lengkap)', desc: question.rubricCriteria?.score2 },
                          { score: 1, label: '1 Poin (Kurang Lengkap)', desc: question.rubricCriteria?.score1 },
                          { score: 0, label: '0 Poin (Belum Tepat)', desc: question.rubricCriteria?.score0 },
                        ].map((rub) => (
                          <button
                            key={rub.score}
                            onClick={() => {
                              sound.playClick();
                              setEssayScores({ ...essayScores, [question.id]: rub.score });
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                              essayScores[question.id] === rub.score
                                ? 'bg-teal-100 border-teal-400 text-teal-950 font-semibold'
                                : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              essayScores[question.id] === rub.score ? 'bg-teal-700 text-white' : 'bg-slate-200'
                            }`}>
                              {rub.score}
                            </span>
                            <div>
                              <strong className="block text-slate-800">{rub.label}</strong>
                              <span className="text-[11px] text-slate-600">{rub.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Prev / Next / Finish */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-5">
            <button
              onClick={() => {
                if (currentIdx > 0) {
                  sound.playClick();
                  setCurrentIdx(currentIdx - 1);
                }
              }}
              disabled={currentIdx === 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>

            {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentIdx(currentIdx + 1);
                }}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs transition shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 fill-slate-950" />
                <span>SELESAIKAN KUIS & LIHAT SKOR</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score & Review Screen */
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-teal-400 mx-auto flex items-center justify-center text-white shadow-xl">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-800">
              Selamat! Kamu Telah Menyelesaikan Kuis Ikatan Ionik!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Berikut adalah rekapitulasi perolehan skormu dari seluruh soal objektif dan esai mandiri.
            </p>
          </div>

          {/* Large Score Banner */}
          <div className="inline-flex flex-col items-center bg-teal-50 border-2 border-teal-200 rounded-3xl p-6 shadow-sm min-w-[240px]">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              Total Skor Akhir
            </span>
            <div className="text-5xl font-black text-teal-700 mt-1">
              {calculateTotalScore()}{' '}
              <span className="text-2xl font-bold text-slate-400">/ 20</span>
            </div>
            <span className="mt-2 text-xs font-bold px-3 py-1 bg-teal-600 text-white rounded-full">
              {calculateTotalScore() >= 16 ? 'Sangat Memuaskan (Master Ionik) 🌟' : calculateTotalScore() >= 12 ? 'Bagus Sekali (Lulus) 👍' : 'Perlu Pendalaman Konsep 📚'}
            </span>
          </div>

          {/* Actions: Review or Retry */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowReview(!showReview)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>{showReview ? 'Sembunyikan Pembahasan' : 'Lihat Seluruh Pembahasan Soal'}</span>
            </button>

            <button
              onClick={handleResetQuiz}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
          </div>

          {/* Full Question Review */}
          {showReview && (
            <div className="text-left border-t border-slate-200 pt-6 space-y-4">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                Pembahasan Lengkap 10 Soal Kuis:
              </h4>
              <div className="space-y-4">
                {QUIZ_QUESTIONS.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-800">
                        {q.id}. {q.title}
                      </span>
                      <span className="text-slate-400 font-bold">{q.points} Poin</span>
                    </div>
                    <p className="text-slate-700 font-medium">{q.question}</p>
                    <div className="p-3 bg-white rounded-xl border border-teal-200 text-teal-900 leading-relaxed">
                      <strong>Penjelasan Ilmiah:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <LabMascot
            mood="excited"
            message="Kunci sukses memahami ikatan ionik bukan sekadar menghafal rumus, melainkan memahami bagaimana transfer elektron terjadi dan gaya elektrostatik menstabilkan materi!"
          />
        </div>
      )}
    </div>
  );
};
