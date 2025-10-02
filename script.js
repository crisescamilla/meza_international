// Loading Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen Elements
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const logoVideo = document.getElementById('logo-video');
    
    // Add loading class to body and html initially
    document.body.classList.add('loading');
    document.documentElement.classList.add('loading');
    
    // Function to hide loading screen and show main content
    function showMainContent() {
        // Fade out loading screen
        loadingScreen.classList.add('fade-out');
        
        // Show main content after a short delay
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.documentElement.classList.remove('loading');
            mainContent.classList.add('show');
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1500);
        }, 500);
    }
    
    // Handle video events
    if (logoVideo) {
        // Stop video and show main content after 4 seconds
        logoVideo.addEventListener('timeupdate', function() {
            if (logoVideo.currentTime >= 4) {
                logoVideo.pause();
                showMainContent();
            }
        });
        
        // When video ends naturally (if shorter than 4 seconds), show main content
        logoVideo.addEventListener('ended', showMainContent);
        
        // If video fails to load or takes too long, show content anyway
        logoVideo.addEventListener('error', showMainContent);
        
        // Fallback: show content after maximum 4 seconds regardless
        setTimeout(showMainContent, 4000);
    } else {
        // If video element doesn't exist, show content immediately
        showMainContent();
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
                
                // Close mobile menu if open
                navList.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                
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
    });


    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1e40af;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
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
        this.style.transform = 'scale(1.1)';
        this.style.background = '#1d4ed8';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#1e40af';
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
        '../img/gruameza.jpg',
        '../img/motor.jpg',
        '../img/frenos.jpg',
        '../img/radiador.jpg'
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
                        '🔧 *Nueva Solicitud de Cotización*\n\n' +
                        '*Nombre:* ' + formDataStored.name + '\n' +
                        '*Email:* ' + formDataStored.email + '\n' +
                        '*Teléfono:* ' + formDataStored.phone + '\n' +
                        '*Servicio Requerido:* ' + serviceText + '\n\n' +
                        '*Mensaje:*\n' + formDataStored.message;
                    
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
                    alert('¡Abriendo WhatsApp! Tu mensaje está listo para enviar.');
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
