function Button(props:{className: string, text: string, click: () => void}) {
    const text= props.text
    const className = props.className
    const click = props.click
    return (
        <button className={className} onClick={click}>{text}</button>
    )
}

export default Button
