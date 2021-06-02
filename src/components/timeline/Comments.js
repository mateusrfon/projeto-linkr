import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Comments({ userId, id }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comments`
        );

        promise.then((response) => {
            console.log(response.data.comments);
            setComments(response.data.comments);
        });
    }, []);

    return (
        <Comment className="comments">
            {comments.map((c) => {
                return <li>{c.text}</li>;
            })}
        </Comment>
    );
}

const Comment = styled.ul`
    height: 300px;
    width: 100%;
    background: #1e1e1e;
    border-radius: 16px;
    position: absolute;
    z-index: 1px;
    top: 250px;
    left: 0px;
`;
