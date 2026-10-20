document.addEventListener("DOMContentLoaded", () => {
    
    // Feature 1: Dynamic Copyright Year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Feature 2: Dark/Light Mode Toggle with LocalStorage
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        themeToggle.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Feature 3: Mobile Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Feature 4: Close Mobile Menu on Nav Item Click
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            if (navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
            }
        });
    });

    // Feature 5: Scroll-to-Top Button Visibility
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // Feature 6: Scroll-to-Top Action
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

// Feature 7: Typing Effect
const typingElement = document.getElementById("typingText");
const phrases = [
    "Network Computing Student @ UNIMAS",
    "Aspiring Network Engineer"
];
let phraseIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < phrases[phraseIndex].length) {
        typingElement.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 80); // Speed of typing
    } else {
        setTimeout(eraseEffect, 1800); // Wait time before erasing
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typingElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 40); // Speed of erasing
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 400);
    }
}
typeEffect();

    // Feature 8: Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    });

    // Feature 9: Interactive Project Category Filtering
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });

    // Feature 10: Client-Side Contact Form Validation
    const contactForm = document.getElementById("contactForm");
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Clear previous error messages
        document.getElementById("nameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("msgError").textContent = "";

        if (name === "") {
            document.getElementById("nameError").textContent = "Name is required.";
            isValid = false;
        }

        if (email === "" || !email.includes("@")) {
            document.getElementById("emailError").textContent = "Valid email is required.";
            isValid = false;
        }

        if (message === "") {
            document.getElementById("msgError").textContent = "Message cannot be empty.";
            isValid = false;
        }

        if (isValid) {
            document.getElementById("formStatus").textContent = "Thank you! Your message has been sent.";
            document.getElementById("formStatus").style.color = "green";
            contactForm.reset();
        }
    });
});
