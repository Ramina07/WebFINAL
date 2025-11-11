document.addEventListener("DOMContentLoaded", () => {
  const siteBlocker = document.getElementById("siteBlocker");
  const authForm = document.getElementById("siteAuthForm");
  const errorBox = document.getElementById("errorBox");
  const toggleAuth = document.getElementById("toggleAuth");
  const authTitle = document.getElementById("authTitle");
  const authSubmitBtn = document.getElementById("authSubmitBtn");

  const userProfile = document.getElementById("userProfile");
  const userNameDisplay = document.getElementById("userName");
  const logoutBtn = document.getElementById("logoutBtn");

  // Проверка, есть ли сохраненный пользователь
  const savedUser = JSON.parse(localStorage.getItem("userData"));
  if(savedUser && savedUser.loggedIn) {
    siteBlocker.style.display = "none";
    showUserProfile(savedUser.name);
  }

  let isLogin = false; // переключение между Sign Up / Log In

  toggleAuth.addEventListener("click", () => {
    isLogin = !isLogin;
    if(isLogin) {
      authTitle.textContent = "Log In";
      authSubmitBtn.textContent = "Log In";
      toggleAuth.textContent = "Sign Up";
    } else {
      authTitle.textContent = "Sign Up";
      authSubmitBtn.textContent = "Sign Up";
      toggleAuth.textContent = "Log In";
    }
    errorBox.textContent = "";
  });

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("authName").value.trim();
    const email = document.getElementById("authEmail").value.trim();
    const password = document.getElementById("authPassword").value.trim();

    if(name === "" || email === "" || password === "") {
      errorBox.textContent = "All fields are required!";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)) {
      errorBox.textContent = "Invalid email address!";
      return;
    }

    if(isLogin) {
      // Логика входа
      const stored = JSON.parse(localStorage.getItem("userData"));
      if(stored && stored.email === email && stored.password === password) {
        stored.loggedIn = true;
        localStorage.setItem("userData", JSON.stringify(stored));
        siteBlocker.style.display = "none";
        showUserProfile(stored.name);
      } else {
        errorBox.textContent = "Invalid email or password!";
      }
    } else {
      // Логика регистрации
      const userData = { name, email, password, loggedIn: true };
      localStorage.setItem("userData", JSON.stringify(userData));
      siteBlocker.style.display = "none";
      showUserProfile(name);
    }
  });

  logoutBtn.addEventListener("click", () => {
    const stored = JSON.parse(localStorage.getItem("userData"));
    if(stored) {
      stored.loggedIn = false;
      localStorage.setItem("userData", JSON.stringify(stored));
    }
    userProfile.style.display = "none";
    siteBlocker.style.display = "flex";
    authForm.reset();
    errorBox.textContent = "";
    isLogin = false;
    authTitle.textContent = "Sign Up";
    authSubmitBtn.textContent = "Sign Up";
    toggleAuth.textContent = "Log In";
  });

  function showUserProfile(name) {
  userProfile.style.display = "flex"; // теперь flex для иконки и текста
  userNameDisplay.textContent = name;
}

});