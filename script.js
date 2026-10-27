document.addEventListener("DOMContentLoaded", () => {
    
    // Feature 1: Dynamic Copyright Year in Footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Feature 2: Watchtower (Light) vs Batcave (Dark) Theme Toggle + Smooth Bidirectional Cape Sweep
    const themeToggle = document.getElementById("themeToggle");
    const capeSweep = document.getElementById("capeSweep");
    const currentTheme = localStorage.getItem("watchtower-theme");

    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "☀️ Watchtower Command";
    }

    themeToggle.addEventListener("click", () => {
        const isCurrentlyLight = document.body.classList.contains("light-theme");
        const animationClass = isCurrentlyLight ? "sweep-left" : "sweep-right";

        if (capeSweep) {
            capeSweep.classList.remove("sweep-left", "sweep-right");
            void capeSweep.offsetWidth; // Force browser reflow for clean restart
            capeSweep.classList.add(animationClass);
        }

        // Switch theme midway through sweep animation
        setTimeout(() => {
            document.body.classList.toggle("light-theme");
            const isLightNow = document.body.classList.contains("light-theme");
            themeToggle.textContent = isLightNow ? "☀️ Watchtower Command" : "🌙 Batcave Terminal";
            localStorage.setItem("watchtower-theme", isLightNow ? "light" : "dark");
        }, 300);

        // Remove animation class after completion
        setTimeout(() => {
            if (capeSweep) {
                capeSweep.classList.remove("sweep-left", "sweep-right");
            }
        }, 650);
    });

    // Feature 3: Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Feature 4: Auto-Close Mobile Menu on Link Click
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

    // Feature 7: Watchtower Hero Typing Effect
    const typingElement = document.getElementById("typingText");
    const phrases = [
        "Network Computing Specialist @ UNIMAS",
        "Tactical Student Leader & Vice President",
        "Minggu Aluan Pelajar Facilitator",
        "Watchtower Systems Administrator"
    ];
    let phraseIndex = 0;
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < phrases[phraseIndex].length) {
            typingElement.textContent += phrases[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 65);
        } else {
            setTimeout(eraseEffect, 1800);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            typingElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 35);
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

    // Feature 9: Project Directive Category Filter
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

    // Feature 10: Client-Side Contact Transmission Validation
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

        nameError.textContent = "";
        emailError.textContent = "";
        msgError.textContent = "";
        formStatus.textContent = "";

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Operator name required.";
            isValid = false;
        }

        if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
            emailError.textContent = "Valid comms email required.";
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            msgError.textContent = "Transmission message cannot be empty.";
            isValid = false;
        }

        if (isValid) {
            formStatus.textContent = "Transmission verified and logged into Watchtower coms.";
            formStatus.style.color = "var(--primary-color)";
            contactForm.reset();
        }
    });

    // Feature 11: Live Watchtower Tactical Clock & Ping Simulation
    function updateWatchtowerClock() {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        const clockEl = document.getElementById("liveClock");
        if (clockEl) clockEl.textContent = timeString;

        const pingEl = document.getElementById("livePing");
        if (pingEl && Math.random() > 0.7) {
            const randomPing = Math.floor(Math.random() * 8) + 10;
            pingEl.textContent = randomPing + "ms";
        }
    }
    setInterval(updateWatchtowerClock, 1000);
    updateWatchtowerClock();

    // Smooth Scroll Reveal Animation for Cards
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".bat-card").forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        revealObserver.observe(card);
    });
});
