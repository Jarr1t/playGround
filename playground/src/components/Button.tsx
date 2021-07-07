import React from "react"

interface buttonInfo {
    className: string, 
    text: string, 
    click: React.MouseEvent
}

function Button(props:buttonInfo) {
    const text= props.text
    const className = props.className
    const click = props.click
    return (
        <button className={className} onClick={(event: React.MouseEvent) => {click}}>{text}</button>
    )
}

export default Button
