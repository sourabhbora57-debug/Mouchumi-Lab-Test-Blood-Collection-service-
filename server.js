const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const idInstance = process.env.GREEN_API_INSTANCE_ID;
const apiTokenInstance = process.env.GREEN_API_TOKEN;

// আপোনাৰ WhatsApp নম্বৰ (য’ত বুকিঙৰ এলাৰ্ট যাব)
const ADMIN_PHONE = "916000219209";

// ৱেবচাইটৰ Homepage লোড কৰা
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Green API দ্বাৰা বুকিং মেছেজ পঠোৱা
app.post('/api/book-test', async (req, res) => {
    const { patientPhone, message } = req.body;

    if (!idInstance || !apiTokenInstance) {
        console.error("Environment variables missing!");
        return res.status(500).json({ 
            success: false, 
            message: 'Green API Credentials missing in Render Environment Variables.' 
        });
    }

    const greenApiUrl = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    try {
        // ১. ব্যৱসায়ৰ নম্বৰলৈ মেছেজ পঠোৱা
        const adminRes = await fetch(greenApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: `${ADMIN_PHONE}@c.us`,
                message: message
            })
        });

        const adminData = await adminRes.json();

        // ২. ৰোগীৰ নম্বৰলৈ স্বয়ংক্ৰিয় Confirmation পঠোৱা
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

        return res.json({ success: true, data: adminData });
    } catch (error) {
        console.error('Green API Call Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
