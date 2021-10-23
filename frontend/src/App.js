import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Grid, Container} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import AxiosInstance from './Axios';
import Signup from './components/Signup';

export const UserContext = React.createContext({ email: '', username: '', id: 0, date_joined: ''});


function App() {
  const [user, setUser] = useState({ email: '', username: '', id: 0, date_joined: ''});

  useEffect(()=>{
    const username = localStorage.getItem("user");
    if(username){
      AxiosInstance
        .get("/api/users/username/"+username+"/")
        .then((res)=>{
          setUser(res["data"]);
        })
        .catch((error)=>{
          console.log(error);
        })
    }   
    else
      setUser({ email: '', username: 'noUser!', id: 0, date_joined: ''})
  }, []);
      
  return(
    <UserContext.Provider value={user}>
    <Router>
      <Container maxWidth = "lg">
        <Grid container spacing = {3}>
          <Switch>
            <Route path = "/home" exact>
              <Nav id = "1"/>
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" /> 
            </Route>
            <Route path = "/profile">
              <Nav id = "2" />
              <Profile />
            </Route>
            <Route path = "/about">
              <Nav id = "3" />
              <About />
            </Route>
            <Route path = "/signup">
              <Signup/>
            </Route>
          </Switch>
        </Grid>
      </Container>
    </Router>
    </UserContext.Provider>
  );
}

export default App;

function About(){
  return <Grid container direction = "column" item xs = {9}><h1>About</h1></Grid>;
}

function Profile(){
  return <Grid container direction = "column" item xs = {9}><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1><h1>Profile</h1></Grid>;
}
