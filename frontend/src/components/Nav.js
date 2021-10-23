import { React } from "react";
import {makeStyles, Grid,} from "@material-ui/core";
import NavButton from "./NavButton";
import { Navitems } from "./NavItems";
import LoginModal from "./LoginModal";
import Logout from './Logout';
import { UserContext } from "../App";
import { useContext,useState } from "react";
import PostModal from "./PostModal";
const useStyles = makeStyles((theme)=>({
    root:{
        padding: theme.spacing(6,0,0,0),
        position: "fixed",
        width: "0%"
    },
    account: {
        position: "fixed",
        bottom: "10%",
    }
}));



function Nav(props){
    const classes = useStyles();
    const[open, setOpen] = useState(false);

    function ConditionalButton(){
        const user = useContext(UserContext);
        if(user["username"] === "noUser!") 
            return <LoginModal open = {open} setOpen = {setOpen}/>;
        else if(user["username"])
            return <Logout/>;
    }

    return(
        <Grid container item xs = {3}  direction = "column">
                <Grid container direction = "column" className = {classes.root}>
                    <Grid container item  direction = "column" spacing = {1} xs = {3}>
                        {Navitems.map((item,index)=>{
                            const active = item.id === props.id ? true : false;
                            return (
                                <Grid item key = {item.id}>
                                    <NavButton text = {item.title} path = {item.path} active = {active}>
                                        {item.icon}
                                    </NavButton>
                                </Grid> 
                            );
                        })}
                        <Grid item>
                            <PostModal setLoginOpen = {setOpen}/>
                        </Grid>
                    </Grid>
                    <Grid  item className = {classes.account}> 
                        {ConditionalButton()}
                    </Grid>
                </Grid>
        </Grid>
    );
}

export default Nav;