// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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

// Add this to handle animation refresh
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.style.animationPlayState = 'running';
        }
    });
}

// Initial check
handleScrollAnimations();

// Check on scroll
window.addEventListener('scroll', handleScrollAnimations);

// Form submission
// Form submission with Formspree
document.getElementById('contact-form').addEventListener('submit', function(e) {
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

// Mobile menu toggle (you can add this if you want mobile menu)
// const menuToggle = document.querySelector('.menu-toggle');
// const navLinks = document.querySelector('.nav-links');

// menuToggle.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });


// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateToggleIcon();
}

// Toggle Dark Mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateToggleIcon();
    
    // Save theme preference to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.removeItem('theme');
    }
});

// Update Toggle Icon
function updateToggleIcon() {
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Sun icon for light mode
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Moon icon for dark mode
    }
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
