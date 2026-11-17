// Days together
const start = new Date(2021, 3, 10);
const now = new Date();
document.getElementById('days').textContent =
  Math.floor((now - start) / 86400000).toLocaleString();

// Eid slider
const track = document.getElementById('track');
const dotsBox = document.getElementById('dots');
const slides = track.children;

for (let i = 0; i < slides.length; i++) {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Go to photo ' + (i + 1));
  b.onclick = () => slides[i].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  dotsBox.appendChild(b);
}
const dots = dotsBox.children;

function update() {
  const i = Math.round(track.scrollLeft / (slides[0].offsetWidth + 12));
  [...dots].forEach((d, n) => d.classList.toggle('on', n === i));
}
track.addEventListener('scroll', update, {passive:true});
update();

const step = () => slides[0].offsetWidth + 12;
document.getElementById('next').onclick = () => track.scrollBy({left: step(), behavior:'smooth'});
document.getElementById('prev').onclick = () => track.scrollBy({left: -step(), behavior:'smooth'});

// Soft background music
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('music');
bgm.volume = 0.35;

function setState(on) { musicBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); }

// Browsers block sound autoplay, so try now and fall back to the first tap.
bgm.play().then(() => setState(true)).catch(() => {
  const unlock = () => {
    bgm.play().then(() => setState(true)).catch(() => {});
    ['pointerdown', 'touchend', 'click', 'keydown'].forEach(e => document.removeEventListener(e, unlock));
  };
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(e => document.addEventListener(e, unlock));
});

musicBtn.onclick = (e) => {
  e.stopPropagation();
  if (bgm.paused) { bgm.play().then(() => setState(true)); }
  else { bgm.pause(); setState(false); }
};