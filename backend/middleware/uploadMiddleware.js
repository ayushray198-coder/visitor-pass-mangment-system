import multer from  "multer"
import path from "path"

const storage = multer.diskStorage({
    destination:
    function (req , file , cb) {
        cb(
            null,
            "uploads/"
        )
    },
    filename: 
    function (req ,file ,cb) {
        cb(
            null, Date.now() + path.extname(file.originalname)
        )
    }
})

const fileFilter = (req ,file, cb) =>{
    const allowed = [
        "image/png",
        "image/jpeg",
        "image/jpg"
    ]

    if(allowed.includes(file.mimetype)) {
        cb(null, true)
    } else (
        cb(
            new Error(
                "Only image files allowed"
            ), false
        )
    )
}

const upload = multer({
    storage,
    fileFilter
})

export default upload 