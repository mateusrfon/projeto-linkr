import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import User from './User';

export default function Comments({ post }) {
    const [comments, setComments] = useState([]);
    const { userInfo } = useContext(UserContext);
    const [comment, setComment] = useState('');

    const getComments = useCallback(() => {
        const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/comments`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );

        promise.then((response) => {
            setComments(response.data.comments);
        });
    }, [userInfo.token, post.id]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    function sendComment(id) {
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/comment`,
            {
                id,
                text: comment,
                user: {
                    id: post.user.id,
                    username: post.user.username,
                    avatar: post.user.avatar,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );

        promise.then(() => {
            getComments();
            setComment('');
        });
        promise.catch(() => {
            alert('ERRO AO COMENTAR!');
        });
    }

    return (
        <Container length={comments.length}>
            <Comment className="comments">
                {comments.map((c) => {
                    return (
                        <li>
                            <div className="comment-box">
                                <User post={c} />
                                <div>
                                    <div className="user-info">
                                        <Link
                                            className="name"
                                            to={`/user/${post.user.id}`}
                                        >
                                            {post.user.username}
                                        </Link>
                                        <span>
                                            {c.user.id === post.user.id
                                                ? 'post`s author'
                                                : 'following'}
                                        </span>
                                    </div>
                                    <p>{c.text}</p>
                                </div>
                            </div>
                        </li>
                    );
                })}
                <div className="input-comment">
                    <User post={post} />
                    <input
                        value={comment}
                        placeholder="write a comment..."
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendComment(post.id, comment);
                            }
                        }}
                    ></input>
                    <IoPaperPlaneOutline
                        onClick={() => {
                            sendComment(post.id, comment);
                        }}
                    />
                </div>
            </Comment>
        </Container>
    );
}

const Comment = styled.ul`
    height: auto;
    width: 100%;
    background: #1e1e1e;
    border-radius: 16px;
    position: absolute;
    top: 250px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:nth-child(1) {
        padding-top: 140px;
    }

    li:last-of-type {
        margin-bottom: 83px;
    }

    .name {
        font-size: 18px;
    }

    li {
        height: 70px;
        width: 90%;
        margin-bottom: 0px;
        border-bottom: 1px solid #353535;
        display: flex;
        align-items: center;

        .comment-box {
            padding-top: 5px;
            display: flex;
            height: 100%;

            &:nth-child(1) {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .user-info {
            display: flex;
            flex-direction: row;
            width: 160px;
            height: auto;
        }

        a {
            margin: 0 20px;
            div {
                margin: 0;
            }
        }

        span {
            margin-left: 5px;
            display: list-item;
            list-style-type: disc;
            color: #565656;
        }

        p {
            color: #acacac;
            font-size: 20px;
            margin-left: 20px;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

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
            font-family: 'Lato', sans-serif;
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
    margin-bottom: ${({ length }) => `calc(83px + ${length * 100}px)`};
`;
