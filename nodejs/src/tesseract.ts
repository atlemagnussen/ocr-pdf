import { exec } from "child_process"
import config from "./config"
import fs from "fs"
import path from "path"

export function OcrFilePath(filepath: string, outfile: string) {
    const outFileName = `./${outfile}.txt`
    console.log("out", outfile)

    return new Promise((resolve, reject) => {
        exec(`tesseract ${filepath} ${outfile} -l eng`, (error, stdout, stdin) => {
            if (!error) {
                const outFileNewPath = path.join(config.ocrOutputFolder, outFileName)
                resolve(outFileNewPath)
    
                fs.rename(outFileName, outFileNewPath, (err) => {
                    if (err)
                        reject(err)
                })
            }
            else 
                reject(error)
        })
    })
}