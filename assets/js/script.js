'use strict';

// Ensure that the function is declared only once
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

// Loop to handle testimonial item clicks
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
  "Success is not just about doing things; it's about doing them right.",
  " Hi there! I'm Milos, a diligent student with a passion for learning and a commitment to excellence. Welcome to my portfolio, where you'll find a showcase of my journey and capabilities. Let's connect and explore how I can contribute to your team's success."
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

// Check if the screen size is smaller than 768px (adjust as needed)
if (window.innerWidth > 768) {
  // Only run typing animation for larger screens
  animateText(0);
} else {
  // For small screens, immediately display the full text without animation
  lineElements.forEach((lineElement, index) => {
    lineElement.textContent = textLines[index];
    lineElement.style.opacity = "1"; // Ensure text is visible
  });
}


function downloadPortfolio() {
  const link = document.createElement('a');
  link.href = 'portfolioMS.pdf'; // Path to the portfolio file
  link.download = 'portfolioMS.pdf'; // The name the file will have when downloaded
  link.click(); // Simulates a click to trigger the download
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
    }, {
      threshold: 0., // Trigger when 20% of the element is visible
    }
  );

  serviceItems.forEach((item) => {
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
      threshold: 0.5, // Adjust threshold as needed
    }
  );

  testimonials.forEach((testimonial) => {
    observer.observe(testimonial);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.5, // Adjust to control when the animation starts (50% visibility)
    }
  );

  timelineItems.forEach((item) => {
    observer.observe(item);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item-cer");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add `visible` class with delay for each row
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150); // Stagger delay between items
        }
      });
    }, {
      threshold: 0.1, // Adjust to control when the animation starts
    }
  );

  serviceItems.forEach((item) => {
    observer.observe(item);
  });
});
window.addEventListener('load', function() {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 100, // Reduce particle count for mobile
        density: {
          enable: true,
          value_area: 800
        }
      },
      size: {
        value: 3, // Adjust particle size
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
// Ensure 'avatar' is only declared once
const avatar = document.getElementById('avatar');
let currentIndex = 0; // Track the current image index

// Define the image paths
const images = ['./assets/images/me.jpg', './assets/images/ME2.webp', './assets/images/me3.jpg'];

avatar.addEventListener('click', () => {
  // Add animation class to trigger the spin
  avatar.classList.add('animate');

  // Wait for the animation duration to swap the image
  setTimeout(() => {
    // Cycle through the images array
    currentIndex = (currentIndex + 1) % images.length; // This ensures it loops back to the first image
    avatar.src = images[currentIndex];
  }, 10); // Wait until halfway through the 0.8s animation

  // Remove the animation class after the animation ends
  avatar.addEventListener(
    'animationend',
    () => {
      avatar.classList.remove('animate');
    },
    { once: true } // Ensures the event listener is removed after firing
  );
});