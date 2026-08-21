const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;

// Green API Credentials
const ID_INSTANCE = process.env.GREEN_API_ID || '710722713374';
const API_TOKEN = process.env.GREEN_API_TOKEN || 'ba66c849c53047ce98200faea718e7e9ff228978d1df4ad9aa';
const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID || '916000219209@c.us';

const HTML_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Mouchumi Lab Test Blood Collection Service - Golaghat</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #071521;
            --card-dark: #0f2438;
            --card-subtle: #132e47;
            --input-bg: #091a2a;
            --accent-blue: #0284c7;
            --accent-cyan: #38bdf8;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --border-color: #1e3d5f;
            --green-active: #064e3b;
            --green-border: #10b981;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
        
        html, body { 
            background-color: var(--bg-dark); 
            color: var(--text-main); 
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        
        .app-container { 
            max-width: 480px; 
            margin: 0 auto; 
            min-height: 100vh; 
            background: var(--bg-dark); 
            position: relative; 
            display: flex;
            flex-direction: column;
        }

        .top-nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .logo-box { display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 42px; height: 42px; background: linear-gradient(135deg, #0284c7, #0d9488); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 12px rgba(2,132,199,0.3); }
        .logo-text h3 { font-size: 14px; font-weight: 800; color: #fff; line-height: 1.2; }
        .logo-text p { font-size: 11px; color: var(--accent-cyan); }
        .notif-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--card-dark); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-muted); }

        .view-section { padding: 16px 20px 10px; flex: 1; }
        .badge-tag { color: var(--accent-cyan); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
        .hero-title { font-size: 28px; font-weight: 800; line-height: 1.15; margin-bottom: 8px; letter-spacing: -0.5px; }
        .hero-title span { color: var(--accent-cyan); }
        .hero-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 18px; }

        .banner-card { background: linear-gradient(135deg, #0369a1 0%, #0f766e 100%); border-radius: 18px; padding: 18px; margin-bottom: 20px; position: relative; overflow: hidden; }
        .banner-card::after { content: '💧'; position: absolute; right: -10px; bottom: -15px; font-size: 90px; opacity: 0.15; pointer-events: none; }
        .banner-tag { font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #bae6fd; margin-bottom: 6px; }
        .banner-card h3 { font-size: 17px; font-weight: 800; line-height: 1.3; margin-bottom: 4px; max-width: 85%; }
        .banner-card p { font-size: 12px; color: #e0f2fe; margin-bottom: 12px; max-width: 80%; }
        .banner-btn { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #0f172a; padding: 8px 14px; border-radius: 8px; font-weight: 700; font-size: 12px; border: none; cursor: pointer; }

        .tests-main-container { background: #0c1d2e; border: 1px solid var(--border-color); border-radius: 18px; padding: 16px; margin-bottom: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .tests-header-area { margin-bottom: 12px; }
        .tests-header-area h3 { font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 2px; }
        .tests-header-area p { font-size: 12px; color: var(--text-muted); }

        .test-search-wrapper { position: relative; margin-bottom: 14px; }
        .test-search-wrapper input { width: 100%; padding: 13px 14px 13px 42px; background: var(--input-bg); border: 1.5px solid var(--accent-cyan); border-radius: 12px; color: #fff; font-size: 14px; outline: none; }
        .test-search-wrapper input::placeholder { color: #64748b; }
        .test-search-icon { position: absolute; left: 14px; top: 14px; color: var(--accent-cyan); }

        .tests-scroll-view { max-height: 440px; overflow-y: auto; padding-right: 4px; scroll-behavior: smooth; display: flex; flex-direction: column; gap: 10px; }
        .tests-scroll-view::-webkit-scrollbar { width: 4px; }
        .tests-scroll-view::-webkit-scrollbar-thumb { background: #1e3d5f; border-radius: 10px; }

        .test-item-card { background: linear-gradient(145deg, #10263c 0%, #0d1f30 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 14px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s ease; }
        .test-item-card.selected { border-color: var(--accent-cyan); background: linear-gradient(145deg, #153856 0%, #0e2942 100%); box-shadow: 0 4px 15px rgba(2,132,199,0.2); }
        .test-left-content { max-width: 68%; }
        .test-title { font-size: 14px; font-weight: 700; color: #fff; line-height: 1.35; margin-bottom: 4px; }
        
        .vial-pill { font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 4px; margin-top: 4px; }
        .vial-violet { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }
        .vial-red { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
        .vial-blue { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }
        .vial-grey { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.4); }
        .vial-black { background: rgba(15, 23, 42, 0.9); color: #e2e8f0; border: 1px solid #475569; }
        .vial-green { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }
        .vial-na { background: rgba(100, 116, 139, 0.15); color: #94a3b8; border: 1px solid #475569; }

        .test-right-content { text-align: right; min-width: 80px; }
        .test-cost { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 6px; }
        .add-action-btn { background: #081726; border: 1px solid #1e3d5f; color: var(--accent-cyan); padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; width: 100%; transition: 0.2s; }
        .add-action-btn.active-btn { background: var(--accent-cyan); color: #04121e; border-color: var(--accent-cyan); }

        /* Booking View */
        .booking-view { display: none; padding: 0 20px 30px; }
        .nav-back-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; margin-bottom: 12px; }
        .back-btn { background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; }
        .step-pill { background: #164e63; color: var(--accent-cyan); font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }

        .selected-summary-card { background: var(--card-dark); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
        
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; }
        .input-wrap { position: relative; }
        .input-wrap input, .input-wrap textarea, .input-wrap select { width: 100%; padding: 14px 14px 14px 42px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; color: #fff; font-size: 14px; outline: none; }
        .input-wrap .field-icon { position: absolute; left: 14px; top: 15px; color: var(--text-muted); }

        /* File Upload Box */
        .file-upload-box {
            border: 2px dashed var(--border-color);
            background: var(--input-bg);
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            cursor: pointer;
            transition: 0.2s;
            position: relative;
        }
        .file-upload-box:hover { border-color: var(--accent-cyan); }
        .file-upload-box input[type="file"] {
            position: absolute;
            inset: 0;
            opacity: 0;
            cursor: pointer;
            width: 100%;
            height: 100%;
        }
        .upload-icon { font-size: 24px; margin-bottom: 4px; display: block; }
        .upload-text { font-size: 13px; font-weight: 600; color: var(--accent-cyan); }
        .upload-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
        .file-name-preview { font-size: 12px; color: #10b981; font-weight: 700; margin-top: 8px; word-break: break-all; display: none; }

        .pills-group { display: flex; gap: 8px; margin-bottom: 12px; }
        .pill-btn { flex: 1; padding: 12px 8px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-muted); font-size: 13px; font-weight: 600; text-align: center; cursor: pointer; }
        .pill-btn.active { background: #38bdf8; color: #04121e; border-color: #38bdf8; font-weight: 700; }

        .slot-card { display: flex; align-items: center; justify-content: space-between; padding: 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 8px; cursor: pointer; color: var(--text-muted); font-size: 14px; }
        .slot-card.active { background: var(--green-active); border-color: var(--green-border); color: #fff; font-weight: 600; }

        .main-submit-btn { width: 100%; padding: 16px; background: #0284c7; border: none; border-radius: 14px; color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(2,132,199,0.3); }

        /* Review Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: none; align-items: flex-end; justify-content: center; z-index: 1000; }
        .modal-content { background: #0e2235; border: 1px solid var(--border-color); border-radius: 24px 24px 0 0; width: 100%; max-width: 480px; padding: 24px 20px; max-height: 85vh; overflow-y: auto; }
        .modal-header { text-align: center; margin-bottom: 18px; }
        .modal-header h3 { font-size: 19px; font-weight: 800; color: #fff; }
        .modal-header p { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
        .review-box { background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 14px; padding: 16px; margin-bottom: 18px; }
        .review-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; border-bottom: 1px dashed rgba(255,255,255,0.06); padding-bottom: 8px; }
        .review-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .review-label { color: var(--text-muted); }
        .review-val { font-weight: 700; color: #fff; text-align: right; max-width: 60%; }
        .modal-btns { display: flex; gap: 10px; }
        .edit-btn { flex: 1; padding: 14px; background: transparent; border: 1px solid var(--border-color); color: #fff; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .final-confirm-btn { flex: 2; padding: 14px; background: #10b981; border: none; color: #fff; border-radius: 12px; font-weight: 800; font-size: 14px; cursor: pointer; }

        /* Success Dialog */
        .success-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: none; align-items: center; justify-content: center; z-index: 1001; padding: 20px; }
        .success-card { background: #0c1f31; border: 1px solid #10b981; border-radius: 20px; padding: 30px 20px; text-align: center; max-width: 400px; width: 100%; box-shadow: 0 10px 30px rgba(16,185,129,0.2); }
        .success-icon { width: 65px; height: 65px; background: rgba(16,185,129,0.15); border: 2px solid #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 16px; color: #10b981; }

        .floating-cart { position: fixed; bottom: 15px; left: 50%; transform: translateX(-50%); width: calc(100% - 40px); max-width: 440px; background: #0369a1; border-radius: 16px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 100; }
        .cart-info h4 { font-size: 15px; font-weight: 800; color: #fff; }
        .cart-info p { font-size: 12px; color: #bae6fd; }
        .cart-next-btn { background: #fff; color: #0369a1; border: none; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; }

        .wa-float { position: fixed; bottom: 85px; right: 20px; background: #22c55e; color: #fff; padding: 10px 16px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 6px 16px rgba(34,197,94,0.4); z-index: 99; }

        .app-footer { background: #040d17; border-top: 2px solid var(--border-color); padding: 24px 20px 30px; text-align: center; margin-top: auto; }
        .footer-brand { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }
        .footer-tagline { font-size: 12px; color: var(--accent-cyan); margin-bottom: 16px; }
        
        .footer-contact-box { background: #091a2a; border: 1px solid var(--border-color); border-radius: 14px; padding: 14px; margin-bottom: 16px; }
        .contact-label { font-size: 11px; color: #cbd5e1; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
        .contact-links { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .phone-badge { color: #fff; text-decoration: none; font-size: 13px; font-weight: 800; background: #0284c7; padding: 8px 14px; border-radius: 10px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 10px rgba(2,132,199,0.3); }

        .footer-social-links { display: flex; justify-content: center; gap: 12px; margin-bottom: 16px; }
        .social-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 10px; font-size: 12px; font-weight: 700; text-decoration: none; color: #fff; }
        .social-google { background: #1e3a5f; border: 1px solid #38bdf8; }
        .social-fb { background: #1877f2; }

        .copyright-text { font-size: 11px; color: #94a3b8; font-weight: 500; }
    </style>
</head>
<body>
    <div class="app-container">
        <div>
            <div class="top-nav">
                <div class="logo-box">
                    <div class="logo-icon">💧</div>
                    <div class="logo-text">
                        <h3>Mouchumi Lab Test Blood Collection service</h3>
                        <p>Golaghat • At-home certified sample collection</p>
                    </div>
                </div>
                <div class="notif-btn">🔔</div>
            </div>

            <!-- Home View -->
            <div id="homeView" class="view-section">
                <div class="badge-tag">YOUR HEALTH, HANDLED</div>
                <h1 class="hero-title">The care you need, <br><span>right at home.</span></h1>
                <p class="hero-desc">Safe, gentle sample collection from certified labs, whenever it suits you.</p>

                <div class="banner-card">
                    <div class="banner-tag">🏠 HOME COLLECTION</div>
                    <h3>Reliable at-home sample collection in Golaghat.</h3>
                    <p>Safe, gentle collection from a trusted local team.</p>
                    <button class="banner-btn" onclick="focusSearch()">Select Tests ➔</button>
                </div>

                <div class="tests-main-container" id="testBoxContainer">
                    <div class="tests-header-area">
                        <h3>All 156 Tests & Packages</h3>
                        <p>Find blood, urine, or organ health tests below</p>
                    </div>

                    <div class="test-search-wrapper">
                        <span class="test-search-icon">🔍</span>
                        <input type="text" id="searchInput" placeholder="Search test name (e.g. CBC, Sugar, Lipid)...">
                    </div>

                    <div class="tests-scroll-view" id="testsContainer"></div>
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
                            <div id="bookingSelectedSummary" style="font-size: 13px; font-weight: 700; max-width: 240px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">--</div>
                        </div>
                    </div>
                    <div id="bookingTotalSummary" style="font-size: 16px; font-weight: 800; color: #38bdf8;">₹0</div>
                </div>

                <form id="scheduleForm">
                    <div class="form-group">
                        <label>Full name *</label>
                        <div class="input-wrap">
                            <span class="field-icon">👤</span>
                            <input type="text" id="custName" required placeholder="Enter Patient Name">
                        </div>
                    </div>

                    <div style="display: flex; gap: 10px;" class="form-group">
                        <div style="flex:1;">
                            <label>Age *</label>
                            <div class="input-wrap">
                                <span class="field-icon">🎂</span>
                                <input type="number" id="custAge" required placeholder="Age">
                            </div>
                        </div>
                        <div style="flex:1;">
                            <label>Sex *</label>
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
                        <label>Phone number *</label>
                        <div class="input-wrap">
                            <span class="field-icon">📞</span>
                            <input type="tel" id="custPhone" required placeholder="WhatsApp / Phone number">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Pickup address *</label>
                        <div class="input-wrap">
                            <span class="field-icon">📍</span>
                            <textarea id="custAddress" rows="2" required placeholder="Flat, house no, street, locality"></textarea>
                        </div>
                    </div>

                    <!-- Customizable Collection Charge -->
                    <div class="form-group">
                        <label>Home Collection Charge (₹)</label>
                        <div class="input-wrap">
                            <span class="field-icon">🚗</span>
                            <input type="number" id="custCollectionCharge" value="100" min="0" placeholder="100" oninput="updateBookingSummary()">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Doctor Referral (Optional)</label>
                        <div class="input-wrap">
                            <span class="field-icon">🩺</span>
                            <input type="text" id="custDoctor" placeholder="Doctor or Clinic Name">
                        </div>
                    </div>

                    <!-- Doctor Prescription File Upload -->
                    <div class="form-group">
                        <label>Doctor's Prescription (Optional)</label>
                        <div class="file-upload-box">
                            <input type="file" id="custPrescription" accept="image/*,application/pdf" onchange="handleFileChange(this)">
                            <span class="upload-icon">📄</span>
                            <span class="upload-text">Upload Prescription Photo/PDF</span>
                            <div class="upload-sub">Supports JPG, PNG, PDF (Max 5MB)</div>
                            <div id="filePreview" class="file-name-preview"></div>
                        </div>
                    </div>

                    <div style="margin-top: 15px; margin-bottom: 8px;">
                        <label style="font-weight: 700; color: #fff; font-size: 14px;">Choose a date</label>
                        <div class="pills-group" style="margin-top: 8px;">
                            <div class="pill-btn active" onclick="selectDate(this, 'Today')">Today</div>
                            <div class="pill-btn" onclick="selectDate(this, 'Tomorrow')">Tomorrow</div>
                            <div class="pill-btn" onclick="selectDate(this, 'Upcoming')">Upcoming</div>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="font-weight: 700; color: #fff; font-size: 14px; margin-bottom: 8px; display:block;">Choose a time</label>
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

                    <button type="submit" class="main-submit-btn">Review Booking Details ➔</button>
                </form>
            </div>
        </div>

        <!-- Review Modal -->
        <div id="reviewModal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>📋 Review Booking Details</h3>
                    <p>Please check your details before final submission</p>
                </div>
                <div class="review-box">
                    <div class="review-row">
                        <span class="review-label">Patient Name</span>
                        <span class="review-val" id="revName">--</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Age / Gender</span>
                        <span class="review-val" id="revAgeSex">--</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Phone</span>
                        <span class="review-val" id="revPhone">--</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Address</span>
                        <span class="review-val" id="revAddress">--</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Doctor</span>
                        <span class="review-val" id="revDoctor">--</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Prescription</span>
                        <span class="review-val" id="revPrescription" style="color: #38bdf8;">None</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Schedule</span>
                        <span class="review-val" id="revSchedule">--</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Selected Tests</span>
                        <span class="review-val" id="revTests" style="color: var(--accent-cyan);">--</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Tests Cost</span>
                        <span class="review-val" id="revTestCost">₹0</span>
                    </div>
                    <div class="review-row">
                        <span class="review-label">Collection Charge</span>
                        <span class="review-val" id="revCollectionCharge" style="color: #10b981;">₹100</span>
                    </div>
                    <div class="review-row" style="margin-top: 6px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <span class="review-label" style="font-size: 15px; font-weight: 800; color: #fff;">Grand Total</span>
                        <span class="review-val" id="revTotal" style="font-size: 16px; font-weight: 800; color: #38bdf8;">₹0</span>
                    </div>
                </div>
                <div class="modal-btns">
                    <button class="edit-btn" onclick="closeReviewModal()">Edit</button>
                    <button class="final-confirm-btn" id="confirmFinalBtn" onclick="submitFinalBooking()">Confirm & Send</button>
                </div>
            </div>
        </div>

        <!-- Success Dialog -->
        <div id="successScreen" class="success-overlay">
            <div class="success-card">
                <div class="success-icon">✓</div>
                <h3 style="font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 8px;">Booking Confirmed!</h3>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">
                    Thank you, <b id="successPatientName" style="color: #fff;"></b>! Your appointment request has been scheduled successfully. Our technician will visit you on time.
                </p>
                <button onclick="dismissSuccess()" class="main-submit-btn" style="background: #10b981;">Back to Home</button>
            </div>
        </div>

        <!-- Footer Section -->
        <footer class="app-footer">
            <div class="footer-brand">Mouchumi Lab Test Blood Collection service</div>
            <div class="footer-tagline">Quality Diagnostic Care At Your Doorstep • Golaghat</div>

            <div class="footer-contact-box">
                <div class="contact-label">📞 Call / Helpline Numbers</div>
                <div class="contact-links">
                    <a href="tel:6000219209" class="phone-badge">📞 6000219209</a>
                    <a href="tel:6900862973" class="phone-badge">📞 6900862973</a>
                </div>
            </div>

            <div class="footer-social-links">
                <a href="https://www.google.com/search?kgmid=%2Fg%2F11z3b65pfx&hl=en-IN&q=Mouchumi%20Lab%20Test%20Blood%20Collection%20Service&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Fosrp%2Fm1%2F4&kgs=77a96a992d41c88b" target="_blank" class="social-btn social-google">
                    🌐 Google Listing
                </a>
                <a href="https://www.facebook.com/share/1Bv1KmUsSt/" target="_blank" class="social-btn social-fb">
                    📘 Facebook Page
                </a>
            </div>

            <div class="copyright-text">
                © 2026 Mouchumi Lab Test Blood Collection service. All rights reserved.
            </div>
        </footer>

        <!-- Floating Cart Footer -->
        <div id="cartBar" class="floating-cart" style="display: none;">
            <div class="cart-info">
                <h4 id="cartTotalText">₹0</h4>
                <p id="cartItemsText">0 tests selected</p>
            </div>
            <button class="cart-next-btn" onclick="goToBooking()">Schedule Visit ➔</button>
        </div>

        <a href="https://wa.me/916000219209" target="_blank" class="wa-float">
            <span>💬</span> Chat
        </a>
    </div>

    <script>
        const ALL_TESTS = [
            { id: 1, name: "ABO, Rh GROUPING", price: 100, vial: "VIOLET" },
            { id: 2, name: "ABSOLUTE EOSINOPHIL COUNT", price: 150, vial: "VIOLET" },
            { id: 3, name: "ABSOLUTE LYMPHOCYTE COUNT", price: 150, vial: "VIOLET" },
            { id: 4, name: "ABSOLUTE MONOCYTE COUNT", price: 150, vial: "VIOLET" },
            { id: 5, name: "ABSOLUTE NEUTROPHIL COUNT", price: 150, vial: "VIOLET" },
            { id: 6, name: "ADA - TBM", price: 750, vial: "RED" },
            { id: 7, name: "Albumin", price: 100, vial: "RED" },
            { id: 8, name: "Allergy Profile", price: 1200, vial: "VIOLET & RED" },
            { id: 9, name: "ΑΜΗ", price: 2300, vial: "RED" },
            { id: 10, name: "ΑΜΜΟΝΙΑ", price: 1000, vial: "VIOLET" },
            { id: 11, name: "ANTENATAL CHECK UP (ANC)", price: 2900, vial: "GREY, VIOLET & RED" },
            { id: 12, name: "ANTI CCP", price: 1600, vial: "RED" },
            { id: 13, name: "ΑΝΤΙ ТРО", price: 2000, vial: "RED" },
            { id: 14, name: "ANTINUCLEAR ANTI BODY (ΑΝΑ)", price: 1000, vial: "RED" },
            { id: 15, name: "ANTINUCLEAR ANTI BODY Reflex (ANA Profile)", price: 4000, vial: "RED" },
            { id: 16, name: "APTT", price: 500, vial: "BLUE" },
            { id: 17, name: "ASO titre (By Immunoturbidity)", price: 500, vial: "RED" },
            { id: 18, name: "BAND CELL", price: 150, vial: "VIOLET" },
            { id: 19, name: "Beta HCG, Serum", price: 900, vial: "RED" },
            { id: 20, name: "BIOPSY- Small Tissue", price: 800, vial: "NA" },
            { id: 21, name: "BIOPSY- Medium Tissue", price: 1000, vial: "NA" },
            { id: 22, name: "BIOPSY- Large Tissue", price: 1200, vial: "NA" },
            { id: 23, name: "BIOPSY- Extra Large Tissue", price: 2000, vial: "NA" },
            { id: 24, name: "BLEEDING TIME/CLOTTING TIME (BT/CT)", price: 50, vial: "NA" },
            { id: 25, name: "BLOOD UREA", price: 200, vial: "RED" },
            { id: 26, name: "BUN", price: 150, vial: "RED" },
            { id: 27, name: "CPK MB", price: 1350, vial: "RED" },
            { id: 28, name: "CRP (TITRE) immunoturbidity", price: 450, vial: "RED" },
            { id: 29, name: "CA 125", price: 1600, vial: "RED" },
            { id: 30, name: "CBC (Complete Blood Count)", price: 400, vial: "VIOLET" },
            { id: 31, name: "CHOLESTEROL TOTAL", price: 200, vial: "RED" },
            { id: 32, name: "COAGULATION PROFILE", price: 1200, vial: "BLUE" },
            { id: 33, name: "CSF ANALYSIS", price: 550, vial: "NA" },
            { id: 34, name: "DENGUE, Serology Test", price: 900, vial: "RED" },
            { id: 35, name: "DIABETIC PROFILE", price: 2500, vial: "GREY, VIOLET" },
            { id: 36, name: "Differential Leucocyte Count (D.L.C)", price: 150, vial: "VIOLET" },
            { id: 37, name: "DIRECT COOMBS TEST", price: 250, vial: "RED" },
            { id: 38, name: "DIRECT/INDIRECT BILIRUBIN", price: 150, vial: "RED" },
            { id: 39, name: "eGFR", price: 500, vial: "RED" },
            { id: 40, name: "ELECTROLYTE 3 (THREE) PARAMETERS", price: 600, vial: "RED" },
            { id: 41, name: "ESR", price: 100, vial: "BLACK" },
            { id: 42, name: "FASTING PLASMA GLUCOSE (FBS)", price: 50, vial: "GREY" },
            { id: 43, name: "FERRITIN", price: 1000, vial: "RED" },
            { id: 44, name: "FERTILITY PROFILE", price: 1500, vial: "RED" },
            { id: 45, name: "FERTILITY PROFILE (MALE)", price: 2400, vial: "RED" },
            { id: 46, name: "FSH", price: 650, vial: "RED" },
            { id: 47, name: "FT3", price: 600, vial: "RED" },
            { id: 48, name: "FT4", price: 600, vial: "RED" },
            { id: 49, name: "FUNGAL SMEAR", price: 250, vial: "NA" },
            { id: 50, name: "G6PD", price: 600, vial: "VIOLET" },
            { id: 51, name: "GAMMA G. T. (GGT)", price: 400, vial: "RED" },
            { id: 52, name: "GCT WITH 75 GM GLUCOSE", price: 150, vial: "GREY" },
            { id: 53, name: "GLUCOSE TOLERENCE TEST", price: 400, vial: "GREY" },
            { id: 54, name: "GRAM STAIN", price: 150, vial: "VIOLET" },
            { id: 55, name: "HDL CHOLESTEROL", price: 350, vial: "RED" },
            { id: 56, name: "HAEMOGLOBIN (Hb)", price: 100, vial: "VIOLET" },
            { id: 57, name: "Hb TYPING", price: 1400, vial: "VIOLET" },
            { id: 58, name: "HbA1C", price: 600, vial: "VIOLET" },
            { id: 59, name: "HEPATITIS A/HAV (SCREENING)", price: 600, vial: "RED" },
            { id: 60, name: "HEPATITIS B SURFACE AG (HBsAg)", price: 400, vial: "RED" },
            { id: 61, name: "HEPATITIS C (SCREENING)", price: 400, vial: "RED" },
            { id: 62, name: "HEPATITIS E (SCREENING)", price: 600, vial: "RED" },
            { id: 63, name: "HEPATITIS PANEL", price: 3500, vial: "RED" },
            { id: 64, name: "HIV (I & II) SCREENING", price: 350, vial: "RED" },
            { id: 65, name: "IMMATURE CELL", price: 150, vial: "VIOLET" },
            { id: 66, name: "INDIRECT COOMBS TEST", price: 1100, vial: "RED" },
            { id: 67, name: "IRON", price: 500, vial: "RED" },
            { id: 68, name: "IRON & TIBC", price: 750, vial: "RED" },
            { id: 69, name: "IRON & UIBC", price: 750, vial: "RED" },
            { id: 70, name: "IRON PROFILE", price: 1500, vial: "RED" },
            { id: 71, name: "KFT (WITH 3 PARA ELECTROLYTE)", price: 1100, vial: "RED" },
            { id: 72, name: "KOH TEST FOR SKIN & NAILS", price: 300, vial: "NA" },
            { id: 73, name: "LDH", price: 650, vial: "RED" },
            { id: 74, name: "Leptospira (IgM/IgG)", price: 600, vial: "RED" },
            { id: 75, name: "LH", price: 650, vial: "RED" },
            { id: 76, name: "LIPASE", price: 500, vial: "RED" },
            { id: 77, name: "LIPID PROFILE", price: 800, vial: "RED" },
            { id: 78, name: "LIVER FUNCTION TEST (LFT)", price: 800, vial: "RED" },
            { id: 79, name: "M.P. By Slide Method / PBF FOR MP", price: 250, vial: "VIOLET" },
            { id: 80, name: "MALARIA PF/PV CARD RAPID TEST", price: 250, vial: "VIOLET" },
            { id: 81, name: "MALIGNANT CELL", price: 550, vial: "VIOLET" },
            { id: 82, name: "MICROALBUMIN, Spot Urine", price: 600, vial: "NA" },
            { id: 83, name: "NT PRO BNP", price: 1750, vial: "RED" },
            { id: 84, name: "PBS FOR CELL MORPHOLOGY", price: 250, vial: "VIOLET" },
            { id: 85, name: "PLATELET COUNT", price: 100, vial: "VIOLET" },
            { id: 86, name: "PLEURAL FLUID ANALYSIS: PHYSICAL, CHEMICAL", price: 850, vial: "PF" },
            { id: 87, name: "PLEURAL FLUID ANALYSIS: CYTOLOGICAL", price: 500, vial: "PF" },
            { id: 88, name: "PLEURAL FLUID ANALYSIS: ADA", price: 650, vial: "PF" },
            { id: 89, name: "PLEURAL FLUID ANALYSIS: LH", price: 400, vial: "PF" },
            { id: 90, name: "POST PRANDIAL PLASMA GLUCOSE (PPBS)", price: 50, vial: "GREY" },
            { id: 91, name: "PROLACTIN", price: 900, vial: "RED" },
            { id: 92, name: "PROTHROMBIN TIME (PT INR)", price: 400, vial: "BLUE" },
            { id: 93, name: "PSA", price: 1050, vial: "RED" },
            { id: 94, name: "QUANTI FERON", price: 1800, vial: "GREEN" },
            { id: 95, name: "QUANTITATIVE HBsAg", price: 600, vial: "RED" },
            { id: 96, name: "QUANTITATIVE HCV", price: 600, vial: "RED" },
            { id: 97, name: "QUANTITATIVE HIV", price: 600, vial: "RED" },
            { id: 98, name: "R.A FACTOR", price: 250, vial: "RED" },
            { id: 99, name: "RANDOM PLASMA GLUCOSE (RBS)", price: 100, vial: "GREY" },
            { id: 100, name: "RETICULOCYTE COUNT", price: 300, vial: "VIOLET" },
            { id: 101, name: "Rh ANTIBODY TITRE", price: 650, vial: "VIOLET" },
            { id: 102, name: "ROUTINE EXAM.OF BLOOD", price: 300, vial: "VIOLET" },
            { id: 103, name: "Scrub typhus (IgM/IgG)", price: 500, vial: "RED" },
            { id: 104, name: "SGOT/AST", price: 150, vial: "RED" },
            { id: 105, name: "SGPT/ALT", price: 150, vial: "RED" },
            { id: 106, name: "SEMEN ANALYSIS", price: 500, vial: "NA" },
            { id: 107, name: "Sepsis Screen", price: 800, vial: "VIOLET & RED" },
            { id: 108, name: "SERUM ALK. PHOSPHATASE", price: 200, vial: "RED" },
            { id: 109, name: "SERUM AMYLASE", price: 450, vial: "RED" },
            { id: 110, name: "SERUM BILIRUBIN, TOTAL", price: 150, vial: "RED" },
            { id: 111, name: "SERUM CALCIUM", price: 250, vial: "RED" },
            { id: 112, name: "SERUM C-PEPTIDE", price: 1000, vial: "RED" },
            { id: 113, name: "SERUM CHLORIDE", price: 250, vial: "RED" },
            { id: 114, name: "SERUM CREATININE", price: 200, vial: "RED" },
            { id: 115, name: "SERUM IgE", price: 900, vial: "RED" },
            { id: 116, name: "SERUM MAGNESIUM", price: 500, vial: "RED" },
            { id: 117, name: "SERUM PHOSPHATE", price: 350, vial: "RED" },
            { id: 118, name: "SERUM PHOSPHORUS", price: 500, vial: "RED" },
            { id: 119, name: "SERUM POTASSIUM (K)", price: 250, vial: "RED" },
            { id: 120, name: "SERUM SODIUM (Na)", price: 250, vial: "RED" },
            { id: 121, name: "SPUTUM AFB (Z.N. STAIN)", price: 250, vial: "NA" },
            { id: 122, name: "Sputum AFB Culture", price: 1100, vial: "NA" },
            { id: 123, name: "STOOL for Culture and Sensitivity", price: 600, vial: "NA" },
            { id: 124, name: "STOOL FOR OCCULT BLOOD", price: 150, vial: "NA" },
            { id: 125, name: "STOOL RE", price: 150, vial: "NA" },
            { id: 126, name: "T3", price: 400, vial: "RED" },
            { id: 127, name: "T4", price: 400, vial: "RED" },
            { id: 128, name: "TESTOSTEORNE-FREE", price: 2600, vial: "RED" },
            { id: 129, name: "TESTOSTERONE - TOTAL", price: 900, vial: "RED" },
            { id: 130, name: "THYROID PROFILE, TOTAL", price: 700, vial: "RED" },
            { id: 131, name: "TORCH PANEL (10 PROFILE)", price: 3000, vial: "RED" },
            { id: 132, name: "TOTAL PROTEIN & FRACTION", price: 300, vial: "RED" },
            { id: 133, name: "TOTAL R B C COUNT", price: 100, vial: "VIOLET" },
            { id: 134, name: "TOTAL W B C COUNT (TC)", price: 100, vial: "VIOLET" },
            { id: 135, name: "TOXO TEST (IgM & IgG)", price: 1500, vial: "RED" },
            { id: 136, name: "TRIGLYCERIDE", price: 250, vial: "RED" },
            { id: 137, name: "TROPONIN I TEST", price: 1250, vial: "RED" },
            { id: 138, name: "TROPONIN T TEST", price: 1300, vial: "RED" },
            { id: 139, name: "TSH", price: 400, vial: "RED" },
            { id: 140, name: "TYPHIDOT", price: 350, vial: "RED" },
            { id: 141, name: "URIC ACID", price: 150, vial: "RED" },
            { id: 142, name: "Urine Albumin", price: 100, vial: "NA" },
            { id: 143, name: "URINE CULTURE", price: 350, vial: "NA" },
            { id: 144, name: "URINE FOR ACR", price: 600, vial: "NA" },
            { id: 145, name: "URINE PREGNANCY TEST / beta HCG", price: 150, vial: "NA" },
            { id: 146, name: "URINE PROTEIN 24 HOURS", price: 350, vial: "NA" },
            { id: 147, name: "URINE R.E.", price: 150, vial: "NA" },
            { id: 148, name: "Urine Sugar", price: 100, vial: "NA" },
            { id: 149, name: "VDRL KIT", price: 400, vial: "RED" },
            { id: 150, name: "Vitamin A", price: 4000, vial: "RED" },
            { id: 151, name: "Vitamin B12", price: 1500, vial: "RED" },
            { id: 152, name: "Vitamin C", price: 3500, vial: "RED" },
            { id: 153, name: "VITAMIN D", price: 1700, vial: "RED" },
            { id: 154, name: "Vitamin E", price: 2500, vial: "RED" },
            { id: 155, name: "Vitamin K", price: 4500, vial: "RED" },
            { id: 156, name: "WIDAL TEST", price: 250, vial: "RED" }
        ];

        let selectedTests = [];
        let selectedDate = "Today";
        let selectedSlot = "7:00 – 9:00 AM";
        let pendingPayload = null;
        let prescriptionFile = null;

        function getCollectionCharge() {
            const val = document.getElementById('custCollectionCharge');
            if (!val || val.value === '') return 100;
            const parsed = parseFloat(val.value);
            return isNaN(parsed) ? 0 : parsed;
        }

        function getVialClass(vial) {
            vial = vial.toUpperCase();
            if (vial.includes('VIOLET') && vial.includes('RED')) return 'vial-violet';
            if (vial.includes('VIOLET')) return 'vial-violet';
            if (vial.includes('RED')) return 'vial-red';
            if (vial.includes('BLUE')) return 'vial-blue';
            if (vial.includes('GREY')) return 'vial-grey';
            if (vial.includes('BLACK')) return 'vial-black';
            if (vial.includes('GREEN')) return 'vial-green';
            return 'vial-na';
        }

        function renderTests(tests) {
            const container = document.getElementById('testsContainer');
            container.innerHTML = '';
            
            if (tests.length === 0) {
                container.innerHTML = '<div style="text-align:center; padding:30px 10px; color:#94a3b8; font-size:14px;">No test found matching your search.</div>';
                return;
            }

            tests.forEach(test => {
                const isSelected = selectedTests.some(t => t.id === test.id);
                const vialCls = getVialClass(test.vial);
                const card = document.createElement('div');
                card.className = 'test-item-card' + (isSelected ? ' selected' : '');
                
                card.innerHTML = 
                    '<div class="test-left-content">' +
                        '<div class="test-title">' + test.name + '</div>' +
                        '<span class="vial-pill ' + vialCls + '">● ' + test.vial + '</span>' +
                    '</div>' +
                    '<div class="test-right-content">' +
                        '<div class="test-cost">₹' + test.price + '</div>' +
                        '<button class="add-action-btn ' + (isSelected ? 'active-btn' : '') + '" onclick="toggleTest(' + test.id + ')">' +
                            (isSelected ? 'Added ✓' : '+ Add') +
                        '</button>' +
                    '</div>';
                container.appendChild(card);
            });
        }

        function toggleTest(id) {
            const test = ALL_TESTS.find(t => t.id === id);
            const index = selectedTests.findIndex(t => t.id === id);
            if (index > -1) {
                selectedTests.splice(index, 1);
            } else {
                selectedTests.push(test);
            }
            updateCart();
            applyFilter();
        }

        function updateCart() {
            const cartBar = document.getElementById('cartBar');
            const testCost = selectedTests.reduce((sum, t) => sum + t.price, 0);
            const charge = getCollectionCharge();
            const grandTotal = selectedTests.length > 0 ? (testCost + charge) : 0;
            
            if (selectedTests.length > 0) {
                cartBar.style.display = 'flex';
                document.getElementById('cartTotalText').innerText = '₹' + grandTotal;
                document.getElementById('cartItemsText').innerText = selectedTests.length + ' test' + (selectedTests.length > 1 ? 's' : '') + ' (+₹' + charge + ' Coll.)';
            } else {
                cartBar.style.display = 'none';
            }
        }

        function updateBookingSummary() {
            const testCost = selectedTests.reduce((sum, t) => sum + t.price, 0);
            const charge = getCollectionCharge();
            const grandTotal = testCost + charge;
            document.getElementById('bookingTotalSummary').innerText = '₹' + grandTotal;
            updateCart();
        }

        function applyFilter() {
            const val = document.getElementById('searchInput').value.trim().toLowerCase();
            let filtered = ALL_TESTS;
            if (val) {
                filtered = ALL_TESTS.filter(t => t.name.toLowerCase().includes(val) || t.vial.toLowerCase().includes(val));
                document.getElementById('testBoxContainer').scrollIntoView({ behavior: 'smooth' });
                document.getElementById('testsContainer').scrollTop = 0;
            }
            renderTests(filtered);
        }

        document.getElementById('searchInput').addEventListener('input', applyFilter);

        function focusSearch() {
            document.getElementById('testBoxContainer').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('searchInput').focus();
        }

        function goToBooking() {
            if (selectedTests.length === 0) return;
            document.getElementById('homeView').style.display = 'none';
            document.getElementById('bookingView').style.display = 'block';
            document.getElementById('cartBar').style.display = 'none';

            document.getElementById('bookingSelectedSummary').innerText = selectedTests.map(t => t.name).join(', ');
            updateBookingSummary();
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

        function handleFileChange(input) {
            const file = input.files[0];
            const preview = document.getElementById('filePreview');
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size exceeds 5MB limit. Please choose a smaller file.');
                    input.value = '';
                    prescriptionFile = null;
                    preview.style.display = 'none';
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    prescriptionFile = {
                        name: file.name,
                        type: file.type,
                        base64: e.target.result.split(',')[1]
                    };
                    preview.innerText = '📎 ' + file.name;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                prescriptionFile = null;
                preview.style.display = 'none';
            }
        }

        document.getElementById('scheduleForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const testCost = selectedTests.reduce((sum, t) => sum + t.price, 0);
            const charge = getCollectionCharge();
            const total = testCost + charge;
            
            pendingPayload = {
                patientName: document.getElementById('custName').value,
                age: document.getElementById('custAge').value,
                sex: document.getElementById('custSex').value,
                phone: document.getElementById('custPhone').value,
                address: document.getElementById('custAddress').value,
                referredBy: document.getElementById('custDoctor').value || 'Self',
                date: selectedDate,
                timeSlot: selectedSlot,
                testCount: selectedTests.length,
                testsList: selectedTests.map((t, idx) => (idx + 1) + '. ' + t.name + ' (₹' + t.price + ')').join('\\n'),
                testCost: testCost,
                collectionCharge: charge,
                grandTotal: total,
                prescription: prescriptionFile
            };

            document.getElementById('revName').innerText = pendingPayload.patientName;
            document.getElementById('revAgeSex').innerText = pendingPayload.age + ' Yrs / ' + pendingPayload.sex;
            document.getElementById('revPhone').innerText = pendingPayload.phone;
            document.getElementById('revAddress').innerText = pendingPayload.address;
            document.getElementById('revDoctor').innerText = pendingPayload.referredBy;
            document.getElementById('revPrescription').innerText = prescriptionFile ? prescriptionFile.name : 'None';
            document.getElementById('revSchedule').innerText = pendingPayload.date + ' (' + pendingPayload.timeSlot + ')';
            document.getElementById('revTests').innerText = selectedTests.map(t => t.name).join(', ');
            document.getElementById('revTestCost').innerText = '₹' + testCost;
            document.getElementById('revCollectionCharge').innerText = '₹' + charge;
            document.getElementById('revTotal').innerText = '₹' + total;

            document.getElementById('reviewModal').style.display = 'flex';
        });

        function closeReviewModal() {
            document.getElementById('reviewModal').style.display = 'none';
        }

        async function submitFinalBooking() {
            if (!pendingPayload) return;
            const btn = document.getElementById('confirmFinalBtn');
            btn.disabled = true;
            btn.innerText = 'Sending Booking...';

            try {
                const response = await fetch('/send-booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pendingPayload)
                });
                const resData = await response.json();

                if (resData.success) {
                    closeReviewModal();
                    document.getElementById('successPatientName').innerText = pendingPayload.patientName;
                    document.getElementById('successScreen').style.display = 'flex';
                } else {
                    alert('Submission failed. Please try again.');
                }
            } catch (err) {
                alert('Network error. Check your connection.');
            } finally {
                btn.disabled = false;
                btn.innerText = 'Confirm & Send';
            }
        }

        function dismissSuccess() {
            document.getElementById('successScreen').style.display = 'none';
            selectedTests = [];
            prescriptionFile = null;
            document.getElementById('filePreview').style.display = 'none';
            document.getElementById('scheduleForm').reset();
            document.getElementById('custCollectionCharge').value = '100';
            showHomeView();
            applyFilter();
        }

        renderTests(ALL_TESTS);
    </script>
</body>
</html>`;

function sendGreenApiRequest(path, payload) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(payload);
        const options = {
            hostname: 'api.green-api.com',
            path: path,
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
                try {
                    resolve(JSON.parse(apiResponse));
                } catch (e) {
                    resolve({ raw: apiResponse });
                }
            });
        });

        apiReq.on('error', (e) => reject(e));
        apiReq.write(postData);
        apiReq.end();
    });
}

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
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const { patientName, age, sex, phone, address, referredBy, testCount, testsList, testCost, collectionCharge, grandTotal, date, timeSlot, prescription } = data;

                const message = `*MOUCHUMI LAB TEST BLOOD COLLECTION SERVICE*\n` +
                    `*Home Collection Booking Confirm*\n` +
                    `═══════════════════════════\n` +
                    `👤 *Patient Name:* ${patientName || 'N/A'}\n` +
                    `🎂 *Age / Sex:* ${age || ''} Yrs / ${sex || ''}\n` +
                    `📞 *Phone:* ${phone || 'N/A'}\n` +
                    `📍 *Pickup Address:* ${address || 'N/A'}\n` +
                    `🩺 *Referred By:* ${referredBy || 'Self'}\n` +
                    `🗓 *Date:* ${date || 'N/A'}\n` +
                    `⏰ *Time Slot:* ${timeSlot || 'N/A'}\n` +
                    `═══════════════════════════\n` +
                    `🧪 *Total Tests:* ${testCount || 0}\n` +
                    `*Selected Tests:*\n${testsList || 'N/A'}\n` +
                    `───────────────────────────\n` +
                    `💵 *Tests Cost:* ₹${testCost || 0}\n` +
                    `🚗 *Collection Charge:* ₹${collectionCharge || 0}\n` +
                    `💰 *Grand Total: ₹${grandTotal || 0}*\n` +
                    `═══════════════════════════` +
                    (prescription ? `\n📎 *Prescription Attached:* ${prescription.name}` : '');

                let responseResult = {};

                if (prescription && prescription.base64) {
                    const filePath = `/waInstance${ID_INSTANCE}/sendFileByUpload/${API_TOKEN}`;
                    const filePayload = {
                        chatId: TARGET_CHAT_ID,
                        fileName: prescription.name || 'Prescription.jpg',
                        caption: message,
                        file: prescription.base64
                    };
                    responseResult = await sendGreenApiRequest(filePath, filePayload);
                } else {
                    const msgPath = `/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`;
                    const msgPayload = {
                        chatId: TARGET_CHAT_ID,
                        message: message
                    };
                    responseResult = await sendGreenApiRequest(msgPath, msgPayload);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, greenApiResponse: responseResult }));

            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
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
