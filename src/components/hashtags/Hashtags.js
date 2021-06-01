import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../contexts/UserContext';
import Main from '../Main';
import LocalLogin from '../login/LocalLogin';
import useInterval from 'react-useinterval';
let lastPostId;

export default function Hashtags() {
    let { hashtag } = useParams();
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

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
                lastPostId =
                    response.data.posts[response.data.posts.length - 1].id;
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

    const GetMorePosts = () => {
        const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts/?olderThan=${lastPostId}`,
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
            title={`# ${hashtag}`}
            loading={isLoading}
            getPosts={GetMorePosts}
            hasMore={hasMore}
        />
    );
}
