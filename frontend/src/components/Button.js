import React from "react";
import "./NavButton.css";

function Button(props){
    return(
        <button onClick = {props.onClick} style = {{width: props.width}} className = {"button"} type= {props.type} >
            {props.text}
        </button>
    );
}

export default Button;