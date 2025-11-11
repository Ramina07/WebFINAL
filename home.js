document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
     Task 1: FORM VALIDATION (Subscribe Form)
  =========================== */
  const subscribeForm = document.querySelector("#subscribeForm");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();


      const name = subscribeForm.querySelector("#name");
      const email = subscribeForm.querySelector("#email");
      const password = subscribeForm.querySelector("#password");
      const confirm = subscribeForm.querySelector("#confirmPassword");
      const errorBox = subscribeForm.querySelector("#formError");


      let errors = [];


      if (!name.value.trim()) errors.push("Name is required.");
      if (!email.value.trim()) errors.push("Email is required.");
      if (!password.value.trim()) errors.push("Password is required.");
      if (!confirm.value.trim()) errors.push("Please confirm your password.");


      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value && !emailPattern.test(email.value))
        errors.push("Invalid email format.");


      if (password.value && password.value.length < 6)
        errors.push("Password must be at least 6 characters.");


      if (password.value !== confirm.value)
        errors.push("Passwords do not match.");


      if (errors.length > 0) {
        errorBox.innerHTML = errors.join("<br>");
        errorBox.style.display = "block";
      } else {
        errorBox.style.display = "none";
        alert("Form submitted successfully!");
        subscribeForm.reset();
      }
    });
  }


  /* ===========================
     Task 3: POPUP SUBSCRIPTION
  =========================== */
  const popup = document.querySelector(".popup");
  const openBtn = document.querySelector("#openPopup");
  const closeBtn = document.querySelector("#closePopup");


  if (popup && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => {
      popup.style.display = "flex";
    });


    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });


    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.style.display = "none";
    });
  }


  /* ===========================
     Task 4: CHANGE BACKGROUND COLOR
  =========================== */
  const bgButton = document.querySelector("#changeBg");
  const pastelColors = [
    "#FDE2E4", "#FAD2E1", "#E2ECE9",
    "#CFF5E7", "#F6EACB", "#FFF1E6",
    "#EDE7F6"
  ];


  if (bgButton) {
    bgButton.addEventListener("click", () => {
      const randomColor =
        pastelColors[Math.floor(Math.random() * pastelColors.length)];
      document.body.style.transition = "background-color 0.8s ease";
      document.body.style.backgroundColor = randomColor;
      });
  }


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
     Restaurant Fun Facts Dynamic Content
  =========================== */
  const facts = [
    "Our chefs use traditional Japanese techniques for every dish.",
    "We source our ingredients fresh daily from local markets.",
    "Oishiro has been serving authentic Japanese cuisine for over 10 years.",
    "Our ramen broth simmers for 12 hours to achieve the perfect flavor.",
    "We offer a seasonal menu inspired by Japan's culinary traditions."
  ];


  const colors = ["#FDE2E4", "#FAD2E1", "#E2ECE9", "#CFF5E7", "#F6EACB", "#FFF1E6"];
  const textColors = ["#b22222", "#8B0000", "#228B22", "#2F4F4F", "#FF8C00", "#4B0082"];
  const restaurantText = document.querySelector("#restaurantText");
  const infoBtn = document.querySelector("#infoBtn");
  const restaurantSection = document.querySelector("#restaurantInfo");


  if (restaurantText && infoBtn && restaurantSection) {
    infoBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      restaurantText.textContent = facts[randomIndex];


      restaurantSection.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      infoBtn.style.backgroundColor = textColors[Math.floor(Math.random() * textColors.length)];
      restaurantText.style.color = textColors[Math.floor(Math.random() * textColors.length)];
    });
  }


  /* ===========================
     Like system with localStorage
  =========================== */
  const hearts = document.querySelectorAll('.heart');

hearts.forEach((heart, index) => {
  const box = heart.closest('.like-box');
  const count = box.querySelector('.count');
  const storageKey = `like_${index}`;

  // Загружаем сохранённые данные
  const savedLikes = localStorage.getItem(storageKey);
  if (savedLikes) {
    const data = JSON.parse(savedLikes);
    if (data.liked) {
      heart.classList.add('liked');
      heart.textContent = '❤️';
    }
    count.textContent = data.count;
  }

  // При клике
  heart.addEventListener('click', () => {
    const liked = heart.classList.toggle('liked');
    let currentCount = parseInt(count.textContent) || 0; // защита от NaN

    if (liked) {
      heart.textContent = '❤️';
      currentCount++;
    } else {
      heart.textContent = '♡';
      currentCount--;
    }

    count.textContent = currentCount;

    // Сохраняем в localStorage
    localStorage.setItem(storageKey, JSON.stringify({
      liked,
      count: currentCount
    }));
  });
});


  /* ===========================
     Multi-Step Form
  =========================== */
  const multiForm = document.getElementById("multiStepForm");
  if (multiForm) {
    const steps = multiForm.querySelectorAll(".step");
    let currentStep = 0;


    const showStep = (index) => steps.forEach((step, i) => step.style.display = i === index ? "block" : "none");
    showStep(currentStep);


    multiForm.querySelectorAll(".nextBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const inputs = steps[currentStep].querySelectorAll("input, textarea");
        let valid = true;
        inputs.forEach(input => {
          if (!input.value.trim()) {
            valid = false;
            input.style.border = "2px solid red";
          } else input.style.border = "";
        });
        if (valid && currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      });
       });


    multiForm.querySelectorAll(".backBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    });


    multiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(multiForm);
      console.log("Form Data:", Object.fromEntries(formData.entries()));
      alert("Thank you for your feedback!");
      multiForm.reset();
      currentStep = 0;
      showStep(currentStep);
    });
  }

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

// === Animated Counter ===
$(document).ready(function() {
  const counters = $('.count');
  let started = false;

  $(window).on('scroll', function() {
    const offsetTop = $('.stats-section').offset().top - window.innerHeight + 200;
    if (!started && $(window).scrollTop() > offsetTop) {
      started = true;
      counters.each(function() {
        const $this = $(this);
        const target = +$this.attr('data-target');
        $({ countNum: 0 }).animate({ countNum: target }, {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum + '+');
          }
        });
      });
    }
  });
});

/* ===========================
     Task 6: Loading Spinner on Submit
  =========================== */
  $("#subscribeForm").on("submit", function(e) {
  e.preventDefault();

  const $btn = $("#subscribeBtn");
  const originalText = $btn.text();

  // Показываем спинер
  $btn.prop("disabled", true).html('<span class="spinner"></span> Please wait...');

  setTimeout(() => {
    $btn.prop("disabled", false).text(originalText);
    alert("Subscribed successfully!");
    $(this)[0].reset();
  }, 2000);
});

/* ===========================
     Task 7: Toast Notification
  =========================== */
  function showToast(message) {
  const toast = $("#toast");
  toast.text(message).addClass("show");
  setTimeout(() => toast.removeClass("show"), 3000);
}


  /* ===========================
     Task 8: Copy to Clipboard
  =========================== */
$(".copy-btn").on("click", function () {
  const code = $(this).data("code");
  
  navigator.clipboard.writeText(code).then(() => {
    // Изменяем текст кнопки
    $(this).text("✓ Copied").addClass("copied");
    setTimeout(() => $(this).text("Copy").removeClass("copied"), 1500);
ё
    // Показываем тост уведомление
    showToast("Promo code copied!");
  }).catch(() => {
    showToast("Failed to copy promo code.");
  });
});

/* ===========================
     Task 9: Lazy Loading Images
  =========================== */
  function lazyLoad() {
    $(".lazy").each(function() {
      const $img = $(this);
      if ($img.offset().top < $(window).scrollTop() + $(window).height() && !$img.attr("src")) {
        $img.attr("src", $img.data("src")).css({opacity: 0}).animate({opacity: 1}, 500);
      }
    });
  }

  $(window).on("scroll", lazyLoad);
  lazyLoad();







});




        