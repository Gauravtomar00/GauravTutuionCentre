/**
 * Gaurav Tuition Centre - Main JavaScript
 * This file contains all the general functionality for the website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.getElementById('testimonialSlider');
    const controlDots = document.querySelectorAll('.control-dot');
    
    if (testimonialSlider && controlDots.length > 0) {
        // Initialize the slider
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        
        // Auto-play the slider
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Control dots click event
        controlDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
            });
        });
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Deactivate all dots
            controlDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the current slide and activate the corresponding dot
            slides[index].classList.add('active');
            controlDots[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
            
            // Reset the auto-play timer
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= totalSlides) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        }
    }
    
    // Course Level Tabs
    const levelTabs = document.querySelectorAll('.level-tab');
    
    if (levelTabs.length > 0) {
        levelTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Deactivate all tabs
                levelTabs.forEach(t => t.classList.remove('active'));
                
                // Activate the current tab
                this.classList.add('active');
                
                // Hide all content sections
                const allContent = document.querySelectorAll('.level-content');
                allContent.forEach(content => content.classList.remove('active'));
                
                // Show the corresponding content
                const targetId = this.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
    
    // Results Tabs
    const resultTabs = document.querySelectorAll('.result-tab');
    
    if (resultTabs.length > 0) {
        resultTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Deactivate all tabs
                resultTabs.forEach(t => t.classList.remove('active'));
                
                // Activate the current tab
                this.classList.add('active');
                
                // Hide all content sections
                const allContent = document.querySelectorAll('.results-content');
                allContent.forEach(content => content.classList.remove('active'));
                
                // Show the corresponding content
                const targetId = this.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Toggle the active class on the current item
                item.classList.toggle('active');
                
                // Update the icon
                const icon = this.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current navigation item based on URL
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('#navbar a');
    
    menuItems.forEach(item => {
        if (currentLocation.includes(item.href)) {
            item.classList.add('active');
        }
    });
    
    // Scroll animations for elements
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .methodology-item, .approach-item, .schedule-card');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }
        });
    }
    
    // Add initial styles for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .methodology-item, .approach-item, .schedule-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    });
    
    // Check for elements in viewport on scroll and initial page load
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('load', handleScrollAnimations);
    
    // Back to top button functionality
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            document.querySelector('.back-to-top')?.classList.add('active');
        } else {
            document.querySelector('.back-to-top')?.classList.remove('active');
        }
    });
});
