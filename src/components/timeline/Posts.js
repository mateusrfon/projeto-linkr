import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';

export default function Posts({ posts }) {
    const [wasLiked, setWasLiked] = useState(false);

    return (
        <PostsList>
            {posts.map((post) => {
                return (
                    <li key={post.id}>
                        <div className="icons">
                            <img className="user-icon" src={post.user.avatar} />
                            <div className="likes">
                                {!wasLiked ? (
                                    <AiOutlineHeart
                                        color="white"
                                        onClick={() => {
                                            setWasLiked(!wasLiked);
                                        }}
                                    />
                                ) : (
                                    <AiFillHeart
                                        color="red"
                                        disable
                                        onClick={() => {
                                            setWasLiked(!wasLiked);
                                        }}
                                    />
                                )}
                            </div>
                            <p>{post.likes.length}</p>
                        </div>
                        <div className="post-infos">
                            <div className="author-name">
                                {post.user.username}
                            </div>
                            <div className="text">{post.text}</div>
                            <Button img={post.linkImage}>
                                <div className="link-title">
                                    {post.linkTitle}
                                </div>
                                <div className="description">
                                    {post.linkDescription}
                                </div>
                                <div className="url">{post.link} </div>
                            </Button>
                        </div>
                    </li>
                );
            })}
        </PostsList>
    );
}

const PostsList = styled.ul`
    color: white;
    li {
        width: 43%;
        height: 276px;
        margin-top: 30px;
        border-radius: 16px;
        background-color: #171717;
        display: flex;
    }
    img.user-icon {
        width: 50px;
        height: 50px;
        border-radius: 27px;
        margin: 20px 0;
    }

    .icons {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 14%;
    }

    .post-infos {
        width: 82%;
        height: 90%;
        margin: auto;
        word-break: break-all;
    }

    @media (max-width: 700px) {
        li {
            width: 100%;
        }

        button {
            width: 280px;
        }
    }

    @media (max-width: 1100px) {
        button {
            width: auto;
        }
    }
`;

const Button = styled.button`
    background-color: #171717;
    border-radius: 27px;
    color: white;
    outline: none;
    margin-top: 10px;
    border: 1px solid #4d4d4d;
    height: 155px;
    width: 90%;
    background-image: ${({ img }) => `url(${img})`};
    background-repeat: no-repeat;
    background-size: 35% 100%;
    background-position: right;

    div {
        width: 60%;
        text-align: left;
        margin-left: 15px;
    }
    .link-title {
        font-size: 16px;
        margin-bottom: 5px;
    }
    .description,
    .url {
        font-size: 11px;
    }

    .description {
        margin-top: 5px;
    }

    .url {
        margin-top: 15px;
    }
`;
