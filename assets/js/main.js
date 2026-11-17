/**
 * DON BOSCO SCHOOL, KOSAMGHAT, JABALPUR — HOMEPAGE INTERACTIONS
 * 100% Pure Vanilla JavaScript (Zero Dependencies / No jQuery)
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initDataBackgrounds();
    initAdmissionPopup();
    initHeaderAndMobileNav();
    initHeroCarousel();
    initEventsSlider();
    initCounters();
    initGalleryLightbox();
    initScrollReveal();
    initDynamicNotices();
    initFlipCards();
    initNewNavbar();
    initHeroImageSlider();
    initWhyChooseAccordion();
    initSanskaraFeatures();
  });

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

    function goToSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      currentIndex = index;

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

  /* 0. New Navbar toggle for dbchsstura.in-design system */
  function initNewNavbar() {
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('active');
      navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Mobile submenu toggle on clicking parent nav-item
    var navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach(function (item) {
      var trigger = item.querySelector(':scope > a, :scope > span.nav-label');
      var dropdown = item.querySelector('.dropdown-menu');
      if (dropdown && trigger) {
        trigger.addEventListener('click', function (e) {
          if (window.innerWidth <= 991) {
            e.preventDefault();
            var wasOpen = item.classList.contains('open-mobile');
            navItems.forEach(function (other) {
              other.classList.remove('open-mobile');
            });
            if (!wasOpen) {
              item.classList.add('open-mobile');
            }
          }
        });
      }
    });

    // Close menu when clicking any dropdown destination link
    var directLinks = navMenu.querySelectorAll('.dropdown-menu a, .nav-item > a:not([data-has-children])');
    directLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 991) {
          navMenu.classList.remove('active');
          navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
          navToggle.setAttribute('aria-expanded', 'false');
          navItems.forEach(function (other) {
            other.classList.remove('open-mobile');
          });
        }
      });
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
      return trackWidth < 460 ? 1 : 2;
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

  /* 7. Photo Gallery Lightbox (Vanilla JS Replacement for Magnific Popup) */
  function initGalleryLightbox() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.gallery-section a.img-pop')
    );
    if (links.length === 0) return;

    var lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML =
      '<button type="button" class="lightbox-btn lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>' +
      '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>' +
      '<img class="gallery-lightbox-img" src="" alt="Gallery preview">' +
      '<button type="button" class="lightbox-btn lightbox-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>' +
      '<div class="lightbox-counter"></div>';

    document.body.appendChild(lightbox);

    var imgEl = lightbox.querySelector('.gallery-lightbox-img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var counterEl = lightbox.querySelector('.lightbox-counter');
    var activeIndex = 0;

    function openAt(index) {
      activeIndex = (index + links.length) % links.length;
      var href = links[activeIndex].getAttribute('href');
      imgEl.setAttribute('src', href);
      counterEl.textContent = activeIndex + 1 + ' / ' + links.length;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    links.forEach(function (link, idx) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openAt(idx);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function () {
      openAt(activeIndex - 1);
    });
    nextBtn.addEventListener('click', function () {
      openAt(activeIndex + 1);
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openAt(activeIndex - 1);
      if (e.key === 'ArrowRight') openAt(activeIndex + 1);
    });
  }

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
      '.events-showcase-panel',
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
    var noticeWrap = document.querySelector('.academic-table-wrap');
    if (noticeWrap) {
      noticeWrap.classList.add('reveal-on-scroll', 'reveal-left');
      observer.observe(noticeWrap);
    }

    var eventsWrap = document.querySelector('.events-showcase-panel');
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
      })
      .catch(function () {
        /* silently keep hardcoded fallback on error */
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
