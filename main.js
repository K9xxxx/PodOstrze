const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const menu = document.getElementById("mobileMenu");

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


  
