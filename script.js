// ========================================
// PARTICLES
// ========================================
function createParticles() {
  const container = document.getElementById('heroParticles');
  const count = window.innerWidth < 768 ? 90 : 120;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 2.5 + 0.5;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 10;

    var color, glow;
    var roll = Math.random();
    if (roll < 0.65) {
      color = 'rgba(255, 255, 255, 0.85)';
      glow = 'rgba(255, 255, 255, 0.35)';
    } else if (roll < 0.82) {
      color = 'rgba(200, 220, 255, 0.80)';
      glow = 'rgba(180, 200, 255, 0.25)';
    } else if (roll < 0.94) {
      color = 'rgba(255, 240, 210, 0.78)';
      glow = 'rgba(255, 220, 180, 0.22)';
    } else {
      color = 'rgba(255, 200, 180, 0.75)';
      glow = 'rgba(255, 180, 150, 0.20)';
    }

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      box-shadow: 0 0 ${size * 2.5}px ${glow};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
  }
}

// ========================================
// COMETS (shooting stars)
// ========================================
const cometTypes = [
  { anim: 'comet-fly-br', startPos: () => ({ x: Math.random() * 60 + 35, y: Math.random() * 25 }) },
  { anim: 'comet-fly-bl', startPos: () => ({ x: Math.random() * 30, y: Math.random() * 25 }) },
  { anim: 'comet-fly-r', startPos: () => ({ x: 85 + Math.random() * 10, y: Math.random() * 60 + 20 }) },
  { anim: 'comet-fly-d', startPos: () => ({ x: Math.random() * 80 + 10, y: Math.random() * 15 }) }
];

function spawnComet() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const type = cometTypes[Math.floor(Math.random() * cometTypes.length)];
  const wrapper = document.createElement('div');
  wrapper.classList.add('comet-wrapper', type.anim);

  const comet = document.createElement('div');
  comet.classList.add('comet');

  const pos = type.startPos();
  const duration = Math.random() * 0.8 + 1.8;

  wrapper.style.left = pos.x + '%';
  wrapper.style.top = pos.y + '%';
  wrapper.style.animation = `${type.anim} ${duration}s ease-out forwards`;

  wrapper.appendChild(comet);
  container.appendChild(wrapper);

  setTimeout(() => wrapper.remove(), duration * 1000 + 100);
}

function initComets() {
  const nextSpawn = () => Math.random() * 4000 + 2500;

  const loop = () => {
    spawnComet();
    setTimeout(loop, nextSpawn());
  };

  setTimeout(loop, 800);
}

// ========================================
// CURSOR GLOW (desktop only)
// ========================================
function initCursorGlow() {
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.getElementById('cursorGlow');
    const hero = document.getElementById('hero');
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (hero) {
        hero.style.setProperty('--spotlight-x', mouseX + 'px');
        hero.style.setProperty('--spotlight-y', mouseY + 'px');
      }
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
// BACK TO TOP
// ========================================
function updateBackToTopVisibility() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 450);
}

function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
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

function throttle(func, limit) {
  var inThrottle;
  return function () {
    var args = arguments;
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(function () {
        inThrottle = false;
      }, limit);
    }
  };
}

function initArchConnections(gridId, svgId, connections) {
  var grid = document.getElementById(gridId);
  var svg = document.getElementById(svgId);
  if (!grid || !svg) return;

  function updateConnections() {
    var svgRect = svg.getBoundingClientRect();
    var w = Math.max(1, svgRect.width);
    var h = Math.max(1, svgRect.height);
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

    connections.forEach(function (conn) {
      var fromEl = grid.querySelector(conn.from);
      var toEl = grid.querySelector(conn.to);
      var pathEl = svg.querySelector(conn.path);
      if (!fromEl || !toEl || !pathEl) return;

      var fromRect = fromEl.getBoundingClientRect();
      var toRect = toEl.getBoundingClientRect();

      var fromSide = conn.fromSide || 'right';
      var toSide = conn.toSide || 'left';

      var x1 =
        (fromSide === 'left' ? fromRect.left : fromRect.right) - svgRect.left;
      var y1 = fromRect.top + fromRect.height / 2 - svgRect.top;
      var x2 = (toSide === 'right' ? toRect.right : toRect.left) - svgRect.left;
      var y2 = toRect.top + toRect.height / 2 - svgRect.top;

      var cp1x = x1 + (x2 - x1) * 0.5;
      var cp1y = y1 + conn.curve * 60;
      var cp2x = x2 - (x2 - x1) * 0.5;
      var cp2y = y2 + conn.curve * 60;

      pathEl.setAttribute(
        'd',
        'M ' + x1 + ' ' + y1 + ' C ' + cp1x + ' ' + cp1y + ', ' + cp2x + ' ' + cp2y + ', ' + x2 + ' ' + y2
      );
    });
  }

  updateConnections();
  requestAnimationFrame(updateConnections);
  setTimeout(updateConnections, 50);

  var onChange = throttle(updateConnections, 100);
  window.addEventListener('resize', onChange);
  setTimeout(updateConnections, 500);
}

function initWhenVisible(element, initFn) {
  if (!element || typeof initFn !== 'function') return;

  if (!('IntersectionObserver' in window)) {
    initFn();
    return;
  }

  var didInit = false;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!didInit && entry.isIntersecting) {
          didInit = true;
          initFn();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(element);
}

function initAutoplayVideosWhenVisible() {
  var videos = document.querySelectorAll('video[autoplay]');
  if (!videos.length) return;

  if (!('IntersectionObserver' in window)) {
    videos.forEach(function (video) {
      if (video.paused) {
        video.play().catch(function () {});
      }
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play().catch(function () {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  videos.forEach(function (video) {
    observer.observe(video);
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
      updateBackToTopVisibility();
      ticking = false;
    });
    ticking = true;
  }
});

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    createParticles();
    initComets();
    initCursorGlow();
    initCarousel();
  }
  initRevealAnimations();
  initSkillBars();
  initMobileMenu();
  initSmoothScroll();
  if (!reduceMotion) {
    initCardTilt();
  }

  initAutoplayVideosWhenVisible();

  initWhenVisible(document.getElementById('ppeGrid'), function () {
    initArchConnections('ppeGrid', 'archConnections', [
      { from: '.ppe-mobile', to: '.ppe-core', path: '#path-mc', curve: 0.15 },
      { from: '.ppe-web', to: '.ppe-core', path: '#path-wc', curve: -0.35 },
      { from: '.ppe-core', to: '.ppe-face', path: '#path-mf', curve: 0.1 },
      { from: '.ppe-face', to: '.ppe-vector', path: '#path-fv', curve: 0.12 }
    ]);
  });

  initWhenVisible(document.getElementById('riskGrid'), function () {
    initArchConnections('riskGrid', 'riskConnections', [
      { from: '.risk-mobile', to: '.risk-core', path: '#path-r-mc', curve: -0.12 },
      { from: '.risk-mobile', to: '.risk-ai', path: '#path-r-ma', curve: 0.12 },
      { from: '.risk-ai', to: '.risk-mcp', path: '#path-r-im', curve: 0.05, toSide: 'left' },
      { from: '.risk-mcp', to: '.risk-core', path: '#path-r-am', curve: -2.65, fromSide: 'left' }
    ]);
  });
  initHeroReveal();
  initBackToTop();
  updateNavState();
  updateScrollProgress();
  updateBackToTopVisibility();
});
