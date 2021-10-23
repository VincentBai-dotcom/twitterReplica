import React, { useState } from "react";
import AxiosInstance from "../Axios";
import {Button, makeStyles, TextField, Typography
    , Container} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
  }));


function Signup(props){
    const classes  = useStyles();
    const history = useHistory();
    const [account, setAccount] = useState({username: '', email: '', password: ''});
    function handleChange(e){
        const {name, value} = e.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value
         }));
    }


    function handleSubmit(e){
        e.preventDefault();
        AxiosInstance
            .post("/api/register/", account)
            .then(res =>{
                history.push("/");
                console.log(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return(
        <Container component="main" maxWidth="xs" style = {{paddingTop: "10%"}}>
            <div>
                <Typography component="h1" variant="h5">
                Sign Up
                </Typography>
                <form  className = {classes.form} noValidate onSubmit = {handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value = {account.email}
                        onChange = { (e) => handleChange(e)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value = {account.username}
                        onChange = { (e) => handleChange(e)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value = {account.password}
                        onChange = { (e) => handleChange(e)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
}


export default Signup;

