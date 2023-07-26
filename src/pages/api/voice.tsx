import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'
import fs from 'fs'
import {Howl, Howler} from 'howler';

export default async function Chat(req: NextApiRequest, res: NextApiResponse) {
    const { fullSpeech, elevenToken } = req.body as any

    let url = 'https://api.elevenlabs.io/v1/text-to-speech/TxGEqnHWrfWFTfGW9XjX'

    try {
        const response = await axios({
            method: 'post',
            url: url,
            // responseType: 'stream',
            data: {
                text: fullSpeech,
                model_id: "eleven_multilingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            },
            headers: {
                accept: 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': elevenToken,
            },
        })

        if (!response.data) return "Can't get voice"

        // crée un fichier audio qui n'est pas un stream
        fs.writeFileSync('./public/test.mp3', response.data)

        // const stream = await fs.createReadStream('test.mp3')

        // stream.pipe(process.stdout)

        return res.status(200).send(response.data)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}