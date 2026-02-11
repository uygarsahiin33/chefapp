export const RECIPES = [
  // --- KAHVALTILIKLAR (1-10) ---
  {
    id: "menemen",
    name: "Menemen",
    cuisine: "Türk",
    category: "Kahvaltı",
    diet: "Vejetaryen",
    allergens: ["yumurta"],
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
    id: "test1",
    name: "test2",
    cuisine: "test3",
    category: "test4",
    diet: "test5",
    allergens: ["yumurta"],
    ingredients: [
      { id: "test6", name: "Domates", amount: 3, unit: "adet" },
      { id: "test7", name: "Biber", amount: 2, unit: "adet" },
      { id: "yumurta", name: "Yumurta", amount: 3, unit: "adet" },
      { id: "test8", name: "Yağ", amount: 2, unit: "yemek kaşığı" },
      { id: "test9", name: "Tuz", amount: 1, unit: "çay kaşığı" }
    ],
    steps: [
      { text: "Biberleri doğrayıp yağda kavurun", timer: 5, requiredIngredients: ["biber", "yag"] },
      { text: "Domatesleri ekleyip suyunu çekene kadar pişirin", timer: 5, requiredIngredients: ["domates"] },
      { text: "Yumurtaları kırıp hafifçe karıştırın", timer: 5, requiredIngredients: ["yumurta", "tuz"] },
    ],
  },
  {
    id: "pancake",
    name: "Klasik Pancake",
    cuisine: "Amerikan",
    category: "Kahvaltı",
    diet: "Vejetaryen",
    allergens: ["gluten", "laktoz", "yumurta"],
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
    id: "vegan-pancake",
    name: "Vegan Muzlu Pancake",
    cuisine: "Modern",
    category: "Kahvaltı",
    diet: "Vegan",
    allergens: ["gluten"],
    ingredients: [
      { id: "un", name: "Un", amount: 1.5, unit: "su bardağı" },
      { id: "yulafsutu", name: "Yulaf Sütü", amount: 1, unit: "su bardağı" },
      { id: "muz", name: "Olgun Muz", amount: 1, unit: "adet" },
      { id: "akcaagac", name: "Akçaağaç Şurubu", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Muzu ezin ve diğer malzemelerle karıştırın", timer: 120, requiredIngredients: ["muz", "un", "yulafsutu"] },
      { text: "Yapışmaz tavada arkalı önlü pişirin", timer: 180, requiredIngredients: [] },
    ],
  },
  {
    id: "sucuklu-yumurta",
    name: "Sucuklu Yumurta",
    cuisine: "Türk",
    category: "Kahvaltı",
    diet: "Hepçil",
    allergens: ["yumurta"],
    ingredients: [
      { id: "sucuk", name: "Sucuk", amount: 100, unit: "g" },
      { id: "yumurta", name: "Yumurta", amount: 2, unit: "adet" },
      { id: "tereyag", name: "Tereyağı", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Sucukları dilimleyip tereyağında önlü arkalı pişirin", timer: 120, requiredIngredients: ["sucuk", "tereyag"] },
      { text: "Yumurtaları üzerine kırıp pişirin", timer: 180, requiredIngredients: ["yumurta"] },
    ],
  },
  {
    id: "avokado-tost",
    name: "Avokado Tost",
    cuisine: "Modern",
    category: "Kahvaltı",
    diet: "Vegan",
    allergens: ["gluten"],
    ingredients: [
      { id: "ekmek", name: "Tam Tahıllı Ekmek", amount: 2, unit: "dilim" },
      { id: "avokado", name: "Avokado", amount: 1, unit: "adet" },
      { id: "limon", name: "Limon", amount: 0.5, unit: "adet" },
      { id: "corekotu", name: "Çörek Otu", amount: 1, unit: "çay kaşığı" }
    ],
    steps: [
      { text: "Ekmekleri kızartın", timer: 120, requiredIngredients: ["ekmek"] },
      { text: "Avokadoyu limonla ezip ekmeğin üzerine sürün", timer: 180, requiredIngredients: ["avokado", "limon"] },
    ],
  },
  {
    id: "yulaf-lapasi",
    name: "Fıstık Ezmeli Yulaf",
    cuisine: "Modern",
    category: "Kahvaltı",
    diet: "Vegan",
    allergens: ["yerfistigi"],
    ingredients: [
      { id: "yulaf", name: "Yulaf Ezmesi", amount: 0.5, unit: "su bardağı" },
      { id: "su", name: "Su veya Bitkisel Süt", amount: 1, unit: "su bardağı" },
      { id: "fistik-ezmesi", name: "Fıstık Ezmesi", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Yulafı sıvı ile koyulaşana kadar pişirin", timer: 300, requiredIngredients: ["yulaf", "su"] },
      { text: "Fıstık ezmesini ekleyip karıştırın", timer: 30, requiredIngredients: ["fistik-ezmesi"] },
    ],
  },
  {
    id: "mihlama",
    name: "Mıhlama",
    cuisine: "Türk",
    category: "Kahvaltı",
    diet: "Vejetaryen",
    allergens: ["laktoz", "gluten"],
    ingredients: [
      { id: "misirunu", name: "Mısır Unu", amount: 3, unit: "yemek kaşığı" },
      { id: "tereyag", name: "Tereyağı", amount: 2, unit: "yemek kaşığı" },
      { id: "kolot-peyniri", name: "Kolot Peyniri", amount: 150, unit: "g" }
    ],
    steps: [
      { text: "Tereyağında mısır ununu kavurun", timer: 120, requiredIngredients: ["tereyag", "misirunu"] },
      { text: "Peyniri ekleyip uzayana kadar karıştırın", timer: 300, requiredIngredients: ["kolot-peyniri"] },
    ],
  },
  {
    id: "granola",
    name: "Ev Yapımı Granola",
    cuisine: "Modern",
    category: "Kahvaltı",
    diet: "Vegan",
    allergens: ["kuruyemis"],
    ingredients: [
      { id: "yulaf", name: "Yulaf Ezmesi", amount: 2, unit: "su bardağı" },
      { id: "ceviz", name: "Ceviz İçi", amount: 50, unit: "g" },
      { id: "bal-veya-pekmez", name: "Pekmez", amount: 3, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Malzemeleri karıştırıp fırın tepsisine yayın", timer: 300, requiredIngredients: ["yulaf", "ceviz", "bal-veya-pekmez"] },
      { text: "Altın sarısı olana kadar fırınlayın", timer: 900, requiredIngredients: [] },
    ],
  },
  {
    id: "egg-muffin",
    name: "Sebzeli Yumurta Muffini",
    cuisine: "Batı",
    category: "Kahvaltı",
    diet: "Ketojenik",
    allergens: ["yumurta", "laktoz"],
    ingredients: [
      { id: "yumurta", name: "Yumurta", amount: 4, unit: "adet" },
      { id: "ispanak", name: "Ispanak", amount: 100, unit: "g" },
      { id: "peynir", name: "Beyaz Peynir", amount: 50, unit: "g" }
    ],
    steps: [
      { text: "Yumurtaları çırpıp sebzelerle karıştırın", timer: 120, requiredIngredients: ["yumurta", "ispanak", "peynir"] },
      { text: "Muffin kalıplarında pişirin", timer: 1200, requiredIngredients: [] },
    ],
  },
  {
    id: "simit-tabagi",
    name: "Pratik Simit Tabağı",
    cuisine: "Türk",
    category: "Kahvaltı",
    diet: "Vejetaryen",
    allergens: ["gluten", "susam"],
    ingredients: [
      { id: "simit", name: "Simit", amount: 1, unit: "adet" },
      { id: "zeytin", name: "Zeytin", amount: 10, unit: "adet" },
      { id: "peynir", name: "Peynir", amount: 2, unit: "dilim" }
    ],
    steps: [
      { text: "Simiti ısıtın ve yanına diğerlerini dizin", timer: 60, requiredIngredients: ["simit"] },
    ],
  },

  // --- ANA YEMEKLER (11-30) ---
  {
    id: "karniyarik",
    name: "Karnıyarık",
    cuisine: "Türk",
    category: "Ana Yemek",
    diet: "Hepçil",
    allergens: [],
    ingredients: [
      { id: "patlican", name: "Patlıcan", amount: 4, unit: "adet" },
      { id: "kiyma", name: "Kıyma", amount: 250, unit: "g" },
      { id: "sogan", name: "Soğan", amount: 1, unit: "adet" }
    ],
    steps: [
      { text: "Patlıcanları kızartın", timer: 600, requiredIngredients: ["patlican"] },
      { text: "Harcı kavurup içlerini doldurun", timer: 600, requiredIngredients: ["kiyma", "sogan"] },
    ],
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo",
    cuisine: "İtalyan",
    category: "Makarna",
    diet: "Hepçil",
    allergens: ["gluten", "laktoz"],
    ingredients: [
      { id: "makarna", name: "Fettuccine", amount: 250, unit: "g" },
      { id: "tavuk", name: "Tavuk Göğsü", amount: 300, unit: "g" },
      { id: "krema", name: "Krema", amount: 200, unit: "ml" }
    ],
    steps: [
      { text: "Makarnayı haşlayın", timer: 600, requiredIngredients: ["makarna"] },
      { text: "Tavuklu sosu hazırlayıp karıştırın", timer: 600, requiredIngredients: ["tavuk", "krema"] },
    ],
  },
  {
    id: "vegan-bowl",
    name: "Kinoa ve Nohut Bowl",
    cuisine: "Modern",
    category: "Ana Yemek",
    diet: "Vegan",
    allergens: [],
    ingredients: [
      { id: "kinoa", name: "Kinoa", amount: 1, unit: "su bardağı" },
      { id: "nohut", name: "Haşlanmış Nohut", amount: 1, unit: "su bardağı" },
      { id: "brokoli", name: "Brokoli", amount: 1, unit: "küçük boy" }
    ],
    steps: [
      { text: "Kinoayı haşlayın", timer: 900, requiredIngredients: ["kinoa"] },
      { text: "Tüm sebzeleri bir kasede birleştirin", timer: 120, requiredIngredients: ["nohut", "brokoli"] },
    ],
  },
  {
    id: "somon-izgara",
    name: "Somon Izgara",
    cuisine: "Modern",
    category: "Ana Yemek",
    diet: "Ketojenik",
    allergens: ["balık"],
    ingredients: [
      { id: "somon", name: "Somon Fileto", amount: 200, unit: "g" },
      { id: "kuskonmaz", name: "Kuşkonmaz", amount: 5, unit: "adet" },
      { id: "limon", name: "Limon", amount: 0.5, unit: "adet" }
    ],
    steps: [
      { text: "Somonları ve kuşkonmazları ızgara yapın", timer: 720, requiredIngredients: ["somon", "kuskonmaz"] },
    ],
  },
  {
    id: "vegan-burger",
    name: "Mantar Burger",
    cuisine: "Amerikan",
    category: "Ana Yemek",
    diet: "Vegan",
    allergens: ["gluten"],
    ingredients: [
      { id: "mantar", name: "Portobello Mantarı", amount: 2, unit: "adet" },
      { id: "ekmek", name: "Vegan Burger Ekmeği", amount: 2, unit: "adet" },
      { id: "vegan-mayonez", name: "Vegan Mayonez", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Mantarları mühürleyerek pişirin", timer: 480, requiredIngredients: ["mantar"] },
      { text: "Ekmeğe sosu sürüp servis edin", timer: 60, requiredIngredients: ["vegan-mayonez", "ekmek"] },
    ],
  },
  {
    id: "zeytinyagli-fasulye",
    name: "Zeytinyağlı Taze Fasulye",
    cuisine: "Türk",
    category: "Ana Yemek",
    diet: "Vegan",
    allergens: [],
    ingredients: [
      { id: "fasulye", name: "Taze Fasulye", amount: 500, unit: "g" },
      { id: "domates", name: "Domates", amount: 2, unit: "adet" },
      { id: "zeytinyagi", name: "Zeytinyağı", amount: 0.5, unit: "çay bardağı" }
    ],
    steps: [
      { text: "Fasulyeleri domates ve yağ ile kısık ateşte pişirin", timer: 1800, requiredIngredients: ["fasulye", "domates", "zeytinyagi"] },
    ],
  },
  {
    id: "mercimek-koftesi",
    name: "Mercimek Köftesi",
    cuisine: "Türk",
    category: "Atıştırmalık",
    diet: "Vegan",
    allergens: ["gluten"],
    ingredients: [
      { id: "mercimek", name: "Kırmızı Mercimek", amount: 1, unit: "su bardağı" },
      { id: "bulgur", name: "İnce Bulgur", amount: 1, unit: "su bardağı" },
      { id: "salca", name: "Salça", amount: 2, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Mercimeği haşlayıp bulgurla demlendirin", timer: 1200, requiredIngredients: ["mercimek", "bulgur"] },
      { text: "Yoğurup şekil verin", timer: 600, requiredIngredients: ["salca"] },
    ],
  },
  {
    id: "karides-guvec",
    name: "Tereyağlı Karides Güveç",
    cuisine: "Deniz",
    category: "Ana Yemek",
    diet: "Ketojenik",
    allergens: ["kabuklu-deniz-canlisi", "laktoz"],
    ingredients: [
      { id: "karides", name: "Karides", amount: 250, unit: "g" },
      { id: "tereyag", name: "Tereyağı", amount: 2, unit: "yemek kaşığı" },
      { id: "sarimsak", name: "Sarımsak", amount: 3, unit: "diş" }
    ],
    steps: [
      { text: "Sarımsakları yağda kokusu çıkana kadar kavurun", timer: 60, requiredIngredients: ["tereyag", "sarimsak"] },
      { text: "Karidesleri ekleyip renk alana kadar pişirin", timer: 300, requiredIngredients: ["karides"] },
    ],
  },
  {
    id: "musakka",
    name: "Patlıcan Musakka",
    cuisine: "Türk",
    category: "Ana Yemek",
    diet: "Hepçil",
    allergens: [],
    ingredients: [
      { id: "patlican", name: "Patlıcan", amount: 3, unit: "adet" },
      { id: "kiyma", name: "Kıyma", amount: 300, unit: "g" },
      { id: "salca", name: "Salça", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Patlıcanları dilimleyip kızartın", timer: 600, requiredIngredients: ["patlican"] },
      { text: "Kıymalı sosu döküp fırınlayın", timer: 900, requiredIngredients: ["kiyma", "salca"] },
    ],
  },
  {
    id: "falafel",
    name: "Falafel Tabağı",
    cuisine: "Orta Doğu",
    category: "Ana Yemek",
    diet: "Vegan",
    allergens: ["susam"],
    ingredients: [
      { id: "nohut", name: "Kuru Nohut", amount: 2, unit: "su bardağı" },
      { id: "tahin", name: "Tahin", amount: 2, unit: "yemek kaşığı" },
      { id: "maydanoz", name: "Maydanoz", amount: 1, unit: "demet" }
    ],
    steps: [
      { text: "Nohut ve maydanozu robottan geçirin", timer: 300, requiredIngredients: ["nohut", "maydanoz"] },
      { text: "Yağda kızartıp tahin sosla servis edin", timer: 480, requiredIngredients: ["tahin"] },
    ],
  },
  {
    id: "steak",
    name: "Bonfile Izgara",
    cuisine: "Modern",
    category: "Ana Yemek",
    diet: "Ketojenik",
    allergens: [],
    ingredients: [
      { id: "bonfile", name: "Dana Bonfile", amount: 250, unit: "g" },
      { id: "kekik", name: "Kekik", amount: 1, unit: "çay kaşığı" }
    ],
    steps: [
      { text: "Eti yüksek ısıda mühürleyin", timer: 480, requiredIngredients: ["bonfile"] },
    ],
  },
  {
    id: "tofu-sote",
    name: "Susamlı Tofu Sote",
    cuisine: "Asya",
    category: "Ana Yemek",
    diet: "Vegan",
    allergens: ["soya", "susam"],
    ingredients: [
      { id: "tofu", name: "Sert Tofu", amount: 200, unit: "g" },
      { id: "soya-sos", name: "Soya Sosu", amount: 2, unit: "yemek kaşığı" },
      { id: "susam-yagi", name: "Susam Yağı", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Tofuları küp doğrayıp kızartın", timer: 420, requiredIngredients: ["tofu"] },
      { text: "Sosları ekleyip çektirin", timer: 180, requiredIngredients: ["soya-sos", "susam-yagi"] },
    ],
  },
  {
    id: "mantarli-risotto",
    name: "Mantarlı Risotto",
    cuisine: "İtalyan",
    category: "Ana Yemek",
    diet: "Vejetaryen",
    allergens: ["laktoz"],
    ingredients: [
      { id: "pirinc", name: "Arborio Pirinci", amount: 1, unit: "su bardağı" },
      { id: "mantar", name: "Kültür Mantarı", amount: 200, unit: "g" },
      { id: "tereyag", name: "Tereyağı", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Pirinçleri yavaş yavaş su ekleyerek pişirin", timer: 1200, requiredIngredients: ["pirinc"] },
      { text: "Mantar ve yağ ile bağlayın", timer: 300, requiredIngredients: ["mantar", "tereyag"] },
    ],
  },
  {
    id: "kumpir",
    name: "Ev Yapımı Kumpir",
    cuisine: "Türk",
    category: "Atıştırmalık",
    diet: "Vejetaryen",
    allergens: ["laktoz"],
    ingredients: [
      { id: "patates", name: "Büyük Patates", amount: 1, unit: "adet" },
      { id: "kasar", name: "Kaşar", amount: 50, unit: "g" },
      { id: "tereyag", name: "Tereyağı", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Patatesi közleyin", timer: 3600, requiredIngredients: ["patates"] },
      { text: "İçini tereyağ ve peynirle karıştırın", timer: 180, requiredIngredients: ["kasar", "tereyag"] },
    ],
  },
  {
    id: "tavuk-sis",
    name: "Tavuk Şiş",
    cuisine: "Türk",
    category: "Ana Yemek",
    diet: "Hepçil",
    allergens: [],
    ingredients: [
      { id: "tavuk", name: "Tavuk But", amount: 400, unit: "g" },
      { id: "yogurt", name: "Yoğurt (Marine için)", amount: 2, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Tavukları marine edip şişlere dizin", timer: 1800, requiredIngredients: ["tavuk", "yogurt"] },
      { text: "Izgarada pişirin", timer: 720, requiredIngredients: [] },
    ],
  },
  {
    id: "sebzeli-lazanya",
    name: "Sebzeli Lazanya",
    cuisine: "İtalyan",
    category: "Ana Yemek",
    diet: "Vejetaryen",
    allergens: ["gluten", "laktoz"],
    ingredients: [
      { id: "lazanya", name: "Lazanya Yaprağı", amount: 12, unit: "adet" },
      { id: "ispanak", name: "Ispanak", amount: 300, unit: "g" },
      { id: "besamel", name: "Beşamel Sos", amount: 1, unit: "su bardağı" }
    ],
    steps: [
      { text: "Sebzeleri soteleyip kat kat dizin", timer: 600, requiredIngredients: ["ispanak", "lazanya"] },
      { text: "Beşamel sosla fırınlayın", timer: 1800, requiredIngredients: ["besamel"] },
    ],
  },
  {
    id: "humus",
    name: "Humus ve Pastırma",
    cuisine: "Orta Doğu",
    category: "Meze",
    diet: "Hepçil",
    allergens: ["susam"],
    ingredients: [
      { id: "nohut", name: "Haşlanmış Nohut", amount: 2, unit: "su bardağı" },
      { id: "tahin", name: "Tahin", amount: 0.5, unit: "su bardağı" },
      { id: "pastirma", name: "Pastırma", amount: 50, unit: "g" }
    ],
    steps: [
      { text: "Nohutu tahinle blenderdan geçirin", timer: 300, requiredIngredients: ["nohut", "tahin"] },
      { text: "Üzerine pastırmalı yağ dökün", timer: 120, requiredIngredients: ["pastirma"] },
    ],
  },
  {
    id: "firin-mucver",
    name: "Fırın Mücver",
    cuisine: "Türk",
    category: "Ana Yemek",
    diet: "Vejetaryen",
    allergens: ["gluten", "yumurta", "laktoz"],
    ingredients: [
      { id: "kabak", name: "Kabak", amount: 3, unit: "adet" },
      { id: "yumurta", name: "Yumurta", amount: 2, unit: "adet" },
      { id: "un", name: "Un", amount: 1, unit: "su bardağı" }
    ],
    steps: [
      { text: "Kabakları rendeleyip suyunu sıkın", timer: 600, requiredIngredients: ["kabak"] },
      { text: "Diğer malzemelerle karıştırıp fırınlayın", timer: 2100, requiredIngredients: ["yumurta", "un"] },
    ],
  },
  {
    id: "hunkar-begendi",
    name: "Hünkar Beğendi",
    cuisine: "Türk",
    category: "Ana Yemek",
    diet: "Hepçil",
    allergens: ["laktoz", "gluten"],
    ingredients: [
      { id: "kusbasi-et", name: "Kuşbaşı Et", amount: 500, unit: "g" },
      { id: "patlican", name: "Közlenmiş Patlıcan", amount: 3, unit: "adet" },
      { id: "kasar", name: "Kaşar", amount: 50, unit: "g" }
    ],
    steps: [
      { text: "Etleri yumuşayana kadar pişirin", timer: 2700, requiredIngredients: ["kusbasi-et"] },
      { text: "Patlıcanı beşamel ve peynirle ezin", timer: 300, requiredIngredients: ["patlican", "kasar"] },
    ],
  },
  {
    id: "pad-thai",
    name: "Vegan Pad Thai",
    cuisine: "Tayland",
    category: "Makarna",
    diet: "Vegan",
    allergens: ["yerfistigi", "soya"],
    ingredients: [
      { id: "pirinc-cubugu", name: "Pirinç Eriştesi", amount: 200, unit: "g" },
      { id: "fistik", name: "Yer Fıstığı", amount: 30, unit: "g" },
      { id: "soya-filizi", name: "Soya Filizi", amount: 50, unit: "g" }
    ],
    steps: [
      { text: "Erişteleri sıcak suda bekletin", timer: 480, requiredIngredients: ["pirinc-cubugu"] },
      { text: "Soya sosu ve fıstıkla soteleyin", timer: 300, requiredIngredients: ["fistik", "soya-filizi"] },
    ],
  },

  // --- ÇORBALAR (31-40) ---
  {
    id: "mercimek-corbasi",
    name: "Mercimek Çorbası",
    cuisine: "Türk",
    category: "Çorba",
    diet: "Vegan",
    allergens: [],
    ingredients: [
      { id: "mercimek", name: "Kırmızı Mercimek", amount: 1, unit: "su bardağı" },
      { id: "sogan", name: "Soğan", amount: 1, unit: "adet" }
    ],
    steps: [
      { text: "Tüm sebzeleri mercimekle haşlayın", timer: 1200, requiredIngredients: ["mercimek", "sogan"] },
      { text: "Blenderdan geçirin", timer: 120, requiredIngredients: [] },
    ],
  },
  {
    id: "domates-corbasi",
    name: "Sütlü Domates Çorbası",
    cuisine: "Türk",
    category: "Çorba",
    diet: "Vejetaryen",
    allergens: ["laktoz", "gluten"],
    ingredients: [
      { id: "domates", name: "Domates", amount: 4, unit: "adet" },
      { id: "sut", name: "Süt", amount: 1, unit: "su bardağı" },
      { id: "un", name: "Un", amount: 2, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Unu kavurup domatesle pişirin", timer: 600, requiredIngredients: ["un", "domates"] },
      { text: "Sütü ekleyip bağlayın", timer: 180, requiredIngredients: ["sut"] },
    ],
  },
  {
    id: "ispanak-corbasi",
    name: "Kremalı Ispanak Çorbası",
    cuisine: "Modern",
    category: "Çorba",
    diet: "Vejetaryen",
    allergens: ["laktoz"],
    ingredients: [
      { id: "ispanak", name: "Ispanak", amount: 400, unit: "g" },
      { id: "krema", name: "Sıvı Krema", amount: 100, unit: "ml" }
    ],
    steps: [
      { text: "Ispanakları haşlayıp blenderdan geçirin", timer: 600, requiredIngredients: ["ispanak"] },
      { text: "Kremayı ekleyip ısıtın", timer: 120, requiredIngredients: ["krema"] },
    ],
  },
  {
    id: "tarhana",
    name: "Ev Tarhanası",
    cuisine: "Türk",
    category: "Çorba",
    diet: "Vejetaryen",
    allergens: ["gluten", "laktoz"],
    ingredients: [
      { id: "tarhana", name: "Toz Tarhana", amount: 3, unit: "yemek kaşığı" },
      { id: "nane", name: "Kuru Nane", amount: 1, unit: "tatlı kaşığı" }
    ],
    steps: [
      { text: "Tarhanayı soğuk suda çözdürün", timer: 120, requiredIngredients: ["tarhana"] },
      { text: "Karıştırarak kaynatın", timer: 600, requiredIngredients: ["nane"] },
    ],
  },
  {
    id: "yayla-corbasi",
    name: "Yayla Çorbası",
    cuisine: "Türk",
    category: "Çorba",
    diet: "Vejetaryen",
    allergens: ["laktoz", "yumurta", "gluten"],
    ingredients: [
      { id: "yogurt", name: "Yoğurt", amount: 1, unit: "su bardağı" },
      { id: "pirinc", name: "Pirinç", amount: 2, unit: "yemek kaşığı" },
      { id: "yumurta", name: "Yumurta Sarısı", amount: 1, unit: "adet" }
    ],
    steps: [
      { text: "Pirinçleri haşlayın", timer: 600, requiredIngredients: ["pirinc"] },
      { text: "Yoğurt ve yumurtayı ekleyip terbiyeleyin", timer: 300, requiredIngredients: ["yogurt", "yumurta"] },
    ],
  },
  {
    id: "sebze-corbasi",
    name: "Detoks Sebze Çorbası",
    cuisine: "Modern",
    category: "Çorba",
    diet: "Vegan",
    allergens: [],
    ingredients: [
      { id: "kabak", name: "Kabak", amount: 1, unit: "adet" },
      { id: "kereviz", name: "Kereviz Sapı", amount: 2, unit: "adet" },
      { id: "havuc", name: "Havuç", amount: 1, unit: "adet" }
    ],
    steps: [
      { text: "Tüm sebzeleri haşlayıp püre yapın", timer: 900, requiredIngredients: ["kabak", "kereviz", "havuc"] },
    ],
  },
  {
    id: "mantar-corbasi",
    name: "Kremalı Mantar Çorbası",
    cuisine: "Fransız",
    category: "Çorba",
    diet: "Vejetaryen",
    allergens: ["laktoz", "gluten"],
    ingredients: [
      { id: "mantar", name: "Mantar", amount: 300, unit: "g" },
      { id: "krema", name: "Krema", amount: 200, unit: "ml" },
      { id: "un", name: "Un", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Mantarları soteleyip unu ekleyin", timer: 480, requiredIngredients: ["mantar", "un"] },
      { text: "Kremayı ekleyip koyulaştırın", timer: 180, requiredIngredients: ["krema"] },
    ],
  },
  {
    id: "ezogelin",
    name: "Ezogelin Çorbası",
    cuisine: "Türk",
    category: "Çorba",
    diet: "Vegan",
    allergens: ["gluten"],
    ingredients: [
      { id: "mercimek", name: "Kırmızı Mercimek", amount: 1, unit: "su bardağı" },
      { id: "bulgur", name: "Bulgur", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Bakliyatları yumuşayana kadar haşlayın", timer: 1500, requiredIngredients: ["mercimek", "bulgur"] },
    ],
  },
  {
    id: "brokoli-corbasi",
    name: "Brokoli Çorbası",
    cuisine: "Modern",
    category: "Çorba",
    diet: "Vejetaryen",
    allergens: ["laktoz"],
    ingredients: [
      { id: "brokoli", name: "Brokoli", amount: 500, unit: "g" },
      { id: "sut", name: "Süt", amount: 1, unit: "su bardağı" }
    ],
    steps: [
      { text: "Brokolileri haşlayıp sütle blenderdan geçirin", timer: 720, requiredIngredients: ["brokoli", "sut"] },
    ],
  },
  {
    id: "balik-corbasi",
    name: "Balık Çorbası",
    cuisine: "Deniz",
    category: "Çorba",
    diet: "Hepçil",
    allergens: ["balık", "gluten"],
    ingredients: [
      { id: "balik", name: "Levrek Fileto", amount: 200, unit: "g" },
      { id: "havuc", name: "Havuç", amount: 1, unit: "adet" },
      { id: "un", name: "Un", amount: 1, unit: "yemek kaşığı" }
    ],
    steps: [
      { text: "Balık ve sebzeleri haşlayın", timer: 900, requiredIngredients: ["balik", "havuc"] },
      { text: "Unlu terbiye ile bağlayın", timer: 180, requiredIngredients: ["un"] },
    ],
  },

  // --- TATLILAR (41-50) ---
  {
    id: "suffile",
    name: "Çikolatalı Sufle",
    cuisine: "Fransız",
    category: "Tatlı",
    diet: "Vejetaryen",
    allergens: ["yumurta", "laktoz", "gluten"],
    ingredients: [
      { id: "cikolata", name: "Bitter Çikolata", amount: 100, unit: "g" },
      { id: "yumurta", name: "Yumurta", amount: 2, unit: "adet" }
    ],
    steps: [
      { text: "Çikolatayı eritin, yumurtayla karıştırıp fırınlayın", timer: 600, requiredIngredients: ["cikolata", "yumurta"] },
    ],
  },
  {
    id: "chia-puding",
    name: "Çilekli Chia Puding",
    cuisine: "Modern",
    category: "Tatlı",
    diet: "Vegan",
    allergens: [],
    ingredients: [
      { id: "chia", name: "Chia Tohumu", amount: 3, unit: "yemek kaşığı" },
      { id: "badem-sutu", name: "Badem Sütü", amount: 1, unit: "su bardağı" },
      { id: "cilek", name: "Çilek", amount: 5, unit: "adet" }
    ],
    steps: [
      { text: "Chia ve sütü karıştırıp bekletin", timer: 7200, requiredIngredients: ["chia", "badem-sutu"] },
      { text: "Üzerine çilek ekleyin", timer: 60, requiredIngredients: ["cilek"] },
    ],
  },
  {
    id: "magnolia",
    name: "Muzlu Magnolia",
    cuisine: "Modern",
    category: "Tatlı",
    diet: "Vejetaryen",
    allergens: ["laktoz", "gluten"],
    ingredients: [
      { id: "sut", name: "Süt", amount: 500, unit: "ml" },
      { id: "biskuvi", name: "Bisküvi", amount: 1, unit: "paket" }
    ],
    steps: [
      { text: "Muhallebiyi pişirip bisküviyle dizin", timer: 900, requiredIngredients: ["sut", "biskuvi"] },
    ],
  },
  {
    id: "vegan-brownie",
    name: "Avokadolu Vegan Brownie",
    cuisine: "Modern",
    category: "Tatlı",
    diet: "Vegan",
    allergens: ["gluten"],
    ingredients: [
      { id: "avokado", name: "Olgun Avokado", amount: 1, unit: "adet" },
      { id: "kakao", name: "Kakao", amount: 0.5, unit: "su bardağı" },
      { id: "un", name: "Un", amount: 0.5, unit: "su bardağı" }
    ],
    steps: [
      { text: "Avokadoyu ezip kakao ve unla karıştırın", timer: 300, requiredIngredients: ["avokado", "kakao", "un"] },
      { text: "Fırında pişirin", timer: 1200, requiredIngredients: [] },
    ],
  },
  {
    id: "baklava",
    name: "Fıstıklı Baklava",
    cuisine: "Türk",
    category: "Tatlı",
    diet: "Vejetaryen",
    allergens: ["gluten", "laktoz", "kuruyemis"],
    ingredients: [
      { id: "yufka", name: "Baklavalık Yufka", amount: 40, unit: "adet" },
      { id: "fistik", name: "Antep Fıstığı", amount: 200, unit: "g" },
      { id: "serbet", name: "Şerbet", amount: 2, unit: "su bardağı" }
    ],
    steps: [
      { text: "Yufkaları arasına fıstık koyarak dizin", timer: 1800, requiredIngredients: ["yufka", "fistik"] },
      { text: "Fırınlayıp sıcak şerbeti dökün", timer: 2400, requiredIngredients: ["serbet"] },
    ],
  },
  {
    id: "meyve-salatasi",
    name: "Egzotik Meyve Salatası",
    cuisine: "Dünya",
    category: "Tatlı",
    diet: "Vegan",
    allergens: [],
    ingredients: [
      { id: "mango", name: "Mango", amount: 1, unit: "adet" },
      { id: "ananas", name: "Ananas", amount: 0.5, unit: "adet" }
    ],
    steps: [
      { text: "Meyveleri doğrayıp karıştırın", timer: 300, requiredIngredients: ["mango", "ananas"] },
    ],
  },
  {
    id: "revani",
    name: "Haşhaşlı Revani",
    cuisine: "Türk",
    category: "Tatlı",
    diet: "Vejetaryen",
    allergens: ["gluten", "laktoz", "yumurta"],
    ingredients: [
      { id: "irmik", name: "İrmik", amount: 1, unit: "su bardağı" },
      { id: "hashas", name: "Mavi Haşhaş", amount: 2, unit: "yemek kaşığı" },
      { id: "yogurt", name: "Yoğurt", amount: 1, unit: "su bardağı" }
    ],
    steps: [
      { text: "Keki hazırlayıp pişirin", timer: 2100, requiredIngredients: ["irmik", "hashas", "yogurt"] },
    ],
  },
  {
    id: "kabak-tatlisi",
    name: "Tahinli Kabak Tatlısı",
    cuisine: "Türk",
    category: "Tatlı",
    diet: "Vegan",
    allergens: ["susam", "kuruyemis"],
    ingredients: [
      { id: "kabak", name: "Bal Kabağı", amount: 1, unit: "kg" },
      { id: "tahin", name: "Tahin", amount: 0.5, unit: "su bardağı" },
      { id: "ceviz", name: "Ceviz", amount: 50, unit: "g" }
    ],
    steps: [
      { text: "Kabakları şekerle pişirin", timer: 2700, requiredIngredients: ["kabak"] },
      { text: "Tahin ve cevizle servis edin", timer: 60, requiredIngredients: ["tahin", "ceviz"] },
    ],
  },
  {
    id: "sutlac",
    name: "Fırın Sütlaç",
    cuisine: "Türk",
    category: "Tatlı",
    diet: "Vejetaryen",
    allergens: ["laktoz"],
    ingredients: [
      { id: "sut", name: "Süt", amount: 1, unit: "litre" },
      { id: "pirinc", name: "Pirinç", amount: 0.5, unit: "çay bardağı" }
    ],
    steps: [
      { text: "Sütlacı pişirip kaselere bölün", timer: 1200, requiredIngredients: ["sut", "pirinc"] },
      { text: "Fırının üst rafında yakın", timer: 600, requiredIngredients: [] },
    ],
  },
  {
    id: "irmik-helvasi",
    name: "Dondurmalı İrmik Helvası",
    cuisine: "Türk",
    category: "Tatlı",
    diet: "Vejetaryen",
    allergens: ["gluten", "laktoz"],
    ingredients: [
      { id: "irmik", name: "İrmik", amount: 2, unit: "su bardağı" },
      { id: "dondurma", name: "Maraş Dondurması", amount: 100, unit: "g" }
    ],
    steps: [
      { text: "İrmiği kavurup demlendirin", timer: 900, requiredIngredients: ["irmik"] },
      { text: "Dondurma ile servis edin", timer: 120, requiredIngredients: ["dondurma"] },
    ],
  }
];