(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const volunteerForm = document.getElementById('volunteerForm');
  const contactForm = document.getElementById('contactForm');

  // Sticky header: add class on scroll
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

    // Close menu when clicking a link (anchor)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Volunteer form submit
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Placeholder: in production, send to server
      alert('Thank you for your interest! We will get in touch soon.');
      volunteerForm.reset();
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
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Animate stat numbers (33% and 15%) when PRANV stats come into view
  function animateValue(el, start, end, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 2);
      el.textContent = Math.floor(easeOut * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    }
    window.requestAnimationFrame(step);
  }

  var statAnimateEls = document.querySelectorAll('.stat-animate');
  if (statAnimateEls.length && 'IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (!isNaN(target) && !el.classList.contains('animated')) {
          el.classList.add('animated');
          animateValue(el, 0, target, 1200);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px' });
    statAnimateEls.forEach(function (el) { statObserver.observe(el); });
  } else if (statAnimateEls.length) {
    statAnimateEls.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      if (!isNaN(target)) el.textContent = target;
    });
  }

  // Section reveal on scroll
  var sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }
})();
