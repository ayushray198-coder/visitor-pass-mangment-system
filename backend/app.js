import express from "express"
import cors from "cors"
import path from "path"
import authRoutes from "./routes/authRoutes.js"
import visitorRoutes from "./routes/visitorRoutes.js"
import appointmentRoutes from "./routes/appoinmentRoutes.js"
import passRoutes from "./routes/passRoutes.js"
import checklogRoutes from "./routes/checklogRoutes.js"
import analyticsRoutes from "./routes/analyticsRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import organizationRoutes from "./routes/organizationRoutes.js"


const app = express()

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/uploads", express.static(
    path.join(process.cwd(), "uploads")
))

app.use("/api/auth", authRoutes)
app.use("/api/visitor", visitorRoutes)
app.use("/api/appointment", appointmentRoutes)
app.use("/api/pass", passRoutes)
app.use("/api/checklog", checklogRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/users", userRoutes)
app.use("/api/organization", organizationRoutes)

export default app