import { Poppler } from "node-poppler"
import path from "path"
import fs from "fs"
import config from "./config"
import { getFileNameWithoutExtFromPath } from "./helpers"

export async function pdfToImage(pdfFilePath: string, from: number, to: number) {

    const fileNameWithoutExt = getFileNameWithoutExtFromPath(pdfFilePath)
    const poppler = new Poppler(config.popplerPath)
    const options = {
        firstPageToConvert: from,
        lastPageToConvert: to,
        pngFile: true,
    }
    
    const outputFilePath = path.join(config.imagesOutputFolder, fileNameWithoutExt)
    
    const res = await poppler.pdfToCairo(pdfFilePath, outputFilePath, options)
    return res
}
