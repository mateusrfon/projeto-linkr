import Main from './Main';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export default function UserPosts() {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(UserContext);
    const id = useParams().id || userInfo.user.id;

    const history = useHistory();

    const handleGetPosts = useCallback(
        (isFirstTime) => {
            if (isFirstTime) {
                setIsLoading(true);
            }
            const promise = axios.get(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            promise.then((response) => {
                setIsLoading(false);
                setData(response.data.posts);
            });

            promise.catch((error) => {
                setIsLoading(false);
                if (!userInfo.token && error.response.status === 400) {
                    history.push('/');
                } else {
                    alert('ERRO, RECARREGUE A PAGINA OU LOGUE NOVAMENTE');
                }
            });
        },
        [id, userInfo.token, history]
    );

    useEffect(() => {
        handleGetPosts(true);
    }, [handleGetPosts]);

    return (
        <Main
            posts={data}
            setPosts={setData}
            title={
                useParams().id
                    ? data[0]
                        ? data[0].user.username
                        : 'carregando'
                    : 'my posts'
            }
            loading={isLoading}
            getPosts={handleGetPosts}
        />
    );
}
