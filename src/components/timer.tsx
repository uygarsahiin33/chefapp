"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const TimerElement = ({ totalSeconds, onTimerEnd }: { totalSeconds: number, onTimerEnd?: (isEnded: boolean) => void }) => {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Güvenli bildirim: Render sırasında değil, render sonrası haber ver
  useEffect(() => {
    setRemaining(totalSeconds);
    setIsRunning(false);
    if (onTimerEnd) onTimerEnd(false); 
    
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [totalSeconds]); // onTimerEnd'i buraya eklemiyoruz ki sonsuz döngü olmasın

  const playDing = () => {
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const frequencies = [880, 1760];
      frequencies.forEach((freq, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, context.currentTime);
        gain.gain.setValueAtTime(index === 0 ? 0.3 : 0.15, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.5);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(); oscillator.stop(context.currentTime + 1.5);
      });
    } catch (e) { console.error(e); }
  };

  const startTimer = () => {
    if (isRunning || remaining <= 0) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsRunning(false);
          playDing();
          if (onTimerEnd) onTimerEnd(true); // Süre bittiğinde haber ver
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

  const format = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const progress = 1 - (remaining / totalSeconds);

  return (
    <div className="flex flex-col items-center gap-4 my-2 w-full scale-90">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#fee2e2" strokeWidth="12" />
          <motion.circle
            cx="100" cy="100" r="90" fill="none" stroke="#b00020" strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 90}
            animate={{ strokeDashoffset: (2 * Math.PI * 90) * progress }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <div className="absolute text-5xl font-black text-slate-900">{format(remaining)}</div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
        <button onClick={startTimer} disabled={isRunning || remaining === 0}
          className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all
            ${remaining === 0 ? 'bg-slate-100 text-slate-400' : isRunning ? 'bg-slate-100 text-slate-400' : 'bg-[#b00020] text-white shadow-md'}`}
        >
          {remaining === 0 ? 'BİTTİ' : 'BAŞLAT'}
        </button>
        <button onClick={stopTimer} disabled={!isRunning} className="py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold text-[10px] uppercase">Durdur</button>
        <button onClick={() => { stopTimer(); setRemaining(totalSeconds); if(onTimerEnd) onTimerEnd(false); }} className="py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold text-[10px] uppercase">Sıfırla</button>
      </div>
    </div>
  );
};