/**
 * AI-Based Travel Itinerary Generator
 * Global JavaScript Functionality
 * Author: Dharshini
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Theme Switcher (Light / Dark Mode)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply the saved theme on page load
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        }
    } else {
        document.body.classList.remove('light-theme');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
            }
            localStorage.setItem('theme', theme);
        });
    }

    // ----------------------------------------------------
    // 2. Responsive Navigation Menu (Hamburger)
    // ----------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('show');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('show') && !navLinks.contains(e.target) && e.target !== menuToggle) {
                navLinks.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Highlight active nav links based on current path
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (page === href || (page === '' && href === 'index.html')) {
            link.classList.add('active');
        } else if (page !== href) {
            link.classList.remove('active');
        }
    });

    // ----------------------------------------------------
    // 3. Scroll-to-Top Button
    // ----------------------------------------------------
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------
    // 4. Notification Panel Toggle
    // ----------------------------------------------------
    const notificationBell = document.getElementById('notification-bell');
    const notificationPanel = document.getElementById('notification-panel');

    if (notificationBell && notificationPanel) {
        notificationBell.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationPanel.classList.toggle('show');
        });

        // Close notifications when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (notificationPanel.classList.contains('show') && 
                !notificationPanel.contains(e.target) && 
                !notificationBell.contains(e.target)) {
                notificationPanel.classList.remove('show');
            }
        });
    }

    // ----------------------------------------------------
    // 5. Dynamic Date and Time Display
    // ----------------------------------------------------
    const datetimeDisplay = document.getElementById('datetime-display');
    if (datetimeDisplay) {
        function updateClock() {
            const now = new Date();
            const options = { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
            };
            datetimeDisplay.textContent = now.toLocaleDateString('en-IN', options);
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // ----------------------------------------------------
    // 6. Dynamic Statistics Counters (Count-up Animation)
    // ----------------------------------------------------
    const counterElements = document.querySelectorAll('.animate-counter');

    if (counterElements.length > 0) {
        const countUp = (element) => {
            const target = +element.getAttribute('data-target');
            const duration = 2000; // 2 seconds animation
            const isFloat = element.getAttribute('data-float') === 'true';
            let start = 0;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = easeProgress * target;

                if (isFloat) {
                    element.textContent = currentVal.toFixed(1) + (element.getAttribute('data-suffix') || '');
                } else {
                    element.textContent = Math.floor(currentVal).toLocaleString('en-IN') + (element.getAttribute('data-suffix') || '');
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    if (isFloat) {
                        element.textContent = target.toFixed(1) + (element.getAttribute('data-suffix') || '');
                    } else {
                        element.textContent = target.toLocaleString('en-IN') + (element.getAttribute('data-suffix') || '');
                    }
                }
            };
            requestAnimationFrame(updateCount);
        };

        // Trigger animation when counters are in viewport
        const observerOptions = {
            threshold: 0.5,
            root: null
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counterElements.forEach(el => counterObserver.observe(el));
    }

    // ----------------------------------------------------
    // 7. Image/Banner Slider (Carousel)
    // ----------------------------------------------------
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dotsContainer = document.getElementById('slider-dots');

    if (sliderWrapper && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;
        const intervalTime = 5000; // 5 seconds auto transition

        // Create dots dynamically
        if (dotsContainer) {
            slides.forEach((_, idx) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (idx === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(idx);
                    resetTimer();
                });
                dotsContainer.appendChild(dot);
            });
        }

        const dots = document.querySelectorAll('.slider-dot');

        function updateSliderState() {
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (dots.length > 0) {
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentIndex);
                });
            }
        }

        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            updateSliderState();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetTimer();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetTimer();
            });
        }

        function startTimer() {
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }

        // Initialize Slider
        startTimer();
    }

    // ----------------------------------------------------
    // 8. Form Validation (registration)
    // ----------------------------------------------------
    const regForm = document.getElementById('registration-form');

    if (regForm) {
        const fields = {
            name: document.getElementById('reg-name'),
            email: document.getElementById('reg-email'),
            phone: document.getElementById('reg-phone'),
            pass: document.getElementById('reg-pass'),
            gender: document.getElementById('reg-gender'),
            dob: document.getElementById('dob'),
            address: document.getElementById('address')
        };

        const validations = {
            name: (val) => {
                if (!val.trim()) return 'Name is required.';
                if (val.trim().length < 3) return 'Name must be at least 3 characters long.';
                return '';
            },
            email: (val) => {
                if (!val.trim()) return 'Email is required.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) return 'Please enter a valid email address.';
                return '';
            },
            phone: (val) => {
                if (!val.trim()) return 'Phone number is required.';
                // Match Indian phone format: 10 digits, optionally starting with +91 or 91
                const phoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
                if (!phoneRegex.test(val.replace(/\s+/g, ''))) return 'Please enter a valid 10-digit Indian phone number.';
                return '';
            },
            pass: (val) => {
                if (!val) return 'Password is required.';
                if (val.length < 6) return 'Password must be at least 6 characters.';
                return '';
            },
            gender: (val) => {
                if (!val) return 'Please select your gender.';
                return '';
            },
            dob: (val) => {
                if (!val) return 'Date of Birth is required.';
                const selectedDate = new Date(val);
                const today = new Date();
                if (selectedDate >= today) return 'Date of Birth must be in the past.';
                return '';
            },
            address: (val) => {
                if (!val.trim()) return 'Address is required.';
                return '';
            }
        };

        // Create error display nodes
        Object.entries(fields).forEach(([key, field]) => {
            if (!field) return;

            // Blur event dynamic validation
            field.addEventListener('blur', () => {
                validateField(key);
            });

            // Input event removes error state quickly
            field.addEventListener('input', () => {
                clearError(field);
            });
        });

        // Submit listener
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            Object.keys(fields).forEach(key => {
                const isValid = validateField(key);
                if (!isValid) isFormValid = false;
            });

            if (isFormValid) {
                // Success notification banner simulation
                alert('Registration Successful! Redirecting to Dashboard...');
                window.location.href = 'dashboard.html';
            }
        });

        // Reset listener
        regForm.addEventListener('reset', () => {
            Object.values(fields).forEach(field => {
                if (field) {
                    clearError(field);
                }
            });
        });

        function validateField(key) {
            const field = fields[key];
            if (!field) return true;

            const value = field.value;
            const errorMsg = validations[key](value);

            if (errorMsg) {
                showError(field, errorMsg);
                return false;
            } else {
                showSuccess(field);
                return true;
            }
        }

        function showError(field, message) {
            clearError(field);
            field.classList.add('input-error');
            field.classList.remove('input-success');

            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-feedback';
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            field.parentNode.appendChild(errorDiv);
        }

        function showSuccess(field) {
            clearError(field);
            field.classList.add('input-success');
            field.classList.remove('input-error');
        }

        function clearError(field) {
            field.classList.remove('input-error');
            const feedback = field.parentNode.querySelector('.error-feedback');
            if (feedback) {
                feedback.remove();
            }
        }
    }
});
