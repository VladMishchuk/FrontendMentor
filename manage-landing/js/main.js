// --- Slider ---
const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 5000,
  },
  centeredSlides: true,
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    500: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 40,
    },
  },
});

// --- Hamburger menu ---
const nav = document.getElementById("primary-nav"),
  btn = document.getElementById("hamburger");
let menuIsHidden = true;

btn.addEventListener("click", () => {
  if (menuIsHidden) {
    nav.hidden = false;
    btn.style.position = "fixed";
    btn.setAttribute("src", "images/icon-close.svg");
    menuIsHidden = false;
  } else {
    nav.hidden = true;
    btn.style.position = "initial";
    btn.setAttribute("src", "images/icon-hamburger.svg");
    menuIsHidden = true;
  }
});

// --- Email validation ---
const messageError = document.querySelector(".error"),
  form = document.getElementById("form"),
  submitButton = document.getElementById("submit"),
  inputField = document.getElementById("input");

function isValidEmail(string) {
  return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
    string
  );
}

form.addEventListener("submit", (event) => {
  if (!isValidEmail(inputField.value)) {
    {
      event.preventDefault();
      messageError.style.display = "block";
      inputField.style.border = "2px solid hsl(0, 61%, 48%)";
      inputField.style.color = "hsl(0, 61%, 48%)";
    }
  }
});

inputField.addEventListener("focus", () => {
  messageError.style.display = "none";
  inputField.style.border = "none ";
  inputField.style.color = "hsl(233, 12%, 13%)";
});
