import { React} from "react";
import {makeStyles} from "@material-ui/core";
import "./NavButton.css";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
        alignItems: "center",
    }
}));

function NavButton(props){
    let history = useHistory();
    const classes = useStyles();

    function onClick(){
        history.push(props.path);
    }


    return(
        <button className = {props.active ? "nav-button active": "nav-button"} onClick = {onClick}>
            <div className = {classes.root}>
                {props.children}&nbsp;&nbsp;&nbsp;{props.text}
            </div>
        </button>
    );
}

export default NavButton;