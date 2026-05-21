import mongoose  from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB coonected");
        
    } catch (error) {
        console.log(Error);
        process.exit(1)
    }
}

export default connectDb;