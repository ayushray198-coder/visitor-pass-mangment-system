import axios from "axios"

export const sendSMSOTP = async (phone, otp) => {
    try {
        await axios.post("https://www.fast2sms.com/dev/bulkV2", {
            variables_values: otp,
            route: "otp",
            numbers: phone
        }, {
            headers: {
                authorization: process.env.SMS_API_KEY, 
                "Content-Type": "application/json"
            }
        })
        console.log("sms sent");
        
    } catch (error) {
          console.log("❌ SMS ERROR:", error.response?.data || error.message);

    }
}