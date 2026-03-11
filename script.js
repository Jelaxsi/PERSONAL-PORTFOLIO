// 1. Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// 2. Typing Animation (Typed.js)
const typedTextSpan = document.querySelector(".typing-text");
const textArray = ["ICT Undergraduate", "Cybersecurity Enthusiast", "Web Developer", "Tech Innovator"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// 3. Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'light-mode') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light-mode');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', '');
    }
});

// 4. EmailJS Integration
// IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
// You can get this by signing up at https://www.emailjs.com/
(function() {
    emailjs.init("1DBpjtk8G-UCjb9eU");
})();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';

    // Single EmailJS request (avoid duplicate emails)
    emailjs.sendForm('service_3jpi9ro', 'template_80zjjot', contactForm)
        .then(() => {
            btn.innerText = 'Sent!';
            formStatus.innerText = "Message sent successfully!";
            formStatus.style.color = "green";
            contactForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                formStatus.innerText = "";
            }, 3000);
        })
        .catch((error) => {
            console.log("ERROR:", error);
            btn.innerText = originalText;
            formStatus.innerText = "Failed to send message.";
            formStatus.style.color = "red";
        });
});

// 5. Scroll Reveal (Optional simple animation)
window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.project-card, .cert-card, .about-content');

    for(var i = 0; i < reveals.length; i++){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowheight - revealpoint){
            reveals[i].style.opacity = '1';
            reveals[i].style.transform = 'translateY(0)';
        }
    }
}