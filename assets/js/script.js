'use strict';

const elementToggleFunc = function(elem) {
  elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {
  elementToggleFunc(sidebar);
});

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function() {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function() {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    
    testimonialsModalFunc();
  });
}

// Event listener to close modal
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Toggle the dropdown
select.addEventListener("click", function() {
  elementToggleFunc(this);
});

// Loop through select items to change the selected value
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function() {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function(selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const category = filterItems[i].dataset.category.toLowerCase();
    if (selectedValue === "all" || selectedValue.toLowerCase() === category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function() {

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
  navigationLinks[i].addEventListener("click", function() {

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
  "Don’t judge my code — it’s a deadline survival story, not a masterpiece.",
  " Hi, I’m Milos, a full stack developer who’s focused on building solid, practical solutions. This portfolio shows what I’ve worked on and what I’m capable of. Let’s connect and see how I can help your team."
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

if (window.innerWidth > 768) {
  animateText(0);
} else {
  lineElements.forEach((lineElement, index) => {
    lineElement.textContent = textLines[index];
    lineElement.style.opacity = "1"; 
  });
}


function downloadPortfolio() {
  const link = document.createElement('a');
  link.href = 'portfolioMS.pdf'; 
  link.download = 'portfolioMS.pdf';
  link.click();
}
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skill-item");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0., 
    }
  );

  skillItems.forEach((item) => {
    observer.observe(item);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonials-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.5, 
    }
  );

  testimonials.forEach((testimonial) => {
    observer.observe(testimonial);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const edu_certItems = document.querySelectorAll(".edu_cert-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.5, 
    }
  );

  edu_certItems.forEach((item) => {
    observer.observe(item);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skill-item-cer");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150);
        }
      });
    }, {
      threshold: 0.1,
    }
  );

  skillItems.forEach((item) => {
    observer.observe(item);
  });
});
window.addEventListener('load', function() {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 100, 
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#8CAAEE", "#89B4FA", "#74C7EC"] 
      },
      size: {
        value: 3,
        random: true
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        out_mode: "out"
      }
    },

    retina_detect: true
  });
  
});
const button = document.querySelector('.info_more-btn');
button.addEventListener('click', () => {
  button.classList.toggle('opened');
});

/*image rotation*/
const avatar = document.getElementById('avatar');
let currentIndex = 0; 
const images = ['./assets/images/ME2.webp','./assets/images/me.jpg'];

avatar.addEventListener('click', () => {
  avatar.classList.add('animate');

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length; 
    avatar.src = images[currentIndex];
  }, 10); 

  avatar.addEventListener(
    'animationend',
    () => {
      avatar.classList.remove('animate');
    },
    { once: true } 
  );
});