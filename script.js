// Contact form handler
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const confirmation = document.createElement("p");
  confirmation.textContent = "✅ Thank you for your message!";
  confirmation.style.color = "green";
  confirmation.style.fontWeight = "bold";
  confirmation.style.marginTop = "8px";
  this.appendChild(confirmation);
  this.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Slideshow logic
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  if (!slides.length) return;

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (let j = 0; j < slides.length; j++) {
    slides[j].style.display = "none";
  }
  for (let j = 0; j < dots.length; j++) {
    dots[j].className = dots[j].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  if (dots.length) dots[slideIndex - 1].className += " active";
}

// Attach slideshow controls
window.addEventListener("DOMContentLoaded", () => {
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  if (prev) prev.addEventListener("click", () => plusSlides(-1));
  if (next) next.addEventListener("click", () => plusSlides(1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => currentSlide(index + 1)));

  // Autoplay every 5s
  setInterval(() => { plusSlides(1); }, 5000);
});

// Stats counters animation
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  counter.innerText = '0';
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;
    if(count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };
  update();
});

// Theme switcher
const themes = ['light', 'dark-mode', 'blue-theme'];
let themeIndex = 0;
const themeBtn = document.createElement('button');
themeBtn.textContent = "🎨 Switch Theme";
Object.assign(themeBtn.style, {
  position: "fixed",
  bottom: "60px",
  right: "20px",
  padding: "10px 12px",
  border: "none",
  borderRadius: "6px",
  background: "#8b5cf6",
  color: "white",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  zIndex: "1000"
});
document.body.appendChild(themeBtn);

themeBtn.addEventListener("click", () => {
  document.body.classList.remove(...themes);
  themeIndex = (themeIndex + 1) % themes.length;
  document.body.classList.add(themes[themeIndex]);
});