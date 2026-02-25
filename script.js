// script.js

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  
  const toggleBtn = document.querySelector('.dark-mode-toggle');
  if (document.body.classList.contains('dark-mode')) {
    toggleBtn.innerHTML = '☀️ Light Mode';
  } else {
    toggleBtn.innerHTML = '🌙 Dark Mode';
  }
  
  // Save preference to localStorage
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
  
  // Animate hamburger menu
  const spans = document.querySelectorAll('.mobile-menu span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const spans = document.querySelectorAll('.mobile-menu span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = '☀️ Light Mode';
    }
  }
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize animated counters
  initCounters();
  
  // Initialize contact form validation
  initContactForm();
});

// Scroll Animations
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// Animated Counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const step = target / (duration / 16); // 60fps
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Contact Form Validation
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    
    // Reset message
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    
    // Validation
    let errors = [];
    
    if (name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (message.length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
      formMessage.classList.add('error');
      formMessage.innerHTML = '⚠️ ' + errors.join('<br>');
      return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('.form-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      formMessage.classList.add('success');
      formMessage.innerHTML = '✅ Thank you for your message! We\'ll get back to you soon.';
      
      // Reset form
      form.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formMessage.classList.remove('success');
        formMessage.innerHTML = '';
      }, 5000);
    }, 1500);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'rgba(253, 250, 224, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.backgroundColor = 'rgba(253, 250, 224, 0.95)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  }
  
  // Update dark mode navbar
  if (document.body.classList.contains('dark-mode')) {
    navbar.style.backgroundColor = window.scrollY > 50 
      ? 'rgba(22, 33, 62, 0.98)' 
      : 'rgba(22, 33, 62, 0.95)';
  }
});

// Add active class to current page link
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--primary-green)';
      link.style.fontWeight = '700';
    }
  });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero && window.scrollY < window.innerHeight) {
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
  }
});

// Lazy loading for images (if any added later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => {
  imageObserver.observe(img);
});

// Console welcome message
console.log('%c🌿 Switch Your Search', 'font-size: 24px; font-weight: bold; color: #2d6a4f;');
console.log('%cMaking the internet more sustainable, one search at a time.', 'font-size: 14px; color: #40916c;');