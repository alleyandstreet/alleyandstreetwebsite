/**
 * Alley & Street - Interactive JavaScript
 * Handles animations, tagline rotation, and easter eggs
 */

// ========================================
// TAGLINE ROTATOR
// ========================================
class TaglineRotator {
    constructor() {
        this.statements = document.querySelectorAll('.tagline-statement');
        this.currentIndex = 0;
        this.interval = 4000; // Increased to 4 seconds for full sentences

        if (this.statements.length > 0) {
            this.start();
        }
    }

    start() {
        setInterval(() => this.rotate(), this.interval);
    }

    rotate() {
        const currentStatement = this.statements[this.currentIndex];

        // Add exit animation to current statement
        currentStatement.classList.remove('active');
        currentStatement.classList.add('exit');

        // Move to next statement
        this.currentIndex = (this.currentIndex + 1) % this.statements.length;
        const nextStatement = this.statements[this.currentIndex];

        // Reset and activate next statement
        nextStatement.classList.remove('exit');
        nextStatement.classList.add('active');

        // Clean up exit class after animation
        setTimeout(() => {
            currentStatement.classList.remove('exit');
        }, 800);
    }
}

// ========================================
// PROCESS SECTION REVEAL
// ========================================
class ProcessReveal {
    constructor() {
        this.btn = document.getElementById('processBtn');
        this.section = document.getElementById('processSection');

        if (this.btn && this.section) {
            this.init();
        }
    }

    init() {
        this.btn.addEventListener('click', () => {
            this.section.classList.add('visible');

            // Smooth scroll to section
            setTimeout(() => {
                this.section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);

            // Update button text
            this.btn.querySelector('.btn-text').textContent = 'View Our Process';
        });
    }
}

// ========================================
// BRIEFCASE EASTER EGG (follows cursor)
// ========================================
class BriefcaseEasterEgg {
    constructor() {
        this.briefcase = document.getElementById('briefcase');
        this.isVisible = false;
        this.secretCode = [];
        this.targetCode = ['a', 's']; // Type "as" to activate

        if (this.briefcase) {
            this.init();
        }
    }

    init() {
        // Listen for secret code
        document.addEventListener('keydown', (e) => {
            this.secretCode.push(e.key.toLowerCase());

            // Keep only last 2 characters
            if (this.secretCode.length > 2) {
                this.secretCode.shift();
            }

            // Check if code matches
            if (this.secretCode.join('') === this.targetCode.join('')) {
                this.toggle();
            }
        });

        // Follow cursor when visible
        document.addEventListener('mousemove', (e) => {
            if (this.isVisible) {
                this.briefcase.style.left = `${e.clientX + 15}px`;
                this.briefcase.style.top = `${e.clientY + 15}px`;
            }
        });
    }

    toggle() {
        this.isVisible = !this.isVisible;
        this.briefcase.classList.toggle('visible', this.isVisible);
    }
}

// ========================================
// EASTER EGG MODAL
// ========================================
class EasterEggModal {
    constructor() {
        this.trigger = document.getElementById('easterEggTrigger');
        this.modal = document.getElementById('easterModal');
        this.closeBtn = document.getElementById('easterClose');
        this.clickCount = 0;

        if (this.trigger && this.modal) {
            this.init();
        }
    }

    init() {
        // Triple click to open
        this.trigger.addEventListener('click', () => {
            this.clickCount++;

            setTimeout(() => {
                this.clickCount = 0;
            }, 500);

            if (this.clickCount >= 3) {
                this.open();
                this.clickCount = 0;
            }
        });

        // Close button
        this.closeBtn.addEventListener('click', () => this.close());

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('visible');
        document.body.style.overflow = '';
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');

        if (this.elements.length > 0) {
            this.init();
        }
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }
}

// ========================================
// STAT CARDS HOVER EFFECT
// ========================================
class StatCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.stat-card');

        if (this.cards.length > 0) {
            this.init();
        }
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add a subtle glow effect
                card.style.boxShadow = '0 0 30px rgba(255,255,255,0.1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });
    }
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');

        if (this.links.length > 0) {
            this.init();
        }
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
class HeroParallax {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.badge = document.querySelector('.glass-badge');
        this.logo = document.querySelector('.logo-text');

        if (this.hero) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (this.badge) {
                this.badge.style.transform = `translateY(${rate * 0.5}px)`;
            }

            if (this.logo) {
                this.logo.style.transform = `translateY(${rate * 0.3}px)`;
            }
        });
    }
}

// ========================================
// KONAMI CODE EASTER EGG
// ========================================
class KonamiCode {
    constructor() {
        this.code = [
            'ArrowUp', 'ArrowUp',
            'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight',
            'ArrowLeft', 'ArrowRight',
            'b', 'a'
        ];
        this.currentIndex = 0;

        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.code[this.currentIndex]) {
                this.currentIndex++;

                if (this.currentIndex === this.code.length) {
                    this.activate();
                    this.currentIndex = 0;
                }
            } else {
                this.currentIndex = 0;
            }
        });
    }

    activate() {
        // Create confetti effect
        this.createConfetti();

        // Show secret message
        const message = document.createElement('div');
        message.innerHTML = '🎮 Konami Code Activated! You found another secret!';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #0a0a26, #1a1a4a);
            color: white;
            padding: 2rem 3rem;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.2);
            font-family: 'DM Sans', sans-serif;
            z-index: 9999;
            animation: popIn 0.5s ease;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 9998;
                animation: fall ${2 + Math.random() * 2}s linear forwards;
            `;

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }

        // Add keyframe animation if not exists
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(110vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                @keyframes popIn {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
                @keyframes fadeOut {
                    to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ========================================
// CONTACT DROPDOWN
// ========================================
class ContactDropdown {
    constructor() {
        this.btn = document.getElementById('contactBtn');
        this.dropdown = document.getElementById('contactDropdown');
        this.isOpen = false;

        if (this.btn && this.dropdown) {
            this.init();
        }
    }

    init() {
        // Toggle on click
        this.btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.dropdown.contains(e.target) && !this.btn.contains(e.target)) {
                this.close();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (this.isOpen && e.key === 'Escape') {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.dropdown.classList.toggle('active', this.isOpen);
        this.btn.setAttribute('aria-expanded', this.isOpen);
    }

    close() {
        this.isOpen = false;
        this.dropdown.classList.remove('active');
        this.btn.setAttribute('aria-expanded', 'false');
    }
}

// ========================================
// LOGO CLICK INTERACTION
// ========================================
class LogoInteraction {
    constructor() {
        this.logo = document.querySelector('.logo-text');
        this.clickCount = 0;

        if (this.logo) {
            this.init();
        }
    }

    init() {
        this.logo.addEventListener('click', () => {
            this.clickCount++;

            // Pulse effect on click
            this.logo.style.animation = 'none';
            setTimeout(() => {
                this.logo.style.animation = 'logoGlow 3s ease-in-out infinite';
            }, 10);

            // Easter egg: 5 clicks
            if (this.clickCount === 5) {
                this.showMessage();
                this.clickCount = 0;
            }

            setTimeout(() => {
                this.clickCount = 0;
            }, 2000);
        });
    }

    showMessage() {
        const toast = document.createElement('div');
        toast.textContent = '✨ Thanks for exploring! - A&S Team';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(20px);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.2);
            font-family: 'DM Sans', sans-serif;
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ========================================
// TEAM SECTION SCROLL ANIMATION
// ========================================
class TeamScrollAnimation {
    constructor() {
        this.teamCards = document.querySelectorAll('.team-card');

        if (this.teamCards.length > 0) {
            this.init();
        }
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        this.teamCards.forEach(card => observer.observe(card));
    }
}

// ========================================
// ABOUT SECTION SCROLL ANIMATION
// ========================================
class AboutScrollAnimation {
    constructor() {
        this.metricCards = document.querySelectorAll('.metric-card');

        if (this.metricCards.length > 0) {
            this.init();
        }
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        this.metricCards.forEach(card => observer.observe(card));
    }
}

// ========================================
// INITIALIZE ALL MODULES
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new TaglineRotator();
    new ProcessReveal();
    new SmoothScroll();

    // Effects
    new ScrollAnimations();
    new StatCardEffects();
    new HeroParallax();
    new TeamScrollAnimation();
    new AboutScrollAnimation();

    // Easter eggs
    new BriefcaseEasterEgg();
    new EasterEggModal();
    new KonamiCode();
    new LogoInteraction();
    new ContactDropdown();

    // Console easter egg
    console.log('%c🏢 Alley AND Street', 'font-size: 24px; font-weight: bold; color: #0a0a26;');
    console.log('%cMicro Private Equity', 'font-size: 14px; color: #666;');
    console.log('%c\nYou found the dev console! Type "hint" for easter egg clues.', 'font-size: 12px; color: #999;');

    // Global hint function for console
    window.hint = function () {
        console.log('%cEaster Egg Hints:', 'font-weight: bold;');
        console.log('1. Type "as" anywhere');
        console.log('2. Triple-click the diamond in the footer');
        console.log('3. Click the logo 5 times');
        console.log('4. Try the Konami Code (↑↑↓↓←→←→BA)');
    };
});
