// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
  // Navigation behavior
  const nav = document.querySelector('nav');
  const pageWrapper = document.querySelector('.page-wrapper');

  function updateNav() {
    if (window.innerWidth > 768) {
      // Desktop: always sidebar
      nav.classList.add('sidebar', 'active');
      pageWrapper.classList.add('sidebar-active');
    } else {
      // Mobile: top nav
      nav.classList.remove('sidebar', 'active');
      pageWrapper.classList.remove('sidebar-active');
    }
  }

  updateNav();
  window.addEventListener('resize', updateNav);

  // Set active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === currentPath) {
      a.classList.add('active');
    }
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Remove any existing confirmation messages
      const existingConfirmation = contactForm.querySelector('.confirmation-message');
      if (existingConfirmation) {
        existingConfirmation.remove();
      }

      // Create and display confirmation
      const confirmation = document.createElement('p');
      confirmation.textContent = '✅ Thank you for your message!';
      confirmation.className = 'confirmation-message';
      confirmation.style.color = 'var(--brand)';
      confirmation.style.fontWeight = 'bold';
      confirmation.style.marginTop = '8px';
      confirmation.style.textAlign = 'center';

      this.appendChild(confirmation);

      // Reset form
      this.reset();

      // Remove confirmation after 5 seconds
      setTimeout(() => {
        if (confirmation.parentNode) {
          confirmation.remove();
        }
      }, 5000);
    });
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Slideshow logic with error handling
  let slideIndex = 1;
  const slides = document.getElementsByClassName('slide');
  const dots = document.getElementsByClassName('dot');

  if (slides.length > 0) {
    showSlides(slideIndex);
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    // Show current slide and activate corresponding dot
    slides[slideIndex - 1].style.display = 'block';
    if (dots.length >= slideIndex) {
      dots[slideIndex - 1].className += ' active';
    }
  }

  // Attach slideshow controls
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const dotElements = document.querySelectorAll('.dot');

  if (prevButton) {
    prevButton.addEventListener('click', () => plusSlides(-1));
  }
  if (nextButton) {
    nextButton.addEventListener('click', () => plusSlides(1));
  }

  dotElements.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index + 1));
  });

  // Autoplay every 5 seconds if slides exist
  if (slides.length > 0) {
    setInterval(() => {
      plusSlides(1);
    }, 5000);
  }

  // Stats counters animation with error handling
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    if (counter) {
      counter.innerText = '0';
      const updateCounter = () => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const current = parseInt(counter.innerText, 10);
        const increment = target / 200;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    }
  });

  // Theme switcher with improved button text
  const themes = ['blue-theme', 'purple-theme', 'green-theme', 'cyber-theme', 'sunset-theme', 'dark-mode'];
  let themeIndex = 0;

  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-switcher-btn';
  themeBtn.setAttribute('aria-label', 'Switch website theme');
  themeBtn.setAttribute('title', 'Click to change theme');

  // Theme display names
  const themeNames = {
    'dark-mode': 'Dark',
    'blue-theme': 'Blue',
    'purple-theme': 'Purple',
    'green-theme': 'Green',
    'cyber-theme': 'Cyber',
    'sunset-theme': 'Sunset'
  };

  // Function to update button text
  function updateButtonText() {
    const currentTheme = themeNames[themes[themeIndex]];
    const nextTheme = themeNames[themes[(themeIndex + 1) % themes.length]];
    themeBtn.textContent = `🎨 ${currentTheme} → ${nextTheme}`;
  }

  document.body.appendChild(themeBtn);

  themeBtn.addEventListener('click', function() {
    // Remove current theme classes
    themes.forEach(theme => {
      document.body.classList.remove(theme);
    });

    // Apply next theme
    themeIndex = (themeIndex + 1) % themes.length;
    document.body.classList.add(themes[themeIndex]);

    // Update button text
    updateButtonText();
  });

  // Initialize with first theme and button text
  document.body.classList.add(themes[0]);
  updateButtonText();
});