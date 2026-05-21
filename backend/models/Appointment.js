import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visitor",
        required: true
    },

    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       
    },

    purpose: {
        type: String,
        required: true,
        trim: true
    },

    visitDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",

    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    }
}, { timestamps: true })


export default mongoose.model("Appointment", appointmentSchema)