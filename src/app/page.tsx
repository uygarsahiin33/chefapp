"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react'; // useEffect ve useRef eklendi
import { useChefStore } from '@/store/useChefStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerElement } from '@/components/timer'; 
import { RECIPES } from '@/data/recipes';

export default function Home() {
  const store = useChefStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Hepsi");
  
  // ALARM GÖZCÜSÜ - BU KISIM EKLENDİ
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio('/bell.wav'); // Senin dosya adın

    const interval = setInterval(() => {
      if (store.isTimerActive && store.timerEndTimestamp) {
        const remaining = store.timerEndTimestamp - Date.now();
        if (remaining <= 0) {
          store.pauseGlobalTimer(0);
          audioRef.current?.play().catch(() => {});
          alert("⏰ SÜRE DOLDU ŞEF!");
          // Alarm çalınca asistan görünümüne atabiliriz
          if(store.view !== 'assistant') store.setView('assistant');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [store.isTimerActive, store.timerEndTimestamp, store.pauseGlobalTimer, store.setView, store.view]);
  // ----------------------------------

  const portionRatio = store.servings / 4;
  const currentStep = store.selectedRecipe?.steps[store.step];

  const theme = {
    bg: store.isDarkMode ? 'bg-zinc-950' : 'bg-white',
    text: store.isDarkMode ? 'text-zinc-50' : 'text-zinc-900',
    card: store.isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-100',
    input: store.isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-100 text-zinc-900',
    nav: store.isDarkMode ? 'bg-black border-zinc-900' : 'bg-white border-zinc-100',
    subText: store.isDarkMode ? 'text-zinc-500' : 'text-zinc-400',
    accent: '#b00020'
  };

  const categories = useMemo(() => {
    const cats = RECIPES.map(r => r.category);
    return ["Hepsi", ...Array.from(new Set(cats))];
  }, []);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "Hepsi" || r.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleSuggestRecipe = () => {
    const randomIdx = Math.floor(Math.random() * RECIPES.length);
    store.setRecipe(RECIPES[randomIdx]);
  };

  const canGoNext = !currentStep?.timer || store.pausedRemainingSeconds === 0;

  const renderRecipeCard = (r: any) => (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={r.id} className="relative mb-3">
      <button 
        onClick={() => store.setRecipe(r)} 
        className={`w-full ${store.isDarkMode ? 'bg-zinc-900 border-l-4 border-l-[#b00020]' : 'bg-[#b00020]'} text-white p-5 rounded-2xl text-left shadow-lg pr-14 transition-all active:scale-[0.98] border ${store.isDarkMode ? 'border-zinc-800' : 'border-transparent'}`}
      >
        <div className={`font-black text-lg italic uppercase leading-tight mb-1 ${store.isDarkMode ? 'text-white' : 'text-white'}`}>{r.name}</div>
        <div className="flex gap-2">
          <span className={`text-[8px] font-black uppercase tracking-widest ${store.isDarkMode ? 'bg-[#b00020]/20 text-[#b00020]' : 'bg-white/20 text-white'} px-2 py-0.5 rounded-md`}>{r.cuisine}</span>
          <span className={`text-[8px] font-black uppercase tracking-widest ${store.isDarkMode ? 'bg-white/5 text-zinc-400' : 'bg-black/20 text-white'} px-2 py-0.5 rounded-md`}>{r.category}</span>
        </div>
      </button>
      <button onClick={(e) => { e.stopPropagation(); store.toggleFavorite(r.id); }} className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl active:scale-125 transition-transform">
        {store.favorites.includes(r.id) ? "⭐" : "☆"}
      </button>
    </motion.div>
  );

  return (
    <main className={`min-h-screen ${store.isDarkMode ? 'bg-black' : 'bg-[#b00020]'} p-4 flex justify-center items-center font-sans transition-colors duration-500`}>
      <div className={`${theme.bg} w-full max-w-md h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative border-8 ${store.isDarkMode ? 'border-zinc-900' : 'border-white'}`}>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* 1. INTRO */}
            {store.view === 'intro' && (
              <motion.div key="intro" className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="text-8xl mb-6">👨‍🍳</motion.div>
                <h1 className={`text-4xl font-black italic uppercase leading-tight mb-2 ${theme.text}`}>Dijital Mutfak</h1>
                <p className={`text-xs font-bold uppercase tracking-widest mb-10 ${theme.subText}`}>Şefin Gizli Silahı</p>
                <div className="w-full space-y-3">
                  <button onClick={() => store.setView('welcome')} className="w-full py-5 bg-[#b00020] text-white rounded-full font-black shadow-xl uppercase tracking-widest transition-transform active:scale-95">Başlayalım</button>
                  <button onClick={handleSuggestRecipe} className={`w-full py-5 ${store.isDarkMode ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-zinc-100 text-zinc-600'} rounded-full font-black uppercase tracking-widest text-[10px]`}>🎲 Bana Bir Şey Öner</button>
                </div>
              </motion.div>
            )}

            {/* 2. KEŞFET */}
            {store.view === 'welcome' && (
              <motion.div key="welcome" className="p-6">
                <div className="flex justify-between items-end mb-4">
                  <h1 className={`text-3xl font-black italic uppercase ${theme.text}`}>Keşfet</h1>
                  <button onClick={handleSuggestRecipe} className="text-[10px] font-black text-[#b00020] uppercase border-b-2 border-[#b00020] pb-0.5">🎲 Rastgele</button>
                </div>
                <input type="text" placeholder="Bugün ne pişirelim şef?" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full p-4 mb-4 rounded-2xl font-bold border-2 outline-none focus:border-[#b00020] transition-all ${theme.input}`} />
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-[#b00020] text-white' : (store.isDarkMode ? 'bg-zinc-900 text-zinc-500 border border-zinc-800' : 'bg-zinc-100 text-zinc-400')}`}>{cat}</button>
                  ))}
                </div>
                <div className="mt-2">{filteredRecipes.map(renderRecipeCard)}</div>
              </motion.div>
            )}

            {/* 3. DEFTERİM */}
            {store.view === 'favorites' && (
              <motion.div key="favs" className="p-6">
                <h1 className={`text-3xl font-black italic uppercase mb-6 ${theme.text}`}>Defterim</h1>
                {RECIPES.filter(r => store.favorites.includes(r.id)).length > 0 ? RECIPES.filter(r => store.favorites.includes(r.id)).map(renderRecipeCard) : <div className={`text-center py-20 font-black uppercase text-[10px] ${theme.subText}`}>Henüz favori eklenmedi!</div>}
              </motion.div>
            )}

            {/* 4. PROFİL */}
            {store.view === 'profile' && (
              <motion.div key="profile" className="p-8">
                <h1 className={`text-3xl font-black italic uppercase mb-8 ${theme.text}`}>Ayarlar</h1>
                <div className="space-y-6">
                  <div className={`${theme.card} p-6 rounded-[2.5rem] border-2`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-4 text-center ${theme.subText}`}>Görünüm</span>
                    <div className={`flex p-1 rounded-2xl ${store.isDarkMode ? 'bg-black' : 'bg-white shadow-inner'}`}>
                      <button onClick={() => store.isDarkMode && store.toggleDarkMode()} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${!store.isDarkMode ? 'bg-[#b00020] text-white shadow-md' : 'text-zinc-600'}`}>☀️ Aydınlık</button>
                      <button onClick={() => !store.isDarkMode && store.toggleDarkMode()} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${store.isDarkMode ? 'bg-[#b00020] text-white shadow-md' : 'text-zinc-600'}`}>🌙 Karanlık</button>
                    </div>
                  </div>
                  <div className={`${theme.card} p-6 rounded-[2.5rem] border-2`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-4 text-center ${theme.subText}`}>Ölçü Birimi</span>
                    <div className={`flex p-1 rounded-2xl ${store.isDarkMode ? 'bg-black' : 'bg-white shadow-inner'}`}>
                      {['classic', 'metric'].map((type: any) => (
                        <button key={type} onClick={() => store.setUnitType(type)} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${store.unitType === type ? 'bg-[#b00020] text-white shadow-md' : 'text-zinc-600'}`}>
                          {type === 'classic' ? 'Bardak' : 'Gram'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. MALZEMELER */}
            {store.view === 'ingredients' && store.selectedRecipe && (
              <motion.div key="ing" className="p-8">
                <button onClick={() => store.setView('welcome')} className={`text-[10px] font-black uppercase mb-4 tracking-widest ${theme.subText}`}>← Geri</button>
                <h2 className={`text-2xl font-black italic uppercase mb-6 ${theme.text}`}>{store.selectedRecipe.name}</h2>
                <div className={`${theme.card} flex items-center gap-4 p-4 rounded-2xl mb-6 border-2`}>
                   <span className="text-xs font-black uppercase text-zinc-400">Porsiyon</span>
                   <div className="flex gap-2 ml-auto">
                      <button onClick={() => store.setServings(Math.max(1, store.servings - 1))} className={`w-8 h-8 rounded-xl shadow-sm font-black ${store.isDarkMode ? 'bg-black text-[#b00020]' : 'bg-white text-[#b00020]'}`}>-</button>
                      <span className={`w-6 text-center font-black ${theme.text}`}>{store.servings}</span>
                      <button onClick={() => store.setServings(store.servings + 1)} className={`w-8 h-8 rounded-xl shadow-sm font-black ${store.isDarkMode ? 'bg-black text-[#b00020]' : 'bg-white text-[#b00020]'}`}>+</button>
                   </div>
                </div>
                <div className="space-y-3 mb-6">
                {store.selectedRecipe.ingredients.map((ing: any) => (
                  <label key={ing.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${store.selectedIngredients[ing.name] ? 'border-green-500 bg-green-500/10 opacity-70' : theme.card}`}>
                    <input type="checkbox" checked={store.selectedIngredients[ing.name] || false} onChange={() => store.toggleIngredient(ing.name)} className="w-5 h-5 accent-green-600" />
                    <span className={`font-bold text-sm ${theme.text}`}>{Number((ing.amount * portionRatio).toFixed(1))} {ing.unit} {ing.name}</span>
                  </label>
                ))}
                </div>
                <button onClick={() => store.setView('assistant')} className="w-full py-5 bg-green-600 text-white rounded-full font-black shadow-lg uppercase tracking-widest mb-6 transition-transform active:scale-95">Mutfağa Gir!</button>
              </motion.div>
            )}

            {/* 6. ASİSTAN */}
            {store.view === 'assistant' && store.selectedRecipe && (
              <motion.div key="assist" className="flex-1 p-6 flex flex-col items-center">
                 <div className="w-full flex justify-between items-center mb-4 shrink-0">
                    <div className={`text-2xl font-black italic ${theme.text}`}>{store.step + 1}/{store.selectedRecipe.steps.length}</div>
                    <button onClick={store.resetApp} className="text-[10px] font-black text-[#b00020] uppercase tracking-tighter">İptal</button>
                 </div>
                 <h3 className={`text-xl font-black mb-4 leading-tight text-center px-2 shrink-0 ${theme.text}`}>{currentStep.text}</h3>
                 <div className="w-full flex flex-wrap justify-center gap-2 mb-6 max-h-[100px] overflow-y-auto no-scrollbar shrink-0">
                    {currentStep.requiredIngredients && currentStep.requiredIngredients.length > 0 ? (
                      currentStep.requiredIngredients.map((ingId: string) => {
                        const ing = store.selectedRecipe.ingredients.find((i: any) => i.id === ingId);
                        return ing ? (
                          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} key={ingId} className={`${store.isDarkMode ? 'bg-[#b00020]/10 text-[#b00020] border-[#b00020]/30' : 'bg-orange-50 text-orange-600 border-orange-100'} px-3 py-1.5 rounded-full text-[10px] font-bold border shadow-sm whitespace-nowrap`}>
                            {Number((ing.amount * portionRatio).toFixed(1))} {ing.unit} {ing.name}
                          </motion.span>
                        ) : null;
                      })
                    ) : (
                      <span className={`text-[10px] italic font-medium ${theme.subText}`}>Ek malzeme gerekmiyor.</span>
                    )}
                 </div>
                 <div className="flex-1 flex items-center justify-center w-full mb-6">
                    {currentStep.timer > 0 && <TimerElement totalSeconds={currentStep.timer} />}
                 </div>
                 <div className="w-full flex gap-3 mb-2 shrink-0">
                    <button onClick={() => store.setStep(Math.max(0, store.step - 1))} className={`flex-1 py-5 rounded-3xl font-black text-[10px] uppercase shadow-sm ${theme.card} ${theme.subText}`}>Geri</button>
                    <button onClick={() => store.step < store.selectedRecipe.steps.length - 1 ? store.setStep(store.step + 1) : store.setView('done')} disabled={!canGoNext} className={`flex-[2] py-5 rounded-3xl font-black text-xs uppercase transition-all shadow-xl ${canGoNext ? 'bg-[#b00020] text-white' : 'bg-red-50 text-red-100 cursor-not-allowed opacity-50'}`}>{store.step < store.selectedRecipe.steps.length - 1 ? "Sonraki Adım" : "Bitir"}</button>
                 </div>
              </motion.div>
            )}

            {/* 7. DONE EKRANI */}
            {store.view === 'done' && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="relative mb-6">
                  <div className="text-8xl animate-bounce">👨‍🍳</div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute -right-4 -top-2 text-4xl">✨</motion.div>
                </div>
                <h2 className={`text-4xl font-black italic leading-tight mb-2 ${theme.text}`}>BAŞARILI ŞEF!</h2>
                <p className={`text-sm font-bold uppercase tracking-widest mb-10 ${theme.subText}`}>Ellerine sağlık! 🔥</p>
                <button onClick={store.resetApp} className="w-full py-5 bg-[#b00020] text-white rounded-full font-black shadow-xl uppercase tracking-widest transition-transform active:scale-95">Yeni Tarif Seç</button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className={`${theme.nav} px-8 py-5 flex justify-between items-center z-50 shrink-0 border-t`}>
          <TabItem icon="🏠" label="Keşfet" active={store.view === 'welcome'} onClick={() => store.setView('welcome')} isDark={store.isDarkMode} />
          <TabItem icon="⭐" label="Defterim" active={store.view === 'favorites'} onClick={() => store.setView('favorites')} isDark={store.isDarkMode} />
          <TabItem icon={store.isTimerActive ? "⏳" : "🍳"} label="Mutfak" active={store.view === 'assistant' || store.view === 'ingredients'} isDark={store.isDarkMode} onClick={() => {
            if (!store.selectedRecipe) return alert("Önce tarif seç!");
            store.setView(store.step === 0 && !Object.values(store.selectedIngredients).some(v => v) ? 'ingredients' : 'assistant');
          }} />
          <TabItem icon="👤" label="Profil" active={store.view === 'profile'} onClick={() => store.setView('profile')} isDark={store.isDarkMode} />
        </div>
      </div>
    </main>
  );
}

function TabItem({ icon, label, active, onClick, isDark }: any) {
  const activeColor = 'text-[#b00020]';
  const inactiveColor = isDark ? 'text-zinc-700' : 'text-zinc-300';
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'scale-110 ' + activeColor : inactiveColor}`}>
      <span className="text-xl leading-none">{icon}</span>
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
      {active && <motion.div layoutId="tab-dot" className="w-1.5 h-1.5 bg-[#b00020] rounded-full mt-0.5" />}
    </button>
  );
}