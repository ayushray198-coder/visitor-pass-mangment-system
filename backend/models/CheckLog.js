import mongoose from "mongoose"

const checkLogSchema = new mongoose.Schema({

    passId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "pass",
        required: true
    },

    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visitor",
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
        ref: "user"
    },

    organizationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required:true,
        index: true
    }
}, {timestamps:true})

export default mongoose.model("CheckLog",checkLogSchema)

