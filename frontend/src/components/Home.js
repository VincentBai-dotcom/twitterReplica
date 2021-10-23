import { React, useContext, useEffect, useState } from "react";
import { Grid} from '@material-ui/core';
import { UserContext } from '../App';
import AxiosInstance from "../Axios";
import Post from "./Post";
function Home(){
  const [posts,setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const items = posts.map((item, index)=>(
    <Post post = {item} key = {index}/>
  ));

  useEffect(()=>{
    AxiosInstance
      .get("/api/post/")
      .then((res)=>{
        setPosts(res["data"]["results"]);
        setIsLoading(false);
        console.log(res);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, []);

  // if(isLoading)
  //   return null;

  return(
    <div>
      <Grid container item xs = {9} style = {{marginTop: "50px"}} direction = "column">
          {items}
      </Grid>
    </div>
  )
}

export default Home;