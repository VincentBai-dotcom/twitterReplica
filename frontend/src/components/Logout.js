import React from "react";
import AxiosInstance from "../Axios";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core";
import "./NavButton.css";
import {RiLogoutBoxLine} from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
    button:{
        display: "flex",
        alignItems: "center",
    }
  }));

  

function Logout(){
    const history = useHistory();
    const classes = useStyles();

    function onSubmit(){
        AxiosInstance.post('/api/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        AxiosInstance.defaults.headers['Authorization'] = null;
        window.location.reload(history.push("/home"));
    }

    return (
        <button onClick = {onSubmit} className = {"nav-button"}>
            <div className = {classes.button}>
                <RiLogoutBoxLine/>&nbsp;&nbsp;&nbsp;{"Log out"}
            </div>
        </button>
    );
}

export default Logout;