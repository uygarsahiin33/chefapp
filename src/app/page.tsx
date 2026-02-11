"use client";
import React, { useEffect } from 'react';
import { useChefStore } from '@/store/useChefStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerElement } from '@/components/timer'; 
import { RECIPES } from '@/data/recipes';

export default function Home() {
  const store = useChefStore();
  
  const cuisines = ["Hepsi", ...Array.from(new Set(RECIPES.map(r => r.cuisine)))];
  const categories = ["Hepsi", ...Array.from(new Set(RECIPES.map(r => r.category)))];

  const filteredRecipes = RECIPES.filter(r => {
    const cMatch = store.cuisineFilter === "Hepsi" || r.cuisine === store.cuisineFilter;
    const catMatch = store.categoryFilter === "Hepsi" || r.category === store.categoryFilter;
    return cMatch && catMatch;
  });

  const allIngredientsChecked = store.selectedRecipe && 
    store.selectedRecipe.ingredients.every((i: string) => store.selectedIngredients[i]);

  useEffect(() => {
    if (store.view === 'ingredients' && allIngredientsChecked) {
      const timer = setTimeout(() => store.setView('assistant'), 600);
      return () => clearTimeout(timer);
    }
  }, [allIngredientsChecked, store.view]);

  return (
    <main className="min-h-screen bg-[#b00020] p-4 flex justify-center items-center font-sans">
      <div className="bg-white w-full max-w-md min-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border-8 border-white">
        <AnimatePresence mode="wait">
          
          {/* EKRAN 1: TARİF LİSTESİ */}
          {store.view === 'welcome' && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
              <h1 className="text-3xl font-black mb-1 text-slate-900">Mutfak Asistanı</h1>
              <p className="text-slate-500 text-sm mb-8 font-bold italic">Bugün ne pişirmek istersin şef?</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-widest">Mutfak</label>
                  <select value={store.cuisineFilter} onChange={(e) => store.setCuisineFilter(e.target.value)} className="bg-slate-100 p-4 rounded-2xl text-sm font-black border-2 border-slate-200 text-slate-900 outline-none cursor-pointer">
                    {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 ml-2 tracking-widest">Kategori</label>
                  <select value={store.categoryFilter} onChange={(e) => store.setCategoryFilter(e.target.value)} className="bg-slate-100 p-4 rounded-2xl text-sm font-black border-2 border-slate-200 text-slate-900 outline-none cursor-pointer">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-4 h-[50vh] overflow-y-auto pr-1">
                {filteredRecipes.map(r => (
                  <button key={r.id} onClick={() => store.setRecipe(r)} className="w-full bg-[#b00020] text-white p-6 rounded-[2.5rem] text-left active:scale-95 transition-all shadow-xl hover:bg-red-700">
                    <div className="font-black text-xl mb-2">{r.name}</div>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-black bg-black/20 px-3 py-1 rounded-full uppercase tracking-tighter">{r.cuisine}</span>
                      <span className="text-[10px] font-black bg-black/20 px-3 py-1 rounded-full uppercase tracking-tighter">{r.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* EKRAN 2: MALZEME LİSTESİ */}
          {store.view === 'ingredients' && store.selectedRecipe && (
            <motion.div key="ing" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="p-8 flex flex-col h-full">
              <button onClick={store.resetApp} className="bg-slate-100 text-slate-800 font-black text-xs px-4 py-2 rounded-full mb-6 w-fit active:scale-90 transition-transform tracking-widest uppercase">← Geri</button>
              <h2 className="text-3xl font-black mb-2 text-slate-900 leading-tight">{store.selectedRecipe.name}</h2>
              <p className="text-sm font-bold text-[#b00020] mb-8 uppercase tracking-widest">Malzemeleri Hazırla</p>
              
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[50vh] pr-2">
                {store.selectedRecipe.ingredients.map((ing: string) => (
                  <label key={ing} className={`flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all cursor-pointer shadow-sm ${store.selectedIngredients[ing] ? 'border-green-600 bg-green-50' : 'border-slate-200 bg-slate-50'}`}>
                    <input type="checkbox" checked={store.selectedIngredients[ing] || false} onChange={() => store.toggleIngredient(ing)} className="w-6 h-6 accent-green-600 rounded-lg cursor-pointer" />
                    <span className={`font-black text-lg ${store.selectedIngredients[ing] ? 'text-green-700 line-through opacity-40' : 'text-slate-800'}`}>{ing}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* EKRAN 3: MUTFAK ASİSTANI (GERİ BUTONU DAHİL) */}
          {store.view === 'assistant' && store.selectedRecipe && (
            <motion.div key="step" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 flex flex-col h-full items-center text-center">
              <div className="w-full flex justify-between items-center mb-8">
                <div className="bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                  ADIM {store.step + 1} / {store.selectedRecipe.steps.length}
                </div>
                <button onClick={store.resetApp} className="text-[10px] font-black text-[#b00020] uppercase tracking-widest">İptal</button>
              </div>

              <motion.h3 key={store.step} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-black text-slate-900 mb-6 leading-snug min-h-[100px] flex items-center justify-center">
                {store.selectedRecipe.steps[store.step].text}
              </motion.h3>

              {store.selectedRecipe.steps[store.step].timer > 0 && (
                <TimerElement key={`timer-${store.step}`} totalSeconds={store.selectedRecipe.steps[store.step].timer} />
              )}

              <div className="mt-auto w-full flex gap-3">
                {store.step > 0 && (
                  <button 
                    onClick={() => store.setStep(store.step - 1)} 
                    className="flex-1 py-6 bg-slate-100 text-slate-900 rounded-[2.5rem] font-black shadow-md active:scale-95 transition-transform text-xs uppercase tracking-widest"
                  >
                    Geri
                  </button>
                )}
                <button 
                  onClick={() => { 
                    if (store.step < store.selectedRecipe.steps.length - 1) store.setStep(store.step + 1); 
                    else store.setView('done'); 
                  }} 
                  className={`py-6 bg-[#b00020] text-white rounded-[2.5rem] font-black shadow-2xl active:scale-95 transition-transform uppercase tracking-widest ${store.step > 0 ? 'flex-[2] text-sm' : 'w-full text-lg'}`}
                >
                  {store.step < store.selectedRecipe.steps.length - 1 ? "Sonraki" : "PİŞİRMEYİ BİTİR"}
                </button>
              </div>
            </motion.div>
          )}

          {/* EKRAN 4: BİTİŞ */}
          {store.view === 'done' && (
            <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
              <div className="text-8xl mb-8 drop-shadow-lg">👨‍🍳</div>
              <h2 className="text-4xl font-black mb-4 text-slate-900 tracking-tighter italic">AFİYET OLSUN!</h2>
              <p className="text-slate-500 font-bold mb-12 uppercase tracking-widest">Mükemmel bir iş çıkardın şef.</p>
              <button onClick={store.resetApp} className="w-full py-6 bg-[#b00020] text-white rounded-[2.5rem] font-black shadow-xl active:scale-95 transition-all text-lg uppercase tracking-widest">Başa Dön</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}