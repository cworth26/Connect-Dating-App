import React from 'react'
import "./dtdiv.css";

const DTDiv = (props) => {
    return (
        <div className="
            d-flex 
            flex-column 
        ">
            {props.children}
        </div>
    )
}

export default DTDiv;
