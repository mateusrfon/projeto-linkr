import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import { TiPencil } from 'react-icons/ti';
import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactHashtag from 'react-hashtag';
import UserContext from '../../contexts/UserContext';
import ReactTooltip from 'react-tooltip';
import DeletePost from './Deletepost';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';
import { like, SwitchEditPost, EndEditPost } from './utils';

export default function Posts({
    posts,
    getPosts,
    setPosts,
    hasMore,
    isFollowing,
}) {
    const { userInfo } = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState('');
    const [wait, setWait] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    if (isFollowing) {
        return <p>Voce nao segue ninguem ainda, procure por perfis na busca</p>;
    }

    if (posts.length === 0) {
        return <p>Nenhuma publicacao encontrada</p>;
    }

    let items = [];

    function pushItems() {
        posts.map((post, i) => {
            const wasLiked = !(
                post.likes.filter((like) => {
                    return like.userId === userInfo.user.id;
                }).length === 0
            );

            const likesWithoutUserLike = post.likes.filter((like) => {
                return like['user.username'] !== userInfo.user.username;
            });

            items.push(
                <li key={post.id}>
                    <div className="icons">
                        <div>
                            <Link
                                className="user-icon"
                                to={`/user/${post.user.id}`}
                            >
                                <Avatar avatar={post.user.avatar}></Avatar>
                            </Link>
                        </div>
                        <div className="likes">
                            {!wasLiked ? (
                                <AiOutlineHeart
                                    color="white"
                                    onClick={() => {
                                        like(
                                            post,
                                            i,
                                            setPosts,
                                            posts,
                                            userInfo
                                        );
                                    }}
                                />
                            ) : (
                                <AiFillHeart
                                    color="red"
                                    onClick={() => {
                                        like(
                                            post,
                                            i,
                                            setPosts,
                                            posts,
                                            userInfo
                                        );
                                    }}
                                />
                            )}
                        </div>
                        <p
                            data-tip={
                                post.likes.length === 1
                                    ? `${post.likes[0][`user.username`]}`
                                    : post.likes.length >= 2 && !wasLiked
                                    ? post.likes[0]['user.username'] +
                                      ' e ' +
                                      post.likes[1]['user.username'] +
                                      ` curtiram e outras ${
                                          post.likes.length - 2
                                      } pessoas`
                                    : post.likes.length >= 2
                                    ? `Voce e ${
                                          likesWithoutUserLike[0][
                                              `user.username`
                                          ]
                                      } curtiram e outras ${
                                          post.likes.length - 2
                                      } pessoas`
                                    : ''
                            }
                            data-event="mouseover"
                        >
                            {post.likes.length}
                        </p>
                        <ReactTooltip globalEventOff="mouseout" />
                    </div>
                    <div className="post-infos">
                        <Icons>
                            {post.user.id === userInfo.user.id ? (
                                <span>
                                    <TiPencil
                                        color="white"
                                        onClick={() =>
                                            SwitchEditPost(
                                                post,
                                                setNewText,
                                                setEdit,
                                                edit
                                            )
                                        }
                                    />
                                </span>
                            ) : null}
                            {post.user.id === userInfo.user.id ? (
                                <FiTrash
                                    color="white"
                                    onClick={() => setModal(post.id)}
                                />
                            ) : null}
                        </Icons>
                        {modal === post.id ? (
                            <DeletePost
                                post={post}
                                userInfo={userInfo}
                                getPosts={getPosts}
                                modal={modal}
                                setModal={setModal}
                            />
                        ) : null}
                        <div className="author-name">
                            <Link to={`/user/${post.user.id}`}>
                                {post.user.username}
                            </Link>
                        </div>
                        <div className="text">
                            {edit === post.id ? (
                                <EditText
                                    disabled={wait}
                                    autoFocus
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    onKeyDown={(e) =>
                                        EndEditPost(
                                            e,
                                            post,
                                            { text: newText },
                                            config,
                                            setEdit,
                                            setPosts,
                                            posts,
                                            setWait
                                        )
                                    }
                                />
                            ) : (
                                <ReactHashtag
                                    renderHashtag={(hashtag) => (
                                        <Link
                                            key={Math.random()}
                                            to={`/hashtag/${
                                                hashtag[0] === '#'
                                                    ? hashtag.slice(
                                                          1,
                                                          hashtag.length
                                                      )
                                                    : hashtag
                                            }`}
                                        >
                                            {' '}
                                            {hashtag}
                                        </Link>
                                    )}
                                >
                                    {post.text}
                                </ReactHashtag>
                            )}
                        </div>
                        <Card post={post} />
                    </div>
                </li>
            );
        });
    }

    pushItems();

    return (
        <PostsList>
            <InfiniteScroll
                pageStart={0}
                loadMore={getPosts}
                hasMore={hasMore}
                loader={
                    <div className="loader" key={0}>
                        Loading ...
                    </div>
                }
            >
                {items}
            </InfiniteScroll>
        </PostsList>
    );
}

const PostsList = styled.ul`
    color: white;
    font-family: 'Lato', sans-serif;

    .user-icon {
        width: 50px;
        height: 50px;
        border-radius: 27px;
    }

    .user-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    li {
        width: 611px;
        min-height: 276px;
        height: auto;
        margin-bottom: 30px;
        border-radius: 16px;
        background-color: #171717;
        display: flex;
        position: relative;
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
        margin-top: 20px;
        margin-left: 10px;
        word-break: break-all;
    }

    .author-name {
        font-size: 19px;
    }

    .text {
        color: #b7b7b7;
        a {
            color: #fff;
            font-weight: bold;
            font-family: 'Roboto', sans-serif;
        }
    }

    .description {
        color: #9b9595;
        height: 7ex;
        overflow: hidden;
    }

    .link-title {
        font-size: 16px;
        height: 7ex;
        overflow: hidden;
    }

    .url {
        height: 3ex;
        overflow: hidden;
    }

    .link-title,
    .url {
        color: #cecece;
    }

    @media (max-width: 1000px) {
        li {
            width: 100%;
        }

        button {
            width: auto;
        }
    }

    a {
        text-decoration: none;
        color: #fff;
    }
`;

const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 27px;
    margin: 20px 0;
    background-image: ${({ avatar }) => `url(${avatar})`};
    background-repeat: no-repeat;
    background-size: cover;
`;

const Icons = styled.span`
    position: absolute;
    top: 22px;
    right: 22px;
    color: white;
    cursor: pointer;
    span {
        margin-right: 12.5px;
    }
`;

const EditText = styled.textarea`
    resize: none;
    width: 503px;
    margin-top: 7px;
    padding: 4px 9px;
    border-radius: 7px;
    overflow: hidden;
    :focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }
    @media (max-width: 1000px) {
        width: 100%;
        border-radius: none;
    }
`;
