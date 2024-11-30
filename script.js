document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const contactForm = document.getElementById('contact-form');
    
    const validatePhone = (phone) => {
        // Israeli phone number validation
        const phoneRegex = /^(?:(?:(\+972)|(0))(?:-)?([23489])\d{7})$/;
        return phoneRegex.test(phone.replace(/[-\s]/g, ''));
    };

    contactForm.querySelector('input[name="phone"]').addEventListener('input', (e) => {
        const phone = e.target.value.replace(/[-\s]/g, '');
        if (phone && !validatePhone(phone)) {
            e.target.setCustomValidity('אנא הכנס מספר טלפון תקין');
        } else {
            e.target.setCustomValidity('');
        }
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Form validation
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const service = contactForm.querySelector('select[name="service"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !phone || !service || !message) {
            showNotification('אנא מלא את כל השדות', 'error');
            return;
        }

        if (!validatePhone(phone)) {
            showNotification('אנא הכנס מספר טלפון תקין', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('אנא הכנס כתובת אימייל תקינה', 'error');
            return;
        }

        // Simulate form submission
        showNotification('הטופס נשלח בהצלחה! נחזור אליך בהקדם.', 'success');
        contactForm.reset();
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .pricing-card, .contact-container').forEach(el => {
        el.classList.add('animate');
        observer.observe(el);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add notification styles
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '5px';
        notification.style.backgroundColor = type === 'error' ? '#ef4444' : '#22c55e';
        notification.style.color = 'white';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';

        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
