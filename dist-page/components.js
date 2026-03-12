/* === popup === */
(function () {
  function openPopup(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('active');
  }
  function closePopup(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('active');
  }
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('cms-popup-overlay')) {
      e.target.classList.remove('active');
    }
    if (e.target.classList.contains('cms-popup-close')) {
      e.target.closest('.cms-popup-overlay').classList.remove('active');
    }
    if (e.target.dataset.popupTarget) {
      openPopup(e.target.dataset.popupTarget);
    }
  });
  window.CmsPopup = { open: openPopup, close: closePopup };
})();


/* === accordion === */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cms-accordion').forEach(function (accordion) {
      accordion.querySelectorAll('.cms-accordion__trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var item = trigger.closest('.cms-accordion__item');
          var isOpen = item.classList.contains('open');

          // Close all items in this accordion
          accordion.querySelectorAll('.cms-accordion__item').forEach(function (i) {
            i.classList.remove('open');
          });

          // Toggle clicked item
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      });
    });
  });
})();


/* === slider === */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cms-slider').forEach(function (slider) {
      var track  = slider.querySelector('.cms-slider__track');
      var slides = slider.querySelectorAll('.cms-slider__slide');
      var dots   = slider.querySelectorAll('.cms-slider__dot');
      var total  = slides.length;
      var current = 0;

      function goTo(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        current = index;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach(function (d, i) {
          d.classList.toggle('active', i === current);
        });
      }

      var prevBtn = slider.querySelector('.cms-slider__btn--prev');
      var nextBtn = slider.querySelector('.cms-slider__btn--next');
      if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { goTo(i); });
      });

      goTo(0);
    });
  });
})();


