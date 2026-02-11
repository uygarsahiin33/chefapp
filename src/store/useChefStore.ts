import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChefState {
  view: 'intro' | 'discovery' | 'welcome' | 'recipes' | 'ingredients' | 'assistant' | 'done' | 'favorites' | 'profile';
  recipeStage: 'summary' | 'checklist' | 'cook'; 
  selectedRecipe: any | null;
  step: number;
  selectedIngredients: Record<string, boolean>; // Tarif içindeki checklist için
  favorites: string[];
  unitType: 'metric' | 'classic';
  servings: number;
  isDarkMode: boolean;
  
  dietPreference: 'Hepçil' | 'Vegan' | 'Vejetaryen' | 'Ketojenik';
  userAllergens: string[];

  // --- MUTFAK ENVANTERİ (SİHİRLİ ARAMA İÇİN) ---
  pantryItems: string[]; 

  timerEndTimestamp: number | null;
  isTimerActive: boolean;
  pausedRemainingSeconds: number | null;

  // Actions
  setView: (view: ChefState['view']) => void;
  setRecipeStage: (stage: ChefState['recipeStage']) => void;
  setRecipe: (recipe: any) => void;
  setStep: (step: number) => void;
  toggleFavorite: (id: string) => void;
  setUnitType: (unit: 'metric' | 'classic') => void;
  setServings: (val: number) => void;
  toggleIngredient: (name: string) => void; // Tarif içindeki checklist için
  toggleDarkMode: () => void;
  
  setDietPreference: (diet: ChefState['dietPreference']) => void;
  toggleAllergen: (allergen: string) => void;

  // --- ENVANTER AKSİYONLARI ---
  togglePantryItem: (ingredientId: string) => void;
  clearPantry: () => void;
  clearSelectedIngredients: () => void; // Arayüzdeki hata için eklendi

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
      recipeStage: 'summary',
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
      
      dietPreference: 'Hepçil',
      userAllergens: [],

      pantryItems: [],

      setView: (view) => set({ view }),
      
      setRecipeStage: (stage) => set({ recipeStage: stage }),

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      setRecipe: (recipe) => set({ 
        selectedRecipe: recipe, 
        view: 'ingredients', 
        recipeStage: 'summary', 
        step: 0, 
        selectedIngredients: {}, 
        timerEndTimestamp: null, 
        isTimerActive: false, 
        pausedRemainingSeconds: null 
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
      
      // Tarif içindeki tekil malzeme checklist'i için
      toggleIngredient: (name) => set((state) => ({
        selectedIngredients: { ...state.selectedIngredients, [name]: !state.selectedIngredients[name] }
      })),

      setDietPreference: (diet) => set({ dietPreference: diet }),
      
      toggleAllergen: (allergen) => set((state) => ({
        userAllergens: state.userAllergens.includes(allergen) 
          ? state.userAllergens.filter(a => a !== allergen) 
          : [...state.userAllergens, allergen]
      })),

      // --- SİHİRLİ ARAMA (PANTRY) AKSİYONLARI ---
      togglePantryItem: (id) => set((state) => ({
        pantryItems: state.pantryItems.includes(id)
          ? state.pantryItems.filter(item => item !== id)
          : [...state.pantryItems, id]
      })),

      clearPantry: () => set({ pantryItems: [] }),

      // Arayüzdeki temizleme butonu için checklist'i ve pantry'yi sıfırlar
      clearSelectedIngredients: () => set({ selectedIngredients: {}, pantryItems: [] }),

      resetApp: () => set({ 
        view: 'recipes', 
        recipeStage: 'summary',
        selectedRecipe: null, 
        step: 0, 
        selectedIngredients: {}, 
        pantryItems: [], // Reset sırasında bunları da sıfırlamak temiz bir başlangıç sağlar
        timerEndTimestamp: null, 
        isTimerActive: false, 
        pausedRemainingSeconds: null
      }),
    }),
    { name: 'chef-storage' }
  )
);