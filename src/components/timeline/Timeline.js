import Main from '../Main';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { useCallback } from 'react';
import LocalLogin from '../login/LocalLogin';
import useInterval from 'react-useinterval';
let lastPostId;

export default function Timeline() {
    const [data, setData] = useState([]);
    const [isLoading] = useState(false);
    const { userInfo } = useContext(UserContext);
    const [hasMore, setHasMore] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    LocalLogin('/timeline');

    function attData(array) {
        setData(array);
    }

    const GetFollowings = useCallback(() => {
        const promise = axios.get(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows',
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );

        promise.then((response) => {
            if (response.data.users.length === 0) {
                setIsFollowing(true);
            }
        });
    }, [userInfo.token]);

    const handleGetPosts = useCallback(() => {
        const promise = axios.get(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts/',
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        promise.then((response) => {
            lastPostId = response.data.posts[response.data.posts.length - 1].id;
            setData(response.data.posts);
        });
    }, [userInfo.token]);

    useEffect(() => {
        handleGetPosts(true);
        GetFollowings();
    }, [handleGetPosts, GetFollowings]);

    useInterval(handleGetPosts, 15000);

    const GetMorePosts = () => {
        const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts/?olderThan=${lastPostId}`,
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
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        });
    };

    return (
        <Main
            posts={data}
            setPosts={attData}
            title="timeline"
            loading={isLoading}
            getPosts={GetMorePosts}
            hasMore={hasMore}
            isFollowing={isFollowing}
        />
    );
}
