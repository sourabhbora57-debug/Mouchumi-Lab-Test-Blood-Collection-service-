    // Green API Backend Integration Form Trigger
    document.getElementById('bookingForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBookingBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Booking in progress...';

        const name = document.getElementById('patientName').value.trim();
        const age = document.getElementById('patientAge').value.trim();
        const sex = document.getElementById('patientSex').value;
        const phone = document.getElementById('patientPhone').value.trim();
        const address = document.getElementById('patientAddress').value.trim();
        
        // Referred By মান সংগ্ৰহ (খালী থাকিলে 'Self' হ'ব)
        const referredBy = document.getElementById('referredBy').value.trim() || 'Self (নিজাববীয়াকৈ)';

        let total = 0;
        const testList = [];
        selectedTests.forEach((price, tName) => {
            total += price;
            testList.push(`• ${tName} (₹${price})`);
        });

        const formattedMessage = `*📋 NEW HOME COLLECTION SCHEDULED*\n` +
            `--------------------------------\n` +
            `👤 *Patient Name:* ${name}\n` +
            `🎂 *Age / Sex:* ${age} Yrs / ${sex}\n` +
            `📞 *Phone:* ${phone}\n` +
            `📍 *Pickup Address:* ${address}\n` +
            `🩺 *Referred By:* ${referredBy}\n` +
            `🗓 *Date:* ${chosenDate}\n` +
            `⏰ *Time Slot:* ${chosenSlot}\n` +
            `--------------------------------\n` +
            `🧪 *Selected Tests (${selectedTests.size}):*\n${testList.join('\n')}\n` +
            `--------------------------------\n` +
            `💰 *Grand Total: ₹${total.toLocaleString()}*`;

        try {
            const response = await fetch('/api/book-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientPhone: phone,
                    message: formattedMessage
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('ধন্যবাদ! আপোনাৰ তেজ সংগ্ৰহৰ অনুৰোধ সফলভাৱে পঠিওৱা হ’ল। অতি সোনকালে আমি যোগাযোগ কৰিম।');
                document.getElementById('bookingForm').reset();
                selectedTests.clear();
                updateUI();
                closeScheduleModal();
            } else {
                alert('Error: ' + (data.message || 'মেছেজ পঠিওৱাত সমস্যা হৈছে।'));
            }
        } catch (err) {
            console.error(err);
            alert('চাৰ্ভাৰৰ লগত সংযোগ স্থাপন নহ’ল! অনুগ্ৰহ কৰি Render Settings পৰীক্ষা কৰক।');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Confirm home collection <i class="fa-solid fa-arrow-right"></i>';
        }
    });
