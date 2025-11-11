document.addEventListener("DOMContentLoaded", () => {
  // === Rating Stars ===
  const stars = document.querySelectorAll(".star");
  const message = document.getElementById("rating-message");

  const savedRating = localStorage.getItem("rating");
  if (savedRating) {
    setRating(savedRating);
    message.textContent = `You rated ${savedRating} out of 5!`;
  }

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const rating = index + 1;
      setRating(rating);
      localStorage.setItem("rating", rating);
      message.textContent = `You rated ${rating} out of 5!`;
    });
  });

  function setRating(rating) {
    stars.forEach((s, i) => s.classList.toggle("active", i < rating));
  }

  // === Random Japanese Food Fact ===
  const factBtn = document.getElementById("fact-btn");
  const factBox = document.getElementById("fact-box");

  if(factBtn && factBox){
    factBtn.addEventListener("click", async () => {
      factBox.classList.remove("show");
      factBox.textContent = "Loading...";

      try {
        const response = await fetch("https://api.quotable.io/random?tags=food");
        const data = await response.json();
        setTimeout(() => {
          factBox.textContent = data.content;
          factBox.classList.add("show");
        }, 300);
      } catch {
        const fallbackFacts = [
          "Sushi was originally a way to preserve fish in fermented rice.",
          "Matcha is made from finely ground green tea leaves.",
          "Ramen came to Japan from China in the late 19th century.",
          "In Japan, slurping noodles is a sign of appreciation!",
          "Tempura was introduced by Portuguese missionaries in the 16th century."
        ];
        const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
        setTimeout(() => {
          factBox.textContent = randomFact;
          factBox.classList.add("show");
        }, 300);
      }
    });
  }

  // === Modal Offers ===
  const modal = document.getElementById('offer-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const closeBtn = document.querySelector('.modal .close');

  document.querySelectorAll('.offer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const offer = btn.closest('.offer');
      modalTitle.textContent = offer.querySelector('h3').textContent;
      modalDesc.textContent = offer.querySelector('p').textContent;
      modal.style.display = 'block';
    });
  });

  if(closeBtn){
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });
  }

  // === Language Translation ===
  const langSelect = document.getElementById("lang-select-header");

  const translations = {
    en: {
      nav: ["Home", "Menu", "About", "Contact"],
      sidebar: ["Contact Us", "Reserve a Table", "Contact Information", "Rate Our Website", "Click on a star to rate!", "Switch to Night Mode", "Random Japanese Food Fact", "Click the button to discover an interesting fact!"],
      hero: ["About Us", "Authentic Japanese Cuisine with a Modern Twist"],
      gallery: ["Upcoming Events", "Live Music Night", "Cooking Class with Chef", "Themed Party Night", "Culinary Discovery Night", "Japanese Traditions Night", "Wine Tasting Event", "Japanese Cuisine Workshop", "Sushi Making Workshop", "Japan Food Tour"],
      interior: ["Interior Design"],
      offers: ["Special Offers", "Birthday Discount", "Get 15% off on your birthday! Celebrate with us and make your special day even better.", "First Delivery Free", "Your first delivery is on us! Enjoy the convenience of having our delicious dishes delivered to your door for free.", "Free Drink with Any Meal", "Order any meal and get a free drink! Enjoy your meal with a refreshing beverage on us.", "Use Offer"],
      faq: ["Frequently Asked Questions", "What payment methods does your restaurant accept?", "We accept cash, bank cards (Visa, MasterCard, Mir), and online payments via Kaspi Pay and Apple Pay.", "Do I need to book a table in advance?", "We recommend booking in advance, especially during evenings and weekends. You can make a reservation through our website or by phone.", "Is it possible to host private events at your restaurant?", "Yes, we have private dining areas suitable for events such as birthdays, corporate dinners, and celebrations. Please contact us in advance to discuss the details.", "Do you offer takeaway or delivery services?", "Absolutely! We offer both takeaway and city-wide delivery. You can place your order through our website or by phone."],
      reviews: [
        "The sushi was amazing! Fresh ingredients, great taste, and fantastic service. I’ll definitely be back!",
        "Oishiro is my go-to restaurant for Japanese cuisine. The ambiance is cozy and the dishes are consistently delicious!",
        "Absolutely loved the experience. Every dish we ordered was full of flavor, and the staff was very attentive.",
        "A hidden gem! Perfect for date nights. The sushi rolls were phenomenal, and the atmosphere was intimate."
      ]
    },
    ru: {
      nav: ["Главная", "Меню", "О нас", "Контакты"],
      sidebar: ["Связаться с нами", "Забронировать стол", "Контактная информация", "Оцените наш сайт", "Нажмите на звезду, чтобы оценить!", "Переключить на ночной режим", "Случайный факт о японской кухне", "Нажмите кнопку, чтобы узнать интересный факт!"],
      hero: ["О нас", "Аутентичная японская кухня с современным акцентом"],
      gallery: ["Предстоящие события", "Ночь живой музыки", "Кулинарный мастер-класс с шеф-поваром", "Тематическая вечеринка", "Вечер кулинарных открытий", "Вечер японских традиций", "Дегустация вин", "Мастер-класс по японской кухне", "Мастер-класс по приготовлению суши", "Гастрономический тур по Японии"],
      interior: ["Дизайн интерьера"],
      offers: ["Специальные предложения", "Скидка на день рождения", "Скидка 15% в день вашего рождения! Отпразднуйте с нами и сделайте свой день особенным.", "Бесплатная первая доставка", "Ваша первая доставка бесплатно! Наслаждайтесь удобством доставки наших блюд прямо к вам.", "Бесплатный напиток с любым блюдом", "Закажите любое блюдо и получите бесплатный напиток! Наслаждайтесь вашей едой с освежающим напитком.", "Использовать предложение"],
      faq: ["Часто задаваемые вопросы", "Какие способы оплаты принимает ваш ресторан?", "Мы принимаем наличные, банковские карты (Visa, MasterCard, Mir) и онлайн-платежи через Kaspi Pay и Apple Pay.", "Нужно ли бронировать стол заранее?", "Рекомендуем бронировать заранее, особенно вечером и в выходные. Вы можете сделать бронирование через наш сайт или по телефону.", "Можно ли проводить частные мероприятия в вашем ресторане?", "Да, у нас есть частные зоны для мероприятий, таких как дни рождения, корпоративные ужины и праздники. Пожалуйста, свяжитесь с нами заранее для уточнения деталей.", "Предлагаете ли вы услуги на вынос или доставку?", "Конечно! Мы предлагаем как на вынос, так и доставку по городу. Вы можете сделать заказ через наш сайт или по телефону."],
      reviews: [
        "Суши были потрясающими! Свежие ингредиенты, отличный вкус и фантастическое обслуживание. Обязательно вернусь!",
        "Oishiro — это мой выбор японской кухни. Атмосфера уютная, блюда всегда вкусные!",
        "Нам очень понравился опыт. Каждое блюдо было полно вкуса, а персонал внимательный.",
        "Скрытая жемчужина! Отлично для свиданий. Роллы были феноменальными, а атмосфера интимной."
      ]
    },
    kz: {
      nav: ["Басты бет", "Мәзір", "Біз туралы", "Байланыс"],
      sidebar: ["Бізбен байланысыңыз", "Үстел брондау", "Байланыс ақпараттары", "Сайтты бағалау", "Баға қою үшін жұлдызға басыңыз!", "Түнгі режимге ауыстыру", "Жапон тағамдары туралы кездейсоқ факт", "Қызықты фактты көру үшін батырманы басыңыз!"],
      hero: ["Біз туралы", "Заманауи акцентпен аутентикалық жапон тағамдары"],
      gallery: ["Келесі оқиғалар", "Тірі музыка кеші", "Шеф-пен кулинарлық мастер-класс", "Тақырыптық кеш", "Кулинарлық ашылу кеші", "Жапон дәстүрлері кеші", "Шара шаралары дәмін тату", "Жапон ас үйі семинары", "Суши дайындау семинары", "Жапония гастрономиялық туры"],
      interior: ["Ішкі интерьер дизайны"],
      offers: ["Арнайы ұсыныстар", "Туған күндік жеңілдік", "Туған күніңізде 15% жеңілдік! Біздің мерекемізбен бірге ерекше күнді жасаңыз.", "Бірінші жеткізу тегін", "Бірінші жеткізу тегін! Дәмді тағамдарымызды үйіңізге жеткізудің ыңғайлылығын пайдаланыңыз.", "Кез келген тамаққа тегін сусын", "Кез келген тамақты тапсырыс беріп, тегін сусын алыңыз! Ас болсын!", "Ұсынысты пайдалану"],
      faq: ["Жиі қойылатын сұрақтар", "Сіздің мейрамханаңыз қандай төлем әдістерін қабылдайды?", "Біз қолма-қол ақша, банк карталары (Visa, MasterCard, Mir) және онлайн төлемдерді Kaspi Pay және Apple Pay арқылы қабылдаймыз.", "Мен алдын ала үстел брондауы қажет пе?", "Әсіресе кешкі уақытта және демалыс күндері алдын ала брондау ұсынылады. Сіз біздің веб-сайт арқылы немесе телефон арқылы тапсырыс жасай аласыз.", "Сіздің мейрамханаңызда жеке іс-шараларды өткізуге болады ма?", "Иә, бізде туған күндер, корпоративтік кешкі ас және мерекелер сияқты жеке орындар бар. Толығырақ келісу үшін алдын ала хабарласыңыз.", "Сіз ас үйден алып кету немесе жеткізу қызметін ұсынасыз ба?", "Әрине! Біз ас үйден алу және қала бойынша жеткізу ұсынамыз. Сіз тапсырысты веб-сайт арқылы немесе телефон арқылы жасай аласыз."],
      reviews: [
        "Суши керемет болды! Жаңа ингредиенттер, тамаша дәм және керемет қызмет. Мен міндетті түрде қайта ораламын!",
        "Oishiro — менің сүйікті жапон ас үйім. Атмосфера ыңғайлы, тағамдар әрдайым дәмді!",
        "Тәжірибе өте ұнады. Әр тағам дәмге бай, қызметкерлер өте көңілді.",
        "Жасырын қазына! Кездесулерге өте қолайлы. Роллдар керемет, атмосфера интимді."
      ]
    }
  };

  function applyTranslation(lang){
    if(!translations[lang]) return;

    // Навигация
    const navLinks = document.querySelectorAll("#nav-menu li a");
    navLinks.forEach((link, i) => { if(link) link.textContent = translations[lang].nav[i]; });

    // Sidebar
    const sidebarHeader = document.querySelector(".sidebar h3");
    if(sidebarHeader) sidebarHeader.textContent = translations[lang].sidebar[0];

    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    if(sidebarLinks[0]) sidebarLinks[0].textContent = translations[lang].sidebar[1];
    if(sidebarLinks[1]) sidebarLinks[1].textContent = translations[lang].sidebar[2];

    const ratingMessage = document.getElementById("rating-message");
    if(ratingMessage) ratingMessage.textContent = translations[lang].sidebar[4];

    const themeBtn = document.getElementById("theme-btn");
    if(themeBtn) themeBtn.textContent = translations[lang].sidebar[5];

    const factHeader = document.querySelector(".random-fact h3");
    if(factHeader) factHeader.textContent = translations[lang].sidebar[6];

    const factBox = document.getElementById("fact-box");
    if(factBox) factBox.textContent = translations[lang].sidebar[7];

    // Hero
    const heroTitle = document.querySelector(".hero-left h1");
    const heroDesc = document.querySelector(".hero-left p");
    if(heroTitle) heroTitle.textContent = translations[lang].hero[0];
    if(heroDesc) heroDesc.textContent = translations[lang].hero[1];

    // Gallery
    const galleryHeader = document.querySelector(".gallery h2");
    if(galleryHeader) galleryHeader.textContent = translations[lang].gallery[0];
    const galleryCaptions = document.querySelectorAll(".gallery .caption");
    galleryCaptions.forEach((cap,i)=>{ if(translations[lang].gallery[i+1]) cap.textContent = translations[lang].gallery[i+1]; });

    // Interior
    const interiorTitle = document.querySelector(".interior h2");
    if(interiorTitle) interiorTitle.textContent = translations[lang].interior[0];

    // Offers
    const offersHeading = document.querySelector(".special-offers-heading");
    if(offersHeading) offersHeading.textContent = translations[lang].offers[0];

    const offerTitles = document.querySelectorAll(".offer-text h3");
    const offerTexts = document.querySelectorAll(".offer-text p");
    const offerBtns = document.querySelectorAll(".offer-btn");

    offerTitles.forEach((t,i) => { if(translations[lang].offers[i*2+1]) t.textContent = translations[lang].offers[i*2+1]; });
    offerTexts.forEach((p,i) => { if(translations[lang].offers[i*2+2]) p.textContent = translations[lang].offers[i*2+2]; });
    offerBtns.forEach((btn,i) => { if(translations[lang].offers[i*2+3]) btn.textContent = translations[lang].offers[i*2+3]; });
    // FAQ
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item,i)=>{
      const q = item.querySelector(".faq-question span");
      const a = item.querySelector(".faq-content p");
      if(q) q.textContent = translations[lang].faq[i*2+1];
      if(a) a.textContent = translations[lang].faq[i*2+2];
    });
    const faqHeader = document.querySelector(".faq h2") || document.querySelector(".faq");
    if(faqHeader) faqHeader.textContent = translations[lang].faq[0];

    // Reviews
    const reviewTexts = document.querySelectorAll(".review-text p");
    reviewTexts.forEach((rev,i)=>{ if(translations[lang].reviews[i]) rev.textContent = translations[lang].reviews[i]; });
  }

  if(langSelect){
    langSelect.addEventListener("change", ()=>applyTranslation(langSelect.value));
    applyTranslation(langSelect.value);
  }

  // === Gallery Reveal ===
  const galleryItems = document.querySelectorAll(".gallery-item");
  function revealOnScroll(){
    const windowHeight = window.innerHeight;
    galleryItems.forEach(item=>{
      const itemTop = item.getBoundingClientRect().top;
      if(itemTop < windowHeight-100) item.classList.add("active");
    });
  }
  if(galleryItems.length>0){
    window.addEventListener("scroll",revealOnScroll);
    revealOnScroll();
  }

  // === FAQ Toggle ===
  const faqQuestion = document.querySelectorAll('.faq-item');
  faqQuestion.forEach(item=>{
    const button = item.querySelector('.open-btn');
    const answer = item.querySelector('.faq-content');
    if(button && answer){
      button.addEventListener('click',()=>{
        answer.classList.toggle('show');
        button.textContent = answer.classList.contains('show') ? 'Close' : 'Open';
      });
    }
  });
});
