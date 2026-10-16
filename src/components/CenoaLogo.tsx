import React from 'react';

interface CenoaLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  showSubtitle?: boolean;
}

export const CenoaLogo: React.FC<CenoaLogoProps> = ({
  className = 'h-10',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official styled emblem for Grupo Cenoa */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
        >
          {/* Automotive-inspired dynamic hexagonal badge */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="10"
            fill={isLight ? '#0F2747' : '#0F2747'}
            stroke={isLight ? '#06B6D4' : '#06B6D4'}
            strokeWidth="2"
          />
          {/* Dynamic speed curve and letter C */}
          <path
            d="M28 14C26.5 12.8 24.2 12 21.5 12C16.2 12 12 16.5 12 22C12 27.5 16.2 32 21.5 32C24.5 32 26.8 31.1 28.5 29.8"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Precision cyan apex indicator */}
          <path
            d="M23 18L30 22L23 26"
            stroke="#06B6D4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="22" r="2.5" fill="#38BDF8" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-extrabold tracking-wider text-lg ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            GRUPO CENOA
          </span>
          <span className="text-cyan-600 font-black text-lg">|</span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${
              isLight ? 'text-cyan-300' : 'text-cyan-700'
            }`}
          >
            Talent Assessment
          </span>
        )}
      </div>
    </div>
  );
};
