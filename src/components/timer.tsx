"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const TimerElement = ({ totalSeconds }: { totalSeconds: number }) => {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Yeni adım geldiğinde süreyi sıfırla
  useEffect(() => {
    setRemaining(totalSeconds);
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [totalSeconds]);

  const startTimer = () => {
    if (isRunning || remaining <= 0) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setRemaining(totalSeconds);
  };

  const format = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const progress = 1 - (remaining / totalSeconds);
  const circumference = 2 * Math.PI * 121;

  return (
    <div className="flex flex-col items-center gap-8 my-6 w-full">
      {/* İlerleme Halkası */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg width="260" height="260" className="transform -rotate-90">
          <circle cx="130" cy="130" r="121" fill="none" stroke="#fee2e2" strokeWidth="16" />
          <motion.circle
            cx="130" cy="130" r="121" fill="none" stroke="#b00020" strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * progress }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <div className="absolute text-6xl font-black text-slate-900 drop-shadow-sm">
          {format(remaining)}
        </div>
      </div>
      
      {/* 3'lü Buton Grubu */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm px-4">
        <button 
          onClick={startTimer} 
          disabled={isRunning || remaining === 0}
          className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-tighter transition-all shadow-md active:scale-95 ${isRunning ? 'bg-gray-100 text-gray-400' : 'bg-[#b00020] text-white'}`}
        >
          Başlat
        </button>

        <button 
          onClick={stopTimer} 
          disabled={!isRunning}
          className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-tighter transition-all shadow-md active:scale-95 ${!isRunning ? 'bg-gray-100 text-gray-400' : 'bg-slate-800 text-white'}`}
        >
          Durdur
        </button>

        <button 
          onClick={resetTimer} 
          className="py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-tighter shadow-sm active:scale-95"
        >
          Sıfırla
        </button>
      </div>

      {remaining === 0 && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1.1 }} className="text-[#b00020] font-black text-lg animate-pulse">
          Zaman Doldu! 🔔
        </motion.div>
      )}
    </div>
  );
};