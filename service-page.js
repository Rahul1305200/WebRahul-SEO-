document.querySelectorAll('.home-cases').forEach((section) => {
  const track = section.querySelector('.home-cases-track');
  const previous = section.querySelector('.case-prev');
  const next = section.querySelector('.case-next');
  if (!track || !previous || !next) return;

  const update = () => {
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };
  const move = (direction) => {
    const card = track.querySelector('.home-case');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('pageshow', () => {
    track.scrollLeft = 0;
    update();
  });
  track.scrollLeft = 0;
  update();
});

document.querySelectorAll('.google-card').forEach((card) => {
  const buttons = [...card.querySelectorAll('[data-serp-mode]')];
  const previews = [...card.querySelectorAll('[data-serp-preview]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    const mode = button.dataset.serpMode;
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    previews.forEach((preview) => { preview.hidden = preview.dataset.serpPreview !== mode; });
  }));
});

const newsletterForm = document.getElementById('newsletterForm');
newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.getElementById('newsletterNote');
  if (note) note.textContent = 'Newsletter sign-up is not connected in this preview.';
});

document.querySelectorAll('.home-testimonials').forEach((section) => {
  const slider = section.querySelector('.tt-slider');
  const cards = [...section.querySelectorAll('.tt-card')];
  const dots = [...section.querySelectorAll('.tt-dot')];
  const previous = section.querySelector('.tt-prev');
  const next = section.querySelector('.tt-next');
  if (!slider || !cards.length || !previous || !next) return;

  const currentIndex = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(slider).columnGap) || 0;
    return Math.min(cards.length - 1, Math.max(0, Math.round(slider.scrollLeft / (cardWidth + gap))));
  };
  const update = () => {
    const index = currentIndex();
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
    previous.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  };
  const show = (index) => cards[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  previous.addEventListener('click', () => show(currentIndex() - 1));
  next.addEventListener('click', () => show(currentIndex() + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
  slider.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

document.querySelectorAll('.journey-section').forEach((section) => {
  const tabs = [...section.querySelectorAll('[data-journey-tab]')];
  const views = [...section.querySelectorAll('[data-journey-view]')];
  if (tabs.length !== 2 || views.length !== 2) return;
  const show = (name, moveToTop = false) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.journeyTab === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    views.forEach((view) => { view.hidden = view.dataset.journeyView !== name; });
    if (moveToTop) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => show(tab.dataset.journeyTab)));
  section.querySelector('[data-show-after]')?.addEventListener('click', () => show('after', true));
});
