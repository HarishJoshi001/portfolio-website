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
