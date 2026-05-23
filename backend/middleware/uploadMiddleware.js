import multer from "multer";

import {CloudinaryStorage} from "multer-storage-cloudinary"

import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Visitor-pass-system",
        allowed_formats: ["jpg", "jpeg", "png"]
    }
})


const fileFilter = (req , file ,cb) => {
    const allowed = [
        "image/png",
        "image/jpeg",
        "image/jpg"
    ]

    if(allowed.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(
            new Error("Only image files allowed"),
            false
        )
    }
}

const upload = multer({
    storage,
    fileFilter
})

export default upload