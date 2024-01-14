import { pdfToImage } from "./src/poppler"
import {getFileNameWithoutExtFromPath, getImagesFromOutPath } from "./src/helpers"
import fs from "fs"
import path from "path"
import os from "os"
import config from "./src/config"
import { OcrFilePath } from "./src/tesseract"

const pdfFile = "../Multidimensional-Man.pdf"

async function execute() {
    // const res = await pdfToImage(pdfFile, 7, 7).catch(e => {
    //     console.error(e)
    // }).finally(() => {
    //     console.log("done")
    // })

    const imageFilePaths = getImagesFromOutPath()
    console.log(imageFilePaths)
    for (let i = 0; i < imageFilePaths.length; i++) {
        const imagePath = imageFilePaths[i]
        const outputFileName = getFileNameWithoutExtFromPath(imagePath)
        OcrFilePath(imagePath, outputFileName)
    }
}

execute()