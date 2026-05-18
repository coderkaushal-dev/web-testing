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

// --- FIREBASE LOGIC FOR MODAL FORM ---
async function submitModalForm(event) {
    event.preventDefault();
    
    // Button par loading animation dikhane ke liye
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Fetching all inputs from the Modal Form
    const data = {
        name: document.getElementById('m-name').value,
        phone: document.getElementById('m-phone').value,
        email: document.getElementById('m-email').value,
        studentClass: document.getElementById('m-class').value,
        board: document.getElementById('m-board').value,
        language: document.getElementById('m-lang').value,
        competitiveExam: document.getElementById('m-exam').value,
        address: document.getElementById('m-address').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Exact server time
    };

    try {
        // Saving directly to Firestore DB Collection named 'demo_registrations'
        await db.collection('demo_registrations').add(data);
        
        alert(`Registration Confirmed Successfully!\nHi ${data.name}, our team will contact you at ${data.phone} soon.`);
        event.target.reset(); // Form clear karna
        toggleModal(); // Modal close karna
    } catch (error) {
        console.error("Firebase Error: ", error);
        alert("Server error! Please make sure your firebase-config.js is setup correctly.");
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
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

        startAutoSlide(); // Launch Auto Slide
    }
    
    revealOnScroll(); // Trigger animations on load
});

// Scroll Reveal Animations
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