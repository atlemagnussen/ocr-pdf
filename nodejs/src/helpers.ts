import fs from "fs"
import path from "path"
import config from "./config"

export function getFileNameWithoutExtFromPath(filePath: string) {
    const file = path.parse(filePath)
    return file.name
}


export function getImagesFromOutPath() {
    const imagePaths = fs.readdirSync(config.imagesOutputFolder)
    return imagePaths.map(m => path.join(config.imagesOutputFolder, m))
}

export function getOcrTxtFilesFromOutPath() {
    const imagePaths = fs.readdirSync(config.ocrOutputFolder)
    return imagePaths.map(m => path.join(config.ocrOutputFolder, m))
}

export function getOutputFileNameFromInput(inputPath: string) {
    let filename = getFileNameWithoutExtFromPath(inputPath)
    const filenamePath = path.join(config.imagesOutputFolder, filename)
    return filenamePath
}