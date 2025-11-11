document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.querySelector("header nav ul");

  if (navMenu) {
    const menuItems = navMenu.querySelectorAll("a");

    let currentIndex = Array.from(menuItems).findIndex(item => item.classList.contains("active"));
    if (currentIndex === -1) currentIndex = 0;

    menuItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentIndex = index;
      });
    });

    document.addEventListener("keydown", (e) => {
      const activeElement = document.activeElement;

      // Если фокус в поле поиска — не обрабатываем стрелки
      if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) return;

      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % menuItems.length;
        menuItems[currentIndex].focus();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        menuItems[currentIndex].focus();
        e.preventDefault();
      }
    });
  }
});