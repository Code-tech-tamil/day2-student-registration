// Import modules
import { add, multiply, greetUser } from './mathUtils.js';
import createProfileCard from './profileUtils.js';

// Global variables
let cardCounter = 0;
let profileCounter = 0;

// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const createCardBtn = document.getElementById('createCardBtn');
const addProfileBtn = document.getElementById('addProfileBtn');
const cardsContainer = document.getElementById('cardsContainer');
const profilesContainer = document.getElementById('profilesContainer');
const runMathBtn = document.getElementById('runMathBtn');
const showGreetingBtn = document.getElementById('showGreetingBtn');
const addResult = document.getElementById('addResult');
const multiplyResult = document.getElementById('multiplyResult');
const greetingText = document.getElementById('greetingText');
const ctaButton = document.querySelector('.cta-button');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after page load
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);

    // Initialize event listeners
    initEventListeners();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize navigation
    initNavigation();
    
    // Add initial cards for demo
    setTimeout(() => {
        createDynamicCard();
        createDynamicCard();
    }, 2000);
});

// Event Listeners
function initEventListeners() {
    // Dynamic cards
    createCardBtn.addEventListener('click', createDynamicCard);
    
    // Profile cards
    addProfileBtn.addEventListener('click', addProfile);
    
    // Module demonstrations
    runMathBtn.addEventListener('click', runMathDemo);
    showGreetingBtn.addEventListener('click', showGreetingDemo);
    
    // CTA button smooth scroll
    ctaButton.addEventListener('click', () => {
        document.getElementById('cards').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Scroll Effects
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect for floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrollY * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Navigation
function initNavigation() {
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Dynamic Card Functions
function createDynamicCard() {
    cardCounter++;
    
    const card = document.createElement('div');
    card.className = 'dynamic-card';
    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">Dynamic Card #${cardCounter}</h3>
            <button class="delete-button" onclick="deleteCard(this)">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
        <div class="card-content">
            <p>This is a beautifully animated card created dynamically with JavaScript. It features glassmorphism design, smooth transitions, and interactive hover effects.</p>
            <p><strong>Created:</strong> ${new Date().toLocaleTimeString()}</p>
            <p><strong>Features:</strong> Responsive design, smooth animations, modern UI</p>
        </div>
    `;
    
    // Add initial invisible state for animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    cardsContainer.appendChild(card);
    
    // Trigger animation
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    // Add success feedback
    showNotification('✨ Card created successfully!', 'success');
}

// Global function for card deletion (needed for onclick)
window.deleteCard = function(button) {
    const card = button.closest('.dynamic-card');
    card.classList.add('fade-out');
    
    setTimeout(() => {
        card.remove();
        showNotification('🗑️ Card deleted', 'info');
    }, 300);
};

// Profile Functions
function addProfile() {
    const name = prompt('Enter the person\'s name:');
    if (!name || name.trim() === '') {
        showNotification('❌ Name cannot be empty!', 'error');
        return;
    }
    
    const role = prompt('Enter their role:');
    if (!role || role.trim() === '') {
        showNotification('❌ Role cannot be empty!', 'error');
        return;
    }
    
    profileCounter++;
    
    // Use the imported profile utility
    const profileCard = createProfileCard({
        name: name.trim(),
        role: role.trim(),
        id: profileCounter
    });
    
    // Add initial invisible state for animation
    profileCard.style.opacity = '0';
    profileCard.style.transform = 'translateY(30px) scale(0.9)';
    
    profilesContainer.appendChild(profileCard);
    
    // Trigger animation
    setTimeout(() => {
        profileCard.style.transition = 'all 0.5s ease';
        profileCard.style.opacity = '1';
        profileCard.style.transform = 'translateY(0) scale(1)';
    }, 100);
    
    showNotification(`👤 ${name} added to the team!`, 'success');
}

// Global function for profile removal (needed for onclick)
window.removeProfile = function(button) {
    const card = button.closest('.profile-card');
    const name = card.querySelector('.profile-name').textContent;
    
    card.style.transition = 'all 0.3s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateY(-30px) scale(0.9)';
    
    setTimeout(() => {
        card.remove();
        showNotification(`👋 ${name} removed from team`, 'info');
    }, 300);
};

// Module Demonstrations
function runMathDemo() {
    // Show loading state
    runMathBtn.textContent = 'Calculating...';
    runMathBtn.disabled = true;
    
    setTimeout(() => {
        // Use imported math functions
        const additionResult = add(15, 25);
        const multiplicationResult = multiply(8, 7);
        
        // Animate results
        animateNumberChange(addResult, additionResult);
        animateNumberChange(multiplyResult, multiplicationResult);
        
        // Reset button
        runMathBtn.textContent = 'Run Calculations';
        runMathBtn.disabled = false;
        
        showNotification('🧮 Math calculations completed!', 'success');
    }, 1000);
}

function showGreetingDemo() {
    showGreetingBtn.textContent = 'Loading...';
    showGreetingBtn.disabled = true;
    
    setTimeout(() => {
        // Use imported greeting function
        const greeting = greetUser('Developer');
        
        // Animate text change
        greetingText.style.opacity = '0';
        setTimeout(() => {
            greetingText.textContent = greeting;
            greetingText.style.opacity = '1';
        }, 200);
        
        // Reset button
        showGreetingBtn.textContent = 'Show Greeting';
        showGreetingBtn.disabled = false;
        
        showNotification('👋 Greeting loaded from module!', 'success');
    }, 800);
}

// Helper Functions
function animateNumberChange(element, newValue) {
    element.style.transform = 'scale(1.2)';
    element.style.color = '#4facfe';
    
    setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'scale(1)';
        element.style.color = '#4facfe';
    }, 150);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
                   type === 'error' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '9999',
        fontSize: '14px',
        fontWeight: '500',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility function to generate random colors for profiles
function getRandomColor() {
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Performance optimization: Debounced resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle resize-specific logic here if needed
        updateActiveNavLink();
    }, 250);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close any open modals or reset states
    if (e.key === 'Escape') {
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach(el => el.classList.remove('active'));
    }
    
    // Arrow keys for navigation (if needed)
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const nextSection = getCurrentSection()?.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const prevSection = getCurrentSection()?.previousElementSibling;
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            return section;
        }
    }
    return null;
}

// Export functions for potential external use
export {
    createDynamicCard,
    addProfile,
    runMathDemo,
    showGreetingDemo,
    showNotification
};