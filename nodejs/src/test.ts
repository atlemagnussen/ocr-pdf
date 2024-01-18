import fs from "fs"
import path from "path"
import os from "os"
import config from "./config"
import { getOcrTxtFilesFromOutPath } from "./helpers"

console.log(config)
const outputFile = path.join(config.outputHtmlFolder, "index.html")

// start with an opening paragraph
fs.appendFileSync(outputFile, "<p>", "utf-8")

// 3. try get from txt to html
async function execute() {
    const pages = await getOcrTxtFilesFromOutPath()
    console.log("pages start", pages.length)
    for (let i = 0; i<pages.length; i++) {
        const page = pages[i]

        const htmlPage = readAndConvertFile(page)
        fs.appendFileSync(outputFile, htmlPage, "utf-8")
    }
    console.log("done converting pages", pages.length)
    
}

function readAndConvertFile(filepath: string) {
    let file = fs.readFileSync(filepath, "utf-8")

    file = file.trim()
    let html = ""

    let skip2ndLineBecauseOfTitle = false
    const lines = file.split(os.EOL)

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()
        
        if (i == 0 && containsOnlyTitle(line)) {
            if (!lines[1])
                skip2ndLineBecauseOfTitle = true
            continue
        }
        if (i == 1 && skip2ndLineBecauseOfTitle)
            continue
        if (i == (lines.length-1) && isLineOnlyNumber(line))
            continue

        if (!line) {
            html = `${html}</p><p>`
        }
        html = `${html}${line}`
    }
    return html
}


function containsOnlyTitle(line: string) {
    if (!line)
        return false
    let split = line.split(" ")
    if (split.length < 2)
        return false

    if (split[0] == "Multidimensional" && split[1] == "Man")
        return true
    return false
}

function isLineOnlyNumber(line: string) {
    if (!line)
        return false
    let num = parseInt(line)
    if (isNaN(num))
        return false
    return true
}

execute().catch((e) => {
    console.error(e)
})