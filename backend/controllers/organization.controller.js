
import Organization from "../models/Organization.js";
import User from "../models/User.js";
import validator from "validator"

const generateSlug = (name) =>
    name.toLowerCase().trim().replace(/\s+/g, "-")


export const createOrganization = async (req, res) => {
    try {
        let { name, logo } = req.body

        if (!name) {
            return res.status(400).json({ message: "Organization name required" })
        }

        name = name.trim()

        const slug = generateSlug(name)

        const existsOrg = await Organization.findOne({
            slug
        })

        if (existsOrg) {
            return res.status(400).json({
                message: "Organization already exists"
            })
        }

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                message: "User not Found"
            })
        }

        if (user.role !== "visitor") {
            return res.status(400).json({ message: "Organization already created" })
        }

        const organization = await Organization.create({
            name, slug, logo,
            createdBy: user._id
        })

        user.role = "admin"
        user.organizationId = organization._id
        await user.save()

        res.status(201).json({
            success : true,
            message: "Organization created successfully",

            data:{
                organization,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    organizationId: user.organizationId
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

export const getOrganizations = async(req ,res) => {
    try {
        const organizations = await Organization.find()

        res.json({
            success: true,
            data: organizations
        })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}