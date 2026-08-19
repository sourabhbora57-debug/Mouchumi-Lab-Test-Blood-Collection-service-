import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.json.JSONObject;

public void sendBookingViaGreenApi(Context context, String patientName, String age, String sex, 
                                   String phone, String address, String referredBy, 
                                   String testsList, int grandTotal, String date, String timeSlot) {

    // সেউজ API ক্ৰিডেনচিয়েল
    String idInstance = "710722713374";
    String apiToken = "ba66c849c53047ce98200faea718e7e9ff228978d1df4ad9aa";

    // লেবৰ WhatsApp নম্বৰ (Country code সহ আৰু শেষত @c.us থাকিব লাগিব)
    String targetChatId = "916000219209@c.us";

    // মেছেজৰ ফৰ্মেট
    StringBuilder message = new StringBuilder();
    message.append("*📋 NEW HOME COLLECTION SCHEDULED*\n")
           .append("--------------------------------\n")
           .append("👤 *Patient Name:* ").append(patientName).append("\n")
           .append("🎂 *Age / Sex:* ").append(age).append(" Yrs / ").append(sex).append("\n")
           .append("📞 *Phone:* ").append(phone).append("\n")
           .append("📍 *Pickup Address:* ").append(address).append("\n")
           .append("🩺 *Referred By:* ").append(referredBy).append("\n")
           .append("🗓 *Date:* ").append(date).append("\n")
           .append("⏰ *Time Slot:* ").append(timeSlot).append("\n")
           .append("--------------------------------\n")
           .append("🧪 *Selected Tests:*\n").append(testsList).append("\n")
           .append("--------------------------------\n")
           .append("💰 *Grand Total: ₹*").append(grandTotal);

    // Green API Endpoint URL
    String url = "https://api.green-api.com/waInstance" + idInstance + "/sendMessage/" + apiToken;

    OkHttpClient client = new OkHttpClient();

    new Thread(() -> {
        try {
            // JSON Body তৈয়াৰ কৰা হৈছে
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("chatId", targetChatId);
            jsonBody.put("message", message.toString());

            RequestBody body = RequestBody.create(
                    jsonBody.toString(),
                    MediaType.parse("application/json; charset=utf-8")
            );

            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .build();

            Response response = client.newCall(request).execute();

            // UI Thread ত ফলাফল/Toast প্ৰদৰ্শন
            new Handler(Looper.getMainLooper()).post(() -> {
                if (response.isSuccessful()) {
                    Toast.makeText(context, "বুকিং মেছেজ সফলভাৱে পঠোৱা হ'ল!", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(context, "মেছেজ পঠোৱাত ব্যৰ্থ হ'ল: Code " + response.code(), Toast.LENGTH_SHORT).show();
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
            new Handler(Looper.getMainLooper()).post(() -> {
                Toast.makeText(context, "নেটৱৰ্কত কিবা সমস্যা হৈছে!", Toast.LENGTH_SHORT).show();
            });
        }
    }).start();
}
