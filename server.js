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
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --border-color: #1e3a5f;
            --green-active: #064e3b;
            --green-border: #10b981;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
        body { background-color: var(--bg-dark); color: var(--text-main); padding-bottom: 90px; }
        .app-container { max-width: 480px; margin: 0 auto; min-height: 100vh; background: var(--bg-dark); position: relative; }

        /* Top Nav */
        .top-nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; }
        .logo-box { display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 42px; height: 42px; background: linear-gradient(135deg, #0284c7, #0d9488); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 12px rgba(2,132,199,0.3); }
        .logo-text h3 { font-size: 15px; font-weight: 700; color: #fff; line-height: 1.2; }
        .logo-text p { font-size: 12px; color: var(--text-muted); }
        .notif-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--card-dark); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-muted); }

        /* Main View */
        .view-section { padding: 0 20px; }
        .badge-tag { color: var(--accent-cyan); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
        .hero-title { font-size: 30px; font-weight: 800; line-height: 1.15; margin-bottom: 10px; letter-spacing: -0.5px; }
        .hero-title span { color: var(--accent-cyan); }
        .hero-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px; }

        /* Search Box Sticky */
        .search-container { position: sticky; top: 10px; z-index: 50; margin-bottom: 18px; }
        .search-box { position: relative; }
        .search-box input { width: 100%; padding: 14px 16px 14px 44px; background: #0c2033; border: 2px solid var(--accent-cyan); border-radius: 14px; color: #fff; font-size: 14px; outline: none; box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
        .search-box input::placeholder { color: #94a3b8; }
        .search-icon { position: absolute; left: 16px; top: 16px; color: var(--accent-cyan); }

        /* Banner */
        .banner-card { background: linear-gradient(135deg, #0369a1 0%, #0f766e 100%); border-radius: 20px; padding: 20px; margin-bottom: 22px; position: relative; overflow: hidden; }
        .banner-card::after { content: '💧'; position: absolute; right: -10px; bottom: -15px; font-size: 100px; opacity: 0.15; pointer-events: none; }
        .banner-tag { font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #bae6fd; margin-bottom: 8px; }
        .banner-card h3 { font-size: 19px; font-weight: 800; line-height: 1.3; margin-bottom: 6px; max-width: 85%; }
        .banner-card p { font-size: 13px; color: #e0f2fe; margin-bottom: 14px; max-width: 80%; }
        .banner-btn { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #0f172a; padding: 9px 16px; border-radius: 10px; font-weight: 700; font-size: 13px; border: none; cursor: pointer; }

        /* Tests Scrollable Window */
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px; }
        .section-header h3 { font-size: 17px; font-weight: 700; }
        .section-header p { font-size: 12px; color: var(--text-muted); }

        .test-box-wrapper { background: var(--card-dark); border: 1px solid var(--border-color); border-radius: 16px; padding: 10px; max-height: 480px; overflow-y: auto; scroll-behavior: smooth; margin-bottom: 24px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.3); }
        .test-list { display: flex; flex-direction: column; gap: 8px; }
        .test-card { background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s; }
        .test-card.selected { border-color: var(--accent-cyan); background: var(--card-subtle); }
        .test-info { display: flex; align-items: center; gap: 10px; max-width: 72%; }
        
        /* Vial Badges */
        .vial-badge { font-size: 10px; font-weight: 800; padding: 3px 7px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-top: 4px; }
        .vial-violet { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid #a855f7; }
        .vial-red { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; }
        .vial-blue { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid #3b82f6; }
        .vial-grey { background: rgba(148, 163, 184, 0.2); color: #cbd5e1; border: 1px solid #94a3b8; }
        .vial-black { background: rgba(15, 23, 42, 0.8); color: #e2e8f0; border: 1px solid #475569; }
        .vial-green { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; }
        .vial-na { background: rgba(100, 116, 139, 0.15); color: #94a3b8; border: 1px solid #475569; }

        .test-name { font-size: 13px; font-weight: 700; line-height: 1.3; margin-bottom: 2px; }
        .test-action { text-align: right; min-width: 70px; }
        .test-price { font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 4px; }
        .add-btn { background: var(--card-dark); border: 1px solid var(--border-color); color: var(--accent-cyan); padding: 5px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer; width: 100%; }
        .add-btn.added { background: var(--accent-cyan); color: #04121e; border-color: var(--accent-cyan); }

        /* Booking View */
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

        /* Pills & Slots */
        .pills-group { display: flex; gap: 8px; margin-bottom: 12px; }
        .pill-btn { flex: 1; padding: 12px 8px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-muted); font-size: 13px; font-weight: 600; text-align: center; cursor: pointer; }
        .pill-btn.active { background: #38bdf8; color: #04121e; border-color: #38bdf8; font-weight: 700; }

        .slot-card { display: flex; align-items: center; justify-content: space-between; padding: 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 8px; cursor: pointer; color: var(--text-muted); font-size: 14px; }
        .slot-card.active { background: var(--green-active); border-color: var(--green-border); color: #fff; font-weight: 600; }

        .main-submit-btn { width: 100%; padding: 16px; background: #0284c7; border: none; border-radius: 14px; color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(2,132,199,0.3); }

        /* Floating Bars */
        .floating-cart { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: calc(100% - 40px); max-width: 440px; background: #0369a1; border-radius: 16px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 100; }
        .cart-info h4 { font-size: 15px; font-weight: 800; color: #fff; }
        .cart-info p { font-size: 12px; color: #bae6fd; }
        .cart-next-btn { background: #fff; color: #0369a1; border: none; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; }

        .wa-float { position: fixed; bottom: 85px; right: 20px; background: #22c55e; color: #fff; padding: 10px 16px; border-radius: 30px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 6px 16px rgba(34,197,94,0.3); z-index: 99; }
        #toast { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); padding: 12px 20px; border-radius: 10px; font-size: 14px; font-weight: 600; display: none; z-index: 999; }
    </style>
</head>
<body>
    <div class="app-container">
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

            <div class="search-container">
                <div class="search-box">
                    <span class="search-icon">🔍</span>
                    <input type="text" id="searchInput" placeholder="Search test name (e.g. CBC, Sugar, Lipid)...">
                </div>
            </div>

            <div class="banner-card">
                <div class="banner-tag">🏠 HOME COLLECTION</div>
                <h3>Reliable at-home sample collection in Golaghat.</h3>
                <p>Safe, gentle collection from a trusted local team.</p>
                <button class="banner-btn" onclick="scrollToTests()">Browse 156 Tests ➔</button>
            </div>

            <div class="section-header">
                <div>
                    <h3>All 156 Tests & Prices</h3>
                    <p id="testCountSub">Showing all official diagnostic tests</p>
                </div>
            </div>

            <!-- Scrollable Window for Tests -->
            <div class="test-box-wrapper" id="testScrollBox">
                <div class="test-list" id="testsContainer"></div>
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
                        <div id="bookingSelectedSummary" style="font-size: 13px; font-weight: 700; max-width: 250px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">--</div>
                    </div>
                </div>
                <div id="bookingTotalSummary" style="font-size: 16px; font-weight: 800; color: #38bdf8;">₹0</div>
            </div>

            <form id="scheduleForm">
                <div class="form-group">
                    <label>Full name</label>
                    <div class="input-wrap">
                        <span class="field-icon">👤</span>
                        <input type="text" id="custName" required placeholder="Enter Patient Name">
                    </div>
                </div>

                <div style="display: flex; gap: 10px;" class="form-group">
                    <div style="flex:1;">
                        <label>Age</label>
                        <div class="input-wrap">
                            <span class="field-icon">🎂</span>
                            <input type="number" id="custAge" required placeholder="Age">
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
                        <input type="tel" id="custPhone" required placeholder="+91 XXXXX XXXXX">
                    </div>
                </div>

                <div class="form-group">
                    <label>Pickup address</label>
                    <div class="input-wrap">
                        <span class="field-icon">📍</span>
                        <textarea id="custAddress" rows="2" required placeholder="Flat, building, village / town"></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label>Doctor Referral (Optional)</label>
                    <div class="input-wrap">
                        <span class="field-icon">🩺</span>
                        <input type="text" id="custDoctor" placeholder="Self / Doctor name">
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
                        <span>🕒 7:00 – 9:00 AM (Fasting Slots)</span>
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

                <button type="submit" id="submitBtn" class="main-submit-btn">Confirm home collection ➔</button>
            </form>
        </div>

        <!-- Floating Footer -->
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

        <div id="toast"></div>
    </div>

    <script>
        // Official Price List Database (156 Tests)
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
            { id: 13, name: "ΑΝΤΙ ΤΡΟ", price: 2000, vial: "RED" },
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
            { id: 114, name: "SERUM CREATININE", price: 150, vial: "RED" },
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
                card.className = 'test-card' + (isSelected ? ' selected' : '');
                card.innerHTML = \`
                    <div class="test-info">
                        <div>
                            <div class="test-name">\${test.name}</div>
                            <span class="vial-badge \${vialCls}">● \${test.vial}</span>
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
            const total = selectedTests.reduce((sum, t) => sum + t.price, 0);
            if (selectedTests.length > 0) {
                cartBar.style.display = 'flex';
                document.getElementById('cartTotalText').innerText = '₹' + total;
                document.getElementById('cartItemsText').innerText = selectedTests.length + ' test' + (selectedTests.length > 1 ? 's' : '') + ' selected';
            } else {
                cartBar.style.display = 'none';
            }
        }

        function applyFilter() {
            const val = document.getElementById('searchInput').value.trim().toLowerCase();
            let filtered = ALL_TESTS;
            if (val) {
                filtered = ALL_TESTS.filter(t => t.name.toLowerCase().includes(val) || t.vial.toLowerCase().includes(val));
            }
            renderTests(filtered);
            // Auto scroll container to top so searched test is right at the top
            document.getElementById('testScrollBox').scrollTop = 0;
        }

        document.getElementById('searchInput').addEventListener('input', applyFilter);

        function scrollToTests() {
            document.getElementById('searchInput').focus();
            document.getElementById('testScrollBox').scrollIntoView({ behavior: 'smooth' });
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
                testsList: selectedTests.map(t => t.name + ' (₹' + t.price + ')').join(', '),
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
                        applyFilter();
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

        renderTests(ALL_TESTS);
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
