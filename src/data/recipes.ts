// src/data/recipes.ts
export const RECIPES = [
  {
    id: "menemen",
    name: "Menemen",
    cuisine: "Türk",
    category: "Kahvaltı",
    ingredients: ["Domates", "Biber", "Yumurta", "Yağ", "Tuz"],
    steps: [
      { text: "Biberleri doğrayıp yağda kavurun", timer: 180 },
      { text: "Domatesleri ekleyip pişirin", timer: 300 },
      { text: "Yumurtaları kırıp karıştırın", timer: 120 },
    ],
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo",
    cuisine: "İtalyan",
    category: "Makarna",
    ingredients: ["Fettuccine", "Tavuk", "Krema", "Parmesan", "Sarımsak"],
    steps: [
      { text: "Makarnayı haşlayın", timer: 600 },
      { text: "Tavukları soteleyin", timer: 420 },
      { text: "Sosla birleştirin", timer: 120 },
    ],
  }
];