import axios from "axios"
import React,{useContext, useEffect} from 'react';
import styled from 'styled-components';
import UserContext from "../../contexts/UserContext";


export default function DeletePost({post,userInfo,getPosts,modal, setModal}){

    
    if(userInfo.user.id === post.user.id){
        return(
            <>
            <Confirm>
                <div>
                <h1>Tem certeza que deseja excluir essa publicação?</h1>
                <span>
                <No onClick={()=>setModal(false)}>Não, voltar</No>
                <Yes onClick={()=>remove()}> Sim, excluir </Yes>
                </span>
                </div>
            </Confirm>
            </>
        )} else{
            return(
                null
            )

        }
 
    

    function remove(){
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`, {headers:{Authorization: `Bearer ${userInfo.token}`}})
        request.then(() => {getPosts(false);
        setModal(false)})
        request.catch(()=> {console.log(userInfo.user.id);
            console.log(post.user.id)})
    
    }



    
}

const Confirm = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(255,255,255, 0.9);
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    div{
        background-color: #333;
        width: 60vw;
        height: 25vh;
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        span{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        h1{
            color: #fff;
            font-size: 34px;
        }
        button{ 
            width: 10vw;
            height: 4vh;
            border-radius: 5px;
            font-size: 18px;
            margin: 0 3vw;
        }
    }
`
const Yes = styled.button`
    background-color: #1877F2;
    color: #fff;

`
const No = styled.button`
    background-color: #fff;
    color: #1877F2;
`
