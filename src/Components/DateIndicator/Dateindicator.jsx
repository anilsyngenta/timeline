import React from 'react'
import "./indicator.css"
export default function Dateindicator({positionX}) {
//  let positionX=localStorage.getItem("dateIndiactor")
    return (
        <div style={{left: `${positionX}px`}} className="indicator">
            <p>{new Date().getDate()}</p>
        </div>
    )
}
