import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import useInterval from 'react-useinterval';
import UserContext from '../../contexts/UserContext';
import LocalLogin from '../login/LocalLogin';
import Main from '../Main';

export default function MyLikes() {
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    LocalLogin(`/my-likes`);

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
                setData(response.data.posts);
                setIsLoading(false);
            });
        },
        [userInfo.token]
    );

    useEffect(() => {
        handleGetPosts(true);
    }, [handleGetPosts]);

    useInterval(handleGetPosts, 15000);

    return (
        <Main
            posts={data}
            setPosts={setData}
            title={`my likes`}
            loading={isLoading}
            getPosts={handleGetPosts}
            hasMore={false}
        />
    );
}
