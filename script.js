/* ===== Live clock ===== */
function updateClock(){
  const el = document.getElementById('osClock');
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  el.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

/* ===== Mobile nav toggle ===== */
const menuToggle = document.getElementById('menuToggle');
const osbarNav = document.getElementById('osbarNav');
menuToggle.addEventListener('click', () => osbarNav.classList.toggle('open'));
osbarNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => osbarNav.classList.remove('open'))
);

/* ===== Typing terminal intro ===== */
const typedLine = document.getElementById('typedLine');
const terminalOutput = document.getElementById('terminalOutput');
const introText = "whoami --role software-engineer";
const outputLines = [
  { text: "> Vinotha V — Fresher, Full Stack Developer", cls: "" },
  { text: "> Skills: Python, JS, PHP, Node.js, MySQL, MongoDB", cls: "" },
  { text: "> Status: open to work ✓", cls: "ok" }
];

function typeText(el, text, speed, callback){
  let i = 0;
  function step(){
    if(i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    } else if (callback) callback();
  }
  step();
}

function printOutputLines(lines, index){
  if(index >= lines.length) return;
  const p = document.createElement('p');
  if(lines[index].cls) p.classList.add(lines[index].cls);
  terminalOutput.appendChild(p);
  typeText(p, lines[index].text, 18, () => printOutputLines(lines, index + 1));
}

typeText(typedLine, introText, 45, () => {
  setTimeout(() => printOutputLines(outputLines, 0), 300);
});

/* ===== Scroll reveal ===== */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ===== Resume modal ===== */
const resumeBtn = document.getElementById('resumeBtn');
const resumeModal = document.getElementById('resumeModal');
const modalClose = document.getElementById('modalClose');
resumeBtn.addEventListener('click', () => resumeModal.classList.add('active'));
modalClose.addEventListener('click', () => resumeModal.classList.remove('active'));
resumeModal.addEventListener('click', (e) => {
  if(e.target === resumeModal) resumeModal.classList.remove('active');
});

/* ===== Interactive contact terminal ===== */
const contactInput = document.getElementById('contactInput');
const contactLog = document.getElementById('contactLog');
contactInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' && contactInput.value.trim() !== ''){
    const msg = contactInput.value.trim();
    contactLog.textContent = `> sending: "${msg}" ...`;
    const subject = encodeURIComponent('Portfolio contact');
    const body = encodeURIComponent(msg);
    window.location.href = `mailto:vinotha1438@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      contactLog.textContent = "> email app opened. Thanks for reaching out!";
    }, 600);
    contactInput.value = '';
  }
});