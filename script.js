(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const volunteerForm = document.getElementById('volunteerForm');
  const contactForm = document.getElementById('contactForm');

  /* ---------------------------
     Sticky Header
  ----------------------------*/
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------
     Mobile Menu
  ----------------------------*/
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
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

  /* ---------------------------
     VOLUNTEER FORM (CONNECTED TO BACKEND)
  ----------------------------*/
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('vname').value;
      const email = document.getElementById('vemail').value;
      const phone = document.getElementById('vphone').value;
      const skill = document.getElementById('vskill').value;
      const message = document.getElementById('vmessage').value;

      try {
        const response = await fetch("http://localhost:5000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            skill,
            message
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Registration Successful!");
          volunteerForm.reset();
        } else {
          alert(data.error || "Registration failed.");
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Server connection failed.");
      }
    });
  }

  /* ---------------------------
     CONTACT FORM (OPTIONAL BACKEND)
  ----------------------------*/
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('cname').value;
      const email = document.getElementById('cemail').value;
      const subject = document.getElementById('csubject').value;
      const message = document.getElementById('cmessage').value;

      try {
        const response = await fetch("http://localhost:5000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message
          })
        });

        if (response.ok) {
          alert("Message Sent Successfully!");
          contactForm.reset();
        } else {
          alert("Message failed to send.");
        }

      } catch (error) {
        console.error(error);
        alert("Server connection failed.");
      }
    });
  }

  /* ---------------------------
     Footer Year
  ----------------------------*/
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
