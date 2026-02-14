/* Modern Dynamic Portfolio Website JavaScript */

// ============= PROFESSIONAL THEME SYSTEM (8 STANDARD THEMES) =============
const THEMES = {
  ocean: { name: 'Ocean', color: '#0369a1' },
  sunset: { name: 'Sunset', color: '#ea580c' },
  city: { name: 'City', color: '#475569' },
  forest: { name: 'Forest', color: '#059669' },
  animation: { name: 'Animation', color: '#a855f7' },
  arts: { name: 'Arts', color: '#e11d48' },
  mountain: { name: 'Mountain', color: '#0f766e' },
  desert: { name: 'Desert', color: '#b45309' }
};

// Load theme immediately before page renders (prevent flickering)
(function() {
  const savedTheme = localStorage.getItem('preferredTheme') || 'ocean';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

function initializeTheme() {
  createThemeSelector();
  setupThemeListeners();
}

function applyTheme(themeName) {
  // Apply theme using data attribute (no flicker)
  document.documentElement.setAttribute('data-theme', themeName);
  
  // Save preference
  localStorage.setItem('preferredTheme', themeName);
  
  // Update active button
  updateThemeMenuActive(themeName);
}

function createThemeSelector() {
  // Create container
  const container = document.createElement('div');
  container.className = 'theme-selector';
  
  // Create theme menu
  const menu = document.createElement('div');
  menu.className = 'theme-toggle-menu';
  
  // Add theme options
  Object.entries(THEMES).forEach(([themeKey, themeData]) => {
    const option = document.createElement('button');
    option.className = 'theme-option';
    option.setAttribute('data-theme', themeKey);
    option.setAttribute('title', themeData.name);
    option.setAttribute('aria-label', `Apply ${themeData.name} theme`);
    option.innerHTML = `
      <span class="theme-color-dot" style="background-color: ${themeData.color}"></span>
      <span>${themeData.name}</span>
    `;
    
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme(themeKey);
    });
    
    menu.appendChild(option);
  });
  
  container.appendChild(menu);
  document.body.appendChild(container);
}

function setupThemeListeners() {
  const savedTheme = localStorage.getItem('preferredTheme') || 'ocean';
  updateThemeMenuActive(savedTheme);
}

function updateThemeMenuActive(themeName) {
  const options = document.querySelectorAll('.theme-option');
  options.forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-theme') === themeName) {
      option.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeNavigation();
  initializeAnimations();
  initializeFormHandlers();
  initializeFilters();
  initializeTabs();
  initializeFAQ();
  initializeLEDSimulator();
});

/* ============= NAVIGATION ============= */
function initializeNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ============= ANIMATIONS ============= */
function initializeAnimations() {
  // Animate stats on scroll
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'slideInUp 0.6s ease forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    statCards.forEach(card => observer.observe(card));
  }

  // Animate skill progress bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  if (skillBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = '0';
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============= FORM HANDLERS ============= */
function initializeFormHandlers() {
  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const messageDiv = document.getElementById('newsletterMessage');
      
      messageDiv.textContent = '✓ Thank you for subscribing!';
      messageDiv.style.color = '#10b981';
      messageDiv.style.fontWeight = '600';
      
      this.reset();
      setTimeout(() => {
        messageDiv.textContent = '';
      }, 3000);
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const statusDiv = document.getElementById('formStatus');
      
      // Simulate form submission
      const formData = new FormData(this);
      
      statusDiv.textContent = '✓ Message sent successfully!';
      statusDiv.className = 'form-status show success';
      
      this.reset();
      setTimeout(() => {
        statusDiv.className = 'form-status';
      }, 3000);
    });
  }
}

/* ============= PORTFOLIO FILTERS ============= */
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filter projects
      projectItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeIn 0.6s ease';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ============= TABS ============= */
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn, .code-tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabGroup = button.closest('.tabs') || button.closest('.code-tabs');
      const tabName = button.getAttribute('data-tab') || button.getAttribute('data-code');
      
      if (!tabGroup || !tabName) return;

      // Deactivate all tabs in this group
      const buttons = tabGroup.querySelectorAll('.tab-btn, .code-tab-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      
      // Activate clicked tab
      button.classList.add('active');

      // Find the content container
      let contentContainer = null;
      if (button.classList.contains('tab-btn')) {
        contentContainer = button.closest('.workshop-section')?.querySelector('.tab-content');
      } else if (button.classList.contains('code-tab-btn')) {
        contentContainer = button.closest('.code-container')?.querySelector('.code-content');
      }

      if (contentContainer) {
        const panes = contentContainer.querySelectorAll('[id]');
        panes.forEach(pane => pane.classList.remove('active'));
        
        const targetPane = contentContainer.querySelector(`#${tabName}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      }
    });
  });

  // Activate first tab by default
  document.querySelectorAll('.tabs, .code-tabs').forEach(tabGroup => {
    const firstButton = tabGroup.querySelector('.tab-btn, .code-tab-btn');
    if (firstButton) {
      firstButton.classList.add('active');
      
      let contentContainer = null;
      if (tabGroup.classList.contains('tabs')) {
        contentContainer = tabGroup.closest('.workshop-section')?.querySelector('.tab-content');
      } else {
        contentContainer = tabGroup.closest('.code-container')?.querySelector('.code-content');
      }

      if (contentContainer) {
        const tabName = firstButton.getAttribute('data-tab') || firstButton.getAttribute('data-code');
        const panes = contentContainer.querySelectorAll('[id]');
        panes.forEach(pane => pane.classList.remove('active'));
        
        const targetPane = contentContainer.querySelector(`#${tabName}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      }
    }
  });
}

/* ============= FAQ ============= */
function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        // Close other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherQuestion = otherItem.querySelector('.faq-question');
            if (otherQuestion) {
              otherQuestion.classList.remove('active');
            }
          }
        });

        // Toggle current FAQ
        item.classList.toggle('active');
        question.classList.toggle('active');
      });
    }
  });
}

/* ============= LED SIMULATOR ============= */
function initializeLEDSimulator() {
  const ledCircles = document.querySelectorAll('.led-circle');

  ledCircles.forEach(circle => {
    circle.addEventListener('click', function() {
      const color = this.className.match(/\b(red|green|blue)\b/)[1];
      this.classList.toggle('active');
      
      // Add feedback
      addClickFeedback(this);
    });
  });
}

function toggleSimLED(color) {
  const led = document.getElementById('sim' + color.charAt(0).toUpperCase() + color.slice(1));
  if (led) {
    led.classList.toggle('active');
    addClickFeedback(led);
  }
}

function addClickFeedback(element) {
  const feedback = document.createElement('div');
  feedback.style.position = 'absolute';
  feedback.style.pointerEvents = 'none';
  feedback.style.animation = 'pulse 0.6s ease-out';
  element.appendChild(feedback);
  
  setTimeout(() => feedback.remove(), 600);
}

/* ============= SCROLL REVEAL ============= */
function observeElements() {
  const elements = document.querySelectorAll('.project-card, .skill-category, .requirement-card, .tip-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => observer.observe(element));
}

// Run scroll reveal on page load
window.addEventListener('load', observeElements);

/* ============= PERFORMANCE OPTIMIZATION ============= */
// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Close mobile menu on resize to desktop
window.addEventListener('resize', debounce(() => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (window.innerWidth > 768) {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }
}, 250));

/* ============= LAZY LOADING ============= */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/* ============= PAGE LOAD ANIMATION ============= */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

/* ============= KEYBOARD NAVIGATION ============= */
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape') {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }

  // Tab navigation for FAQ
  if (e.key === 'Tab') {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
      question.setAttribute('tabindex', '0');
      
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }
});

/* ============= ANALYTICS TRACKING ============= */
function trackEvent(category, action, label) {
  // For Google Analytics or similar
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
  
  console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('engagement', 'button_click', btn.textContent);
  });
});

// Track external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('navigation', 'external_link', link.href);
  });
});

/* ============= ACCESSIBILITY ============= */
// Add ARIA labels where needed
function improveAccessibility() {
  // Ensure all icons have descriptive text
  document.querySelectorAll('i[class*="fa-"]').forEach(icon => {
    if (!icon.parentElement.textContent.trim()) {
      icon.setAttribute('aria-hidden', 'true');
    }
  });

  // Ensure all buttons have proper labels
  document.querySelectorAll('button').forEach(btn => {
    if (!btn.textContent.trim() && !btn.hasAttribute('aria-label')) {
      btn.setAttribute('aria-label', btn.getAttribute('title') || 'Button');
    }
  });
}

improveAccessibility();

/* ============= CONSOLE GREETING ============= */
console.log('%c🚀 Welcome to Nijan\'s Portfolio!', 'font-size: 16px; color: #6366f1; font-weight: bold;');
console.log('%cBuilt with modern web technologies including HTML5, CSS3, and Vanilla JavaScript', 'color: #6b7280;');