import Visitor from "../models/Visitor.js"
import Appointment from "../models/Appointment.js"
import  CheckLog from "../models/CheckLog.js"

export const getDashboardAnalytics = async (req , res) => {

    try {
       const orgId = req.user.organizationId

        const [totalVisitors, totalAppointments, totalCheckIns, pendingAppointments] = await Promise.all([

            Visitor.countDocuments({organizationId: orgId}),
            Appointment.countDocuments({organizationId:orgId}),
            CheckLog.countDocuments({organizationId: orgId}),
            Appointment.countDocuments({
                organizationId:orgId,
                status: "pending"
            })
        ])
        res.json({
            success: true,
            data:{
                totalVisitors,
                totalAppointments,
                totalCheckIns,
                pendingAppointments
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}