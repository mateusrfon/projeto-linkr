import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';

export default function EditPost() {
    const { userInfo } = useContext(UserContext);
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`)
}