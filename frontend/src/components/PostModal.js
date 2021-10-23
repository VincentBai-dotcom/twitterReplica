import { React, useContext, useState} from "react";
import "./NavButton.css";
import Button from "./Button";
import { Modal, Backdrop, makeStyles, TextField, Container, Grid} from "@material-ui/core";
import { UserContext } from "../App";
import AxiosInstance from "../Axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'center',
    },
    paper: {
        borderRadius: '40px',
        display: 'inline-block',
        backgroundColor: 'white',
        margin: theme.spacing(6,5,13,5),
        padding: theme.spacing(6),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
  }));

function PostModal(props){
    const history = useHistory();
    const user = useContext(UserContext);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState({title: "", description: "", author: 0});

    function handleClick(){
        if(user["username"] === 'noUser!')
            props.setLoginOpen(true);
        else if(user["username"]){
            setStatus(prevState =>({
                ...prevState,
                author: user["id"]
            }));
            setOpen(!open);
        }
    }

    function handleChange(e){
        const {name, value} = e.target;
        setStatus(prevState => ({
            ...prevState,
            [name]: value
         }));
    }

    function handleSubmit(e){
        e.preventDefault();

        AxiosInstance
            .post("/api/post/", status)
            .then((res)=>{
                console.log(res);
                setOpen(false);
                history.push("/");
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    return(
        <div>
            <Button onClick = {handleClick} width = "170px" text = "Post"/>
            <Modal
                open = {open}
                onClose = {() => {setOpen(!open);}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className = {classes.modal}
                BackdropComponent = {Backdrop}
                BackdropProps = {{
                    timeout: 500,
                }}>
                <div className = {classes.paper}>
                    <Container component="main" maxWidth="xs">
                    <h1>Post</h1>
                    <form className={classes.form} onSubmit = {handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                            onChange = { (e) => handleChange(e)}
                            value = {status.title}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            maxRows = {12}
                            multiline
                            minRows = {4}
                            name="description"
                            label="Description"
                            id="description"
                            onChange = { (e) => handleChange(e)}
                            value = {status.description}
                        />
                        <br/>
                        <br/>
                        <Grid container>
                            <Grid item xs = {8}></Grid>
                            <Grid item>
                                <Button text = "Submit" type = "submit" width = "120px" />
                            </Grid>
                        </Grid>
                        
                    </form>
                        {/* <div>
                        <h1>Post</h1>
                        <form className = {classes.form}>
                            <TextField
                                margin="normal"
                                multiline
                                rows = {3}
                                required
                                fullWidth
                                value = {text}
                                autoFocus
                                onChange = { (e) => handleChange(e)}
                            />
                        </form>
                        <Button
                            type = "submit"
                            width = "120px"
                            text = "Submit"/>
                        </div> */}
                    </Container>
                </div>
            </Modal>
        </div>
    );
}

export default PostModal;