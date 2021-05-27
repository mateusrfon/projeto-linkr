import axios from "axios"
import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import { confirmAlert } from 'react-confirm-alert';

export default function DeletePost({post}){
    const {userInfo} = useContext(UserContext)
    
    const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`, {headers:{Authorization: `Bearer ${userInfo.token}`}})
    request.then(p => console.log(p.data))
    request.catch(console.log("n foi"))




    
}