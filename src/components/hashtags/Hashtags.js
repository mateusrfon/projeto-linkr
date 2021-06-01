import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../contexts/UserContext';
import Main from '../Main';
import LocalLogin from '../login/LocalLogin';
import useInterval from 'react-useinterval';

export default function Hashtags() {
    let { hashtag } = useParams();
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    LocalLogin(`/hashtag/${hashtag}`);

    const handleGetPosts = useCallback(
        (isFirstTime) => {
            if (isFirstTime) {
                setIsLoading(true);
            }
            const promise = axios.get(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,
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
        [userInfo.token, hashtag]
    );

    useEffect(() => {
        handleGetPosts(true);
    }, [handleGetPosts]);

    useInterval(handleGetPosts, 15000);

    return (
        <Main
            posts={data}
            setPosts={setData}
            title={`# ${hashtag}`}
            loading={isLoading}
            getPosts={handleGetPosts}
            hasMore={false}
        />
    );
}
