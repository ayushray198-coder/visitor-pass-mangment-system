import {Parser} from "json2csv"

import fs from "fs"
import path from "path"

export const exportToCsv = async ({data, fields, fileName}) => {
    const parser = new Parser({fields})

    const csv = parser.parse(data)

    const filePath = path.join(
        "exports",
        `${fileName}.csv`
    )

    fs.writeFileSync(filePath,csv)

    return filePath
}