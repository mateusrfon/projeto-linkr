import styled from 'styled-components';
import { FiTrash } from 'react-icons/fi';
import { TiPencil } from 'react-icons/ti';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import DeletePost from './Deletepost';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';
import { SwitchEditPost, EndEditPost } from './utils';
import Tooltip from './Tooltip';
import HashtagText from './HashtagText';
import Likes from './Likes';
import User from './User';
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
import Comments from './Comments';
import { AiOutlineComment } from 'react-icons/ai';

export default function Posts({
    posts,
    getPosts,
    attPosts,
    setPosts,
    hasMore,
    isFollowing,
}) {
    const { userInfo } = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState('');
    const [wait, setWait] = useState(false);
    const [showComment, setShowComment] = useState(false);

    const opts = {
        playerVars: {
            //https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

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
            items.push(
                <li key={post.id}>
                    <div className="icons">
                        <User post={post} />
                        <Likes
                            post={post}
                            i={i}
                            setPosts={setPosts}
                            posts={posts}
                            userInfo={userInfo}
                        />
                        <Tooltip post={post} />
                        <div className="comment-icon">
                            <AiOutlineComment
                                onClick={() => {
                                    setShowComment(!showComment);
                                }}
                            />
                            <p>{post.commentCount} comments</p>
                        </div>
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
                                attPosts={attPosts}
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
                                <HashtagText post={post} />
                            )}
                        </div>
                        {post.link.includes('www.youtube.com') ? (
                            <YTVideo>
                                <YouTube
                                    className="video"
                                    videoId={getYouTubeID(post.link)}
                                    opts={opts}
                                    id={post.link}
                                />{' '}
                                <a href={post.link} target="_blank">
                                    {' '}
                                    {post.link}
                                </a>
                            </YTVideo>
                        ) : (
                            <Card post={post} />
                        )}
                    </div>
                    <Comments
                        showComment={showComment}
                        userId={userInfo.user.id}
                        id={post.id}
                    />
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

    svg {
        font-size: 22px;
        cursor: pointer;
    }

    .comment-icon {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

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

        p {
            font-size: 11px;
        }
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
            border-radius: 0px;
            padding: 0px 10px;
        }

        button {
            width: 100%;
            min-height: 180px;
        }
    }

    a {
        text-decoration: none;
        color: #fff;
    }
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
const YTVideo = styled.div`
    box-sizing: content-box;
    width: 100%;
    height: 100%;
    margin: 10px 10px 20px 0;
    .video {
        width: 480px;
        height: 270px;
    }
    @media (max-width: 1000px) {
        .video {
            width: 75vw;
            height: 30vh;
        }
    }
`;
