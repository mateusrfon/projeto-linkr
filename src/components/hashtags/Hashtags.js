import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../contexts/UserContext';
import Main from '../Main';

export default function Hashtags() {
    const { hashtag } = useParams();
    const { userInfo } = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    console.log(userInfo);

    function getPosts() {
        const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );

        promise.then((response) => {
            console.log(response.data.hashtags);
            setData(response.data.hashtags);
        });
    }

    return (
        <Main
            posts={data}
            setPosts={setData}
            title={`# ${hashtag}`}
            loading={false}
            getPosts={getPosts}
        />
    );
}
