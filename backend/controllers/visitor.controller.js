import Visitor from "../models/Visitor.js";
import validator from "validator"
import { getPagination } from "../utills/pagination.js";

export const createVisitor = async (req, res) => {
    try {
        let { name, phone, email, purpose } = req.body;

        if (!name || !email || !purpose) {
            return res.status(400).json({ message: "Name an Email required" })
        }

        name = name.trim();
        email = validator.normalizeEmail(email)

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }

        if (phone && !validator.isMobilePhone(phone, "en-IN")) {
            return res.status(400).json({ message: "Invalid phone" })
        }

        const exist = await Visitor.findOne({
            email,
            organizationId: req.orgId
        })

        if (exist) {
            return res.status(400).json({ message: "Visitor already exists" })
        }

        const visitor = await Visitor.create({
            name,
            email,
            phone,
            purpose,
            organizationId: req.user.orgId,
            createdBy: req.user._id
        })

        res.status(201).json({
            success: true,
            data: visitor
        })
    } catch (error) {
        res.status(500).json({ message: "Server error " })
    }
}

export const getVisitor = async (req, res) => {
    try {
        const { page, limit, search } = req.query

        const { currentPage, perPage, skip } = getPagination(page, limit)

        const query = { organizationId: req.orgId }

        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            }
        }

        const visitor = await Visitor.find(query)
            .skip(skip)
            .limit(perPage)
            .sort({ createdAt: -1 })

        const total = await Visitor.countDocuments(query)

        res.json({
            success: true,
            currentPage,
            totalPage: Math.ceil(total / perPage),
            total,
            data: visitor
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}