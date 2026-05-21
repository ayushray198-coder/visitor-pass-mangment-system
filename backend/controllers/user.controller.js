
import User from "../models/User.js"

export const getUsers = async (req, res) => {

    try {
        const users = await User.find({
            organizationId: req.user.organizationId
        }).select("-password")

        res.json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params
        const { role } = req.body

        const allowedRoles = ["admin", "employee", "security"]

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "invalid role" })
        }

        const user = await User.findOne({
            _id: userId,
            organizationId: req.user.organizationId
        })

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        if (req.user._id.toString() === user._id.toString()) {
            return res.status(400).json({ message: "You cannot change your own role" })
        }

        user.role = role

        await user.save()

        res.json({
            success: true,
            message: "Role updated successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createStaff =
    async (req, res) => {

        try {

            const {
                email,
                role,
                department,
                notes
            } = req.body;

            if (
                !email ||
                !role
            ) {

                return res.status(400)
                    .json({

                        message:
                            "Email and role are required"

                    });

            }

            const allowedRoles = [

                "admin",

                "employee",

                "security"

            ];

            if (
                !allowedRoles.includes(
                    role
                )
            ) {

                return res.status(400)
                    .json({

                        message:
                            "Invalid role"

                    });

            }

            const user =
                await User.findOne({
                    email
                });

            if (!user) {

                return res.status(404)
                    .json({

                        message:
                            "User not found"

                    });

            }

            user.role = role;

            user.department =
                department;

            user.notes = notes;

            user.organizationId =
                req.user.organizationId;

            await user.save();

            res.json({

                success: true,

                message:
                    "Role assigned successfully",

                data: user

            });

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }