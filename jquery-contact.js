$(document).ready(function(){
  console.log("jQuery is ready on contact.html!");
  let countersAnimated = false;
  //task5
  function animateCounters() {
    $('.counter').each(function() {
      const $this = $(this);
      const target = +$this.data('target');
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / target));

      let count = 0;
      const counterInterval = setInterval(() => {
        count++;
        $this.text(count);
        if (count >= target) {
          clearInterval(counterInterval);
          $this.text(target >= 1000 ? target + '+' : target);
        }
      }, stepTime);
    });
  }

  $(window).on('scroll', function() {
    const statsTop = $('.restaurant-stats').offset().top;
    const scrollBottom = $(window).scrollTop() + $(window).height();

    if (!countersAnimated && scrollBottom > statsTop + 50) { 
      animateCounters();
      countersAnimated = true; // чтобы анимация не повторялась
    }
  });
  //task6
  $('#myForm').on('validatedSubmit', function() {
  const $form = $(this);
  const $btn = $form.find('button');
  const $success = $('#successMessage');

  if ($btn.prop('disabled')) return;

  $btn.html('<span class="spinner"></span> Please wait...');
  $btn.prop('disabled', true);
  $success.hide();

  setTimeout(() => {
    $btn.html('Submit');
    $btn.prop('disabled', false);
    $success.fadeIn();
    $form[0].reset();
  }, 2000);
});
  //task7
  // Функция показа уведомления
function showNotification(message, duration = 3000) {
  const $notification = $('<div class="notification"></div>').text(message);
  $('#notification-container').append($notification);

  setTimeout(() => {
    $notification.addClass('show');
  }, 10);

  setTimeout(() => {
    $notification.removeClass('show');
    setTimeout(() => $notification.remove(), 500);
  }, duration);
}

// Обработчик формы popup
$(document).ready(function() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault(); 

    const $btn = $(this).find('button.submit-btn');

    if ($btn.prop('disabled')) return;

    // Показывает спиннер на кнопке
    $btn.html('<span class="spinner"></span> Sending...');
    $btn.prop('disabled', true);

    //  2 секунды
    setTimeout(() => {
      $btn.html('Send Message');
      $btn.prop('disabled', false);

      // Показ уведомления
      showNotification("Message sent successfully!");

      // Закрываем popup
      $('#popupForm').fadeOut();
    }, 2000);
  });

  // Закрытие popup кнопкой "×"
  $('#closePopupBtn').on('click', function() {
    $('#popupForm').fadeOut();
  });

  // Открытие popup
  $('#openPopupBtn').on('click', function() {
    $('#popupForm').fadeIn();
  });
});
  //task8
  function showNotification(message, duration = 2000) {
    const $notification = $('<div class="notification"></div>').text(message);
    $('body').append($notification);
    $notification.css({
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#e91e63',
      color: '#fff',
      padding: '10px 20px',
      'border-radius': '8px',
      'box-shadow': '0 4px 12px rgba(0,0,0,0.2)',
      opacity: 0,
      transform: 'translateY(-20px)',
      'z-index': 10000,
      'font-weight': 'bold'
    });

    setTimeout(() => $notification.css({opacity: 1, transform: 'translateY(0)'}), 10);
    setTimeout(() => {
      $notification.css({opacity: 0, transform: 'translateY(-20px)'});
      setTimeout(() => $notification.remove(), 500);
    }, duration);
  }

  $('.copy-btn').on('click', function() {
    const text = $(this).data('clipboard-text');
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Copied to clipboard!');
      const $btn = $(this);
      const originalText = $btn.text();
      $btn.text('✓');
      $btn.prop('disabled', true);
      setTimeout(() => {
        $btn.text(originalText);
        $btn.prop('disabled', false);
      }, 1500);
    });
  });

});
