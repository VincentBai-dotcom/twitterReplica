import React, { useState } from "react";
import AxiosInstance from "../Axios";
import { useHistory } from "react-router-dom";
import { Avatar, Button, TextField, FormControlLabel
, Checkbox, Grid, Box, Typography
, makeStyles, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" to = "/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function Login(props){

    const [account, setAccount] = useState({ email: '', password: ''});
    let history = useHistory();
    function handleChange(e){
        const {name, value} = e.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value
         }));
    }

    const classes = useStyles();


    function fetchByEmail(){
        AxiosInstance
            .post("/api/users/email/", account)
            .then((res)=>{
                localStorage.setItem('user', res.data["username"]);
                props.handleClose();
                window.location.reload(history.push("/home"));
                console.log(res);
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    function handleSubmit(e){
        e.preventDefault();
        AxiosInstance
            .post("/api/token/", account)
            .then((res)=>{
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                AxiosInstance.defaults.headers['Authorization'] = 'Bearer '+localStorage.getItem('access_token');
                fetchByEmail();
                console.log(res);
            })
            .catch((error)=>{
                console.log(error);
            })
    }


    function toSignup(){
        history.push("/signup")
    }

    return(
        <Container component="main" maxWidth="xs">
        <div >
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit = {handleSubmit}>
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value = {account.password}
                onChange = { (e) => handleChange(e)}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button >
                    Forgot password?
                </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item>
                    <Button onClick = {toSignup}>Don't have an account? Sign Up</Button>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    )
}


export default Login;
