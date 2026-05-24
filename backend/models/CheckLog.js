import mongoose from "mongoose"

const checkLogSchema = new mongoose.Schema({

    passId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pass",
        required: true
    },

    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    checkInTime: {
        type:Date
    },

    checkOutTime: {
        type:Date
    },

    checkedInBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

    checkedOutBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    organizationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required:true,
        index: true
    }
}, {timestamps:true})

export default mongoose.model("CheckLog",checkLogSchema)

