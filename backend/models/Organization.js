import mongoose from "mongoose";

const orgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true
    },
    logo: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default mongoose.model("Organization", orgSchema)