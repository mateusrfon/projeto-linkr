import Main from '../Main';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { useCallback } from 'react';

export default function Timeline() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(UserContext);

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
                alert('Houve um erro por favor recarregue a pagina');
            });
        },
        [userInfo.token]
    );

    useEffect(() => {
        handleGetPosts(true);
    }, [handleGetPosts]);

    return (
        <Main
            posts={data}
            setPosts={setData}
            title="timeline"
            loading={isLoading}
            getPosts={handleGetPosts}
        />
    );
}
