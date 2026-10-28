document.addEventListener("DOMContentLoaded", () => {
    // 1. Footer Year
    const yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // 2. Live Tactical Clock & Ping
    function updateClock() {
        const clockElement = document.getElementById("liveClock");
        const pingElement = document.getElementById("livePing");
        if (clockElement) {
            const now = new Date();
            clockElement.textContent = now.toLocaleTimeString('en-US', { hour12: false });
        }
        if (pingElement) {
            pingElement.textContent = Math.floor(Math.random() * (24 - 8 + 1) + 8) + "ms";
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 3. Theme Toggle & Superman Sweep
    const themeToggle = document.getElementById("themeToggle");
    const capeSweep = document.getElementById("capeSweep");
    const currentTheme = localStorage.getItem("watchtower-theme") || "light";

    if (currentTheme === "dark") {
        document.body.classList.remove("light-theme");
        if (themeToggle) themeToggle.textContent = "🌙 Batcave Terminal";
    } else {
        document.body.classList.add("light-theme");
        if (themeToggle) themeToggle.textContent = "☀️ Watchtower Command";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            if (capeSweep) {
                capeSweep.classList.remove("sweep-active");
                void capeSweep.offsetWidth; 
                capeSweep.classList.add("sweep-active");
            }

            setTimeout(() => {
                document.body.classList.toggle("light-theme");
                const isLightNow = document.body.classList.contains("light-theme");
                themeToggle.textContent = isLightNow ? "☀️ Watchtower Command" : "🌙 Batcave Terminal";
                localStorage.setItem("watchtower-theme", isLightNow ? "light" : "dark");
            }, 750);

            setTimeout(() => {
                if (capeSweep) capeSweep.classList.remove("sweep-active");
            }, 1600);
        });
    }

    // 4. Mobile Menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    // 5. Navigation Pill Logic
    const navItems = document.querySelectorAll(".nav-item");
    const pill = document.getElementById("navPill");
    let isNavigating = false;

    function updatePill(activeItem) {
        if (!pill || !activeItem || !navLinks) return;
        const itemRect = activeItem.getBoundingClientRect();
        const parentRect = navLinks.getBoundingClientRect();
        pill.style.transform = `translateX(${Math.round(itemRect.left - parentRect.left)}px) translateZ(0)`;
        pill.style.width = `${Math.round(itemRect.width)}px`;
        pill.style.opacity = "1";
    }

    window.addEventListener("load", () => {
        const activeLink = document.querySelector(".nav-item.active") || navItems[0];
        if (activeLink) updatePill(activeLink);
    });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            isNavigating = true;
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            updatePill(item);
            if (navLinks) navLinks.classList.remove("show");
            setTimeout(() => isNavigating = false, 800);
        });
    });

    // 6. Scroll Spy & Scroll Reveal
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        if (!isNavigating) {
            let current = "";
            sections.forEach(section => {
                if (window.scrollY >= (section.offsetTop - section.clientHeight / 3)) {
                    current = section.getAttribute("id");
                }
            });
            navItems.forEach(item => {
                item.classList.remove("active");
                if (item.getAttribute("href") === `#${current}`) {
                    item.classList.add("active");
                    updatePill(item);
                }
            });
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("active");
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));

    // 7. Scroll-to-Top
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });
        scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    // 8. Typing Effect
    const typingElement = document.getElementById("typingText");
    const phrases = [
        "Network Computing Specialist @ UNIMAS 💻",
        "Tactical Vice President 🕵️‍♂️",
        "Right dock Safety Bureau 🪽",
        "Watchtower Systems Administrator 👁️"
    ];
    let phraseIndex = 0;
    let charIndex = 0;

    function typeEffect() {
        if (!typingElement) return;
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
    if (typingElement) typeEffect();

    // 9. Flip Card Logic
    document.querySelectorAll(".flip-card").forEach(card => {
        card.addEventListener("click", () => card.classList.toggle("flipped"));
    });

    // 10. Contact Form Validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            document.getElementById("nameError").textContent = name ? "" : "Operator name required.";
            document.getElementById("emailError").textContent = (email && email.includes("@")) ? "" : "Valid comms email required.";
            document.getElementById("msgError").textContent = message ? "" : "Mission description cannot be empty.";
            
            if (!name || !email || !email.includes("@") || !message) isValid = false;

            if (isValid) {
                document.getElementById("formStatus").textContent = "Transmission logged successfully into Watchtower terminal.";
                contactForm.reset();
            }
        });
    }
});
