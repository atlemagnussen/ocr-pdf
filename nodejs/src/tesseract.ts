import { exec } from "child_process"
import config from "./config"
import fs from "fs"
import path from "path"

export async function OcrFilePath(filepath: string, outfile: string) {
    const outFileName = `./${outfile}.txt`
    console.log("out", outfile)
    const res = exec(`tesseract ${filepath} ${outfile} -l eng`, (error, stdout, stdin) => {
        if (!error) {
            console.log("move from", outFileName)
            const outFileNewPath = path.join(config.ocrOutputFolder, outFileName)
            console.log("move to", outFileNewPath)

            fs.rename(outFileName, outFileNewPath, (err) => {
                console.log("mv file", err)
            })
        }
        else 
            console.error(error)
    })
}