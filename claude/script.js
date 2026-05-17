/* ===========================
   CHILDRENSMART — script.js
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. HAMBURGER / MOBILE NAV TOGGLE
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // On mobile, toggle sub-dropdowns on click instead of hover
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        // Close siblings
        navItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      }
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      navItems.forEach(item => item.classList.remove('open'));
    }
  });


  // ============================================================
  // 2. SMOOTH SCROLL + ACTIVE SIDEBAR LINK
  // ============================================================
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        const navH = document.querySelector('.navbar').offsetHeight;
        const top  = targetEl.getBoundingClientRect().top + window.scrollY - navH - 16;

        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Highlight sidebar link based on scroll position
  const productRows = document.querySelectorAll('.product-row');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidebarLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-target') === id);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  productRows.forEach(row => observer.observe(row));


  // ============================================================
  // 3. ADD TO CART — Toast Notification
  // ============================================================
  const cartButtons = document.querySelectorAll('.btn-cart');
  const toast       = document.getElementById('toast');
  let toastTimeout;

  cartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Button animation
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Added!';
      btn.style.background = '#2d6a4f';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
      }, 1500);

      // Show toast
      clearTimeout(toastTimeout);
      toast.classList.add('show');
      toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
    });
  });


  // ============================================================
  // 4. SEARCH BAR — Live Filter (Optional Enhancement)
  // ============================================================
  const searchInput = document.querySelector('.search-bar input');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      // Show all cards
      document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = '';
      });
      return;
    }

    document.querySelectorAll('.product-card').forEach(card => {
      const name = card.querySelector('.card-name')?.textContent.toLowerCase() || '';
      card.style.display = name.includes(query) ? '' : 'none';
    });
  });

  // Clear search on Escape
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      document.querySelectorAll('.product-card').forEach(card => card.style.display = '');
    }
  });


  // ============================================================
  // 5. NEWSLETTER FORM
  // ============================================================
  const newsletterBtn = document.querySelector('.newsletter-form button');
  const newsletterInput = document.querySelector('.newsletter-form input');

  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
      const email = newsletterInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        newsletterInput.style.borderBottom = '2px solid #ff6b6b';
        newsletterInput.placeholder = 'Please enter a valid email!';
        return;
      }

      newsletterBtn.innerHTML = '<i class="fas fa-check"></i>';
      newsletterBtn.style.background = '#4ade80';
      newsletterInput.value = '';
      newsletterInput.placeholder = 'Thank you for subscribing!';
      newsletterInput.style.borderBottom = '';

      setTimeout(() => {
        newsletterBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        newsletterBtn.style.background = '';
        newsletterInput.placeholder = 'Your email address';
      }, 3000);
    });
  }


  // ============================================================
  // 6. PRODUCT CARD — Entrance Animation on Scroll
  // ============================================================
  const cards = document.querySelectorAll('.product-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${(i % 5) * 0.08}s`;
        entry.target.classList.add('card-visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Inject animation styles dynamically
  const cardAnimStyle = document.createElement('style');
  cardAnimStyle.textContent = `
    .product-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.25s, transform 0.25s;
    }
    .product-card.card-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .product-card.card-visible:hover {
      transform: translateY(-6px);
    }
  `;
  document.head.appendChild(cardAnimStyle);

  cards.forEach(card => cardObserver.observe(card));


  // ============================================================
  // 7. STICKY NAVBAR SHADOW ON SCROLL
  // ============================================================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)';
    } else {
      navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.18)';
    }
  }, { passive: true });

});