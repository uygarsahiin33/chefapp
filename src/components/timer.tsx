"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useChefStore } from '@/store/useChefStore';

export const TimerElement = ({ totalSeconds }: { totalSeconds: number }) => {
  const { 
    timerEndTimestamp, 
    isTimerActive, 
    startGlobalTimer, 
    pauseGlobalTimer, 
    pausedRemainingSeconds, 
    isDarkMode 
  } = useChefStore();

  const [displaySeconds, setDisplaySeconds] = useState(totalSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && timerEndTimestamp) {
      interval = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((timerEndTimestamp - Date.now()) / 1000));
        setDisplaySeconds(remaining);
      }, 100);
    } else {
      setDisplaySeconds(pausedRemainingSeconds !== null ? pausedRemainingSeconds : totalSeconds);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timerEndTimestamp, totalSeconds, pausedRemainingSeconds]);

  const toggleTimer = () => {
    if (isTimerActive) {
      pauseGlobalTimer(displaySeconds);
    } else {
      startGlobalTimer(displaySeconds);
    }
  };

  // --- GÜVENLİ HESAPLAMA ALANI ---
  const circleRadius = 70;
  const circumference = 2 * Math.PI * circleRadius;
  
  // Progress hesaplanırken totalSeconds 0 ise veya henüz yüklenmediyse 0 döndürürüz
  const progress = totalSeconds > 0 ? ((totalSeconds - displaySeconds) / totalSeconds) * circumference : 0;
  
  // StrokeDashoffset için hesaplanan değerin sayı olduğundan emin oluyoruz (NaN hatasını keser)
  const safeOffset = isNaN(progress) ? circumference : circumference - progress;

  return (
    <div className="relative flex items-center justify-center w-48 h-48 my-4">
      <svg className="w-full h-full transform -rotate-90 overflow-visible">
        <circle 
          cx="96" cy="96" r={circleRadius} 
          stroke={isDarkMode ? "#18181b" : "#f1f5f9"} 
          strokeWidth="8" fill="transparent" 
        />
        <motion.circle
          cx="96" cy="96" r={circleRadius} 
          stroke="#b00020" strokeWidth="8" fill="transparent"
          strokeDasharray={circumference}
          // Burada undefined/NaN yerine safeOffset kullanarak hatayı engelledik
          animate={{ strokeDashoffset: safeOffset }}
          transition={{ duration: 0.5, ease: "linear" }}
          strokeLinecap="round"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-black tabular-nums transition-colors duration-300 ${
          isDarkMode ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-slate-900'
        }`}>
          {Math.floor(displaySeconds / 60)}:{(displaySeconds % 60).toString().padStart(2, '0')}
        </span>
        
        <button
          onClick={toggleTimer}
          className={`mt-3 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 ${
            isTimerActive 
              ? (isDarkMode ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' : 'bg-slate-100 text-slate-400') 
              : 'bg-[#b00020] text-white shadow-[#b00020]/20'
          }`}
        >
          {isTimerActive ? 'DURAKLAT' : 'BAŞLAT'}
        </button>
      </div>
    </div>
  );
};