import { SpeechType } from "@/types/speech";
import { OpenAI } from 'openai-streams/node'

interface ChatProps {
    speech: SpeechType[];
    gptToken: string;
    setSpeech: (speech: SpeechType[]) => void;
    setFullSpeech: (fullSpeech: string) => void;
}

const Chat = async ({ speech, gptToken, setSpeech, setFullSpeech }: ChatProps) => {
    const lastMessage = speech[speech.length - 1]
    const speechId = lastMessage.id + 1

    try {
        const stream = await OpenAI('chat', {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are Pheere, a virtual assistant.\
                    Your reply is concise and mischievous.\
                    As a voice assistant, you speak to your users.\
                    Your answers should be as concise as possible for each response.\
                    If you generate a list, please limit the number of items to a maximum of five.\
                    In general, you provide concise answers, unless the user asks you to elaborate.\
                    Sometimes, at the end of your answers, you ask the user to continue the conversation (if you get the impression that they want to talk).\
                    In a conversation, you try to get the other person out of their comfort zone.\
                    Make sure to spell out all numbers. \
                    In your answer never write a simple dash or other special characters.\
                    Your answers is on the language of the user.\
                    Time: ${new Date().toLocaleString('fr-FR', {
                        timeZone: 'Europe/Paris',
                    })}`
                },
                {
                    role: 'user',
                    content: lastMessage.text,
                },
            ],
        }, {
            apiKey: gptToken,
        }) as any

        let text = ''

        for await (const message of stream) {
            text += Buffer.from(message).toString('utf-8')

            const newMessage2 = {
                id: speechId,
                type: "answer",
                text: text,
            } as SpeechType

            setSpeech([
                ...speech,
                newMessage2
            ])
        }

        setFullSpeech(text)
    } catch (error) {
        return null
    }

    return
}

export default Chat