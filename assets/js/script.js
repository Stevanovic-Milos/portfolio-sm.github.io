'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

document.addEventListener("DOMContentLoaded", function() {

  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  function checkFormValidity() {
    let isValid = true;
    formInputs.forEach(function(input) {
      if (!input.validity.valid) {
        isValid = false;
      }
    });

    if (isValid) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  }

  formInputs.forEach(function(input) {
    input.addEventListener("input", checkFormValidity);
  });

  formBtn.addEventListener("click", function() {

    if (form.checkValidity()) {
      form.submit();
    }
  });
});

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

const textLines = [
  "Success is not just about doing things; it's about doing them right.",
  " Hi there! I'm Milos, a diligent student with a passion for learning and a commitment to excellence. Welcome to my online portfolio, where you'll find a showcase of my journey and capabilities. Let's connect and explore how I can contribute to your team's success."
];

const lineElements = document.querySelectorAll(".about-text p");

function animateText(index) {
  if (index >= textLines.length) return;

  const currentLine = textLines[index];
  const lineElement = lineElements[index];

  let charIndex = 0;
  const intervalId = setInterval(() => {
    if (charIndex <= currentLine.length) {
      lineElement.textContent = currentLine.slice(0, charIndex);
      charIndex++;
    } else {
      clearInterval(intervalId);
      setTimeout(() => {
        lineElement.style.opacity = "1";
        animateText(index + 1);
      }, 50); 
    }
  }, 20); 
}

animateText(0);
function downloadPortfolio() {
  const link = document.createElement('a');
  link.href = 'portfolioMS.pdf';  // Path to the portfolio file
  link.download = 'portfolioMS.pdf';      // The name the file will have when downloaded
  link.click();                           // Simulates a click to trigger the download
}
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once it's visible
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
    }
  );

  serviceItems.forEach((item) => {
    observer.observe(item);
  });
});
