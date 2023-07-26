import { use, useEffect, useState } from 'react'
import Button from '../Button'
import styles from './styles.module.scss'

interface InputProps {
    title?: string
    value: string
    setValue: (value: string) => void
}

const Input = ({ title, value, setValue }: InputProps) => {
    const [change, setChange] = useState<string>(value)
    const [report, setReport] = useState<boolean>(true)

    useEffect(() => {
        if (report) return

        setValue(change)
    }, [report])

    return (
        <div className={styles.input}>
            <label htmlFor={title}>{title}</label>
            <input
                id={title}
                value={change}
                onChange={(e) => setChange(e.target.value)}
            />

            <Button
                title={["Set token", "Token set"]}
                report={report}
                setReport={setReport}
                value={!report}
                style={{
                    position: "inherit",
                    marginLeft: "1rem",
                }}
            />
        </div>
    )
}

export default Input