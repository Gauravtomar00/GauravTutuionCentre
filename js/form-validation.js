/**
 * Gaurav Tuition Centre - Form Validation
 * This file contains the validation logic for the contact form
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Form submission event
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        resetErrors();
        
        // Validate form
        let isValid = true;
        
        // Name validation
        if (!nameInput.value.trim()) {
            showError(nameInput, nameError, 'Please enter your name');
            isValid = false;
        } else if (nameInput.value.trim().length < 3) {
            showError(nameInput, nameError, 'Name must be at least 3 characters');
            isValid = false;
        }
        
        // Email validation
        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        if (!phoneInput.value.trim()) {
            showError(phoneInput, phoneError, 'Please enter your phone number');
            isValid = false;
        } else if (!isValidPhone(phoneInput.value.trim())) {
            showError(phoneInput, phoneError, 'Please enter a valid 10-digit phone number');
            isValid = false;
        }
        
        // Subject validation
        if (!subjectInput.value) {
            showError(subjectInput, subjectError, 'Please select a subject');
            isValid = false;
        }
        
        // Message validation
        if (!messageInput.value.trim()) {
            showError(messageInput, messageError, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Your message is too short. Please provide more details.');
            isValid = false;
        }
        
        // If form is valid, submit it
        if (isValid) {
            // In a real application, we would submit the form data to a server
            // For now, we'll simulate a successful submission
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after submission
            contactForm.reset();
            
            // Scroll to the success message
            formSuccess.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Live validation for inputs
    nameInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError(this, nameError, 'Please enter your name');
        } else if (this.value.trim().length < 3) {
            showError(this, nameError, 'Name must be at least 3 characters');
        } else {
            clearError(this, nameError);
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError(this, emailError, 'Please enter your email address');
        } else if (!isValidEmail(this.value.trim())) {
            showError(this, emailError, 'Please enter a valid email address');
        } else {
            clearError(this, emailError);
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError(this, phoneError, 'Please enter your phone number');
        } else if (!isValidPhone(this.value.trim())) {
            showError(this, phoneError, 'Please enter a valid 10-digit phone number');
        } else {
            clearError(this, phoneError);
        }
    });
    
    subjectInput.addEventListener('change', function() {
        if (!this.value) {
            showError(this, subjectError, 'Please select a subject');
        } else {
            clearError(this, subjectError);
        }
    });
    
    messageInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError(this, messageError, 'Please enter your message');
        } else if (this.value.trim().length < 10) {
            showError(this, messageError, 'Your message is too short. Please provide more details.');
        } else {
            clearError(this, messageError);
        }
    });
    
    // Helper functions
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    function resetErrors() {
        // Clear all error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        // Remove error class from all inputs
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Validate phone number (allowing only digits and optional +, -, or spaces)
        const phoneRegex = /^[+\-\d\s]+$/;
        const cleanPhone = phone.replace(/[+\-\s]/g, '');
        
        // Check if it has approximately 10 digits (allowing for country codes)
        return phoneRegex.test(phone) && cleanPhone.length >= 10 && cleanPhone.length <= 15;
    }
    
    // Format phone number as user types
    phoneInput.addEventListener('input', function() {
        // Allow only digits, +, -, and spaces
        this.value = this.value.replace(/[^\d+\-\s]/g, '');
    });
});
