import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../contexts/UserContext';
import Main from '../Main';

export default function Hashtags() {
    let { hashtag } = useParams();
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

            promise.catch((error) => {
                setIsLoading(false);
                alert('Houve um erro por favor recarregue a pagina');
            });
        },
        [userInfo.token, hashtag]
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
