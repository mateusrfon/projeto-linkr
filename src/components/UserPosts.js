import Main from './Main';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LocalLogin from './login/LocalLogin';
import useInterval from 'react-useinterval';
let lastPostId;

export default function UserPosts() {
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(UserContext);
    const id = useParams().id || userInfo.user.id;

    if (useParams().id) {
        LocalLogin(`/user/${id}`);
    } else {
        LocalLogin('/my-posts');
    }

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
                lastPostId =
                    response.data.posts[response.data.posts.length - 1].id;
                setData(response.data.posts);
            });
        },
        [id, userInfo.token]
    );

    useEffect(() => {
        handleGetPosts(true);
    }, [handleGetPosts]);

    useInterval(handleGetPosts, 15000);

    const GetMorePosts = () => {
        const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts/?olderThan=${lastPostId}`,
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
            title={
                useParams().id
                    ? data[0]
                        ? data[0].user.username
                        : 'carregando'
                    : 'my posts'
            }
            loading={isLoading}
            getPosts={GetMorePosts}
            hasMore={hasMore}
        />
    );
}
