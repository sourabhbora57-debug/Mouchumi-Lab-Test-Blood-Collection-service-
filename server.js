try {
  const url = `https://api.green-api.com/waInstance${process.env.ID_INSTANCE}/sendMessage/${process.env.API_TOKEN_INSTANCE}`;
  
  const payload = {
    chatId: `91${phoneNumber}@c.us`, // নম্বৰৰ ফৰ্মেট পৰীক্ষা কৰক
    message: messageText
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const responseText = await response.text();
  console.log("Green API Response Status:", response.status);
  console.log("Green API Response Body:", responseText);

  if (!response.ok) {
    throw new Error(`Green API Error: ${responseText}`);
  }

  const data = JSON.parse(responseText);
  res.status(200).json({ success: true, data });

} catch (error) {
  console.error("Booking Error:", error.message);
  res.status(500).json({ success: false, error: error.message });
}
