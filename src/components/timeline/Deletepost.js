import axios from "axios"
import React,{useContext, useEffect, useState} from 'react';
import styled from 'styled-components';



export default function DeletePost({post,userInfo,getPosts,setModal}){
    const [disabled, setDisabled] = useState(false)
    
   
        return(
            <>
            <Confirm>
                <div>
                <h1>{disabled ? "Deletando post":"Tem certeza que deseja excluir essa publicação?"}</h1>
                <span>
                <No disabled = {disabled} onClick={()=>setModal(false)}>Não, voltar</No>
                <Yes disabled = {disabled} onClick={()=>remove()}> Sim, excluir </Yes>
                </span>
                </div>
            </Confirm>
            </>
        )

        
 
    

    function remove(){
        setDisabled(true)
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`, {headers:{Authorization: `Bearer ${userInfo.token}`}})
        request.then(() => {getPosts(false);
        setModal(false)})
        request.catch(()=>{alert("não foi possivel exlcuir o post");setModal(false)})
    
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
    background-color: ${props => props.disabled?"#0867h2":"#1877F2"};
    color: #fff;

`
const No = styled.button`
    background-color: ${props => props.disabled?"#141414":"#fffff"};
    color: #1877F2;
`