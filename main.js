gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const menu = document.getElementById("mobileMenu");
const services = document.querySelectorAll(".service")
const sectionH2 = document.querySelectorAll("section h2")
const buttonSection3 = document.querySelector(".divArticles a");
const buttonSection2 = document.querySelector(".buttonSection2");
const divArticles = document.querySelector(".divArticles");
const TeamPic = document.querySelector(".teamPic");
const sekcja1 = document.querySelectorAll(".classSection1");
const sekcja1H1 = document.querySelectorAll(".classSection1 h1");


console.log(sectionH2);

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


services.forEach((el) =>{
  gsap.to(el, {
    scrollTrigger: {
      trigger:el,
      start: "top 80%",
      onEnter:()=>{
        el.classList.add("active-service");
        setTimeout(() =>{
          el.classList.add("additional-h3");
        }, 500);
      },
    },
  });
});


sectionH2.forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        el.classList.add("active-h2");
        setTimeout(() => {
          el.classList.add("additional-h2");
        }, 500); // 500 ms później
      },
    },
  });
});

function animateText() {
        const articles = document.querySelectorAll(".divArticles article");
        let articleIndex = 0;
        let charIndex = 0;

        function showNextChar() {
            if (articleIndex < articles.length) {
                let article = articles[articleIndex];
                article.style.display = 'block'; // Upewnij się, że artykuł jest widoczny
                let text = article.getAttribute("data-text");

                if (charIndex < text.length) {
                    article.innerText = text.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(showNextChar, 7); // Opóźnienie między znakami (15 ms)
                } else {
                    charIndex = 0;
                    articleIndex++;
                    setTimeout(showNextChar, 25); // Opóźnienie między artykułami (50 ms)
                }
            }
        }

        // Przygotowanie artykułów do animacji
        articles.forEach(article => {
            article.setAttribute("data-text", article.innerText);
            article.innerText = ""; // Pusty początkowy tekst
        });

        showNextChar();
    }

    ScrollTrigger.create({
        trigger: '.divArticles',
        start: 'top 60%', 
        once: true,
        onEnter: animateText
    });




    function animateText2() {
    const article = document.querySelector(".articleAbout"); // tylko jeden element
    let charIndex = 0;

    // zapisujemy tekst i czyścimy w środku
    const text = article.innerText;
    article.setAttribute("data-text", text);
    article.innerText = "";

    function showNextChar() {
        if (charIndex < text.length) {
            article.innerText = text.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(showNextChar, 7); // prędkość pisania (ms)
        }
    }

    showNextChar();
}

// ScrollTrigger
ScrollTrigger.create({
    trigger: ".articleAbout",
    start: "top 60%",
    once: true,
    onEnter: animateText2
});



gsap.to(buttonSection3,{
  scrollTrigger: {
    trigger:'.divArticles',
    start:"top 80%",
    onEnter:()=> buttonSection3.classList.add("ButtonSection3Active")
  },
});

gsap.to(buttonSection2,{
  scrollTrigger: {
    trigger:buttonSection2,
    start:"top 80%",
    onEnter:()=> buttonSection2.classList.add("ButtonSection2Active")
  },
});

gsap.to(TeamPic,{
  scrollTrigger:{
    trigger:'.divArticles',
    start:"top 80%",
    onEnter:()=> TeamPic.classList.add("teamPicActive")
  },
});

gsap.to(sekcja1H1[0],{
  scrollTrigger:{
    trigger:sekcja1,
    start:"top 80%",
    onEnter:()=> sekcja1H1[0].classList.add("h1-active")
  },
});
gsap.to(sekcja1H1[1],{
  scrollTrigger:{
    trigger:sekcja1,
    start:"top 80%",
    onEnter:()=> sekcja1H1[1].classList.add("h1-active2")
  },
});

























  });
