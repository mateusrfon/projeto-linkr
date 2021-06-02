import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import styled from 'styled-components';
import User from './User';

export default function Comments({ userId, post }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/comments`
        );

        promise.then((response) => {
            console.log(response.data.comments);
            setComments(response.data.comments);
        });
    }, [post]);

    return (
        <Container>
            <Comment className="comments">
                {comments.map((c) => {
                    return <li>{c.text}</li>;
                })}
                <div className="input-comment">
                    <User post={post} />
                    <input placeholder="write a comment..."></input>
                    <IoPaperPlaneOutline />
                </div>
            </Comment>
        </Container>
    );
}

const Comment = styled.ul`
    height: 300px;
    width: 100%;
    background: #1e1e1e;
    border-radius: 16px;
    position: absolute;
    top: 250px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div.input-comment {
        width: 90%;
        height: 83px;
        position: absolute;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
            background-color: #252525;
            width: 85%;
            font-size: 14px;
            font-style: italic;
            font-family: 'Lato', 'sans-serif';
            height: 39px;
            border-radius: 8px;
            padding-left: 15px;
            border: none;
        }

        svg {
            position: absolute;
            right: 40px;
        }
    }
`;

const Container = styled.div`
    margin-bottom: 300px;
`;
