// ========================================
// Contact Form Handling
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, this would send data to a server
        console.log('Form submitted:', {
            name,
            email,
            phone,
            subject,
            message
        });
        
        // Show success notification
        showNotification('Thank you! Your message has been sent successfully.');
        
        // Reset form
        contactForm.reset();
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// FAQ Accordion
// ========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ========================================
// Form Validation Enhancement
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Basic phone validation - can be customized
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone === '' || re.test(phone);
}

// Real-time validation
if (contactForm) {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#e74c3c';
        } else {
            emailInput.style.borderColor = '';
        }
    });
    
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value && !validatePhone(phoneInput.value)) {
            phoneInput.style.borderColor = '#e74c3c';
        } else {
            phoneInput.style.borderColor = '';
        }
    });
}

// ========================================
// Character Counter for Textarea
// ========================================
const messageTextarea = document.getElementById('message');

if (messageTextarea) {
    const maxLength = 500;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.style.cssText = 'text-align: right; margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-text-light);';
    counter.textContent = `0 / ${maxLength}`;
    
    messageTextarea.parentNode.appendChild(counter);
    
    messageTextarea.addEventListener('input', () => {
        const length = messageTextarea.value.length;
        counter.textContent = `${length} / ${maxLength}`;
        
        if (length > maxLength) {
            counter.style.color = '#e74c3c';
            messageTextarea.value = messageTextarea.value.substring(0, maxLength);
        } else {
            counter.style.color = 'var(--color-text-light)';
        }
    });
}

// ========================================
// Auto-expand Textarea
// ========================================
if (messageTextarea) {
    messageTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

// ========================================
// Smooth Scroll to Contact Form
// ========================================
function scrollToForm() {
    const formWrapper = document.querySelector('.contact-form-wrapper');
    if (formWrapper) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = formWrapper.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Export function for potential use
window.scrollToForm = scrollToForm;