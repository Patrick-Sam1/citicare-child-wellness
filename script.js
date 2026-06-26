// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger.querySelector('i')) {
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            }
        });
    });
}

// ===== TESTIMONIALS CAROUSEL =====
const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

if (testimonialTrack && prevBtn && nextBtn && dotsContainer) {
    const slides = testimonialTrack.querySelectorAll('.testimonial-slide');
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Next/Prev buttons
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    // Auto-play (optional)
    let autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 6000);

    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 6000);
    });
}

// ===== CONTACT FORM HANDLING =====
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const message = document.getElementById('message')?.value || '';
    
    if (name && email && message) {
        // Show success message
        const form = document.getElementById('contactForm');
        const originalContent = form.innerHTML;
        
        form.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--gold); margin-bottom: 16px;"></i>
                <h3 style="font-family: 'Inter', sans-serif; margin-bottom: 8px;">Message Sent!</h3>
                <p style="color: #666;">Thank you, ${name}. We'll get back to you within 24 hours.</p>
                <button onclick="location.reload()" class="btn-primary" style="margin-top: 20px;">Send Another Message</button>
            </div>
        `;
        
        // Log the message data (in production, this would send to server)
        console.log('Form submitted:', { name, email, message });
    }
    
    return false;
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SCROLL ANIMATION (Optional Enhancement) =====
// Simple fade-in effect for elements as they scroll into view
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

// Observe elements with animation classes (optional)
document.querySelectorAll('.feature-card, .service-card, .value-item, .team-member, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== VIDEO AUTO-PLAY HANDLING =====
// Pause videos when not in viewport
document.querySelectorAll('video').forEach(video => {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Video is visible - could auto-play if desired
                // video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.3 });
    
    videoObserver.observe(video);
});

console.log('CITICARE website loaded successfully!');
console.log('🌟 Golden Touch in Psychological Services');