import OpenAI from "openai"
import config from "./config"
import fs from "fs"

const openai = new OpenAI({
    apiKey: config.openApiKey
})

export async function readOcrFromImage(imagePath: string) {

    const imageAsBase64 = fs.readFileSync(imagePath, "base64")

    const imageForOpenApi = {
        type: "image_url",
        image_url: {
            url: `data:image/png;base64,${imageAsBase64}`
        }
    }

    const stream = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 4096,
        stream: true,
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Hi. This is book page. Can you read the text, skip the header in the top and the page number and the bottom and then return the text from this image in HTML?" },
                    imageForOpenApi
                ]
            }
        ]
    })

    var bufs: string[] = []
    for await (const chunk of stream) {
        const newChunk = chunk.choices[0]?.delta?.content || ''
        console.log("newChunk", newChunk)
        bufs.push(newChunk)
    }

    return bufs
}

// { type: "text", text: "What’s in this image?" },
// {
//     type: "image_url",
//     image_url: {
//         "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
//     },
// }