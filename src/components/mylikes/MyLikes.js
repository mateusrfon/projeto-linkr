import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import Main from '../Main';

export default function MyLikes() {
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetPosts = useCallback(
        (isFirstTime) => {
            if (isFirstTime) {
                setIsLoading(true);
            }
            const promise = axios.get(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            promise.then((response) => {
                response.data.posts.forEach((post) => {
                    post.likes.forEach((like) => {
                        like.userId = like.id;
                    });
                });
                setData(response.data.posts);
                setIsLoading(false);
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
            title={`my likes`}
            loading={isLoading}
            getPosts={handleGetPosts}
        />
    );
}
