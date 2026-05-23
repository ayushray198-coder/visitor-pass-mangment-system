import mongoose from "mongoose"

const passSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },

    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    qrCode: {
        type: String,
        required: true,
    },

    passCode: {
        type: String,
        required: true,
        unique: true
    },

    validTill: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["active", "used", "expired"],
        default: "active"
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
        index: true
    }

}, { timestamps: true })

export default mongoose.model("Pass", passSchema)