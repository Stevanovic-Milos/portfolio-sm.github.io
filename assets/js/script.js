const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn?.addEventListener("click", () => elementToggleFunc(sidebar));

// Testimonials modal
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const toggleModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach((item) =>
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
    toggleModal();
  })
);

modalCloseBtn?.addEventListener("click", toggleModal);
overlay?.addEventListener("click", toggleModal);

// Dropdown filter
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    const matches = selectedValue === "all" || selectedValue === item.dataset.category;
    item.classList.toggle("active", matches);
  });
};

select?.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach((item) =>
  item.addEventListener("click", () => {
    const value = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(value);
  })
);

let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    const value = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterFunc(value);

    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  })
);

// Form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form) {
    const checkFormValidity = () => {
      const isValid = [...formInputs].every((input) => input.validity.valid);
      formBtn.disabled = !isValid;
    };

    formInputs.forEach((input) => input.addEventListener("input", checkFormValidity));

    formBtn.addEventListener("click", () => form.checkValidity() && form.submit());
  }
});

// Navigation links
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) =>
  link.addEventListener("click", () => {
    pages.forEach((page, index) => {
      const isActive = link.innerHTML.toLowerCase() === page.dataset.page;
      page.classList.toggle("active", isActive);
      navigationLinks[index].classList.toggle("active", isActive);
    });
    window.scrollTo(0, 0);
  })
);

// Text animation
const textLines = [
  "Success is not just about doing things; it's about doing them right.",
  " Hi there! I'm Milos, a diligent student with a passion for learning and a commitment to excellence. Welcome to my portfolio, where you'll find a showcase of my journey and capabilities. Let's connect and explore how I can contribute to your team's success."
];
const lineElements = document.querySelectorAll(".about-text p");

if (window.innerWidth > 768) {
  const animateText = (index) => {
    if (index >= textLines.length) return;

    let charIndex = 0;
    const lineElement = lineElements[index];
    const intervalId = setInterval(() => {
      lineElement.textContent = textLines[index].slice(0, charIndex++);
      if (charIndex > textLines[index].length) {
        clearInterval(intervalId);
        setTimeout(() => {
          lineElement.style.opacity = "1";
          animateText(index + 1);
        }, 50);
      }
    }, 20);
  };
  animateText(0);
} else {
  lineElements.forEach((lineElement, index) => {
    lineElement.textContent = textLines[index];
    lineElement.style.opacity = "1";
  });
}

// Download portfolio
const downloadPortfolio = () => {
  const link = document.createElement("a");
  link.href = "portfolioMS.pdf";
  link.download = "portfolioMS.pdf";
  link.click();
};

// Intersection observer for animations
const observeElements = (selector, threshold = 0.5, stagger = 0) => {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), index * stagger);
      }
    });
  }, { threshold });

  elements.forEach((el) => observer.observe(el));
};

observeElements(".service-item", 0.1);
observeElements(".testimonials-item", 0.5);
observeElements(".timeline-item", 0.5);
observeElements(".service-item-cer", 0.1, 150);

// Image rotation
const avatar = document.getElementById("avatar");
const images = ["./assets/images/ME2.webp", "./assets/images/me.jpg"];
let currentIndex = 0;

avatar?.addEventListener("click", () => {
  avatar.classList.add("animate");
  currentIndex = (currentIndex + 1) % images.length;
  setTimeout(() => {
    avatar.src = images[currentIndex];
  }, 100);

  avatar.addEventListener("animationend", () => avatar.classList.remove("animate"), { once: true });
});
