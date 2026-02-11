export const RECIPES = [
  // --- KAHVALTILIKLAR ---
  {
    id: "menemen",
    name: "Menemen",
    cuisine: "Türk",
    category: "Kahvaltı",
    ingredients: ["Domates", "Biber", "Yumurta", "Yağ", "Tuz"],
    steps: [
      { text: "Biberleri doğrayıp yağda kavurun", timer: 180 },
      { text: "Domatesleri ekleyip suyunu çekene kadar pişirin", timer: 300 },
      { text: "Yumurtaları kırıp hafifçe karıştırın", timer: 120 },
    ],
  },
  {
    id: "pancake",
    name: "Pancake",
    cuisine: "Amerikan",
    category: "Kahvaltı",
    ingredients: ["Un", "Süt", "Yumurta", "Kabartma Tozu", "Şeker"],
    steps: [
      { text: "Tüm malzemeleri pürüzsüz olana kadar çırpın", timer: 180 },
      { text: "Tavayı yağlayıp harçtan bir kepçe dökün", timer: 60 },
      { text: "Üzeri göz göz olunca ters çevirip pişirin", timer: 60 },
    ],
  },
  {
    id: "sucuklu-yumurta",
    name: "Sucuklu Yumurta",
    cuisine: "Türk",
    category: "Kahvaltı",
    ingredients: ["Sucuk", "Yumurta", "Tereyağı", "Pul Biber"],
    steps: [
      { text: "Sucukları dilimleyip tereyağında önlü arkalı pişirin", timer: 120 },
      { text: "Yumurtaları üzerine kırıp sarısını bozmadan pişirin", timer: 180 },
    ],
  },

  // --- ANA YEMEKLER (ET & TAVUK) ---
  {
    id: "karniyarik",
    name: "Karnıyarık",
    cuisine: "Türk",
    category: "Ana Yemek",
    ingredients: ["Patlıcan", "Kıyma", "Soğan", "Sarımsak", "Salça"],
    steps: [
      { text: "Patlıcanları alacalı soyup yağda kızartın", timer: 600 },
      { text: "İç harcı (kıyma, soğan, salça) kavurun", timer: 480 },
      { text: "Patlıcanları doldurup fırında pişirin", timer: 1200 },
    ],
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo",
    cuisine: "İtalyan",
    category: "Makarna",
    ingredients: ["Fettuccine", "Tavuk Göğsü", "Krema", "Parmesan", "Sarımsak"],
    steps: [
      { text: "Makarnayı bol tuzlu suda haşlayın", timer: 600 },
      { text: "Tavukları küp küp doğrayıp soteleyin", timer: 420 },
      { text: "Krema ve peyniri ekleyip makarnayla birleştirin", timer: 180 },
    ],
  },
  {
    id: "tavuk-sote",
    name: "Renkli Tavuk Sote",
    cuisine: "Türk",
    category: "Ana Yemek",
    ingredients: ["Tavuk Göğsü", "Renkli Biberler", "Soğan", "Domates", "Kekik"],
    steps: [
      { text: "Tavukları yüksek ateşte suyunu salıp çekene kadar pişirin", timer: 600 },
      { text: "Sebzeleri ekleyip yumuşayana kadar soteleyin", timer: 300 },
      { text: "Baharatları ekleyip son bir kez karıştırın", timer: 60 },
    ],
  },
  {
    id: "hamburger",
    name: "Ev Yapımı Burger",
    cuisine: "Amerikan",
    category: "Ana Yemek",
    ingredients: ["Burger Köftesi", "Burger Ekmeği", "Çedar Peyniri", "Marul", "Turşu"],
    steps: [
      { text: "Köfteleri döküm tavada mühürleyerek pişirin", timer: 480 },
      { text: "Peynirleri üzerine koyup eritin", timer: 60 },
      { text: "Ekmekleri ısıtıp malzemeleri dizin", timer: 120 },
    ],
  },

  // --- MAKARNA & PİZZA ---
  {
    id: "spaghetti-bolognese",
    name: "Spagetti Bolonez",
    cuisine: "İtalyan",
    category: "Makarna",
    ingredients: ["Spagetti", "Kıyma", "Havuç", "Kereviz Sapı", "Domates Sosu"],
    steps: [
      { text: "Sebzeleri ve kıymayı uzun süre kavurarak sosu hazırlayın", timer: 900 },
      { text: "Makarnayı al dente kıvamında haşlayın", timer: 540 },
      { text: "Sosu makarnanın üzerine döküp servis yapın", timer: 60 },
    ],
  },
  {
    id: "margarita-pizza",
    name: "Pizza Margarita",
    cuisine: "İtalyan",
    category: "Hamur İşi",
    ingredients: ["Pizza Hamuru", "Mozzarella", "Fesleğen", "Domates Sosu"],
    steps: [
      { text: "Hamuru açıp üzerine sosu yayın", timer: 300 },
      { text: "Peynirleri dizip yüksek ısıda fırınlayın", timer: 600 },
      { text: "Fırından çıkınca taze fesleğenleri ekleyin", timer: 30 },
    ],
  },

  // --- ÇORBALAR ---
  {
    id: "mercimek-corbasi",
    name: "Mercimek Çorbası",
    cuisine: "Türk",
    category: "Çorba",
    ingredients: ["Kırmızı Mercimek", "Soğan", "Patates", "Havuç", "Tereyağı"],
    steps: [
      { text: "Tüm sebzeleri mercimekle birlikte düdüklüde pişirin", timer: 900 },
      { text: "Blenderdan geçirip pürüzsüz yapın", timer: 120 },
      { text: "Üzerine tereyağlı naneli sos yakın", timer: 60 },
    ],
  },
  {
    id: "domates-corbasi",
    name: "Köz Domates Çorbası",
    cuisine: "Türk",
    category: "Çorba",
    ingredients: ["Domates", "Un", "Süt", "Kaşar Peyniri", "Tereyağı"],
    steps: [
      { text: "Unu tereyağında kokusu çıkana kadar kavurun", timer: 180 },
      { text: "Domates püresini ekleyip kaynatın", timer: 600 },
      { text: "Sütü ekleyip bir taşım daha pişirin", timer: 120 },
    ],
  },

  // --- DÜNYA MUTFAĞI ---
  {
    id: "guacamole-taco",
    name: "Etli Taco",
    cuisine: "Meksika",
    category: "Atıştırmalık",
    ingredients: ["Taco Kabuğu", "Bonfile Dilimleri", "Avokado", "Kırmızı Soğan", "Kişniş"],
    steps: [
      { text: "Etleri yüksek ateşte hızla mühürleyin", timer: 300 },
      { text: "Avokadoyu ezip sos haline getirin", timer: 180 },
      { text: "Isınmış taco kabuklarına malzemeleri paylaştırın", timer: 120 },
    ],
  },
  {
    id: "sushi-roll",
    name: "California Roll",
    cuisine: "Japon",
    category: "Uzak Doğu",
    ingredients: ["Sushi Pirinci", "Nori", "Yengeç Çubuğu", "Avokado", "Salatalık"],
    steps: [
      { text: "Pirinci haşlayıp soğumaya bırakın", timer: 1200 },
      { text: "Nori üzerine pirinci ve malzemeleri dizin", timer: 300 },
      { text: "Bambu mat yardımıyla sıkıca sarın", timer: 180 },
    ],
  },
  {
    id: "pad-thai",
    name: "Pad Thai",
    cuisine: "Tayland",
    category: "Uzak Doğu",
    ingredients: ["Pirinç Eriştesi", "Karides", "Yer Fıstığı", "Yumurta", "Tamarind Sos"],
    steps: [
      { text: "Erişteleri sıcak suda bekletin", timer: 600 },
      { text: "Karidesleri ve yumurtayı wok tavada pişirin", timer: 240 },
      { text: "Tüm malzemeyi sosla birleştirip harmanlayın", timer: 180 },
    ],
  },

  // --- TATLILAR ---
  {
    id: "suffile",
    name: "Çikolatalı Sufle",
    cuisine: "Fransız",
    category: "Tatlı",
    ingredients: ["Bitter Çikolata", "Tereyağı", "Yumurta", "Şeker", "Un"],
    steps: [
      { text: "Çikolata ve tereyağını benmari usulü eritin", timer: 300 },
      { text: "Yumurta ve şekeri çırpıp çikolatayla karıştırın", timer: 180 },
      { text: "Fırında dışı pişmiş içi akışkan kalana kadar tutun", timer: 480 },
    ],
  },
  {
    id: "magnolia",
    name: "Muzlu Magnolia",
    cuisine: "Modern",
    category: "Tatlı",
    ingredients: ["Süt", "Şeker", "Nişasta", "Bebek Bisküvisi", "Muz"],
    steps: [
      { text: "Muhallebiyi koyulaşana kadar pişirin", timer: 600 },
      { text: "Bisküvileri rondodan geçirin", timer: 120 },
      { text: "Bardaklara kat kat bisküvi, muz ve muhallebi dizin", timer: 300 },
    ],
  },

  // --- EKSTRALAR ---
  {
    id: "kumpir",
    name: "Ev Yapımı Kumpir",
    cuisine: "Türk",
    category: "Atıştırmalık",
    ingredients: ["Büyük Patates", "Kaşar Peyniri", "Tereyağı", "Mısır", "Zeytin"],
    steps: [
      { text: "Patatesleri folyoya sarıp fırında közleyin", timer: 3600 },
      { text: "İçini tereyağı ve peynirle ezip karıştırın", timer: 180 },
      { text: "Garnitürleri üzerine ekleyin", timer: 120 },
    ],
  },
  {
    id: "mantar-sote",
    name: "Kremalı Mantar Sote",
    cuisine: "Fransız",
    category: "Yan Yemek",
    ingredients: ["Kültür Mantarı", "Krema", "Sarımsak", "Maydanoz"],
    steps: [
      { text: "Mantarları yüksek ateşte soteleyin", timer: 480 },
      { text: "Sarımsak ve kremayı ekleyip çektirin", timer: 180 },
      { text: "Taze maydanozla servis yapın", timer: 30 },
    ],
  },
  {
    id: "sezar-salata",
    name: "Tavuklu Sezar Salata",
    cuisine: "Amerikan",
    category: "Salata",
    ingredients: ["Yedikule Marul", "Izgara Tavuk", "Kruton Ekmek", "Parmesan", "Sezar Sos"],
    steps: [
      { text: "Tavukları ızgara tavada pişirin", timer: 480 },
      { text: "Marulları doğrayıp sosla harmanlayın", timer: 180 },
      { text: "Üzerine tavukları ve ekmekleri ekleyin", timer: 60 },
    ],
  },
  {
    id: "mercimek-koftesi",
    name: "Mercimek Köftesi",
    cuisine: "Türk",
    category: "Atıştırmalık",
    ingredients: ["Kırmızı Mercimek", "İnce Bulgur", "Salça", "Taze Soğan", "Maydanoz"],
    steps: [
      { text: "Mercimeği haşlayıp bulguru içine ekleyerek dinlendirin", timer: 1200 },
      { text: "Salçalı sosu hazırlayıp yoğurun", timer: 480 },
      { text: "Şekil verip marul eşliğinde dizin", timer: 600 },
    ],
  },
  {
    id: "omlet",
    name: "Peynirli Fransız Omleti",
    cuisine: "Fransız",
    category: "Kahvaltı",
    ingredients: ["Yumurta", "Tereyağı", "Kaşar Peyniri", "Frenk Soğanı"],
    steps: [
      { text: "Yumurtaları pürüzsüz olana kadar çırpın", timer: 60 },
      { text: "Kısık ateşte tavayı sürekli sallayarak pişirin", timer: 180 },
      { text: "İçine peyniri koyup rulo şeklinde sarın", timer: 60 },
    ],
  },
  {
    id: "kisir",
    name: "Nar Ekşili Kısır",
    cuisine: "Türk",
    category: "Atıştırmalık",
    ingredients: ["İnce Bulgur", "Sıcak Su", "Nar Ekşisi", "Salça", "Yeşillik"],
    steps: [
      { text: "Bulguru sıcak suyla ıslatıp şişmesini bekleyin", timer: 600 },
      { text: "Salça ve baharatları ekleyip iyice yoğurun", timer: 300 },
      { text: "Yeşillikleri ve nar ekşisini ekleyip karıştırın", timer: 120 },
    ],
  },
  {
    id: "cacik",
    name: "Buzlu Cacık",
    cuisine: "Türk",
    category: "Yan Yemek",
    ingredients: ["Yoğurt", "Salatalık", "Sarımsak", "Kuru Nane", "Zeytinyağı"],
    steps: [
      { text: "Salatalıkları rendeleyin veya minik küp doğrayın", timer: 180 },
      { text: "Yoğurt, su ve sarımsakla birleştirin", timer: 120 },
      { text: "Zeytinyağı ve nane ekleyip servis edin", timer: 30 },
    ],
  },
  {
    id: "izgara-kofte",
    name: "Anne Köftesi",
    cuisine: "Türk",
    category: "Ana Yemek",
    ingredients: ["Kıyma", "Bayat Ekmek", "Soğan", "Maydanoz", "Kimyon"],
    steps: [
      { text: "Tüm malzemeleri en az 10 dakika yoğurun", timer: 600 },
      { text: "Buzdolabında dinlendirin", timer: 1800 },
      { text: "Tavada veya ızgarada önlü arkalı pişirin", timer: 480 },
    ],
  },
  {
    id: "ispanakli-borek",
    name: "Hazır Yufkadan Börek",
    cuisine: "Türk",
    category: "Hamur İşi",
    ingredients: ["Yufka", "Ispanak", "Lor Peyniri", "Süt", "Yumurta"],
    steps: [
      { text: "Ispanaklı harcı hazırlayın", timer: 300 },
      { text: "Yufkalara sos sürüp iç harcı yerleştirin", timer: 480 },
      { text: "Fırında üzeri kızarana kadar pişirin", timer: 1800 },
    ],
  },
  {
    id: "fellah-koftesi",
    name: "Fellah Köftesi",
    cuisine: "Türk",
    category: "Ana Yemek",
    ingredients: ["İnce Bulgur", "İrmik", "Un", "Sarımsaklı Yoğurt", "Salçalı Sos"],
    steps: [
      { text: "Bulgur ve irmiği yoğurup minik toplar yapın", timer: 900 },
      { text: "Kaynar suda haşlayın", timer: 480 },
      { text: "Salçalı sarımsaklı sosla harmanlayın", timer: 180 },
    ],
  },
  {
    id: "sebze-graten",
    name: "Beşamel Soslu Sebze",
    cuisine: "Fransız",
    category: "Yan Yemek",
    ingredients: ["Karnabahar", "Brokoli", "Süt", "Un", "Kaşar Peyniri"],
    steps: [
      { text: "Sebzeleri hafifçe haşlayın", timer: 480 },
      { text: "Beşamel sosu hazırlayıp üzerine dökün", timer: 300 },
      { text: "Peynirle birlikte fırınlayın", timer: 900 },
    ],
  },
  {
    id: "mozaik-pasta",
    name: "Mozaik Pasta",
    cuisine: "Türk",
    category: "Tatlı",
    ingredients: ["Pötibör Bisküvi", "Kakao", "Süt", "Tereyağı", "Ceviz"],
    steps: [
      { text: "Süt, kakao ve yağı eritip karıştırın", timer: 180 },
      { text: "Bisküvileri kırmadan karışıma ekleyin", timer: 120 },
      { text: "Dondurucuda donana kadar bekletin", timer: 7200 },
    ],
  },
  {
    id: "humus",
    name: "Pastırmalı Humus",
    cuisine: "Lübnan",
    category: "Meze",
    ingredients: ["Nohut", "Tahin", "Limon", "Kimyon", "Pastırma"],
    steps: [
      { text: "Haşlanmış nohutları pürüzsüz olana kadar robotta çekin", timer: 300 },
      { text: "Tahin ve limonu ekleyip kıvam verin", timer: 120 },
      { text: "Pastırmaları üzerine yakıp sıcak servis edin", timer: 180 },
    ],
  },
  {
    id: "shakshuka",
    name: "Şakşuka",
    cuisine: "Türk",
    category: "Meze",
    ingredients: ["Patlıcan", "Kabak", "Patates", "Domates Sosu", "Sarımsak"],
    steps: [
      { text: "Tüm sebzeleri küp küp doğrayıp kızartın", timer: 900 },
      { text: "Sarımsaklı domates sosunu hazırlayın", timer: 300 },
      { text: "Sebzeleri sosla birleştirin", timer: 60 },
    ],
  }
];