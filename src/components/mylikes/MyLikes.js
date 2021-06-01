import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import useInterval from 'react-useinterval';
import UserContext from '../../contexts/UserContext';
import LocalLogin from '../login/LocalLogin';
import Main from '../Main';
let lastPostId;

export default function MyLikes() {
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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
                lastPostId =
                    response.data.posts[response.data.posts.length - 1].id;
                setIsLoading(false);
            });
        },
        [userInfo.token]
    );

    useEffect(() => {
        handleGetPosts(true);
    }, [handleGetPosts]);

    useInterval(handleGetPosts, 15000);

    const GetMorePosts = () => {
        const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked/?olderThan=${lastPostId}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        promise.then((response) => {
            if (response.data.posts.length) {
                let newPosts = [...data, ...response.data.posts];
                lastPostId =
                    response.data.posts[response.data.posts.length - 1].id;
                setData(newPosts);
            } else {
                setHasMore(false);
            }
        });
    };

    return (
        <Main
            posts={data}
            setPosts={setData}
            title={`my likes`}
            loading={isLoading}
            getPosts={GetMorePosts}
            hasMore={hasMore}
        />
    );
}
