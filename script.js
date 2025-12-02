// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add/remove overlay
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                // Add click outside to close functionality
                setTimeout(() => {
                    document.addEventListener('click', closeMenuOnClickOutside);
                }, 100);
            } else {
                document.body.style.overflow = '';
                document.removeEventListener('click', closeMenuOnClickOutside);
            }
        });
        
        // Function to close menu when clicking outside
        function closeMenuOnClickOutside(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.removeEventListener('click', closeMenuOnClickOutside);
            }
        }
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.removeEventListener('click', closeMenuOnClickOutside);
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.removeEventListener('click', closeMenuOnClickOutside);
            }
        });
    }
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Initialize slider
    function initSlider() {
        if (slides.length === 0) return;
        
        // Show first slide
        slides[0].classList.add('active');
        if (dots.length > 0) dots[0].classList.add('active');
        
        // Auto slide every 5 seconds
        startAutoSlide();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
            
            // Pause on touch for mobile
            sliderContainer.addEventListener('touchstart', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('touchend', () => {
                startAutoSlide();
            });
        }
    }

    // Start auto slide
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Go to specific slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + totalSlides) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event listeners for slider buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Reset timer on manual navigation
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Reset timer on manual navigation
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startAutoSlide(); // Reset timer on manual navigation
        });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
            startAutoSlide();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
            startAutoSlide();
        }
    }

    // Keyboard navigation for slider
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (prevBtn) prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            if (nextBtn) nextBtn.click();
        }
    });

    // Initialize slider
    initSlider();

    // Training Page - Enroll Button Functionality
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            if (courseCard) {
                const courseTitle = courseCard.querySelector('h3')?.textContent || 'Course';
                alert(`Thank you for your interest in "${courseTitle}".\n\nOur team will contact you within 24 hours with enrollment details and course schedule.\n\nPlease ensure you have the required eligibility documents ready.`);
            }
        });
    });
    
    // Contact form enhancements
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Allow only numbers and basic phone characters
            this.value = this.value.replace(/[^0-9+\-() ]/g, '');
            
            // Format phone number
            if (this.value.length > 15) {
                this.value = this.value.substring(0, 15);
            }
        });
    }
    
    // Form validation for contact page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            let errorMessage = '';
            
            // Check required fields
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#f44336';
                    errorMessage = 'Please fill in all required fields marked with *.';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#f44336';
                    errorMessage = 'Please enter a valid email address.';
                }
            }
            
            // Phone validation
            const phoneField = document.getElementById('phone');
            if (phoneField && phoneField.value) {
                const phoneRegex = /^[0-9+\-() ]{10,15}$/;
                if (!phoneRegex.test(phoneField.value)) {
                    isValid = false;
                    phoneField.style.borderColor = '#f44336';
                    errorMessage = 'Please enter a valid phone number (10-15 digits).';
                }
            }
            
            if (!isValid) {
                alert(`Error: ${errorMessage}`);
                return false;
            }
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            // Show success message
            alert('✓ Thank you for your message!\n\nWe have received your inquiry and our team will get back to you within 24 hours.\n\nFor urgent matters, please call us at +91 98765 43210.');
            
            // Reset form
            contactForm.reset();
            
            return false;
        });
    }

    // Team Page - Add photo placeholder animation
    const memberPhotos = document.querySelectorAll('.photo-placeholder');
    
    memberPhotos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Image lazy loading enhancement
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
        });
        
        img.style.opacity = '0.7';
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1e88e5;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-size: 1.2rem;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        align-items: center;
        justify-content: center;
    `;

    backToTopButton.addEventListener('mouseenter', function() {
        this.style.background = '#1565c0';
        this.style.transform = 'translateY(-3px)';
    });

    backToTopButton.addEventListener('mouseleave', function() {
        this.style.background = '#1e88e5';
        this.style.transform = 'translateY(0)';
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Add current year to footer
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element.textContent.includes('2023') || element.textContent.includes('2024')) {
            element.innerHTML = element.innerHTML.replace(/\d{4}/, currentYear);
        }
    });
    
    // Update year in span with id currentYear if it exists
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = currentYear;
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize animations on load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle page transitions and loading
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Remove loading states
    const loadingElements = document.querySelectorAll('[data-loading]');
    loadingElements.forEach(el => {
        el.classList.remove('loading');
    });
});