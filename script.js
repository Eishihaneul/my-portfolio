document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Footer Year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Theme Toggle & Superman Morph Sweep
    const themeToggle = document.getElementById("themeToggle");
    const capeSweep = document.getElementById("capeSweep");
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem("dcu-theme") || "dark";
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
    }

    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-theme");
        
        // Trigger correct gradient sweep class
        const targetAnimationClass = isLight ? "sweep-dark" : "sweep-light";
        
        if (capeSweep) {
            capeSweep.classList.remove("sweep-dark", "sweep-light");
            void capeSweep.offsetWidth; // Force layout reflow
            capeSweep.classList.add(targetAnimationClass);
        }

        // Swap theme colors exactly when Superman covers the screen (midpoint)
        setTimeout(() => {
            document.body.classList.toggle("light-theme");
            const isLightNow = document.body.classList.contains("light-theme");
            localStorage.setItem("dcu-theme", isLightNow ? "light" : "dark");
        }, 750);

        // Remove animation class after sweep completes
        setTimeout(() => {
            if (capeSweep) capeSweep.classList.remove("sweep-dark", "sweep-light");
        }, 1600);
    });

    // 3. Navigation Pill Logic
    const navItems = document.querySelectorAll(".nav-item");
    const pill = document.getElementById("navPill");
    const navLinks = document.getElementById("navLinks");
    let isNavigating = false;

    function updatePill(activeItem) {
        if (!pill || !activeItem || !navLinks) return;
        // Use offset calculations local to the container for jiggle-free sliding
        const itemRect = activeItem.getBoundingClientRect();
        const parentRect = navLinks.getBoundingClientRect();
        const leftOffset = Math.round(itemRect.left - parentRect.left);
        const width = Math.round(itemRect.width);

        pill.style.transform = `translateX(${leftOffset}px) translateZ(0)`;
        pill.style.width = `${width}px`;
        pill.style.opacity = "1";
    }

    // Set pill position on load and resize
    window.addEventListener("load", () => {
        const activeLink = document.querySelector(".nav-item.active") || navItems[0];
        if (activeLink) updatePill(activeLink);
    });
    window.addEventListener("resize", () => {
        const activeLink = document.querySelector(".nav-item.active");
        if (activeLink) updatePill(activeLink);
    });

    // 4. Scroll Spy & Click Navigation
    const sections = document.querySelectorAll("section");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            isNavigating = true;
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            updatePill(item);
            
            // Release scroll lock after smooth scroll ends
            setTimeout(() => { isNavigating = false; }, 800);
        });
    });

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

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
                updatePill(item);
            }
        });
    });

    // 5. Flip Card Interaction
    document.querySelectorAll(".flip-card").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });

    // 6. Intersection Observer for Scroll Reveals
    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Slight stagger for a polished cascade effect
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, index * 80); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-reveal").forEach(el => revealObserver.observe(el));

    // 7. Live System Telemetry (Clock & Ping)
    setInterval(() => {
        const clockEl = document.getElementById("liveClock");
        const pingEl = document.getElementById("livePing");
        
        if (clockEl) {
            clockEl.textContent = new Date().toTimeString().split(' ')[0];
        }
        
        // Randomize ping slightly to simulate live network data
        if (pingEl && Math.random() > 0.6) {
            pingEl.textContent = (Math.floor(Math.random() * 15) + 8) + "ms";
        }
    }, 1000);
});
