import Main from './Main';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LocalLogin from './login/LocalLogin';
let lastPostId;

export default function UserPosts() {
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(UserContext);
    const id = useParams().id || userInfo.user.id;
    const [user, setUser] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    };
    
    if (useParams().id) {
        LocalLogin(`/user/${id}`);
    } else {
        LocalLogin('/my-posts');
    }

    useEffect(() => {
        if (userInfo.token !== '') {
            const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`, config);
            request.then(r => {
                setUser(r.data.user.username);
            });
        }
    }, [userInfo.token, id]);

    const handleGetPosts = useCallback(
        (isFirstTime) => {
            if (isFirstTime) {
                setIsLoading(true);
            }
            const promise = axios.get(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,
                config
            );
            promise.then(response => {
                const posts = response.data.posts
                setIsLoading(false);
                if (posts.length > 0) {
                    lastPostId = posts[posts.length - 1].id;
                }
                setData(posts);
            });
        },
        [id, userInfo.token]
    );

    useEffect(() => {
        if (userInfo.token !== '') {
            handleGetPosts(true);
        }
    }, [handleGetPosts, userInfo.token]);

    const GetMorePosts = () => {
        if (userInfo.token !== '') {
            const promise = axios.get(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts/?olderThan=${lastPostId}`,
                config
            );
            promise.then((response) => {
                const posts = response.data.posts;
                if (posts.length > 0) {
                    const newPosts = [...data, ...posts];
                    lastPostId = posts[posts.length - 1].id;
                    setData(newPosts);
                } else {
                    setHasMore(false);
                }
            });
        }
    };

    return (
        <Main
            posts={data}
            setPosts={setData}
            attPosts={handleGetPosts}
            title={
                useParams().id
                    ? user
                        ? user + '`s posts'
                        : 'carregando'
                    : 'my posts'
            }
            loading={isLoading}
            getPosts={GetMorePosts}
            hasMore={hasMore}
        />
    );
}
