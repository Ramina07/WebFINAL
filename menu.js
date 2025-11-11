document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
     Task 2: ACCORDION (Menu Sections)
  =========================== */
  const accordions = document.querySelectorAll(".accordion-title");
  accordions.forEach((title) => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      content.classList.toggle("active");
      if (content.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });


  /* ===========================
     Task 6: Menu Hero Style Toggle
  =========================== */
  const heroSection = document.querySelector('.menu-hero');
  const toggleBtn = document.getElementById('styleToggleBtn');


  if (heroSection && toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      heroSection.classList.toggle('highlighted');


      if (toggleBtn.style.backgroundColor === 'gold') {
        toggleBtn.style.backgroundColor = '#b22222';
        toggleBtn.style.color = '#fff';
        toggleBtn.textContent = 'Change Style';
      } else {
        toggleBtn.style.backgroundColor = 'gold';
        toggleBtn.style.color = '#000';
        toggleBtn.textContent = 'Reset Style';
      }
    });
  }


  /* ===========================
     Task 7: MENU LOAD MORE DISHES
  =========================== */
  function updateAccordionHeight(sectionId) {
    const content = document.getElementById(sectionId).closest('.accordion-content');
    if (content.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.overflowY = "auto";
    }
  }


  function loadDishes(btnId, containerId, jsonFile, sectionId) {
    const loadBtn = document.getElementById(btnId);
    const container = document.getElementById(containerId);


    loadBtn.addEventListener("click", () => {
      fetch(jsonFile)
        .then(res => res.json())
        .then(data => {
          if (container.children.length > 0) return;


          data.forEach(dish => {
            const div = document.createElement("div");
            div.classList.add("menu-item");
            div.innerHTML = `
              <img src="${dish.img}" alt="${dish.name}">
              <div class="overlay"><p>${dish.description}</p></div>
              <h3>${dish.name}</h3>
              <p>${dish.description}</p>
              <strong>${dish.price}</strong>
            `;
            container.appendChild(div);
          });


          updateAccordionHeight(sectionId);


          loadBtn.disabled = true;
          loadBtn.textContent = "All loaded";
        })
        .catch(err => console.error(`Error loading ${jsonFile}:`, err));
    });
  }


  loadDishes("loadMoreBtnSoups", "moreDishesSoups", "soups.json", "soups");
  loadDishes("loadMoreBtnMains", "moreDishesMains", "mains.json", "mains");
  loadDishes("loadMoreBtnDesserts", "moreDishesDesserts", "desserts.json", "desserts");






  // ===== Keyboard Navigation for Menu =====
const menuLinks = document.querySelectorAll("nav ul li a");
let currentIndex = 0;

if (menuLinks.length > 0) {
  menuLinks.forEach(link => {
    link.setAttribute("tabindex", "0"); // делаем все tabbable
    link.style.transition = "background-color 0.3s ease"; // плавное изменение цвета
  });

  // Изначально подсвечиваем первый элемент
  menuLinks[currentIndex].classList.add("focused");
  menuLinks[currentIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.addEventListener("keydown", (e) => {
  if (!menuLinks.length) return;

  const activeElement = document.activeElement;

  // Если фокус в input или textarea, не обрабатываем стрелки
  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
    return;
  }

  // Убираем предыдущую подсветку
  menuLinks[currentIndex].classList.remove("focused");

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % menuLinks.length;
  }

  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + menuLinks.length) % menuLinks.length;
  }

  // Добавляем подсветку к текущей ссылке
  menuLinks[currentIndex].classList.add("focused");
  menuLinks[currentIndex].focus();
  menuLinks[currentIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Enter или Space — "клик" по элементу
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    menuLinks[currentIndex].click();
  }
});



/*Product Filter*/


const filterMapping = [
    { selectId: "productFilterSoups", sectionId: "soups" },
    { selectId: "productFilterMains", sectionId: "mains" },
    { selectId: "productFilterDesserts", sectionId: "desserts" }
  ];


  filterMapping.forEach(({ selectId, sectionId }) => {
    const filterSelect = document.getElementById(selectId);
    const section = document.getElementById(sectionId);


    filterSelect.addEventListener("change", () => {
      const filterValue = filterSelect.value;


      // Получаем ВСЕ карточки в этой секции, включая загруженные через Load More
      const dishCards = section.querySelectorAll(".menu-item");


      dishCards.forEach(card => card.style.display = "block");


      switch (filterValue) {
        case "price-low":
          dishCards.forEach(card => {
            const price = parseInt(card.querySelector("strong").textContent.replace("$",""));
            if (price > 10) card.style.display = "none";
          });
          break;


        case "price-high":
          dishCards.forEach(card => {
            const price = parseInt(card.querySelector("strong").textContent.replace("$",""));
            if (price <= 10) card.style.display = "none";
          });
          break;


       


        default:
          dishCards.forEach(card => card.style.display = "block");
          break;
           }
    });
  });


 


  /* ===========================
     1. Объекты и методы
  =========================== */
  class Dish {
    constructor(name, description, price, img, category, section) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.img = img;
      this.category = category; // "ramen" или "dessert"
      this.section = section;   // "soups", "mains", "desserts"
    }


    getInfo() {
      return `${this.name}: ${this.description} - $${this.price}`;
    }
  }


  // Дополнительные блюда для Load More
  const extraDishes = [
  // Soups & Ramen
  new Dish("Miso Ramen", "Savory miso broth with noodles, tofu, and veggies.", 10, "images/miso_ramen.jpg", "ramen", "soups"),
  new Dish("Chicken Udon", "Thick udon noodles in rich chicken broth.", 11, "images/chicken_udon.jpg", "ramen", "soups"),
  new Dish("Spicy Ramen", "Noodles in hot spicy broth with vegetables and egg.", 12, "images/spicy_ramen.jpg", "ramen", "soups"),


  // Main Courses
  new Dish("Beef Teriyaki", "Grilled beef glazed with teriyaki sauce, served with rice.", 20, "images/beef_teriyaki.jpg", "mains", "mains"),
  new Dish("Tempura Set", "Assorted tempura vegetables and shrimp served with sauce.", 18, "images/tempura_set.jpg", "mains", "mains"),
  new Dish("Chicken Katsu", "Deep-fried chicken cutlet served with rice and salad.", 17, "images/chicken_katsu.jpg", "mains", "mains"),


  // Desserts
  new Dish("Mochi Ice Cream", "Chewy rice cakes with ice cream filling.", 7, "images/mochi_icecream.jpg", "dessert", "desserts"),
  new Dish("Matcha Cake", "Green tea flavored sponge cake with cream.", 8, "images/matcha_cake.jpg", "dessert", "desserts"),
  new Dish("Dorayaki Deluxe", "Soft pancakes filled with sweet red bean paste and cream.", 9, "images/dorayaki_deluxe.jpg", "dessert", "desserts")
];








  /* ===========================
     2. Load More
  =========================== */
  function loadMore(sectionId, btnId) {
    const container = document.getElementById(`moreDishes${capitalize(sectionId)}`);
    const btn = document.getElementById(btnId);


    btn.addEventListener("click", () => {
      const dishesToLoad = extraDishes.filter(d => d.section === sectionId);
      dishesToLoad.forEach(dish => {
        const div = document.createElement("div");
        div.classList.add("menu-item");
        div.innerHTML = `
          <img src="${dish.img}" alt="${dish.name}">
          <div class="overlay"><p>${dish.description}</p></div>
          <h3>${dish.name}</h3>
          <p>${dish.description}</p>
          <strong>$${dish.price}</strong>
        `;
        container.appendChild(div);
        addAnimation(div);
      });


      updateAccordionHeight(sectionId);




      btn.disabled = true;
      btn.textContent = "All loaded";
      playClickSound();
      });
  }


  loadMore("soups", "loadMoreBtnSoups");
  loadMore("mains", "loadMoreBtnMains");
  loadMore("desserts", "loadMoreBtnDesserts");


  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  /* ===========================
     3. Фильтры (учитываем все блюда)
  =========================== */
  const filterSelectors = [
    {selectId: "productFilterSoups", section: "soups"},
    {selectId: "productFilterMains", section: "mains"},
    {selectId: "productFilterDesserts", section: "desserts"}
  ];


  filterSelectors.forEach(f => {
    const select = document.getElementById(f.selectId);
    select.addEventListener("change", () => {
      const section = document.getElementById(f.section);
      const allItems = section.querySelectorAll(".menu-item"); // все карточки


      allItems.forEach(item => item.style.display = "block"); // сброс


      const value = select.value;
      allItems.forEach(item => {
        const price = parseInt(item.querySelector("strong").textContent.replace("$",""));
        const title = item.querySelector("h3").textContent.toLowerCase();


        switch(value) {
          case "price-low":
            if (price > 10) item.style.display = "none";
            break;
          case "price-high":
            if (price <= 10) item.style.display = "none";
            break;
            case "category-ramen":
            if (!title.includes("ramen") && !title.includes("soup") && !title.includes("tonkatsu") && !title.includes("udon")) item.style.display = "none";
            break;
          case "category-dessert":
            if (!title.includes("cake") && !title.includes("ice cream") && !title.includes("dorayaki") && !title.includes("mochi")) item.style.display = "none";
            break;
        }
      });
    });
  });


  /* ===========================
     4. Звуки
  =========================== */
  const clickSound = new Audio("sounds/click.mp3");
  function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
  }


  document.querySelectorAll(".load-more-btn").forEach(btn => {
    btn.addEventListener("click", playClickSound);
  });
  /* ===========================
     Task 5: DISPLAY CURRENT DATE & TIME
  =========================== */
  const dateTimeBox = document.querySelector("#datetime");


  function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    if (dateTimeBox) {
        const formatted = now.toLocaleString('en-US', options);
        const headerClock = document.getElementById('datetime'); // только этот
        if (headerClock) headerClock.textContent = formatted;
    }
      
    }
  


  updateDateTime();
  setInterval(updateDateTime, 1000);

 

  /* ===========================
     5. Анимации
  =========================== */
  function addAnimation(item) {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.05)";
      item.style.transition = "transform 0.3s ease";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1)";
    });
  }


  document.querySelectorAll(".menu-item").forEach(addAnimation);

  // === Scroll Progress Bar ===
$(document).ready(function() {
  $('body').prepend('<div id="scrollProgress"></div>');
  $(window).on('scroll', function() {
    let scrollTop = $(window).scrollTop();
    let docHeight = $(document).height() - $(window).height();
    let scrollPercent = (scrollTop / docHeight) * 100;
    $('#scrollProgress').css('width', scrollPercent + '%');
  });
});

// ======= Search + Autocomplete + Highlight =======
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const highlightSection = document.querySelector(".highlight-section"); 

// Список всех блюд
const dishes = [
  "Salmon Poke",
  "Tuna Roll",
  "Ramen Deluxe",
  "Sashimi Set",
  "Tempura Mix",
  "Matcha Cheesecake",
  "Ebi Tempura",
  "Maguro Sashimi",
  "Matcha Ice Cream"
];

// ===== Autocomplete & Menu Filtering =====
function showSuggestions(value) {
  suggestions.innerHTML = "";
  if (!value) return;

  const filtered = dishes.filter(dish =>
    dish.toLowerCase().includes(value.toLowerCase())
  );

  filtered.forEach(dish => {
    const div = document.createElement("div");
    div.textContent = dish;
    div.addEventListener("click", () => {
      searchInput.value = dish;
      suggestions.innerHTML = "";
      filterMenu(dish); // фильтруем меню по выбранному блюду
    });
    suggestions.appendChild(div);
  });
}

function filterMenu(value) {
  const val = value.toLowerCase();
  document.querySelectorAll(".menu-item").forEach(item => {
    const title = item.querySelector("h3").textContent.toLowerCase();
    if (title.includes(val)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim();
  showSuggestions(value);
  filterMenu(value); // фильтрация в реальном времени
});

// Закрытие подсказок при клике вне input
document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.innerHTML = "";
  }
});

// ===== Highlight Section =====
const highlightInput = document.getElementById("highlightInput");
const highlightBtn = document.getElementById("highlightBtn");

highlightBtn.addEventListener("click", () => {
  const keyword = highlightInput.value.trim();
  if (!keyword) return;

  // Получаем все заголовки блюд
  const titles = document.querySelectorAll(".menu-item h3");

  titles.forEach(title => {
    // Снимаем предыдущие подсветки
    const text = title.textContent;
    title.innerHTML = text;

    // Если есть совпадение, подсвечиваем
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      const regex = new RegExp(`(${keyword})`, "gi");
      title.innerHTML = text.replace(regex, '<span class="highlighted">$1</span>');
    }
  });
});

// Элементы menu page
const profileInfoMenu = document.getElementById('profileInfoMenu');
const profileNameHeaderMenu = document.getElementById('profileNameHeaderMenu');
const logoutBtnHeaderMenu = document.getElementById('logoutBtnHeaderMenu');

// Проверка текущего пользователя
const currentUserMenu = localStorage.getItem('currentUser');
if(currentUserMenu){
  const user = JSON.parse(currentUserMenu);
  profileNameHeaderMenu.textContent = user.name;
  profileInfoMenu.style.display = 'flex';
}

// Log Out на menu page
logoutBtnHeaderMenu.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  profileInfoMenu.style.display = 'none';
  window.location.href = 'index.html'; // Возврат на home для регистрации/входа
});




});






