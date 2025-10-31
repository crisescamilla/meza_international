// Loading Screen Functionality - MEJORADO PARA NETLIFY
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const logoVideo = document.getElementById('logo-video');
    const skipButton = document.getElementById('skip-loading');
    
    document.body.classList.add('loading');
    document.documentElement.classList.add('loading');
    
    let hasShownContent = false;
    let videoAttempts = 0;
    const MAX_ATTEMPTS = 5;
    
    function showMainContent() {
        if (hasShownContent) return;
        hasShownContent = true;
        
        console.log('🎬 Mostrando contenido principal');
        
        if (logoVideo && !logoVideo.paused) {
            logoVideo.pause();
        }
        
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.documentElement.classList.remove('loading');
            mainContent.classList.add('show');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1500);
        }, 500);
    }
    
    // Check if we're using static image or video
    const logoStatic = document.querySelector('.logo-static');
    
    if (logoStatic) {
        console.log('🖼️ Usando imagen estática del logo');
        
        // Show content after 3 seconds with static image
        setTimeout(() => {
            console.log('⏱️ Tiempo de imagen estática completado (3 segundos)');
            showMainContent();
        }, 3000);
        
    } else if (logoVideo) {
        console.log('📹 Iniciando carga de video...');
        
        // Detectar errores de decodificación temprano
        setTimeout(() => {
            if (logoVideo.readyState === 0 && !hasShownContent) {
                console.warn('⚠️ Video no se está cargando, mostrando imagen estática');
                const fallbackImg = document.querySelector('.logo-fallback');
                if (fallbackImg) {
                    logoVideo.style.display = 'none';
                    fallbackImg.style.display = 'block';
                }
                setTimeout(showMainContent, 2000);
            }
        }, 1000);
        
        // Función mejorada para forzar reproducción
        function attemptVideoPlay() {
            if (videoAttempts >= MAX_ATTEMPTS || hasShownContent) return;
            
            videoAttempts++;
            console.log(`🔄 Intento ${videoAttempts} de reproducir video`);
            
            // Asegurar que el video esté configurado correctamente
            logoVideo.muted = true;
            logoVideo.volume = 0;
            logoVideo.playbackRate = 1.0;
            logoVideo.defaultMuted = true;
            
            // Intentar reproducir
            const playPromise = logoVideo.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✅ Video reproduciéndose correctamente');
                    })
                    .catch(error => {
                        console.warn('⚠️ Autoplay bloqueado:', error.message);
                        
                        // Si falló, mostrar imagen fallback
                        if (videoAttempts >= MAX_ATTEMPTS) {
                            console.log('❌ Mostrando imagen de respaldo');
                            const fallbackImg = document.querySelector('.logo-fallback');
                            if (fallbackImg) {
                                logoVideo.style.display = 'none';
                                fallbackImg.style.display = 'block';
                            }
                        } else {
                            // Reintentar después de un breve delay
                            setTimeout(attemptVideoPlay, 100);
                        }
                    });
            }
        }
        
        // Múltiples intentos de reproducción
        attemptVideoPlay(); // Intento inmediato
        setTimeout(attemptVideoPlay, 50);
        setTimeout(attemptVideoPlay, 150);
        setTimeout(attemptVideoPlay, 300);
        
        // Configurar temporizadores
        let contentTimer = setTimeout(() => {
            console.log('⏱️ Tiempo de video completado (4 segundos)');
            showMainContent();
        }, 4000);
        
        // Cuando el video alcanza 4 segundos
        logoVideo.addEventListener('timeupdate', function() {
            if (this.currentTime >= 4 && !hasShownContent) {
                console.log('🎯 Video alcanzó 4 segundos');
                clearTimeout(contentTimer);
                showMainContent();
            }
        });
        
        // Si el video termina antes de 4 segundos
        logoVideo.addEventListener('ended', function() {
            console.log('🏁 Video terminó naturalmente');
            clearTimeout(contentTimer);
            showMainContent();
        });
        
        // Si hay error cargando el video
        logoVideo.addEventListener('error', function(e) {
            console.error('❌ Error cargando video:', e);
            clearTimeout(contentTimer);
            
            // Mostrar imagen fallback inmediatamente
            const fallbackImg = document.querySelector('.logo-fallback');
            if (fallbackImg) {
                logoVideo.style.display = 'none';
                fallbackImg.style.display = 'block';
                console.log('🖼️ Mostrando imagen estática como fallback');
            }
            
            // Mostrar contenido después de 2 segundos con imagen
            setTimeout(showMainContent, 2000);
        });
        
        // Detectar errores de decodificación específicamente
        logoVideo.addEventListener('loadstart', function() {
            console.log('🚀 Iniciando carga del video...');
        });
        
        logoVideo.addEventListener('progress', function() {
            console.log('📈 Progreso de carga del video');
        });
        
        // Detectar cuando el video está listo
        logoVideo.addEventListener('loadeddata', function() {
            console.log('📦 Video cargado y listo');
            attemptVideoPlay();
        });
        
        logoVideo.addEventListener('canplay', function() {
            console.log('▶️ Video puede reproducirse');
        });
        
    } else {
        console.warn('⚠️ Elemento de video no encontrado');
        showMainContent();
    }
    
    // Skip button
    if (skipButton) {
        skipButton.addEventListener('click', function() {
            console.log('⏭️ Usuario saltó la animación');
            showMainContent();
        });
        
        // Mostrar botón skip después de 1.5 segundos
        setTimeout(() => {
            skipButton.style.opacity = '1';
            skipButton.style.visibility = 'visible';
        }, 1500);
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if this is the Services link
            if (this.getAttribute('href') === '#services') {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle services dropdown
                const servicesContainer = document.querySelector('.services-dropdown-container');
                
                if (servicesContainer) {
                    const dropdown = servicesContainer.querySelector('.services-dropdown');
                    const overlay = servicesContainer.querySelector('.services-dropdown-overlay');
                    
                    if (dropdown && overlay) {
                        if (dropdown.classList.contains('show')) {
                            dropdown.classList.remove('show');
                            overlay.classList.remove('show');
                            
                            // Restore body scroll
                            document.body.style.overflow = 'auto';
                            
                            // Close mobile menu when closing services dropdown
                            const navList = document.querySelector('.nav-list');
                            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                            if (navList && mobileMenuToggle) {
                                navList.classList.remove('active');
                                mobileMenuToggle.classList.remove('active');
                            }
                        } else {
                            // Force centering styles for mobile
                            dropdown.style.position = 'fixed';
                            dropdown.style.top = '50%';
                            dropdown.style.left = '50%';
                            dropdown.style.transform = 'translateX(-50%) translateY(-50%)';
                            dropdown.style.zIndex = '2000';
                            dropdown.style.display = 'block';
                            
                            overlay.style.position = 'fixed';
                            overlay.style.top = '0';
                            overlay.style.left = '0';
                            overlay.style.width = '100%';
                            overlay.style.height = '100%';
                            overlay.style.zIndex = '1999';
                            
                            dropdown.classList.add('show');
                            overlay.classList.add('show');
                            
                            // Prevent body scroll when dropdown is open
                            document.body.style.overflow = 'hidden';
                        }
                    }
                }
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open (except for Services)
                if (this.getAttribute('href') !== '#services') {
                    navList.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });


    // Call dropdown functionality
    const callDropdownBtn = document.querySelector('.call-dropdown-btn');
    const callDropdownMenu = document.querySelector('.call-dropdown-menu');
    
    if (callDropdownBtn && callDropdownMenu) {
        callDropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            callDropdownMenu.classList.toggle('show');
            callDropdownBtn.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!callDropdownBtn.contains(e.target) && !callDropdownMenu.contains(e.target)) {
                callDropdownMenu.classList.remove('show');
                callDropdownBtn.classList.remove('active');
                // Restore body scroll when closing dropdown
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close dropdown when clicking on an option
        const callOptions = document.querySelectorAll('.call-option');
        callOptions.forEach(option => {
            option.addEventListener('click', function() {
                callDropdownMenu.classList.remove('show');
                callDropdownBtn.classList.remove('active');
                // Restore body scroll when clicking an option
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: linear-gradient(135deg, #374151 0%, #4b5563 50%, #6b7280 100%);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        width: 55px;
        height: 55px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 
            0 8px 25px rgba(55, 65, 81, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
        this.style.background = 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)';
        this.style.boxShadow = `
            0 12px 35px rgba(31, 41, 55, 0.4),
            0 6px 15px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `;
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.background = 'linear-gradient(135deg, #374151 0%, #4b5563 50%, #6b7280 100%)';
        this.style.boxShadow = `
            0 8px 25px rgba(55, 65, 81, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .feature, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone call attempts (you can integrate with analytics here)
            console.log('Phone call attempted to:', this.href);
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading state to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                this.style.opacity = '0.7';
                this.style.cursor = 'not-allowed';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.cursor = 'pointer';
                }, 2000);
            }
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            navList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
        
        // Tab navigation for FAQ items
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('faq-question')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // Preload critical images
    const criticalImages = [
        'img/gruameza.jpg',
        'img/motor.jpg',
        'img/frenos.jpg',
        'img/radiador.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });

    // Image Carousel Functionality
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        carouselDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (carouselSlides[index]) {
            carouselSlides[index].classList.add('active');
        }
        if (carouselDots[index]) {
            carouselDots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % carouselSlides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(prevIndex);
    }

    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Carousel event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopCarousel();
            nextSlide();
            startCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopCarousel();
            prevSlide();
            startCarousel();
        });
    }

    // Dot navigation
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopCarousel();
            showSlide(index);
            startCarousel();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            stopCarousel();
            prevSlide();
            startCarousel();
        } else if (e.key === 'ArrowRight') {
            stopCarousel();
            nextSlide();
            startCarousel();
        }
    });

    // Pause carousel on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }

    // Initialize carousel
    if (carouselSlides.length > 0) {
        startCarousel();
    }

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-based animations and effects go here
        }, 10);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Utility function for smooth animations
function animateElement(element, animation, duration = 300) {
    element.style.animation = `${animation} ${duration}ms ease-in-out`;
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Sticky Navigation functionality
let isStickyMenuOpen = false;

// Show/hide sticky navigation on scroll
window.addEventListener('scroll', () => {
    const stickyNav = document.querySelector('.sticky-nav');
    const header = document.querySelector('.header');
    
    if (stickyNav && header) {
        const scrollTop = window.pageYOffset;
        const headerHeight = header.offsetHeight;
        
        if (scrollTop > headerHeight) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
            // Close menu when going back to top
            if (isStickyMenuOpen) {
                const stickyNavList = document.querySelector('.sticky-nav-list');
                if (stickyNavList) {
                    stickyNavList.classList.remove('active');
                    isStickyMenuOpen = false;
                }
            }
        }
    }
});

// Toggle sticky menu
document.addEventListener('click', (e) => {
    const stickyMenuToggle = document.querySelector('.sticky-menu-toggle');
    const stickyNavList = document.querySelector('.sticky-nav-list');
    const stickyNav = document.querySelector('.sticky-nav');
    
    if (stickyMenuToggle && stickyNavList && stickyNav) {
        if (e.target === stickyMenuToggle || stickyMenuToggle.contains(e.target)) {
            isStickyMenuOpen = !isStickyMenuOpen;
            stickyNavList.classList.toggle('active', isStickyMenuOpen);
        } else if (isStickyMenuOpen && !stickyNav.contains(e.target)) {
            stickyNavList.classList.remove('active');
            isStickyMenuOpen = false;
        }
    }
});

// Smooth scrolling for sticky navigation links
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('sticky-nav-link')) {
        // Check if this is the Services link
        if (e.target.getAttribute('href') === '#services') {
            e.preventDefault();
            e.stopPropagation();
            // Toggle services dropdown
            const servicesContainer = document.querySelector('.services-dropdown-container');
            if (servicesContainer) {
                const dropdown = servicesContainer.querySelector('.services-dropdown');
                const overlay = servicesContainer.querySelector('.services-dropdown-overlay');
                if (dropdown && overlay) {
                    if (dropdown.classList.contains('show')) {
                        dropdown.classList.remove('show');
                        overlay.classList.remove('show');
                        // Close mobile menu when closing services dropdown
                        navList.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    } else {
                        // Force centering styles
                        dropdown.style.position = 'fixed';
                        dropdown.style.top = '50%';
                        dropdown.style.left = '50%';
                        dropdown.style.transform = 'translateX(-50%) translateY(-50%)';
                        dropdown.style.zIndex = '1000';
                        
                        dropdown.classList.add('show');
                        overlay.classList.add('show');
                    }
                }
            }
            return;
        }
        
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close sticky menu
            const stickyNavList = document.querySelector('.sticky-nav-list');
            if (stickyNavList) {
                stickyNavList.classList.remove('active');
                isStickyMenuOpen = false;
            }
            
            // Update active nav links
            document.querySelectorAll('.nav-link, .sticky-nav-link').forEach(link => {
                link.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Also update main nav
            const mainNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
            if (mainNavLink) {
                mainNavLink.classList.add('active');
            }
        }
    }
});

// Update active link in both navigations based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const stickyNavLinks = document.querySelectorAll('.sticky-nav-link');
    const header = document.querySelector('.header');
    
    if (sections.length > 0 && navLinks.length > 0 && header) {
        const headerHeight = header.offsetHeight;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        // Update main navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Update sticky navigation
        stickyNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
});

// Image Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000);
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopCarousel();
            nextSlide();
            startCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopCarousel();
            prevSlide();
            startCarousel();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopCarousel();
            currentSlide = index;
            showSlide(currentSlide);
            startCarousel();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopCarousel();
            prevSlide();
            startCarousel();
        } else if (e.key === 'ArrowRight') {
            stopCarousel();
            nextSlide();
            startCarousel();
        }
    });

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }

    // Initialize carousel
    if (slides.length > 0) {
        showSlide(0);
        startCarousel();
    }
});

// Function to lazy load images in a panel (optimized for mobile) - Global function
function loadPanelImages(panel) {
    if (!panel || !panel.classList.contains('active')) return;
    
    const images = panel.querySelectorAll('img');
    
    images.forEach((img, index) => {
        // Force visibility for images in active panel
        img.style.display = 'block';
        img.style.visibility = 'visible';
        img.style.opacity = '1';
        
        // Ensure parent gallery-item is visible
        const galleryItem = img.closest('.gallery-item');
        if (galleryItem) {
            galleryItem.style.display = 'block';
            galleryItem.style.visibility = 'visible';
            galleryItem.style.opacity = '1';
        }
        
        // Get the original src from HTML attribute
        const originalSrc = img.getAttribute('src');
        const currentSrc = img.src;
        
        // Only process if we have a valid image source
        if (originalSrc && originalSrc.startsWith('img/')) {
            // Set loading to eager for active panel images
            img.loading = 'eager';
            
            // Check if src needs to be updated (corrupted, empty, or different)
            const needsUpdate = !currentSrc || 
                               currentSrc.includes('data:image') || 
                               currentSrc.includes('index.html') || 
                               !currentSrc.includes('img/') ||
                               currentSrc !== originalSrc;
            
            if (needsUpdate) {
                // Set src directly (avoid clearing to prevent index.html error)
                img.src = originalSrc;
            }
            
            // Add error handler to fix corrupted src or retry loading
            img.onerror = function onImgError() {
                const attrSrc = this.getAttribute('src');
                // Retry ONLY ONCE: if not retried yet and src is corrupted/different, set to attribute src
                if (!this.dataset.retry && attrSrc && attrSrc.startsWith('img/') && (this.src.includes('index.html') || this.src !== new URL(attrSrc, window.location.origin).href)) {
                    this.dataset.retry = '1';
                    this.src = attrSrc;
                    return;
                }
                // Detach handler to avoid loops and log final failure
                this.onerror = null;
                console.warn(`Image failed permanently: ${this.src}`);
            };
            
            // Add load handler for debugging (only in development)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                img.onload = function() {
                    console.log(`Image loaded successfully: ${originalSrc}`);
                };
            }
        }
    });
}

// Services Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceTabs = document.querySelectorAll('.service-tab');
    const servicePanels = document.querySelectorAll('.service-panel');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const servicesContainer = document.querySelector('.services-dropdown-container');
    
    // Tab switching functionality
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetService = this.getAttribute('data-service');
            
            // Remove active class from all tabs and panels
            serviceTabs.forEach(t => t.classList.remove('active'));
            servicePanels.forEach(p => {
                p.classList.remove('active');
                // DON'T unload images - let browser handle caching naturally
                // This was causing issues with image loading
            });
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetService);
            if (targetPanel) {
                targetPanel.classList.add('active');
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    if (targetPanel.classList.contains('active')) {
                        loadPanelImages(targetPanel);
                        
                        // Special handling for thermo panel - force image reload
                        if (targetService === 'thermo') {
                            const thermoImages = targetPanel.querySelectorAll('img[src*="refrigeration"]');
                            thermoImages.forEach((img, idx) => {
                                const originalSrc = img.getAttribute('src');
                                // Force reload by setting src directly (avoid clearing to prevent index.html error)
                                setTimeout(() => {
                                    if (targetPanel.classList.contains('active')) {
                                        // Only reload if src is different or corrupted
                                        if (!img.src || img.src.includes('index.html') || img.src !== originalSrc) {
                                            img.src = originalSrc;
                                            img.loading = 'eager';
                                            img.style.display = 'block';
                                            img.style.visibility = 'visible';
                                            img.style.opacity = '1';
                                            
                                            // Ensure parent is visible
                                            const galleryItem = img.closest('.gallery-item');
                                            if (galleryItem) {
                                                galleryItem.style.display = 'block';
                                                galleryItem.style.visibility = 'visible';
                                                galleryItem.style.opacity = '1';
                                            }
                                        }
                                    }
                                }, idx * 50);
                            });
                        }
                    }
                }, 100);
            }
        });
    });
    
    // Load images for initially active panel
    const initialPanel = document.querySelector('.service-panel.active');
    if (initialPanel) {
        setTimeout(() => {
            loadPanelImages(initialPanel);
            
            // Special handling if thermo is the initial panel
            if (initialPanel.id === 'thermo') {
                const thermoImages = initialPanel.querySelectorAll('img[src*="refrigeration"]');
                thermoImages.forEach((img, idx) => {
                                const originalSrc = img.getAttribute('src');
                                setTimeout(() => {
                                    if (initialPanel.classList.contains('active')) {
                                        // Only reload if src is different or corrupted (avoid clearing to prevent index.html error)
                                        if (!img.src || img.src.includes('index.html') || img.src !== originalSrc) {
                                            img.src = originalSrc;
                                            img.loading = 'eager';
                                            img.style.display = 'block';
                                            img.style.visibility = 'visible';
                                            img.style.opacity = '1';
                                            
                                            const galleryItem = img.closest('.gallery-item');
                                            if (galleryItem) {
                                                galleryItem.style.display = 'block';
                                                galleryItem.style.visibility = 'visible';
                                                galleryItem.style.opacity = '1';
                                            }
                                        }
                                    }
                                }, idx * 50);
                });
            }
        }, 200);
    }
    
    // Touch/Swipe functionality for mobile devices
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isSwipe = false;
    
    // Get current active tab index
    function getCurrentTabIndex() {
        const activeTab = document.querySelector('.service-tab.active');
        if (!activeTab) return 0;
        return Array.from(serviceTabs).indexOf(activeTab);
    }
    
    // Switch to tab by index
    function switchToTab(index) {
        if (index >= 0 && index < serviceTabs.length) {
            serviceTabs[index].click();
        }
    }
    
    // Touch start
    servicesDropdown.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipe = false;
    }, { passive: true });
    
    // Touch move
    servicesDropdown.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Check if horizontal swipe (more horizontal than vertical movement)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            isSwipe = true;
            e.preventDefault(); // Prevent scrolling
        }
    }, { passive: false });
    
    // Touch end
    servicesDropdown.addEventListener('touchend', function(e) {
        if (!isSwipe || !startX || !endX) return;
        
        const diffX = startX - endX;
        const currentIndex = getCurrentTabIndex();
        
        // Swipe left (next tab)
        if (diffX > 50) {
            const nextIndex = (currentIndex + 1) % serviceTabs.length;
            switchToTab(nextIndex);
        }
        // Swipe right (previous tab)
        else if (diffX < -50) {
            const prevIndex = currentIndex === 0 ? serviceTabs.length - 1 : currentIndex - 1;
            switchToTab(prevIndex);
        }
        
        // Reset values
        startX = 0;
        startY = 0;
        endX = 0;
        endY = 0;
        isSwipe = false;
    }, { passive: true });
    
    // Close dropdown when clicking outside or on overlay
    document.addEventListener('click', function(e) {
        if (servicesContainer && !servicesContainer.contains(e.target)) {
            if (servicesDropdown) {
                const overlay = servicesContainer.querySelector('.services-dropdown-overlay');
                servicesDropdown.classList.remove('show');
                if (overlay) {
                    overlay.classList.remove('show');
                }
            }
        }
        
        // Close when clicking on overlay
        if (e.target.classList.contains('services-dropdown-overlay')) {
            const overlay = e.target;
            const dropdown = servicesContainer.querySelector('.services-dropdown');
            if (dropdown) {
                dropdown.classList.remove('show');
                overlay.classList.remove('show');
            }
        }
    });
    
    // Mobile dropdown behavior
    function handleMobileDropdown() {
        if (window.innerWidth <= 768) {
            // On mobile, make dropdown appear as modal
            if (servicesDropdown) {
                servicesDropdown.style.position = 'fixed';
                servicesDropdown.style.top = '50%';
                servicesDropdown.style.left = '50%';
                servicesDropdown.style.transform = 'translateX(-50%) translateY(-50%)';
                servicesDropdown.style.zIndex = '10000';
            }
        } else {
            // On desktop, restore normal positioning
            if (servicesDropdown) {
                servicesDropdown.style.position = 'absolute';
                servicesDropdown.style.top = '100%';
                servicesDropdown.style.left = '50%';
                servicesDropdown.style.transform = 'translateX(-50%)';
                servicesDropdown.style.zIndex = '1000';
            }
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', handleMobileDropdown);
    
    // Initialize mobile behavior
    handleMobileDropdown();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (servicesDropdown && servicesDropdown.classList.contains('show')) {
            if (e.key === 'Escape') {
                const overlay = servicesContainer.querySelector('.services-dropdown-overlay');
                servicesDropdown.classList.remove('show');
                if (overlay) {
                    overlay.classList.remove('show');
                }
            }
            
            // Tab navigation between service tabs
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const activeTab = document.querySelector('.service-tab.active');
                if (activeTab) {
                    const currentIndex = Array.from(serviceTabs).indexOf(activeTab);
                    let newIndex;
                    
                    if (e.key === 'ArrowLeft') {
                        newIndex = currentIndex > 0 ? currentIndex - 1 : serviceTabs.length - 1;
                    } else {
                        newIndex = currentIndex < serviceTabs.length - 1 ? currentIndex + 1 : 0;
                    }
                    
                    serviceTabs[newIndex].click();
                }
            }
        }
    });
    
    // Add smooth animations for panel transitions
    servicePanels.forEach(panel => {
        panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    // Add hover effects for better UX
    serviceTabs.forEach(tab => {
        tab.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        tab.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});

// Export functions for potential external use
window.MezaWebsite = {
    showNotification,
    animateElement
};

// Contact Form Handling with Location Selection
document.addEventListener('DOMContentLoaded', function() {
    let formDataStored = null;
    
    const contactForm = document.getElementById('contactForm');
    const locationModal = document.getElementById('locationModal');
    const locationButtons = document.querySelectorAll('.location-btn');
    const cancelLocationModal = document.getElementById('cancelLocationModal');
    
    if (contactForm && locationModal) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !service || !message) {
                alert('Por favor llena todos los campos requeridos.');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor ingresa un correo electrónico válido.');
                return false;
            }
            
            // Store form data
            formDataStored = {
                name: name,
                email: email,
                phone: phone || 'No proporcionado',
                service: service,
                message: message
            };
            
            // Show location selection modal
            locationModal.classList.add('show');
            
            return false;
        });
        
        // Handle location selection
        locationButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const location = this.getAttribute('data-location');
                
                if (formDataStored) {
                    // Phone numbers for each location
                    const phoneNumbers = {
                        california: '19097439091',
                        arkansas: '14798862439'
                    };
                    
                    // Get service name from select option
                    const serviceSelect = document.getElementById('service');
                    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
                    
                    // Create WhatsApp message with proper line breaks
                    const whatsappMessage = 
                        '🔧 *New Request for Quote*\n\n' +
                        '*Name:* ' + formDataStored.name + '\n' +
                        '*Email:* ' + formDataStored.email + '\n' +
                        '*Telephone:* ' + formDataStored.phone + '\n' +
                        '*Required Service:* ' + serviceText + '\n\n' +
                        '*Message:*\n' + formDataStored.message;
                    
                    // Encode message for URL (this will convert \n to %0A automatically)
                    const encodedMessage = encodeURIComponent(whatsappMessage);
                    
                    // Create WhatsApp URL
                    const whatsappUrl = 'https://wa.me/' + phoneNumbers[location] + '?text=' + encodedMessage;
                    
                    // Open WhatsApp
                    window.open(whatsappUrl, '_blank');
                    
                    // Close modal
                    locationModal.classList.remove('show');
                    
                    // Reset form
                    contactForm.reset();
                    formDataStored = null;
                    
                    // Optional: Show success message
                    alert('¡Opening WhatsApp! Your message is ready to send.');
                }
            });
        });
        
        // Handle modal cancel
        if (cancelLocationModal) {
            cancelLocationModal.addEventListener('click', function() {
                locationModal.classList.remove('show');
                formDataStored = null;
            });
        }
        
        // Close modal when clicking outside
        locationModal.addEventListener('click', function(e) {
            if (e.target === locationModal) {
                locationModal.classList.remove('show');
                formDataStored = null;
            }
        });
    }
});

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    // Add click event to each gallery image
    galleryImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            imageModal.classList.add('show');
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('show')) {
            imageModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Sticky Services Submenu
    const stickyServicesTrigger = document.querySelector('.sticky-services-trigger');
    const stickyServicesItem = document.querySelector('.sticky-services-item');
    const stickyMenu = document.querySelector('.sticky-nav-list');
    const stickyMenuToggle = document.querySelector('.sticky-menu-toggle');
    
    if (stickyServicesTrigger && stickyServicesItem) {
        stickyServicesTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the submenu
            stickyServicesItem.classList.toggle('active');
        });
        
        // Close submenu when clicking outside
        document.addEventListener('click', function(e) {
            if (!stickyServicesItem.contains(e.target)) {
                stickyServicesItem.classList.remove('active');
            }
        });
        
         // Handle service link clicks - IMPROVED VERSION
         const stickyServiceLinks = document.querySelectorAll('.sticky-service-link');
         console.log('Found sticky service links:', stickyServiceLinks.length);
         
         stickyServiceLinks.forEach(link => {
             link.addEventListener('click', function(e) {
                 e.preventDefault();
                 e.stopPropagation();
                 
                 const serviceType = this.getAttribute('data-service');
                 console.log('Service link clicked:', serviceType);
                 
                 // Close the sticky menu and submenu immediately
                 if (stickyMenu) {
                     stickyMenu.classList.remove('active');
                 }
                 if (stickyMenuToggle) {
                     stickyMenuToggle.classList.remove('active');
                 }
                 stickyServicesItem.classList.remove('active');
                 
                 // First, open the services dropdown
                 const servicesContainer = document.querySelector('.services-dropdown-container');
                 if (servicesContainer) {
                     const dropdown = servicesContainer.querySelector('.services-dropdown');
                     const overlay = servicesContainer.querySelector('.services-dropdown-overlay');
                     
                     if (dropdown && overlay) {
                         // Force centering styles for mobile
                         dropdown.style.position = 'fixed';
                         dropdown.style.top = '50%';
                         dropdown.style.left = '50%';
                         dropdown.style.transform = 'translateX(-50%) translateY(-50%)';
                         dropdown.style.zIndex = '10000';
                         dropdown.style.display = 'flex';
                         
                         overlay.style.position = 'fixed';
                         overlay.style.top = '0';
                         overlay.style.left = '0';
                         overlay.style.width = '100%';
                         overlay.style.height = '100%';
                         overlay.style.zIndex = '9999';
                         
                         dropdown.classList.add('show');
                         overlay.classList.add('show');
                         
                         // Prevent body scroll when dropdown is open
                         document.body.style.overflow = 'hidden';
                     }
                 }
                 
                 // Then activate the correct service tab
                 setTimeout(() => {
                     console.log('Activating service:', serviceType);
                     
                     // Use the exact same logic as the main service tabs
                     const serviceTabs = document.querySelectorAll('.service-tab');
                     const servicePanels = document.querySelectorAll('.service-panel');
                     
                     // Remove active class from all tabs and panels
                     serviceTabs.forEach(t => t.classList.remove('active'));
                     servicePanels.forEach(p => p.classList.remove('active'));
                     
                     // Find and activate the target tab and panel
                     const targetTab = document.querySelector(`.service-tab[data-service="${serviceType}"]`);
                     const targetPanel = document.getElementById(serviceType);
                     
                     console.log('Target tab found:', targetTab);
                     console.log('Target panel found:', targetPanel);
                     
                     if (targetTab && targetPanel) {
                         // Remove active from all tabs and panels first
                         document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
                         document.querySelectorAll('.service-panel').forEach(p => {
                             p.classList.remove('active');
                             // DON'T unload images - let browser handle caching naturally
                         });
                         
                         // Add active class to clicked tab and corresponding panel
                         targetTab.classList.add('active');
                         targetPanel.classList.add('active');
                         
                         // Small delay to ensure DOM is updated
                         setTimeout(() => {
                             if (targetPanel.classList.contains('active')) {
                                 loadPanelImages(targetPanel);
                                 
                                 // Special handling for thermo panel - force image reload
                                 if (serviceType === 'thermo') {
                                     const thermoImages = targetPanel.querySelectorAll('img[src*="refrigeration"]');
                                     thermoImages.forEach((img, idx) => {
                                        const originalSrc = img.getAttribute('src');
                                        // Force reload by setting src directly (avoid clearing to prevent index.html error)
                                        setTimeout(() => {
                                            if (targetPanel.classList.contains('active')) {
                                                // Only reload if src is different or corrupted
                                                if (!img.src || img.src.includes('index.html') || img.src !== originalSrc) {
                                                    img.src = originalSrc;
                                                    img.loading = 'eager';
                                                    img.style.display = 'block';
                                                    img.style.visibility = 'visible';
                                                    img.style.opacity = '1';
                                                    
                                                    // Ensure parent is visible
                                                    const galleryItem = img.closest('.gallery-item');
                                                    if (galleryItem) {
                                                        galleryItem.style.display = 'block';
                                                        galleryItem.style.visibility = 'visible';
                                                        galleryItem.style.opacity = '1';
                                                    }
                                                }
                                            }
                                        }, idx * 50);
                                     });
                                 }
                             }
                         }, 150);
                         console.log('Successfully activated service:', serviceType);
                         
                         // Scroll to services section
                         const servicesSection = document.getElementById('services');
                         if (servicesSection) {
                             servicesSection.scrollIntoView({ behavior: 'smooth' });
                         }
                     } else {
                         console.error('Could not find tab or panel for service:', serviceType);
                     }
                 }, 200); // Increased timeout for better reliability
             });
         });
    }
});
