document.addEventListener('DOMContentLoaded', function () {

  // 1. STICKY NAV
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // 2. MOBILE MENU
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      mobileMenu.classList.add('open');
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 3. SCROLL ANIMATIONS
  const animElements = document.querySelectorAll('.animate-in');
  if (animElements.length) {
    // Immediately reveal any elements already in the viewport — no async delay
    animElements.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom >= 0) {
        el.classList.add('visible');
      }
    });
    // Use IntersectionObserver to reveal the rest as they scroll into view
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0 });
      animElements.forEach(function (el) {
        if (!el.classList.contains('visible')) { observer.observe(el); }
      });
    }
  }

  // 4. NETLIFY FORM HANDLER
  document.querySelectorAll('form[netlify]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new URLSearchParams(new FormData(form));
      fetch('/', { method: 'POST', body: data })
        .then(function () {
          form.style.display = 'none';
          const success = form.nextElementSibling;
          if (success && success.classList.contains('form-success')) {
            success.style.display = 'block';
          }
        })
        .catch(function () {
          alert('Sorry, there was an error. Please call us on 07766 314197.');
        });
    });
  });

  // 5. ACTIVE NAV LINK
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });

  // 6. SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
