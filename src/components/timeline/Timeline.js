import Main from '../Main';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Timeline() {
    //  const [data, setData] = useState([]);
    const user = useContext(UserContext);
    const data = [
        {
            id: 2,
            text: 'Never Gonna Give You Up #rickroll',
            link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            linkTitle: 'Rick Astley - Never Gonna Give You Up (Video)',
            linkDescription:
                "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
            linkImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            user: {
                id: 1,
                username: 'teste',
                avatar: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar',
            },
            likes: [
                {
                    id: 1,
                    userId: 1,
                    postId: 2,
                    createdAt: '2021-05-24T18:55:37.544Z',
                    updatedAt: '2021-05-24T18:55:37.544Z',
                    'user.id': 1,
                    'user.username': 'teste',
                },
            ],
        },
        {
            id: 2,
            text: 'Never Gonna Give You Up #rickroll',
            link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            linkTitle: 'Rick Astley - Never Gonna Give You Up (Video)',
            linkDescription:
                "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
            linkImage: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            user: {
                id: 1,
                username: 'teste',
                avatar: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar',
            },
            likes: [
                {
                    id: 1,
                    userId: 1,
                    postId: 2,
                    createdAt: '2021-05-24T18:55:37.544Z',
                    updatedAt: '2021-05-24T18:55:37.544Z',
                    'user.id': 1,
                    'user.username': 'teste',
                },
            ],
        },
    ];

    /*  function getPosts() {
        const promise = axios.get(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts',
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        promise.then((response) => {
            setData(response.data);
        });

        promise.catch((error) => {
            alert("Houve um erro por favor recarregue a pagina")
        })
    }

    useEffect(() => {
        getPosts();
    }, []);*/

    return <Main posts={data} title="timeline" />;
}
