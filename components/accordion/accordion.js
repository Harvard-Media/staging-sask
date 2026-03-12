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
