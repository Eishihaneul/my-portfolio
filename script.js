document.addEventListener("DOMContentLoaded", () => {
    
    // Feature 1: Dynamic Copyright Year in Footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Feature 2: Dark / Light Mode Theme Toggle with localStorage
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("portfolio-theme");

    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        themeToggle.textContent = isLight ? "☀️" : "🌙";
        localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });

    // Feature 3: Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Feature 4: Auto-Close Mobile Menu when a link is clicked
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            if (navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
            }
        });
    });

    // Feature 5: Scroll-to-Top Button Visibility Toggle
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // Feature 6: Smooth Scroll to Top Action
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Feature 7: Typing Effect on Hero Subtitle
    const typingElement = document.getElementById("typingText");
    const phrases = [
        "Network Computing Student @ UNIMAS",
        "Block Vice President & Student Leader",
        "Minggu Aluan Pelajar Facilitator",
        "Aspiring Network Engineer"
    ];
    let phraseIndex = 0;
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < phrases[phraseIndex].length) {
            typingElement.textContent += phrases[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 70);
        } else {
            setTimeout(eraseEffect, 1800);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            typingElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 40);
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
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
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

    // Feature 9: Interactive Project Category Filter
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

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const msgError = document.getElementById("msgError");
        const formStatus = document.getElementById("formStatus");

        // Reset errors
        nameError.textContent = "";
        emailError.textContent = "";
        msgError.textContent = "";
        formStatus.textContent = "";

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            msgError.textContent = "Please enter a message.";
            isValid = false;
        }

        if (isValid) {
            formStatus.textContent = "Thank you! Your message has been validated and sent.";
            formStatus.style.color = "#00f2fe";
            contactForm.reset();
        }
    });
});
