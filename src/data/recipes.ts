export const RECIPES = [
  // --- TEST ---
  {
    id: "test",
    name: "Test Tarifi",
    cuisine: "Test",
    category: "Test",
    ingredients: [
      { id: "test1", name: "Test Malzemesi 1", amount: 10, unit: "g" },
      { id: "test2", name: "Test Malzemesi 2", amount: 1, unit: "adet" }
    ],
    steps: [
      { text: "Biberleri doğrayıp yağda kavurun", timer: 5, requiredIngredients: ["test1", "test2"] },
    ],
  },
  // --- KAHVALTILIKLAR ---
  {
    id: "menemen",
    name: "Menemen",
    cuisine: "Türk",
    category: "Kahvaltı",
    ingredients: [
      { id: "domates", name: "Domates", amount: 3, unit: "adet" },
      { id: "biber", name: "Biber", amount: 2, unit: "adet" },
      { id: "yumurta", name: "Yumurta", amount: 3, unit: "adet" },
      { id: "yag", name: "Yağ", amount: 2, unit: "yemek kaşığı" },
      { id: "tuz", name: "Tuz", amount: 1, unit: "çay kaşığı" }
    ],
    steps: [
      { text: "Biberleri doğrayıp yağda kavurun", timer: 180, requiredIngredients: ["biber", "yag"] },
      { text: "Domatesleri ekleyip suyunu çekene kadar pişirin", timer: 300, requiredIngredients: ["domates"] },
      { text: "Yumurtaları kırıp hafifçe karıştırın", timer: 120, requiredIngredients: ["yumurta", "tuz"] },
    ],
  },
  {
    id: "pancake",
    name: "Pancake",
    cuisine: "Amerikan",
    category: "Kahvaltı",
    ingredients: [
      { id: "un", name: "Un", amount: 1.5, unit: "su bardağı" },
      { id: "sut", name: "Süt", amount: 1, unit: "su bardağı" },
      { id: "yumurta", name: "Yumurta", amount: 1, unit: "adet" },
      { id: "kabartmatozu", name: "Kabartma Tozu", amount: 1, unit: "paket" },
      { id: "seker", name: "Şeker", amount: 2, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Tüm malzemeleri pürüzsüz olana kadar çırpın", timer: 180, requiredIngredients: ["un", "sut", "yumurta", "kabartmatozu", "seker"] },
      { text: "Tavayı yağlayıp harçtan bir kepçe dökün", timer: 60, requiredIngredients: [] },
      { text: "Üzeri göz göz olunca ters çevirip pişirin", timer: 60, requiredIngredients: [] },
    ],
  },
  {
    id: "sucuklu-yumurta",
    name: "Sucuklu Yumurta",
    cuisine: "Türk",
    category: "Kahvaltı",
    ingredients: [
      { id: "sucuk", name: "Sucuk", amount: 100, unit: "g" },
      { id: "yumurta", name: "Yumurta", amount: 2, unit: "adet" },
      { id: "tereyag", name: "Tereyağı", amount: 1, unit: "yemek kaşığı" },
      { id: "pulbiber", name: "Pul Biber", amount: 1, unit: "çay kaşığı" }
    ],
    steps: [
      { text: "Sucukları dilimleyip tereyağında önlü arkalı pişirin", timer: 120, requiredIngredients: ["sucuk", "tereyag"] },
      { text: "Yumurtaları üzerine kırıp sarısını bozmadan pişirin", timer: 180, requiredIngredients: ["yumurta", "pulbiber"] },
    ],
  },
  // --- ANA YEMEKLER ---
  {
    id: "karniyarik",
    name: "Karnıyarık",
    cuisine: "Türk",
    category: "Ana Yemek",
    ingredients: [
      { id: "patlican", name: "Patlıcan", amount: 4, unit: "adet" },
      { id: "kiyma", name: "Kıyma", amount: 250, unit: "g" },
      { id: "sogan", name: "Soğan", amount: 1, unit: "adet" },
      { id: "sarimsak", name: "Sarımsak", amount: 2, unit: "diş" },
      { id: "salca", name: "Salça", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Patlıcanları alacalı soyup yağda kızartın", timer: 600, requiredIngredients: ["patlican"] },
      { text: "İç harcı (kıyma, soğan, salça) kavurun", timer: 480, requiredIngredients: ["kiyma", "sogan", "sarimsak", "salca"] },
      { text: "Patlıcanları doldurup fırında pişirin", timer: 1200, requiredIngredients: [] },
    ],
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo",
    cuisine: "İtalyan",
    category: "Makarna",
    ingredients: [
      { id: "makarna", name: "Fettuccine", amount: 250, unit: "g" },
      { id: "tavuk", name: "Tavuk Göğsü", amount: 300, unit: "g" },
      { id: "krema", name: "Krema", amount: 200, unit: "ml" },
      { id: "parmesan", name: "Parmesan", amount: 50, unit: "g" },
      { id: "sarimsak", name: "Sarımsak", amount: 2, unit: "diş" }
    ],
    steps: [
      { text: "Makarnayı bol tuzlu suda haşlayın", timer: 600, requiredIngredients: ["makarna"] },
      { text: "Tavukları küp küp doğrayıp soteleyin", timer: 420, requiredIngredients: ["tavuk", "sarimsak"] },
      { text: "Krema ve peyniri ekleyip makarnayla birleştirin", timer: 180, requiredIngredients: ["krema", "parmesan"] },
    ],
  },
  {
    id: "tavuk-sote",
    name: "Renkli Tavuk Sote",
    cuisine: "Türk",
    category: "Ana Yemek",
    ingredients: [
      { id: "tavuk", name: "Tavuk Göğsü", amount: 500, unit: "g" },
      { id: "biber", name: "Renkli Biberler", amount: 3, unit: "adet" },
      { id: "sogan", name: "Soğan", amount: 1, unit: "adet" },
      { id: "domates", name: "Domates", amount: 2, unit: "adet" },
      { id: "kekik", name: "Kekik", amount: 1, unit: "tatlı kaşığı" }
    ],
    steps: [
      { text: "Tavukları yüksek ateşte suyunu salıp çekene kadar pişirin", timer: 600, requiredIngredients: ["tavuk"] },
      { text: "Sebzeleri ekleyip yumuşayana kadar soteleyin", timer: 300, requiredIngredients: ["biber", "sogan", "domates"] },
      { text: "Baharatları ekleyip son bir kez karıştırın", timer: 60, requiredIngredients: ["kekik"] },
    ],
  },
  {
    id: "hamburger",
    name: "Ev Yapımı Burger",
    cuisine: "Amerikan",
    category: "Ana Yemek",
    ingredients: [
      { id: "kofte", name: "Burger Köftesi", amount: 2, unit: "adet" },
      { id: "ekmek", name: "Burger Ekmeği", amount: 2, unit: "adet" },
      { id: "peynir", name: "Çedar Peyniri", amount: 2, unit: "dilim" },
      { id: "marul", name: "Marul", amount: 4, unit: "yaprak" },
      { id: "tursu", name: "Turşu", amount: 1, unit: "adet" }
    ],
    steps: [
      { text: "Köfteleri döküm tavada mühürleyerek pişirin", timer: 480, requiredIngredients: ["kofte"] },
      { text: "Peynirleri üzerine koyup eritin", timer: 60, requiredIngredients: ["peynir"] },
      { text: "Ekmekleri ısıtıp malzemeleri dizin", timer: 120, requiredIngredients: ["ekmek", "marul", "tursu"] },
    ],
  },
  // --- ÇORBALAR ---
  {
    id: "mercimek-corbasi",
    name: "Mercimek Çorbası",
    cuisine: "Türk",
    category: "Çorba",
    ingredients: [
      { id: "mercimek", name: "Kırmızı Mercimek", amount: 1, unit: "su bardağı" },
      { id: "sogan", name: "Soğan", amount: 1, unit: "adet" },
      { id: "patates", name: "Patates", amount: 1, unit: "adet" },
      { id: "havuc", name: "Havuç", amount: 1, unit: "adet" },
      { id: "tereyag", name: "Tereyağı", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Tüm sebzeleri mercimekle birlikte düdüklüde pişirin", timer: 900, requiredIngredients: ["mercimek", "sogan", "patates", "havuc"] },
      { text: "Blenderdan geçirip pürüzsüz yapın", timer: 120, requiredIngredients: [] },
      { text: "Üzerine tereyağlı naneli sos yakın", timer: 60, requiredIngredients: ["tereyag"] },
    ],
  },
  {
    id: "domates-corbasi",
    name: "Köz Domates Çorbası",
    cuisine: "Türk",
    category: "Çorba",
    ingredients: [
      { id: "domates", name: "Domates", amount: 4, unit: "adet" },
      { id: "un", name: "Un", amount: 2, unit: "yemek kaşığı" },
      { id: "sut", name: "Süt", amount: 1, unit: "su bardağı" },
      { id: "kasar", name: "Kaşar Peyniri", amount: 50, unit: "g" },
      { id: "tereyag", name: "Tereyağı", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Unu tereyağında kokusu çıkana kadar kavurun", timer: 180, requiredIngredients: ["un", "tereyag"] },
      { text: "Domates püresini ekleyip kaynatın", timer: 600, requiredIngredients: ["domates"] },
      { text: "Sütü ekleyip bir taşım daha pişirin", timer: 120, requiredIngredients: ["sut"] },
    ],
  },
  // --- TATLILAR ---
  {
    id: "suffile",
    name: "Çikolatalı Sufle",
    cuisine: "Fransız",
    category: "Tatlı",
    ingredients: [
      { id: "cikolata", name: "Bitter Çikolata", amount: 100, unit: "g" },
      { id: "tereyag", name: "Tereyağı", amount: 50, unit: "g" },
      { id: "yumurta", name: "Yumurta", amount: 2, unit: "adet" },
      { id: "seker", name: "Şeker", amount: 3, unit: "yemek kaşığı" },
      { id: "un", name: "Un", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Çikolata ve tereyağını benmari usulü eritin", timer: 300, requiredIngredients: ["cikolata", "tereyag"] },
      { text: "Yumurta ve şekeri çırpıp çikolatayla karıştırın", timer: 180, requiredIngredients: ["yumurta", "seker", "un"] },
      { text: "Fırında dışı pişmiş içi akışkan kalana kadar tutun", timer: 480, requiredIngredients: [] },
    ],
  },
  {
    id: "magnolia",
    name: "Muzlu Magnolia",
    cuisine: "Modern",
    category: "Tatlı",
    ingredients: [
      { id: "sut", name: "Süt", amount: 500, unit: "ml" },
      { id: "seker", name: "Şeker", amount: 0.5, unit: "su bardağı" },
      { id: "nisasta", name: "Nişasta", amount: 2, unit: "yemek kaşığı" },
      { id: "biskuvi", name: "Bebek Bisküvisi", amount: 1, unit: "paket" },
      { id: "muz", name: "Muz", amount: 2, unit: "adet" }
    ],
    steps: [
      { text: "Muhallebiyi koyulaşana kadar pişirin", timer: 600, requiredIngredients: ["sut", "seker", "nisasta"] },
      { text: "Bisküvileri rondodan geçirin", timer: 120, requiredIngredients: ["biskuvi"] },
      { text: "Bardaklara kat kat bisküvi, muz ve muhallebi dizin", timer: 300, requiredIngredients: ["muz"] },
    ],
  },
  // --- DİĞER TARİFLER ---
  {
    id: "kumpir",
    name: "Ev Yapımı Kumpir",
    cuisine: "Türk",
    category: "Atıştırmalık",
    ingredients: [
      { id: "patates", name: "Büyük Patates", amount: 1, unit: "adet" },
      { id: "kasar", name: "Kaşar Peyniri", amount: 50, unit: "g" },
      { id: "tereyag", name: "Tereyağı", amount: 1, unit: "yemek kaşığı" },
      { id: "misir", name: "Mısır", amount: 2, unit: "yemek kaşığı" },
      { id: "zeytin", name: "Zeytin", amount: 5, unit: "adet" }
    ],
    steps: [
      { text: "Patatesleri folyoya sarıp fırında közleyin", timer: 3600, requiredIngredients: ["patates"] },
      { text: "İçini tereyağı ve peynirle ezip karıştırın", timer: 180, requiredIngredients: ["tereyag", "kasar"] },
      { text: "Garnitürleri üzerine ekleyin", timer: 120, requiredIngredients: ["misir", "zeytin"] },
    ],
  },
  {
    id: "izgara-kofte",
    name: "Anne Köftesi",
    cuisine: "Türk",
    category: "Ana Yemek",
    ingredients: [
      { id: "kiyma", name: "Kıyma", amount: 500, unit: "g" },
      { id: "ekmek", name: "Bayat Ekmek", amount: 2, unit: "dilim" },
      { id: "sogan", name: "Soğan", amount: 1, unit: "adet" },
      { id: "maydanoz", name: "Maydanoz", amount: 0.5, unit: "demet" },
      { id: "kimyon", name: "Kimyon", amount: 1, unit: "çay kaşığı" }
    ],
    steps: [
      { text: "Tüm malzemeleri en az 10 dakika yoğurun", timer: 600, requiredIngredients: ["kiyma", "ekmek", "sogan", "maydanoz", "kimyon"] },
      { text: "Buzdolabında dinlendirin", timer: 1800, requiredIngredients: [] },
      { text: "Tavada veya ızgarada önlü arkalı pişirin", timer: 480, requiredIngredients: [] },
    ],
  }
];