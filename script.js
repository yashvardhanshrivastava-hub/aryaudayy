(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const volunteerForm = document.getElementById('volunteerForm');
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('year');

  /* ===============================
     Sticky Header
  =============================== */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===============================
     Mobile Navigation
  =============================== */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');

      // Prevent body scroll when menu is open
      document.body.style.overflow =
        navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===============================
     Volunteer Form
  =============================== */
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your interest! We will get in touch soon.');
      volunteerForm.reset();
    });
  }

  /* ===============================
     Contact Form
  =============================== */
 

  /* ===============================
     Footer Year
  =============================== */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===============================
     Animate Statistics
  =============================== */
  function animateValue(el, start, end, duration) {
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);

      el.textContent = Math.floor(easeOut * (end - start) + start);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    }

    requestAnimationFrame(step);
  }

  const statAnimateEls = document.querySelectorAll('.stat-animate');

  if (statAnimateEls.length && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);

        if (!isNaN(target) && !el.classList.contains('animated')) {
          el.classList.add('animated');
          animateValue(el, 0, target, 1200);
        }
      });
    }, { threshold: 0.3 });

    statAnimateEls.forEach(function (el) {
      statObserver.observe(el);
    });
  } else {
    statAnimateEls.forEach(function (el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (!isNaN(target)) el.textContent = target;
    });
  }

  /* ===============================
     Section Reveal Animation
  =============================== */
  const sections = document.querySelectorAll('.section');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

})();
