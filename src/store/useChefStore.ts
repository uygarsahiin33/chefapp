import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChefState {
  view: 'intro' | 'welcome' | 'ingredients' | 'assistant' | 'done' | 'favorites' | 'profile';
  selectedRecipe: any | null;
  step: number;
  selectedIngredients: Record<string, boolean>;
  favorites: string[];
  unitType: 'metric' | 'classic';
  servings: number;
  isDarkMode: boolean;
  
  // --- YENİ: KİŞİSELLEŞTİRME ---
  dietPreference: 'Hepçil' | 'Vegan' | 'Vejetaryen' | 'Ketojenik';
  userAllergens: string[];

  // Timer State
  timerEndTimestamp: number | null;
  isTimerActive: boolean;
  pausedRemainingSeconds: number | null;

  // Actions
  setView: (view: ChefState['view']) => void;
  setRecipe: (recipe: any) => void;
  setStep: (step: number) => void;
  toggleFavorite: (id: string) => void;
  setUnitType: (unit: 'metric' | 'classic') => void;
  setServings: (val: number) => void;
  toggleIngredient: (name: string) => void;
  toggleDarkMode: () => void;
  
  // --- YENİ: AKSİYONLAR ---
  setDietPreference: (diet: ChefState['dietPreference']) => void;
  toggleAllergen: (allergen: string) => void;

  // Timer Actions
  startGlobalTimer: (seconds: number) => void;
  pauseGlobalTimer: (remaining: number) => void;
  stopGlobalTimer: () => void;
  resetApp: () => void;
}

export const useChefStore = create<ChefState>()(
  persist(
    (set) => ({
      view: 'intro',
      selectedRecipe: null,
      step: 0,
      selectedIngredients: {},
      favorites: [],
      unitType: 'classic',
      servings: 4,
      isDarkMode: false,
      timerEndTimestamp: null,
      isTimerActive: false,
      pausedRemainingSeconds: null,
      
      // Varsayılan Tercihler
      dietPreference: 'Hepçil',
      userAllergens: [],

      setView: (view) => set({ view }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      setRecipe: (recipe) => set({ 
        selectedRecipe: recipe, view: 'ingredients', step: 0, selectedIngredients: {}, 
        timerEndTimestamp: null, isTimerActive: false, pausedRemainingSeconds: null 
      }),
      
      setStep: (step) => set({ step, timerEndTimestamp: null, isTimerActive: false, pausedRemainingSeconds: null }),
      
      startGlobalTimer: (seconds) => set({ 
        timerEndTimestamp: Date.now() + (seconds * 1000),
        isTimerActive: true,
        pausedRemainingSeconds: null
      }),
      
      pauseGlobalTimer: (remaining) => set({ 
        timerEndTimestamp: null, 
        isTimerActive: false,
        pausedRemainingSeconds: remaining
      }),

      stopGlobalTimer: () => set({ 
        timerEndTimestamp: null, 
        isTimerActive: false,
        pausedRemainingSeconds: null
      }),

      toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id) ? state.favorites.filter(fid => fid !== id) : [...state.favorites, id]
      })),

      setUnitType: (unit) => set({ unitType: unit }),
      setServings: (val) => set({ servings: val }),
      toggleIngredient: (name) => set((state) => ({
        selectedIngredients: { ...state.selectedIngredients, [name]: !state.selectedIngredients[name] }
      })),

      // Yeni Tercih Aksiyonları
      setDietPreference: (diet) => set({ dietPreference: diet }),
      toggleAllergen: (allergen) => set((state) => ({
        userAllergens: state.userAllergens.includes(allergen) 
          ? state.userAllergens.filter(a => a !== allergen) 
          : [...state.userAllergens, allergen]
      })),

      resetApp: () => set({ 
        view: 'welcome', selectedRecipe: null, step: 0, selectedIngredients: {}, 
        timerEndTimestamp: null, isTimerActive: false, pausedRemainingSeconds: null
      }),
    }),
    { name: 'chef-storage' }
  )
);