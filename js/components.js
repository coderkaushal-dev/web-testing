// js/components.js

function loadHeader() {
    const headerHTML = `
    <nav id="navbar" class="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <a href="index.html" class="flex items-center gap-2">
                <img src="./assets/images/logo.png" alt="Excess Ion Logo" class="h-12 w-auto">
                <div class="leading-none">
                    <span class="font-extrabold text-xl tracking-tight text-white block">EXCESS ION</span>
                    <span class="text-xs font-bold text-amber-500 tracking-widest uppercase">Academy</span>
                </div>
            </a>

            <div class="hidden md:flex space-x-8 items-center font-medium text-slate-300">
                <a href="index.html#home" class="hover:text-emerald-400 transition-colors">Home</a>
                <a href="notes.html" class="hover:text-emerald-400 transition-colors">Notes</a>
                <a href="index.html#batches" class="hover:text-emerald-400 transition-colors">Batches</a>
                <a href="top-skills.html" class="hover:text-emerald-400 transition-colors flex items-center gap-1">
                    Top Skills <span class="bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">Coming Soon</span>
                </a>
            </div>

            <div class="hidden md:flex items-center gap-6">
                <a href="login.html" class="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2">
                    <i class="fa-solid fa-user-graduate"></i> Student Login
                </a>
                <button onclick="toggleModal()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5">
                    Book Free Demo
                </button>
            </div>

            <div class="md:hidden">
                <button id="menu-btn" onclick="toggleMobileMenu()" class="text-white focus:outline-none p-2">
                    <i class="fa-solid fa-bars text-3xl"></i>
                </button>
            </div>
        </div>

        <div id="mobile-menu" class="hidden bg-slate-900 border-b border-white/10 px-6 py-6 absolute w-full left-0 top-[76px] transition-all shadow-2xl z-50">
            <div class="flex flex-col space-y-4 font-semibold text-slate-300">
                <a href="index.html#home" class="mobile-link hover:text-emerald-400">Home</a>
                <a href="notes.html" class="mobile-link hover:text-emerald-400">Notes</a>
                <a href="index.html#batches" class="mobile-link hover:text-emerald-400">Batches</a>
                <a href="top-skills.html" class="mobile-link hover:text-emerald-400 text-amber-500">Top Skills (New)</a>
                <hr class="border-slate-800 my-2">
                <a href="login.html" class="mobile-link text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
                    <i class="fa-solid fa-user-graduate"></i> Student Login
                </a>
                <button onclick="toggleModal()" class="bg-emerald-600 text-white py-3 rounded-xl font-bold w-full mt-2">Book Free Demo</button>
            </div>
        </div>
    </nav>

    <div id="enrollModal" class="fixed inset-0 z-[100] overflow-y-auto hidden">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div onclick="toggleModal()" class="fixed inset-0 transition-opacity bg-slate-950/80 backdrop-blur-sm"></div>
            
            <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl sm:my-8 sm:align-middle w-full max-w-lg">
                <div class="p-6 bg-slate-900 relative">
                    <button onclick="toggleModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                    <h3 class="text-xl font-bold text-white mb-2">Book Your Free Demo</h3>
                    <p class="text-xs text-slate-400 mb-6">Complete information for Class 1st-12th, CBSE, BSEB, NEET, JEE, or Olympiad.</p>
                    
                    <form onsubmit="submitModalForm(event)" class="space-y-3">
                        <div class="grid grid-cols-2 gap-3">
                            <input type="text" required id="m-name" placeholder="Full Name" class="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                            <input type="tel" required id="m-phone" placeholder="Mobile Number" class="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                        </div>
                        <input type="email" required id="m-email" placeholder="Email Address" class="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                        
                        <div class="grid grid-cols-2 gap-3">
                            <select required id="m-class" class="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none">
                                <option value="">Select Class</option>
                                <option value="Class 1st to 5th">Class 1st to 5th</option>
                                <option value="Class 6th to 8th">Class 6th to 8th</option>
                                <option value="Class 9th & 10th">Class 9th & 10th</option>
                                <option value="Class 11th & 12th">Class 11th & 12th</option>
                            </select>
                            <select required id="m-board" class="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none">
                                <option value="">Select Board</option>
                                <option value="CBSE">CBSE Board</option>
                                <option value="BSEB">BSEB (Bihar Board)</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <select required id="m-lang" class="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none">
                                <option value="English Medium">English Medium</option>
                                <option value="Hindi Medium">Hindi Medium</option>
                            </select>
                            <select required id="m-exam" class="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none">
                                <option value="None / Boards Only">Competitive Exam</option>
                                <option value="JEE Mains/Advanced">JEE Mains/Adv</option>
                                <option value="NEET UG">NEET UG</option>
                                <option value="Olympiad / Foundation">Olympiad</option>
                            </select>
                        </div>
                        <textarea required id="m-address" placeholder="Full Address" rows="2" class="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"></textarea>
                        
                        <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-2">
                            Confirm Registration
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div id="messageModal" class="fixed inset-0 z-[100] overflow-y-auto hidden">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div onclick="toggleMessageModal()" class="fixed inset-0 transition-opacity bg-slate-950/80 backdrop-blur-sm"></div>
            
            <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl sm:my-8 sm:align-middle w-full max-w-md">
                <div class="p-6 sm:p-8 text-center relative">
                    <div id="messageModalIcon" class="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-6">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <h3 id="messageModalTitle" class="text-xl font-bold text-white mb-2">Success!</h3>
                    <p id="messageModalText" class="text-sm text-slate-400 mb-6">Your message has been sent.</p>
                    
                    <button onclick="toggleMessageModal()" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById('header-placeholder').innerHTML = headerHTML;
}

function loadFooter() {
    const footerHTML = `
    <section class="py-16 bg-slate-950 border-t border-slate-800 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div class="lg:col-span-2">
                    <img src="./assets/images/logo.png" alt="Logo" class="h-16 w-auto mb-6">
                    <p class="text-slate-400 mb-6 max-w-sm">Premium coaching institute for CBSE & BSEB, NEET, JEE, and Olympiads. We focus on concept-first teaching.</p>
                    <div class="space-y-3 font-medium text-sm">
                        <p class="flex items-center gap-3 text-slate-300"><i class="fa-solid fa-phone text-emerald-500 w-4"></i> +91 7972581080</p>
                        <p class="flex items-center gap-3 text-slate-300"><i class="fa-solid fa-envelope text-emerald-500 w-4"></i> excession78@gmail.com</p>
                        <a href="https://www.google.com/maps/place/Excess+Ion/@24.7443973,84.3835544,649m/data=!3m2!1e3!4b1!4m6!3m5!1s0x398cfd125142232f:0xba327501bd9db0a3!8m2!3d24.7443973!4d84.3835544!16s%2Fg%2F11xkm7b7h2?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="flex items-start gap-3 text-slate-300 hover:text-emerald-400 transition-colors">
                            <i class="fa-solid fa-location-dot text-emerald-500 w-4 mt-1"></i> 
                            <span>Near Kalibadi Mandir, Surya Mandir Road, Aurangabad (Bihar)</span>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-bold text-white mb-6 relative inline-block">
                        Quick Links
                        <span class="absolute -bottom-2 left-0 w-1/2 h-1 bg-emerald-500 rounded-full"></span>
                    </h3>
                    <ul class="space-y-3 text-sm text-slate-400">
                        <li><a href="about.html" class="hover:text-emerald-400 transition-colors">About Us</a></li>
                        <li><a href="index.html#batches" class="hover:text-emerald-400 transition-colors">Our Batches</a></li>
                        <li><a href="notes.html" class="hover:text-emerald-400 transition-colors">Free Study Notes</a></li>
                        <li><a href="top-skills.html" class="hover:text-emerald-400 transition-colors">Top Skills</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-lg font-bold text-white mb-6 relative inline-block">
                        Legal Info
                        <span class="absolute -bottom-2 left-0 w-1/2 h-1 bg-emerald-500 rounded-full"></span>
                    </h3>
                    <ul class="space-y-3 text-sm text-slate-400">
                        <li><a href="terms-and-conditions.html" class="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
                        <li><a href="privacy-policy.html" class="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="refund-policy.html" class="hover:text-emerald-400 transition-colors">Refund Policy</a></li>
                        <li><a href="shipping-policy.html" class="hover:text-emerald-400 transition-colors">Shipping Policy</a></li>
                    </ul>
                </div>
            </div>

            <div class="relative w-full h-56 md:h-72 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl mb-12">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2826.1330494794674!2d84.38097947406352!3d24.74440214989424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398cfd125142232f%3A0xba327501bd9db0a3!2sExcess%20Ion!5e1!3m2!1sen!2sin!4v1779115832109!5m2!1sen!2sin" class="w-full h-full" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div class="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex gap-4">
                    <a href="https://wa.me/917972581080" target="_blank" class="w-10 h-10 rounded-full bg-slate-900 hover:bg-emerald-500 text-white flex items-center justify-center transition-all"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="https://instagram.com/excess_ion_acadmey" target="_blank" class="w-10 h-10 rounded-full bg-slate-900 hover:bg-pink-600 text-white flex items-center justify-center transition-all"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" target="_blank" class="w-10 h-10 rounded-full bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center transition-all"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/@ExcessIonAcademy" target="_blank" class="w-10 h-10 rounded-full bg-slate-900 hover:bg-red-600 text-white flex items-center justify-center transition-all"><i class="fa-brands fa-youtube"></i></a>
                </div> 
                <a href="https://www.google.com/maps/place/Excess+Ion/@24.7443973,84.3835544,649m/data=!3m2!1e3!4b1!4m6!3m5!1s0x398cfd125142232f:0xba327501bd9db0a3!8m2!3d24.7443973!4d84.3835544!16s%2Fg%2F11xkm7b7h2?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
                    <i class="fa-solid fa-map-location-dot"></i> Open in Map
                </a>
            </div>
        </div>
    </section>

    <footer class="bg-slate-950 text-slate-500 py-6 border-t border-slate-900">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <p class="text-sm">Founded in 2025 | © 2026 Excess Ion Academy. All Rights Reserved.</p>
            <div class="mt-2 text-xs">
                <span>Designed & Developed with ❤️ by</span>
                <a href="https://coderkaushal.netlify.app" target="_blank" class="text-emerald-400 font-bold hover:underline transition-all ml-1">Ashutosh Kaushal (CoderKaushal)</a>
            </div>
        </div>
    </footer>
    `;

    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}

function toggleMessageModal() {
    const modal = document.getElementById('messageModal');
    if (modal) modal.classList.toggle('hidden');
}

function showCustomAlert(title, message, type = 'info') {
    const modal = document.getElementById('messageModal');
    if (!modal) return;

    document.getElementById('messageModalTitle').innerText = title;
    document.getElementById('messageModalText').innerText = message;

    const iconContainer = document.getElementById('messageModalIcon');
    const icon = iconContainer.querySelector('i');

    iconContainer.className = 'w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-6'; // Reset
    icon.className = ''; // Reset

    if (type === 'success') {
        iconContainer.classList.add('bg-emerald-500/10', 'text-emerald-400');
        icon.classList.add('fa-solid', 'fa-circle-check');
    } else if (type === 'error') {
        iconContainer.classList.add('bg-red-500/10', 'text-red-400');
        icon.classList.add('fa-solid', 'fa-circle-xmark');
    } else { // info
        iconContainer.classList.add('bg-sky-500/10', 'text-sky-400');
        icon.classList.add('fa-solid', 'fa-circle-info');
    }

    if (modal.classList.contains('hidden')) {
        toggleMessageModal();
    }
}

loadHeader();
loadFooter();