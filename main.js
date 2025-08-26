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
