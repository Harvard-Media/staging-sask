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
