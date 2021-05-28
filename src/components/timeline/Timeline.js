import Main from '../Main';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

export default function Timeline() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(UserContext);
    const history = useHistory();

    function attData(array) {
        setData(array);
        handleGetPosts();
    }

    const handleGetPosts = useCallback(
        (isFirstTime) => {
            if (isFirstTime) {
                setIsLoading(true);
            }
            const promise = axios.get(
                'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts',
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
        [userInfo.token, history]
    );

    useEffect(() => {
        handleGetPosts(true);
    }, [handleGetPosts]);

    return (
        <Main
            posts={data}
            setPosts={attData}
            title="timeline"
            loading={isLoading}
            getPosts={handleGetPosts}
        />
    );
}
