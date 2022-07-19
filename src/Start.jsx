import React from "react"

export default function Start(props) {
    return (
        <div className="container--start">
            <h1>Quizzical</h1>
            <h3>Some description if needed</h3>
            <button className="btn--start" onClick={props.begin}>Start quiz</button>
        </div>
    )
}