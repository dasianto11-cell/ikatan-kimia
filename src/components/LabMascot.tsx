/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MascotProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'thinking' | 'excited' | 'explaining';
  className?: string;
}

export const LabMascot: React.FC<MascotProps> = ({
  message,
  size = 'md',
  mood = 'happy',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-24 h-28',
    lg: 'w-32 h-36'
  }[size];

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {/* SVG Mascot Character: Dr. Kimi */}
      <div className={`relative flex-shrink-0 ${sizeClasses}`}>
        <svg
          viewBox="0 0 120 140"
          className="w-full h-full drop-shadow-md select-none transition-transform hover:scale-105 duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hair back */}
          <path d="M30 45 C30 15, 90 15, 90 45 C95 40, 95 65, 88 68 C80 25, 40 25, 32 68 C25 65, 25 40, 30 45 Z" fill="#3b2d54" />
          
          {/* Ears */}
          <circle cx="28" cy="56" r="7" fill="#fed7aa" />
          <circle cx="92" cy="56" r="7" fill="#fed7aa" />
          
          {/* Head */}
          <ellipse cx="60" cy="55" rx="30" ry="28" fill="#ffedd5" />
          
          {/* Cheeks blush */}
          <circle cx="40" cy="62" r="5" fill="#fda4af" opacity="0.6" />
          <circle cx="80" cy="62" r="5" fill="#fda4af" opacity="0.6" />

          {/* Safety Goggles Band */}
          <path d="M26 50 Q60 46 94 50" stroke="#0284c7" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Safety Goggles Lenses */}
          <g>
            {/* Left lens */}
            <rect x="34" y="42" width="22" height="18" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            <path d="M37 46 L43 44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Bridge */}
            <path d="M56 50 Q60 48 64 50" stroke="#0284c7" strokeWidth="2.5" fill="none" />
            {/* Right lens */}
            <rect x="64" y="42" width="22" height="18" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            <path d="M67 46 L73 44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Eyes behind goggles */}
          {mood === 'excited' ? (
            <>
              {/* Starry / cheerful eyes */}
              <path d="M41 53 Q45 47 49 53" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M71 53 Q75 47 79 53" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="45" cy="50" r="3" fill="#1e293b" />
              <circle cx="75" cy="50" r="3" fill="#1e293b" />
              <path d="M40 45 L48 47" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M72 47 L80 44" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="45" cy="52" r="3" fill="#1e293b" />
              <circle cx="46" cy="51" r="1" fill="#ffffff" />
              <circle cx="75" cy="52" r="3" fill="#1e293b" />
              <circle cx="76" cy="51" r="1" fill="#ffffff" />
            </>
          )}

          {/* Smile */}
          {mood === 'excited' ? (
            <path d="M52 64 Q60 74 68 64 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="1" />
          ) : mood === 'thinking' ? (
            <path d="M55 67 Q62 65 66 68" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M53 65 Q60 71 67 65" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}

          {/* Hair bangs front */}
          <path d="M38 34 Q50 38 60 30 Q70 38 82 34 Q75 24 60 25 Q45 24 38 34 Z" fill="#3b2d54" />

          {/* Lab Coat & Body */}
          <path d="M40 82 L28 135 L92 135 L80 82 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Inner Shirt (Mint Green) */}
          <polygon points="52,82 68,82 60,98" fill="#14b8a6" />
          {/* Lab Coat Collars */}
          <path d="M40 82 L52 98 L60 82 L48 76 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <path d="M80 82 L68 98 L60 82 L72 76 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          
          {/* Lab Coat Buttons */}
          <circle cx="60" cy="108" r="2" fill="#0d9488" />
          <circle cx="60" cy="118" r="2" fill="#0d9488" />
          <circle cx="60" cy="128" r="2" fill="#0d9488" />

          {/* Pocket with Pen */}
          <rect x="70" y="102" width="10" height="12" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.8" />
          <line x1="73" y1="98" x2="73" y2="104" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="77" y1="99" x2="77" y2="104" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" />

          {/* Holding Erlenmeyer Flask or Clipboard */}
          <g transform="translate(18, 92)">
            {/* Hand */}
            <circle cx="10" cy="12" r="5" fill="#fed7aa" />
            {/* Flask */}
            <path d="M8 2 L12 2 L12 8 L18 20 Q10 23 2 20 L8 8 Z" fill="#99f6e4" stroke="#0d9488" strokeWidth="1" opacity="0.85" />
            <path d="M4 17 Q10 20 16 17 L17 19.5 Q10 22.5 3 19.5 Z" fill="#2dd4bf" />
            {/* Bubbles in flask */}
            <circle cx="10" cy="15" r="1.5" fill="#ffffff" />
            <circle cx="13" cy="17" r="1" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Speech Bubble */}
      {message && (
        <div className="relative bg-white border-2 border-teal-200 rounded-2xl p-3.5 shadow-sm text-slate-800 text-sm max-w-sm sm:max-w-md animate-in fade-in slide-in-from-left-2 duration-300">
          {/* Arrow pointer */}
          <div className="absolute top-4 -left-2 w-3.5 h-3.5 bg-white border-b-2 border-l-2 border-teal-200 transform rotate-45" />
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-bold text-teal-800 text-xs uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              Dr. Kimi • Asisten Lab
            </span>
          </div>
          <p className="leading-relaxed font-medium text-slate-700 text-xs sm:text-sm">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};
