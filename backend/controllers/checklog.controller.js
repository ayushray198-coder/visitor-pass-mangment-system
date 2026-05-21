
import CheckLog from "../models/CheckLog.js"
import Pass from "../models/Pass.js"

export const checkInVisitor = async (req , res) =>{
    try {
        const {passCode} = req.body

        if (!passCode) {
            return res.status(400).json({message: "pass cod required"})
        }

        const pass = await Pass.findOne({
            passCode,
            organizationId: req.orgId
        })

        if (!pass) {
            return res.status(404).json({message: "pass not found"})
        }

        if(pass.status === "used") {
            return res.status(400).json({message: "pass already used"})
        }

        if (new Date(pass.validTill) < new Date()) {
            return res.status(400).json({message: "pass expired"})
        }

        const log = await CheckLog.create({
            passId: pass._id,
            visitorId: pass.visitorId,
            checkInTime: new Date(),
            checkedInBy: req.user._id,
            organizationId: req.orgId
        })

        pass.status = "used"

        await pass.save()

        res.json({
            success: true,
            message: "Visitor checked in",
            data:log
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



export const checkOutVisitor = async (req ,res) =>{
    try {
        const {passCode} = req.body

        const pass = await Pass.findOne({
            passCode,
            organizationId: req.orgId
        })

        if (!pass) {
            return res.status(404).json({message: "pass not found"})
        }

        const log = await CheckLog.findOne({
            passId: pass._id,
            organizationId: req.user.organizationId,
            checkOutTime:null
        })

        if (!log) {
            return res.status(404).json({message: "check-in log not found"})
        }

        if (log.checkOutTime) {
            return res.status(400).json({message: "Already checked out"})
        }

        log.checkOutTime = new Date()

        log.checkedOutBy = req.user._id

        pass.status = "expired"

        await log.save()

        res.json({
            success: true,
            message:"Visitor checked out"
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getCheckLogs = async(req , res) => {
    try {
        const logs = await CheckLog.find({
            organizationId: req.user.organizationId
        })

        .populate("visitorId","name email")
        .populate("passId","passCode")
        .sort({createdAt: -1})

        res.json({
            success: true,
            data: logs
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}