(function () {
  'use strict';

  // ---------- Preloader ----------
  // Fast multilingual greetings with language-specific fonts
  var greetings = [
    { text: 'Hello',      lang: 'en' },
    { text: 'नमस्ते',     lang: 'ne' },
    { text: 'Bonjour',    lang: 'fr' },
    { text: 'Hola',       lang: 'es' },
    { text: 'こんにちは',  lang: 'ja' },
    { text: '안녕하세요',  lang: 'ko' },
    { text: 'Ciao',       lang: 'it' },
    { text: 'Olá',        lang: 'pt' },
    { text: 'مرحبا',      lang: 'ar' },
    { text: 'Hallo',      lang: 'de' },
    { text: '你好',       lang: 'zh' },
    { text: 'नमस्कार',    lang: 'hi' },
    { text: 'Salut',      lang: 'fr' },
    { text: 'Hey',        lang: 'en' },
    { text: 'स्वागतम्',   lang: 'ne' }
  ];
  var preloader = document.getElementById('preloader');
  var greetingEl = document.getElementById('preloader-greeting');
  var greetingIndex = 0;
  var greetingInterval = null;

  function applyGreeting(item) {
    if (!greetingEl) return;
    // Remove previous lang-* classes
    greetingEl.className = greetingEl.className.replace(/\blang-\w+/g, '').trim();
    greetingEl.classList.add('preloader-greeting', 'lang-' + item.lang);
    greetingEl.textContent = item.text;
  }

  function cycleGreeting() {
    if (!greetingEl) return;
    greetingEl.classList.add('out');
    setTimeout(function () {
      greetingIndex = (greetingIndex + 1) % greetings.length;
      applyGreeting(greetings[greetingIndex]);
      greetingEl.classList.remove('out');
      void greetingEl.offsetWidth;
      greetingEl.style.animation = 'none';
      void greetingEl.offsetWidth;
      greetingEl.style.animation = '';
    }, 180);
  }

  // Initial class
  if (greetingEl) {
    applyGreeting(greetings[0]);
    greetingInterval = setInterval(cycleGreeting, 520); // faster cycle
  }

  function hidePreloader() {
    if (!preloader) return;
    if (greetingInterval) clearInterval(greetingInterval);
    if (greetingEl) {
      greetingEl.classList.add('out');
      setTimeout(function () {
        applyGreeting({ text: 'नमस्ते', lang: 'ne' });
        greetingEl.classList.remove('out');
        void greetingEl.offsetWidth;
      }, 160);
    }
    setTimeout(function () {
      preloader.classList.add('fade-out');
      setTimeout(function () { preloader.style.display = 'none'; }, 700);
    }, 550);
  }

  var minTime = 2400; // slightly faster overall
  var startTime = Date.now();
  function tryHide() {
    var wait = Math.max(0, minTime - (Date.now() - startTime));
    setTimeout(hidePreloader, wait);
  }
  if (document.readyState === 'complete') tryHide();
  else window.addEventListener('load', tryHide);

  // ---------- Year ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Back to top ----------
  var backTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) backTop && backTop.classList.add('visible');
    else backTop && backTop.classList.remove('visible');
  }, { passive: true });
  backTop && backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Speak tagline ----------
  var speakBtn = document.getElementById('speak-btn');
  speakBtn && speakBtn.addEventListener('click', function () {
    if (!window.speechSynthesis) return;
    var u = new SpeechSynthesisUtterance(
      'Ayush Dahal. SEO Specialist, Digital Marketer, and Web Developer based in Kathmandu, Nepal.'
    );
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  });

  // ---------- Skills ----------
  var skills = [
    { name: 'SEO (On & Off Page)', icon: 'fa-solid fa-magnifying-glass-chart' },
    { name: 'Digital Marketing', icon: 'fa-solid fa-bullhorn' },
    { name: 'Content & Copywriting', icon: 'fa-solid fa-pen-nib' },
    { name: 'Google Ads / SEM', icon: 'fa-brands fa-google' },
    { name: 'WordPress SEO', icon: 'fa-brands fa-wordpress' },
    { name: 'HTML5 & CSS3', icon: 'fa-brands fa-html5' },
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'Tailwind CSS', icon: 'fa-solid fa-wind' },
    { name: 'Node.js / Express', icon: 'fa-brands fa-node-js' },
    { name: 'Git & GitHub', icon: 'fa-brands fa-git-alt' },
    { name: 'Technical Writing', icon: 'fa-solid fa-file-lines' },
    { name: 'Analytics', icon: 'fa-solid fa-chart-line' }
  ];
  var skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = skills.map(function (s) {
      return '<div class="skill-chip"><i class="' + s.icon + '"></i><span>' + s.name + '</span></div>';
    }).join('');
  }

  // ---------- Projects ----------
  var projects = [
    {
      title: 'Personal Portfolio Website',
      description: 'Responsive scrapbook-style portfolio with multilingual loading screen, contact form, and security-conscious practices — built during internship at Codelivly Security Hub.',
      tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
      featured: true,
      icon: 'fa-solid fa-laptop-code'
    },
    {
      title: 'SEO Growth — 5K Treks',
      description: 'As SEO Analyst, improved organic visibility and keyword performance for a travel & trekking brand through content optimization and search analytics.',
      tags: ['SEO', 'Keywords', 'Analytics'],
      featured: true,
      icon: 'fa-solid fa-chart-line'
    },
    {
      title: 'Nord Extreme Himalaya',
      description: 'Digital marketing and SEO support for an adventure / Himalayan travel brand — content, technical SEO, and growth campaigns.',
      tags: ['Marketing', 'SEO', 'Content'],
      featured: false,
      icon: 'fa-solid fa-mountain'
    },
    {
      title: 'Secure Contact Form API',
      description: 'Node.js/Express endpoint with validation, sanitization, honeypot bot protection, and rate limiting for portfolio submissions.',
      tags: ['Node.js', 'Express', 'Security'],
      featured: false,
      icon: 'fa-solid fa-shield-halved'
    }
  ];
  var projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map(function (p) {
      var tags = p.tags.map(function (t) {
        return '<span>' + t + '</span>';
      }).join('');
      var badge = p.featured ? '<span class="project-badge">Featured</span>' : '';
      return (
        '<article class="project-card">' +
          badge +
          '<div class="project-thumb"><i class="' + p.icon + '"></i></div>' +
          '<div class="project-body">' +
            '<h3>' + p.title + '</h3>' +
            '<p>' + p.description + '</p>' +
            '<div class="project-tags">' + tags + '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  // ---------- Contact form ----------
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('submit-btn');
  var btnText = document.getElementById('btn-text');
  var btnIcon = document.getElementById('btn-icon');
  var formStatus = document.getElementById('form-status');

  function sanitize(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML.trim();
  }
  function showError(input, msg) {
    var err = input.parentElement.querySelector('.error-msg');
    if (err) { err.textContent = msg; err.classList.remove('hidden'); }
    input.classList.add('border-red');
  }
  function clearError(input) {
    var err = input.parentElement.querySelector('.error-msg');
    if (err) { err.textContent = ''; err.classList.add('hidden'); }
    input.classList.remove('border-red');
  }
  function validate() {
    var ok = true;
    if (form.website && form.website.value) return false;
    clearError(form.name); clearError(form.email); clearError(form.message);
    if (!form.name.value.trim() || form.name.value.trim().length < 2) {
      showError(form.name, 'Please enter your name.'); ok = false;
    }
    if (!form.email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) {
      showError(form.email, 'Please enter a valid email.'); ok = false;
    }
    if (!form.message.value.trim() || form.message.value.trim().length < 10) {
      showError(form.message, 'Message should be at least 10 characters.'); ok = false;
    }
    return ok;
  }

  form && form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';
    setTimeout(function () {
      formStatus.className = 'form-status ok';
      formStatus.textContent = 'Thank you! Your message has been sent.';
      formStatus.classList.remove('hidden');
      form.reset();
      submitBtn.disabled = false;
      btnText.textContent = 'Send message';
      btnIcon.className = 'fa-solid fa-paper-plane';
      setTimeout(function () { formStatus.classList.add('hidden'); }, 5000);
    }, 1100);
  });
  form && form.querySelectorAll('input, textarea').forEach(function (el) {
    el.addEventListener('input', function () { clearError(el); });
  });
})();
