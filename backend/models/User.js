import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    department: {
        type: String,
        trim: true
    },

    notes:{
        type: String,
        trim: true
    },

    phone:{
        type: String,
        trim:true
    },

    photo:{
        type: String
    },

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpire:{
        type: String
    },
    role: {
        type: String,
        enum: ["visitor","admin", "security", "employee"],
        default: "visitor"
        
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        index: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema) 