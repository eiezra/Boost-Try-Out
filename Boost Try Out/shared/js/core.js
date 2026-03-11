/* ========================================
   CORE.JS — Shared functions for all presentations
   ======================================== */

/**
 * Animated counters using GSAP
 * Animates numeric values from 0 to target when triggered
 */
function initCounters(selector = '.kpi-value') {
  const counters = document.querySelectorAll(selector);
  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.value) || 0;
    const prefix = counter.dataset.prefix || '';
    const suffix = counter.dataset.suffix || '';

    counter.textContent = prefix + '0' + suffix;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            const progress = this.progress();
            const current = Math.round(target * progress);
            counter.textContent = prefix + current.toLocaleString('es-CL') + suffix;
          }
        });
      }
    });
  });
}

/**
 * Video autoplay on viewport using IntersectionObserver
 */
function initVideoAutoplay(selector = '.phone__screen video, .autoplay-video') {
  const videos = document.querySelectorAll(selector);
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.3 });

  videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
    observer.observe(video);
  });
}

/**
 * Video play on hover for cards
 */
function initVideoHover(selector = '.card video') {
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => {
    const video = card.querySelector ? card : card;
    const parent = video.closest('.card') || video.parentElement;

    parent.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });
    parent.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

/**
 * Progress bar that tracks page scroll
 */
function initProgressBar(selector = '.progress-bar') {
  const bar = document.querySelector(selector);
  if (!bar) return;

  gsap.to(bar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

/**
 * Standard fade-in animation for elements entering viewport
 */
function initFadeIns(selector = '.fade-in') {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, i) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    const y = parseFloat(el.dataset.y) || 40;

    gsap.fromTo(el,
      { opacity: 0, y: y },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Stagger children animation
 */
function initStaggerIn(selector = '.stagger-in') {
  const containers = document.querySelectorAll(selector);
  containers.forEach(container => {
    const children = container.children;
    gsap.fromTo(children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Fetch JSON data
 */
async function fetchData(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Error loading data:', err);
    return null;
  }
}

/**
 * Initialize Chart.js chart when it enters viewport
 */
function initChartOnScroll(canvasId, chartConfig) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  let chartInstance = null;

  ScrollTrigger.create({
    trigger: canvas,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      chartInstance = new Chart(canvas.getContext('2d'), chartConfig);
    }
  });

  return chartInstance;
}

/**
 * Smooth scroll to anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 0 }, ease: 'power3.inOut' });
      }
    });
  });
}
