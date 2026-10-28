document.addEventListener("DOMContentLoaded", () => {
    // Footer Year
    const yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

   // Theme Toggle with Superman Cape Sweep Animation
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
            const isCurrentlyLight = document.body.classList.contains("light-theme");
            const targetAnimationClass = isCurrentlyLight ? "sweep-dark" : "sweep-light";

            if (capeSweep) {
                capeSweep.classList.remove("sweep-dark", "sweep-light");
                void capeSweep.offsetWidth; // Trigger reflow to restart animation
                capeSweep.classList.add(targetAnimationClass);
            }

            setTimeout(() => {
                document.body.classList.toggle("light-theme");
                const isLightNow = document.body.classList.contains("light-theme");
                themeToggle.textContent = isLightNow ? "☀️ Watchtower Command" : "🌙 Batcave Terminal";
                localStorage.setItem("watchtower-theme", isLightNow ? "light" : "dark");
            }, 750);

            setTimeout(() => {
                if (capeSweep) capeSweep.classList.remove("sweep-dark", "sweep-light");
            }, 1600);
        });
    }
    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    // Navigation Pill Logic
    const navItems = document.querySelectorAll(".nav-item");
    const pill = document.getElementById("navPill");

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
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            updatePill(item);
            if (navLinks) navLinks.classList.remove("show");
        });
    });

    // Scroll-to-Top Button
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Typing Effect
    const typingElement = document.getElementById("typingText");
    const phrases = ["Network Computing Specialist @ UNIMAS", "Tactical Student Leader", "Watchtower Administrator"];
    let phraseIndex = 0, charIndex = 0;

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
        if (!typingElement) return;
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

    // Project Filters
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

    // Live Clock
    setInterval(() => {
        const clockEl = document.getElementById("liveClock");
        if (clockEl) clockEl.textContent = new Date().toTimeString().split(' ')[0];
    }, 1000);
});
