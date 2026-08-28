/* =========================================================
   CONFIG
========================================================= */
const WHATSAPP_NUMBER = "8801834037785"; // country code + number, no +, no spaces

/* =========================================================
   MOBILE NAV TOGGLE
========================================================= */
const burger = document.getElementById("burger");
const navEl = document.querySelector("nav");
if(burger && navEl){
  burger.addEventListener("click", () => navEl.classList.toggle("open"));
  navEl.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navEl.classList.remove("open")));
}

/* =========================================================
   ACTIVE NAV LINK ON SCROLL
========================================================= */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("nav a[href^='#']");
function setActiveNav(){
  let current = sections[0]?.id;
  const offset = 140;
  sections.forEach(sec => {
    if(window.scrollY + offset >= sec.offsetTop) current = sec.id;
  });
  navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", setActiveNav, { passive:true });
setActiveNav();

/* =========================================================
   ROLE TYPEWRITER
========================================================= */
(function typewriter(){
  const el = document.getElementById("roleSlot");
  if(!el) return;
  const roles = ["Embedded Systems Engineer", "Electronics Engineer", "IoT Developer", "PCB Designer"];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const word = roles[roleIndex];
    if(!deleting){
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if(charIndex === word.length){ deleting = true; setTimeout(tick, 1400); return; }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if(charIndex === 0){ deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
})();

/* =========================================================
   PROJECT CAROUSEL
========================================================= */
(function carousel(){
  const track = document.getElementById("carTrack");
  const prevBtn = document.getElementById("carPrev");
  const nextBtn = document.getElementById("carNext");
  const dotsWrap = document.getElementById("carDots");
  if(!track) return;

  const slides = Array.from(track.children);
  let index = 0;
  let autoTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if(i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render(){
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }
  function goTo(i){ index = (i + slides.length) % slides.length; render(); restartAuto(); }
  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  function restartAuto(){ clearInterval(autoTimer); autoTimer = setInterval(next, 5500); }
  restartAuto();

  let startX = null;
  track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive:true });
  track.addEventListener("touchend", e => {
    if(startX === null) return;
    const diff = e.changedTouches[0].clientX - startX;
    if(Math.abs(diff) > 40){ diff < 0 ? next() : prev(); }
    startX = null;
  }, { passive:true });

  const carouselEl = document.getElementById("carousel");
  carouselEl.addEventListener("mouseenter", () => clearInterval(autoTimer));
  carouselEl.addEventListener("mouseleave", restartAuto);

  render();
})();

/* =========================================================
   WHATSAPP LINKS (hero, nav, footer)
========================================================= */
function buildWhatsappLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
const defaultMessage = "Hi Zihadul, I saw your portfolio and I'd like to talk about a project / role.";
const heroBtn = document.getElementById("heroHireBtn");
const navBtn = document.getElementById("navHireBtn");
const footerBtn = document.getElementById("footerWhatsapp");
const contactBtn = document.getElementById("contactWhatsappBtn");
if(heroBtn) heroBtn.href = buildWhatsappLink(defaultMessage);
if(navBtn) navBtn.href = buildWhatsappLink(defaultMessage);
if(footerBtn) footerBtn.href = buildWhatsappLink(defaultMessage);
if(contactBtn) contactBtn.href = buildWhatsappLink(defaultMessage);
