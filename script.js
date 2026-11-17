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

// Background audio: loop, no pause control
const bgm = document.getElementById('bgm');
bgm.volume = 0.35;
bgm.loop = true;
bgm.addEventListener('error', () => console.warn('Audio failed to load. Check the file name and format.'));

const tryPlay = () => bgm.play().catch(() => {});
tryPlay(); // works on some desktops; phones need the tap below

// The tap on the entry screen is a real user gesture, so the browser allows sound.
const gate = document.getElementById('gate');
document.getElementById('enter').addEventListener('click', () => {
  tryPlay();
  gate.classList.add('hide');
  setTimeout(() => gate.remove(), 700);
});

// Resume if it gets paused while the page is open.
bgm.addEventListener('pause', () => { if (!document.hidden) tryPlay(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden) tryPlay(); });
