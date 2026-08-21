<!DOCTYPE html>
<html lang="as">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MediTree Clinic & Diagnostic Centre LLP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --primary: #0077b6;
      --primary-dark: #023e8a;
      --primary-light: #e0f2fe;
      --accent: #10b981;
      --accent-hover: #059669;
      --whatsapp: #25D366;
      --bg: #f1f5f9;
      --surface: #ffffff;
      --card-bg: rgba(255, 255, 255, 0.96);
      --text-main: #0f172a;
      --text-sub: #475569;
      --text-muted: #94a3b8;
      --border: #e2e8f0;
      --radius-sm: 10px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --shadow-subtle: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
      --shadow-floating: 0 20px 40px -10px rgba(2, 62, 138, 0.18);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background: linear-gradient(180deg, #e6f4fa 0%, var(--bg) 280px);
      color: var(--text-main);
      padding: 16px 12px 110px 12px;
      min-height: 100vh;
    }

    .container {
      max-width: 640px;
      margin: 0 auto;
    }

    /* Header */
    .header-card {
      background: var(--card-bg);
      backdrop-filter: blur(10px);
      border-radius: var(--radius-lg);
      padding: 24px 20px;
      text-align: center;
      box-shadow: var(--shadow-subtle);
      margin-bottom: 16px;
      border: 1px solid rgba(255, 255, 255, 0.8);
      position: relative;
      overflow: hidden;
    }

    .header-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, var(--primary), var(--accent));
    }

    .brand-title {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.6px;
      line-height: 1.1;
    }

    .brand-medi { color: var(--primary); }
    .brand-tree { color: var(--accent); }

    .centre-name {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--primary-dark);
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-top: 4px;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      color: #065f46;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 4px 14px;
      border-radius: 20px;
      margin-top: 10px;
    }

    /* Premium Form Cards */
    .premium-card {
      background: var(--surface);
      border-radius: var(--radius-md);
      padding: 20px;
      box-shadow: var(--shadow-subtle);
      margin-bottom: 16px;
      border: 1px solid var(--border);
    }

    .section-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      letter-spacing: -0.2px;
    }

    .input-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .full-width {
      grid-column: span 2;
    }

    .form-group label {
      display: block;
      font-size: 11.5px;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--text-sub);
    }

    .form-group input, .form-group select, .form-group textarea {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 13.5px;
      color: var(--text-main);
      background-color: #f8fafc;
      outline: none;
      transition: all 0.2s ease;
    }

    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      border-color: var(--primary);
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.12);
    }

    .collection-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }

    /* Prescription Upload Box */
    .upload-zone {
      border: 2px dashed #cbd5e1;
      border-radius: var(--radius-sm);
      padding: 18px;
      text-align: center;
      background: #f8fafc;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .upload-zone:hover {
      border-color: var(--primary);
      background: #f0f9ff;
    }

    .upload-zone input[type="file"] {
      display: none;
    }

    .upload-prompt {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      color: var(--text-sub);
      font-size: 12.5px;
    }

    .upload-prompt svg {
      color: var(--primary);
    }

    .upload-preview-container {
      display: none;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      margin-top: 10px;
    }

    .preview-info {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .preview-thumbnail {
      width: 44px;
      height: 44px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }

    .preview-meta {
      overflow: hidden;
    }

    .preview-name {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }

    .preview-size {
      font-size: 11px;
      color: var(--text-muted);
    }

    .btn-remove-file {
      background: #fee2e2;
      color: #dc2626;
      border: none;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    /* Search Box */
    .search-box-wrapper {
      position: relative;
      margin-bottom: 12px;
    }

    .search-box-wrapper input {
      width: 100%;
      padding: 12px 14px 12px 38px;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 13.5px;
      outline: none;
      background-color: #f8fafc;
      transition: all 0.2s ease;
    }

    .search-box-wrapper input:focus {
      border-color: var(--primary);
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.12);
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
    }

    /* Test List */
    .test-list-container {
      max-height: 280px;
      overflow-y: auto;
      border: 1.5px solid var(--border);
      border-radius: var(--radius-sm);
      background: #ffffff;
    }

    .test-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 14px;
      border-bottom: 1px solid #f1f5f9;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.15s;
    }

    .test-item:last-child {
      border-bottom: none;
    }

    .test-item:hover {
      background-color: #f8fafc;
    }

    .test-item input[type="checkbox"] {
      margin-right: 12px;
      accent-color: var(--primary);
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .test-title-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .test-price {
      font-weight: 700;
      color: var(--primary);
      font-size: 14px;
      white-space: nowrap;
    }

    /* Vial Badges */
    .vial-tag {
      font-size: 9.5px;
      padding: 2px 7px;
      border-radius: 6px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .vial-VIOLET { background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; }
    .vial-RED { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
    .vial-GREY { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
    .vial-BLUE { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
    .vial-BLACK { background: #e2e8f0; color: #0f172a; border: 1px solid #cbd5e1; }
    .vial-GREEN { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .vial-PF { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .vial-MULTI { background: #e0e7ff; color: #4338ca; border: 1px solid #c7d2fe; }
    .vial-NA { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }

    /* Sticky Bottom Footer */
    .summary-footer {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 24px);
      max-width: 620px;
      background: var(--primary-dark);
      color: white;
      border-radius: var(--radius-md);
      padding: 12px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-floating);
      z-index: 50;
    }

    .btn-submit {
      background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
      color: white;
      border: none;
      padding: 11px 22px;
      border-radius: var(--radius-sm);
      font-weight: 700;
      cursor: pointer;
      font-size: 13.5px;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
      transition: all 0.2s ease;
    }

    .btn-submit:active {
      transform: scale(0.97);
    }

    /* Modal / Receipt Styles */
    #receiptModal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(6px);
      z-index: 100;
      padding: 16px;
      overflow-y: auto;
    }

    .receipt-card {
      max-width: 460px;
      background: white;
      margin: 16px auto;
      border-radius: var(--radius-md);
      padding: 24px;
      box-shadow: var(--shadow-floating);
      border-top: 5px solid var(--primary);
    }

    .receipt-header {
      text-align: center;
      border-bottom: 2px dashed var(--border);
      padding-bottom: 14px;
      margin-bottom: 14px;
    }

    .receipt-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      font-size: 12px;
      color: var(--text-sub);
      margin-bottom: 14px;
      background: #f8fafc;
      padding: 10px 12px;
      border-radius: var(--radius-sm);
    }

    .receipt-table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0 8px 0;
      font-size: 12.5px;
    }

    .receipt-table th, .receipt-table td {
      padding: 8px 4px;
      border-bottom: 1px solid #f1f5f9;
    }

    .receipt-table th {
      text-align: left;
      font-weight: 700;
      color: var(--text-muted);
      font-size: 11px;
      text-transform: uppercase;
    }

    .receipt-total-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: var(--text-sub);
      padding: 4px 0;
    }

    .receipt-total {
      border-top: 2px solid var(--text-main);
      font-size: 15.5px;
      font-weight: 800;
      display: flex;
      justify-content: space-between;
      padding-top: 8px;
      margin-top: 6px;
    }

    .prescription-status-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      color: #1e40af;
      margin: 12px 0 6px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .receipt-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 20px;
    }

    .btn-whatsapp {
      width: 100%;
      background-color: var(--whatsapp);
      color: #ffffff;
      border: none;
      padding: 12px;
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.28);
    }

    .btn-whatsapp:active {
      opacity: 0.92;
    }

    .modal-btn-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .btn-secondary {
      background: #f1f5f9;
      color: var(--text-main);
      border: 1px solid var(--border);
      padding: 10px;
      border-radius: var(--radius-sm);
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
    }
  </style>
</head>
<body>

<div class="container">
  <!-- Brand Header -->
  <div class="header-card">
    <div class="brand-title">
      <span class="brand-medi">Medi</span><span class="brand-tree">Tree</span>
    </div>
    <div class="centre-name">Clinic And Diagnostic Centre LLP</div>
    <div>
      <span class="header-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        Home Sample Collection Portal
      </span>
    </div>
  </div>

  <!-- Patient Details Card -->
  <div class="premium-card">
    <div class="section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      ৰোগীৰ তথ্য (Patient Details)
    </div>
    
    <div class="input-grid">
      <div class="form-group full-width">
        <label>Patient Full Name *</label>
        <input type="text" id="pName" placeholder="ৰোগীৰ সম্পূৰ্ণ নাম লিখক">
      </div>
      
      <div class="form-group">
        <label>Age (বয়স) *</label>
        <input type="number" id="pAge" placeholder="যেনে: 32">
      </div>
      
      <div class="form-group">
        <label>Sex (লিংগ) *</label>
        <select id="pSex">
          <option value="Male">Male (পুৰুষ)</option>
          <option value="Female">Female (মহিলা)</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="form-group full-width">
        <label>Doctor Referral (পৰামৰ্শদাতা চিকিৎসক) *</label>
        <input type="text" id="pDoctor" list="doctorSuggestions" placeholder="Dr. Name / Self / General" value="Self">
        <datalist id="doctorSuggestions">
          <option value="Self">
          <option value="General Consultation">
          <option value="Dr. B. K. Sarma">
          <option value="Dr. P. Gogoi">
          <option value="Dr. R. Dutta">
          <option value="Dr. M. Bora">
        </datalist>
      </div>

      <div class="form-group full-width">
        <label>Contact Phone Number *</label>
        <input type="tel" id="pPhone" placeholder="১০ টা সংখ্যাৰ মোবাইল নম্বৰ">
      </div>

      <div class="form-group full-width">
        <label>Sample Collection Address / Location *</label>
        <textarea id="pAddress" rows="2" placeholder="নমুনা সংগ্ৰহ কৰিবলগীয়া সম্পূৰ্ণ ঠিকনা ও Landmark"></textarea>
      </div>

      <!-- Collection Charge Selector & Custom Input -->
      <div class="form-group full-width">
        <label>Home Collection Charge (সংগ্ৰহ মাচুল) *</label>
        <div class="collection-row">
          <select id="pCollectionCharge" onchange="handleCollectionChargeChange()">
            <option value="0">Free / Clinic Sample (₹0)</option>
            <option value="50">Local / Town Area (₹50)</option>
            <option value="100" selected>Standard Home Collection (₹100)</option>
            <option value="150">Outskirts Area (₹150)</option>
            <option value="200">Long Distance (₹200)</option>
            <option value="custom">Custom Amount (নিজে মাচুল লিখক)...</option>
          </select>
          <input type="number" id="pCustomCharge" placeholder="মাচুলৰ পৰিমাণ দিয়ক (₹)" style="display: none;" oninput="updateTotal()" min="0" value="100">
        </div>
      </div>
    </div>
  </div>

  <!-- Prescription Upload Section -->
  <div class="premium-card">
    <div class="section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
      Doctor Prescription (প্ৰেছক্ৰিপশ্বন আপলোড কৰক)
    </div>

    <div class="upload-zone" onclick="document.getElementById('prescriptionFile').click()">
      <input type="file" id="prescriptionFile" accept="image/*,application/pdf" capture="environment" onchange="handlePrescriptionUpload(event)">
      <div class="upload-prompt">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        <div style="font-weight: 700; color: var(--text-main);">প্ৰেছক্ৰিপশ্বনৰ ফটো তোলক বা ফাইল আপলোড কৰক</div>
        <div style="font-size: 11px; color: var(--text-muted);">Supports: Camera Photo, JPG, PNG, PDF (Max 10MB)</div>
      </div>
    </div>

    <!-- Uploaded File Preview Badge -->
    <div class="upload-preview-container" id="previewContainer">
      <div class="preview-info">
        <img id="previewImg" class="preview-thumbnail" src="" alt="Prescription Preview">
        <div class="preview-meta">
          <div class="preview-name" id="previewFileName">prescription.jpg</div>
          <div class="preview-size" id="previewFileSize">240 KB</div>
        </div>
      </div>
      <button type="button" class="btn-remove-file" onclick="removePrescription()">Remove</button>
    </div>
  </div>

  <!-- Test Selection Card -->
  <div class="premium-card">
    <div class="section-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"></path><path d="M8.5 2h7"></path><path d="M14.5 16h-5"></path></svg>
      টেষ্ট বাচনি কৰক (বা Prescription অনুসৰি আমি নিৰ্ধাৰণ কৰিম)
    </div>
    
    <div class="search-box-wrapper">
      <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input type="text" id="searchTest" placeholder="টেষ্টৰ নাম বিচাৰক (e.g. Full Body, CBC, Thyroid)..." onkeyup="filterTests()">
    </div>
    
    <div class="test-list-container" id="testList"></div>
  </div>

  <!-- Floating Footer Summary -->
  <div class="summary-footer">
    <div>
      <div style="font-size: 11px; color: #94a3b8; font-weight: 500;">
        Selected: <strong id="selectedCount" style="color: #38bdf8;">0</strong> Tests 
        <span id="footerChargeBadge" style="color: #cbd5e1; font-size: 10.5px;">(+ ₹100 Col.)</span>
      </div>
      <div style="font-size: 17px; font-weight: 800;">Total: ₹<span id="totalDisplay">100</span></div>
    </div>
    <button class="btn-submit" onclick="generateReceipt()">Booking Receipt</button>
  </div>
</div>

<!-- Receipt Modal -->
<div id="receiptModal">
  <div class="receipt-card" id="receiptContent">
    <div class="receipt-header">
      <div style="font-size: 20px; font-weight: 800; margin-bottom: 2px;">
        <span class="brand-medi">Medi</span><span class="brand-tree">Tree</span>
      </div>
      <div style="font-size: 11px; font-weight: 700; color: #023e8a; text-transform: uppercase;">Clinic And Diagnostic Centre LLP</div>
      <p style="font-size: 10px; color: #10b981; font-weight: 700; letter-spacing: 0.5px; margin-top: 3px;">YOUR HEALTH, OUR RESPONSIBILITY</p>
      <p style="font-size: 10px; color: #64748b; margin-top: 2px;">Near SKK Civil Hospital, Golaghat</p>
    </div>

    <!-- Structured Info Grid -->
    <div class="receipt-info-grid">
      <div><strong>Date:</strong> <span id="rDate"></span></div>
      <div><strong>Ref Doctor:</strong> <span id="rDoctor" style="color: #0077b6; font-weight: 600;"></span></div>
      <div style="grid-column: span 2;"><strong>Patient:</strong> <span id="rName" style="font-weight: 700;"></span> (<span id="rAgeSex"></span>)</div>
      <div style="grid-column: span 2;"><strong>Phone:</strong> <span id="rPhone"></span></div>
      <div style="grid-column: span 2;"><strong>Location:</strong> <span id="rAddress"></span></div>
    </div>

    <!-- Prescription Attachment Badge in Receipt -->
    <div id="rPrescriptionNotice" class="prescription-status-box" style="display: none;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
      <span><strong>Prescription:</strong> <span id="rPrescriptionName">Attached</span></span>
    </div>

    <!-- Test Breakdown Table -->
    <table class="receipt-table">
      <thead>
        <tr>
          <th>Test Description</th>
          <th>Vial</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody id="rTestTableBody"></tbody>
    </table>

    <!-- Amount Summary Breakdown -->
    <div style="margin-top: 6px; border-top: 1px dashed var(--border); padding-top: 8px;">
      <div class="receipt-total-row">
        <span>Tests Subtotal:</span>
        <span>₹<span id="rSubTotal">0</span></span>
      </div>
      <div class="receipt-total-row">
        <span>Collection Charge:</span>
        <span>₹<span id="rCollectionCharge">0</span></span>
      </div>
    </div>

    <div class="receipt-total">
      <span>Grand Total:</span>
      <span style="color: #0077b6;">₹<span id="rTotal">0</span></span>
    </div>

    <!-- Action Buttons -->
    <div class="receipt-actions">
      <button class="btn-whatsapp" onclick="shareOnWhatsApp()">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        Share on WhatsApp (Select Contact)
      </button>
      
      <div class="modal-btn-row">
        <button class="btn-secondary" onclick="closeModal()">Edit / Close</button>
        <button class="btn-secondary" style="color: #b91c1c; border-color: #fecaca;" onclick="resetForm()">New Booking</button>
      </div>
    </div>
  </div>
</div>

<script>
  const testsData = [
    { name: "FULL BODY / WHOLE BODY CHECKUP", price: 4000, vial: "RED, VIOLET, GREY, BLACK, URINE" },
    { name: "ABO, Rh GROUPING", price: 100, vial: "VIOLET" },
    { name: "ABSOLUTE EOSINOPHIL COUNT", price: 150, vial: "VIOLET" },
    { name: "ABSOLUTE LYMPHOCYTE COUNT", price: 150, vial: "VIOLET" },
    { name: "ABSOLUTE MONOCYTE COUNT", price: 150, vial: "VIOLET" },
    { name: "ABSOLUTE NEUTROPHIL COUNT", price: 150, vial: "VIOLET" },
    { name: "ADA - TBM", price: 750, vial: "RED" },
    { name: "Albumin", price: 100, vial: "RED" },
    { name: "Allergy Profile", price: 1200, vial: "VIOLET & RED" },
    { name: "AMH", price: 2300, vial: "RED" },
    { name: "AMMONIA", price: 1000, vial: "VIOLET" },
    { name: "ANTENATAL CHECK UP (ANC)", price: 2900, vial: "GREY, VIOLET & RED" },
    { name: "ANTI CCP", price: 1600, vial: "RED" },
    { name: "ANTI TPO", price: 2000, vial: "RED" },
    { name: "ANTINUCLEAR ANTI BODY (ANA)", price: 1000, vial: "RED" },
    { name: "ANTINUCLEAR ANTI BODY Reflex (ANA Profile)", price: 4000, vial: "RED" },
    { name: "APTT", price: 500, vial: "BLUE" },
    { name: "ASO titre (By Immunoturbidity)", price: 500, vial: "RED" },
    { name: "BAND CELL", price: 150, vial: "VIOLET" },
    { name: "Beta HCG, Serum", price: 900, vial: "RED" },
    { name: "BIOPSY- Small Tissue", price: 800, vial: "NA" },
    { name: "BIOPSY- Medium Tissue", price: 1000, vial: "NA" },
    { name: "BIOPSY- Large Tissue", price: 1200, vial: "NA" },
    { name: "BIOPSY- Extra Large Tissue", price: 2000, vial: "NA" },
    { name: "BLEEDING TIME/CLOTTING TIME (BT/CT)", price: 50, vial: "NA" },
    { name: "BLOOD UREA", price: 200, vial: "RED" },
    { name: "BUN", price: 150, vial: "RED" },
    { name: "CPK MB", price: 1350, vial: "RED" },
    { name: "CRP (TITRE) immunoturbidity", price: 450, vial: "RED" },
    { name: "CA 125", price: 1600, vial: "RED" },
    { name: "CBC", price: 400, vial: "VIOLET" },
    { name: "CHOLESTEROL TOTAL", price: 200, vial: "RED" },
    { name: "COAGULATION PROFILE", price: 1200, vial: "BLUE" },
    { name: "CSF ANALYSIS", price: 550, vial: "NA" },
    { name: "DENGUE, Serology Test", price: 900, vial: "RED" },
    { name: "DIABETIC PROFILE", price: 2500, vial: "GREY, VIOLET" },
    { name: "Differential Leucocyte Count (D.L.C)", price: 150, vial: "VIOLET" },
    { name: "DIRECT COOMBS TEST", price: 250, vial: "RED" },
    { name: "DIRECT/INDIRECT BILIRUBIN", price: 150, vial: "RED" },
    { name: "eGFR", price: 500, vial: "RED" },
    { name: "ELECTROLYTE 3 (THREE) PARAMETERS", price: 600, vial: "RED" },
    { name: "ESR", price: 100, vial: "BLACK" },
    { name: "FASTING PLASMA GLUCOSE (FBS)", price: 50, vial: "GREY" },
    { name: "FERRITIN", price: 1000, vial: "RED" },
    { name: "FERTILITY PROFILE", price: 1500, vial: "RED" },
    { name: "FERTILITY PROFILE (MALE)", price: 2400, vial: "RED" },
    { name: "FSH", price: 650, vial: "RED" },
    { name: "FT3", price: 600, vial: "RED" },
    { name: "FT4", price: 600, vial: "RED" },
    { name: "FUNGAL SMEAR", price: 250, vial: "NA" },
    { name: "G6PD", price: 600, vial: "VIOLET" },
    { name: "GAMMA G. T. (GGT)", price: 400, vial: "RED" },
    { name: "GCT WITH 75 GM GLUCOSE", price: 150, vial: "GREY" },
    { name: "GLUCOSE TOLERENCE TEST", price: 400, vial: "GREY" },
    { name: "GRAM STAIN", price: 150, vial: "VIOLET" },
    { name: "HDL CHOLESTEROL", price: 350, vial: "RED" },
    { name: "HAEMOGLOBIN (Hb)", price: 100, vial: "VIOLET" },
    { name: "Hb TYPING", price: 1400, vial: "VIOLET" },
    { name: "HbA1C", price: 600, vial: "VIOLET" },
    { name: "HEPATITIS A/HAV (SCREENING)", price: 600, vial: "RED" },
    { name: "HEPATITIS B SURFACE AG (HBsAg)", price: 400, vial: "RED" },
    { name: "HEPATITIS C (SCREENING)", price: 400, vial: "RED" },
    { name: "HEPATITIS E (SCREENING)", price: 600, vial: "RED" },
    { name: "HEPATITIS PANEL", price: 3500, vial: "RED" },
    { name: "HIV (I & II) SCREENING", price: 350, vial: "RED" },
    { name: "IMMATURE CELL", price: 150, vial: "VIOLET" },
    { name: "INDIRECT COOMBS TEST", price: 1100, vial: "RED" },
    { name: "IRON", price: 500, vial: "RED" },
    { name: "IRON & TIBC", price: 750, vial: "RED" },
    { name: "IRON & UIBC", price: 750, vial: "RED" },
    { name: "IRON PROFILE", price: 1500, vial: "RED" },
    { name: "KFT (WITH 3 PARA ELECTROLYTE)", price: 1100, vial: "RED" },
    { name: "KOH TEST FOR SKIN & NAILS", price: 300, vial: "NA" },
    { name: "LDH", price: 650, vial: "RED" },
    { name: "Leptospira (IgM/IgG)", price: 600, vial: "RED" },
    { name: "LH", price: 650, vial: "RED" },
    { name: "LIPASE", price: 500, vial: "RED" },
    { name: "LIPID PROFILE", price: 800, vial: "RED" },
    { name: "LIVER FUNCTION TEST (LFT)", price: 800, vial: "RED" },
    { name: "M.P. By Slide Method / PBF FOR MP", price: 250, vial: "VIOLET" },
    { name: "MALARIA PF/PV CARD RAPID TEST", price: 250, vial: "VIOLET" },
    { name: "MALIGNANT CELL", price: 550, vial: "VIOLET" },
    { name: "MICROALBUMIN, Spot Urine", price: 600, vial: "NA" },
    { name: "NT PRO BNP", price: 1750, vial: "RED" },
    { name: "PBS FOR CELL MORPHOLOGY", price: 250, vial: "VIOLET" },
    { name: "PLATELET COUNT", price: 100, vial: "VIOLET" },
    { name: "PLEURAL FLUID ANALYSIS: PHYSICAL, CHEMICAL AND MICROSCOPIC", price: 850, vial: "PF" },
    { name: "PLEURAL FLUID ANALYSIS: CYTOLOGICAL", price: 500, vial: "PF" },
    { name: "PLEURAL FLUID ANALYSIS: ADA", price: 650, vial: "PF" },
    { name: "PLEURAL FLUID ANALYSIS: LH", price: 400, vial: "PF" },
    { name: "POST PRANDIAL PLASMA GLUCOSE (PPBS)", price: 50, vial: "GREY" },
    { name: "PROLACTIN", price: 900, vial: "RED" },
    { name: "PROTHROMBIN TIME (PT INR)", price: 400, vial: "BLUE" },
    { name: "PSA", price: 1050, vial: "RED" },
    { name: "QUANTI FERON", price: 1800, vial: "GREEN" },
    { name: "QUANTITATIVE HBsAg", price: 600, vial: "RED" },
    { name: "QUANTITATIVE HCV", price: 600, vial: "RED" },
    { name: "QUANTITATIVE HIV", price: 600, vial: "RED" },
    { name: "R.A FACTOR", price: 250, vial: "RED" },
    { name: "RANDOM PLASMA GLUCOSE (RBS)", price: 100, vial: "GREY" },
    { name: "RETICULOCYTE COUNT", price: 300, vial: "VIOLET" },
    { name: "Rh ANTIBODY TITRE", price: 650, vial: "VIOLET" },
    { name: "ROUTINE EXAM. OF BLOOD", price: 300, vial: "VIOLET" },
    { name: "Scrub typhus (IgM/IgG)", price: 500, vial: "RED" },
    { name: "SGOT/AST", price: 150, vial: "RED" },
    { name: "SGPT/ALT", price: 150, vial: "RED" },
    { name: "SEMEN ANALYSIS", price: 500, vial: "NA" },
    { name: "Sepsis Screen", price: 800, vial: "VIOLET & RED" },
    { name: "SERUM ALK. PHOSPHATASE", price: 200, vial: "RED" },
    { name: "SERUM AMYLASE", price: 450, vial: "RED" },
    { name: "SERUM BILIRUBIN, TOTAL", price: 150, vial: "RED" },
    { name: "SERUM CALCIUM", price: 250, vial: "RED" },
    { name: "SERUM C-PEPTIDE", price: 1000, vial: "RED" },
    { name: "SERUM CHLORIDE", price: 250, vial: "RED" },
    { name: "SERUM CREATININE", price: 200, vial: "RED" },
    { name: "SERUM IgE", price: 900, vial: "RED" },
    { name: "SERUM MAGNESIUM", price: 500, vial: "RED" },
    { name: "SERUM PHOSPHATE", price: 350, vial: "RED" },
    { name: "SERUM PHOSPHORUS", price: 500, vial: "RED" },
    { name: "SERUM POTASSIUM (K)", price: 250, vial: "RED" },
    { name: "SERUM SODIUM (Na)", price: 250, vial: "RED" },
    { name: "SPUTUM AFB (Z.N. STAIN)", price: 250, vial: "NA" },
    { name: "Sputum AFB Culture", price: 1100, vial: "NA" },
    { name: "STOOL for Culture and Sensitivity", price: 600, vial: "NA" },
    { name: "STOOL FOR OCCULT BLOOD", price: 150, vial: "NA" },
    { name: "STOOL RE", price: 150, vial: "NA" },
    { name: "T3", price: 400, vial: "RED" },
    { name: "T4", price: 400, vial: "RED" },
    { name: "TESTOSTERONE - FREE", price: 2600, vial: "RED" },
    { name: "TESTOSTERONE - TOTAL", price: 900, vial: "RED" },
    { name: "THYROID PROFILE, TOTAL", price: 700, vial: "RED" },
    { name: "TORCH PANEL (10 PROFILE)", price: 3000, vial: "RED" },
    { name: "TOTAL PROTEIN & FRACTION", price: 300, vial: "RED" },
    { name: "TOTAL R B C COUNT", price: 100, vial: "VIOLET" },
    { name: "TOTAL W B C COUNT (TC)", price: 100, vial: "VIOLET" },
    { name: "TOXO TEST (IgM & IgG)", price: 1500, vial: "RED" },
    { name: "TRIGLYCERIDE", price: 250, vial: "RED" },
    { name: "TROPONIN I TEST", price: 1250, vial: "RED" },
    { name: "TROPONIN T TEST", price: 1300, vial: "RED" },
    { name: "TSH", price: 400, vial: "RED" },
    { name: "TYPHIDOT", price: 350, vial: "RED" },
    { name: "URIC ACID", price: 150, vial: "RED" },
    { name: "Urine Albumin", price: 100, vial: "NA" },
    { name: "URINE CULTURE", price: 350, vial: "NA" },
    { name: "URINE FOR ACR", price: 600, vial: "NA" },
    { name: "URINE PREGNANCY TEST / beta HCG", price: 150, vial: "NA" },
    { name: "URINE PROTEIN 24 HOURS", price: 350, vial: "NA" },
    { name: "URINE R.E.", price: 150, vial: "NA" },
    { name: "Urine Sugar", price: 100, vial: "NA" },
    { name: "VDRL KIT", price: 400, vial: "RED" },
    { name: "Vitamin A", price: 4000, vial: "RED" },
    { name: "Vitamin B12", price: 1500, vial: "RED" },
    { name: "Vitamin C", price: 3500, vial: "RED" },
    { name: "VITAMIN D", price: 1700, vial: "RED" },
    { name: "Vitamin E", price: 2500, vial: "RED" },
    { name: "Vitamin K", price: 4500, vial: "RED" },
    { name: "WIDAL TEST", price: 250, vial: "RED" }
  ];

  let selectedTests = [];
  let uploadedPrescriptionFile = null;

  function getVialClass(vial) {
    if (vial.includes('&') || vial.includes(',')) return 'vial-MULTI';
    if (vial === 'PF') return 'vial-PF';
    return `vial-${vial}`;
  }

  function handlePrescriptionUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    uploadedPrescriptionFile = file;
    document.getElementById('previewFileName').innerText = file.name;
    document.getElementById('previewFileSize').innerText = `${(file.size / 1024).toFixed(1)} KB`;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('previewImg').src = e.target.result;
        document.getElementById('previewImg').style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      document.getElementById('previewImg').src = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
      document.getElementById('previewImg').style.display = 'block';
    }

    document.getElementById('previewContainer').style.display = 'flex';
  }

  function removePrescription() {
    uploadedPrescriptionFile = null;
    document.getElementById('prescriptionFile').value = '';
    document.getElementById('previewContainer').style.display = 'none';
  }

  function renderTests(list) {
    const container = document.getElementById('testList');
    container.innerHTML = '';
    list.forEach((t) => {
      const isChecked = selectedTests.some(item => item.name === t.name);
      const div = document.createElement('div');
      div.className = 'test-item';
      div.innerHTML = `
        <label style="display:flex; align-items:center; cursor:pointer; flex: 1; min-width: 0;">
          <input type="checkbox" onchange="toggleTest('${t.name.replace(/'/g, "\\'")}', ${t.price}, '${t.vial}')" ${isChecked ? 'checked' : ''}>
          <div class="test-title-group">
            <span style="font-weight: 500;">${t.name}</span>
            <span class="vial-tag ${getVialClass(t.vial)}">${t.vial}</span>
          </div>
        </label>
        <span class="test-price">₹${t.price}</span>
      `;
      container.appendChild(div);
    });
  }

  function filterTests() {
    const queryWords = document.getElementById('searchTest').value.toLowerCase().trim().split(/\s+/);
    const filtered = testsData.filter(t => {
      const testName = t.name.toLowerCase();
      return queryWords.every(word => testName.includes(word));
    });
    renderTests(filtered);
  }

  function toggleTest(name, price, vial) {
    const idx = selectedTests.findIndex(t => t.name === name);
    if (idx > -1) {
      selectedTests.splice(idx, 1);
    } else {
      selectedTests.push({ name, price, vial });
    }
    updateTotal();
  }

  function getActiveCollectionCharge() {
    const selectVal = document.getElementById('pCollectionCharge').value;
    if (selectVal === 'custom') {
      const customVal = parseInt(document.getElementById('pCustomCharge').value, 10);
      return isNaN(customVal) || customVal < 0 ? 0 : customVal;
    }
    return parseInt(selectVal, 10) || 0;
  }

  function handleCollectionChargeChange() {
    const selectVal = document.getElementById('pCollectionCharge').value;
    const customInput = document.getElementById('pCustomCharge');
    if (selectVal === 'custom') {
      customInput.style.display = 'block';
      customInput.focus();
    } else {
      customInput.style.display = 'none';
    }
    updateTotal();
  }

  function updateTotal() {
    const testsSubtotal = selectedTests.reduce((acc, curr) => acc + curr.price, 0);
    const collectionCharge = getActiveCollectionCharge();
    const grandTotal = testsSubtotal + collectionCharge;

    document.getElementById('totalDisplay').innerText = grandTotal;
    document.getElementById('selectedCount').innerText = selectedTests.length;
    document.getElementById('footerChargeBadge').innerText = `(+ ₹${collectionCharge} Col.)`;
  }

  function generateReceipt() {
    const name = document.getElementById('pName').value.trim();
    const age = document.getElementById('pAge').value.trim();
    const sex = document.getElementById('pSex').value;
    const doctor = document.getElementById('pDoctor').value.trim() || 'Self';
    const phone = document.getElementById('pPhone').value.trim();
    const address = document.getElementById('pAddress').value.trim();
    const collectionCharge = getActiveCollectionCharge();

    if (!name) {
      alert("অনুগ্ৰহ কৰি Patient Name প্ৰদান কৰক!");
      return;
    }
    if (!phone) {
      alert("অনুগ্ৰহ কৰি Contact Phone Number প্ৰদান কৰক!");
      return;
    }
    if (selectedTests.length === 0 && !uploadedPrescriptionFile) {
      alert("অনুগ্ৰহ কৰি কমেও এটা টেষ্ট বাছক নাইবা Prescription আপলোড কৰক!");
      return;
    }

    document.getElementById('rDate').innerText = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    document.getElementById('rName').innerText = name;
    document.getElementById('rAgeSex').innerText = `${age ? age + ' Y' : ''} / ${sex}`;
    document.getElementById('rDoctor').innerText = doctor;
    document.getElementById('rPhone').innerText = phone;
    document.getElementById('rAddress').innerText = address || 'N/A';

    const pNotice = document.getElementById('rPrescriptionNotice');
    if (uploadedPrescriptionFile) {
      pNotice.style.display = 'flex';
      document.getElementById('rPrescriptionName').innerText = uploadedPrescriptionFile.name;
    } else {
      pNotice.style.display = 'none';
    }

    const tbody = document.getElementById('rTestTableBody');
    tbody.innerHTML = '';
    
    if (selectedTests.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center; color: #64748b; font-style: italic; padding: 12px;">
            (টেষ্টসমূহ আপলোড কৰা প্ৰেছক্ৰিপশ্বন অনুসৰি নিৰ্ধাৰণ কৰা হ'ব)
          </td>
        </tr>
      `;
    } else {
      selectedTests.forEach(t => {
        tbody.innerHTML += `
          <tr>
            <td>${t.name}</td>
            <td><span class="vial-tag ${getVialClass(t.vial)}">${t.vial}</span></td>
            <td style="text-align: right; font-weight: 700; color: #0077b6;">₹${t.price}</td>
          </tr>
        `;
      });
    }

    const testsSubtotal = selectedTests.reduce((acc, curr) => acc + curr.price, 0);
    const grandTotal = testsSubtotal + collectionCharge;

    document.getElementById('rSubTotal').innerText = testsSubtotal;
    document.getElementById('rCollectionCharge').innerText = collectionCharge;
    document.getElementById('rTotal').innerText = grandTotal;
    document.getElementById('receiptModal').style.display = 'block';
  }

  function shareOnWhatsApp() {
    const name = document.getElementById('rName').innerText;
    const ageSex = document.getElementById('rAgeSex').innerText;
    const doctor = document.getElementById('rDoctor').innerText;
    const phone = document.getElementById('rPhone').innerText;
    const address = document.getElementById('rAddress').innerText;
    const date = document.getElementById('rDate').innerText;
    const subTotal = document.getElementById('rSubTotal').innerText;
    const collectionCharge = document.getElementById('rCollectionCharge').innerText;
    const grandTotal = document.getElementById('rTotal').innerText;

    let testListText = selectedTests.length > 0 
      ? selectedTests.map((t, index) => `${index + 1}. ${t.name} [${t.vial}] - ₹${t.price}`).join('\n')
      : "• (Prescription-based tests to be verified by laboratory)";

    let prescriptionText = uploadedPrescriptionFile 
      ? `📄 *Prescription:* Attached (${uploadedPrescriptionFile.name})`
      : `📄 *Prescription:* None / Direct selection`;

    const formattedMessage = `🏥 *MEDITREE CLINIC & DIAGNOSTIC CENTRE LLP*
_Home Sample Collection Booking_
═════════════════════════
📅 *Date:* ${date}
👨‍⚕️ *Ref By Doctor:* ${doctor}
👤 *Patient:* ${name} (${ageSex})
📞 *Phone:* ${phone}
📍 *Address:* ${address}
${prescriptionText}

🧪 *Selected Tests (${selectedTests.length}):*
${testListText}

━━━━━━━━━━━━━━━━━━━━━━━━━
💵 *Tests Subtotal:* ₹${subTotal}
🛵 *Collection Charge:* ₹${collectionCharge}
💰 *Grand Total:* ₹${grandTotal}
═════════════════════════
_Your Health, Our Responsibility._
_Near SKK Civil Hospital, Golaghat_`;

    const encodedText = encodeURIComponent(formattedMessage);
    
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `whatsapp://send?text=${encodedText}`;
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
    }
  }

  function resetForm() {
    if (confirm("সকলো তথ্য মচি নতুন Booking আৰম্ভ কৰিব নেকি?")) {
      document.getElementById('pName').value = '';
      document.getElementById('pAge').value = '';
      document.getElementById('pSex').value = 'Male';
      document.getElementById('pDoctor').value = 'Self';
      document.getElementById('pPhone').value = '';
      document.getElementById('pAddress').value = '';
      document.getElementById('pCollectionCharge').value = '100';
      document.getElementById('pCustomCharge').value = '100';
      document.getElementById('pCustomCharge').style.display = 'none';
      document.getElementById('searchTest').value = '';
      removePrescription();
      selectedTests = [];
      updateTotal();
      renderTests(testsData);
      closeModal();
    }
  }

  function closeModal() {
    document.getElementById('receiptModal').style.display = 'none';
  }

  renderTests(testsData);
  updateTotal();
</script>

</body>
</html>
