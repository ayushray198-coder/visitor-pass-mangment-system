import mongoose from "mongoose";


const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },

    status:{
        type:String,
        enum:[
            "pending",
            "checked-in",
            "checked-out"
        ],
        default: "pending"
    },

    purpose:{
        type:String,
        required:true,
        trim: true
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export default mongoose.model("Visitor", visitorSchema)