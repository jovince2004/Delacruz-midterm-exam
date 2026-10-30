'use strict';

gsap.registerPlugin(ScrollTrigger);

const rootElement = document.documentElement;
const darkModeButton = document.querySelector('#darkModeToggle');
const replayButton = document.querySelector('#replayBtn');
const contactForm = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');
const progressBar = document.querySelector('#progressBar');
const savedTheme = localStorage.getItem('barridos-theme');

// Use the visitor's saved choice first; otherwise follow the operating-system preference.
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  rootElement.classList.add('dark');
}

function updateThemeButton() {
  const isDark = rootElement.classList.contains('dark');
  darkModeButton.setAttribute('aria-pressed', String(isDark));
  darkModeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
}

updateThemeButton();
darkModeButton.addEventListener('click', () => {
  const isDark = rootElement.classList.toggle('dark');
  localStorage.setItem('barridos-theme', isDark ? 'dark' : 'light');
  updateThemeButton();
});

// The intro stays short; power3.out starts promptly and settles gently for a welcoming feel.
let introTimeline;
const motionSettings = gsap.matchMedia();
motionSettings.add('(prefers-reduced-motion: no-preference)', () => {
  introTimeline = gsap.timeline({
    defaults: { duration: 0.55, ease: 'power3.out' }
  });

  introTimeline
    .from('header', { y: -36, autoAlpha: 0 })
    .from('.intro-title', { y: 24, autoAlpha: 0 }, '-=0.25')
    .from('.intro-tag', { y: 18, autoAlpha: 0 }, '<0.1')
    .from('.intro-btn', { y: 14, autoAlpha: 0, stagger: 0.12 }, '-=0.15')
    // A restrained back ease gives the food illustration a playful, soft landing.
    .from('.intro-art', { scale: 0.92, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.2');

  replayButton.addEventListener('click', replayIntro);
  gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left center' });

  // Every lower section owns its trigger. Content remains visible when motion is reduced.
  gsap.utils.toArray('.reveal').forEach((section) => {
    gsap.from(section, {
      y: 34,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 86%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });

  return () => {
    replayButton.removeEventListener('click', replayIntro);
    introTimeline = undefined;
  };
});

function replayIntro() {
  if (introTimeline) introTimeline.restart();
}

// A layout-only class-project form: validate required fields, but do not send data anywhere.
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formNote.textContent = 'Please complete each field with a valid email address.';
    return;
  }
  formNote.textContent = 'Thanks! This demo form is ready, but it does not send messages.';
});
