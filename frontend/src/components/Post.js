import { Grid } from "@material-ui/core";
import { React, useContext, useEffect, useRef, useState, } from "react";
import AxiosInstance from "../Axios";
import { UserContext } from "../App";

export default function Post(props){
    const post = props.post;
    const [voteCount,setVoteCount] = useState(0);
    const [isLoading, setIsLoading] = useState({fetchVoteCount:true, fetchVote:true});
    const [voteId, setVoteId] = useState(0);
    const user = useContext(UserContext);
    useEffect(()=>{
        AxiosInstance
            .get("/api/vote/?post="+post.id)
            .then((res)=>{
                console.log(res);
                setVoteCount(res["data"]["count"]);
                setIsLoading(prevState=>({
                    ...prevState,
                    fetchVoteCount: false,
                }));
            })
            .catch((error)=>{
                console.log(error);
            })
        
        AxiosInstance
            .get("/api/vote/?post="+post.id+"&user="+user.id)
            .then((res)=>{
                if(res["data"]["count"] !== 0)
                    setVoteId(res["data"]["results"][0]["id"]);
                    setIsLoading(prevState=>({
                        ...prevState,
                        fetchVote: false,
                    }));
                console.log(res);
            })
            .catch((error)=>{
                console.log(error);
            })   
    },[voteCount,voteId,post.id,user.id]);

    function upVote(){
        AxiosInstance
            .post("/api/vote/", {post:post.id, user: user.id, comment: null})
            .then((res)=>{
                setVoteCount(voteCount+1);
                console.log(res);
            })
            .catch((error)=>{
                console.log({post:post.id, user: user.id});
                console.log(error);
            })
    }

    function downVote(){
        AxiosInstance
            .delete("/api/vote/"+voteId+"/")
            .then((res)=>{
                setVoteCount(voteCount-1);
                setVoteId(0);
                console.log(res);
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    function renderVote(){
        if(voteId !== 0)
            return <button onClick = {downVote}>downVote</button>;
        else 
            return <button onClick = {upVote}>Upvote</button>;
    }

    if(isLoading["fetchVoteCount"] || isLoading["fetchVote"])
        return null;

    return(
        <div>
            <a style = {{fontSize:"40px", fontWeight:"bold", }}>{post.title}</a>
            <p style = {{fontSize: "20px", }}>{post.description}</p>
            <p style = {{fontSize: "20px"}}>Vote: {voteCount}</p>
            {renderVote()}
            <br/>
        </div>
    )
}