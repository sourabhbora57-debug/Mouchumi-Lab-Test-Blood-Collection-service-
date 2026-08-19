const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Frontend ফাইলসমূহ (HTML/CSS/JS) থকা folder চাৰ্ভ কৰিবলৈ
app.use(express.static(path.join(__dirname, 'public'))); // যদি ফাইলবোৰ public ফোল্ডাৰত আছে

// Green API Credentials (Render Environment Variables ৰ পৰা ল'ব)
const ID_INSTANCE = process.env.GREEN_API_ID_INSTANCE;
const API_TOKEN_INSTANCE = process.env.GREEN_API_TOKEN_INSTANCE;
const ADMIN_PHONE = process.env.ADMIN_PHONE || '916000219209'; // যিটো নম্বৰত জাননী যাব

// Booking Endpoint
app.post('/api/book-test', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message content is missing.' });
        }

        // Green API SendMessage URL
        const greenApiUrl = `https://api.green-api.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN_INSTANCE}`;

        const payload = {
            chatId: `${ADMIN_PHONE}@c.us`,
            message: message
        };

        const apiResponse = await fetch(greenApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await apiResponse.json();

        if (apiResponse.ok && data.idMessage) {
            return res.status(200).json({ success: true, messageId: data.idMessage });
        } else {
            return res.status(500).json({ success: false, message: 'Green API error' });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
