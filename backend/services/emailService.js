import axios from "axios";
import fs from "fs"


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

          email: "ayush564rai@gmail.com"
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

  html,

  attachments = []

}) => {

  try {

    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

          name: "Visitor Pass",

          email: "ayush564rai@gmail.com"
        },

        to: [

          {
            email: to
          }
        ],

        subject,

        htmlContent: html,

        attachment: attachments
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
  to,
  pdfPath
}) => {

  await sendEmail({

    to,

    subject: "Visitor Pass",

    html: `

      <h2>Your Visitor Pass</h2>



    `,
    attachments: [
      {
        name: "visitor-Pass.pdf",

        content: fs.readFileSync(pdfPath,
          {
            encoding: "base64"
          }
        )
      }
    ]
  });

};