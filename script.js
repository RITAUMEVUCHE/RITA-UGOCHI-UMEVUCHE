/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  /* ===== HAMBURGER MENU ===== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ===== ACTIVE SECTION HIGHLIGHT ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  /* ===== THEME TOGGLE ===== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });

  /* ===== TYPING ANIMATION ===== */
  const typingText = document.querySelector('.typing-text');
  const phrases = ['WordPress & Frontend Web Developer ', 'AI Automation Specialist ', 'AI Creative',];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
      }
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }
    }
    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  /* ===== SCROLL REVEAL ===== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ===== SKILLS PROGRESS BARS ===== */
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const parent = bar.closest('.skill-item');
        const progress = parent.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
        bar.classList.add('animated');
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ===== COUNTER ANIMATION ===== */
  const countNums = document.querySelectorAll('.count-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const max = parseInt(target.closest('.stat-card').getAttribute('data-count')) || 0;
        let current = 0;
        const increment = Math.ceil(max / 40);
        const interval = setInterval(() => {
          current += increment;
          if (current >= max) {
            current = max;
            clearInterval(interval);
          }
          target.textContent = current;
        }, 50);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  countNums.forEach(num => counterObserver.observe(num));
  
  /* =========================================
   PORTFOLIO TAB FILTER
   Filters projects based on their category
   ========================================= */

const portfolioTabs =
  document.querySelectorAll('.portfolio-tab');

const projectCards =
  document.querySelectorAll('.project-card');


portfolioTabs.forEach(tab => {

  tab.addEventListener('click', () => {

    // Get the category selected by the user
    const filter =
      tab.getAttribute('data-filter');


    // Remove active state from all tabs
    portfolioTabs.forEach(item => {

      item.classList.remove('active');

    });


    // Add active state to clicked tab
    tab.classList.add('active');


    // Filter project cards
    projectCards.forEach(card => {

      const category =
        card.getAttribute('data-category');


      // Show all projects
      if (filter === 'all') {

        card.classList.remove('hidden');

      }

      // Show only matching category
      else if (category === filter) {

        card.classList.remove('hidden');

      }

      // Hide projects that don't match
      else {

        card.classList.add('hidden');

      }

    });

  });

});

   

  /* ===== PARTICLES CANVAS ===== */
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let particleCount;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 80);
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - p.x;
        const dy = particles[j].y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  drawParticles();

  window.addEventListener('resize', resizeCanvas);

  /* ===== CUSTOM CURSOR ===== */
  const cursor = document.getElementById('cursor');
  const cursorBlur = document.getElementById('cursor-blur');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursorBlur.style.transform = `translate(${cursorX - 30}px, ${cursorY - 30}px)`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll('a, button, .service-card, .project-card, .stat-card, .edu-card, .timeline-content').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.backgroundColor = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.backgroundColor = 'var(--cyan)';
    });
  });

  /* ===== CARD TILT EFFECT ===== */
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ===== SCROLL TO TOP ===== */
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== SECTION TITLE ANIMATION ===== */
  const sectionTitles = document.querySelectorAll('.section-title');

  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  sectionTitles.forEach(title => titleObserver.observe(title));

});
