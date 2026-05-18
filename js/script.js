// js/script.js

// Menu & Modal functions
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

function toggleModal() {
    const modal = document.getElementById('enrollModal');
    if (modal) modal.classList.toggle('hidden');
}

function submitModalForm(event) {
    event.preventDefault();
    const name = document.getElementById('m-name').value;
    const phone = document.getElementById('m-phone').value;
    const exam = document.getElementById('m-exam').value;

    alert(`Registration Confirmed!\nName: ${name}\nPhone: ${phone}\nWe will contact you shortly.`);
    event.target.reset();
    toggleModal();
}

// --- INTERACTIVE CAROUSEL WITH ARROWS ---
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('slider-wrapper');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    if (wrapper) {
        let currentSlide = 0;
        const totalSlides = 3;
        let slideInterval;

        // Function to move slide
        function updateSlider() {
            wrapper.style.transform = `translateX(-${currentSlide * 33.3333}%)`;
        }

        // Next slide logic
        function goNext() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        // Previous slide logic
        function goPrev() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        // Auto slide runner
        function startAutoSlide() {
            slideInterval = setInterval(goNext, 5000);
        }

        // Reset timer if user clicks manual arrows
        function resetInterval() {
            clearInterval(slideInterval);
            startAutoSlide();
        }

        // Arrow Click Listeners
        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                goNext();
                resetInterval();
            });
        }
        
        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                goPrev();
                resetInterval();
            });
        }

        startAutoSlide(); // Launch
    }
    
    revealOnScroll();
});

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', revealOnScroll);