/**
 * DON BOSCO SCHOOL, KOSAMGHAT, JABALPUR — HOMEPAGE INTERACTIONS
 * 100% Pure Vanilla JavaScript (Zero Dependencies / No jQuery)
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initDataBackgrounds();
    initAdmissionPopup();
    initPhotoGalleryInteractive();
    initStudentLoginPopup();
    initHeaderAndMobileNav();
    initHeroCarousel();
    initEventsSlider();
    initCounters();
    initNoticeFilter();
    initScrollReveal();
    initDynamicNotices();
    initFlipCards();
    initNewNavbar();
    initHeroImageSlider();
    initWhyChooseAccordion();
    initSanskaraFeatures();
  });

  /* 0.0 Student Login Popup Modal (all pages, all screens) */
  function initStudentLoginPopup() {
    var PORTAL_URL = 'https://dbjabalpur.in/login';
    var triggers = document.querySelectorAll('.masthead-login-btn, [data-student-login]');
    if (triggers.length === 0) return;

    var modal = document.createElement('div');
    modal.className = 'slm-backdrop';
    modal.id = 'student-login-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'slm-title');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="slm-box">' +
        '<button type="button" class="slm-close" aria-label="Close login popup"><i class="fa-solid fa-xmark"></i></button>' +
        '<div class="slm-head">' +
          '<div class="slm-icon"><i class="fa-solid fa-user-graduate"></i></div>' +
          '<h2 id="slm-title">Student Login</h2>' +
          '<p>Don Bosco School, Kosamghat, Jabalpur</p>' +
        '</div>' +
        '<form class="slm-form" novalidate>' +
          '<div class="slm-field">' +
            '<label for="slm-user">Admission No. / Username</label>' +
            '<div class="slm-input-wrap"><i class="fa-solid fa-id-card"></i>' +
              '<input type="text" id="slm-user" name="username" autocomplete="username" placeholder="Enter admission no. or username" required>' +
            '</div>' +
          '</div>' +
          '<div class="slm-field">' +
            '<label for="slm-pass">Password</label>' +
            '<div class="slm-input-wrap"><i class="fa-solid fa-lock"></i>' +
              '<input type="password" id="slm-pass" name="password" autocomplete="current-password" placeholder="Enter password" required>' +
              '<button type="button" class="slm-eye" aria-label="Show password"><i class="fa-regular fa-eye"></i></button>' +
            '</div>' +
          '</div>' +
          '<div class="slm-row">' +
            '<label class="slm-check"><input type="checkbox" name="remember"> Remember me</label>' +
            '<a href="tel:8305211667" class="slm-forgot">Forgot password?</a>' +
          '</div>' +
          '<p class="slm-error" role="alert"></p>' +
          '<button type="submit" class="slm-submit"><i class="fa-solid fa-right-to-bracket"></i> Login</button>' +
        '</form>' +
        '<div class="slm-foot">' +
          '<a href="' + PORTAL_URL + '" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open full student portal</a>' +
          '<span>Need help? Call <a href="tel:8305211667">+91-8305211667</a></span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var form = modal.querySelector('.slm-form');
    var userInput = modal.querySelector('#slm-user');
    var passInput = modal.querySelector('#slm-pass');
    var errorEl = modal.querySelector('.slm-error');
    var eyeBtn = modal.querySelector('.slm-eye');
    var lastFocus = null;

    function openModal(e) {
      if (e) e.preventDefault();
      lastFocus = document.activeElement;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('slm-lock');
      errorEl.textContent = '';
      setTimeout(function () { userInput.focus(); }, 120);
    }

    function closeModal() {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('slm-lock');
      passInput.value = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    triggers.forEach(function (t) { t.addEventListener('click', openModal); });
    modal.querySelector('.slm-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });

    eyeBtn.addEventListener('click', function () {
      var show = passInput.type === 'password';
      passInput.type = show ? 'text' : 'password';
      eyeBtn.innerHTML = show ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
      eyeBtn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!userInput.value.trim()) {
        errorEl.textContent = 'Please enter your admission number or username.';
        userInput.focus();
        return;
      }
      if (!passInput.value) {
        errorEl.textContent = 'Please enter your password.';
        passInput.focus();
        return;
      }
      errorEl.textContent = '';
      // Authentication is handled by the official school portal.
      window.open(PORTAL_URL, '_blank', 'noopener');
      closeModal();
    });
  }

  /* 0.1 Full-Area Hero Background Continuous Auto-Sliding Carousel */
  function initHeroImageSlider() {
    var slides = document.querySelectorAll('.hero-bg-slide');
    var dots = document.querySelectorAll('.hero-stage-dot');
    var prevBtn = document.getElementById('hero-prev');
    var nextBtn = document.getElementById('hero-next');
    var captionLabel = document.getElementById('hero-caption-label');
    if (!slides || slides.length === 0) return;

    var captions = [
      'Academic Excellence • Classroom Learning',
      'Modern Science & Computer Lab',
      'Library & Interactive Learning',
      'Student Community & Moral Discipline',
      'Independence Day & Patriotic Fest',
      'Yoga & Holistic Physical Wellness',
      'Tree Plantation & Environmental Stewardship',
      'Campus Life • Kosamghat, Jabalpur'
    ];

    var currentIndex = 0;
    var slideInterval = null;
    var autoPlayDelay = 3500; // Auto-advance every 3.5 seconds

    /* Per-slide image ratio -> CSS var so mobile banner fits every photo with no blur gap */
    var heroWrap = document.querySelector('.hero-stage-media-wrap');
    var heroRatios = [];
    function applyHeroHeight(index) {
      if (!heroWrap) return;
      var r = heroRatios[index] || (16 / 9);
      heroWrap.style.setProperty('--hero-img-h', (heroWrap.clientWidth / r).toFixed(1) + 'px');
    }
    slides.forEach(function (s, i) {
      var m = (s.getAttribute('style') || '').match(/url\(['"]?([^'")]+)['"]?\)/);
      if (!m) return;
      var im = new Image();
      im.onload = function () {
        heroRatios[i] = im.naturalWidth / im.naturalHeight;
        if (i === currentIndex) applyHeroHeight(i);
      };
      im.src = m[1];
    });
    window.addEventListener('resize', function () { applyHeroHeight(currentIndex); });

    function goToSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      currentIndex = index;
      applyHeroHeight(currentIndex);

      for (var i = 0; i < slides.length; i++) {
        if (i === currentIndex) {
          slides[i].classList.add('active');
        } else {
          slides[i].classList.remove('active');
        }
      }

      for (var j = 0; j < dots.length; j++) {
        if (j === currentIndex) {
          dots[j].classList.add('active');
        } else {
          dots[j].classList.remove('active');
        }
      }

      if (captionLabel && captions[currentIndex]) {
        captionLabel.textContent = captions[currentIndex];
      }
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function resetTimer() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, autoPlayDelay);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        resetTimer();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var idx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          goToSlide(idx);
          resetTimer();
        }
      });
    });

    // Start auto slide immediately and keep sliding continuously
    resetTimer();
  }

  /* 0. New Navbar toggle for mobile and responsive navigation */
  function initNewNavbar() {
    var navToggles = document.querySelectorAll('.mobile-nav-toggle, #nav-toggle');
    var navMenu = document.getElementById('nav-menu');
    if (navToggles.length === 0 || !navMenu) return;

    var navItems = navMenu.querySelectorAll('.nav-item');

    function isMobileView() {
      return window.innerWidth <= 991;
    }

    function closeMobileMenu() {
      navMenu.classList.remove('active');
      navToggles.forEach(function (toggle) {
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        toggle.setAttribute('aria-expanded', 'false');
      });
      navItems.forEach(function (item) {
        item.classList.remove('open-mobile');
        var trigger = item.querySelector(':scope > a, :scope > span.nav-label');
        if (trigger) {
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 1. Hamburger button click handlers
    navToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var willOpen = !navMenu.classList.contains('active');
        if (willOpen) {
          navMenu.classList.add('active');
          navToggles.forEach(function (t) {
            t.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            t.setAttribute('aria-expanded', 'true');
          });
        } else {
          closeMobileMenu();
        }
      });
    });

    // 2. Separate dropdown parents from direct top-level links
    navItems.forEach(function (item) {
      var trigger = item.querySelector(':scope > a, :scope > span.nav-label');
      var dropdown = item.querySelector('.dropdown-menu');

      if (dropdown && trigger) {
        // Dropdown parent: toggle accordion on mobile
        trigger.setAttribute('data-has-children', 'true');
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');

        trigger.addEventListener('click', function (e) {
          if (isMobileView()) {
            e.preventDefault();
            e.stopPropagation();

            var isOpen = item.classList.contains('open-mobile');

            // Close all dropdowns
            navItems.forEach(function (other) {
              other.classList.remove('open-mobile');
              var otherTrigger = other.querySelector(':scope > a, :scope > span.nav-label');
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            });

            // If it was not open before, open it now (toggle to open).
            // If it was already open, leaving it removed above closes it!
            if (!isOpen) {
              item.classList.add('open-mobile');
              trigger.setAttribute('aria-expanded', 'true');
            }
          }
        });
      } else if (trigger) {
        // Direct top-level standalone link (Home, Transport, Contact)
        trigger.addEventListener('click', function () {
          if (isMobileView()) {
            closeMobileMenu();
          }
        });
      }
    });

    // 3. Sub-links inside dropdown menus: clicking navigates and closes mobile menu
    var subLinks = navMenu.querySelectorAll('.dropdown-menu a');
    subLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (isMobileView()) {
          closeMobileMenu();
        }
      });
    });

    // 4. Click outside to close mobile navigation
    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('active')) {
        var isClickInsideMenu = navMenu.contains(e.target);
        var isClickOnToggle = false;
        navToggles.forEach(function (t) {
          if (t === e.target || t.contains(e.target) || (e.target.closest && e.target.closest('.mobile-nav-toggle'))) {
            isClickOnToggle = true;
          }
        });
        if (!isClickInsideMenu && !isClickOnToggle) {
          closeMobileMenu();
        }
      }
    });

    // 5. Escape key to close mobile navigation
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // 6. Window resize handler: reset mobile active classes if resized to desktop
    window.addEventListener('resize', function () {
      if (!isMobileView() && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  /* 0.2 Interactive Why Should You Choose Accordion */
  function initWhyChooseAccordion() {
    var accordion = document.getElementById('why-accordion');
    if (!accordion) return;

    var cards = accordion.querySelectorAll('.accordion-card');
    cards.forEach(function (card) {
      var trigger = card.querySelector('.accordion-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function () {
        var isOpen = card.classList.contains('active');

        // Close all other accordion items
        cards.forEach(function (other) {
          other.classList.remove('active');
          var otherBtn = other.querySelector('.accordion-trigger');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked item
        if (!isOpen) {
          card.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* 1. Apply [data-background] attributes */
  function initDataBackgrounds() {
    var bgElements = document.querySelectorAll('[data-background]');
    bgElements.forEach(function (el) {
      var bg = el.getAttribute('data-background');
      if (bg && bg.trim() !== '') {
        el.style.backgroundImage = 'url("' + bg.trim() + '")';
      }
    });
  }

  /* 2. Admission Poster Popup Modal */
  function initAdmissionPopup() {
    var popup = document.getElementById('image-popup');
    var closeBtn = document.querySelector('.popup-close');
    if (!popup) return;

    setTimeout(function () {
      popup.classList.add('show');
    }, 650);

    function closePopup() {
      popup.classList.remove('show');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closePopup);
    }

    popup.addEventListener('click', function (e) {
      if (e.target === popup) {
        closePopup();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popup.classList.contains('show')) {
        closePopup();
      }
    });
  }

  /* 3. Sticky Header, Scroll-To-Top & Mobile Navigation Drawer */
  function initHeaderAndMobileNav() {
    var headerBottom = document.querySelector('.header-bottom');
    var scrollToTopBtn = document.querySelector('.scrollToTop');
    var headerBar = document.querySelector('.header-bar');
    var menu = document.querySelector('.menu');
    var overlay = document.querySelector('.overlay');

    // Mark menu items that contain a submenu
    if (menu) {
      var menuItems = menu.querySelectorAll(':scope > li');
      menuItems.forEach(function (li) {
        var submenu = li.querySelector('.submenu');
        if (submenu) {
          li.classList.add('has-submenu');
          var link = li.querySelector(':scope > a');
          if (link) {
            link.addEventListener('click', function (e) {
              if (window.innerWidth <= 991) {
                e.preventDefault();
                var isOpen = li.classList.contains('open');
                menuItems.forEach(function (other) {
                  other.classList.remove('open');
                });
                if (!isOpen) {
                  li.classList.add('open');
                }
              } else if (link.getAttribute('href') === '#') {
                e.preventDefault();
              }
            });
          }
        }
      });
    }

    function closeMobileMenu() {
      if (headerBar) headerBar.classList.remove('active');
      if (menu) menu.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (headerBar && menu) {
      headerBar.addEventListener('click', function () {
        var isActive = menu.classList.toggle('active');
        headerBar.classList.toggle('active', isActive);
        if (overlay) overlay.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeMobileMenu);
    }

    // Close on Escape key press
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu && menu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Close mobile menu when clicking direct page navigation links (excluding submenu toggles)
    if (menu) {
      var directLinks = menu.querySelectorAll('a');
      directLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          var href = link.getAttribute('href');
          var parentLi = link.parentElement;
          if (window.innerWidth <= 991 && href && href !== '#' && (!parentLi || !parentLi.classList.contains('has-submenu'))) {
            closeMobileMenu();
          }
        });
      });
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) {
        closeMobileMenu();
      }
    });

    // Scroll handler for scroll-to-top button (Sticky navigation disabled per request)
    window.addEventListener(
      'scroll',
      function () {
        var scrollY = window.scrollY || window.pageYOffset;
        if (scrollToTopBtn) {
          scrollToTopBtn.classList.toggle('active', scrollY > 320);
        }
      },
      { passive: true }
    );

    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* 4. Hero Banner Carousel (Vanilla JS Replacement for OwlCarousel) */
  function initHeroCarousel() {
    var bannerSection = document.querySelector('.bn-sec');
    if (!bannerSection) return;

    var slides = Array.prototype.slice.call(
      bannerSection.querySelectorAll('.owl-carousel .item')
    );
    var bulletsContainer = bannerSection.querySelector('.bullets');
    if (slides.length === 0) return;

    var currentIndex = 0;
    var timer = null;
    var INTERVAL = 5500;

    // Activate first slide
    slides.forEach(function (slide, idx) {
      slide.classList.toggle('active', idx === 0);
    });

    // Build prev/next arrows
    var prevBtn = document.createElement('button');
    prevBtn.className = 'hero-nav-btn hero-nav-prev';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'hero-nav-btn hero-nav-next';
    nextBtn.setAttribute('aria-label', 'Next slide');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

    bannerSection.appendChild(prevBtn);
    bannerSection.appendChild(nextBtn);

    // Build bullets
    var bullets = [];
    if (bulletsContainer) {
      bulletsContainer.innerHTML = '';
      slides.forEach(function (_, idx) {
        var li = document.createElement('li');
        if (idx === 0) li.classList.add('active');
        li.addEventListener('click', function () {
          goToSlide(idx);
          restartAutoPlay();
        });
        bulletsContainer.appendChild(li);
        bullets.push(li);
      });
    }

    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      if (bullets[currentIndex]) bullets[currentIndex].classList.remove('active');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('active');
      if (bullets[currentIndex]) bullets[currentIndex].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = setInterval(nextSlide, INTERVAL);
    }

    function stopAutoPlay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function restartAutoPlay() {
      startAutoPlay();
    }

    prevBtn.addEventListener('click', function () {
      prevSlide();
      restartAutoPlay();
    });

    nextBtn.addEventListener('click', function () {
      nextSlide();
      restartAutoPlay();
    });

    bannerSection.addEventListener('mouseenter', stopAutoPlay);
    bannerSection.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support
    var touchStartX = 0;
    bannerSection.addEventListener(
      'touchstart',
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    bannerSection.addEventListener(
      'touchend',
      function (e) {
        var diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 45) {
          if (diff < 0) nextSlide();
          else prevSlide();
          restartAutoPlay();
        }
      },
      { passive: true }
    );

    startAutoPlay();
  }

  /* 5. Latest Events Slider (Vanilla JS Replacement for Slick Slider) */
  function initEventsSlider() {
    var slider = document.querySelector('.news-sec .slider');
    var titleBox = document.querySelector('.news-sec .contact-title-box');
    if (!slider) return;

    var cards = Array.prototype.slice.call(slider.children);
    if (cards.length === 0) return;

    var currentIndex = 0;
    var autoTimer = null;

    // Create navigation buttons in the header bar
    if (titleBox) {
      var existingControls = titleBox.querySelector('.events-slider-controls');
      if (existingControls) {
        existingControls.remove();
      }
      var controls = document.createElement('div');
      controls.className = 'events-slider-controls';

      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'events-nav-btn';
      prevBtn.setAttribute('aria-label', 'Previous events');
      prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

      var nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'events-nav-btn';
      nextBtn.setAttribute('aria-label', 'Next events');
      nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

      controls.appendChild(prevBtn);
      controls.appendChild(nextBtn);
      titleBox.appendChild(controls);

      prevBtn.addEventListener('click', function () {
        step(-1);
        resetTimer();
      });

      nextBtn.addEventListener('click', function () {
        step(1);
        resetTimer();
      });
    }

    function getTrackWidth() {
      var trackWrap = slider.closest('.events-slider-track-wrap') || slider.parentElement;
      return trackWrap ? trackWrap.getBoundingClientRect().width : slider.getBoundingClientRect().width;
    }

    function getVisibleCount() {
      var trackWidth = getTrackWidth();
      return trackWidth < 540 ? 1 : 2;
    }

    function updatePosition() {
      var visible = getVisibleCount();
      var maxIndex = Math.max(0, cards.length - visible);
      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;

      var cardEl = cards[0];
      if (!cardEl) return;
      var cardWidth = cardEl.getBoundingClientRect().width;
      var computedGap = parseFloat(window.getComputedStyle(slider).gap);
      var gap = isNaN(computedGap) ? 14 : computedGap;
      var offset = currentIndex * (cardWidth + gap);
      slider.style.transform = 'translate3d(-' + offset + 'px, 0, 0)';
    }

    function step(dir) {
      var visible = getVisibleCount();
      var maxIndex = Math.max(0, cards.length - visible);
      currentIndex += dir;
      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;
      updatePosition();
    }

    function resetTimer() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        step(1);
      }, 4500);
    }

    // Touch swipe support
    var touchStartX = 0;
    slider.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        if (autoTimer) clearInterval(autoTimer);
      }
    }, { passive: true });

    slider.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches.length > 0) {
        var diffX = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 40) {
          step(diffX > 0 ? 1 : -1);
        }
        resetTimer();
      }
    }, { passive: true });

    window.addEventListener('resize', updatePosition);
    slider.addEventListener('mouseenter', function () {
      if (autoTimer) clearInterval(autoTimer);
    });
    slider.addEventListener('mouseleave', resetTimer);

    setTimeout(updatePosition, 100);
    updatePosition();
    resetTimer();
  }

  /* 6. Animated Odometer Counters */
  function initCounters() {
    var counters = document.querySelectorAll('.odometer[data-odometer-final], .count-number[data-count]');
    if (counters.length === 0) return;

    function animateCounter(el) {
      var rawAttr = el.getAttribute('data-odometer-final') || el.getAttribute('data-count');
      var target = parseInt(rawAttr, 10);
      if (isNaN(target)) return;

      var duration = 1800;
      var startTime = null;

      function tick(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );

      counters.forEach(function (c) {
        observer.observe(c);
      });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* 7. Photo Gallery Lightbox (Disabled as requested) */
  function initGalleryLightbox() {}

  /* 8. Full Page Scroll Reveal Animation Engine */
  function initScrollReveal() {
    var allTargetsSelector = [
      '.section-header',
      '.section-header-academic',
      '.page-header-content',
      '.quick-access-item',
      '.count-box-sn',
      '.stat-card',
      '.about-photo-composition',
      '.about-split-grid > div:last-child',
      '.hallmark-box',
      '.vm-panel',
      '.vm-stage-header',
      '.vm-charter-card',
      '.vm-preventive-ribbon',
      '.vision-card',
      '.mission-card',
      '.why-choose-visual',
      '.accordion-card',
      '.accordion-item-academic',
      '.leader-split-card',
      '.leadership-box-card',
      '.leader-editorial-sec .editorial-photo-wrapper',
      '.leader-editorial-sec .editorial-content',
      '.course-card',
      '.house-pill-card',
      '.facility-badge-card',
      '.academic-table-wrap',
      '.notice-board-card',
      '.events-showcase-panel',
      '.events-feature-panel',
      '.video-card-sn',
      '.gallery-card',
      '.testimonial-card',
      '.admissions-box',
      '.adm-step-item',
      '.pillar-card',
      '.heritage-col-text',
      '.heritage-col-visual',
      '.metric-mini-card',
      '.founder-cta-box',
      '.footer-col'
    ].join(', ');

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(allTargetsSelector).forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    // Hero Content & Page Banner Immediate Staggered Entrance
    var heroWrapper = document.querySelector('.hero-content-wrapper, .page-header-content');
    if (heroWrapper) {
      heroWrapper.classList.add('reveal-on-scroll');
      setTimeout(function () {
        heroWrapper.classList.add('is-visible');
      }, 80);
    }

    // Section Headers
    document.querySelectorAll('.section-header, .section-header-academic, .vm-stage-header').forEach(function (el) {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });

    // 1. Quick Access Strip & Multi-Color Stat Cards
    document.querySelectorAll('.quick-access-item, .count-box-sn, .stat-card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = ((idx % 7) * 75) + 'ms';
      observer.observe(el);
    });

    // 2. About Section & Heritage Split Rows (Directional Left/Right Reveals)
    document.querySelectorAll('.about-photo-composition, .heritage-col-text, .why-choose-visual').forEach(function (el) {
      el.classList.add('reveal-on-scroll', 'reveal-left');
      observer.observe(el);
    });

    document.querySelectorAll('.about-split-grid > div:last-child, .heritage-col-visual').forEach(function (el) {
      el.classList.add('reveal-on-scroll', 'reveal-right');
      observer.observe(el);
    });

    document.querySelectorAll('.hallmark-box, .metric-mini-card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = ((idx % 4) * 85) + 'ms';
      observer.observe(el);
    });

    // 3. Vision & Mission Cards + Dual Leadership Box Cards
    document.querySelectorAll('.vm-panel, .vm-charter-card, .leader-split-card, .vision-card, .mission-card, .leadership-box-card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll', idx % 2 === 0 ? 'reveal-left' : 'reveal-right');
      el.style.transitionDelay = ((idx % 2) * 120) + 'ms';
      observer.observe(el);
    });

    document.querySelectorAll('.vm-preventive-ribbon').forEach(function (el) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = '160ms';
      observer.observe(el);
    });

    // 4. Editorial Leadership Sections (Founder, Principal, Rector Subpages & Sections)
    document.querySelectorAll('.leader-editorial-sec, #founder-biography, #principal-message-body, #rector-message-body, #manager-message-body').forEach(function (sec) {
      var photoWrap = sec.querySelector('.editorial-photo-wrapper');
      var content = sec.querySelector('.editorial-content');
      var isReversed = sec.querySelector('.flex-row-reverse') !== null;

      if (photoWrap) {
        photoWrap.classList.add('reveal-on-scroll', isReversed ? 'reveal-right' : 'reveal-left');
        observer.observe(photoWrap);
      }
      if (content) {
        content.classList.add('reveal-on-scroll', isReversed ? 'reveal-left' : 'reveal-right');
        observer.observe(content);
      }
    });

    // 5. Notice Board (Left) & Latest Events (Right)
    var noticeWrap = document.querySelector('.academic-table-wrap, .notice-board-card');
    if (noticeWrap) {
      noticeWrap.classList.add('reveal-on-scroll', 'reveal-left');
      observer.observe(noticeWrap);
    }

    var eventsWrap = document.querySelector('.events-showcase-panel, .events-feature-panel');
    if (eventsWrap) {
      eventsWrap.classList.add('reveal-on-scroll', 'reveal-right');
      observer.observe(eventsWrap);
    }

    // 6. Facilities, Courses, Pillars, Houses & Accordion Cards (Staggered Grid)
    document.querySelectorAll('.facility-badge-card, .course-card, .pillar-card, .house-pill-card, .accordion-card, .accordion-item-academic').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = ((idx % 4) * 85) + 'ms';
      observer.observe(el);
    });

    // 7. Video Highlights & Photo Gallery Grid (Zoom Reveal)
    document.querySelectorAll('.video-card-sn, .gallery-card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll', 'reveal-zoom');
      el.style.transitionDelay = ((idx % 4) * 80) + 'ms';
      observer.observe(el);
    });

    // 8. Testimonials, Admissions Box & Footer Columns
    document.querySelectorAll('.testimonial-card, .adm-step-item, .footer-col').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = ((idx % 4) * 95) + 'ms';
      observer.observe(el);
    });

    document.querySelectorAll('.admissions-box, .founder-cta-box').forEach(function (el) {
      el.classList.add('reveal-on-scroll', 'reveal-zoom');
      observer.observe(el);
    });
  }

  /* 9. Dynamic Notice Board Loader (Preserved from Original Site) */
  function initDynamicNotices() {
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var NEW_THRESHOLD_DAYS = 14;

    function escHtml(s) {
      return String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function buildItem(notice) {
      var d = new Date(notice.created_at);
      var day = isNaN(d) ? '' : String(d.getDate()).padStart(2, '0');
      var mon = isNaN(d) ? '' : MONTHS[d.getMonth()];
      var isNew = !isNaN(d) && Date.now() - d.getTime() < NEW_THRESHOLD_DAYS * 86400000;
      var newBadge = isNew
        ? '<img src="./assets/images/event/newIcon.gif" alt="" class="img-fluid" width="80">'
        : '';
      var link = notice.file_path
        ? '<a href="' + escHtml(notice.file_path) + '"><p class="title">' + escHtml(notice.title) + '</p></a>'
        : '<p class="title">' + escHtml(notice.title) + '</p>';
      return (
        '<li class="event">' +
        '<div class="date"><span class="day">' + day + '</span><span class="month">' + mon + '</span></div>' +
        '<div class="info">' + link + newBadge + '</div>' +
        '</li>'
      );
    }

    fetch('get-notices.php')
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.success || !data.notices || data.notices.length === 0) return;
        var list = document.getElementById('dynamic-notice-list');
        if (!list) return;
        list.innerHTML = data.notices.map(buildItem).join('');
        initNoticeFilter();
      })
      .catch(function () {
        /* silently keep hardcoded fallback on error */
      });
  }

  /* Notice Board Interactive Category Filter */
  function initNoticeFilter() {
    var filterBtns = document.querySelectorAll('.notice-filter-btn');
    var noticeItems = document.querySelectorAll('#dynamic-notice-list .event');
    if (filterBtns.length === 0 || noticeItems.length === 0) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        noticeItems.forEach(function (item) {
          var itemCat = item.getAttribute('data-cat');
          if (cat === 'all' || itemCat === cat) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* 10. Highlights Strip 3D Flip Card Touch & Keyboard Interaction */
  function initFlipCards() {
    var cards = document.querySelectorAll('.strip-sec .flip-card');
    if (!cards || cards.length === 0) return;

    cards.forEach(function (card) {
      // Allow click/tap to toggle flip state (especially useful on mobile/tablet)
      card.addEventListener('click', function (e) {
        // If clicking on an action button link inside back face, let normal navigation occur
        if (e.target.closest('a')) return;
        card.classList.toggle('is-flipped');
      });

      // Keyboard accessibility: Enter or Space flips card
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.tagName !== 'A') {
            e.preventDefault();
            card.classList.toggle('is-flipped');
          }
        }
      });
    });
  }

  /* 11. Sanskara-Style Interactive Features (Sticky Helpdesk Drawer, Video Modal & ScrollToTop) */
  function initSanskaraFeatures() {
    // Quick Inquiry Helpdesk Drawer Toggle
    var chatToggle = document.getElementById('sn-chat-toggle');
    var chatPopup = document.getElementById('sn-chat-popup');
    var chatClose = document.getElementById('sn-chat-close');

    if (chatToggle && chatPopup) {
      chatToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        chatPopup.classList.toggle('active');
      });
    }

    if (chatClose && chatPopup) {
      chatClose.addEventListener('click', function () {
        chatPopup.classList.remove('active');
      });
    }

    // Close Helpdesk when clicking outside
    document.addEventListener('click', function (e) {
      if (chatPopup && chatPopup.classList.contains('active')) {
        if (!chatPopup.contains(e.target) && !chatToggle.contains(e.target)) {
          chatPopup.classList.remove('active');
        }
      }
    });

    // Scroll To Top Button (Both #scrollToTopBtn and #globalScrollToTop)
    var scrollBtn = document.getElementById('scrollToTopBtn') || document.getElementById('globalScrollToTop');
    if (scrollBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      }, { passive: true });

      scrollBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Right-Side Floating Actions (FAB) Toggle & Outside Click Listener
    var floatingWrap = document.getElementById('floatingActionsWrap');
    var floatingBtn = document.getElementById('floatingToggleBtn');

    if (floatingWrap && floatingBtn) {
      floatingBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        floatingWrap.classList.toggle('active');
      });

      document.addEventListener('click', function (e) {
        if (!floatingWrap.contains(e.target)) {
          floatingWrap.classList.remove('active');
        }
      });
    }

    // Video Modal Lightbox (Global Hooks)
    window.openVideoModal = function (videoUrl) {
      var backdrop = document.getElementById('videoModalBackdrop');
      var iframe = document.getElementById('videoModalIframe');
      if (!backdrop || !iframe) return;

      iframe.src = videoUrl + '?autoplay=1&rel=0';
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    window.closeVideoModal = function () {
      var backdrop = document.getElementById('videoModalBackdrop');
      var iframe = document.getElementById('videoModalIframe');
      if (!backdrop || !iframe) return;

      iframe.src = '';
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    var backdrop = document.getElementById('videoModalBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          window.closeVideoModal();
        }
      });
    }
  }
})();


  /* ==========================================================================
     ANIMATED PHOTO GALLERY & LIGHTBOX POPUP
     ========================================================================== */
  function initPhotoGalleryInteractive() {
    var galleryGrid = document.getElementById('photoGalleryGrid');
    if (!galleryGrid) return;

    var filterBtns = document.querySelectorAll('.gallery-filter-btn');
    var cards = document.querySelectorAll('.gallery-photo-card');
    var thumbs = document.querySelectorAll('.gallery-img-thumb');

    // Filter Buttons
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(function () {
              card.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });

    // Lightbox modal logic
    var lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;

    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxCounter = document.getElementById('lightboxCounter');
    var closeBtn = document.getElementById('lightboxClose');
    var overlay = document.getElementById('lightboxOverlay');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');

    var visibleThumbs = [];
    var currentIndex = 0;

    function getVisibleThumbs() {
      var arr = [];
      document.querySelectorAll('.gallery-photo-card:not(.is-hidden) .gallery-img-thumb').forEach(function (t) {
        arr.push(t);
      });
      return arr;
    }

    function showPhoto(idx) {
      visibleThumbs = getVisibleThumbs();
      if (!visibleThumbs.length) return;
      if (idx < 0) idx = visibleThumbs.length - 1;
      if (idx >= visibleThumbs.length) idx = 0;
      currentIndex = idx;

      var fullSrc = visibleThumbs[currentIndex].getAttribute('data-full');
      lightboxImg.src = fullSrc;
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + visibleThumbs.length;
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        visibleThumbs = getVisibleThumbs();
        var idx = visibleThumbs.indexOf(thumb);
        if (idx !== -1) {
          showPhoto(idx);
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (overlay) overlay.addEventListener('click', closeLightbox);

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showPhoto(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showPhoto(currentIndex + 1);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
      if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
    });
  }
