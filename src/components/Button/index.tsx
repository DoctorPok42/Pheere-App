import styles from './styles.module.scss'

interface ButtonProps {
    title: [string, string]
    value?: boolean
    report?: boolean
    style?: React.CSSProperties
    setReport?: (report: boolean) => void
    setValue?: (value: boolean) => void
}

const Button = ({ title, value, report, style, setValue, setReport }: ButtonProps) => {
    const handleClick = () => {
        if (report)
            setReport!(false)
        else
            setValue!(!value)
    }

    return (
        <button
            className={styles.paramsButton}
            onClick={() => handleClick()}
            style={{
                backgroundColor: value ? "var(--grey-dark)" : "var(--grey-light)",
                color: value ? "var(--white)" : "var(--grey-dark)",
                ...style,
            }}
        >
            {
                value ? title[1] : title[0]
            }
        </button>

    )
}

export default Button