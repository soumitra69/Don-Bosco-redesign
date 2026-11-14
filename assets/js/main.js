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
  });

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

    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) {
        closeMobileMenu();
      }
    });

    // Scroll handler for sticky nav & scroll-to-top button
    window.addEventListener(
      'scroll',
      function () {
        var scrollY = window.scrollY || window.pageYOffset;
        if (headerBottom) {
          headerBottom.classList.toggle('is-sticky', scrollY > 60);
        }
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
    var counters = document.querySelectorAll('.odometer[data-odometer-final]');
    if (counters.length === 0) return;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-odometer-final'), 10);
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
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers: show everything immediately
      document.querySelectorAll('.section-header, .strip-sec .card, .about-video, .about-content, .found-sec .card, .single-counter, .notice-board-col, .events-carousel-col, .facility-item, .gallery-item, .footer-widget, .footer-callout-ribbon')
        .forEach(function (el) {
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
      { threshold: 0.1, rootMargin: '0px 0px -35px 0px' }
    );

    // Section Headers
    document.querySelectorAll('.section-header').forEach(function (el) {
      observer.observe(el);
    });

    // 1. Strip Cards (Staggered Entrance)
    document.querySelectorAll('.strip-sec .card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = (idx * 120) + 'ms';
      observer.observe(el);
    });

    // 2. About Section (Directional Reveals)
    var aboutImg = document.querySelector('.about-video');
    if (aboutImg) {
      aboutImg.classList.add('reveal-on-scroll', 'reveal-left');
      observer.observe(aboutImg);
    }

    var aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      aboutContent.classList.add('reveal-on-scroll', 'reveal-right');
      observer.observe(aboutContent);
    }

    document.querySelectorAll('.nulla-list .hallmark-card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = (idx * 90) + 'ms';
      observer.observe(el);
    });

    // 3. Guiding Pillars / Leadership Cards (Staggered 3 + 2)
    document.querySelectorAll('.found-row-top .card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = (idx * 120) + 'ms';
      observer.observe(el);
    });

    document.querySelectorAll('.found-row-bottom .card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = (idx * 140) + 'ms';
      observer.observe(el);
    });

    // 4. Counters / Metric Ribbon (Staggered 4 Columns)
    var counterPill = document.querySelector('.counter-header-pill');
    if (counterPill) {
      counterPill.classList.add('reveal-on-scroll', 'reveal-zoom');
      observer.observe(counterPill);
    }

    document.querySelectorAll('.single-counter').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = (idx * 95) + 'ms';
      observer.observe(el);
    });

    // 5. Notice Board (Left) & Latest Events (Right)
    var noticeCol = document.querySelector('.notice-board-col');
    if (noticeCol) {
      noticeCol.classList.add('reveal-on-scroll', 'reveal-left');
      observer.observe(noticeCol);
    }

    var eventsCol = document.querySelector('.events-carousel-col');
    if (eventsCol) {
      eventsCol.classList.add('reveal-on-scroll', 'reveal-right');
      observer.observe(eventsCol);
    }

    // 6. Facilities Section Cards (Staggered Grid)
    document.querySelectorAll('.facility-item, .facility-card').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = ((idx % 4) * 85) + 'ms';
      observer.observe(el);
    });

    // 7. Photo Gallery Grid (Zoom Reveal)
    document.querySelectorAll('.gallery-item').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll', 'reveal-zoom');
      el.style.transitionDelay = ((idx % 3) * 90) + 'ms';
      observer.observe(el);
    });

    // 8. Teachers Feature Blocks (Staggered)
    document.querySelectorAll('.feature-block').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = ((idx % 3) * 110) + 'ms';
      observer.observe(el);
    });

    // 9. Footer Callout Ribbon & Widgets
    var footerRibbon = document.querySelector('.footer-callout-ribbon');
    if (footerRibbon) {
      footerRibbon.classList.add('reveal-on-scroll');
      observer.observe(footerRibbon);
    }

    document.querySelectorAll('.footer-widget').forEach(function (el, idx) {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = (idx * 110) + 'ms';
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
})();
