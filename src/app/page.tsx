"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useChefStore } from '@/store/useChefStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerElement } from '@/components/timer'; 
import { RECIPES } from '@/data/recipes';

export default function Home() {
  // Store'dan sadece ihtiyacımız olan fonksiyonları ve verileri seçiyoruz
  // Bu sayede gereksiz render'lardan ve sonsuz döngülerden kaçınıyoruz.
  const store = useChefStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Hepsi");
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [showSelectionWarning, setShowSelectionWarning] = useState(false); 
  
  const ALLERGEN_OPTIONS = ["gluten", "laktoz", "yumurta", "kuruyemiş", "soya"];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const finishAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- KULLANICI PORSİYON TERCİHİ ---
  const [userDefaultServings, setUserDefaultServings] = useState(1);

  // Ses dosyaları init
  useEffect(() => {
    audioRef.current = new Audio('/bell.wav');
    finishAudioRef.current = new Audio('/finish.wav');
  }, []);

  // Global Timer Takibi
  useEffect(() => {
    const interval = setInterval(() => {
      if (store.isTimerActive && store.timerEndTimestamp) {
        const remaining = store.timerEndTimestamp - Date.now();
        if (remaining <= 0) {
          store.pauseGlobalTimer(0);
          audioRef.current?.play().catch(() => {});
          setShowAlarmModal(true);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [store.isTimerActive, store.timerEndTimestamp]);

  // Bitiş Sesi
  useEffect(() => {
    if (store.view === 'done') {
      finishAudioRef.current?.play().catch((err) => console.log("Ses hatası:", err));
    }
  }, [store.view]);

  // KRİTİK DÜZELTME: Sonsuz döngü ve Hook Error engellendi
  // Sadece tarif ID değiştiğinde porsiyonu güncelle
  const selectedRecipeId = store.selectedRecipe?.id;
  const setServings = store.setServings;

  useEffect(() => {
    if (selectedRecipeId) {
      setServings(userDefaultServings);
    }
  }, [selectedRecipeId, userDefaultServings, setServings]);

  const portionRatio = store.servings / 4;
  const currentStep = store.selectedRecipe?.steps[store.step];
  const getCategoryEmoji = (cat: string) => {
    const emojis: Record<string, string> = {
      "Kahvaltı": "🍳", 
      "Çorba": "🥣", 
      "Ana Yemek": "🥘", 
      "Tatlı": "🍰", 
      "Başlangıç": "🥗", 
      "Hamur İşi": "🥐", 
      "Deniz Ürünleri": "🐟", 
      "Et Yemekleri": "🥩", 
      "Salata": "🥗", 
      "İçecek": "🥤",
      "Makarna": "🍝",
      "Atıştırmalık": "🍿",
      "Meze": "🍶"
    };
    return emojis[cat] || "🍽️";
  };
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

  const allIngredients = useMemo(() => {
    const ingredients = RECIPES.flatMap(r => r.ingredients.map(i => i.name));
    return Array.from(new Set(ingredients)); // Tekrar edenleri temizle
  }, []);
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(r => {
      // 1. Temel Filtreler (Arama ve Kategori)
      const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "Hepsi" || r.category === activeCategory;
      
      // 2. SİHİRLİ FİLTRE: "Elimdekiler bu tarifi yapmaya yetiyor mu?"
      // Kullanıcının discovery ekranında seçtiği malzemeler
      const selectedIngNames = Object.keys(store.selectedIngredients)
        .filter(name => store.selectedIngredients[name])
        .map(name => name.toLowerCase());

      // EĞER malzeme seçilmediyse tüm tarifleri göster (opsiyonel, istersen boş da bırakabilirsin)
      if (selectedIngNames.length === 0) return matchesSearch && matchesCategory;

      // KRİTİK NOKTA: Tarifteki HER BİR zorunlu malzeme, kullanıcının seçtikleri arasında var mı?
      const hasEverything = r.ingredients.every(recipeIng => 
        selectedIngNames.some(userIng => 
          recipeIng.name.toLowerCase().includes(userIng) || 
          userIng.includes(recipeIng.name.toLowerCase())
        )
      );

      return matchesSearch && matchesCategory && hasEverything;
    });
  }, [searchTerm, activeCategory, store.selectedIngredients]);
 
  const handleSuggestRecipe = () => {
    const randomIdx = Math.floor(Math.random() * RECIPES.length);
    store.setRecipe(RECIPES[randomIdx]);
  };

  const canGoNext = !currentStep?.timer || store.pausedRemainingSeconds === 0;

  const renderRecipeCard = (r: any) => {
    const hasAllergen = r.allergens?.some((a: string) => store.userAllergens.includes(a));
    return (
      <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={r.id} className="relative mb-3">
        <button 
          onClick={() => store.setRecipe(r)} 
          className={`w-full ${store.isDarkMode ? 'bg-zinc-900 border-l-4 border-l-[#b00020]' : 'bg-[#b00020]'} text-white p-5 rounded-2xl text-left shadow-lg pr-14 transition-all active:scale-[0.98] border ${store.isDarkMode ? 'border-zinc-800' : 'border-transparent'} ${hasAllergen ? 'opacity-60 saturate-[0.2]' : ''}`}
        >
          <div className="flex justify-between items-start mb-1">
            <div className="font-black text-lg italic uppercase leading-tight text-white">{r.name}</div>
            {hasAllergen && <span className="text-lg">⚠️</span>}
          </div>
          <div className="flex gap-2">
            <span className={`text-[8px] font-black uppercase tracking-widest ${store.isDarkMode ? 'bg-[#b00020]/20 text-[#b00020]' : 'bg-white/20 text-white'} px-2 py-0.5 rounded-md`}>{r.cuisine}</span>
            <span className={`text-[8px] font-black uppercase tracking-widest ${store.isDarkMode ? 'bg-white/5 text-zinc-400' : 'bg-black/20 text-white'} px-2 py-0.5 rounded-md`}>{r.category}</span>
            {r.diet !== 'Hepçil' && <span className="text-[8px] font-black uppercase tracking-widest bg-green-500/20 text-green-300 px-2 py-0.5 rounded-md">{r.diet}</span>}
          </div>
        </button>
        <button onClick={(e) => { e.stopPropagation(); store.toggleFavorite(r.id); }} className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl active:scale-125 transition-transform">
          {store.favorites.includes(r.id) ? "⭐" : "☆"}
        </button>
      </motion.div>
    );
  };

  return (
    <main className={`min-h-screen ${store.isDarkMode ? 'bg-black' : 'bg-[#b00020]'} p-4 flex justify-center items-center font-sans transition-colors duration-500`}>
      <div className={`${theme.bg} w-full max-w-md h-[100dvh] md:h-[92vh] rounded-none md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative border-0 md:border-8 ${store.isDarkMode ? 'border-zinc-900' : 'border-white'} touch-pan-y`}>
        
        <AnimatePresence>
          {showSelectionWarning && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-24 left-6 right-6 z-[110]">
              <div className={`${store.isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'} p-4 rounded-2xl shadow-2xl border-2 flex items-center gap-4`}>
                <span className="text-2xl">👨‍🍳</span>
                <div className="flex-1">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${theme.text}`}>Şefim Bekle!</p>
                  <p className={`text-[9px] font-bold uppercase tracking-tight ${theme.subText}`}>Önce bir tarif seçmen gerekiyor.</p>
                </div>
                <button onClick={() => setShowSelectionWarning(false)} className="bg-[#b00020] text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase active:scale-90 transition-transform">Tamam</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAlarmModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`${store.isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'} w-full p-8 rounded-[2.5rem] shadow-2xl border-2 text-center`}>
                <div className="text-6xl mb-4 animate-bounce">⏰</div>
                <h2 className={`text-2xl font-black italic uppercase mb-2 ${theme.text}`}>Süre Doldu Şef!</h2>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-8 ${theme.subText}`}>Zamanlama harika, bir sonraki hamleye hazır mısın?</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => { setShowAlarmModal(false); store.setView('assistant'); }} className="w-full py-5 bg-[#b00020] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[#b00020]/20 active:scale-95 transition-all">🚀 Pişirmeye Devam Et</button>
                  <button onClick={() => setShowAlarmModal(false)} className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 ${store.isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>Bu Sayfada Kal</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <AnimatePresence mode="wait">
            {store.view === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col p-8">
                <div className="mt-12 mb-10">
                  <h1 className={`text-4xl font-black italic uppercase leading-tight ${theme.text}`}>Merhaba Şef!👨‍🍳</h1>
                  <p className={`text-xs font-bold uppercase tracking-[0.2em] mt-2 ${theme.subText}`}>Bugün mutfakta ne mucizeler yaratacağız?</p>
                </div>

                {/* SİHİRLİ ARAMA KARTI */}
                <section className={`${theme.card} p-8 rounded-[3rem] border-2 border-dashed border-[#b00020]/30 flex flex-col items-center text-center shadow-xl`}>
                  <div className="w-16 h-16 bg-[#b00020]/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">🪄</span>
                  </div>
                  <h3 className={`text-lg font-black uppercase mb-2 ${theme.text}`}>Sihirli Arama</h3>
                  <p className={`text-[10px] font-bold uppercase opacity-60 mb-8 leading-relaxed ${theme.subText}`}>
                    Dolaptaki malzemeleri seç,<br/>sana en uygun tarifi bulayım.
                  </p>
                  <button 
                    onClick={() => {
                      store.clearSelectedIngredients(); // Önceki seçimleri temizlemek istersen (isteğe bağlı)
                      store.setView('discovery'); 
                    }}
                    className="w-full py-4 bg-[#b00020] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all"
                  >
                    Malzemeleri Seç
                  </button>
                </section>

                {/* HIZLI ÖNERİ */}
                <button 
                  onClick={handleSuggestRecipe}
                  className={`mt-6 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] ${store.isDarkMode ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}
                >
                  🎲 Rastgele Bir Tarif Öner
                </button>
              </motion.div>
            )}

            {store.view === 'discovery' && (
              <motion.div key="discovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
                <button onClick={() => store.setView('intro')} className={`text-[10px] font-black uppercase mb-2 ${theme.subText}`}>← Geri Dön</button>
                <h1 className={`text-3xl font-black italic uppercase mb-2 ${theme.text}`}>Dolabımda Ne Var?</h1>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-6 ${theme.subText}`}>
                  Elindeki malzemeleri seç, sana en uygun tarifleri bulalım.
                </p>

                {/* Malzeme Bulutu */}
                <div className="flex flex-wrap gap-2 mb-24 overflow-y-auto max-h-[50vh] p-2 no-scrollbar">
                  {allIngredients.map((ing) => {
                    const isSelected = store.selectedIngredients[ing];
                    return (
                      <button
                        key={ing}
                        onClick={() => store.toggleIngredient(ing)}
                        className={`px-4 py-2 rounded-2xl text-[11px] font-black uppercase transition-all border-2 
                          ${isSelected 
                            ? 'bg-[#b00020] border-[#b00020] text-white shadow-lg scale-105' 
                            : `${theme.card} ${theme.text} border-transparent`}`}
                      >
                        {isSelected ? `✓ ${ing}` : ing}
                      </button>
                    );
                  })}
                </div>

                {/* Alt Buton: Sonuçlara Git */}
                <div className="fixed bottom-24 left-6 right-6">
                  <button 
                    onClick={() => store.setView('recipes')}
                    className="w-full py-5 bg-[#b00020] text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex justify-between px-8 items-center"
                  >
                    <span>Tarifleri Gör</span>
                    <span className="bg-[#b00020] px-3 py-1 rounded-lg text-[10px]">
                      {filteredRecipes.length} Tarif
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {store.view === 'recipes' && (
              <motion.div key="recipes" className="p-6">
                {/* MANTIK: Eğer kullanıcı discovery ekranında en az 1 malzeme seçtiyse */}
                {Object.values(store.selectedIngredients).some(v => v) ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* BAŞLIK VE DÜZENLE BUTONU */}
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className={`text-2xl font-black italic uppercase ${theme.text}`}>Yapabileceğin Yemekler</h2>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${theme.subText}`}>
                          Malzemelerinle Tam Eşleşenler
                        </p>
                      </div>
                      <button 
                        onClick={() => store.setView('discovery')} 
                        className="px-4 py-2 rounded-xl bg-[#b00020]/10 text-[#b00020] text-[10px] font-black uppercase border border-[#b00020]/20"
                      >
                        Düzenle
                      </button>
                    </div>

                    {/* TARİF LİSTESİ */}
                    <div className="space-y-3 pb-24">
                      {filteredRecipes.length > 0 ? (
                        filteredRecipes.map(renderRecipeCard)
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50 text-center">
                          <span className="text-4xl mb-4">🍳</span>
                          <p className="font-black uppercase text-xs leading-tight">
                            Seçtiğin malzemelerle<br/>tam eşleşen tarif bulamadık!
                          </p>
                          <button 
                            onClick={() => store.setView('discovery')}
                            className="mt-4 text-[10px] text-[#b00020] border-b border-[#b00020] font-black uppercase"
                          >
                            Malzemeleri Değiştir
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  /* --- NORMAL KATEGORİ GRİDİ (Malzeme seçilmemişse burası çalışır) --- */
                  <AnimatePresence mode="wait">
                    {activeCategory === "Hepsi" ? (
                      <motion.div 
                        key="grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="flex justify-between items-end mb-6">
                          <div>
                            <h1 className={`text-3xl font-black italic uppercase ${theme.text}`}>Mutfak</h1>
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${theme.subText}`}>Bir kategori seç şefim</p>
                          </div>
                          <button onClick={handleSuggestRecipe} className="text-[10px] font-black text-[#b00020] uppercase border-b-2 border-[#b00020] pb-0.5">🎲 Rastgele</button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pb-24">
                          {categories.filter(c => c !== "Hepsi").slice(0, 10).map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setActiveCategory(cat)}
                              className={`${theme.card} h-24 rounded-[2rem] flex flex-col items-center justify-center border-2 transition-all active:scale-95 hover:border-[#b00020]/30 shadow-sm`}
                            >
                              <span className="text-3xl mb-1">{getCategoryEmoji(cat)}</span>
                              <span className={`text-[10px] font-black uppercase tracking-tighter ${theme.text}`}>{cat}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="list"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                      >
                        {/* ... Burası senin mevcut kategori bazlı liste kodun ... */}
                        <div className="flex items-center gap-4 mb-6">
                          <button onClick={() => setActiveCategory("Hepsi")} className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.card} border-2 text-xl font-bold`}>←</button>
                          <h2 className={`text-2xl font-black italic uppercase ${theme.text}`}>{activeCategory}</h2>
                        </div>
                        <div className="space-y-3 pb-24">
                          {filteredRecipes.map(renderRecipeCard)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            )}



            {store.view === 'favorites' && (
              <motion.div key="favs" className="p-6">
                <h1 className={`text-3xl font-black italic uppercase mb-6 ${theme.text}`}>Defterim</h1>
                {RECIPES.filter(r => store.favorites.includes(r.id)).length > 0 ? RECIPES.filter(r => store.favorites.includes(r.id)).map(renderRecipeCard) : <div className={`text-center py-20 font-black uppercase text-[10px] ${theme.subText}`}>Henüz favori eklenmedi!</div>}
              </motion.div>
            )}

            {store.view === 'profile' && (
              <motion.div key="profile" className="p-8 pb-24">
                <h1 className={`text-3xl font-black italic uppercase mb-8 ${theme.text}`}>Ayarlar</h1>
                <div className="space-y-6">
                  <div className={`${theme.card} p-6 rounded-[2.5rem] border-2`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-4 text-center ${theme.subText}`}>Varsayılan Porsiyon</span>
                    <div className="flex items-center justify-between px-4">
                      <button onClick={() => setUserDefaultServings(Math.max(1, userDefaultServings - 1))} className={`w-10 h-10 rounded-xl shadow-sm font-black flex items-center justify-center ${store.isDarkMode ? 'bg-black text-[#b00020]' : 'bg-white text-[#b00020]'}`}>-</button>
                      <div className="flex flex-col items-center">
                        <span className={`text-3xl font-black italic ${theme.text}`}>{userDefaultServings}</span>
                        <span className="text-[8px] font-bold uppercase opacity-50">Kişi</span>
                      </div>
                      <button onClick={() => setUserDefaultServings(userDefaultServings + 1)} className={`w-10 h-10 rounded-xl shadow-sm font-black flex items-center justify-center ${store.isDarkMode ? 'bg-black text-[#b00020]' : 'bg-white text-[#b00020]'}`}>+</button>
                    </div>
                  </div>

                  <div className={`${theme.card} p-6 rounded-[2.5rem] border-2`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-4 text-center ${theme.subText}`}>Diyet Tercihi</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Hepçil', 'Vegan', 'Vejetaryen', 'Ketojenik'].map((diet: any) => (
                        <button key={diet} onClick={() => store.setDietPreference(diet)} className={`py-3 rounded-xl font-black text-[9px] uppercase transition-all ${store.dietPreference === diet ? 'bg-[#b00020] text-white shadow-md' : (store.isDarkMode ? 'bg-black text-zinc-600' : 'bg-white text-zinc-400 border border-zinc-100')}`}>
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`${theme.card} p-6 rounded-[2.5rem] border-2`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-4 text-center ${theme.subText}`}>Alerjenlerim</span>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {ALLERGEN_OPTIONS.map((alg) => (
                        <button key={alg} onClick={() => store.toggleAllergen(alg)} className={`px-3 py-2 rounded-xl font-black text-[8px] uppercase transition-all ${store.userAllergens.includes(alg) ? 'bg-orange-500 text-white' : (store.isDarkMode ? 'bg-black text-zinc-700' : 'bg-white text-zinc-300 border border-zinc-100')}`}>
                          {alg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`${theme.card} p-6 rounded-[2.5rem] border-2`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-4 text-center ${theme.subText}`}>Görünüm</span>
                    <div className={`flex p-1 rounded-2xl ${store.isDarkMode ? 'bg-black' : 'bg-white shadow-inner'}`}>
                      <button onClick={() => store.isDarkMode && store.toggleDarkMode()} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${!store.isDarkMode ? 'bg-[#b00020] text-white shadow-md' : 'text-zinc-600'}`}>☀️ Aydınlık</button>
                      <button onClick={() => !store.isDarkMode && store.toggleDarkMode()} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${store.isDarkMode ? 'bg-[#b00020] text-white shadow-md' : 'text-zinc-600'}`}>🌙 Karanlık</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
// ... (Önceki importlar ve useEffect'ler aynı kalıyor)

// Ingredients görünümünün içinde yapacağımız değişiklik:

            {store.view === 'ingredients' && store.selectedRecipe && (
              <motion.div key="ing" className="flex-1 flex flex-col overflow-hidden">
                {/* ÜST NAVİGASYON - Sabit */}
                <div className="p-6 pb-2 shrink-0">
                  <button onClick={() => store.setView('welcome')} className={`text-[10px] font-black uppercase mb-2 tracking-widest ${theme.subText}`}>← Vazgeç</button>
                  <h2 className={`text-2xl font-black italic uppercase ${theme.text}`}>{store.selectedRecipe.name}</h2>
                  
                  {/* Alt Aşamalar Arası Geçiş (Tab benzeri gösterge) */}
                  <div className="flex gap-4 mt-4 border-b border-zinc-100 dark:border-zinc-800">
                    <button 
                      onClick={() => store.setRecipeStage('summary')}
                      className={`pb-2 text-[10px] font-black uppercase tracking-widest transition-all ${store.recipeStage === 'summary' ? 'border-b-2 border-[#b00020] text-[#b00020]' : 'text-zinc-400'}`}
                    >
                      1. Özet
                    </button>
                    <button 
                      onClick={() => store.setRecipeStage('checklist')}
                      className={`pb-2 text-[10px] font-black uppercase tracking-widest transition-all ${store.recipeStage === 'checklist' ? 'border-b-2 border-[#b00020] text-[#b00020]' : 'text-zinc-400'}`}
                    >
                      2. Hazırlık
                    </button>
                  </div>
                </div>

                {/* KAYDIRILABİLİR İÇERİK ALANI */}
                <div className="flex-1 overflow-y-auto px-6 pb-24 custom-scrollbar">
                  
                  {/* DURUM 1: ÖZET EKRANI (RecipeStage === 'summary') */}
                  {store.recipeStage === 'summary' && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 py-4">
                      {/* Malzeme Özeti */}
                      <section>
                        <h3 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${theme.subText}`}>Gereken Malzemeler</h3>
                        <div className="space-y-2">
                          {store.selectedRecipe.ingredients.map((ing: any) => (
                            <div key={ing.id} className={`flex justify-between items-center p-3 rounded-xl ${theme.card}`}>
                              <span className={`text-sm font-bold ${theme.text}`}>{ing.name}</span>
                              <span className="text-xs font-black text-[#b00020] italic">
                                {Number((ing.amount * portionRatio).toFixed(1))} {ing.unit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Adımlar Özeti */}
                      <section>
                        <h3 className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${theme.subText}`}>Tarif Akışı</h3>
                        <div className="space-y-4">
                          {store.selectedRecipe.steps.map((s: any, idx: number) => (
                            <div key={idx} className="flex gap-4">
                              <span className="font-black italic text-[#b00020]">{idx + 1}.</span>
                              <p className={`text-xs font-medium leading-relaxed ${theme.subText}`}>{s.text}</p>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Alt Buton (Özet'ten Hazırlığa) */}
                      <button 
                        onClick={() => store.setRecipeStage('checklist')}
                        className="w-full py-5 bg-black text-white dark:bg-zinc-800 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                      >
                        Hazırlığa Başla →
                      </button>
                    </motion.div>
                  )}

                  {/* DURUM 2: KONTROL LİSTESİ (RecipeStage === 'checklist') */}
                  {store.recipeStage === 'checklist' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="py-4">
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-6 ${theme.subText}`}>Eksik malzeme kalmadığından emin olalım, elinde bulunanları işaretle Şef.</p>
                      
                      <div className={`${theme.card} flex items-center justify-between p-4 rounded-2xl mb-6 border-2`}>
                        <span className="text-xs font-black uppercase text-zinc-400">Porsiyon Ayarı</span>
                        <div className="flex gap-2">
                          <button onClick={() => store.setServings(Math.max(1, store.servings - 1))} className={`w-8 h-8 rounded-xl shadow-sm font-black ${store.isDarkMode ? 'bg-black text-[#b00020]' : 'bg-white text-[#b00020]'}`}>-</button>
                          <span className={`w-6 text-center leading-8 font-black ${theme.text}`}>{store.servings}</span>
                          <button onClick={() => store.setServings(store.servings + 1)} className={`w-8 h-8 rounded-xl shadow-sm font-black ${store.isDarkMode ? 'bg-black text-[#b00020]' : 'bg-white text-[#b00020]'}`}>+</button>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8">
                        {store.selectedRecipe.ingredients.map((ing: any) => (
                          <label key={ing.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${store.selectedIngredients[ing.name] ? 'border-green-500 bg-green-500/10 opacity-70' : theme.card}`}>
                            <input type="checkbox" checked={store.selectedIngredients[ing.name] || false} onChange={() => store.toggleIngredient(ing.name)} className="w-5 h-5 accent-green-600" />
                            <span className={`font-bold text-sm ${theme.text}`}>{Number((ing.amount * portionRatio).toFixed(1))} {ing.unit} {ing.name}</span>
                          </label>
                        ))}
                      </div>

                      <button 
                        onClick={() => {
                          store.setView('assistant');
                          store.setRecipeStage('cook');
                        }} 
                        className="w-full py-5 bg-green-600 text-white rounded-2xl font-black shadow-lg uppercase tracking-widest active:scale-95 transition-all"
                      >
                        Ocağın Başına Geç! 🔥
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {store.view === 'assistant' && store.selectedRecipe && (
              <motion.div key="assist" className="flex-1 p-6 flex flex-col items-center">
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full mb-6 overflow-hidden shrink-0 border dark:border-zinc-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((store.step + 1) / store.selectedRecipe.steps.length) * 100}%` }}
                    className="h-full bg-[#b00020] shadow-[0_0_8px_rgba(176,0,32,0.4)]"
                  />
                </div>
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

            {store.view === 'done' && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-8xl animate-bounce mb-6">👨‍🍳</div>
                <h2 className={`text-4xl font-black italic leading-tight mb-2 ${theme.text}`}>BAŞARILI ŞEF!</h2>
                <p className={`text-sm font-bold uppercase tracking-widest mb-10 ${theme.subText}`}>Ellerine sağlık! 🔥</p>
                <button onClick={store.resetApp} className="w-full py-5 bg-[#b00020] text-white rounded-full font-black shadow-xl uppercase tracking-widest transition-transform active:scale-95">Yeni Tarif Seç</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={`${theme.nav} px-4 py-5 flex justify-between items-center z-50 shrink-0 border-t`}>
          <TabItem icon="🏠" label="Ana Sayfa" active={store.view === 'intro'} onClick={() => store.setView('intro')} isDark={store.isDarkMode} />
          <TabItem icon="📖" label="Tarifler" active={store.view === 'recipes' || store.view === 'welcome'} onClick={() => store.setView('recipes')} isDark={store.isDarkMode} />
          <TabItem icon="⭐" label="Defterim" active={store.view === 'favorites'} onClick={() => store.setView('favorites')} isDark={store.isDarkMode} />
          <TabItem icon={store.isTimerActive ? "⏳" : "🍳"} label="Mutfak" active={store.view === 'assistant' || store.view === 'ingredients'} isDark={store.isDarkMode} onClick={() => {
            if (!store.selectedRecipe) {
              setShowSelectionWarning(true);
              setTimeout(() => setShowSelectionWarning(false), 3000); 
              return;
            }
            store.setView('assistant');
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