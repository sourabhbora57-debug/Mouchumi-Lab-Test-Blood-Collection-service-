const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// public ফোল্ডাৰটো static ফাইলৰ বাবে serve কৰা হৈছে
app.use(express.static(path.join(__dirname, 'public')));

const idInstance = process.env.GREEN_API_INSTANCE_ID;
const apiTokenInstance = process.env.GREEN_API_TOKEN;
const ADMIN_PHONE = "916000219209";

// public/index.html ফাইলটো Homepage হিচাপে লোড কৰা
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Green API বুকিং API
app.post('/api/book-test', async (req, res) => {
    const { patientPhone, message } = req.body;

    if (!idInstance || !apiTokenInstance) {
        return res.status(500).json({ 
            success: false, 
            message: 'Green API Credentials missing in Render Environment.' 
        });
    }

    const greenApiUrl = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    try {
        // ১. ব্যৱসায়ৰ WhatsApp নম্বৰলৈ মেছেজ
        await fetch(greenApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: `${ADMIN_PHONE}@c.us`,
                message: message
            })
        });

        // ২. ৰোগীৰ নম্বৰলৈ স্বয়ংক্ৰিয় Confirmation
        let cleanPatientPhone = (patientPhone || "").replace(/[^0-9]/g, '');
        if (cleanPatientPhone.length === 10) {
            cleanPatientPhone = '91' + cleanPatientPhone;
        }

        if (cleanPatientPhone.length >= 12) {
            await fetch(greenApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chatId: `${cleanPatientPhone}@c.us`,
                    message: `নমস্কাৰ! Mouchumi Lab Test Blood Collection service-ত আপোনাৰ অনুৰোধ লাভ কৰা হৈছে। অতি সোনকালে আমি যোগাযোগ কৰিম।\n\n${message}`
                })
            });
        }

        return res.json({ success: true });
    } catch (error) {
        console.error('Green API Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
