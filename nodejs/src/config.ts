import dotenv from "dotenv"
import path from "path"
import fs from "fs"

const thisRootPath = process.cwd()

const environment = process.env.NODE_ENV ?? ""
console.log("env", environment)

const envFile = environment ? `.env.${environment}` : ".env"
const envFilePath = path.join(thisRootPath, envFile)
console.log(`environment: ${environment}, envFilePath: ${envFilePath}`)

const config = dotenv.config({ path: envFilePath})

const popplerPath = process.env.POPPLER_PATH as string
const openApiKey =  process.env.OPENAPI_KEY as string

const imagesSubPath = process.env.IMAGES_OUTPUT_PATH as string
const imagesOutputFolder = path.join(thisRootPath, imagesSubPath)

if (!fs.existsSync(imagesOutputFolder))
    fs.mkdirSync(imagesOutputFolder)

const outputSubPath = process.env.OCR_OUTPUT as string
const ocrOutputFolder = path.join(thisRootPath, outputSubPath)

if (!fs.existsSync(ocrOutputFolder))
    fs.mkdirSync(ocrOutputFolder)

const outputHtmlSubPath = process.env.HTML_OUTPUT as string
const outputHtmlFolder = path.join(thisRootPath, outputHtmlSubPath)

if (!fs.existsSync(outputHtmlFolder))
    fs.mkdirSync(outputHtmlFolder)

export default {
    popplerPath,
    openApiKey,
    imagesOutputFolder,
    ocrOutputFolder,
    outputHtmlFolder
}

