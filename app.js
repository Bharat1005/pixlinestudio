// =========================================================
// PIXLINE STUDIO - INTERACTIVE LOGIC & ANIMATIONS
// =========================================================

// 0. THEME SWITCHER (Light & Dark Mode)
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

function getPreferredTheme() {
  const savedTheme = localStorage.getItem('pixline-theme');
  if (savedTheme) return savedTheme;
  return 'dark';
}

function setTheme(theme) {
  const activeTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', activeTheme);
  localStorage.setItem('pixline-theme', activeTheme);
}

// Initialize theme immediately
setTheme(getPreferredTheme());

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener('click', toggleTheme);
}

// 1. INTERACTIVE ON-SCROLL TECH ORBIT ROTATION ENGINE
const heroOrbit = document.getElementById('techOrbit');
const trackInner = document.querySelector('.track-inner');
const trackMiddle = document.querySelector('.track-middle');
const trackOuter = document.querySelector('.track-outer');

let autoRotInner = 0;
let autoRotMiddle = 0;
let autoRotOuter = 0;
let targetScrollRot = 0;
let currentScrollRot = 0;
let isOrbitHovered = false;

if (heroOrbit) {
  heroOrbit.addEventListener('mouseenter', () => { isOrbitHovered = true; });
  heroOrbit.addEventListener('mouseleave', () => { isOrbitHovered = false; });
}

window.addEventListener('scroll', () => {
  targetScrollRot = window.scrollY * 0.35;
}, { passive: true });

function animateOrbit() {
  // Smooth scroll interpolation (lerp)
  currentScrollRot += (targetScrollRot - currentScrollRot) * 0.1;

  if (!isOrbitHovered) {
    autoRotInner += 0.25;
    autoRotMiddle -= 0.18;
    autoRotOuter += 0.14;
  }

  const rot1 = autoRotInner + currentScrollRot;
  const rot2 = autoRotMiddle - currentScrollRot * 1.35;
  const rot3 = autoRotOuter + currentScrollRot * 0.85;

  if (trackInner) {
    trackInner.style.transform = `rotate(${rot1}deg)`;
    const cards1 = trackInner.querySelectorAll('.node-card');
    cards1.forEach(c => c.style.transform = `rotate(${-rot1}deg)`);
  }

  if (trackMiddle) {
    trackMiddle.style.transform = `rotate(${rot2}deg)`;
    const cards2 = trackMiddle.querySelectorAll('.node-card');
    cards2.forEach(c => c.style.transform = `rotate(${-rot2}deg)`);
  }

  if (trackOuter) {
    trackOuter.style.transform = `rotate(${rot3}deg)`;
    const cards3 = trackOuter.querySelectorAll('.node-card');
    cards3.forEach(c => c.style.transform = `rotate(${-rot3}deg)`);
  }

  requestAnimationFrame(animateOrbit);
}

requestAnimationFrame(animateOrbit);

// 2. PRELOADER DISMISSAL
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 450);
  }
});

// 2. NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 3. MOBILE MENU TOGGLE
const mobileToggle = document.getElementById('mobileToggle');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileToggle && mobileDrawer) {
  mobileToggle.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
  });

  mobileCloseBtn.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });
}

// 4. CONSULTATION & CONTACT MODAL
const contactModal = document.getElementById('contactModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const consultationForm = document.getElementById('consultationForm');
const formSuccessMessage = document.getElementById('formSuccessMessage');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (contactModal) contactModal.classList.add('open');
  });
});

if (modalCloseBtn && contactModal) {
  modalCloseBtn.addEventListener('click', () => {
    contactModal.classList.remove('open');
  });

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove('open');
    }
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (formSuccessMessage) {
    formSuccessMessage.classList.add('show');
    setTimeout(() => {
      consultationForm.reset();
      setTimeout(() => {
        if (contactModal) contactModal.classList.remove('open');
        formSuccessMessage.classList.remove('show');
      }, 1500);
    }, 1200);
  }
}

// 5. NUMBER COUNTERS ANIMATION (IntersectionObserver)
const counterCards = document.querySelectorAll('.counter-card');
let countersStarted = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  });
}, { threshold: 0.3 });

counterCards.forEach(card => observer.observe(card));

function animateCounters() {
  counterCards.forEach(card => {
    const valElem = card.querySelector('.counter-val');
    const target = parseInt(card.getAttribute('data-target'), 10);
    if (!valElem || isNaN(target)) return;

    let current = 0;
    const duration = 1800;
    const stepTime = Math.abs(Math.floor(duration / target));
    const increment = target > 50 ? Math.ceil(target / 40) : 1;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        valElem.textContent = target;
        clearInterval(timer);
      } else {
        valElem.textContent = current;
      }
    }, stepTime);
  });
}

// 6. HERO TECH ORBIT PARALLAX
const techOrbit = document.getElementById('techOrbit');
if (techOrbit && window.innerWidth > 992) {
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (clientX - centerX) / 45;
    const deltaY = (clientY - centerY) / 45;

    const nodes = document.querySelectorAll('.tech-node');
    nodes.forEach((node, idx) => {
      const depth = (idx + 1) * 0.18;
      node.style.transform = `translate(calc(var(--tx) + ${deltaX * depth}px), calc(var(--ty) + ${deltaY * depth}px))`;
    });
  });
}

// 7. INTERACTIVE PROJECT SHOWCASE SWITCHER
const projectData = {
  'doma': {
    title: 'Doma Collection',
    desc: "A modern, conversion-focused website designed to elevate Doma's digital presence and user experience.",
    tech: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
    screenClass: 'screen-doma',
    screenTitle: 'DOMA LUXURY LIVING',
    screenSub: 'Modern Interior Furniture & Architecture',
    url: 'https://doma-collection.com'
  },
  'skill-india': {
    title: 'Skill India Portal',
    desc: 'A high-performance portal built for the Skill India initiative to showcase their work and government programs across India.',
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    screenClass: 'screen-skill',
    screenTitle: 'SKILL INDIA INITIATIVE',
    screenSub: 'National Skill Development Mission',
    url: 'https://skillindia.gov.in-portal'
  },
  'mrunal': {
    title: 'Mrunal Maddy',
    desc: 'An elegant e-commerce store designed to deliver a seamless shopping experience with custom checkout workflows.',
    tech: ['Shopify Plus', 'Liquid', 'Tailwind', 'Custom API'],
    screenClass: 'screen-mrunal',
    screenTitle: 'MRUNAL MADDY FASHION',
    screenSub: 'Couture & Designer Apparel Store',
    url: 'https://mrunalmaddy.com'
  },
  'radian': {
    title: 'Radian PVC Kitchen',
    desc: 'A bold and immersive website for a modern kitchen brand with 3D product view catalog and instant quote estimator.',
    tech: ['Next.js', 'Three.js', 'Tailwind', 'Node.js'],
    screenClass: 'screen-radian',
    screenTitle: 'RADIAN PVC KITCHEN & INTERIOR',
    screenSub: 'Modular Kitchens & Wardrobes',
    url: 'https://radiankitchens.com'
  }
};

function switchProject(key) {
  const p = projectData[key];
  if (!p) return;

  // Update Active Class on items
  document.querySelectorAll('.project-item-card').forEach(card => {
    card.classList.remove('active');
    if (card.getAttribute('data-project') === key) {
      card.classList.add('active');
    }
  });

  // Update Featured Card elements with smooth transitions
  const activeTitle = document.getElementById('activeProjectTitle');
  const activeDesc = document.getElementById('activeProjectDesc');
  const activeTech = document.getElementById('activeProjectTech');
  const mockup = document.getElementById('activeProjectMockup');

  if (activeTitle) activeTitle.textContent = p.title;
  if (activeDesc) activeDesc.textContent = p.desc;

  if (activeTech) {
    activeTech.innerHTML = p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');
  }

  if (mockup) {
    mockup.innerHTML = `
      <div class="browser-mockup-frame">
        <div class="browser-header">
          <div class="browser-dots">
            <span class="b-dot red"></span>
            <span class="b-dot yellow"></span>
            <span class="b-dot green"></span>
          </div>
          <div class="browser-url-bar">${p.url}</div>
        </div>
        <div class="browser-screen" style="background: radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%); color: #fff;">
          <div class="screen-hero-preview">
            <h4 style="font-size: 1.1rem; font-weight: 800; letter-spacing: 2px; color: #93c5fd; margin-bottom: 6px;">${p.screenTitle}</h4>
            <p style="font-size: 0.75rem; color: #cbd5e1; margin-bottom: 14px;">${p.screenSub}</p>
            <div class="screen-btn-preview" style="display: inline-block; background: #2563eb; padding: 6px 16px; border-radius: 9999px; font-size: 0.7rem; font-weight: 700;">Explore Platform</div>
          </div>
        </div>
      </div>
    `;
  }
}

// 8. TESTIMONIALS SLIDER
const testimonials = [
  {
    name: 'Rakib Mohammad',
    avatar: 'RM',
    country: 'India',
    role: 'E-Commerce Director',
    text: '"I had the opportunity to be involved in an e-commerce website project, and the attention to detail was excellent. Product pages, filters, mobile responsiveness, and speed optimization were done thoughtfully. The team clearly understands how online businesses work."',
    m1: '+45%',
    m2: '+60%',
    m3: '+35%'
  },
  {
    name: 'Das Gourav',
    avatar: 'DG',
    country: 'India',
    role: 'Managing Director, TechFlow',
    text: '"Pixline Studio delivered our custom ERP & Diamond CRM solution seamlessly. The process was transparent from day one, and their local support team is always available to help. We have scaled our business significantly with their software."',
    m1: '+55%',
    m2: '+80%',
    m3: '+40%'
  },
  {
    name: 'Patrick Hermann',
    avatar: 'PH',
    country: 'Germany',
    role: 'CEO, Artgram',
    text: '"Working with Pixline Studio was smooth, professional, and efficient. They built our web platform with superb craftsmanship and modern animations. Highly recommended for international companies seeking top-tier engineering."',
    m1: '+70%',
    m2: '+95%',
    m3: '+50%'
  }
];

let currentTestiIndex = 0;

function setTestimonial(idx) {
  currentTestiIndex = idx;
  const t = testimonials[currentTestiIndex];
  if (!t) return;

  const card = document.getElementById('mainTestimonialCard');
  if (card) {
    card.style.opacity = '0.65';
    card.style.transform = 'scale(0.99)';
  }

  setTimeout(() => {
    const avatar = document.getElementById('clientAvatar');
    const name = document.getElementById('clientName');
    const country = document.getElementById('clientCountry');
    const role = document.getElementById('clientRole');
    const text = document.getElementById('testimonialText');
    const m1 = document.getElementById('metric1Val');
    const m2 = document.getElementById('metric2Val');
    const m3 = document.getElementById('metric3Val');

    if (avatar) avatar.textContent = t.avatar;
    if (name) name.textContent = t.name;
    if (country) country.textContent = t.country;
    if (role) role.textContent = t.role;
    if (text) text.textContent = t.text;
    if (m1) m1.textContent = t.m1;
    if (m2) m2.textContent = t.m2;
    if (m3) m3.textContent = t.m3;

    // Update active tab buttons
    for (let i = 0; i < testimonials.length; i++) {
      const tab = document.getElementById(`testiTab${i}`);
      if (tab) {
        if (i === currentTestiIndex) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      }
    }

    if (card) {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    }
  }, 120);
}

const prevTestiBtn = document.getElementById('prevTestiBtn');
const nextTestiBtn = document.getElementById('nextTestiBtn');

if (prevTestiBtn) {
  prevTestiBtn.addEventListener('click', () => {
    let newIdx = currentTestiIndex - 1;
    if (newIdx < 0) newIdx = testimonials.length - 1;
    setTestimonial(newIdx);
  });
}

if (nextTestiBtn) {
  nextTestiBtn.addEventListener('click', () => {
    let newIdx = currentTestiIndex + 1;
    if (newIdx >= testimonials.length) newIdx = 0;
    setTestimonial(newIdx);
  });
}
