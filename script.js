(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const contactForm = document.getElementById('contactForm');

  // Sticky header
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Contact form submit
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message. We will respond shortly.');
      contactForm.reset();
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Animate stat numbers
  function animateValue(el, start, end, duration) {
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      el.textContent = Math.floor(easeOut * (end - start) + start);
      if (progress < 1) window.requestAnimationFrame(step);
      else el.textContent = end;
    }
    window.requestAnimationFrame(step);
  }

  const statEls = document.querySelectorAll('.stat-animate');
  if (statEls.length && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (!isNaN(target) && !el.classList.contains('animated')) {
          el.classList.add('animated');
          animateValue(el, 0, target, 1200);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px' });

    statEls.forEach((el) => statObserver.observe(el));
  } else {
    statEls.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (!isNaN(target)) el.textContent = target;
    });
  }

  // Section reveal
  const sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    sections.forEach((s) => sectionObserver.observe(s));
  }
})();
