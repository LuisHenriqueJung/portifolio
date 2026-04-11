// ========================================
// PARTICLES
// ========================================
function createParticles() {
  const container = document.getElementById('heroParticles');
  const count = window.innerWidth < 768 ? 25 : 50;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    const hue = Math.random() > 0.5 ? 187 : 270;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: hsl(${hue}, 70%, 60%);
      box-shadow: 0 0 ${size * 3}px hsl(${hue}, 70%, 50%);
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
  }
}

// ========================================
// CURSOR GLOW (desktop only)
// ========================================
function initCursorGlow() {
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.getElementById('cursorGlow');
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }
}

// ========================================
// TITLE CAROUSEL
// ========================================
function initCarousel() {
  var items = document.querySelectorAll('.carousel-item');
  var current = 0;

  setInterval(function () {
    items[current].classList.remove('active');
    current = (current + 1) % items.length;
    items[current].classList.add('active');
  }, 2500);
}

// ========================================
// SCROLL PROGRESS
// ========================================
function updateScrollProgress() {
  var scrollTop = window.scrollY;
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById('scrollProgress').style.width = progress + '%';
}

// ========================================
// NAV SCROLL STATE
// ========================================
function updateNavState() {
  var nav = document.getElementById('nav');
  var scrollIndicator = document.getElementById('scrollIndicator');

  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  if (scrollIndicator) {
    scrollIndicator.style.opacity = window.scrollY > 200 ? '0' : '1';
  }
}

// ========================================
// ACTIVE NAV LINK
// ========================================
function updateActiveLink() {
  var sections = document.querySelectorAll('.section');
  var navLinks = document.querySelectorAll('.nav-link');
  var scrollPos = window.scrollY + 200;

  sections.forEach(function (section) {
    var top = section.offsetTop;
    var height = section.offsetHeight;
    var id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === id) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ========================================
// REVEAL ON SCROLL (IntersectionObserver)
// ========================================
function initRevealAnimations() {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document
    .querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
    .forEach(function (el) {
      observer.observe(el);
    });
}

// ========================================
// SKILL BAR ANIMATION
// ========================================
function initSkillBars() {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var orbs = entry.target.querySelectorAll('.skill-orb');
          orbs.forEach(function (orb, i) {
            var level = orb.getAttribute('data-level');
            orb.style.setProperty('--level', level);
            setTimeout(function () {
              orb.classList.add('animated');
            }, i * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.skill-category').forEach(function (cat) {
    observer.observe(cat);
  });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ========================================
// SMOOTH SCROLL FOR NAV LINKS
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        var offset = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--nav-height'
          )
        );
        var top = target.offsetTop - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
}

// ========================================
// TILT EFFECT ON CARDS
// ========================================
function initCardTilt() {
  if (window.matchMedia('(pointer: fine)').matches) {
    var cards = document.querySelectorAll(
      '.project-card, .exp-card, .contact-card'
    );

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -4;
        var rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform =
          'perspective(800px) rotateX(' +
          rotateX +
          'deg) rotateY(' +
          rotateY +
          'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }
}

// ========================================
// HERO TEXT ANIMATION ON LOAD
// ========================================
function initHeroReveal() {
  var heroElements = document.querySelectorAll('.hero .reveal-up');
  heroElements.forEach(function (el) {
    var delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0;
    setTimeout(function () {
      el.classList.add('visible');
    }, delay * 1000 + 300);
  });
}

// ========================================
// EXTRA DATA DOTS (more balls per connection)
// ========================================
function initDataDots() {
  var arrows = document.querySelectorAll('.arch-arrow, .arch-arrow-h');

  arrows.forEach(function (arrow, idx) {
    for (var i = 0; i < 2; i++) {
      // Extra cyan dot (send)
      var dotSend = document.createElement('span');
      dotSend.className = 'data-dot data-dot-send';
      dotSend.style.animationDelay = (idx * 0.15 + i * 0.6 + 0.3) + 's';
      arrow.appendChild(dotSend);

      // Extra purple dot (return)
      var dotReturn = document.createElement('span');
      dotReturn.className = 'data-dot data-dot-return';
      dotReturn.style.animationDelay = (idx * 0.15 + i * 0.6 + 0.9) + 's';
      arrow.appendChild(dotReturn);
    }
  });

  // Vertical connector dots
  var connectors = document.querySelectorAll('.arch-connector-up');
  connectors.forEach(function (conn) {
    var dotUp = document.createElement('span');
    dotUp.className = 'data-dot-v data-dot-v-up';
    dotUp.style.animationDelay = '0.9s';
    conn.appendChild(dotUp);

    var dotDown = document.createElement('span');
    dotDown.className = 'data-dot-v data-dot-v-down';
    dotDown.style.animationDelay = '0.3s';
    conn.appendChild(dotDown);
  });
}

// ========================================
// SCROLL EVENT (throttled)
// ========================================
var ticking = false;

window.addEventListener('scroll', function () {
  if (!ticking) {
    requestAnimationFrame(function () {
      updateScrollProgress();
      updateNavState();
      updateActiveLink();
      ticking = false;
    });
    ticking = true;
  }
});

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  createParticles();
  initCursorGlow();
  initCarousel();
  initRevealAnimations();
  initSkillBars();
  initMobileMenu();
  initSmoothScroll();
  initCardTilt();
  initDataDots();
  initHeroReveal();
  updateNavState();
  updateScrollProgress();
});
