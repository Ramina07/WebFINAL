document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // 1. Навигация по меню
  // =======================
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) {
    const menuItems = navMenu.querySelectorAll("a");
    let menuIndex = Array.from(menuItems).findIndex(item => item.classList.contains("active"));
    if (menuIndex === -1) menuIndex = 0;

    menuItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        menuIndex = index;
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        menuIndex = (menuIndex + 1) % menuItems.length;
        menuItems[menuIndex].focus();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        menuIndex = (menuIndex - 1 + menuItems.length) % menuItems.length;
        menuItems[menuIndex].focus();
        e.preventDefault();
      }
    });
  }

  // =======================
  // 2. Theme Toggle
  // =======================
  const themeBtn = document.getElementById("theme-btn");
  const themeElements = document.querySelectorAll("body, header, main, footer, .sidebar");
  if (themeElements.length) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "night") {
      themeElements.forEach(el => el.classList.add("night-mode"));
      if (themeBtn) themeBtn.textContent = "Switch to Day Mode";
    } else {
      if (themeBtn) themeBtn.textContent = "Switch to Night Mode";
    }

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        themeElements.forEach(el => el.classList.toggle("night-mode"));
        const isNight = document.body.classList.contains("night-mode");
        themeBtn.textContent = isNight ? "Switch to Day Mode" : "Switch to Night Mode";
        localStorage.setItem("theme", isNight ? "night" : "day");
      });
    }
  }

  // =======================
  // 3. Sidebar Multi-step Form
  // =======================
  const sidebarForm = document.getElementById("privateFormSidebar");
  if (sidebarForm) {
    const steps = sidebarForm.querySelectorAll(".form-step");
    let currentStep = 0;

    function showStep(step) {
      steps.forEach((s, i) => s.classList.toggle("step-active", i === step));
    }

    showStep(currentStep);

    sidebarForm.querySelectorAll(".next-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      });
    });

    sidebarForm.querySelectorAll(".back-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    });

    // =======================
    // 3a. Modal Window
    // =======================
    const modal = document.getElementById("reservation-modal");
    if (modal) {
      const closeBtn = modal.querySelector(".close");
      const title = document.getElementById("reservation-title");
      const desc = document.getElementById("reservation-description");

      if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("show"));
      window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("show");
      });

      sidebarForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = sidebarForm.guestName.value.trim();
        const guests = sidebarForm.guests.value.trim();
        const occasion = sidebarForm.occasion.value;

        if (title && desc) {
          title.textContent = "Reservation Submitted!";
          desc.textContent = `Thank you, ${name}! Your reservation for ${guests} guest(s) (${occasion}) has been received.`;
        }
        modal.classList.add("show");

        sidebarForm.reset();
        currentStep = 0;
        showStep(currentStep);
      });
    }
  }

  // =======================
  // 4. Load Restaurant Info
  // =======================
  const loadInfoBtn = document.getElementById("load-info-btn");
  const infoResult = document.getElementById("info-result");
  let infoIndex = 0;

  if (loadInfoBtn && infoResult) {
    loadInfoBtn.addEventListener("click", () => {
      fetch('restaurantInfo.json')
        .then(response => response.json())
        .then(data => {
          const info = data[infoIndex];
          const newEntry = document.createElement("div");
          newEntry.classList.add("info-entry");
          newEntry.innerHTML = `
            <p><strong>Address:</strong> ${info.address}</p>
            <p><strong>Working Hours:</strong> ${info.hours}</p>
            <p><strong>Did you know?</strong> ${info.fact}</p>
            <hr>
          `;
          infoResult.appendChild(newEntry);
          infoResult.style.display = "block";
          infoIndex = (infoIndex + 1) % data.length;
        })
        .catch(error => console.error("Error loading restaurant info:", error));
    });
  }

  // =======================
  // 5. Popup Form
  // =======================
  const openPopupBtn = document.getElementById('openPopupBtn');
  const closePopupBtn = document.getElementById('closePopupBtn');
  const popupForm = document.getElementById('popupForm');

  if (openPopupBtn && closePopupBtn && popupForm) {
    openPopupBtn.addEventListener('click', () => popupForm.style.display = 'flex');
    closePopupBtn.addEventListener('click', () => popupForm.style.display = 'none');
    window.addEventListener('click', (e) => {
      if (e.target === popupForm) popupForm.style.display = 'none';
    });
  }

  // =======================
  // 6. MyForm Validation
  // =======================
  const myForm = document.getElementById("myForm");
  if (myForm) {
    myForm.addEventListener("submit", function(event) {
      event.preventDefault();
      let isValid = true;
      document.querySelectorAll(".error").forEach(msg => msg.remove());

      // --- Name ---
      const name = document.getElementById("resName");
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!name.value.trim()) { showError(name, "Name is required"); isValid = false; }
      else if (!nameRegex.test(name.value)) { showError(name, "Please enter a valid name"); isValid = false; }

      // --- Email ---
      const email = document.getElementById("resEmail");
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!email.value.trim()) { showError(email, "Email is required"); isValid = false; }
      else if (!emailRegex.test(email.value)) { showError(email, "Please enter a valid email"); isValid = false; }

      // --- Phone ---
      const phone = document.getElementById("phone");
      const phoneRegex = /^7\d{10}$/;
      if (!phone.value.trim()) { showError(phone, "Phone number is required"); isValid = false; }
      else if (!phoneRegex.test(phone.value)) { showError(phone, "Enter valid 11-digit number starting with 7"); isValid = false; }

      // --- Date ---
      const date = document.getElementById("date");
      const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
      if (!date.value.trim()) { showError(date, "Date required"); isValid = false; }
      else if (!dateRegex.test(date.value)) { showError(date, "Format DD.MM.YYYY"); isValid = false; }
      else {
        const [day, month, year] = date.value.split(".").map(Number);
        const daysInMonth = new Date(year, month, 0).getDate();
        if (month < 1 || month > 12 || day < 1 || day > daysInMonth) {
          showError(date, `Enter valid day/month`); isValid = false;
        }
      }

      // --- Time ---
      const time = document.getElementById("time");
      const timeRegex = /^[0-2][0-9]:[0-5][0-9]$/;
      if (!time.value.trim()) { showError(time, "Time required"); isValid = false; }
      else if (!timeRegex.test(time.value)) { showError(time, "Format HH:MM"); isValid = false; }

      if (!isValid) {
        if (!document.getElementById("formErrorAlert")) {
          const alertBox = document.createElement("div");
          alertBox.id = "formErrorAlert";
          alertBox.textContent = "Please correct the highlighted errors.";
          alertBox.style.color = "red";
          alertBox.style.fontWeight = "bold";
          alertBox.style.marginTop = "10px";
          myForm.appendChild(alertBox);
        }
        return;
      }

      const existingAlert = document.getElementById("formErrorAlert");
      if (existingAlert) existingAlert.remove();
      myForm.classList.add("validated");
      myForm.dispatchEvent(new Event("validatedSubmit", { bubbles: true }));
    });

    function showError(input, message) {
      if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("error")) {
        const error = document.createElement("div");
        error.classList.add("error");
        error.style.color = "red";
        error.textContent = message;
        input.insertAdjacentElement("afterend", error);
      }
    }
  }

  // =======================
  // 7. Change Background Color
  // =======================
  const changeColorBtn = document.getElementById("changeColorBtn");
  if (changeColorBtn) {
    const colors = ["#ffb6c1", "#ffd6a5", "#caffbf", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#ffffc7"];
    changeColorBtn.addEventListener("click", () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = randomColor;
    });
  }

  // =======================
  // 8. Date & Time Display
  // =======================
  const dateTimeDisplay = document.getElementById("dateTimeDisplay");
  if (dateTimeDisplay) {
    function updateDateTime() {
      const now = new Date();
      const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
      dateTimeDisplay.textContent = now.toLocaleString("en-US", options);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
  }
});