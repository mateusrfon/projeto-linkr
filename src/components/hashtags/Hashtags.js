import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import UserContext from '../../contexts/UserContext';
import Main from '../Main';
import LocalLogin from '../login/LocalLogin';

export default function Hashtags() {
    let { hashtag } = useParams();
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

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
        [userInfo.token, hashtag, history]
    );

    useEffect(() => {
        handleGetPosts(true);
    }, [handleGetPosts]);

    return (
        <Main
            posts={data}
            setPosts={setData}
            title={`# ${hashtag}`}
            loading={isLoading}
            getPosts={handleGetPosts}
        />
    );
}
