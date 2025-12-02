// app.js - Apple-like Animations

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍎 Portfólio Caputo - Carregado');
    
    // ============ INITIALIZATION ============
    const currentYear = new Date().getFullYear();
    
    // ============ APPLE LOADER ============
    const loader = document.querySelector('.apple-loader');
    setTimeout(() => {
        loader.classList.add('loaded');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
    
    // ============ DARK/LIGHT THEME ============
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check saved theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // ============ APPLE NAVIGATION ============
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.apple-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'saturate(180%) blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.backdropFilter = 'saturate(180%) blur(20px)';
        }
    });
    
    // Dark mode navbar adjustment
    const updateNavbar = () => {
        if (document.documentElement.classList.contains('dark')) {
            if (window.scrollY > 20) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            }
        }
    };
    
    window.addEventListener('scroll', updateNavbar);
    themeToggle.addEventListener('click', updateNavbar);
    
    // ============ HERO ANIMATIONS ============
    // Typewriter effect for hero if needed
    const heroText = document.querySelector('.hero-headline');
    if (heroText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroText);
    }
    
    // ============ COUNTER ANIMATIONS ============
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(animateCounter);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ============ SKILL BARS ANIMATION ============
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // ============ PROJECT FILTER ============
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ============ CONTACT FORM ============
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simulate API call
            setTimeout(() => {
                // Show success notification
                showNotification('Mensagem enviada com sucesso!', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 1500);
        });
    }
    
    // ============ NOTIFICATIONS ============
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'apple-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            background: var(--color-white);
            border: 1px solid var(--color-gray-2);
            border-left: 4px solid ${type === 'success' ? '#28ca42' : '#007aff'};
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            transform: translateX(150%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9999;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // ============ SMOOTH SCROLL ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============ LAZY LOAD IMAGES ============
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ============ PARALLAX EFFECT ============
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', () => {
        if (heroBackground) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
    
    // ============ CURSOR EFFECT (Optional) ============
    const cursor = document.createElement('div');
    cursor.className = 'apple-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add cursor styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .apple-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-gray-4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        }
        
        .apple-cursor.hover {
            transform: translate(-50%, -50%) scale(1.5);
            border-color: var(--color-accent);
        }
        
        a:hover ~ .apple-cursor,
        button:hover ~ .apple-cursor {
            transform: translate(-50%, -50%) scale(1.5);
            border-color: var(--color-accent);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // ============ PERFORMANCE OPTIMIZATION ============
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate anything if needed
        }, 250);
    });
    
    // ============ GSAP ANIMATIONS ============
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        gsap.from('.hero-headline .line', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-description', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.5,
            ease: 'power3.out'
        });
        
        gsap.from('.code-window', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            });
        });
        
        // Project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                y: 30,
                opacity: 0,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
        
        // Timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                x: -30,
                opacity: 0,
                delay: i * 0.15,
                ease: 'power3.out'
            });
        });
    }
});

// Fallback for older browsers
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}