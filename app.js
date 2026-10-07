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

// =========================================================
// 8. MODERN TECHNOLOGIES STACK TABS
// =========================================================
const techTabButtons = document.querySelectorAll('.tech-tab-btn');
const techPanels = document.querySelectorAll('.tech-panel');
const techUnderline = document.querySelector('.tech-nav-underline');

function updateTechUnderline() {
  const activeBtn = document.querySelector('.tech-tab-btn.active');
  const underline = document.querySelector('.tech-nav-underline');
  if (activeBtn && underline) {
    underline.style.left = `${activeBtn.offsetLeft}px`;
    underline.style.width = `${activeBtn.offsetWidth}px`;
  }
}

if (techTabButtons.length > 0) {
  techTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tech-tab');
      
      techTabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      
      techPanels.forEach(panel => {
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
      
      updateTechUnderline();
    });
  });

  window.addEventListener('resize', updateTechUnderline);
  window.addEventListener('load', updateTechUnderline);
  setTimeout(updateTechUnderline, 200);
}

// =========================================================
// 9. 3D INTERACTIVE ROTATING HOLOGRAPHIC GLOBE (THREE.JS)
// =========================================================
(function init3DGlobe() {
  const canvas = document.getElementById('hero3dGlobeCanvas');
  const container = document.getElementById('heroGlobeContainer');
  if (!canvas || !container || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 2.9;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Main Root Globe Group
  const globeGroup = new THREE.Group();
  globeGroup.rotation.x = 0.22; // Natural Earth axial tilt
  scene.add(globeGroup);

  const GLOBE_RADIUS = 1.0;

  // 1. Dark Core Sphere with Subtle Green Rim Lighting
  const coreGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 64, 64);
  const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0x020702,
    emissive: 0x011301,
    specular: 0x2bf014,
    shininess: 25,
    transparent: true,
    opacity: 0.95
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  globeGroup.add(coreMesh);

  // 2. Atmosphere Outer Glow Mesh
  const atmoGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.03, 48, 48);
  const atmoMaterial = new THREE.MeshBasicMaterial({
    color: 0x1fc30a,
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending
  });
  const atmoMesh = new THREE.Mesh(atmoGeometry, atmoMaterial);
  globeGroup.add(atmoMesh);

  // 3. Procedural Geographically-Accurate Earth Continent Dot Matrix
  // Generate offscreen world map raster
  const mapCanvas = document.createElement('canvas');
  mapCanvas.width = 720;
  mapCanvas.height = 360;
  const ctx = mapCanvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
  ctx.fillStyle = '#fff';

  // Helper to map longitude [-180, 180] and latitude [90, -90] to canvas [0, 720], [0, 360]
  function toX(lon) { return ((lon + 180) / 360) * mapCanvas.width; }
  function toY(lat) { return ((90 - lat) / 180) * mapCanvas.height; }

  function drawContinent(points) {
    if (!points.length) return;
    ctx.beginPath();
    ctx.moveTo(toX(points[0][0]), toY(points[0][1]));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(toX(points[i][0]), toY(points[i][1]));
    }
    ctx.closePath();
    ctx.fill();
  }

  // Draw World Continents
  // North America
  drawContinent([
    [-168, 65], [-160, 71], [-130, 70], [-100, 70], [-80, 60], [-60, 50],
    [-65, 44], [-75, 35], [-80, 25], [-82, 23], [-88, 16], [-77, 8],
    [-84, 9], [-95, 16], [-105, 20], [-110, 24], [-120, 34], [-124, 48],
    [-140, 60], [-165, 60]
  ]);
  // Greenland
  drawContinent([[-50, 60], [-20, 70], [-25, 82], [-60, 83], [-55, 70]]);
  // South America
  drawContinent([
    [-77, 8], [-60, 10], [-50, 0], [-35, -5], [-35, -10], [-40, -22],
    [-50, -30], [-55, -40], [-65, -55], [-75, -50], [-72, -40], [-70, -20],
    [-80, -5], [-77, 8]
  ]);
  // Europe
  drawContinent([
    [-10, 36], [-5, 44], [0, 50], [5, 58], [15, 60], [25, 71],
    [30, 70], [40, 65], [35, 50], [28, 41], [15, 38], [0, 36]
  ]);
  // Scandinavia & UK
  drawContinent([[5, 58], [10, 65], [18, 70], [28, 70], [20, 60], [12, 56]]);
  drawContinent([[-5, 50], [-2, 58], [0, 56], [-3, 51]]);
  // Africa
  drawContinent([
    [-17, 15], [-5, 36], [12, 37], [25, 32], [33, 28], [43, 12],
    [51, 12], [42, -5], [35, -25], [20, -35], [18, -34], [12, -18],
    [8, 5], [-5, 5], [-17, 15]
  ]);
  // Madagascar
  drawContinent([[43, -12], [50, -14], [47, -25], [44, -24]]);
  // Asia
  drawContinent([
    [30, 40], [40, 45], [60, 45], [80, 50], [100, 55], [120, 60],
    [140, 70], [170, 65], [160, 50], [140, 45], [130, 35], [120, 30],
    [110, 20], [105, 10], [100, 5], [90, 22], [80, 10], [75, 15],
    [70, 25], [60, 25], [50, 30], [35, 32]
  ]);
  // India Subcontinent
  drawContinent([[68, 24], [72, 22], [76, 10], [80, 13], [88, 22], [78, 30]]);
  // Japan
  drawContinent([[130, 32], [140, 36], [142, 44], [135, 35]]);
  // Southeast Asia & Indonesia
  drawContinent([[100, 5], [105, -5], [115, -8], [125, -8], [120, 2], [105, 10]]);
  // Australia & New Zealand
  drawContinent([
    [114, -22], [125, -15], [135, -12], [148, -20], [153, -28],
    [150, -38], [140, -38], [130, -32], [115, -34]
  ]);
  drawContinent([[168, -38], [175, -40], [178, -46], [168, -45]]);

  const mapData = ctx.getImageData(0, 0, mapCanvas.width, mapCanvas.height).data;

  // Convert map image into 3D Glowing Spherical Particle Cloud
  const dotPositions = [];
  const dotColors = [];
  const color1 = new THREE.Color(0x2bf014); // Vibrant neon green
  const color2 = new THREE.Color(0x1fc30a); // Brand emerald green
  const color3 = new THREE.Color(0x4ade80); // Bright green highlight

  const latStep = 1.3;
  const lonStep = 1.3;

  for (let lat = -88; lat <= 88; lat += latStep) {
    const phi = (90 - lat) * (Math.PI / 180);
    const radiusAtLat = GLOBE_RADIUS * Math.sin(phi);
    const y = GLOBE_RADIUS * Math.cos(phi);

    for (let lon = -180; lon <= 180; lon += lonStep) {
      const xMap = Math.floor(toX(lon));
      const yMap = Math.floor(toY(lat));
      const pixelIndex = (yMap * mapCanvas.width + xMap) * 4;

      // If continent landmass pixel is white
      if (mapData[pixelIndex] > 100) {
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -radiusAtLat * Math.cos(theta);
        const z = radiusAtLat * Math.sin(theta);

        dotPositions.push(x, y, z);

        // Random subtle neon color variations
        const rand = Math.random();
        const col = rand > 0.6 ? color1 : (rand > 0.25 ? color2 : color3);
        dotColors.push(col.r, col.g, col.b);
      }
    }
  }

  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
  dotGeometry.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));

  // Glowing particle texture
  function createParticleTexture() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(43, 240, 20, 0.9)');
    grad.addColorStop(0.7, 'rgba(31, 195, 10, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(pCanvas);
  }

  const particleTexture = createParticleTexture();

  const dotMaterial = new THREE.PointsMaterial({
    size: 0.024,
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const globePoints = new THREE.Points(dotGeometry, dotMaterial);
  globeGroup.add(globePoints);

  // 4. City Hubs & Pulsing Connecting Flight/Data Arcs
  function latLonToVector3(lat, lon, radius = GLOBE_RADIUS) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  const hubs = [
    { name: 'India (Surat)', lat: 21.23, lon: 72.88 },
    { name: 'Dubai', lat: 25.20, lon: 55.27 },
    { name: 'London', lat: 51.50, lon: -0.12 },
    { name: 'New York', lat: 40.71, lon: -74.00 },
    { name: 'Frankfurt', lat: 50.11, lon: 8.68 },
    { name: 'Singapore', lat: 1.35, lon: 103.81 },
    { name: 'Sydney', lat: -33.86, lon: 151.20 }
  ];

  // Add Glowing Hub Points
  const hubGroup = new THREE.Group();
  globeGroup.add(hubGroup);

  hubs.forEach(hub => {
    const pos = latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS * 1.01);
    
    // Hub Core Dot
    const hGeom = new THREE.SphereGeometry(0.018, 16, 16);
    const hMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hMesh = new THREE.Mesh(hGeom, hMat);
    hMesh.position.copy(pos);
    hubGroup.add(hMesh);

    // Hub Outer Pulse Ring
    const ringGeom = new THREE.RingGeometry(0.025, 0.038, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2bf014,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.position.copy(pos);
    ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
    hubGroup.add(ringMesh);
  });

  // Create 3D Curved Arcs Between Global Hubs
  const connections = [
    [0, 1], // India -> Dubai
    [0, 2], // India -> London
    [0, 3], // India -> New York
    [0, 4], // India -> Frankfurt
    [0, 5], // India -> Singapore
    [1, 2], // Dubai -> London
    [2, 3]  // London -> New York
  ];

  const arcMaterial = new THREE.LineBasicMaterial({
    color: 0x2bf014,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });

  const animatedBeacons = [];

  connections.forEach(([i, j]) => {
    const p1 = latLonToVector3(hubs[i].lat, hubs[i].lon, GLOBE_RADIUS);
    const p2 = latLonToVector3(hubs[j].lat, hubs[j].lon, GLOBE_RADIUS);

    // Calculate elevated midpoint for 3D arch
    const dist = p1.distanceTo(p2);
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const midLength = mid.length();
    mid.normalize();
    mid.multiplyScalar(midLength + dist * 0.38);

    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    const curvePoints = curve.getPoints(45);
    const curveGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const arcLine = new THREE.Line(curveGeom, arcMaterial);
    globeGroup.add(arcLine);

    // Luminous moving packet on the arc
    const beaconGeom = new THREE.SphereGeometry(0.016, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const beaconMesh = new THREE.Mesh(beaconGeom, beaconMat);
    globeGroup.add(beaconMesh);

    animatedBeacons.push({
      mesh: beaconMesh,
      curve: curve,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.004
    });
  });

  // 5. Multiple Concentric Tilted Neon Orbital Rings
  const orbitsGroup = new THREE.Group();
  scene.add(orbitsGroup);

  function createOrbitalRing(radiusX, radiusY, tiltX, tiltY, tiltZ, opacity = 0.6) {
    const ringCurve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0);
    const rPoints = ringCurve.getPoints(128);
    const r3DPoints = rPoints.map(p => new THREE.Vector3(p.x, p.y, 0));
    const rGeom = new THREE.BufferGeometry().setFromPoints(r3DPoints);
    const rMat = new THREE.LineBasicMaterial({
      color: 0x2bf014,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Line(rGeom, rMat);
    ring.rotation.set(tiltX, tiltY, tiltZ);
    return ring;
  }

  const ring1 = createOrbitalRing(1.48, 1.48, Math.PI / 3.2, 0.25, 0.4, 0.7);
  const ring2 = createOrbitalRing(1.68, 1.68, -Math.PI / 4, 0.35, -0.2, 0.55);
  const ring3 = createOrbitalRing(1.32, 1.32, Math.PI / 2.3, -0.4, 0.8, 0.45);

  orbitsGroup.add(ring1);
  orbitsGroup.add(ring2);
  orbitsGroup.add(ring3);

  // Satellites orbiting around the orbital rings
  const satellites = [
    { ringRadius: 1.48, tiltX: Math.PI / 3.2, tiltY: 0.25, tiltZ: 0.4, angle: 0, speed: 0.015 },
    { ringRadius: 1.68, tiltX: -Math.PI / 4, tiltY: 0.35, tiltZ: -0.2, angle: 2.2, speed: -0.012 },
    { ringRadius: 1.32, tiltX: Math.PI / 2.3, tiltY: -0.4, tiltZ: 0.8, angle: 4.1, speed: 0.018 }
  ];

  satellites.forEach(sat => {
    const sGeom = new THREE.SphereGeometry(0.025, 16, 16);
    const sMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sMesh = new THREE.Mesh(sGeom, sMat);
    
    // Outer satellite glow
    const sGlowGeom = new THREE.SphereGeometry(0.05, 16, 16);
    const sGlowMat = new THREE.MeshBasicMaterial({
      color: 0x2bf014,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const sGlowMesh = new THREE.Mesh(sGlowGeom, sGlowMat);
    sMesh.add(sGlowMesh);

    scene.add(sMesh);
    sat.mesh = sMesh;
  });

  // 6. Ambient Stars Particle Field
  const starPositions = [];
  for (let s = 0; s < 250; s++) {
    const sx = (Math.random() - 0.5) * 8;
    const sy = (Math.random() - 0.5) * 8;
    const sz = (Math.random() - 0.5) * 6 - 2;
    starPositions.push(sx, sy, sz);
  }
  const starGeom = new THREE.BufferGeometry();
  starGeom.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x39ff14,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
  });
  const starField = new THREE.Points(starGeom, starMat);
  scene.add(starField);

  // 7. Interactive Drag & Momentum Spin Controls
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let velX = 0;
  let velY = 0;
  let targetRotationY = 0;
  let targetRotationX = 0.22;

  function onPointerDown(e) {
    isDragging = true;
    prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  }

  function onPointerMove(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    if (isDragging) {
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      velX = deltaX * 0.005;
      velY = deltaY * 0.005;
      globeGroup.rotation.y += velX;
      globeGroup.rotation.x += velY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    } else {
      // Gentle parallax on hover
      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width - 0.5) * 0.3;
      const ny = ((clientY - rect.top) / rect.height - 0.5) * 0.3;
      targetRotationY = nx;
      targetRotationX = 0.22 + ny;
    }
  }

  function onPointerUp() {
    isDragging = false;
  }

  container.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  container.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Responsive Resize Handling
  function onWindowResize() {
    if (!container || !canvas) return;
    const width = container.clientWidth;
    const height = container.clientHeight || width;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', onWindowResize);

  // 8. Main 60fps Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Constant auto-rotation with momentum dampening
    if (!isDragging) {
      globeGroup.rotation.y += 0.0035 + velX;
      velX *= 0.95;
      velY *= 0.95;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;
    }

    // Subtle counter-rotation of orbital rings for dynamic depth
    orbitsGroup.rotation.y += 0.0015;
    orbitsGroup.rotation.z += 0.0008;

    // Update moving arc packets
    animatedBeacons.forEach(b => {
      b.progress += b.speed;
      if (b.progress > 1) b.progress = 0;
      const pt = b.curve.getPoint(b.progress);
      b.mesh.position.copy(pt);
    });

    // Update satellites on orbital rings
    satellites.forEach(sat => {
      sat.angle += sat.speed;
      const localX = sat.ringRadius * Math.cos(sat.angle);
      const localY = sat.ringRadius * Math.sin(sat.angle);
      const v = new THREE.Vector3(localX, localY, 0);
      
      const euler = new THREE.Euler(sat.tiltX, sat.tiltY, sat.tiltZ, 'XYZ');
      v.applyEuler(euler);
      v.applyEuler(orbitsGroup.rotation);
      sat.mesh.position.copy(v);
    });

    renderer.render(scene, camera);
  }

  animate();
  setTimeout(onWindowResize, 100);
})();
