/* Everpointe Media — interactions
   - scroll fade-in reveals
   - count-up animated stats
   - sticky header shadow on scroll
*/
(function(){
  'use strict';

  // === Scroll fade-up reveals ===
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.fade-up').forEach(function(el){ el.classList.add('visible'); });
  }

  // === Count-up animation for stats ===
  function animateCount(el){
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = parseInt(el.dataset.duration, 10) || 1400;
    var start = performance.now();
    function tick(now){
      var p = Math.min((now - start) / duration, 1);
      // ease-out
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      // integer if target is int, 1 decimal otherwise
      var formatted = (target % 1 === 0) ? Math.round(val).toLocaleString() : val.toFixed(1);
      el.textContent = prefix + formatted + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.count-up').forEach(function(el){ co.observe(el); });
  }

  // === Sticky header shadow on scroll ===
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function(){
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

})();
