/* ========================================
   MAIN.JS — Ripley Boost / Try Out
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  /* --- Loading Animation --- */
  const loader = document.querySelector('.loader');
  if (loader) {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            loader.style.display = 'none';
            document.body.classList.add('loaded');
            initHeroAnimation();
          }
        });
      }
    });
    tl.to('.loader__logo', { opacity: 1, duration: 0.6, ease: 'power2.out' })
      .to('.loader__bar', { opacity: 1, duration: 0.3 }, '-=0.3')
      .to('.loader__bar-fill', { width: '100%', duration: 1.2, ease: 'power2.inOut' })
      .to('.loader__logo', { scale: 1.05, duration: 0.3, ease: 'power2.in' }, '-=0.2');
  } else {
    document.body.classList.add('loaded');
    initHeroAnimation();
  }

  /* --- Hero Entrance Animation --- */
  function initHeroAnimation() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .fromTo('.hero__title', { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
      .fromTo('.hero__subtitle', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo('.hero__description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo('.hero__logo', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

    // Particle animation
    const particles = document.querySelectorAll('.hero__particle');
    particles.forEach(p => {
      gsap.set(p, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });
      gsap.to(p, {
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2,
      });
      gsap.to(p, {
        y: '-=100',
        x: '+=' + (Math.random() * 100 - 50),
        duration: Math.random() * 10 + 5,
        repeat: -1,
        ease: 'none',
      });
    });
  }

  /* --- Progress Bar --- */
  initProgressBar();

  /* --- Fade-in Animations --- */
  initFadeIns();
  initStaggerIn();

  /* --- Agenda Timeline Animation --- */
  const timelineItems = document.querySelectorAll('.timeline__item');
  timelineItems.forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  /* --- Speaker Section Animation --- */
  const speakerSection = document.querySelector('.speaker-section');
  if (speakerSection) {
    gsap.fromTo('.speaker-section__photo',
      { opacity: 0, scale: 0.8, x: -40 },
      {
        opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: speakerSection, start: 'top 75%', toggleActions: 'play none none none' }
      }
    );
    gsap.fromTo('.speaker-section__ring',
      { scale: 0.6, opacity: 0 },
      {
        scale: 1, opacity: 0.7, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: speakerSection, start: 'top 75%', toggleActions: 'play none none none' }
      }
    );
    gsap.fromTo('.speaker-section__name',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: speakerSection, start: 'top 75%', toggleActions: 'play none none none' }
      }
    );
    gsap.fromTo('.speaker-section__role, .speaker-section__divider, .speaker-section__context',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: speakerSection, start: 'top 75%', toggleActions: 'play none none none' }
      }
    );
  }

  /* --- Proposito Pinned Section --- */
  const propositoSection = document.querySelector('.proposito');
  if (propositoSection) {
    const propTl = gsap.timeline({
      scrollTrigger: {
        trigger: propositoSection,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
      }
    });
    propTl
      .fromTo('.proposito .section-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0)
      .fromTo('.proposito .section-title', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1 }, 0.1)
      .fromTo('.proposito__text', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.3)
      .fromTo('.proposito__ring', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1 }, 0)
      .fromTo('.proposito__ring--2', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1 }, 0.2);
  }

  /* --- Pilares Cards Stagger --- */
  const pilarCards = document.querySelectorAll('.pilar-card');
  if (pilarCards.length) {
    gsap.fromTo(pilarCards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pilares-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /* --- Atributos Stagger --- */
  const atributoCards = document.querySelectorAll('.atributo-card');
  if (atributoCards.length) {
    gsap.fromTo(atributoCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.6, stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.atributos-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /* --- Principios Cards Stagger --- */
  const principioCards = document.querySelectorAll('.principio-card');
  if (principioCards.length) {
    gsap.fromTo(principioCards,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: 0.6, stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.principios-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /* --- Cultura Message --- */
  gsap.fromTo('.cultura__message',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cultura__message',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );

  /* --- Proceso Funnel Animation --- */
  const funnelCards = document.querySelectorAll('.funnel-card');
  if (funnelCards.length) {
    gsap.fromTo(funnelCards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.funnel',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  /* --- Postulaciones Counter --- */
  const postNum = document.querySelector('.proceso__postulaciones-number');
  if (postNum) {
    ScrollTrigger.create({
      trigger: postNum,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(postNum,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }
        );
      }
    });
  }

  /* --- Momento Full Sections Animation --- */
  document.querySelectorAll('.momento-full').forEach(section => {
    const icon = section.querySelector('.momento-full__icon-wrap');
    if (icon) {
      gsap.fromTo(icon,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
        }
      );
    }
    const desc = section.querySelector('.momento-full__desc');
    if (desc) {
      gsap.fromTo(desc,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
        }
      );
    }
    const timer = section.querySelector('.momento-timer');
    if (timer) {
      gsap.fromTo(timer,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
        }
      );
    }
  });

  /* --- Timers --- */
  const timers = {};
  document.querySelectorAll('.momento-timer__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.timer;
      const wrapper = btn.closest('.momento-timer');
      const minEl = wrapper.querySelector('.momento-timer__minutes');
      const secEl = wrapper.querySelector('.momento-timer__seconds');

      if (timers[id]) {
        // Stop
        clearInterval(timers[id].interval);
        timers[id] = null;
        btn.textContent = 'Iniciar Timer';
        btn.classList.remove('momento-timer__btn--running');
        wrapper.classList.remove('running');
      } else {
        // Start
        const start = Date.now();
        wrapper.classList.add('running');
        btn.textContent = 'Detener';
        btn.classList.add('momento-timer__btn--running');
        timers[id] = {
          interval: setInterval(() => {
            const elapsed = Math.floor((Date.now() - start) / 1000);
            const m = Math.floor(elapsed / 60);
            const s = elapsed % 60;
            minEl.textContent = String(m).padStart(2, '0');
            secEl.textContent = String(s).padStart(2, '0');
          }, 250)
        };
      }
    });
  });

  /* --- Cierre Pinned Section --- */
  const cierreSection = document.querySelector('.cierre');
  if (cierreSection) {
    const cierreTl = gsap.timeline({
      scrollTrigger: {
        trigger: cierreSection,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
      }
    });

    const msgs = cierreSection.querySelectorAll('.cierre__message');
    msgs.forEach((msg, i) => {
      const startTime = i * 0.3;
      cierreTl
        .fromTo(msg, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, startTime)
        .to(msg, { opacity: i < msgs.length - 1 ? 0 : 1, y: i < msgs.length - 1 ? -20 : 0, duration: 0.2 }, startTime + 0.25);
    });

    cierreTl
      .fromTo('.cierre__final', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, '>')
      .fromTo('.cierre__logo', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, '>-0.1')
      .fromTo('.cierre__glow', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, '<');
  }

  /* --- Video Autoplay --- */
  initVideoAutoplay();
  initVideoHover();
});
