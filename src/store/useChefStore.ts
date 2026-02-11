// src/store/useChefStore.ts
import { create } from 'zustand';

type View = 'welcome' | 'cuisines' | 'recipes' | 'ingredients' | 'assistant' | 'done';

interface ChefStore {
  view: View;
  selectedRecipe: any | null;
  step: number;
  selectedIngredients: Record<string, boolean>;
  cuisineFilter: string;
  categoryFilter: string;
  setView: (view: View) => void;
  setRecipe: (recipe: any) => void;
  toggleIngredient: (name: string) => void;
  setStep: (step: number) => void;
  setCuisineFilter: (c: string) => void;
  setCategoryFilter: (c: string) => void;
  resetApp: () => void;
}

export const useChefStore = create<ChefStore>((set) => ({
  view: 'welcome', // Başlangıç ekranı
  selectedRecipe: null,
  step: 0,
  selectedIngredients: {},
  cuisineFilter: 'Hepsi',
  categoryFilter: 'Hepsi',
  setView: (view) => set({ view }),
  setRecipe: (recipe) => {
    const init: Record<string, boolean> = {};
    if (recipe.ingredients) {
      recipe.ingredients.forEach((i: string) => (init[i] = false));
    }
    set({ 
      selectedRecipe: recipe, 
      selectedIngredients: init, 
      view: 'ingredients', // Tarife basınca malzemelere git
      step: 0 
    });
  },
  toggleIngredient: (name) => set((state) => ({
    selectedIngredients: { ...state.selectedIngredients, [name]: !state.selectedIngredients[name] }
  })),
  setStep: (step) => set({ step }),
  setCuisineFilter: (cuisineFilter) => set({ cuisineFilter }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  resetApp: () => set({ view: 'welcome', selectedRecipe: null, step: 0, selectedIngredients: {} }),
}));