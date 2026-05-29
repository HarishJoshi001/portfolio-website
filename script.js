// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Sticky navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const darkModePreference = localStorage.getItem('darkMode');

// Check system preference or stored preference
if (darkModePreference === 'enabled' || (!darkModePreference && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        updateThemeIcon();
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Form submission with Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
    // Get Formspree endpoint from form action
    const formAction = this.action;
    
    // Collect form data
    const formData = new FormData(this);

    // Send request
    fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your message! I will respond shortly.');
            this.reset();
        } else {
            response.json().then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                }
            });
        }
    })
    .catch(error => {
        alert('Oops! There was a problem sending your message.');
    });
    });
}

/*for skills animation */
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('#about');
    const skillsItems = document.querySelectorAll('.skills li');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 200 * index); // 200ms delay between each item
                });
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.5 });

    skillsObserver.observe(skillsSection);
});


// for projects animation
// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to apply animation when elements are in view
function animateProjectCards() {
    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => {
        if (isElementInViewport(card)) {
            card.classList.add("show");
        }
    });
}

// Run animation check on scroll and on load
window.addEventListener("scroll", animateProjectCards);
window.addEventListener("load", animateProjectCards);
