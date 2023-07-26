import Input from '../Input'

interface ParamesPanelProps {
    data: any
    setData: any
}

const ParamesPanel = ({ data, setData }: ParamesPanelProps) => {
    return (
        <>
            <Input
                title={data[0].title}
                value={data[0].value}
                setValue={(value: string) => {
                    setData(
                        data.map((d: any) => {
                            if (d.title === "token OpenAI") {
                                d.value = value
                            }
                            return d
                        }
                        )
                    )
                }}
            />
        </>
    )
}

export default ParamesPanel