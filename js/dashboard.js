// js/dashboard.js

const studentId = localStorage.getItem('loggedInStudentId');

// Redirect to login if not logged in
if (!studentId) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('loggedInStudentId');
    window.location.href = 'login.html';
}

// Custom Tab Switching Logic
function switchTab(tabName) {
    const offlineSec = document.getElementById('offline-section');
    const onlineSec = document.getElementById('online-section');
    const btnOffline = document.getElementById('tab-offline');
    const btnOnline = document.getElementById('tab-online');

    if(tabName === 'offline') {
        offlineSec.classList.remove('hidden');
        onlineSec.classList.add('hidden');
        
        // Active Styles for Offline Button
        btnOffline.className = "flex-1 md:w-40 py-2.5 rounded-lg text-sm font-bold bg-emerald-600 text-white shadow-md transition-all";
        // Inactive Styles for Online Button
        btnOnline.className = "flex-1 md:w-40 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white transition-all";
    } else {
        onlineSec.classList.remove('hidden');
        offlineSec.classList.add('hidden');
        
        // Active Styles for Online Button
        btnOnline.className = "flex-1 md:w-40 py-2.5 rounded-lg text-sm font-bold bg-emerald-600 text-white shadow-md transition-all";
        // Inactive Styles for Offline Button
        btnOffline.className = "flex-1 md:w-40 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white transition-all";
    }
}

// Expandable Course Card Toggle
function toggleCourseCard(courseIndex) {
    const content = document.getElementById(`content-course-${courseIndex}`);
    const icon = document.getElementById(`icon-course-${courseIndex}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = "rotate(180deg)";
    } else {
        content.classList.add('hidden');
        icon.style.transform = "rotate(0deg)";
    }
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


async function fetchDashboardData() {
    try {
        // 1. Fetch Profile Details
        const studentDoc = await db.collection('students').doc(studentId).get();
        if (!studentDoc.exists) {
            showCustomAlert("Error", "Student profile not found. Please contact admin.", "error");
            return logout();
        }
        
        const data = studentDoc.data();
        document.getElementById('p-name').innerText = data.name || "N/A";
        document.getElementById('p-id').innerText = studentId;
        document.getElementById('p-class').innerText = `Class ${data.studentClass || "N/A"}`;
        document.getElementById('p-type').innerText = data.type || "Offline"; 
        if(data.photoUrl) document.getElementById('p-photo').src = data.photoUrl;

        // --- NEW: TOP SKILLS LOGIC ---
        const topSkillsContainer = document.getElementById('online-courses-container');
        const emptyState = document.getElementById('online-empty-state');
        topSkillsContainer.innerHTML = '';

        // Check if student has topSkills array in database
        if (data.topSkills && Array.isArray(data.topSkills) && data.topSkills.length > 0) {
            emptyState.classList.add('hidden'); // Hide empty state banner
            
            // Loop through each enrolled skill and create a card
            data.topSkills.forEach((skillName, index) => {
                const cardHTML = `
                <div class="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-emerald-500/50">
                    <button onclick="toggleCourseCard(${index})" class="w-full p-6 sm:p-8 flex justify-between items-center hover:bg-slate-800/50 transition-colors text-left group">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <i class="fa-solid fa-code"></i>
                            </div>
                            <div>
                                <h3 class="text-xl sm:text-2xl font-extrabold text-white">${skillName}</h3>
                                <p class="text-xs sm:text-sm text-emerald-400 font-bold mt-1 tracking-wider uppercase">Active Subscription</p>
                            </div>
                        </div>
                        <i id="icon-course-${index}" class="fa-solid fa-chevron-down text-xl text-slate-400 transition-transform duration-300"></i>
                    </button>
                    
                    <div id="content-course-${index}" class="hidden border-t border-slate-800 bg-slate-950 p-6 sm:p-8">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <a href="https://discord.gg/YOUR_INVITE_LINK" target="_blank" class="bg-[#5865F2] hover:bg-[#4752C4] text-white py-4 px-4 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-3 shadow-lg hover:-translate-y-1">
                                <i class="fa-brands fa-discord text-3xl"></i>
                                <span class="font-bold text-sm">Join Live Class</span>
                            </a>
                            <button onclick="showCustomAlert('Info', 'Recorded lectures are updated every weekend!', 'info')" class="bg-slate-800 hover:bg-emerald-600 text-white py-4 px-4 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-3 border border-slate-700 hover:border-emerald-500">
                                <i class="fa-solid fa-circle-play text-3xl"></i>
                                <span class="font-bold text-sm">Recorded Lectures</span>
                            </button>
                            <button onclick="showCustomAlert('Success', 'Assets downloaded successfully!', 'success')" class="bg-slate-800 hover:bg-emerald-600 text-white py-4 px-4 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-3 border border-slate-700 hover:border-emerald-500">
                                <i class="fa-solid fa-folder-open text-3xl"></i>
                                <span class="font-bold text-sm">Study Material</span>
                            </button>
                        </div>
                    </div>
                </div>
                `;
                topSkillsContainer.innerHTML += cardHTML;
            });
        } else {
            // No skills enrolled, show upsell banner
            emptyState.classList.remove('hidden');
        }
        // ------------------------------

        // 2. Fetch Attendance (Current Month)
        const attDoc = await db.collection('attendance')
            .where('studentId', '==', studentId)
            .limit(1).get();
        
        if (!attDoc.empty) {
            const att = attDoc.docs[0].data();
            const percent = Math.round((att.presentDays / att.totalClasses) * 100);
            document.getElementById('att-percent').innerText = percent + '%';
            document.getElementById('att-stats').innerText = `${att.presentDays} days attended out of ${att.totalClasses}`;
            document.getElementById('att-bar').style.width = percent + '%';
        }

        // 3. Fetch Test Results (Marks for Parents/Students)
        const testDocs = await db.collection('test_results')
            .where('studentId', '==', studentId)
            .get();

        const tableBody = document.getElementById('test-table-body');
        tableBody.innerHTML = ""; // Clear existing rows
        let totalPercent = 0;
        let count = 0;

        if (testDocs.empty) {
            tableBody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-slate-500">No test records found.</td></tr>`;
        } else {
            testDocs.forEach(doc => {
                const test = doc.data();
                const testPercent = Math.round((test.marksObtained / test.totalMarks) * 100);
                totalPercent += testPercent;
                count++;

                const row = `
                    <tr class="border-b border-slate-800 hover:bg-slate-800/50 transition-all">
                        <td class="p-4 font-semibold">${test.testName}</td>
                        <td class="p-4 text-emerald-400">${test.marksObtained} / ${test.totalMarks}</td>
                        <td class="p-4 font-bold">${testPercent}%</td>
                        <td class="p-4"><span class="bg-amber-500/20 text-amber-500 px-2 py-1 rounded text-xs font-bold">#${test.rank || 'N/A'}</span></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }

        if (count > 0) {
            document.getElementById('avg-score').innerText = Math.round(totalPercent / count) + '%';
        }

        // 4. Fetch Fee Details (Without Online Payment)
        const feeDoc = await db.collection('fees')
            .where('studentId', '==', studentId)
            .where('status', '==', 'due')
            .limit(1).get();

        const payNowBtn = document.getElementById('pay-now-btn');
        if (!feeDoc.empty) {
            const fee = feeDoc.docs[0].data();
            document.getElementById('fee-due-amount').innerText = `₹${fee.amount}`;
            
            const dueDateStr = fee.dueDate && fee.dueDate.seconds 
                ? new Date(fee.dueDate.seconds * 1000).toLocaleDateString() 
                : fee.dueDate;
            
            document.getElementById('fee-due-date').innerText = dueDateStr || 'Not Set';
            
            payNowBtn.disabled = false;
            payNowBtn.innerText = 'Contact to Pay';
            payNowBtn.onclick = () => {
                showCustomAlert('Payment Info', `Online payments are currently disabled. Please contact the academy at +91 7972581080 to clear your due amount of ₹${fee.amount}.`, 'info');
            };
        } else {
            document.getElementById('fee-due-amount').innerText = '₹0';
            document.getElementById('fee-due-date').innerText = 'No Dues';
            payNowBtn.innerText = 'No Dues';
            payNowBtn.disabled = true;
            payNowBtn.classList.replace('bg-emerald-600', 'bg-slate-800');
        }

        // 5. Fetch Payment History (Manual Receipts added by Admin)
        const paymentDocs = await db.collection('payments')
            .where('studentId', '==', studentId)
            .get();

        const paymentTableBody = document.getElementById('payment-history-body');
        paymentTableBody.innerHTML = "";

        if (paymentDocs.empty) {
            paymentTableBody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-slate-500">No payment history found.</td></tr>`;
        } else {
            paymentDocs.forEach(doc => {
                const payment = doc.data();
                const paymentDateStr = payment.paymentDate && payment.paymentDate.seconds 
                    ? new Date(payment.paymentDate.seconds * 1000).toLocaleDateString() 
                    : payment.paymentDate;

                const row = `
                    <tr class="border-b border-slate-800 hover:bg-slate-800/50 transition-all">
                        <td class="p-4 font-mono text-xs text-slate-400">${doc.id}</td>
                        <td class="p-4">${paymentDateStr}</td>
                        <td class="p-4 font-bold text-white">₹${payment.amount}</td>
                        <td class="p-4"><span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] uppercase font-bold">${payment.status || 'Paid'}</span></td>
                    </tr>
                `;
                paymentTableBody.innerHTML += row;
            });
        }

    } catch (error) {
        console.error("Error fetching dashboard:", error);
        showCustomAlert("Network Error", "Could not fetch dashboard data. Please check the console for more details.", "error");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDashboardData();
});