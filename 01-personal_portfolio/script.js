document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Update nav links
                const id = entry.target.id;
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Navigation click handler
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Scroll to section function for buttons
    window.scrollToSection = function(sectionId) {
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };
    
    // Add glitch animation to text with glitch-text class
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });
    
    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const skillName = item.getAttribute('data-skill');
        
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-primary)';
            
            // Randomize glitch effect
            const glitchDuration = Math.random() * 0.5 + 0.2;
            const glitchDelay = Math.random() * 0.1;
            
            this.style.setProperty('--glitch-duration', `${glitchDuration}s`);
            this.style.setProperty('--glitch-delay', `${glitchDelay}s`);
            
            this.classList.add('glitching');
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-border)';
            this.classList.remove('glitching');
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(20px)';
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Reset validation styles
            [nameInput, emailInput, messageInput].forEach(input => {
                input.style.borderColor = 'var(--color-border)';
            });
            
            // Validate name
            if (nameInput.value.trim() === '') {
                nameInput.style.borderColor = 'var(--color-danger)';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.style.borderColor = 'var(--color-danger)';
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                messageInput.style.borderColor = 'var(--color-danger)';
                isValid = false;
            }
            
            if (isValid) {
                // Mock form submission
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = 'SENDING...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Success message
                    submitButton.innerHTML = 'SENT SUCCESSFULLY';
                    submitButton.style.backgroundColor = 'rgba(0, 255, 71, 0.1)';
                    submitButton.style.borderColor = 'var(--color-success)';
                    submitButton.style.color = 'var(--color-success)';
                    
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.style.backgroundColor = '';
                        submitButton.style.borderColor = '';
                        submitButton.style.color = '';
                    }, 3000);
                    
                }, 1500);
            }
        });
    }
    
    // Create subtle parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.2}px`;
        }
        
        // Subtle parallax for project images
        const projectImages = document.querySelectorAll('.project-image');
        projectImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollOffset = (window.innerHeight - rect.top) * 0.05;
                image.style.transform = `scale(1.05) translateY(${scrollOffset}px)`;
            }
        });
    });
    
    // Terminal cursor blinking
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    // Add glitch effect to random elements periodically
    setInterval(() => {
        const elements = [
            ...document.querySelectorAll('h1, h2, .logo, .project-card h3')
        ];
        
        const randomIndex = Math.floor(Math.random() * elements.length);
        const element = elements[randomIndex];
        
        if (element) {
            element.classList.add('glitching');
            
            setTimeout(() => {
                element.classList.remove('glitching');
            }, 500);
        }
    }, 5000);
    
    // More button effect
    const moreButton = document.querySelector('.more-button');
    if (moreButton) {
        moreButton.addEventListener('click', function() {
            // Mock loading more projects
            this.innerHTML = 'LOADING... <span class="arrow">→</span>';
            
            setTimeout(() => {
                this.innerHTML = 'VIEW ALL PROJECTS <span class="arrow">→</span>';
            }, 1500);
        });
    }
});