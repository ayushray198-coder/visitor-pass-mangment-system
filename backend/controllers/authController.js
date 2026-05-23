import User from "../models/User.js";
import Otp from "../models/Otp.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import { sendEmailOTP, sendEmail } from "../services/emailService.js";
import console from "console";


// otp genrate krne ke liye 
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// const generateSlug = (name) =>
//   name.toLowerCase().replace(/\s+/g, "-") 



// signup krne ke liye
export const signup = async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;

    email = validator.normalizeEmail(email || "");


    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }


    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOTP();

    // otp delete krne ke liye
    await Otp.deleteMany({ email });

    // photo wala logic 
    let photo = ""

    if (req.file) {
      photo = req.file.path
    }
    console.log(photo)
    
    // verify se pehle temp. data store krne ke liye
    await Otp.create({
      name,
      email,
      password,
      phone,
      photo,

      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    // otp bhjene ke liye
    try {
      await sendEmailOTP(email, otp);
    } catch (err) {
      console.log("Email error:", err.message);
    }

    res.json({
      success: true,
      message: "OTP sent to email"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// otp verify krne ke liey 

export const verifyOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;

    email = validator.normalizeEmail(email || "");

    if (!email || !otp) {
      return res.status(400).json({ message: "Email & OTP required" });
    }


    const record = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (!record.password) {
      return res.status(400).json({
        message: "Signup data missing. Please signup again"
      });
    }


    const hashedPassword = await bcrypt.hash(record.password, 10);



    const user = await User.create({
      name: record.name,
      email: record.email,
      password: hashedPassword,
      role: "visitor",
      phone: record.phone,
      photo: record.photo
    });


    await Otp.deleteMany({ email });

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    )

    res.json({
      success: true,
      message: "Account created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// login krne ke liye
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = validator.normalizeEmail(email || "");


    if (!validator.isEmail(email) || validator.isEmpty(password || "")) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const resetToken = crypto.randomBytes(32).toString("hex")

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")

    user.resetPasswordToken = hashedToken

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    await user.save()

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`

    await sendEmail({

      to: user.email,

      subject: "Reset Your Password",

      html: `

    <div
      style="
        font-family: Arial;
        padding: 20px;
      "
    >

      <h2>
        Password Reset
      </h2>

      <p>
        Click below to reset
        your password
      </p>

      <a
        href="${resetUrl}"

        style="
          display:inline-block;
          padding:12px 20px;
          background:#4f46e5;
          color:white;
          text-decoration:none;
          border-radius:8px;
        "
      >

        Reset Password

      </a>

      <p>
        Link expires in
        15 minutes
      </p>

    </div>

  `

    });

    res.json({
      success: true,
      message: "password reset link generated",

    })



  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params

    const { password } = req.body

    if (!password) {
      return res.status(400).json({ message: "password required" })
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex")


    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now()
      }
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined

    await user.save()

    res.json({
      success: true,
      message: "Password reset successful"
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}