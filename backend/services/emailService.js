import axios from "axios";

/* OTP EMAIL */

export const sendEmailOTP = async (
  email,
  otp
) => {

  try {

    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

          name: "Visitor Pass",

          email: process.env.EMAIL_USER
        },

        to: [

          {
            email
          }
        ],

        subject: "OTP Verification",

        htmlContent: `

          <div>
            <h2>Your OTP is:</h2>

            <h1>${otp}</h1>
          </div>

        `
      },

      {

        headers: {

          "api-key":
            process.env.BREVO_API_KEY,

          "Content-Type":
            "application/json"
        }
      }
    );

    console.log("OTP Email Sent");

  } catch (error) {

    console.log(
      "Brevo Error:",
      error.response?.data || error.message
    );

  }

};

/* COMMON EMAIL */

export const sendEmail = async ({

  to,

  subject,

  html

}) => {

  try {

    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

          name: "Visitor Pass",

          email: process.env.EMAIL_USER
        },

        to: [

          {
            email: to
          }
        ],

        subject,

        htmlContent: html
      },

      {

        headers: {

          "api-key":
            process.env.BREVO_API_KEY,

          "Content-Type":
            "application/json"
        }
      }
    );

    console.log("Email Sent");

  } catch (error) {

    console.log(
      "Brevo Error:",
      error.response?.data || error.message
    );

  }

};



export const sendPassEmail = async ({
  to
}) => {

  await sendEmail({

    to,

    subject: "Visitor Pass",

    html: `

      <h2>Your Visitor Pass</h2>

    `

  });

};