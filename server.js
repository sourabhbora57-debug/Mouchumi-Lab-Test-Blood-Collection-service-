const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;

// Green API Credentials
const ID_INSTANCE = '710722713374';
const API_TOKEN = 'ba66c849c53047ce98200faea718e7e9ff228978d1df4ad9aa';
const TARGET_CHAT_ID = '916000219209@c.us';

const HTML_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Mouchumi Lab Test Blood Collection - Golaghat</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #071521;
            --card-dark: #0f2438;
            --card-subtle: #142e47;
            --input-bg: #0b1e30;
            --accent-blue: #0284c7;
            --accent-cyan: #38bdf8;
            --accent-teal: #0d9488;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --border-color: #1e3a5f;
            --green-btn: #4ade80;
            --green-active: #064e3b;
            --green-border: #10b981;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
        body { background-color: var(--bg-dark); color: var(--text-main); padding-bottom: 90px; }
        .app-container { max-width: 480px; margin: 0 auto; min-height: 100vh; background: var(--bg-dark); position: relative; }

        /* App Bar */
        .top-nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; }
        .logo-box { display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 42px; height: 42px; background: linear-gradient(135deg, #0284c7, #0d9488); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 12px rgba(2,132,199,0.3); }
        .logo-text h3 { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.2; }
        .logo-text p { font-size: 12px; color: var(--text-muted); }
        .notif-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--card-dark); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-muted); }

        /* Main View Sections */
        .view-section { padding: 0 20px; }
        .badge-tag { color: var(--accent-cyan); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
        .hero-title { font-size: 32px; font-weight: 800; line-height: 1.15; margin-bottom: 12px; letter-spacing: -0.5px; }
        .hero-title span { color: var(--accent-cyan); }
        .hero-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px; }

        /* Search Box */
        .search-box { position: relative; margin-bottom: 24px; }
        .search-box input { width: 100%; padding: 14px 16px 14px 44px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 14px; color: #fff; font-size: 14px; outline: none; }
        .search-box input::placeholder { color: #64748b; }
        .search-icon { position: absolute; left: 16px; top: 16px; color: #64748b; }

        /* Hero Banner Card */
        .banner-card { background: linear-gradient(135deg, #0369a1 0%, #0f766e 100%); border-radius: 20px; padding: 22px; margin-bottom: 28px; position: relative; overflow: hidden; }
        .banner-card::after { content: '💧'; position: absolute; right: -10px; bottom: -15px; font-size: 110px; opacity: 0.15; pointer-events: none; }
        .banner-tag { font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #bae6fd; margin-bottom: 8px; }
        .banner-card h3 { font-size: 20px; font-weight: 800; line-height: 1.3; margin-bottom: 8px; max-width: 85%; }
        .banner-card p { font-size: 13px; color: #e0f2fe; margin-bottom: 16px; max-width: 80%; }
        .banner-btn { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #0f172a; padding: 10px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; border: none; cursor: pointer; }

        /* Test List Cards */
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; }
        .section-header h3 { font-size: 18px; font-weight: 700; }
        .section-header p { font-size: 12px; color: var(--text-muted); }
        .test-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .test-card { background: var(--card-dark); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; transition: 0.2s; }
        .test-card.selected { border-color: var(--accent-cyan); background: var(--card-subtle); }
        .test-info { display: flex; align-items: center; gap: 12px; }
        .test-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--input-bg); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--accent-cyan); }
        .test-name { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
        .test-sub { font-size: 11px; color: var(--text-muted); }
        .test-action { text-align: right; }
        .test-price { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }
        .add-btn { background: var(--input-bg); border: 1px solid var(--border-color); color: var(--accent-cyan); padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; }
        .add-btn.added { background: var(--accent-cyan); color: #04121e; border-color: var(--accent-cyan); }

        /* Booking Form Modal / View */
        .booking-view { display: none; padding: 0 20px; }
        .nav-back-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; margin-bottom: 12px; }
        .back-btn { background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; display: flex; align-items: center; }
        .step-pill { background: #164e63; color: var(--accent-cyan); font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }

        .selected-summary-card { background: var(--card-dark); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
        
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; }
        .input-wrap { position: relative; }
        .input-wrap input, .input-wrap textarea, .input-wrap select { width: 100%; padding: 14px 14px 14px 42px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; color: #fff; font-size: 14px; outline: none; }
        .input-wrap .field-icon { position: absolute; left: 14px; top: 15px; color: var(--text-muted); }

        /* Choice Pills (Dates & Time) */
        .pills-group { display: flex; gap: 8px; margin-bottom: 12px; }
        .pill-btn { flex: 1; padding: 12px 8px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-muted); font-size: 13px; font-weight: 600; text-align: center; cursor: pointer; }
        .pill-btn.active { background: #38bdf8; color: #04121e; border-color: #38bdf8; font-weight: 700; }

        .slot-card { display: flex; align-items: center; justify-content: space-between; padding: 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 8px; cursor: pointer; color: var(--text-muted); font-size: 14px; }
        .slot-card.active { background: var(--green-active); border-color: var(--green-border); color: #fff; font-weight: 600; }

        /* Prescription Card */
        .prescription-card { background: var(--input-bg); border: 1px dashed var(--border-color); border-radius: 12px; padding: 16px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; cursor: pointer; }
        .presc-left { display: flex; align-items: center; gap: 12px; }

        /* Submit Button */
        .main-submit-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #0284c7, #0284c7); border: none; border-radius: 14px; color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(2,132,199,0.3); }
        .main-submit-btn:disabled { opacity: 0.6; }

        /* Floating Bottom Cart Bar */
        .floating-cart { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: calc(100% - 40px); max-width: 440px; background: #0369a1; border-radius: 16px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 100; }
        .cart-info h4 { font-size: 14px; font-weight: 800; color: #fff; }
        .cart-info p { font-size: 12px; color: #bae6fd; }
        .cart-next-btn { background: #fff; color: #0369a1; border: none; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; }

        /* Floating WhatsApp Chat */
        .wa-float { position: fixed; bottom: 85px; right: 20px; background: #22c55e; color: #fff; padding: 10px 16px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 6px 16px rgba(34,197,94,0.3); z-index: 99; }

        #toast { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); padding: 12px 20px; border-radius: 10px; font-size: 14px; font-weight: 600; display: none; z-index: 999; }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Top App Bar -->
        <div class="top-nav">
            <div class="logo-box">
                <div class="logo-icon">💧</div>
                <div class="logo-text">
                    <h3>Mouchumi Lab Test</h3>
                    <p>Golaghat • At-home collection</p>
                </div>
            </div>
            <div class="notif-btn">🔔</div>
        </div>

        <!-- Home View -->
        <div id="homeView" class="view-section">
            <div class="badge-tag">YOUR HEALTH, HANDLED</div>
            <h1 class="hero-title">The care you need, <br><span>right at home.</span></h1>
            <p class="hero-desc">Safe, gentle sample collection from certified labs, whenever it suits you.</p>

            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="searchInput" placeholder="Search for a test or package...">
            </div>

            <div class="banner-card">
                <div class="banner-tag">🏠 HOME COLLECTION</div>
                <h3>Reliable at-home sample collection in Golaghat.</h3>
                <p>Safe, gentle collection from a trusted local team.</p>
                <button class="banner-btn" onclick="scrollToTests()">Book a test ➔</button>
            </div>

            <div class="section-header">
                <div>
                    <h3>All tests & prices</h3>
                    <p id="testCountSub">Certified diagnostic tests</p>
                </div>
            </div>

            <div class="test-list" id="testsContainer">
                <!-- Injected via JS -->
            </div>
        </div>

        <!-- Booking View -->
        <div id="bookingView" class="booking-view">
            <div class="nav-back-header">
                <button class="back-btn" onclick="showHomeView()">←</button>
                <h3 style="font-size: 17px; font-weight: 700;">Schedule a home visit</h3>
                <span class="step-pill">1</span>
            </div>

            <div class="selected-summary-card">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="font-size: 20px;">💧</div>
                    <div>
                        <div style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;">SELECTED TESTS</div>
                        <div id="bookingSelectedSummary" style="font-size: 14px; font-weight: 700;">--</div>
                    </div>
                </div>
                <div id="bookingTotalSummary" style="font-size: 16px; font-weight: 800; color: #38bdf8;">₹0</div>
            </div>

            <form id="scheduleForm">
                <div class="form-group">
                    <label>Full name</label>
                    <div class="input-wrap">
                        <span class="field-icon">👤</span>
                        <input type="text" id="custName" required placeholder="e.g. Sourabh Bora">
                    </div>
                </div>

                <div style="display: flex; gap: 10px;" class="form-group">
                    <div style="flex:1;">
                        <label>Age</label>
                        <div class="input-wrap">
                            <span class="field-icon">🎂</span>
                            <input type="number" id="custAge" required placeholder="26">
                        </div>
                    </div>
                    <div style="flex:1;">
                        <label>Sex</label>
                        <div class="input-wrap">
                            <span class="field-icon">⚧</span>
                            <select id="custSex" required style="padding-left: 36px;">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Phone number</label>
                    <div class="input-wrap">
                        <span class="field-icon">📞</span>
                        <input type="tel" id="custPhone" required placeholder="+91 98765 43210">
                    </div>
                </div>

                <div class="form-group">
                    <label>Pickup address</label>
                    <div class="input-wrap">
                        <span class="field-icon">📍</span>
                        <textarea id="custAddress" rows="2" required placeholder="Flat, building, street and locality"></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label>Doctor Referral (Optional)</label>
                    <div class="input-wrap">
                        <span class="field-icon">🩺</span>
                        <input type="text" id="custDoctor" placeholder="Doctor or Clinic Name">
                    </div>
                </div>

                <div style="margin-top: 20px; margin-bottom: 8px;">
                    <label style="font-weight: 700; color: #fff; font-size: 15px;">Choose a date</label>
                    <div class="pills-group" style="margin-top: 10px;">
                        <div class="pill-btn active" onclick="selectDate(this, 'Today')">Today</div>
                        <div class="pill-btn" onclick="selectDate(this, 'Tomorrow')">Tomorrow</div>
                        <div class="pill-btn" onclick="selectDate(this, 'Next Day')">Upcoming</div>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="font-weight: 700; color: #fff; font-size: 15px; margin-bottom: 10px; display:block;">Choose a time</label>
                    <div class="slot-card active" onclick="selectTime(this, '7:00 – 9:00 AM')">
                        <span>🕒 7:00 – 9:00 AM (Fasting Preferred)</span>
                        <span>✔</span>
                    </div>
                    <div class="slot-card" onclick="selectTime(this, '9:00 – 11:00 AM')">
                        <span>🕒 9:00 – 11:00 AM</span>
                        <span></span>
                    </div>
                    <div class="slot-card" onclick="selectTime(this, '4:00 – 6:00 PM')">
                        <span>🕒 4:00 – 6:00 PM</span>
                        <span></span>
                    </div>
                </div>

                <div class="prescription-card">
                    <div class="presc-left">
                        <span style="font-size: 22px;">☁️</span>
                        <div>
                            <div style="font-size: 13px; font-weight: 700;">Prescription note</div>
                            <div style="font-size: 11px; color: var(--text-muted);">Optional, mention tests if unsure</div>
                        </div>
                    </div>
                    <span style="color: var(--accent-cyan); font-weight: 800;">➔</span>
                </div>

                <button type="submit" id="submitBtn" class="main-submit-btn">Confirm home collection ➔</button>
            </form>
        </div>

        <!-- Floating Cart Footer -->
        <div id="cartBar" class="floating-cart" style="display: none;">
            <div class="cart-info">
                <h4 id="cartTotalText">₹0</h4>
                <p id="cartItemsText">0 tests selected</p>
            </div>
            <button class="cart-next-btn" onclick="goToBooking()">Schedule Visit ➔</button>
        </div>

        <!-- Floating WhatsApp -->
        <a href="https://wa.me/916000219209" target="_blank" class="wa-float">
            <span>💬</span> Chat
        </a>

        <div id="toast"></div>
    </div>

    <script>
        const TEST_DATA = [
            { id: 1, name: "Complete Blood Count (CBC)", price: 400, desc: "Home collection included" },
            { id: 2, name: "ABO, Rh GROUPING", price: 100, desc: "Blood group determination" },
            { id: 3, name: "Lipid Profile", price: 600, desc: "Cholesterol, HDL, LDL, Triglycerides" },
            { id: 4, name: "Liver Function Test (LFT)", price: 750, desc: "Bilirubin, SGOT, SGPT, Protein" },
            { id: 5, name: "Kidney Function Test (KFT)", price: 700, desc: "Urea, Creatinine, Uric Acid" },
            { id: 6, name: "Thyroid Profile (Total T3, T4, TSH)", price: 500, desc: "Complete hormone evaluation" },
            { id: 7, name: "Blood Glucose (Fasting / PP)", price: 100, desc: "Fasting or Post Prandial sugar" },
            { id: 8, name: "HbA1c (Glycated Hemoglobin)", price: 450, desc: "3 Months average blood sugar" }
        ];

        let selectedTests = [];
        let selectedDate = "Today";
        let selectedSlot = "7:00 – 9:00 AM";

        function renderTests(tests) {
            const container = document.getElementById('testsContainer');
            container.innerHTML = '';
            tests.forEach(test => {
                const isSelected = selectedTests.some(t => t.id === test.id);
                const card = document.createElement('div');
                card.className = 'test-card' + (isSelected ? ' selected' : '');
                card.innerHTML = \`
                    <div class="test-info">
                        <div class="test-icon">🧪</div>
                        <div>
                            <div class="test-name">\${test.name}</div>
                            <div class="test-sub">\${test.desc}</div>
                        </div>
                    </div>
                    <div class="test-action">
                        <div class="test-price">₹\${test.price}</div>
                        <button class="add-btn \${isSelected ? 'added' : ''}" onclick="toggleTest(\${test.id})">
                            \${isSelected ? 'Added ✓' : '+ Add'}
                        </button>
                    </div>
                \`;
                container.appendChild(card);
            });
        }

        function toggleTest(id) {
            const test = TEST_DATA.find(t => t.id === id);
            const index = selectedTests.findIndex(t => t.id === id);
            if (index > -1) {
                selectedTests.splice(index, 1);
            } else {
                selectedTests.push(test);
            }
            updateCart();
            renderTests(TEST_DATA);
        }

        function updateCart() {
            const cartBar = document.getElementById('cartBar');
            const total = selectedTests.reduce((sum, t) => sum + t.price, 0);
            if (selectedTests.length > 0) {
                cartBar.style.display = 'flex';
                document.getElementById('cartTotalText').innerText = '₹' + total;
                document.getElementById('cartItemsText').innerText = selectedTests.length + ' test' + (selectedTests.length > 1 ? 's' : '') + ' selected';
            } else {
                cartBar.style.display = 'none';
            }
        }

        function scrollToTests() {
            document.getElementById('testsContainer').scrollIntoView({ behavior: 'smooth' });
        }

        function goToBooking() {
            if (selectedTests.length === 0) return;
            document.getElementById('homeView').style.display = 'none';
            document.getElementById('bookingView').style.display = 'block';
            document.getElementById('cartBar').style.display = 'none';

            const total = selectedTests.reduce((sum, t) => sum + t.price, 0);
            document.getElementById('bookingSelectedSummary').innerText = selectedTests.map(t => t.name).join(', ');
            document.getElementById('bookingTotalSummary').innerText = '₹' + total;
            window.scrollTo(0,0);
        }

        function showHomeView() {
            document.getElementById('bookingView').style.display = 'none';
            document.getElementById('homeView').style.display = 'block';
            updateCart();
        }

        function selectDate(elem, val) {
            document.querySelectorAll('.pill-btn').forEach(p => p.classList.remove('active'));
            elem.classList.add('active');
            selectedDate = val;
        }

        function selectTime(elem, slot) {
            document.querySelectorAll('.slot-card').forEach(s => {
                s.classList.remove('active');
                s.querySelector('span:last-child').innerText = '';
            });
            elem.classList.add('active');
            elem.querySelector('span:last-child').innerText = '✔';
            selectedSlot = slot;
        }

        // Live Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const filtered = TEST_DATA.filter(t => t.name.toLowerCase().includes(val) || t.desc.toLowerCase().includes(val));
            renderTests(filtered);
        });

        // Form Submit
        document.getElementById('scheduleForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            btn.disabled = true;
            btn.innerText = 'Scheduling Visit...';

            const total = selectedTests.reduce((sum, t) => sum + t.price, 0);
            const payload = {
                patientName: document.getElementById('custName').value,
                age: document.getElementById('custAge').value,
                sex: document.getElementById('custSex').value,
                phone: document.getElementById('custPhone').value,
                address: document.getElementById('custAddress').value,
                referredBy: document.getElementById('custDoctor').value || 'Self',
                date: selectedDate,
                timeSlot: selectedSlot,
                testsList: selectedTests.map(t => t.name).join(', '),
                grandTotal: total
            };

            try {
                const response = await fetch('/send-booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const resData = await response.json();
                if (resData.success) {
                    showToast('🎉 Booking Confirmed! We will reach you soon.', '#10b981');
                    setTimeout(() => {
                        selectedTests = [];
                        document.getElementById('scheduleForm').reset();
                        showHomeView();
                        renderTests(TEST_DATA);
                    }, 2000);
                } else {
                    showToast('Failed to book. Try again.', '#ef4444');
                }
            } catch (err) {
                showToast('Network error occurred.', '#ef4444');
            } finally {
                btn.disabled = false;
                btn.innerText = 'Confirm home collection ➔';
            }
        });

        function showToast(msg, bg) {
            const toast = document.getElementById('toast');
            toast.innerText = msg;
            toast.style.background = bg;
            toast.style.color = '#fff';
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3000);
        }

        renderTests(TEST_DATA);
    </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(HTML_PAGE);
        return;
    }

    if (req.method === 'POST' && req.url === '/send-booking') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { patientName, age, sex, phone, address, referredBy, testsList, grandTotal, date, timeSlot } = data;

                const message = `*📋 NEW HOME COLLECTION SCHEDULED*\n` +
                    `--------------------------------\n` +
                    `👤 *Patient Name:* ${patientName || 'N/A'}\n` +
                    `🎂 *Age / Sex:* ${age || ''} Yrs / ${sex || ''}\n` +
                    `📞 *Phone:* ${phone || 'N/A'}\n` +
                    `📍 *Pickup Address:* ${address || 'N/A'}\n` +
                    `🩺 *Referred By:* ${referredBy || 'Self'}\n` +
                    `🗓 *Date:* ${date || 'N/A'}\n` +
                    `⏰ *Time Slot:* ${timeSlot || 'N/A'}\n` +
                    `--------------------------------\n` +
                    `🧪 *Selected Tests:*\n${testsList || 'N/A'}\n` +
                    `--------------------------------\n` +
                    `💰 *Grand Total: ₹${grandTotal || 0}*`;

                const postData = JSON.stringify({
                    chatId: TARGET_CHAT_ID,
                    message: message
                });

                const options = {
                    hostname: 'api.green-api.com',
                    path: `/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };

                const apiReq = https.request(options, (apiRes) => {
                    let apiResponse = '';
                    apiRes.on('data', chunk => { apiResponse += chunk; });
                    apiRes.on('end', () => {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true, greenApiResponse: JSON.parse(apiResponse || '{}') }));
                    });
                });

                apiReq.on('error', (e) => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: e.message }));
                });

                apiReq.write(postData);
                apiReq.end();

            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
