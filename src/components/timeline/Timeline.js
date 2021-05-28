import Main from '../Main';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import LocalLogin from '../login/LocalLogin';

export default function Timeline() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo } = useContext(UserContext);
    const history = useHistory();

    LocalLogin("/timeline");

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
