const express = require('express');
const path = require('path');

const app = express();

// JSON ডাটা আৰু URL-encoded ডাটা গ্ৰহণ কৰিবলৈ
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend ফাইলসমূহ (HTML/CSS/JS) থকা ফোল্ডাৰ
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Green API Credentials
const ID_INSTANCE = process.env.GREEN_API_ID_INSTANCE;
const API_TOKEN_INSTANCE = process.env.GREEN_API_TOKEN_INSTANCE;
const ADMIN_PHONE = process.env.ADMIN_PHONE || '916000219209';

// Health check endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Booking API Endpoint (Direct WhatsApp Message via Green API)
app.post('/api/book-test', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message content is missing.' });
        }

        // Green API URL
        const greenApiUrl = `https://api.green-api.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN_INSTANCE}`;

        const payload = {
            chatId: `${ADMIN_PHONE}@c.us`,
            message: message
        };

        const apiResponse = await fetch(greenApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await apiResponse.json();

        if (apiResponse.ok && data.idMessage) {
            return res.status(200).json({ success: true, messageId: data.idMessage });
        } else {
            console.error('Green API Response Error:', data);
            return res.status(500).json({ success: false, message: 'Green API error occurred.', details: data });
        }
    } catch (error) {
        console.error('Server Internal Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
