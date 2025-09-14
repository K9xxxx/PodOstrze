gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {

  const openBtn = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const menu = document.getElementById("mobileMenu");
  const services = document.querySelectorAll(".service")
  const sectionH2 = document.querySelectorAll("section h2")
  const buttonSection3 = document.querySelector(".divArticles a");
  const buttonSection2 = document.querySelector(".buttonSection2");
  const buttonSection4 = document.querySelector(".button4");
  const divArticles = document.querySelector(".divArticles");
  const TeamPic = document.querySelector(".teamPic");
  const sekcja1 = document.querySelectorAll(".classSection1");
  const sekcja1H1 = document.querySelectorAll(".classSection1 h1");
  const section2Imgs = document.querySelectorAll(".section2-img");
  const icons=document.querySelectorAll(".ikon");


  console.log(sectionH2);


  /////   MENU NAWIGACJI
  /////   MENU NAWIGACJI
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
  /////   MENU NAWIGACJI   \\\\\

  const gallery = document.querySelector('.gallery-container');
  let isDown = false;
  let startX;
  let scrollLeft;


  /////  ANIMACJE DLA SEKCJI GALERII
  /////  ANIMACJE DLA SEKCJI GALERII
  gallery.addEventListener('mousedown', e => {
    isDown = true;
    gallery.classList.remove('cursor-grab');   // usuń "grab"
    gallery.classList.add('cursor-grabbing');  // dodaj "grabbing"
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('mouseleave', () => {
    if (isDown) {
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
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1; // mnożnik prędkości
    gallery.scrollLeft = scrollLeft - walk;
  });
  /////  ANIMACJE DLA SEKCJI GALERII     \\\\\\



  ///// ANIMACJE DLA SEKCJI OCENY
  ///// ANIMACJE DLA SEKCJI OCENY
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
  /////    ANIMACJE DLA SEKCJI OCENY    \\\\\



  /////   ANIMACJE DLA SEKCJI USŁUG
  /////   ANIMACJE DLA SEKCJI USŁUG
  services.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        onEnter: () => {
          el.classList.add("active-service");
          setTimeout(() => {
            el.classList.add("additional-h3");
          }, 500);
        },
      },
    });
  });
  /////   ANIMACJE DLA SEKCJI USŁUG    \\\\\

  /////    ANIMACJE DLA WYSWIETLANIA SIE NAGŁÓWKÓW
  /////    ANIMACJE DLA WYSWIETLANIA SIE NAGŁÓWKÓW
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

  icons.forEach((el)=>{
    gsap.to(el, {
      scrollTrigger: {
        trigger:el,
        start: "top 80%",
        onEnter:() => el.classList.add("active-icon")
      }
    })
  })
  /////    ANIMACJE DLA WYSWIETLANIA SIE NAGŁÓWKÓW    \\\\\


  /////   WERTOWANIE TEKSTU DLA SEKCJI O NAS 
  /////   WERTOWANIE TEKSTU DLA SEKCJI O NAS 
  function animateText() {
    const articles = document.querySelectorAll(".divArticles article");
    let articleIndex = 0;
    let charIndex = 0;

    function showNextChar() {
      if (articleIndex < articles.length) {
        let article = articles[articleIndex];
        article.style.display = "block"; // upewnij się, że artykuł jest widoczny
        let text = article.getAttribute("data-text");

        if (charIndex < text.length) {
          article.innerText = text.substring(0, charIndex + 1);
          charIndex++;
          setTimeout(showNextChar, 7); // prędkość pisania (ms)
        } else {
          charIndex = 0;
          articleIndex++;
          setTimeout(showNextChar, 25); // opóźnienie między artykułami
        }
      } else {
        // opcjonalnie: po skończeniu usuń minHeight ze wszystkich artykułów
        articles.forEach(article => article.style.minHeight = "");
      }
    }

    // Przygotowanie artykułów do animacji
    articles.forEach(article => {
      // pobierz oryginalny tekst
      const text = article.innerText;
      article.setAttribute("data-text", text);

      // pobierz wysokość i zarezerwuj miejsce
      const articleHeight = article.offsetHeight;
      article.style.minHeight = articleHeight + "px";

      // wyczyść tekst
      article.innerText = "";
    });

    showNextChar();
  }

  ScrollTrigger.create({
    trigger: ".divArticles",
    start: "top 99%",
    once: true,
    onEnter: animateText
  });

  /////   WERTOWANIE TEKSTU DLA SEKCJI O NAS \\\\\


  ///// WERTOWANIE TEKSTU DLA SEKCJI PIERWSZEJ O SALONIE
  ///// WERTOWANIE TEKSTU DLA SEKCJI PIERWSZEJ O SALONIE
  function animateText2() {
    const article = document.querySelector(".articleAbout"); // tylko jeden element
    let charIndex = 0;

    // zapisujemy tekst
    const text = article.innerText;
    article.setAttribute("data-text", text);

    // pobieramy wysokość zanim wyczyścimy tekst
    const articleHeight = article.offsetHeight;
    article.style.minHeight = articleHeight + "px"; // rezerwacja miejsca

    // czyścimy tekst
    article.innerText = "";

    // pokazujemy element dopiero przy animacji
    article.classList.remove("invisible");
    article.classList.add("visible");

    function showNextChar() {
      if (charIndex < text.length) {
        article.innerText = text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(showNextChar, 7); // prędkość pisania (ms)
      } else {
        // opcjonalnie: po zakończeniu animacji usuwamy sztuczne min-height
        article.style.minHeight = "";
      }
    }

    showNextChar();
  }

  ScrollTrigger.create({
    trigger: ".articleAbout",
    start: "top 99%",
    once: true,
    onEnter: animateText2
  });


  ///// WERTOWANIE TEKSTU DLA SEKCJI PIERWSZEJ O SALONIE \\\\\


  ///// ANIMACJE POJAWIANIA SIE PRZYCISKÓW A
  ///// ANIMACJE POJAWIANIA SIE PRZYCISKÓW A
  gsap.to(buttonSection3, {
  scrollTrigger: {
    trigger: '.divArticles',
    start: "top 80%",
    onEnter: () => {
      setTimeout(() => {
        buttonSection3.classList.add("ButtonSection3Active");
      }, 7000);
    }
  }
});


  gsap.to(buttonSection2, {
    scrollTrigger: {
      trigger: buttonSection2,
      start: "top 80%",
      onEnter: () => buttonSection2.classList.add("ButtonSection2Active")
    },
  });
  gsap.to(buttonSection4, {
    scrollTrigger: {
      trigger: buttonSection4,
      start: "top 80%",
      onEnter: () => buttonSection4.classList.add("ButtonSection4Active")
    },
  });
  ///// ANIMACJE POJAWIANIA SIE PRZYCISKÓW A \\\\\


  ///// ANIMACJA DLA ZDJECIA CAŁEGO ZESPOŁU
  ///// ANIMACJA DLA ZDJECIA CAŁEGO ZESPOŁU
  gsap.to(TeamPic, {
    scrollTrigger: {
      trigger: '.teamPic',
      start: "top 80%",
      onEnter: () => TeamPic.classList.add("teamPicActive")
    },
  });

  ///// ANIMACJA DLA ZDJECIA CAŁEGO ZESPOŁU \\\\\


  ///// ANIMACJA DLA NAGLÓWKWA SEKCJI 1 H1 
  ///// ANIMACJA DLA NAGLÓWKWA SEKCJI 1 H1 
  gsap.to(sekcja1H1[0], {
    scrollTrigger: {
      trigger: sekcja1,
      start: "top 80%",
      onEnter: () => sekcja1H1[0].classList.add("h1-active")
    },
  });
  gsap.to(sekcja1H1[1], {
    scrollTrigger: {
      trigger: sekcja1,
      start: "top 80%",
      onEnter: () => sekcja1H1[1].classList.add("h1-active2")
    },
  });
  ///// ANIMACJA DLA NAGLÓWKWA SEKCJI 1 H1 \\\\\

  ///// ANIMACJA POJAWIANIA SIE ZDJEC W SEKCJI 1 
  ///// ANIMACJA POJAWIANIA SIE ZDJEC W SEKCJI 1 
  gsap.to(section2Imgs[0], {
    scrollTrigger: {
      trigger: section2Imgs[0],
      start: "top 80%",
      onEnter: () => section2Imgs[0].classList.add("section2ImgActive")
    },
  });
  gsap.to(section2Imgs[1], {
    scrollTrigger: {
      trigger: section2Imgs[1],
      start: "top 50%",
      onEnter: () => section2Imgs[1].classList.add("section2ImgActive")
    },
  });
  ///// ANIMACJA POJAWIANIA SIE ZDJEC W SEKCJI 1 \\\\\


























});
