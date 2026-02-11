"use client";
import React, { useEffect, useState } from 'react';
import { useChefStore } from '@/store/useChefStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerElement } from '@/components/timer'; 
import { RECIPES } from '@/data/recipes';

export default function Home() {
  const store = useChefStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  
  const portionRatio = store.servings / 4;

  const cuisines = ["Hepsi", ...Array.from(new Set(RECIPES.map(r => r.cuisine)))];
  const categories = ["Hepsi", ...Array.from(new Set(RECIPES.map(r => r.category)))];

  const filteredRecipes = RECIPES.filter(r => {
    const cMatch = store.cuisineFilter === "Hepsi" || r.cuisine === store.cuisineFilter;
    const catMatch = store.categoryFilter === "Hepsi" || r.category === store.categoryFilter;
    const searchMatch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    return cMatch && catMatch && searchMatch;
  });

  const allIngredientsChecked = store.selectedRecipe?.ingredients.every(
    (i: any) => store.selectedIngredients[i.name]
  );

  useEffect(() => {
    if (store.view === 'ingredients' && allIngredientsChecked) {
      const timer = setTimeout(() => store.setView('assistant'), 600);
      return () => clearTimeout(timer);
    }
  }, [allIngredientsChecked, store.view]);

  const handleTimerUpdate = (status: boolean) => {
    setTimeout(() => setIsTimerFinished(status), 0);
  };

  const isButtonActive = () => {
    const currentStep = store.selectedRecipe?.steps[store.step];
    if (!currentStep) return false;
    return currentStep.timer === 0 || isTimerFinished;
  };

  return (
    <main className="min-h-screen bg-[#b00020] p-4 flex justify-center items-center font-sans">
      <div className="bg-white w-full max-w-md min-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border-8 border-white">
        
        {/* PROGRESS BAR */}
        <AnimatePresence>
          {store.view === 'assistant' && store.selectedRecipe && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 z-50"
            >
              <motion.div 
                className="h-full bg-[#b00020]"
                initial={{ width: 0 }}
                animate={{ width: `${((store.step + 1) / store.selectedRecipe.steps.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          
          {/* 1. LISTE EKRANI */}
          {store.view === 'welcome' && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
              <h1 className="text-3xl font-black mb-1 text-slate-900 tracking-tighter">Mutfak Asistanı</h1>
              <p className="text-slate-400 text-xs font-bold mb-6 italic opacity-80">Bugün ne pişirmek istersin şef?</p>
              
              <input 
                type="text" placeholder="Yemek ara..." value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full p-4 mb-4 bg-slate-50 rounded-2xl text-base font-black text-slate-900 outline-none border-2 border-slate-100 focus:border-[#b00020] transition-all placeholder:text-slate-300" 
              />

              <div className="grid grid-cols-2 gap-3 mb-6">
                <select value={store.cuisineFilter} onChange={(e) => store.setCuisineFilter(e.target.value)} className="bg-slate-50 p-3 rounded-xl text-[11px] font-black border-2 border-slate-100 text-slate-900 outline-none">
                  {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={store.categoryFilter} onChange={(e) => store.setCategoryFilter(e.target.value)} className="bg-slate-50 p-3 rounded-xl text-[11px] font-black border-2 border-slate-100 text-slate-900 outline-none">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-3 h-[45vh] overflow-y-auto pr-1">
                {filteredRecipes.map(r => (
                  <button key={r.id} onClick={() => store.setRecipe(r)} className="w-full bg-[#b00020] text-white p-4 rounded-2xl text-left active:scale-95 transition-all shadow-lg">
                    <div className="font-black text-lg leading-tight">{r.name}</div>
                    <div className="flex gap-2 mt-1.5 opacity-80">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-md">{r.cuisine}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* 2. MALZEME KONTROL EKRANI */}
          {store.view === 'ingredients' && store.selectedRecipe && (
            <motion.div key="ing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <button onClick={store.resetApp} className="bg-slate-100 text-slate-800 font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-widest">← Geri</button>
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border border-slate-100">
                  <button onClick={() => store.setServings(Math.max(1, store.servings - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm font-black text-[#b00020] active:scale-90">–</button>
                  <div className="px-2 text-center">
                    <div className="text-[11px] font-black text-slate-900 leading-none">{store.servings}</div>
                    <div className="text-[7px] font-bold text-slate-400 uppercase leading-none mt-0.5">Kişi</div>
                  </div>
                  <button onClick={() => store.setServings(store.servings + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm font-black text-[#b00020] active:scale-90">+</button>
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-900 leading-tight">{store.selectedRecipe.name}</h2>
              <p className="text-[10px] font-bold text-[#b00020] mb-6 uppercase tracking-[0.2em]">Hazırlık: Malzemeleri Seç</p>

              <div className="flex flex-col gap-3 overflow-y-auto max-h-[48vh] pr-2">
                {store.selectedRecipe.ingredients.map((ing: any) => (
                  <label key={ing.name} className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer ${store.selectedIngredients[ing.name] ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-slate-50'}`}>
                    <input type="checkbox" checked={store.selectedIngredients[ing.name] || false} onChange={() => store.toggleIngredient(ing.name)} className="w-5 h-5 accent-green-600 rounded" />
                    <span className={`font-black text-base ${store.selectedIngredients[ing.name] ? 'text-green-700 line-through opacity-40' : 'text-slate-800'}`}>
                      {Number((ing.amount * portionRatio).toFixed(1))} {ing.unit} {ing.name}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* 3. ASİSTAN EKRANI (MALZEME DESTEKLİ) */}
          {store.view === 'assistant' && store.selectedRecipe && (
            <motion.div key="step" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 flex flex-col h-full items-center text-center relative">
              <div className="w-full flex justify-between items-center mb-6 mt-2">
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Adım</span>
                  <span className="text-xl font-black text-slate-900 italic leading-none">{store.step + 1} / {store.selectedRecipe.steps.length}</span>
                </div>
                <button onClick={store.resetApp} className="text-[10px] font-black text-[#b00020] border-2 border-red-50 px-4 py-1.5 rounded-full uppercase tracking-tighter">Bitir</button>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-6 leading-tight min-h-[80px] flex items-center justify-center">
                {store.selectedRecipe.steps[store.step].text}
              </h3>

              {/* ADIMDAKİ MALZEMELER */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {store.selectedRecipe.steps[store.step].requiredIngredients?.length > 0 ? (
                  store.selectedRecipe.steps[store.step].requiredIngredients.map((ingId: string) => {
                    const ing = store.selectedRecipe.ingredients.find((i: any) => i.id === ingId);
                    if (!ing) return null;
                    return (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} key={ingId} className="bg-slate-900 text-white px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                        <span className="text-[10px] font-black text-yellow-400">
                          {Number((ing.amount * portionRatio).toFixed(1))} {ing.unit}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-tight">{ing.name}</span>
                      </motion.div>
                    );
                  })
                ) : (
                  <span className="text-[10px] font-bold text-slate-300 italic uppercase">Ek malzeme gerekmiyor</span>
                )}
              </div>
              
              {store.selectedRecipe.steps[store.step].timer > 0 && (
                <TimerElement totalSeconds={store.selectedRecipe.steps[store.step].timer} onTimerEnd={handleTimerUpdate} />
              )}
              
              <div className="mt-auto w-full flex gap-3 pt-4">
                {store.step > 0 && (
                  <button onClick={() => { store.setStep(store.step - 1); setIsTimerFinished(false); }} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase">Geri</button>
                )}
                <button 
                  onClick={() => { 
                    if (store.step < store.selectedRecipe.steps.length - 1) {
                      store.setStep(store.step + 1); setIsTimerFinished(false);
                    } else { store.setView('done'); }
                  }} 
                  className={`flex-[2] py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${isButtonActive() ? 'bg-[#b00020] text-white shadow-xl scale-105' : 'bg-red-50 text-red-200 cursor-not-allowed'}`}
                >
                  {store.step < store.selectedRecipe.steps.length - 1 ? "Sonraki Adım" : "PİŞİRMEYİ BİTİR"}
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. AFİYET OLSUN */}
          {store.view === 'done' && (
            <motion.div key="done" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-7xl mb-8 animate-bounce">👨‍🍳</div>
              <h2 className="text-4xl font-black mb-4 text-slate-900 italic tracking-tighter">HARİKAYDI!</h2>
              <p className="text-slate-400 font-bold mb-8 uppercase text-[10px] tracking-widest">Eline sağlık şef, yeni bir maceraya ne dersin?</p>
              <button onClick={store.resetApp} className="w-full py-5 bg-[#b00020] text-white rounded-[2rem] font-black shadow-xl text-sm uppercase tracking-widest active:scale-95 transition-all">Yeni Tarif Seç</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}