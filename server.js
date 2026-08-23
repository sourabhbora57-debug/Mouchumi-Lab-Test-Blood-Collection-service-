const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;

// Green API Credentials
const ID_INSTANCE = process.env.GREEN_API_ID || '710722713374';
const API_TOKEN = process.env.GREEN_API_TOKEN || 'ba66c849c53047ce98200faea718e7e9ff228978d1df4ad9aa';
const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID || '916000219209@c.us';

const HTML_PAGE = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'    <meta charset="UTF-8">\n' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n' +
'    <title>Mouchumi Lab Test Blood Collection Service - Golaghat</title>\n' +
'    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n' +
'    <style>\n' +
'        :root {\n' +
'            --bg-dark: #071521;\n' +
'            --card-dark: #0f2438;\n' +
'            --card-subtle: #132e47;\n' +
'            --input-bg: #091a2a;\n' +
'            --accent-blue: #0284c7;\n' +
'            --accent-cyan: #38bdf8;\n' +
'            --text-main: #f8fafc;\n' +
'            --text-muted: #94a3b8;\n' +
'            --border-color: #1e3d5f;\n' +
'            --green-active: #064e3b;\n' +
'            --green-border: #10b981;\n' +
'        }\n' +
'        * { box-sizing: border-box; margin: 0; padding: 0; font-family: "Plus Jakarta Sans", sans-serif; -webkit-tap-highlight-color: transparent; }\n' +
'        html, body { background-color: var(--bg-dark); color: var(--text-main); margin: 0; padding: 0; overflow-x: hidden; }\n' +
'        .app-container { max-width: 480px; margin: 0 auto; min-height: 100vh; background: var(--bg-dark); position: relative; display: flex; flex-direction: column; }\n' +
'        .top-nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }\n' +
'        .logo-box { display: flex; align-items: center; gap: 12px; }\n' +
'        .logo-icon { width: 42px; height: 42px; background: linear-gradient(135deg, #0284c7, #0d9488); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 12px rgba(2,132,199,0.3); }\n' +
'        .logo-text h3 { font-size: 14px; font-weight: 800; color: #fff; line-height: 1.2; }\n' +
'        .logo-text p { font-size: 11px; color: var(--accent-cyan); }\n' +
'        .notif-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--card-dark); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-muted); }\n' +
'        .view-section { padding: 16px 20px 10px; flex: 1; }\n' +
'        .badge-tag { color: var(--accent-cyan); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }\n' +
'        .hero-title { font-size: 28px; font-weight: 800; line-height: 1.15; margin-bottom: 8px; letter-spacing: -0.5px; }\n' +
'        .hero-title span { color: var(--accent-cyan); }\n' +
'        .hero-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 18px; }\n' +
'        .banner-card { background: linear-gradient(135deg, #0369a1 0%, #0f766e 100%); border-radius: 18px; padding: 18px; margin-bottom: 20px; position: relative; overflow: hidden; }\n' +
'        .banner-card::after { content: "💧"; position: absolute; right: -10px; bottom: -15px; font-size: 90px; opacity: 0.15; pointer-events: none; }\n' +
'        .banner-tag { font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #bae6fd; margin-bottom: 6px; }\n' +
'        .banner-card h3 { font-size: 17px; font-weight: 800; line-height: 1.3; margin-bottom: 4px; max-width: 85%; }\n' +
'        .banner-card p { font-size: 12px; color: #e0f2fe; margin-bottom: 12px; max-width: 80%; }\n' +
'        .banner-btn { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #0f172a; padding: 8px 14px; border-radius: 8px; font-weight: 700; font-size: 12px; border: none; cursor: pointer; }\n' +
'        .tests-main-container { background: #0c1d2e; border: 1px solid var(--border-color); border-radius: 18px; padding: 16px; margin-bottom: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }\n' +
'        .tests-header-area { margin-bottom: 12px; }\n' +
'        .tests-header-area h3 { font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 2px; }\n' +
'        .tests-header-area p { font-size: 12px; color: var(--text-muted); }\n' +
'        .test-search-wrapper { position: relative; margin-bottom: 14px; }\n' +
'        .test-search-wrapper input { width: 100%; padding: 13px 14px 13px 42px; background: var(--input-bg); border: 1.5px solid var(--accent-cyan); border-radius: 12px; color: #fff; font-size: 14px; outline: none; }\n' +
'        .test-search-wrapper input::placeholder { color: #64748b; }\n' +
'        .test-search-icon { position: absolute; left: 14px; top: 14px; color: var(--accent-cyan); }\n' +
'        .tests-scroll-view { max-height: 440px; overflow-y: auto; -webkit-overflow-scrolling: touch; padding-right: 4px; display: flex; flex-direction: column; gap: 10px; }\n' +
'        .tests-scroll-view::-webkit-scrollbar { width: 4px; }\n' +
'        .tests-scroll-view::-webkit-scrollbar-thumb { background: #1e3d5f; border-radius: 10px; }\n' +
'        .test-item-card { background: linear-gradient(145deg, #10263c 0%, #0d1f30 100%); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 14px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s ease; cursor: pointer; user-select: none; }\n' +
'        .test-item-card.selected { border-color: var(--accent-cyan); background: linear-gradient(145deg, #153856 0%, #0e2942 100%); box-shadow: 0 4px 15px rgba(2,132,199,0.2); }\n' +
'        .test-left-content { max-width: 68%; pointer-events: none; }\n' +
'        .test-title { font-size: 14px; font-weight: 700; color: #fff; line-height: 1.35; margin-bottom: 4px; }\n' +
'        .vial-pill { font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 4px; margin-top: 4px; }\n' +
'        .vial-violet { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }\n' +
'        .vial-red { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }\n' +
'        .vial-blue { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }\n' +
'        .vial-grey { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.4); }\n' +
'        .vial-black { background: rgba(15, 23, 42, 0.9); color: #e2e8f0; border: 1px solid #475569; }\n' +
'        .vial-green { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }\n' +
'        .vial-pkg { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.5); }\n' +
'        .vial-na { background: rgba(100, 116, 139, 0.15); color: #94a3b8; border: 1px solid #475569; }\n' +
'        .test-right-content { text-align: right; min-width: 80px; }\n' +
'        .test-cost { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 6px; pointer-events: none; }\n' +
'        .add-action-btn { background: #081726; border: 1px solid #1e3d5f; color: var(--accent-cyan); padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; width: 100%; transition: 0.2s; pointer-events: none; }\n' +
'        .add-action-btn.active-btn { background: var(--accent-cyan); color: #04121e; border-color: var(--accent-cyan); }\n' +
'        .booking-view { display: none; padding: 0 20px 30px; }\n' +
'        .nav-back-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; margin-bottom: 12px; }\n' +
'        .back-btn { background: none; border: none; color: #fff; font-size: 22px; cursor: pointer; }\n' +
'        .step-pill { background: #164e63; color: var(--accent-cyan); font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }\n' +
'        .selected-summary-card { background: var(--card-dark); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }\n' +
'        .form-group { margin-bottom: 16px; }\n' +
'        .form-group label { display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; }\n' +
'        .input-wrap { position: relative; }\n' +
'        .input-wrap input, .input-wrap textarea, .input-wrap select { width: 100%; padding: 14px 14px 14px 42px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; color: #fff; font-size: 14px; outline: none; }\n' +
'        .input-wrap .field-icon { position: absolute; left: 14px; top: 15px; color: var(--text-muted); }\n' +
'        .file-upload-box { border: 2px dashed var(--border-color); background: var(--input-bg); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; transition: 0.2s; position: relative; }\n' +
'        .file-upload-box:hover { border-color: var(--accent-cyan); }\n' +
'        .file-upload-box input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }\n' +
'        .upload-icon { font-size: 24px; margin-bottom: 4px; display: block; }\n' +
'        .upload-text { font-size: 13px; font-weight: 600; color: var(--accent-cyan); }\n' +
'        .upload-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }\n' +
'        .file-name-preview { font-size: 12px; color: #10b981; font-weight: 700; margin-top: 8px; word-break: break-all; display: none; }\n' +
'        .pills-group { display: flex; gap: 8px; margin-bottom: 12px; }\n' +
'        .pill-btn { flex: 1; padding: 12px 8px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-muted); font-size: 13px; font-weight: 600; text-align: center; cursor: pointer; }\n' +
'        .pill-btn.active { background: #38bdf8; color: #04121e; border-color: #38bdf8; font-weight: 700; }\n' +
'        .slot-card { display: flex; align-items: center; justify-content: space-between; padding: 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 8px; cursor: pointer; color: var(--text-muted); font-size: 14px; }\n' +
'        .slot-card.active { background: var(--green-active); border-color: var(--green-border); color: #fff; font-weight: 600; }\n' +
'        .main-submit-btn { width: 100%; padding: 16px; background: #0284c7; border: none; border-radius: 14px; color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(2,132,199,0.3); }\n' +
'        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: none; align-items: flex-end; justify-content: center; z-index: 1000; }\n' +
'        .modal-content { background: #0e2235; border: 1px solid var(--border-color); border-radius: 24px 24px 0 0; width: 100%; max-width: 480px; padding: 24px 20px; max-height: 85vh; overflow-y: auto; }\n' +
'        .modal-header { text-align: center; margin-bottom: 18px; }\n' +
'        .modal-brand { font-size: 14px; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }\n' +
'        .modal-header h3 { font-size: 18px; font-weight: 800; color: #fff; }\n' +
'        .modal-header p { font-size: 12px; color: var(--text-muted); margin-top: 4px; }\n' +
'        .review-box { background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 14px; padding: 16px; margin-bottom: 18px; }\n' +
'        .review-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; border-bottom: 1px dashed rgba(255,255,255,0.06); padding-bottom: 8px; }\n' +
'        .review-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }\n' +
'        .review-label { color: var(--text-muted); }\n' +
'        .review-val { font-weight: 700; color: #fff; text-align: right; max-width: 60%; }\n' +
'        .modal-btns { display: flex; gap: 10px; }\n' +
'        .edit-btn { flex: 1; padding: 14px; background: transparent; border: 1px solid var(--border-color); color: #fff; border-radius: 12px; font-weight: 700; cursor: pointer; }\n' +
'        .final-confirm-btn { flex: 2; padding: 14px; background: #10b981; border: none; color: #fff; border-radius: 12px; font-weight: 800; font-size: 14px; cursor: pointer; }\n' +
'        .success-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: none; align-items: center; justify-content: center; z-index: 1001; padding: 20px; }\n' +
'        .success-card { background: #0c1f31; border: 1px solid #10b981; border-radius: 20px; padding: 30px 20px; text-align: center; max-width: 400px; width: 100%; box-shadow: 0 10px 30px rgba(16,185,129,0.2); }\n' +
'        .success-icon { width: 65px; height: 65px; background: rgba(16,185,129,0.15); border: 2px solid #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 16px; color: #10b981; }\n' +
'        .floating-cart { position: fixed; bottom: 15px; left: 50%; transform: translateX(-50%); width: calc(100% - 40px); max-width: 440px; background: #0369a1; border-radius: 16px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 100; }\n' +
'        .cart-info h4 { font-size: 15px; font-weight: 800; color: #fff; }\n' +
'        .cart-info p { font-size: 12px; color: #bae6fd; }\n' +
'        .cart-next-btn { background: #fff; color: #0369a1; border: none; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; }\n' +
'        .wa-float { position: fixed; bottom: 85px; right: 20px; background: #22c55e; color: #fff; padding: 10px 16px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 6px 16px rgba(34,197,94,0.4); z-index: 99; }\n' +
'        .app-footer { background: #040d17; border-top: 2px solid var(--border-color); padding: 24px 20px 30px; text-align: center; margin-top: auto; }\n' +
'        .footer-brand { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }\n' +
'        .footer-tagline { font-size: 12px; color: var(--accent-cyan); margin-bottom: 16px; }\n' +
'        .footer-contact-box { background: #091a2a; border: 1px solid var(--border-color); border-radius: 14px; padding: 14px; margin-bottom: 16px; }\n' +
'        .contact-label { font-size: 11px; color: #cbd5e1; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }\n' +
'        .contact-links { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }\n' +
'        .phone-badge { color: #fff; text-decoration: none; font-size: 13px; font-weight: 800; background: #0284c7; padding: 8px 14px; border-radius: 10px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 10px rgba(2,132,199,0.3); }\n' +
'        .footer-social-links { display: flex; justify-content: center; gap: 12px; margin-bottom: 16px; }\n' +
'        .social-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 10px; font-size: 12px; font-weight: 700; text-decoration: none; color: #fff; }\n' +
'        .social-google { background: #1e3a5f; border: 1px solid #38bdf8; }\n' +
'        .social-fb { background: #1877f2; }\n' +
'        .copyright-text { font-size: 11px; color: #94a3b8; font-weight: 500; }\n' +
'    </style>\n' +
'</head>\n' +
'<body>\n' +
'    <div class="app-container">\n' +
'        <div>\n' +
'            <div class="top-nav">\n' +
'                <div class="logo-box">\n' +
'                    <div class="logo-icon">💧</div>\n' +
'                    <div class="logo-text">\n' +
'                        <h3>Mouchumi Lab Test Blood Collection service</h3>\n' +
'                        <p>Golaghat • At-home certified sample collection</p>\n' +
'                    </div>\n' +
'                </div>\n' +
'                <div class="notif-btn">🔔</div>\n' +
'            </div>\n' +
'            <div id="homeView" class="view-section">\n' +
'                <div class="badge-tag">YOUR HEALTH, HANDLED</div>\n' +
'                <h1 class="hero-title">The care you need, <br><span>right at home.</span></h1>\n' +
'                <p class="hero-desc">Safe, gentle sample collection from certified labs, whenever it suits you.</p>\n' +
'                <div class="banner-card">\n' +
'                    <div class="banner-tag">🏠 HOME COLLECTION</div>\n' +
'                    <h3>Reliable at-home sample collection in Golaghat.</h3>\n' +
'                    <p>Safe, gentle collection from a trusted local team.</p>\n' +
'                    <button class="banner-btn" onclick="focusSearch()">Select Tests ➔</button>\n' +
'                </div>\n' +
'                <div class="tests-main-container" id="testBoxContainer">\n' +
'                    <div class="tests-header-area">\n' +
'                        <h3>All 157 Tests & Packages</h3>\n' +
'                        <p>Find blood, urine, or organ health tests below</p>\n' +
'                    </div>\n' +
'                    <div class="test-search-wrapper">\n' +
'                        <span class="test-search-icon">🔍</span>\n' +
'                        <input type="text" id="searchInput" placeholder="Search test name (e.g. CBC, Full Body, Sugar)...">\n' +
'                    </div>\n' +
'                    <div class="tests-scroll-view" id="testsContainer"></div>\n' +
'                </div>\n' +
'            </div>\n' +
'            <div id="bookingView" class="booking-view">\n' +
'                <div class="nav-back-header">\n' +
'                    <button class="back-btn" onclick="showHomeView()">←</button>\n' +
'                    <h3 style="font-size: 17px; font-weight: 700;">Schedule a home visit</h3>\n' +
'                    <span class="step-pill">1</span>\n' +
'                </div>\n' +
'                <div class="selected-summary-card">\n' +
'                    <div style="display:flex; align-items:center; gap:10px;">\n' +
'                        <div style="font-size: 20px;">💧</div>\n' +
'                        <div>\n' +
'                            <div style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;">SELECTED TESTS</div>\n' +
'                            <div id="bookingSelectedSummary" style="font-size: 13px; font-weight: 700; max-width: 240px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">--</div>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div id="bookingTotalSummary" style="font-size: 16px; font-weight: 800; color: #38bdf8;">₹0</div>\n' +
'                </div>\n' +
'                <form id="scheduleForm">\n' +
'                    <div class="form-group">\n' +
'                        <label>Full name *</label>\n' +
'                        <div class="input-wrap">\n' +
'                            <span class="field-icon">👤</span>\n' +
'                            <input type="text" id="custName" required placeholder="Enter Patient Name">\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div style="display: flex; gap: 10px;" class="form-group">\n' +
'                        <div style="flex:1;">\n' +
'                            <label>Age *</label>\n' +
'                            <div class="input-wrap">\n' +
'                                <span class="field-icon">🎂</span>\n' +
'                                <input type="number" id="custAge" required placeholder="Age">\n' +
'                            </div>\n' +
'                        </div>\n' +
'                        <div style="flex:1;">\n' +
'                            <label>Sex *</label>\n' +
'                            <div class="input-wrap">\n' +
'                                <span class="field-icon">⚧</span>\n' +
'                                <select id="custSex" required style="padding-left: 36px;">\n' +
'                                    <option value="Male">Male</option>\n' +
'                                    <option value="Female">Female</option>\n' +
'                                    <option value="Other">Other</option>\n' +
'                                </select>\n' +
'                            </div>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div class="form-group">\n' +
'                        <label>Phone number *</label>\n' +
'                        <div class="input-wrap">\n' +
'                            <span class="field-icon">📞</span>\n' +
'                            <input type="tel" id="custPhone" required placeholder="WhatsApp / Phone number">\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div class="form-group">\n' +
'                        <label>Pickup address *</label>\n' +
'                        <div class="input-wrap">\n' +
'                            <span class="field-icon">📍</span>\n' +
'                            <textarea id="custAddress" rows="2" required placeholder="Flat, house no, street, locality"></textarea>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div class="form-group">\n' +
'                        <label>Report Delivery Preference</label>\n' +
'                        <div class="input-wrap">\n' +
'                            <span class="field-icon">🚚</span>\n' +
'                            <select id="custReportType" style="padding-left: 36px;">\n' +
'                                <option value="PDF Send WhatsApp">PDF Send WhatsApp</option>\n' +
'                                <option value="Hardcopy Send">Hardcopy Send</option>\n' +
'                                <option value="PDF & Hardcopy Both Send" selected>PDF & Hardcopy Both Send</option>\n' +
'                            </select>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div class="form-group">\n' +
'                        <label>Payment Mode *</label>\n' +
'                        <div class="input-wrap">\n' +
'                            <span class="field-icon">💳</span>\n' +
'                            <select id="custPaymentMode" required style="padding-left: 36px;">\n' +
'                                <option value="Not Paid">Not Paid</option>\n' +
'                                <option value="UPI">UPI</option>\n' +
'                                <option value="Cash">Cash</option>\n' +
'                            </select>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div class="form-group">\n' +
'                        <label>Collection Charge (₹)</label>\n' +
'                        <div class="input-wrap">\n' +
'                            <span class="field-icon">🛵</span>\n' +
'                            <input type="number" id="custCollectionCharge" value="100" min="0" placeholder="100" oninput="updateBookingSummary()">\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div class="form-group">\n' +
'                        <label>Doctor Referral (Optional)</label>\n' +
'                        <div class="input-wrap">\n' +
'                            <span class="field-icon">🩺</span>\n' +
'                            <input type="text" id="custDoctor" placeholder="Doctor or Clinic Name">\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div class="form-group">\n' +
'                        <label>Doctor Prescription (Optional)</label>\n' +
'                        <div class="file-upload-box">\n' +
'                            <input type="file" id="custPrescription" accept="image/*,application/pdf" onchange="handleFileChange(this)">\n' +
'                            <span class="upload-icon">📄</span>\n' +
'                            <span class="upload-text">Upload Prescription Photo/PDF</span>\n' +
'                            <div class="upload-sub">Supports JPG, PNG, PDF (Max 5MB)</div>\n' +
'                            <div id="filePreview" class="file-name-preview"></div>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div style="margin-top: 15px; margin-bottom: 8px;">\n' +
'                        <label style="font-weight: 700; color: #fff; font-size: 14px;">Choose a date</label>\n' +
'                        <div class="pills-group" style="margin-top: 8px;">\n' +
'                            <div class="pill-btn active" onclick="selectDate(this, \'Today\')">Today</div>\n' +
'                            <div class="pill-btn" onclick="selectDate(this, \'Tomorrow\')">Tomorrow</div>\n' +
'                            <div class="pill-btn" onclick="selectDate(this, \'Upcoming\')">Upcoming</div>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <div style="margin-bottom: 20px;">\n' +
'                        <label style="font-weight: 700; color: #fff; font-size: 14px; margin-bottom: 8px; display:block;">Choose a time</label>\n' +
'                        <div class="slot-card active" onclick="selectTime(this, \'7:00 – 9:00 AM\')">\n' +
'                            <span>🕒 7:00 – 9:00 AM (Fasting Preferred)</span>\n' +
'                            <span>✔</span>\n' +
'                        </div>\n' +
'                        <div class="slot-card" onclick="selectTime(this, \'9:00 – 11:00 AM\')">\n' +
'                            <span>🕒 9:00 – 11:00 AM</span>\n' +
'                            <span></span>\n' +
'                        </div>\n' +
'                        <div class="slot-card" onclick="selectTime(this, \'4:00 – 6:00 PM\')">\n' +
'                            <span>🕒 4:00 – 6:00 PM</span>\n' +
'                            <span></span>\n' +
'                        </div>\n' +
'                    </div>\n' +
'                    <button type="submit" class="main-submit-btn">Review Booking Details ➔</button>\n' +
'                </form>\n' +
'            </div>\n' +
'        </div>\n' +
'        <div id="reviewModal" class="modal-overlay">\n' +
'            <div class="modal-content">\n' +
'                <div class="modal-header">\n' +
'                    <div class="modal-brand">MOUCHUMI LAB TEST BLOOD COLLECTION SERVICE</div>\n' +
'                    <h3>📋 Review Booking Details</h3>\n' +
'                    <p>Please check your details before final submission</p>\n' +
'                </div>\n' +
'                <div class="review-box">\n' +
'                    <div class="review-row"><span class="review-label">Patient Name</span><span class="review-val" id="revName">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Age / Gender</span><span class="review-val" id="revAgeSex">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Phone</span><span class="review-val" id="revPhone">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Address</span><span class="review-val" id="revAddress">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Ref By Doctor</span><span class="review-val" id="revDoctor">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Report Delivery</span><span class="review-val" id="revReportType" style="color: #38bdf8;">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Payment Status</span><span class="review-val" id="revPayment" style="color: #38bdf8;">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Prescription</span><span class="review-val" id="revPrescription" style="color: #38bdf8;">None / Direct selection</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Date & Time</span><span class="review-val" id="revSchedule">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Selected Tests</span><span class="review-val" id="revTests" style="color: var(--accent-cyan);">--</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Tests Subtotal</span><span class="review-val" id="revTestCost">₹0</span></div>\n' +
'                    <div class="review-row"><span class="review-label">Collection Charge</span><span class="review-val" id="revCollectionCharge" style="color: #10b981;">₹100</span></div>\n' +
'                    <div class="review-row" style="margin-top: 6px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);"><span class="review-label" style="font-size: 15px; font-weight: 800; color: #fff;">Grand Total</span><span class="review-val" id="revTotal" style="font-size: 16px; font-weight: 800; color: #38bdf8;">₹0</span></div>\n' +
'                </div>\n' +
'                <div class="modal-btns">\n' +
'                    <button class="edit-btn" onclick="closeReviewModal()">Edit</button>\n' +
'                    <button class="final-confirm-btn" id="confirmFinalBtn" onclick="submitFinalBooking()">Confirm & Send</button>\n' +
'                </div>\n' +
'            </div>\n' +
'        </div>\n' +
'        <div id="successScreen" class="success-overlay">\n' +
'            <div class="success-card">\n' +
'                <div class="success-icon">✓</div>\n' +
'                <h3 style="font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 8px;">Booking Confirmed!</h3>\n' +
'                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">\n' +
'                    Thank you, <b id="successPatientName" style="color: #fff;"></b>! Your appointment request has been scheduled successfully.\n' +
'                </p>\n' +
'                <button onclick="dismissSuccess()" class="main-submit-btn" style="background: #10b981;">Back to Home</button>\n' +
'            </div>\n' +
'        </div>\n' +
'        <footer class="app-footer">\n' +
'            <div class="footer-brand">Mouchumi Lab Test Blood Collection service</div>\n' +
'            <div class="footer-tagline">Quality Diagnostic Care At Your Doorstep • Golaghat</div>\n' +
'            <div class="footer-contact-box">\n' +
'                <div class="contact-label">📞 Call / Helpline Numbers</div>\n' +
'                <div class="contact-links">\n' +
'                    <a href="tel:6000219209" class="phone-badge">📞 6000219209</a>\n' +
'                    <a href="tel:6900862973" class="phone-badge">📞 6900862973</a>\n' +
'                </div>\n' +
'            </div>\n' +
'            <div class="footer-social-links">\n' +
'                <a href="https://www.google.com/search?kgmid=%2Fg%2F11z3b65pfx" target="_blank" class="social-btn social-google">🌐 Google Listing</a>\n' +
'                <a href="https://www.facebook.com/share/1Bv1KmUsSt/" target="_blank" class="social-btn social-fb">📘 Facebook Page</a>\n' +
'            </div>\n' +
'            <div class="copyright-text">© 2026 Mouchumi Lab Test Blood Collection service. All rights reserved.</div>\n' +
'        </footer>\n' +
'        <div id="cartBar" class="floating-cart" style="display: none;">\n' +
'            <div class="cart-info"><h4 id="cartTotalText">₹0</h4><p id="cartItemsText">0 tests selected</p></div>\n' +
'            <button class="cart-next-btn" onclick="goToBooking()">Schedule Visit ➔</button>\n' +
'        </div>\n' +
'        <a href="https://wa.me/916000219209" target="_blank" class="wa-float"><span>💬</span> Chat</a>\n' +
'    </div>\n' +
'    <script>\n' +
'        const ALL_TESTS = [\n' +
'            { id: 0, name: "FULL BODY CHECKUP PACKAGE", price: 4000, vial: "RED, VIOLET, GREY, BLACK, URINE" },\n' +
'            { id: 1, name: "ABO, Rh GROUPING", price: 100, vial: "VIOLET" },\n' +
'            { id: 2, name: "ABSOLUTE EOSINOPHIL COUNT", price: 150, vial: "VIOLET" },\n' +
'            { id: 3, name: "ABSOLUTE LYMPHOCYTE COUNT", price: 150, vial: "VIOLET" },\n' +
'            { id: 4, name: "ABSOLUTE MONOCYTE COUNT", price: 150, vial: "VIOLET" },\n' +
'            { id: 5, name: "ABSOLUTE NEUTROPHIL COUNT", price: 150, vial: "VIOLET" },\n' +
'            { id: 6, name: "ADA - TBM", price: 750, vial: "RED" },\n' +
'            { id: 7, name: "Albumin", price: 100, vial: "RED" },\n' +
'            { id: 8, name: "Allergy Profile", price: 1200, vial: "VIOLET & RED" },\n' +
'            { id: 9, name: "ΑΜΗ", price: 2300, vial: "RED" },\n' +
'            { id: 10, name: "ΑΜМОNIA", price: 1000, vial: "VIOLET" },\n' +
'            { id: 11, name: "ANTENATAL CHECK UP (ANC)", price: 2900, vial: "GREY, VIOLET & RED" },\n' +
'            { id: 12, name: "ANTI CCP", price: 1600, vial: "RED" },\n' +
'            { id: 13, name: "ANTI TPO", price: 2000, vial: "RED" },\n' +
'            { id: 14, name: "ANTINUCLEAR ANTI BODY (ΑΝΑ)", price: 1000, vial: "RED" },\n' +
'            { id: 15, name: "ANTINUCLEAR ANTI BODY Reflex (ANA Profile)", price: 4000, vial: "RED" },\n' +
'            { id: 16, name: "APTT", price: 500, vial: "BLUE" },\n' +
'            { id: 17, name: "ASO titre (By Immunoturbidity)", price: 500, vial: "RED" },\n' +
'            { id: 18, name: "BAND CELL", price: 150, vial: "VIOLET" },\n' +
'            { id: 19, name: "Beta HCG, Serum", price: 900, vial: "RED" },\n' +
'            { id: 20, name: "BIOPSY- Small Tissue", price: 800, vial: "NA" },\n' +
'            { id: 21, name: "BIOPSY- Medium Tissue", price: 1000, vial: "NA" },\n' +
'            { id: 22, name: "BIOPSY- Large Tissue", price: 1200, vial: "NA" },\n' +
'            { id: 23, name: "BIOPSY- Extra Large Tissue", price: 2000, vial: "NA" },\n' +
'            { id: 24, name: "BLEEDING TIME/CLOTTING TIME (BT/CT)", price: 50, vial: "NA" },\n' +
'            { id: 25, name: "BLOOD UREA", price: 200, vial: "RED" },\n' +
'            { id: 26, name: "BUN", price: 150, vial: "RED" },\n' +
'            { id: 27, name: "CPK MB", price: 1350, vial: "RED" },\n' +
'            { id: 28, name: "CRP (TITRE) immunoturbidity", price: 450, vial: "RED" },\n' +
'            { id: 29, name: "CA 125", price: 1600, vial: "RED" },\n' +
'            { id: 30, name: "CBC [VIOLET]", price: 400, vial: "VIOLET" },\n' +
'            { id: 31, name: "CHOLESTEROL TOTAL", price: 200, vial: "RED" },\n' +
'            { id: 32, name: "COAGULATION PROFILE", price: 1200, vial: "BLUE" },\n' +
'            { id: 33, name: "CSF ANALYSIS", price: 550, vial: "NA" },\n' +
'            { id: 34, name: "DENGUE, Serology Test", price: 900, vial: "RED" },\n' +
'            { id: 35, name: "DIABETIC PROFILE", price: 2500, vial: "GREY, VIOLET" },\n' +
'            { id: 36, name: "Differential Leucocyte Count (D.L.C)", price: 150, vial: "VIOLET" },\n' +
'            { id: 37, name: "DIRECT COOMBS TEST", price: 250, vial: "RED" },\n' +
'            { id: 38, name: "DIRECT/INDIRECT BILIRUBIN", price: 150, vial: "RED" },\n' +
'            { id: 39, name: "eGFR", price: 500, vial: "RED" },\n' +
'            { id: 40, name: "ELECTROLYTE 3 (THREE) PARAMETERS", price: 600, vial: "RED" },\n' +
'            { id: 41, name: "ESR", price: 100, vial: "BLACK" },\n' +
'            { id: 42, name: "FASTING PLASMA GLUCOSE (FBS)", price: 50, vial: "GREY" },\n' +
'            { id: 43, name: "FERRITIN", price: 1000, vial: "RED" },\n' +
'            { id: 44, name: "FERTILITY PROFILE", price: 1500, vial: "RED" },\n' +
'            { id: 45, name: "FERTILITY PROFILE (MALE)", price: 2400, vial: "RED" },\n' +
'            { id: 46, name: "FSH", price: 650, vial: "RED" },\n' +
'            { id: 47, name: "FT3", price: 600, vial: "RED" },\n' +
'            { id: 48, name: "FT4", price: 600, vial: "RED" },\n' +
'            { id: 49, name: "FUNGAL SMEAR", price: 250, vial: "NA" },\n' +
'            { id: 50, name: "G6PD", price: 600, vial: "VIOLET" },\n' +
'            { id: 51, name: "GAMMA G. T. (GGT)", price: 400, vial: "RED" },\n' +
'            { id: 52, name: "GCT WITH 75 GM GLUCOSE", price: 150, vial: "GREY" },\n' +
'            { id: 53, name: "GLUCOSE TOLERENCE TEST", price: 400, vial: "GREY" },\n' +
'            { id: 54, name: "GRAM STAIN", price: 150, vial: "VIOLET" },\n' +
'            { id: 55, name: "HDL CHOLESTEROL", price: 350, vial: "RED" },\n' +
'            { id: 56, name: "HAEMOGLOBIN (Hb)", price: 100, vial: "VIOLET" },\n' +
'            { id: 57, name: "Hb TYPING", price: 1400, vial: "VIOLET" },\n' +
'            { id: 58, name: "HbA1C", price: 600, vial: "VIOLET" },\n' +
'            { id: 59, name: "HEPATITIS A/HAV (SCREENING)", price: 600, vial: "RED" },\n' +
'            { id: 60, name: "HEPATITIS B SURFACE AG (HBsAg)", price: 400, vial: "RED" },\n' +
'            { id: 61, name: "HEPATITIS C (SCREENING)", price: 400, vial: "RED" },\n' +
'            { id: 62, name: "HEPATITIS E (SCREENING)", price: 600, vial: "RED" },\n' +
'            { id: 63, name: "HEPATITIS PANEL", price: 3500, vial: "RED" },\n' +
'            { id: 64, name: "HIV (I & II) SCREENING", price: 350, vial: "RED" },\n' +
'            { id: 65, name: "IMMATURE CELL", price: 150, vial: "VIOLET" },\n' +
'            { id: 66, name: "INDIRECT COOMBS TEST", price: 1100, vial: "RED" },\n' +
'            { id: 67, name: "IRON", price: 500, vial: "RED" },\n' +
'            { id: 68, name: "IRON & TIBC", price: 750, vial: "RED" },\n' +
'            { id: 69, name: "IRON & UIBC", price: 750, vial: "RED" },\n' +
'            { id: 70, name: "IRON PROFILE", price: 1500, vial: "RED" },\n' +
'            { id: 71, name: "KFT (WITH 3 PARA ELECTROLYTE)", price: 1100, vial: "RED" },\n' +
'            { id: 72, name: "KOH TEST FOR SKIN & NAILS", price: 300, vial: "NA" },\n' +
'            { id: 73, name: "LDH", price: 650, vial: "RED" },\n' +
'            { id: 74, name: "Leptospira (IgM/IgG)", price: 600, vial: "RED" },\n' +
'            { id: 75, name: "LH", price: 650, vial: "RED" },\n' +
'            { id: 76, name: "LIPASE", price: 500, vial: "RED" },\n' +
'            { id: 77, name: "LIPID PROFILE", price: 800, vial: "RED" },\n' +
'            { id: 78, name: "LIVER FUNCTION TEST (LFT)", price: 800, vial: "RED" },\n' +
'            { id: 79, name: "M.P. By Slide Method / PBF FOR MP", price: 250, vial: "VIOLET" },\n' +
'            { id: 80, name: "MALARIA PF/PV CARD RAPID TEST", price: 250, vial: "VIOLET" },\n' +
'            { id: 81, name: "MALIGNANT CELL", price: 550, vial: "VIOLET" },\n' +
'            { id: 82, name: "MICROALBUMIN, Spot Urine", price: 600, vial: "NA" },\n' +
'            { id: 83, name: "NT PRO BNP", price: 1750, vial: "RED" },\n' +
'            { id: 84, name: "PBS FOR CELL MORPHOLOGY", price: 250, vial: "VIOLET" },\n' +
'            { id: 85, name: "PLATELET COUNT", price: 100, vial: "VIOLET" },\n' +
'            { id: 86, name: "PLEURAL FLUID ANALYSIS: PHYSICAL, CHEMICAL AND MICROSCOPIC", price: 850, vial: "PF" },\n' +
'            { id: 87, name: "PLEURAL FLUID ANALYSIS: CYTOLOGICAL", price: 500, vial: "PF" },\n' +
'            { id: 88, name: "PLEURAL FLUID ANALYSIS: ADA", price: 650, vial: "PF" },\n' +
'            { id: 89, name: "PLEURAL FLUID ANALYSIS: LH", price: 400, vial: "PF" },\n' +
'            { id: 90, name: "POST PRANDIAL PLASMA GLUCOSE (PPBS)", price: 50, vial: "GREY" },\n' +
'            { id: 91, name: "PROLACTIN", price: 900, vial: "RED" },\n' +
'            { id: 92, name: "PROTHROMBIN TIME (PT INR)", price: 400, vial: "BLUE" },\n' +
'            { id: 93, name: "PSA", price: 1050, vial: "RED" },\n' +
'            { id: 94, name: "QUANTI FERON", price: 1800, vial: "GREEN" },\n' +
'            { id: 95, name: "QUANTITATIVE HBsAg", price: 600, vial: "RED" },\n' +
'            { id: 96, name: "QUANTITATIVE HCV", price: 600, vial: "RED" },\n' +
'            { id: 97, name: "QUANTITATIVE HIV", price: 600, vial: "RED" },\n' +
'            { id: 98, name: "R.A FACTOR", price: 250, vial: "RED" },\n' +
'            { id: 99, name: "RANDOM PLASMA GLUCOSE (RBS)", price: 100, vial: "GREY" },\n' +
'            { id: 100, name: "RETICULOCYTE COUNT", price: 300, vial: "VIOLET" },\n' +
'            { id: 101, name: "Rh ANTIBODY TITRE", price: 650, vial: "VIOLET" },\n' +
'            { id: 102, name: "ROUTINE EXAM.OF BLOOD", price: 300, vial: "VIOLET" },\n' +
'            { id: 103, name: "Scrub typhus (IgM/IgG)", price: 500, vial: "RED" },\n' +
'            { id: 104, name: "SGOT/AST", price: 150, vial: "RED" },\n' +
'            { id: 105, name: "SGPT/ALT", price: 150, vial: "RED" },\n' +
'            { id: 106, name: "SEMEN ANALYSIS", price: 500, vial: "NA" },\n' +
'            { id: 107, name: "Sepsis Screen", price: 800, vial: "VIOLET & RED" },\n' +
'            { id: 108, name: "SERUM ALK. PHOSPHATASE", price: 200, vial: "RED" },\n' +
'            { id: 109, name: "SERUM AMYLASE", price: 450, vial: "RED" },\n' +
'            { id: 110, name: "SERUM BILIRUBIN, TOTAL", price: 150, vial: "RED" },\n' +
'            { id: 111, name: "SERUM CALCIUM", price: 250, vial: "RED" },\n' +
'            { id: 112, name: "SERUM C-PEPTIDE", price: 1000, vial: "RED" },\n' +
'            { id: 113, name: "SERUM CHLORIDE", price: 250, vial: "RED" },\n' +
'            { id: 114, name: "SERUM CREATININE", price: 200, vial: "RED" },\n' +
'            { id: 115, name: "SERUM IgE", price: 900, vial: "RED" },\n' +
'            { id: 116, name: "SERUM MAGNESIUM", price: 500, vial: "RED" },\n' +
'            { id: 117, name: "SERUM PHOSPHATE", price: 350, vial: "RED" },\n' +
'            { id: 118, name: "SERUM PHOSPHORUS", price: 500, vial: "RED" },\n' +
'            { id: 119, name: "SERUM POTASSIUM (K)", price: 250, vial: "RED" },\n' +
'            { id: 120, name: "SERUM SODIUM (Na)", price: 250, vial: "RED" },\n' +
'            { id: 121, name: "SPUTUM AFB (Z.N. STAIN)", price: 250, vial: "NA" },\n' +
'            { id: 122, name: "Sputum AFB Culture", price: 1100, vial: "NA" },\n' +
'            { id: 123, name: "STOOL for Culture and Sensitivity", price: 600, vial: "NA" },\n' +
'            { id: 124, name: "STOOL FOR OCCULT BLOOD", price: 150, vial: "NA" },\n' +
'            { id: 125, name: "STOOL RE", price: 150, vial: "NA" },\n' +
'            { id: 126, name: "T3", price: 400, vial: "RED" },\n' +
'            { id: 127, name: "T4", price: 400, vial: "RED" },\n' +
'            { id: 128, name: "TESTOSTEORNE-FREE", price: 2600, vial: "RED" },\n' +
'            { id: 129, name: "TESTOSTERONE - TOTAL", price: 900, vial: "RED" },\n' +
'            { id: 130, name: "THYROID PROFILE, TOTAL", price: 700, vial: "RED" },\n' +
'            { id: 131, name: "TORCH PANEL (10 PROFILE)", price: 3000, vial: "RED" },\n' +
'            { id: 132, name: "TOTAL PROTEIN & FRACTION", price: 300, vial: "RED" },\n' +
'            { id: 133, name: "TOTAL R B C COUNT", price: 100, vial: "VIOLET" },\n' +
'            { id: 134, name: "TOTAL W B C COUNT (TC)", price: 100, vial: "VIOLET" },\n' +
'            { id: 135, name: "TOXO TEST (IgM & IgG)", price: 1500, vial: "RED" },\n' +
'            { id: 136, name: "TRIGLYCERIDE", price: 250, vial: "RED" },\n' +
'            { id: 137, name: "TROPONIN I TEST", price: 1250, vial: "RED" },\n' +
'            { id: 138, name: "TROPONIN T TEST", price: 1300, vial: "RED" },\n' +
'            { id: 139, name: "TSH", price: 400, vial: "RED" },\n' +
'            { id: 140, name: "TYPHIDOT", price: 350, vial: "RED" },\n' +
'            { id: 141, name: "URIC ACID", price: 200, vial: "RED" },\n' +
'            { id: 142, name: "Urine Albumin", price: 100, vial: "NA" },\n' +
'            { id: 143, name: "URINE CULTURE", price: 350, vial: "NA" },\n' +
'            { id: 144, name: "URINE FOR ACR", price: 600, vial: "NA" },\n' +
'            { id: 145, name: "URINE PREGNANCY TEST / beta HCG", price: 150, vial: "NA" },\n' +
'            { id: 146, name: "URINE PROTEIN 24 HOURS", price: 350, vial: "NA" },\n' +
'            { id: 147, name: "URINE R.E.", price: 150, vial: "NA" },\n' +
'            { id: 148, name: "Urine Sugar", price: 100, vial: "NA" },\n' +
'            { id: 149, name: "VDRL KIT", price: 400, vial: "RED" },\n' +
'            { id: 150, name: "Vitamin A", price: 4000, vial: "RED" },\n' +
'            { id: 151, name: "Vitamin B12", price: 1500, vial: "RED" },\n' +
'            { id: 152, name: "Vitamin C", price: 3500, vial: "RED" },\n' +
'            { id: 153, name: "VITAMIN D", price: 1700, vial: "RED" },\n' +
'            { id: 154, name: "Vitamin E", price: 2500, vial: "RED" },\n' +
'            { id: 155, name: "Vitamin K", price: 4500, vial: "RED" },\n' +
'            { id: 156, name: "WIDAL TEST", price: 250, vial: "RED" }\n' +
'        ];\n' +
'        let selectedTests = [];\n' +
'        let selectedDateType = "Today";\n' +
'        let selectedSlot = "7:00 – 9:00 AM";\n' +
'        let pendingPayload = null;\n' +
'        let prescriptionFile = null;\n' +
'        function formatDateString(type) {\n' +
'            const now = new Date();\n' +
'            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];\n' +
'            if (type === "Today") {\n' +
'                return "Today (" + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + ")";\n' +
'            } else if (type === "Tomorrow") {\n' +
'                const tmrw = new Date(now);\n' +
'                tmrw.setDate(tmrw.getDate() + 1);\n' +
'                return "Tomorrow (" + tmrw.getDate() + " " + months[tmrw.getMonth()] + " " + tmrw.getFullYear() + ")";\n' +
'            } else {\n' +
'                return "Upcoming Date";\n' +
'            }\n' +
'        }\n' +
'        function getCollectionCharge() {\n' +
'            const val = document.getElementById("custCollectionCharge");\n' +
'            if (!val || val.value === "") return 100;\n' +
'            const parsed = parseFloat(val.value);\n' +
'            return isNaN(parsed) ? 0 : parsed;\n' +
'        }\n' +
'        function getVialClass(vial) {\n' +
'            vial = vial.toUpperCase();\n' +
'            if (vial.includes("URINE") || (vial.includes("RED") && vial.includes("VIOLET") && vial.includes("GREY"))) return "vial-pkg";\n' +
'            if (vial.includes("VIOLET")) return "vial-violet";\n' +
'            if (vial.includes("RED")) return "vial-red";\n' +
'            if (vial.includes("BLUE")) return "vial-blue";\n' +
'            if (vial.includes("GREY")) return "vial-grey";\n' +
'            if (vial.includes("BLACK")) return "vial-black";\n' +
'            if (vial.includes("GREEN")) return "vial-green";\n' +
'            return "vial-na";\n' +
'        }\n' +
'        function renderTests(tests) {\n' +
'            const container = document.getElementById("testsContainer");\n' +
'            container.innerHTML = "";\n' +
'            if (tests.length === 0) {\n' +
'                container.innerHTML = \'<div style="text-align:center; padding:30px 10px; color:#94a3b8; font-size:14px;">No test found matching your search.</div>\';\n' +
'                return;\n' +
'            }\n' +
'            tests.forEach(test => {\n' +
'                const isSelected = selectedTests.some(t => t.id === test.id);\n' +
'                const vialCls = getVialClass(test.vial);\n' +
'                const card = document.createElement("div");\n' +
'                card.id = "test-card-" + test.id;\n' +
'                card.className = "test-item-card" + (isSelected ? " selected" : "");\n' +
'                card.setAttribute("onmousedown", "event.preventDefault()");\n' +
'                card.onclick = function(e) {\n' +
'                    e.preventDefault();\n' +
'                    toggleTest(test.id);\n' +
'                };\n' +
'                card.innerHTML = \'<div class="test-left-content"><div class="test-title">\' + test.name + \'</div><span class="vial-pill \' + vialCls + \'">● \' + test.vial + \'</span></div><div class="test-right-content"><div class="test-cost">₹\' + test.price + \'</div><button type="button" class="add-action-btn \' + (isSelected ? "active-btn" : "") + \'" id="btn-test-\' + test.id + \'">\' + (isSelected ? "Added ✓" : "+ Add") + \'</button></div>\';\n' +
'                container.appendChild(card);\n' +
'            });\n' +
'        }\n' +
'        function toggleTest(id) {\n' +
'            const test = ALL_TESTS.find(t => t.id === id);\n' +
'            const index = selectedTests.findIndex(t => t.id === id);\n' +
'            let isNowSelected = false;\n' +
'            if (index > -1) {\n' +
'                selectedTests.splice(index, 1);\n' +
'                isNowSelected = false;\n' +
'            } else {\n' +
'                selectedTests.push(test);\n' +
'                isNowSelected = true;\n' +
'            }\n' +
'            const card = document.getElementById("test-card-" + id);\n' +
'            const btn = document.getElementById("btn-test-" + id);\n' +
'            if (card && btn) {\n' +
'                if (isNowSelected) {\n' +
'                    card.classList.add("selected");\n' +
'                    btn.classList.add("active-btn");\n' +
'                    btn.innerText = "Added ✓";\n' +
'                } else {\n' +
'                    card.classList.remove("selected");\n' +
'                    btn.classList.remove("active-btn");\n' +
'                    btn.innerText = "+ Add";\n' +
'                }\n' +
'            }\n' +
'            updateCart();\n' +
'            const searchInput = document.getElementById("searchInput");\n' +
'            if (document.activeElement === searchInput || searchInput.value.length > 0) {\n' +
'                searchInput.focus();\n' +
'            }\n' +
'        }\n' +
'        function updateCart() {\n' +
'            const cartBar = document.getElementById("cartBar");\n' +
'            const testCost = selectedTests.reduce((sum, t) => sum + t.price, 0);\n' +
'            const charge = getCollectionCharge();\n' +
'            const grandTotal = selectedTests.length > 0 ? (testCost + charge) : 0;\n' +
'            if (selectedTests.length > 0) {\n' +
'                cartBar.style.display = "flex";\n' +
'                document.getElementById("cartTotalText").innerText = "₹" + grandTotal;\n' +
'                document.getElementById("cartItemsText").innerText = selectedTests.length + " test" + (selectedTests.length > 1 ? "s" : "") + " (+₹" + charge + " Coll.)";\n' +
'            } else {\n' +
'                cartBar.style.display = "none";\n' +
'            }\n' +
'        }\n' +
'        function updateBookingSummary() {\n' +
'            const testCost = selectedTests.reduce((sum, t) => sum + t.price, 0);\n' +
'            const charge = getCollectionCharge();\n' +
'            const grandTotal = testCost + charge;\n' +
'            document.getElementById("bookingTotalSummary").innerText = "₹" + grandTotal;\n' +
'            updateCart();\n' +
'        }\n' +
'        function applyFilter() {\n' +
'            const val = document.getElementById("searchInput").value.trim().toLowerCase();\n' +
'            let filtered = ALL_TESTS;\n' +
'            if (val) {\n' +
'                filtered = ALL_TESTS.filter(t => t.name.toLowerCase().includes(val) || t.vial.toLowerCase().includes(val));\n' +
'            }\n' +
'            renderTests(filtered);\n' +
'        }\n' +
'        document.getElementById("searchInput").addEventListener("input", applyFilter);\n' +
'        function focusSearch() {\n' +
'            document.getElementById("testBoxContainer").scrollIntoView({ behavior: "smooth" });\n' +
'            document.getElementById("searchInput").focus();\n' +
'        }\n' +
'        function goToBooking() {\n' +
'            if (selectedTests.length === 0) return;\n' +
'            document.getElementById("homeView").style.display = "none";\n' +
'            document.getElementById("bookingView").style.display = "block";\n' +
'            document.getElementById("cartBar").style.display = "none";\n' +
'            document.getElementById("bookingSelectedSummary").innerText = selectedTests.map(t => t.name).join(", ");\n' +
'            updateBookingSummary();\n' +
'            window.scrollTo(0,0);\n' +
'        }\n' +
'        function showHomeView() {\n' +
'            document.getElementById("bookingView").style.display = "none";\n' +
'            document.getElementById("homeView").style.display = "block";\n' +
'            updateCart();\n' +
'        }\n' +
'        function selectDate(elem, val) {\n' +
'            document.querySelectorAll(".pill-btn").forEach(p => p.classList.remove("active"));\n' +
'            elem.classList.add("active");\n' +
'            selectedDateType = val;\n' +
'        }\n' +
'        function selectTime(elem, slot) {\n' +
'            document.querySelectorAll(".slot-card").forEach(s => {\n' +
'                s.classList.remove("active");\n' +
'                s.querySelector("span:last-child").innerText = "";\n' +
'            });\n' +
'            elem.classList.add("active");\n' +
'            elem.querySelector("span:last-child").innerText = "✔";\n' +
'            selectedSlot = slot;\n' +
'        }\n' +
'        function handleFileChange(input) {\n' +
'            const file = input.files[0];\n' +
'            const preview = document.getElementById("filePreview");\n' +
'            if (file) {\n' +
'                if (file.size > 5 * 1024 * 1024) {\n' +
'                    alert("File size exceeds 5MB limit. Please choose a smaller file.");\n' +
'                    input.value = "";\n' +
'                    prescriptionFile = null;\n' +
'                    preview.style.display = "none";\n' +
'                    return;\n' +
'                }\n' +
'                const reader = new FileReader();\n' +
'                reader.onload = function(e) {\n' +
'                    prescriptionFile = { name: file.name, type: file.type, base64: e.target.result.split(",")[1] };\n' +
'                    preview.innerText = "📎 " + file.name;\n' +
'                    preview.style.display = "block";\n' +
'                };\n' +
'                reader.readAsDataURL(file);\n' +
'            } else {\n' +
'                prescriptionFile = null;\n' +
'                preview.style.display = "none";\n' +
'            }\n' +
'        }\n' +
'        document.getElementById("scheduleForm").addEventListener("submit", function(e) {\n' +
'            e.preventDefault();\n' +
'            const testCost = selectedTests.reduce((sum, t) => sum + t.price, 0);\n' +
'            const charge = getCollectionCharge();\n' +
'            const total = testCost + charge;\n' +
'            const formattedTests = selectedTests.map((t, idx) => "  " + (idx + 1) + ". " + t.name + " (" + t.vial + ") - ₹" + t.price);\n' +
'            const fullDateString = formatDateString(selectedDateType);\n' +
'            const paymentMode = document.getElementById("custPaymentMode").value;\n' +
'            const reportType = document.getElementById("custReportType").value;\n' +
'            pendingPayload = {\n' +
'                patientName: document.getElementById("custName").value,\n' +
'                age: document.getElementById("custAge").value,\n' +
'                sex: document.getElementById("custSex").value,\n' +
'                phone: document.getElementById("custPhone").value,\n' +
'                address: document.getElementById("custAddress").value,\n' +
'                referredBy: document.getElementById("custDoctor").value || "Self",\n' +
'                paymentMode: paymentMode,\n' +
'                reportType: reportType,\n' +
'                date: fullDateString,\n' +
'                timeSlot: selectedSlot,\n' +
'                testCount: selectedTests.length,\n' +
'                testsList: formattedTests.join("\\n"),\n' +
'                testCost: testCost,\n' +
'                collectionCharge: charge,\n' +
'                grandTotal: total,\n' +
'                prescription: prescriptionFile\n' +
'            };\n' +
'            document.getElementById("revName").innerText = pendingPayload.patientName;\n' +
'            document.getElementById("revAgeSex").innerText = pendingPayload.age + " Y / " + pendingPayload.sex;\n' +
'            document.getElementById("revPhone").innerText = pendingPayload.phone;\n' +
'            document.getElementById("revAddress").innerText = pendingPayload.address;\n' +
'            document.getElementById("revDoctor").innerText = pendingPayload.referredBy;\n' +
'            document.getElementById("revReportType").innerText = pendingPayload.reportType;\n' +
'            document.getElementById("revPayment").innerText = pendingPayload.paymentMode;\n' +
'            document.getElementById("revPrescription").innerText = prescriptionFile ? prescriptionFile.name : "None / Direct selection";\n' +
'            document.getElementById("revSchedule").innerText = pendingPayload.date + ", " + pendingPayload.timeSlot;\n' +
'            document.getElementById("revTests").innerText = selectedTests.map(t => t.name).join(", ");\n' +
'            document.getElementById("revTestCost").innerText = "₹" + testCost;\n' +
'            document.getElementById("revCollectionCharge").innerText = "₹" + charge;\n' +
'            document.getElementById("revTotal").innerText = "₹" + total;\n' +
'            document.getElementById("reviewModal").style.display = "flex";\n' +
'        });\n' +
'        function closeReviewModal() {\n' +
'            document.getElementById("reviewModal").style.display = "none";\n' +
'        }\n' +
'        async function submitFinalBooking() {\n' +
'            if (!pendingPayload) return;\n' +
'            const btn = document.getElementById("confirmFinalBtn");\n' +
'            btn.disabled = true;\n' +
'            btn.innerText = "Sending Booking...";\n' +
'            try {\n' +
'                const response = await fetch("/send-booking", {\n' +
'                    method: "POST",\n' +
'                    headers: { "Content-Type": "application/json" },\n' +
'                    body: JSON.stringify(pendingPayload)\n' +
'                });\n' +
'                const resData = await response.json();\n' +
'                if (resData.success) {\n' +
'                    closeReviewModal();\n' +
'                    document.getElementById("successPatientName").innerText = pendingPayload.patientName;\n' +
'                    document.getElementById("successScreen").style.display = "flex";\n' +
'                } else {\n' +
'                    alert("Submission failed: " + (resData.error || "Unknown error"));\n' +
'                }\n' +
'            } catch (err) {\n' +
'                alert("Network error. Check your connection.");\n' +
'            } finally {\n' +
'                btn.disabled = false;\n' +
'                btn.innerText = "Confirm & Send";\n' +
'            }\n' +
'        }\n' +
'        function dismissSuccess() {\n' +
'            document.getElementById("successScreen").style.display = "none";\n' +
'            selectedTests = [];\n' +
'            prescriptionFile = null;\n' +
'            document.getElementById("filePreview").style.display = "none";\n' +
'            document.getElementById("scheduleForm").reset();\n' +
'            document.getElementById("custCollectionCharge").value = "100";\n' +
'            showHomeView();\n' +
'            applyFilter();\n' +
'        }\n' +
'        renderTests(ALL_TESTS);\n' +
'    </script>\n' +
'</body>\n' +
'</html>';

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

function sendGreenApiFile(chatId, fileName, base64Data) {
    return new Promise((resolve, reject) => {
        const fileBuffer = Buffer.from(base64Data, 'base64');
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
        const safeFileName = (fileName || 'prescription.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
        
        let header = '--' + boundary + '\r\n';
        header += 'Content-Disposition: form-data; name="chatId"\r\n\r\n' + chatId + '\r\n';
        header += '--' + boundary + '\r\n';
        header += 'Content-Disposition: form-data; name="file"; filename="' + safeFileName + '"\r\n';
        header += 'Content-Type: application/octet-stream\r\n\r\n';
        
        const footer = '\r\n--' + boundary + '--\r\n';
        
        const headerBuf = Buffer.from(header, 'utf8');
        const footerBuf = Buffer.from(footer, 'utf8');
        const totalPayload = Buffer.concat([headerBuf, fileBuffer, footerBuf]);

        const options = {
            hostname: 'api.green-api.com',
            path: '/waInstance' + ID_INSTANCE + '/sendFileByUpload/' + API_TOKEN,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=' + boundary,
                'Content-Length': totalPayload.length
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
        apiReq.write(totalPayload);
        apiReq.end();
    });
}

const server = http.createServer((req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Favicon ignore to avoid 404 logs
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Clean URL path handling (handles parameters like /?ref=app)
    const urlPath = req.url.split('?')[0];

    // Health check endpoint for Render
    if (urlPath === '/healthz') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
        return;
    }

    // Home Page Route
    if (req.method === 'GET' && (urlPath === '/' || urlPath === '/index.html')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(HTML_PAGE);
        return;
    }

    // API Booking Route
    if (req.method === 'POST' && urlPath === '/send-booking') {
        const chunks = [];
        let totalSize = 0;
        const MAX_SIZE = 10 * 1024 * 1024;

        req.on('data', chunk => {
            totalSize += chunk.length;
            if (totalSize > MAX_SIZE) {
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });

        req.on('end', async () => {
            try {
                const rawBody = Buffer.concat(chunks).toString('utf8');
                const data = JSON.parse(rawBody);
                const { 
                    patientName, age, sex, phone, address, referredBy, 
                    paymentMode, reportType, testCount, testsList, testCost, 
                    collectionCharge, grandTotal, date, timeSlot, prescription 
                } = data;

                const message = 
                    '🧪 *NEW LAB BOOKING RECEIVED*\n' +
                    '━━━━━━━━━━━━━━━━━━━━━\n' +
                    '👤 *Patient:* ' + (patientName || 'N/A') + ' (' + (age || '') + ' Y, ' + (sex || '') + ')\n' +
                    '📞 *Phone:* ' + (phone || 'N/A') + '\n' +
                    '📍 *Address:* ' + (address || 'N/A') + '\n' +
                    '📅 *Schedule:* ' + (date || 'N/A') + ' | ' + (timeSlot || '') + '\n' +
                    '👨‍⚕️ *Ref By:* ' + (referredBy || 'Self') + '\n' +
                    '🚚 *Report:* ' + (reportType || 'Both') + '\n' +
                    '💳 *Payment:* ' + (paymentMode || 'Not Paid') + '\n' +
                    '📎 *Prescription:* ' + (prescription ? prescription.name : 'None') + '\n' +
                    '━━━━━━━━━━━━━━━━━━━━━\n' +
                    '📋 *Selected Tests (' + (testCount || 0) + '):*\n' +
                    (testsList || '  1. General Test') + '\n' +
                    '─────────────────────\n' +
                    '▫️ Tests Subtotal: ₹' + (testCost || 0) + '\n' +
                    '▫️ Home Collection: ₹' + (collectionCharge || 0) + '\n' +
                    '💰 *Grand Total: ₹' + (grandTotal || 0) + '*\n' +
                    '━━━━━━━━━━━━━━━━━━━━━\n' +
                    '📍 *Mouchumi Lab Test Service, Golaghat*\n' +
                    '📞 Helpline: 6000219209 / 6900862973';

                const msgPath = '/waInstance' + ID_INSTANCE + '/sendMessage/' + API_TOKEN;
                const msgPayload = {
                    chatId: TARGET_CHAT_ID,
                    message: message
                };
                
                const responseResult = await sendGreenApiRequest(msgPath, msgPayload);

                if (prescription && prescription.base64) {
                    try {
                        await sendGreenApiFile(TARGET_CHAT_ID, prescription.name, prescription.base64);
                    } catch (uploadErr) {
                        console.error('Prescription send error:', uploadErr);
                    }
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
    console.log('Server running on port ' + PORT);
});
