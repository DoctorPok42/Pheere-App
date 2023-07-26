import { Skeleton } from "@mui/material";
import { useWhisper } from '@chengsokdara/use-whisper'
import { useEffect } from "react";
import { SpeechType } from "../types/speech"
import Chat from "./chat"
// import Voice from "./voice"
import dotenv from 'dotenv'

dotenv.config()

interface SpeechProps {
    speech: SpeechType[];
    loading: boolean;
    fullSpeech: string;
    data: any;
    setLoading: (loading: boolean) => void;
    setSpeech: (speech: SpeechType[]) => void;
    setFullSpeech: (fullSpeech: string) => void;

}

const Speech = ({ speech, loading, fullSpeech, data, setLoading, setSpeech, setFullSpeech }: SpeechProps) => {
    // const gptToken = data.find((d: any) => d.title === "token OpenAI")?.value
    // const elevenToken = data.find((d: any) => d.title === "token ElevenLabs")?.value
    const gptToken = process.env.GPT_TOKEN as string
    // const elevenToken = process.env.ELEVENLAS_TOKEN

      const { transcript, recording, startRecording } = useWhisper({
        apiKey: gptToken,
        removeSilence: true,
        timeSlice: 500,
        streaming: true,
        nonStop: true,
        stopTimeout: 1_000,
        whisperConfig: {
            language: 'fr',
        },
        onDataAvailable: () => {
            setLoading(false)
        },
    })

    const setNewMessage = async () => {
        const newMessage = {
            id: speech.length,
            type: "question",
            text: transcript.text,
        } as SpeechType

        await setSpeech([
            ...speech,
            newMessage
        ])
    }

    useEffect(() => {
        if (!transcript.text) return

        if (!loading) {
            setNewMessage()
        }
    }, [recording])

    useEffect(() => {
        if (speech[speech.length - 1].type === "question") {
            Chat({ speech, gptToken, setSpeech, setFullSpeech })
        }
    }, [speech])

    // useEffect(() => {
    //     if (speech[speech.length - 1].type === "answer") {
    //         Voice({ fullSpeech, elevenToken })
    //     }
    // }, [fullSpeech])

    return (
        <div className="speech">
        <button onClick={() => {
            startRecording()
            setLoading(true)
        }}>
            Ask a question
        </button>
            {speech.map((message, index) => (
                <h2 key={index} style={{
                    color: message.type === "question" ? "var(--grey)" : "var(--black)"
                }}>{message.text}</h2>
            ))}
            {recording &&  <Skeleton height={30} />}
        </div>
    )
}

export default Speech