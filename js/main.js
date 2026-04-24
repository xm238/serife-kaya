(() => {
  const q = (s, p = document) => p.querySelector(s);
  const qa = (s, p = document) => [...p.querySelectorAll(s)];

  const preloader = q('.site-preloader');
  window.addEventListener('load', () => {
    preloader?.classList.add('hidden');
    setTimeout(() => preloader?.remove(), 450);
  });

  const menuToggle = q('.menu-toggle');
  const nav = q('.nav');
  menuToggle?.addEventListener('click', () => nav?.classList.toggle('open'));

  const heroSlides = qa('.hero-slide');
  const heroDots = qa('.hero-dot');
  let heroIndex = 0;
  function setHero(i) {
    heroSlides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    heroDots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    heroIndex = i;
  }
  heroDots.forEach((dot, idx) => dot.addEventListener('click', () => setHero(idx)));
  if (heroSlides.length > 1) {
    setInterval(() => setHero((heroIndex + 1) % heroSlides.length), 4800);
  }

  const counters = qa('[data-count]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const duration = 1200;
      const start = performance.now();
      const from = 0;
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(from + (target - from) * p).toLocaleString('tr-TR');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: .45 });
  counters.forEach((c) => io.observe(c));

  const testimonials = qa('.testimonial');
  const prev = q('[data-t-prev]');
  const next = q('[data-t-next]');
  let tIndex = 0;
  function setT(i) {
    testimonials.forEach((t, idx) => t.classList.toggle('active', idx === i));
    tIndex = i;
  }
  prev?.addEventListener('click', () => setT((tIndex - 1 + testimonials.length) % testimonials.length));
  next?.addEventListener('click', () => setT((tIndex + 1) % testimonials.length));
  if (testimonials.length > 1) setInterval(() => setT((tIndex + 1) % testimonials.length), 5600);

  qa('.faq-item').forEach((item) => {
    const qBtn = item.querySelector('.faq-q');
    qBtn?.addEventListener('click', () => item.classList.toggle('open'));
  });

  const lightbox = q('.lightbox');
  const lightboxImg = q('.lightbox img');
  qa('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  q('.lightbox-close')?.addEventListener('click', () => lightbox?.classList.remove('open'));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });

  const form = q('#bookingForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const service = String(data.get('service') || '').trim();
    const date = String(data.get('date') || '').trim();
    const note = String(data.get('note') || '').trim();
    if (!name || !phone || !service) {
      alert('Lütfen ad, telefon ve hizmet alanlarını doldurun.');
      return;
    }
    const msg = encodeURIComponent(
      "Merhaba, Şerife Kaya Beauty için randevu talebim var.\n" +
      "Ad: " + name + "\n" +
      "Telefon: " + phone + "\n" +
      "Hizmet: " + service + "\n" +
      "Tarih: " + (date || "Belirtilecek") + "\n" +
      "Not: " + (note || "-")
    );
    window.open("https://wa.me/905330568381?text=" + msg, '_blank');
  });

  const reveals = qa('.reveal');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: .1 });
  reveals.forEach((r) => revObs.observe(r));
})();
