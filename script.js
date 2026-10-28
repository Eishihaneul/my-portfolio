document.addEventListener("DOMContentLoaded", () => {
    
    const yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    const themeToggle = document.getElementById("themeToggle");
    const capeSweep = document.getElementById("capeSweep");
    const currentTheme = localStorage.getItem("watchtower-theme");

    // Default to Light Mode UNLESS user explicitly saved "dark"
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggle.textContent = "🌙 Batcave Terminal";
    } else {
        document.body.classList.remove("dark-theme");
        themeToggle.textContent = "☀️ Watchtower Command";
    }

    themeToggle.addEventListener("click", () => {
        if (capeSweep) {
            capeSweep.classList.remove("sweep-active");
            void capeSweep.offsetWidth;
            capeSweep.classList.add("sweep-active");
        }

        setTimeout(() => {
            document.body.classList.toggle("dark-theme");
            const isDarkNow = document.body.classList.contains("dark-theme");
            themeToggle.textContent = isDarkNow ? "🌙 Batcave Terminal" : "☀️ Watchtower Command";
            localStorage.setItem("watchtower-theme", isDarkNow ? "dark" : "light");
        }, 750);

        setTimeout(() => {
            if (capeSweep) capeSweep.classList.remove("sweep-active");
        }, 1600);
    });

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    const navItems = document.querySelectorAll(".nav-item");
    const pill = document.getElementById("navPill");
    let currentActiveSection = ""; 
    let isNavigating = false; 

    function updatePill(activeItem) {
        if (!pill || !activeItem) return;
        const itemRect = activeItem.getBoundingClientRect();
        const parentRect = navLinks.getBoundingClientRect();
        
        const leftOffset = Math.round(itemRect.left - parentRect.left);
        const width = Math.round(itemRect.width);

        pill.style.transform = `translateX(${leftOffset}px) translateZ(0)`;
        pill.style.width = `${width}px`;
        pill.style.opacity = "1";
    }

    window.addEventListener("load", () => {
        const activeLink = document.querySelector(".nav-item.active") || navItems[0];
        if (activeLink) updatePill(activeLink);
    });

    window.addEventListener("resize", () => {
        const activeLink = document.querySelector(".nav-item.active");
        if (activeLink) updatePill(activeLink);
    });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            isNavigating = true; 

            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            updatePill(item);

            if (navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
            }

            setTimeout(() => {
                isNavigating = false;
            }, 800);
        });
    });

    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        if (isNavigating) return; 

        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        if (current !== currentActiveSection) {
            currentActiveSection = current;
            navItems.forEach(item => {
                if (item.getAttribute("href") === `#${current}`) {
                    navItems.forEach(i => i.classList.remove("active"));
                    item.classList.add("active");
                    updatePill(item);
                }
            });
        }
    });

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const typingElement = document.getElementById("typingText");
    const phrases = [
        "Network Computing Specialist @ UNIMAS💻",
        "Tactical Vice President🕵️‍♂️",
        "Right dock Safey Bureau🪽",
        "Watchtower Systems Administrator👁️"
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

    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            let delay = 0;

            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.classList.remove("hide");
                    card.style.opacity = "0";
                    card.style.transform = "translateY(25px) translateX(-15px) translateZ(0)";
                    
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0) translateX(0) translateZ(0)";
                    }, delay);
                    delay += 80; 
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });

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
            formStatus.textContent = "Transmission verified and logged into Watchtower comms.";
            formStatus.style.color = "var(--primary-color)";
            contactForm.reset();
        }
    });

    function updateWatchtowerClock() {
        const now = new Date();
        const clockEl = document.getElementById("liveClock");
        if (clockEl) clockEl.textContent = now.toTimeString().split(' ')[0];

        const pingEl = document.getElementById("livePing");
        if (pingEl && Math.random() > 0.7) {
            pingEl.textContent = (Math.floor(Math.random() * 8) + 10) + "ms";
        }
    }
    setInterval(updateWatchtowerClock, 1000);
    updateWatchtowerClock();

    const observerOptions = { threshold: 0.12 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-reveal").forEach(el => revealObserver.observe(el));
});
