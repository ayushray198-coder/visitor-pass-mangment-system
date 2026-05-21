import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
    try {
        const { organizationId, purpose, visitDate } = req.body;

        if (!organizationId || !purpose || !visitDate) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const appointment = await Appointment.create({
            visitor: req.user._id,
            purpose,
            visitDate,
            organizationId
        })


        res.status(201).json({
            success: true,
            data:appointment
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const getAppointment = async (req, res) => {
    try {
        let data = []

        if(req.user.role === "visitor") {
            data = await Appointment.find({
                visitor: req.user._id
            })
            .populate(
                "organizationId",
                "name"
            )
        }else{
            data = await Appointment.find({
                organizationId: req.user.organizationId
            })
            .populate(
                "visitor",
                "name email"
            )
        }

        res.json({
            success: true,
            data
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body

        const allowed = ["approved", "rejected"]

        if (!allowed.includes(status)) {
            return res.status(400).json({ message: "invalid status" })
        }

        const appoinment = await Appointment.findOne({
            _id: appointmentId,
            organizationId: req.user.organizationId
        })

        if (!appoinment) {
            return res.status(404).json({ message: "Appointment not found" })
        }

        appoinment.status = status;


        await appoinment.save()

        res.json({
            success: true,
            message: `Appointment ${status}`
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}