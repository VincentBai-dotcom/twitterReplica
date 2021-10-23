import { Modal, Backdrop, makeStyles,} from "@material-ui/core";
import Login from "./Login";
import "./NavButton.css";
import {RiLoginBoxLine} from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'center',
    },
    paper: {
        borderRadius: '40px',
        display: 'flex',
        backgroundColor: 'white',
        margin: theme.spacing(6,5,13,5),
        padding: theme.spacing(6),
    },
    button:{
        display: "flex",
        alignItems: "center",
    }
  }));



function LoginModal(props){
    
    const classes  = useStyles();

    function handleClick(){
        props.setOpen(!props.open);
    }

    return(
        <div>
            <button onClick = {handleClick} className = {"nav-button"}>
                <div className = {classes.button}>
                    <RiLoginBoxLine/>&nbsp;&nbsp;&nbsp;Log in
                </div>
            </button>
            <Modal
                open = {props.open}
                onClose = {handleClick}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className = {classes.modal}
                BackdropComponent = {Backdrop}
                BackdropProps = {{
                    timeout: 500,
                }}>
                <div className = {classes.paper}>
                    <Login handleClose = {handleClick}/>
                </div>
            </Modal>
        </div>
    );
}


export default LoginModal;

