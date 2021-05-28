import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../contexts/UserContext';
import Main from '../Main';

export default function Hashtags() {
    let { hashtag } = useParams();
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);

    const handleGetPosts = useCallback(() => {
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
            console.log(response.data.posts);
        });
    }, [userInfo.token, hashtag]);

    useEffect(() => {
        handleGetPosts();
    }, [handleGetPosts]);

    return (
        <Main
            posts={data}
            setPosts={setData}
            title={`# ${hashtag}`}
            loading={false}
            getPosts={handleGetPosts}
        />
    );
}
