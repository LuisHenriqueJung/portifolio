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

  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
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

// ========================================
// MOBILE STICKY CTA (hidden on hero and contact)
// ========================================
function updateStickyCta() {
  var cta = document.getElementById('stickyCta');
  var contact = document.getElementById('contact');
  if (!cta || !contact) return;
  var pastHero = window.scrollY > window.innerHeight * 0.7;
  var beforeContact = contact.getBoundingClientRect().top > window.innerHeight * 0.85;
  cta.classList.toggle('visible', pastHero && beforeContact);
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

  function setOpen(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () {
    setOpen(!mobileMenu.classList.contains('open'));
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setOpen(false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
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
// CARD SPOTLIGHT (desktop only)
// ========================================
function initCardSpotlight() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll('.spotlight').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', e.clientX - rect.left + 'px');
      card.style.setProperty('--my', e.clientY - rect.top + 'px');
    });
  });
}

// ========================================
// COPY EMAIL
// ========================================
function initCopyEmail() {
  var btn = document.getElementById('copyEmail');
  var label = document.getElementById('copyEmailLabel');
  if (!btn || !label) return;

  btn.addEventListener('click', function () {
    var email = btn.getAttribute('data-email');
    var done = function () {
      btn.classList.add('copied');
      label.textContent = 'Copied!';
      setTimeout(function () {
        btn.classList.remove('copied');
        label.textContent = 'Copy';
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, function () {
        window.location.href = 'mailto:' + email;
      });
    } else {
      window.location.href = 'mailto:' + email;
    }
  });
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
  var videos = document.querySelectorAll('video[data-autoplay]');
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
      updateStickyCta();
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
    initCarousel();
  }
  initRevealAnimations();
  initSkillBars();
  initMobileMenu();
  initSmoothScroll();
  initCardSpotlight();
  initCopyEmail();

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
  updateStickyCta();
});
