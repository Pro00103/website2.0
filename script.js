document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle (Quick toggle between current and light)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = themeToggleBtn?.querySelector('.dark-icon');
    const lightIcon = themeToggleBtn?.querySelector('.light-icon');
    if(themeToggleBtn && darkIcon && lightIcon) {
        const savedTheme = localStorage.getItem('theme') || 'default';
        if (savedTheme === 'light') {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        }
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'default';
            let newTheme = currentTheme === 'light' ? 'default' : 'light';
            
            // Clean up old classes
            document.body.className = document.body.className.replace(/theme-\w+|light-mode/g, '').trim();
            
            if (newTheme === 'light') {
                document.body.classList.add('light-mode');
                darkIcon.classList.add('hidden');
                lightIcon.classList.remove('hidden');
            } else {
                if(newTheme !== 'default') {
                    document.body.classList.add(`theme-${newTheme}`);
                }
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
            }
            localStorage.setItem('theme', newTheme);
        });
    }
    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    if(langToggle) {
        let currentLang = localStorage.getItem('lang') || 'it';
        langToggle.addEventListener('click', () => {
            document.body.classList.add('lang-changing');
            
            setTimeout(() => {
                document.body.classList.remove(`lang-${currentLang}`);
                currentLang = currentLang === 'it' ? 'en' : 'it';
                document.body.classList.add(`lang-${currentLang}`);
                document.documentElement.lang = currentLang;
                localStorage.setItem('lang', currentLang);
                
                if (window.typeText && window.typedElement) {
                    window.texts = currentLang === 'it' ? window.textsIT : window.textsEN;
                    window.typedElement.textContent = "";
                    window.index = 0; 
                    window.count = 0;
                    clearTimeout(window.typingTimer);
                    window.typeText();
                }
                document.body.classList.remove('lang-changing');
            }, 300);
        });
    }
    // Dynamic Island Logic
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    // Typing Effect Hero (only if typed-text exists)
    window.textsIT = ["System Administrator", "Appassionato Cloud", "Problem Solver", "Studente IT"];
    window.textsEN = ["System Administrator", "Cloud Enthusiast", "Problem Solver", "IT Student"];
    window.texts = window.textsIT; // Default
    let currentLangOnLoad = localStorage.getItem('lang') || 'it';
    window.texts = currentLangOnLoad === 'it' ? window.textsIT : window.textsEN;
    
    window.count = 0; window.index = 0;
    window.typedElement = document.getElementById('typed-text');
    
    window.typeText = function() {
        if(!window.typedElement) return;
        if(window.count === window.texts.length) window.count = 0;
        let currentText = window.texts[window.count];
        let letter = currentText.slice(0, ++window.index);
        window.typedElement.textContent = letter;
        
        if(letter.length === currentText.length) {
            window.typingTimer = setTimeout(() => {
                window.index = 0; window.count++; window.typeText();
            }, 2000);
        } else {
            window.typingTimer = setTimeout(window.typeText, 100);
        }
    }
    // Cursor Glow (Desktop only)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    const cursorGlow = document.getElementById('cursor-glow');
    if (!isTouchDevice && window.innerWidth > 1024 && cursorGlow) {
        const heroBg1 = document.getElementById('hero-bg-1');
        const heroBg2 = document.getElementById('hero-bg-2');
        
        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let cursorX = mouseX, cursorY = mouseY;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursorGlow.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            if(window.scrollY < window.innerHeight) {
                const moveX = (cursorX - window.innerWidth / 2) * 0.04;
                const moveY = (cursorY - window.innerHeight / 2) * 0.04;
                if(heroBg1) heroBg1.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                if(heroBg2) heroBg2.style.transform = `translate3d(${-moveX}px, ${-moveY}px, 0)`;
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }
    // Tilt Card
    if (!isTouchDevice) {
        const tiltCards = document.querySelectorAll('.tilt-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }
    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if(menuBtn && mobileMenu) {
        function toggleMenu() {
            mobileMenu.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
            const icon = menuBtn.querySelector('i');
            if(mobileMenu.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        }
        menuBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }
    // GSAP Animations (only if elements exist and GSAP is loaded)
    if(typeof gsap !== 'undefined' && document.getElementById('profile')) {
        const tlLoader = gsap.timeline({
            onComplete: () => { 
                document.body.classList.remove('no-scroll'); 
                if(window.typeText) window.typeText(); 
            }
        });
        let counter = { value: 0 };
        tlLoader.to(counter, {
            value: 100, duration: 1.2, roundProps: "value", ease: "power4.inOut",
            onUpdate: function() { 
                const lp = document.getElementById('loader-percent');
                if(lp) lp.innerText = counter.value + "%"; 
            }
        }, 0)
        .to('#loader-bar', { width: '100%', duration: 1.2, ease: "power4.inOut" }, 0)
        .to('#loader', { opacity: 0, duration: 0.5, display: "none", ease: "power2.inOut", delay: 0.2 })
        .to('.hidden-on-load', { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.2")
        .to('.hero-elem', { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=0.5");
        const triggerStart = isTouchDevice ? "top 90%" : "top 85%";
        gsap.to(".section-title", { scrollTrigger: { trigger: "#profile", start: triggerStart }, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
        gsap.to(".section-content", { scrollTrigger: { trigger: "#profile", start: "top 80%" }, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
        gsap.to(".skill-col", { scrollTrigger: { trigger: "#skills", start: triggerStart }, opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power4.out" });
        gsap.to(".exp-item", { scrollTrigger: { trigger: "#experience", start: triggerStart }, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        gsap.to(".edu-item", { scrollTrigger: { trigger: "#education", start: triggerStart }, opacity: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" });
        gsap.to(".proj-item", { scrollTrigger: { trigger: "#projects", start: triggerStart }, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" });
        // Animazione Numeri Competenze & Barre
        gsap.utils.toArray('.group\\/skill').forEach(skillGroup => {
            let bar = skillGroup.querySelector('.skill-progress');
            let percentText = skillGroup.querySelector('.skill-percent');
            if(!bar || !percentText) return;
            let targetWidth = bar.getAttribute('data-width');
            let targetValue = parseInt(percentText.getAttribute('data-target'));
            let currentData = { val: 0 };
            gsap.timeline({
                scrollTrigger: { trigger: skillGroup, start: "top 95%" }
            })
            .fromTo(bar, { width: "0%" }, { width: targetWidth, duration: 1.2, ease: "power4.out" }, 0)
            .to(currentData, {
                val: targetValue, duration: 1.2, ease: "power4.out", roundProps: "val",
                onUpdate: () => { percentText.innerText = currentData.val + "%"; }
            }, 0);
        });
    } else {
        // Fallback or non-index page: just hide loader immediately
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
        document.body.classList.remove('no-scroll');
        const hiddenEls = document.querySelectorAll('.hidden-on-load, .hero-elem, .section-title, .section-content, .opacity-0');
        hiddenEls.forEach(el => { 
            el.classList.remove('opacity-0', 'translate-y-10', '-translate-y-10');
            el.style.opacity = '1'; 
            el.style.transform = 'translateY(0)'; 
        });
    }
    // Theme Customizer Logic (for themes.html)
    const themeCards = document.querySelectorAll('.theme-card');
    if(themeCards.length > 0) {
        const currentTheme = localStorage.getItem('theme') || 'default';
        themeCards.forEach(card => {
            if(card.dataset.theme === currentTheme) {
                card.classList.add('ring-4', 'ring-cyan-500', 'scale-105');
            }
            card.addEventListener('click', () => {
                const newTheme = card.dataset.theme;
                // Update UI selection
                themeCards.forEach(c => c.classList.remove('ring-4', 'ring-cyan-500', 'scale-105'));
                card.classList.add('ring-4', 'ring-cyan-500', 'scale-105');
                
                // Keep the 'light' icon sync
                if (newTheme === 'light') {
                    if(darkIcon) darkIcon.classList.add('hidden');
                    if(lightIcon) lightIcon.classList.remove('hidden');
                } else {
                    if(darkIcon) darkIcon.classList.remove('hidden');
                    if(lightIcon) lightIcon.classList.add('hidden');
                }
                document.body.className = document.body.className.replace(/theme-\w+|light-mode/g, '').trim();
                const lang = localStorage.getItem('lang') || 'it';
                document.body.classList.add('lang-' + lang); // ensure language class persists
                document.body.classList.add('antialiased', 'selection:bg-cyan-500', 'selection:text-white', 'relative');
                
                if(newTheme === 'light') document.body.classList.add('light-mode');
                else if(newTheme !== 'default') document.body.classList.add('theme-' + newTheme);
                
                localStorage.setItem('theme', newTheme);
            });
        });
    }
});
