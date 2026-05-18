// ─── NAV SCROLL + ACTIVE SECTION SPY ───
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const updateNav = () => {
  const scrollY = window.scrollY;

  // Scrolled class
  navbar.classList.toggle('scrolled', scrollY > 40);

  // Active section highlight
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close on nav link click
navLinksEl?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ─── INTERSECTION OBSERVER FOR REVEAL ───
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.timeline-item, .project-card, .skills-group, .cert-card, .edu-card, .section-header, .about-photo-col, .about-content, .hobbies-wrap, .contact-intro, .contact-form'
).forEach(el => revealObserver.observe(el));

// Staggered delays for grids
document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.skills-layout .skills-group').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.certs-grid .cert-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.05}s`;
});

document.querySelectorAll('.edu-grid .edu-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── CONTACT FORM (mailto fallback) ───
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const mailtoLink = `mailto:pnkishore99@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Hi Naga Kishore,\n\nMy name is ${name} (${email}).\n\n${message}`)}`;
  window.location.href = mailtoLink;
});

// ─── TYPED SUBTITLE (simple, no library) ───
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const phrases = [
    'MBA | Strategy & Consulting',
    'Business Analyst & Consultant',
    'PwC Alumnus | Cipla Intern',
    'Tech Enthusiast & Leader'
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  const type = () => {
    const current = phrases[phraseIdx];
    if (deleting) {
      typedEl.textContent = current.slice(0, --charIdx);
    } else {
      typedEl.textContent = current.slice(0, ++charIdx);
    }

    let delay = deleting ? 40 : 80;

    if (!deleting && charIdx === current.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  setTimeout(type, 1800);
}

// ─── CURSOR GLOW (desktop only) ───
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ─── YEAR IN FOOTER ───
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── INIT LUCIDE ICONS ───
lucide.createIcons();

// ─── HOBBIES CAROUSEL ───
const carouselCards = document.querySelectorAll('.hobbies-gallery-carousel .gallery-card');
const prevBtn = document.querySelector('.carousel-btn.prev-btn');
const nextBtn = document.querySelector('.carousel-btn.next-btn');
const indicators = document.querySelectorAll('.carousel-indicators .indicator');

if (carouselCards.length > 0) {
  let currentIndex = 0;

  function updateCarousel(index) {
    if (index < 0) index = carouselCards.length - 1;
    if (index >= carouselCards.length) index = 0;

    currentIndex = index;

    carouselCards.forEach((card, i) => {
      card.classList.remove('active', 'next', 'next-2', 'prev');

      const len = carouselCards.length;
      if (i === currentIndex) {
        card.classList.add('active');
      } else if (i === (currentIndex + 1) % len) {
        card.classList.add('next');
      } else if (i === (currentIndex + 2) % len) {
        card.classList.add('next-2');
      } else if (i === (currentIndex - 1 + len) % len) {
        card.classList.add('prev');
      }
    });

    indicators.forEach((ind, i) => {
      if (i === currentIndex) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
  }

  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => updateCarousel(i));
  });

  // Initialize
  updateCarousel(0);

  // Touch support for carousel
  let touchStartX = 0;
  let touchEndX = 0;

  const carouselContainer = document.querySelector('.carousel-container');

  if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) updateCarousel(currentIndex + 1);
      if (touchEndX > touchStartX + 50) updateCarousel(currentIndex - 1);
    }, { passive: true });
  }
}

// ─── THEME TOGGLE ───
const themeToggle = document.getElementById('theme-toggle');

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const setTheme = (theme) => {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
};

// Initialize theme on load
setTheme(getPreferredTheme());

themeToggle?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

// ─── DYNAMIC WORK EXPERIENCE ───
const workexNumberEl = document.getElementById('workex-number');
if (workexNumberEl) {
  // Baseline: 2.8 years (32 months) as of May 2026 (current time in environment)
  // If you are deploying this and your current real-world date is different, 
  // you can change baseYear and baseMonth to the month you had exactly 2.8 years of experience.
  const baseYear = 2026;
  const baseMonth = 4; // May (0-indexed)
  const baseTotalMonths = 32; // 2 years and 8 months
  
  const currentDate = new Date();
  
  let monthDiff = (currentDate.getFullYear() - baseYear) * 12 + (currentDate.getMonth() - baseMonth);
  
  // Prevent going backwards if testing in the past
  if (monthDiff < 0) monthDiff = 0;
  
  const totalMonths = baseTotalMonths + monthDiff;
  
  // Calculate years and remaining months
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  
  workexNumberEl.textContent = remainingMonths === 0 ? `${years}` : `${years}.${remainingMonths}`;
}

// ─── DYNAMIC AGE ───
const ageNumberEl = document.getElementById('age-number');
if (ageNumberEl) {
  // DOB: 10/11/1999 (November 10, 1999)
  const dob = new Date(1999, 10, 10);
  const currentDate = new Date();
  
  let monthDiff = (currentDate.getFullYear() - dob.getFullYear()) * 12 + (currentDate.getMonth() - dob.getMonth());
  
  // Adjust if the current day of the month is before the birth day
  if (currentDate.getDate() < dob.getDate()) {
    monthDiff--;
  }
  
  const years = Math.floor(monthDiff / 12);
  const remainingMonths = monthDiff % 12;
  
  ageNumberEl.textContent = remainingMonths === 0 ? `${years}` : `${years}.${remainingMonths}`;
}

// ─── EXPERIENCE MODAL ───
const experienceModal = document.getElementById('experience-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalContentArea = document.getElementById('modal-content-area');
const timelineCards = document.querySelectorAll('.timeline-card:not(.leadership-card)');

if (experienceModal && timelineCards.length > 0) {
  timelineCards.forEach(card => {
    card.addEventListener('click', () => {
      // Clear previous content
      modalContentArea.innerHTML = '';
      
      // Clone children of the clicked card (except click hint)
      Array.from(card.children).forEach(child => {
        if (!child.classList.contains('click-hint')) {
          modalContentArea.appendChild(child.cloneNode(true));
        }
      });
      
      // Re-initialize lucide icons for the cloned content
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ root: modalContentArea });
      }
      
      experienceModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });
  
  const closeModal = () => {
    experienceModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  };
  
  modalCloseBtn?.addEventListener('click', closeModal);
  
  // Close when clicking outside the modal container
  experienceModal.addEventListener('click', (e) => {
    if (e.target === experienceModal) {
      closeModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && experienceModal.classList.contains('active')) {
      closeModal();
    }
  });
}
