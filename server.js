const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;

// Green API Credentials
const ID_INSTANCE = '710722713374';
const API_TOKEN = 'ba66c849c53047ce98200faea718e7e9ff228978d1df4ad9aa';
const TARGET_CHAT_ID = '916000219209@c.us';

// Website Frontend HTML, CSS & JavaScript
const HTML_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mouchumi Lab Test - Home Collection Service</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        body { background-color: #f0f4f8; padding: 20px 10px; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.08); }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }
        .header h2 { color: #0284c7; font-size: 22px; margin-bottom: 5px; }
        .header p { color: #64748b; font-size: 14px; }
        .form-group { margin-bottom: 16px; }
        label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #1e293b; }
        input, select, textarea { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s; }
        input:focus, select:focus, textarea:focus { border-color: #0284c7; ring: 2px solid #bae6fd; }
        .row { display: flex; gap: 12px; }
        .row .form-group { flex: 1; }
        
        .test-selection { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 16px; }
        .test-selection h4 { font-size: 14px; color: #334155; margin-bottom: 10px; }
        .test-item { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
        .test-item label { margin-bottom: 0; font-weight: normal; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .test-item input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; }
        
        .total-box { background: #e0f2fe; padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .total-box span { font-weight: bold; color: #0369a1; font-size: 16px; }
        
        button { width: 100%; padding: 14px; background-color: #0284c7; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
        button:hover { background-color: #0369a1; }
        button:disabled { background-color: #94a3b8; cursor: not-allowed; }
        
        #status { margin-top: 15px; text-align: center; font-weight: 600; font-size: 14px; padding: 10px; border-radius: 6px; display: none; }
        .status-success { background: #dcfce7; color: #15803d; display: block !important; }
        .status-error { background: #fee2e2; color: #b91c1c; display: block !important; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🩸 Mouchumi Lab Test Service</h2>
            <p>Book Blood & Diagnostic Tests Home Collection</p>
        </div>

        <form id="bookingForm">
            <div class="form-group">
                <label>Patient Full Name *</label>
                <input type="text" id="patientName" required placeholder="Enter name">
            </div>

            <div class="row">
                <div class="form-group">
                    <label>Age *</label>
                    <input type="number" id="age" required placeholder="Age">
                </div>
                <div class="form-group">
                    <label>Sex *</label>
                    <select id="sex" required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>Phone / WhatsApp Number *</label>
                <input type="tel" id="phone" required placeholder="10-digit mobile number">
            </div>

            <div class="form-group">
                <label>Complete Pickup Address *</label>
                <textarea id="address" rows="2" required placeholder="House No, Landmark, Village / Town"></textarea>
            </div>

            <div class="form-group">
                <label>Referred By Doctor / Hospital</label>
                <input type="text" id="referredBy" placeholder="Self / Doctor name">
            </div>

            <div class="row">
                <div class="form-group">
                    <label>Preferred Date *</label>
                    <input type="date" id="date" required>
                </div>
                <div class="form-group">
                    <label>Preferred Time Slot *</label>
                    <select id="timeSlot" required>
                        <option value="">Select Time</option>
                        <option value="06:30 AM - 08:00 AM">06:30 AM - 08:00 AM</option>
                        <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                    </select>
                </div>
            </div>

            <div class="test-selection">
                <h4>Select Tests (or specify other tests below):</h4>
                <div class="test-item">
                    <label><input type="checkbox" class="test-check" data-name="Complete Blood Count (CBC)" data-price="350"> Complete Blood Count (CBC)</label>
                    <span>₹350</span>
                </div>
                <div class="test-item">
                    <label><input type="checkbox" class="test-check" data-name="Blood Sugar (Fasting / PP)" data-price="100"> Blood Sugar (Fasting / PP)</label>
                    <span>₹100</span>
                </div>
                <div class="test-item">
                    <label><input type="checkbox" class="test-check" data-name="Lipid Profile" data-price="600"> Lipid Profile</label>
                    <span>₹600</span>
                </div>
                <div class="test-item">
                    <label><input type="checkbox" class="test-check" data-name="Liver Function Test (LFT)" data-price="700"> Liver Function Test (LFT)</label>
                    <span>₹700</span>
                </div>
                <div class="test-item">
                    <label><input type="checkbox" class="test-check" data-name="Kidney Function Test (KFT)" data-price="700"> Kidney Function Test (KFT)</label>
                    <span>₹700</span>
                </div>
                <div class="test-item">
                    <label><input type="checkbox" class="test-check" data-name="Thyroid Profile (T3, T4, TSH)" data-price="500"> Thyroid Profile (T3, T4, TSH)</label>
                    <span>₹500</span>
                </div>
            </div>

            <div class="form-group">
                <label>Additional / Custom Tests (Optional)</label>
                <textarea id="customTests" rows="2" placeholder="Mention if any other tests are prescribed"></textarea>
            </div>

            <div class="total-box">
                <span>Estimated Total:</span>
                <span id="displayTotal">₹0</span>
            </div>

            <button type="submit" id="submitBtn">Confirm Booking</button>
        </form>
        <div id="status"></div>
    </div>

    <script>
        const testCheckboxes = document.querySelectorAll('.test-check');
        const displayTotal = document.getElementById('displayTotal');
        let currentTotal = 0;

        // Calculate auto total based on checkboxes
        testCheckboxes.forEach(box => {
            box.addEventListener('change', () => {
                let total = 0;
                testCheckboxes.forEach(item => {
                    if (item.checked) {
                        total += parseInt(item.getAttribute('data-price') || 0);
                    }
                });
                currentTotal = total;
                displayTotal.innerText = '₹' + currentTotal;
            });
        });

        // Form submission
        document.getElementById('bookingForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const statusDiv = document.getElementById('status');
            
            btn.disabled = true;
            btn.innerText = 'Submitting Booking...';
            statusDiv.className = '';
            statusDiv.innerText = '';

            let selectedTests = [];
            testCheckboxes.forEach(item => {
                if (item.checked) {
                    selectedTests.push(item.getAttribute('data-name'));
                }
            });

            const custom = document.getElementById('customTests').value.trim();
            if (custom) {
                selectedTests.push(custom);
            }

            const testsSummary = selectedTests.length > 0 ? selectedTests.join(', ') : 'Not specified';

            const payload = {
                patientName: document.getElementById('patientName').value,
                age: document.getElementById('age').value,
                sex: document.getElementById('sex').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                referredBy: document.getElementById('referredBy').value,
                date: document.getElementById('date').value,
                timeSlot: document.getElementById('timeSlot').value,
                testsList: testsSummary,
                grandTotal: currentTotal
            };

            try {
                const response = await fetch('/send-booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const resData = await response.json();

                if (resData.success) {
                    statusDiv.className = 'status-success';
                    statusDiv.innerText = '✅ Booking Confirmed! Our team will contact you shortly.';
                    document.getElementById('bookingForm').reset();
                    displayTotal.innerText = '₹0';
                    currentTotal = 0;
                } else {
                    statusDiv.className = 'status-error';
                    statusDiv.innerText = '❌ Failed to book. Please try again.';
                }
            } catch (err) {
                statusDiv.className = 'status-error';
                statusDiv.innerText = '❌ Connection error. Please check your internet.';
            } finally {
                btn.disabled = false;
                btn.innerText = 'Confirm Booking';
            }
        });
    </script>
</body>
</html>`;

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

    // Serve Frontend UI on Root
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(HTML_PAGE);
        return;
    }

    // Booking Submission API Endpoint
    if (req.method === 'POST' && req.url === '/send-booking') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

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
