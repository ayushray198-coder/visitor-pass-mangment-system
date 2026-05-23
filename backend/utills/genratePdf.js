import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
import { start } from "repl"



export const generateVisitorPdf = async ({ visitorName, passCode, qrCode, photo }) => {


    const fileName = `${passCode}.pdf`

    const filePath = path.join("uploads", fileName)
    const doc = new PDFDocument({ size: "A4", margin: 40 })

    // doc.pipe(fs.createWriteStream(filePath))

    const stream = fs.createWriteStream(filePath)

    doc.pipe(stream)

    doc.roundedRect(20, 20, 555, 800, 30)
        .fill("#0f172a")

    doc.roundedRect(40, 40, 515, 90, 25)
        .fill("#4f46e5");

    doc.fillColor("white").fontSize(28).text(
        "VISITOR PASS", 60, 70
    )

    doc.fontSize(14).fillColor("#e2e8f0").text(
        "Secure Visitor Verification System", 60, 105
    )


    if (photo) {
        const imagePath = path.join(process.cwd(), photo)

        if (fs.existsSync(imagePath)) {
            doc.image(imagePath, 430, 55, {
                width: 90, height: 90
            })
        }
    }

    doc.roundedRect(40, 170, 515, 240, 25).fill("#111827")
    doc.fillColor("white").fontSize(24).text(visitorName, 70, 210)
    doc.fillColor("#94a3b8").fontSize(14).text("Visitor Name", 70, 245)

    doc.fillColor("#818cf8").fontSize(26).text(passCode, 70, 320)

    doc.fillColor("#94a3b8").fontSize(14).text(
        "Pass Code", 70, 355
    )

    doc.roundedRect(70, 385, 120, 40, 15).fill("#10b981")

    doc.fillColor("white").fontSize(16).text(
        "ACTIVE", 100, 398
    )

    doc.roundedRect(330, 220, 170, 170, 20).fill("white")

    if (qrCode) {
        const base64Data = qrCode.replace(/^data:image\/png;base64,/, "")
        const qrBuffer = Buffer.from(base64Data, "base64")

        doc.image(qrBuffer, 345, 235, {
            width: 140, height: 140
        })
    }



    doc.fillColor("#64748b").fontSize(13).text(
        "Show this pass at the secrity desc for verification.", 70, 700
    )

    doc.fontSize(11).text(
        "Powered by VisitFlow Managment system", 70, 730
    )

    await new Promise((resolve) => {

        stream.on("finish", resolve)
        doc.end()
    })

    return filePath


}