import { create } from 'zustand';

interface ChefState {
  view: 'welcome' | 'ingredients' | 'assistant' | 'done';
  selectedRecipe: any | null;
  step: number;
  selectedIngredients: Record<string, boolean>;
  cuisineFilter: string;
  categoryFilter: string;
  servings: number; // Yeni: Porsiyon sayısı
  
  setView: (view: ChefState['view']) => void;
  setRecipe: (recipe: any) => void;
  setStep: (step: number) => void;
  toggleIngredient: (name: string) => void;
  setCuisineFilter: (filter: string) => void;
  setCategoryFilter: (filter: string) => void;
  setServings: (val: number) => void; // Yeni: Porsiyon ayarla
  resetApp: () => void;
}

export const useChefStore = create<ChefState>((set) => ({
  view: 'welcome',
  selectedRecipe: null,
  step: 0,
  selectedIngredients: {},
  cuisineFilter: 'Hepsi',
  categoryFilter: 'Hepsi',
  servings: 4, // Varsayılan başlangıç porsiyonu

  setView: (view) => set({ view }),
  setRecipe: (recipe) => set({ 
    selectedRecipe: recipe, 
    view: 'ingredients', 
    step: 0, 
    selectedIngredients: {},
    servings: 4 // Her tarif açıldığında 4'ten başlasın
  }),
  setStep: (step) => set({ step }),
  toggleIngredient: (name) => set((state) => ({
    selectedIngredients: {
      ...state.selectedIngredients,
      [name]: !state.selectedIngredients[name]
    }
  })),
  setCuisineFilter: (filter) => set({ cuisineFilter: filter }),
  setCategoryFilter: (filter) => set({ categoryFilter: filter }),
  setServings: (val) => set({ servings: val }),
  resetApp: () => set({ 
    view: 'welcome', 
    selectedRecipe: null, 
    step: 0, 
    selectedIngredients: {},
    servings: 4
  }),
}));