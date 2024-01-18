import { pdfToImage } from "./poppler"
import {getFileNameWithoutExtFromPath, getImagesFromOutPath } from "./helpers"
import { OcrFilePath } from "./tesseract"

const pdfFile = "../../Book.pdf"

// scanned pdf ocr
// .env file for setting the paths
async function execute() {

    // 1. split scanned pdf to individual pages of png
    const res = await pdfToImage(pdfFile, 1, 229).catch((e: any) => {
        console.error(e)
    }).finally(() => {
        console.log("done converting pdf to images")
    })

    // 2. OCR each page into txt file with tesseract
    const imageFilePaths = getImagesFromOutPath()
    console.log("images to convert", imageFilePaths.length)
    for (let i = 0; i < imageFilePaths.length; i++) {
        const imagePath = imageFilePaths[i]
        const outputFileName = getFileNameWithoutExtFromPath(imagePath)
        const res = await OcrFilePath(imagePath, outputFileName)
        console.log("result", res)
    }
}

execute()