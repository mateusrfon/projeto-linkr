import axios from "axios"
import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"

export default function Signup(){
    const {setUserInfo,userInfo} = useContext(UserContext);
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [url, setUrl] = useState("")

    function createAccount(event){
        event.preventDefault();
        const info = { email: {email}, password:{password},username:{username},pictureUrl:{url}}

        const promisse = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up', info)
        promisse.then(r => setUserInfo(r.data))
        console.log(userInfo)

    }
    return(
        <Container>
            <Front>
            <h1>linkr</h1>
            <p>save,share and discover the best links on the web</p>
            </Front>
            <Inputs>
            <form onSubmit={createAccount}>
                <input placeholder="e-mail" type="email" onChange={(e)=> setEmail(e.target.value)} />
                <input placeholder="password" type="password" onChange={(e)=> setPassword(e.target.value)} />
                <input placeholder="username" type="text" onChange={(e)=> setUsername(e.target.value)} />
                <input placeholder="picture url" type="url" onChange={(e)=> setUrl(e.target.value)} />
                <button type="submit">Sign up</button>
                <Link to="/"><p>Switch back to log in</p></Link>
            </form>
            </Inputs>
        </Container>
    )
}

let Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color:#515151 ;
    display: flex;
    color:#fff;
    font-family: 'Passion One';
    
`
let Front = styled.div`
    width: 62vw;
    height: 100vh;
    background-color: #151515;
    display:flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 700;
    box-shadow: 4px 0 4px rgba(0,0,0,0.25);
    h1{
        margin: 0 0 10px 10vw;
        font-size: 106px;
        width: 450px;
    }
    p{
        margin: 0 0 0 10vw;
        font-size: 43px;
        width: 450px;
    }
`
let Inputs = styled.div`
    width: 38vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    form{
        width: 80%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        input{
            font-family: 'Oswald';
            height: 65px;
            font-size: 27px;
            width: 100%;
            margin: 0 0 13px 0;
            border-radius: 6px;
            padding: 0 0 0 10px;
            color:#9f9f9f;
        }
        button{
            width:100%;
            height: 65px;
            background-color: #1877f2;
            color:#fff;
            font-size: 27px;
            border-radius: 6px;
        }
        p{
            font-family: 'Lato';
            color:#fff;
            text-decoration: underline;
            margin: 10px 0 0 0 ;
        }
    }
`