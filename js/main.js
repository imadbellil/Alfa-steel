// Lottie Animations
lottie.loadAnimation({
  container: document.getElementById('lottie-hero-2'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets2.lottiefiles.com/packages/lf20_3rwasyjy.json'
});

lottie.loadAnimation({
  container: document.getElementById('lottie-why'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets10.lottiefiles.com/packages/lf20_9wpyhdzo.json',
  rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
});


// WhatsApp Button Container
const whatsappLink = document.createElement('a');
whatsappLink.href = "https://wa.me/213561631866";
whatsappLink.target = "_blank";
whatsappLink.id = "whatsapp-btn";
whatsappLink.setAttribute('aria-label', 'Contacter sur WhatsApp');
whatsappLink.style.cssText = `
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9999;
  text-decoration: none;
`;

// Inner Button
const button = document.createElement('button');
button.setAttribute('aria-label', 'Contacter sur WhatsApp');
button.className = "whatsapp-pulse";

// WhatsApp icon
button.innerHTML = `<i class="fab fa-whatsapp"></i>`;

// Add to DOM
whatsappLink.appendChild(button);
document.body.appendChild(whatsappLink);

// Unique CSS styles
const style = document.createElement('style');
style.textContent = `
  .whatsapp-pulse {
    background: #25D366;
    border: none;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    position: relative;
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
    animation: whatsapp-pulse-anim 2s infinite;
    transition: transform 0.3s ease;
  }

  .whatsapp-pulse:hover {
    transform: scale(1.15);
  }

  .whatsapp-pulse i {
    color: white;
    font-size: 2em;
    z-index: 2;
  }

  .whatsapp-pulse::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(37, 211, 102, 0.2);
    z-index: 1;
    filter: blur(6px);
  }

  @keyframes whatsapp-pulse-anim {
    0% {
      box-shadow: 0 0 0 0 rgba(37,211,102,0.4);
    }
    70% {
      box-shadow: 0 0 0 18px rgba(37,211,102,0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(37,211,102,0);
    }
  }
`;
document.head.appendChild(style);

// Sticky nav active link + smooth scroll
const navLinks = document.querySelectorAll('nav a');
const sections = Array.from(document.querySelectorAll('section'));

function setActiveLink() {
  let index = sections.length;
  while (--index && window.scrollY + 80 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove('active'));
  navLinks[index].classList.add('active');
}
setActiveLink();
window.addEventListener('scroll', setActiveLink);

// Hamburger menu
const navToggle = document.getElementById('navToggle');
const navUl = document.getElementById('navLinks');

function closeMenuOnClickOutside(e) {
  if (!navUl.classList.contains('open')) return;
  // If click is on a nav link, do nothing (let link handler close menu)
  if (e.target.closest('a') && navUl.contains(e.target)) return;
  // If click is inside navUl (but not on a link), close menu
  if (navUl.contains(e.target) || !navToggle.contains(e.target)) {
    navUl.classList.remove('open');
    document.removeEventListener('click', closeMenuOnClickOutside, true);
  }
}

if (navToggle && navUl) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navUl.classList.toggle('open');
    if (navUl.classList.contains('open')) {
      setTimeout(() => document.addEventListener('click', closeMenuOnClickOutside, true), 0);
    } else {
      document.removeEventListener('click', closeMenuOnClickOutside, true);
    }
  });
  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navUl.classList.toggle('open');
      if (navUl.classList.contains('open')) {
        setTimeout(() => document.addEventListener('click', closeMenuOnClickOutside, true), 0);
      } else {
        document.removeEventListener('click', closeMenuOnClickOutside, true);
      }
    }
  });
  navUl.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    navUl.classList.remove('open');
    document.removeEventListener('click', closeMenuOnClickOutside, true);
  }));
  const navCloseBtn = navUl.querySelector('.nav-close-btn');
  if (navCloseBtn) {
    navCloseBtn.addEventListener('click', function(e) {
      navUl.classList.remove('open');
      document.removeEventListener('click', closeMenuOnClickOutside, true);
    });
  }
}

// Smooth scroll for anchor links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-in animations
function revealOnScroll() {
  document.querySelectorAll('.section-title, .section-desc, .about-content, .products-grid, .services-list, .why-choose, .contact-wrap').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
  // Join Us section scroll-in
  const joinUs = document.querySelector('.join-us-section');
  if (joinUs) {
    const joinUsRect = joinUs.getBoundingClientRect();
    if (joinUsRect.top < window.innerHeight - 80) {
      // Animate headline and subheadline
      joinUs.querySelectorAll('.section-title, .section-desc').forEach(el => el.classList.add('visible'));
      // Animate perks
      joinUs.querySelectorAll('.join-us-perks li').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 120 + i * 80);
      });
      // Animate CTA
      const cta = joinUs.querySelector('.join-us-cta');
      if (cta) setTimeout(() => cta.classList.add('visible'), 600);
      // Animate visual
      const visual = joinUs.querySelector('.join-us-carousel-placeholder');
      if (visual) setTimeout(() => visual.classList.add('visible'), 400);
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Year in footer
document.getElementById('displayYear').textContent = new Date().getFullYear();

// Modal logic for product variations
const modal = document.getElementById('variationModal');
const modalContent = modal.querySelector('.modal-content');
const modalTitle = document.getElementById('modalTitle');
const modalVariations = document.getElementById('modalVariations');

const closeModal = () => {
  modal.classList.remove('active');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
};

// Open modal with variations
document.querySelectorAll('.product-card').forEach(card => {
  const variations = card.querySelector('.product-variations-data');
  card.addEventListener('click', function(e) {
    if (!e.target.classList.contains('variation-link')) {
      modalTitle.textContent = card.querySelector('h3').textContent;
      modalVariations.innerHTML = '';
      variations.querySelectorAll('.variation-link').forEach(link => {
        const clone = link.cloneNode(true);
        modalVariations.appendChild(clone);
      });
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 10);
      setTimeout(() => modalContent.focus(), 100);
      e.stopPropagation();
    }
  });
  card.addEventListener('keydown', function(e) {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === card) {
      e.preventDefault();
      modalTitle.textContent = card.querySelector('h3').textContent;
      modalVariations.innerHTML = '';
      variations.querySelectorAll('.variation-link').forEach(link => {
        const clone = link.cloneNode(true);
        modalVariations.appendChild(clone);
      });
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 10);
      setTimeout(() => modalContent.focus(), 100);
    }
  });
});

// Close modal on backdrop or close button
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
modal.querySelector('.modal-close').addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (modal.classList.contains('active') && e.key === 'Escape') closeModal();
});

// Prevent click inside modal from closing
modalContent.addEventListener('click', e => e.stopPropagation());

// Preloader logic
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("content").style.display = "block";
});

/* Back to Top Button */
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.setAttribute('aria-label', 'Retour en haut');
backToTopBtn.innerHTML = '<svg width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
backToTopBtn.style.cssText = `
  position:fixed;
  left:24px;
  bottom:104px;
  width:48px;
  height:48px;
  border:none;
  border-radius:50%;
  background:#222;
  color:#fff;
  box-shadow:0 2px 12px rgba(0,0,0,0.15);
  cursor:pointer;
  display:none;
  align-items:center;
  justify-content:center;
  z-index:9999;
  transition:opacity 0.3s,transform 0.3s;
  opacity:0;
  padding:0;
`;
document.body.appendChild(backToTopBtn);

// Responsive adjustments for Back to Top Button
const updateBackToTopPosition = () => {
  if (window.innerWidth < 600) {
    backToTopBtn.style.left = '16px';
    backToTopBtn.style.bottom = '88px';
    backToTopBtn.style.width = '40px';
    backToTopBtn.style.height = '40px';
  } else {
    backToTopBtn.style.left = '24px';
    backToTopBtn.style.bottom = '104px';
    backToTopBtn.style.width = '48px';
    backToTopBtn.style.height = '48px';
  }
};
window.addEventListener('resize', updateBackToTopPosition);
updateBackToTopPosition();

// Show/hide Back to Top Button on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
    setTimeout(() => {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.transform = 'scale(1)';
    }, 10);
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      backToTopBtn.style.display = 'none';
    }, 300);
  }
});

// Scroll to top on click
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


 // Hide preloader when page is fully loaded, but keep it visible a bit longer
    window.addEventListener('load', function() {
      var loader = document.getElementById('steelLoader');
      if(loader) {
        setTimeout(function() {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          setTimeout(function() {
            loader.style.display = 'none';
          }, 400);
        }, 100); // Increased delay before fade out (was 0, now 1200ms)
      }
    });

// Contact Form Submission to Telegram Bot
const botToken = '7966914169:AAHKYei-fsHa1s4EBoKw5KxqW3l4wGHuLfg';
const chatId = '6279056565';

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById('formStatus');
  status.textContent = "Envoi en cours...";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();
  const file = document.getElementById('fileInput').files[0];

  // ✅ Algerian phone number validation
  const algerianPhoneRegex = /^(05|06|07)[0-9]{8}$/;
  if (!algerianPhoneRegex.test(phone)) {
    status.textContent = "Veuillez entrer un numéro de téléphone valide (ex: 0551234567)";
    return;
  }

  // ✅ File type validation
  if (file) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      status.textContent = 'Seuls les fichiers PDF et images sont autorisés.';
      return;
    }
  }

  const telegramText = `*Nouveau consultation:*\n👤 Nom: ${name}\n📧 Email: ${email}\n📞 Téléphone: ${phone}\n📝 Message: ${message}`;

  try {
    // 1. Send message to Telegram
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: 'Markdown'
      })
    });

    // 2. Send file to Telegram if uploaded
    if (file) {
      const tgFormData = new FormData();
      tgFormData.append('chat_id', chatId);
      tgFormData.append('document', file);

      await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: 'POST',
        body: tgFormData
      });
    }

    status.textContent = "Message envoyé avec succès !";
    form.reset();

  } catch (error) {
    console.error(error);
    status.textContent = "Erreur lors de l'envoi. Veuillez réessayer.";
  }
});

// Prevent non-digit input
document.getElementById('phoneInput').addEventListener('input', function (e) {
  this.value = this.value.replace(/\D/g, ''); // Remove all non-digits
});

const fileInput = document.getElementById('fileInput');
const fileLabelText = document.getElementById('fileLabelText');
if (fileInput && fileLabelText) {
  fileInput.addEventListener('change', function () {
    if (this.files.length) {
      fileLabelText.textContent = this.files[0].name;
    } else {
      fileLabelText.textContent = 'Sélectionnez un fichier';
    }
  });
}

// Modern Light Mode Toggle
  (function() {
    const hero = document.getElementById('hero');
    const btn = document.getElementById('hero-light-toggle');
    const icon = document.getElementById('toggle-icon');
    const header = document.querySelector('header');
    let isLight = true; // Default to light mode
    // Set initial state to light mode
    hero.classList.add('light-hero');
    btn.classList.add('active');
    icon.className = 'fas fa-moon';
    header.classList.add('light-navbar');
    btn.addEventListener('click', function() {
      isLight = !isLight;
      hero.classList.toggle('light-hero', isLight);
      btn.classList.toggle('active', isLight);
      icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
      header.classList.toggle('light-navbar', isLight);
    });
  })();


  document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
  }
  document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
  }
  
  // Auto-slide every 3 seconds
  setInterval(function() {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
  }, 5000);

// CV Upload Form Submission to Telegram Bot
const cvForm = document.getElementById('cvUploadForm');
if (cvForm) {
  const cvFileInput = document.getElementById('cvFileInput');
  const cvFileLabelText = document.getElementById('cvFileLabelText');
  const cvFormStatus = document.getElementById('cvFormStatus');
  const cvNameInput = document.getElementById('cvNameInput');
  const cvEmailInput = document.getElementById('cvEmailInput');

  // Update label on file select
  cvFileInput.addEventListener('change', function () {
    if (this.files.length) {
      cvFileLabelText.textContent = this.files[0].name;
    } else {
      cvFileLabelText.textContent = 'Sélectionnez un CV (PDF uniquement)';
    }
  });

  cvForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    cvFormStatus.textContent = '';
    cvFormStatus.className = 'form-status';

    const name = cvNameInput.value.trim();
    const email = cvEmailInput.value.trim();
    const file = cvFileInput.files[0];

    // Validation
    if (!name) {
      cvFormStatus.textContent = 'Veuillez entrer votre nom.';
      cvFormStatus.classList.add('error');
      cvNameInput.focus();
      return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      cvFormStatus.textContent = 'Veuillez entrer un email valide.';
      cvFormStatus.classList.add('error');
      cvEmailInput.focus();
      return;
    }
    if (!file) {
      cvFormStatus.textContent = 'Veuillez sélectionner un fichier CV (PDF uniquement).';
      cvFormStatus.classList.add('error');
      return;
    }
    const allowedTypes = [
      'application/pdf'
    ];
    const allowedExt = ['.pdf'];
    const fileName = file.name.toLowerCase();
    if (!allowedTypes.includes(file.type) && !allowedExt.some(ext => fileName.endsWith(ext))) {
      cvFormStatus.textContent = 'Seuls les fichiers PDF sont autorisés.';
      cvFormStatus.classList.add('error');
      return;
    }
    if (file.size > 8 * 1024 * 1024) { // 8MB limit
      cvFormStatus.textContent = 'Le fichier ne doit pas dépasser 8 Mo.';
      cvFormStatus.classList.add('error');
      return;
    }

    cvFormStatus.textContent = 'Envoi en cours...';
    cvFormStatus.classList.remove('error', 'success');

    // Send message to Telegram
    const telegramText = `*Nouveau CV reçu :*\n👤 Nom: ${name}\n📧 Email: ${email}`;
    try {
      // 1. Send message
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: 'Markdown'
        })
      });
      // 2. Send file
      const tgFormData = new FormData();
      tgFormData.append('chat_id', chatId);
      tgFormData.append('document', file);
      await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: 'POST',
        body: tgFormData
      });
      cvFormStatus.textContent = 'CV envoyé avec succès !';
      cvFormStatus.classList.add('success');
      cvForm.reset();
      cvFileLabelText.textContent = 'Sélectionnez un CV (PDF uniquement)';
    } catch (error) {
      console.error(error);
      cvFormStatus.textContent = "Erreur lors de l'envoi. Veuillez réessayer.";
      cvFormStatus.classList.add('error');
    }
  });
}
