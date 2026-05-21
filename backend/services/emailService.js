import nodemailer from "nodemailer";

const getTransporter = () => {

  return nodemailer.createTransport({

    service: "gmail",

    secure: true,

    port: 465,

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS

    }

  });

};

/* OTP EMAIL */

export const sendEmailOTP = async (
  email,
  otp
) => {

  try {

    const transporter =
      getTransporter();

    await transporter.sendMail({

      from:
        `"Visitor Pass" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "OTP Verification",

      html: `

        <h2>
          Your OTP is:
          ${otp}
        </h2>

      `

    });

  } catch (error) {

    console.log(
      "Email Error:",
      error.message
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

    const transporter =
      getTransporter();

    await transporter.sendMail({

      from:
        `"Visitor Pass" <${process.env.EMAIL_USER}>`,

      to,

      subject,

      html,

      attachments

    });

  } catch (error) {

    console.log(
      "Email Error:",
      error.message
    );

  }

};

/* PASS EMAIL */

export const sendPassEmail = async ({
  to,
  pdfPath
}) => {

  await sendEmail({

    to,

    subject: "Visitor Pass",

    html: `
      <h2>
        Your Visitor Pass
      </h2>
    `,

    attachments: [

      {
        filename:
          "visitor-pass.pdf",

        path: pdfPath
      }

    ]

  });

};