const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Green API Credentials
const ID_INSTANCE = '710722713374';
const API_TOKEN = 'ba66c849c53047ce98200faea718e7e9ff228978d1df4ad9aa';
const TARGET_CHAT_ID = '916000219209@c.us';

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

    // Root route - Serve index.html
    if (req.method === 'GET' && req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error: index.html file not found!');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(content);
            }
        });
        return;
    }

    // Booking endpoint
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
