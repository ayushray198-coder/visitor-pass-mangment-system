import QRCode from "qrcode"
import crypto from "crypto"

import Appointment from "../models/Appointment.js"
import Pass from "../models/Pass.js"


import { generateVisitorPdf } from "../utills/genratePdf.js"
import { sendPassEmail } from "../services/emailService.js"
import User from "../models/User.js"


export const genaratePass = async (req, res) => {
    try {
        const { appointmentId } = req.body

        if (!appointmentId) {
            return res.status(400).json({ message: "Appontment ID required" })
        }

        const appoitnment = await Appointment.findOne({
            _id: appointmentId,
            organizationId: req.user.organizationId
        })

        if (!appoitnment) {
            return res.status(404).json({ message: "Appointment not found" })
        }

        if (appoitnment.status !== "approved") {
            return res.status(400).json({ message: "Appointment not approved" })
        }

        const existsPass = await Pass.findOne({ appointmentId })

        if (existsPass) {

    return res.status(200).json({

        success: true,

        message: "Pass already generated",

        data: existsPass

    });

}

        const passCode = crypto.randomBytes(6).toString("hex");

        const qrPayload = JSON.stringify({
            appointmentId: appoitnment._id,
            visitorId: appoitnment.visitor,
            passCode
        })

        const qrCode = await QRCode.toDataURL(qrPayload)

        const pass = await Pass.create({
            appointmentId: appoitnment._id,
            visitorId: appoitnment.visitor,
            qrCode,
            passCode,
            validTill: appoitnment.visitDate,
            organizationId: appoitnment.organizationId
        })

        const populatedPass = await Pass.findById(pass._id)
        .populate(
            "visitorId",
            "name email phone photo"
        )
        .populate(
            "organizationId",
            "name"
        )
        .populate(
            "appointmentId"
        )

        const visitor = await User.findById(
            appoitnment.visitor
        )

        const pdfPath = await generateVisitorPdf({
            visitorName: visitor.name,
            passCode,
            qrCode,
            photo: visitor.photo
        })
        await sendPassEmail({
            to: visitor.email,
            pdfPath
        })

        res.status(201).json({
            success: true,
            data: {
                pass: populatedPass,
                pdfPath
            }
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Server error" })
    }
}

export const getPasses = async (req , res) => {
    try {
        let passes = []

        if (req.user.role === "visitor") {
            passes = await Pass.find({visitorId:req.user._id})
            .populate("appointmentId")
        }else{
            passes = await Pass.find({organizationId:req.user.organizationId})
            .populate("visitorId","name email photo")
        }

        res.json({
            success: true,
            data: passes
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const getSinglePass = async(req ,res) => {
    try {
        const pass = await Pass.findById(req.params.id)
        .populate("visitorId", "name email phone photo")
        .populate("organizationId","name")
        .populate("appointmentId")

        if(!pass){
            return res.status(404).json({message: "Pass not found"})
        }

        res.json({
            success:true,
            data:pass
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}