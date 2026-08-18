const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const ID_INSTANCE = process.env.GREEN_API_INSTANCE_ID || '710722713374';
const API_TOKEN = process.env.GREEN_API_TOKEN;
const ADMIN_PHONE = process.env.ADMIN_PHONE || '916000219209@c.us';

app.post('/api/book-test', async (req, res) => {
    const { name, age, sex, phone, testName, address, date } = req.body;

    if (!name || !phone || !testName || !address) {
        return res.status(400).json({ success: false, message: 'সকলো তথ্য পূৰণ কৰক।' });
    }

    const message = `🩺 *নতুন Blood Test বুকিং!* 🩺\n\n` +
                    `👤 *নাম:* ${name}\n` +
                    `🎂 *বয়স (Age):* ${age || 'N/A'}\n` +
                    `⚧ *লিংগ (Sex):* ${sex || 'N/A'}\n` +
                    `📞 *ফোন:* ${phone}\n` +
                    `🧪 *টেষ্ট:* ${testName}\n` +
                    `📍 *ঠিকনা:* ${address}\n` +
                    `📅 *তাৰিখ:* ${date || 'ASAP'}`;

    try {
        const url = `https://7107.api.greenapi.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`;
        await axios.post(url, { chatId: ADMIN_PHONE, message: message });
        return res.status(200).json({ success: true, message: 'বুকিং সফল হৈছে।' });
    } catch (error) {
        console.error('Green-API Error:', error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, message: 'মেছেজ পঠোৱাত সমস্যা হৈছে।' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`চাৰ্ভাৰ চলি আছে: http://localhost:${PORT}`);
});
