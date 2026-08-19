import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Green API Credentials
const ID_INSTANCE = '710722713374';
const API_TOKEN = 'ba66c849c53047ce98200faea718e7e9ff228978d1df4ad9aa';
const TARGET_CHAT_ID = '916000219209@c.us';

app.post('/send-booking', async (req, res) => {
    try {
        const { patientName, age, sex, phone, address, referredBy, testsList, grandTotal, date, timeSlot } = req.body;

        const message = `*📋 NEW HOME COLLECTION SCHEDULED*
--------------------------------
👤 *Patient Name:* ${patientName}
🎂 *Age / Sex:* ${age} Yrs / ${sex}
📞 *Phone:* ${phone}
📍 *Pickup Address:* ${address}
🩺 *Referred By:* ${referredBy}
🗓 *Date:* ${date}
⏰ *Time Slot:* ${timeSlot}
--------------------------------
🧪 *Selected Tests:*
${testsList}
--------------------------------
💰 *Grand Total: ₹${grandTotal}*`;

        const url = `https://api.green-api.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`;

        const response = await axios.post(url, {
            chatId: TARGET_CHAT_ID,
            message: message
        });

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Lab Test Booking Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
