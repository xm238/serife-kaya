(() => {
  const q = (s, p = document) => p.querySelector(s);
  const qa = (s, p = document) => [...p.querySelectorAll(s)];

  const menuBtn = q('.menu-toggle');
  const nav = q('.nav');
  menuBtn?.addEventListener('click', () => nav?.classList.toggle('open'));

  const slider = q('[data-slider]');
  const slides = qa('.hero-slide', slider || document);
  const dots = qa('.dot', slider || document);
  let idx = 0;
  const setSlide = (i) => {
    slides.forEach((s, n) => s.classList.toggle('active', n === i));
    dots.forEach((d, n) => d.classList.toggle('active', n === i));
    idx = i;
  };
  dots.forEach((d, i) => d.addEventListener('click', () => setSlide(i)));
  if (slides.length > 1) setInterval(() => setSlide((idx + 1) % slides.length), 5200);

  const tItems = qa('.testimonial');
  let t = 0;
  const setT = (i) => {
    tItems.forEach((item, n) => item.classList.toggle('active', n === i));
    t = i;
  };
  q('[data-prev]')?.addEventListener('click', () => setT((t - 1 + tItems.length) % tItems.length));
  q('[data-next]')?.addEventListener('click', () => setT((t + 1) % tItems.length));
  if (tItems.length > 1) setInterval(() => setT((t + 1) % tItems.length), 6400);

  qa('.faq-item').forEach((item) => {
    item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
  });

  const lightbox = q('#lightbox');
  const lbImg = q('#lightbox img');
  qa('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => {
      if (!lightbox || !lbImg) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
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
      'Merhaba, Şerife Kaya Beauty için randevu talebi oluşturmak istiyorum.\n' +
      'Ad Soyad: ' + name + '\n' +
      'Telefon: ' + phone + '\n' +
      'Hizmet: ' + service + '\n' +
      'Tarih: ' + (date || 'Belirtilecek') + '\n' +
      'Not: ' + (note || '-')
    );
    window.open('https://wa.me/905330568381?text=' + msg, '_blank');
  });

  const rev = qa('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: .1 });
  rev.forEach((el) => io.observe(el));
})();