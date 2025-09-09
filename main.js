gsap.registerPlugin(ScrollTrigger);

const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const menu = document.getElementById("mobileMenu");
const services = document.querySelectorAll(".service")
console.log(services);

openBtn.addEventListener("click", () => {
  menu.classList.remove("translate-x-full");
  menu.classList.add("translate-x-0");
  openBtn.classList.add("hidden"); // ukryj przycisk otwierania
});

closeBtn.addEventListener("click", () => {
  menu.classList.remove("translate-x-0");
  menu.classList.add("translate-x-full");
  openBtn.classList.remove("hidden"); // pokaż ponownie hamburgera
});


const gallery = document.querySelector('.gallery-container');
let isDown = false;
let startX;
let scrollLeft;

gallery.addEventListener('mousedown', e => {
  isDown = true;
  gallery.classList.remove('cursor-grab');   // usuń "grab"
  gallery.classList.add('cursor-grabbing');  // dodaj "grabbing"
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
});

gallery.addEventListener('mouseleave', () => {
  if(isDown) {
    isDown = false;
    gallery.classList.remove('cursor-grabbing');
    gallery.classList.add('cursor-grab');   // przywróć "grab"
  }
});

gallery.addEventListener('mouseup', () => {
  isDown = false;
  gallery.classList.remove('cursor-grabbing');
  gallery.classList.add('cursor-grab');     // przywróć "grab"
});

gallery.addEventListener('mousemove', e => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 1; // mnożnik prędkości
  gallery.scrollLeft = scrollLeft - walk;
});

const track = document.getElementById("reviewsTrack");
const wrapper = document.getElementById("reviewsWrapper");
const card = track.children[0]; 
const cardStyle = window.getComputedStyle(card);
const cardWidth = card.offsetWidth;
const gap = parseInt(cardStyle.marginRight) || 20; // gap-[20px]
const stepWidth = cardWidth + gap;

let currentIndex = 0;
let startXX = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;

function setSliderPosition() {
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function animateToIndex() {
  currentTranslate = -currentIndex * stepWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// Drag start
wrapper.addEventListener("mousedown", (e) => {
  isDragging = true;
  startXX = e.pageX;
});

wrapper.addEventListener("mouseup", (e) => {
  isDragging = false;
  const movedBy = e.pageX - startXX;

  if (movedBy < -50 && currentIndex < track.children.length - 1) {
    currentIndex += 1;
  }
  if (movedBy > 50 && currentIndex > 0) {
    currentIndex -= 1;
  }
  animateToIndex();
});

wrapper.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    animateToIndex();
  }
});

wrapper.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const moved = e.pageX - startXX;
  currentTranslate = prevTranslate + moved;
  setSliderPosition();
});

// Obsługa touch
wrapper.addEventListener("touchstart", (e) => {
  isDragging = true;
  startXX = e.touches[0].clientX;
});

wrapper.addEventListener("touchend", (e) => {
  isDragging = false;
  const movedBy = e.changedTouches[0].clientX - startXX;

  if (movedBy < -50 && currentIndex < track.children.length - 1) {
    currentIndex += 1;
  }
  if (movedBy > 50 && currentIndex > 0) {
    currentIndex -= 1;
  }
  animateToIndex();
});

wrapper.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const moved = e.touches[0].clientX - startXX;
  currentTranslate = prevTranslate + moved;
  setSliderPosition();
});

services.forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      onEnter: () => el.classList.add(".active-service"),
    },
  });
});


