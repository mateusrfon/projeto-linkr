import styled from 'styled-components';
import { FiTrash } from 'react-icons/fi';
import { TiPencil } from 'react-icons/ti';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import DeletePost from './Deletepost';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';
import { SwitchEditPost, EndEditPost, showComments } from './utils';
import Tooltip from './Tooltip';
import HashtagText from './HashtagText';
import Likes from './Likes';
import User from './User';
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
import { IoLocationSharp } from 'react-icons/io5';
import Geolocation from './map/Geolocation';
import Comments from './Comments';
import { AiOutlineComment } from 'react-icons/ai';
import {BiRepost} from 'react-icons/bi'
import Repost from './Repost';

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
    const [shareModal, setShareModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState('');
    const [wait, setWait] = useState(false);
    const [map, setMap] = useState(false);
    const [location, setLocation] = useState('');
    const [comment, setComment] = useState([]);

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
                <PostBox>
                    {post.repostCount>0 && post.repostedBy!== undefined? <div><BiRepost/> Re-posted by <b>{post.repostedBy.username}</b></div>:null}
                <li key={post.id}>
                    <div className="post">
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
                                        let array = [...comment];
                                        array[i] = post;
                                        showComments(array, i, setComment);
                                    }}
                                />
                                <p>{post.commentCount} comments</p>
                                <BiRepost key={`r${post.id}`}onClick={()=>setShareModal('repostedBy' in post? post.repostId:post.id)}/>
                            <p>{'repostCount' in post? post.repostCount:"0"} shares</p>
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
                                {post.user.id === userInfo.user.id? (
                                    <FiTrash
                                        color="white"
                                        onClick={() => setModal(post.id)}
                                    />
                                ) : null}
                            </Icons>
                            {modal === post.repostId || (modal === post.id && post.repostId === undefined) ? (
                                <DeletePost
                                    post={post}
                                    userInfo={userInfo}
                                    attPosts={attPosts}
                                    modal={modal}
                                    setModal={setModal}
                                />
                            ) :null}
                            <div className="author-name">
                                <Link to={`/user/${post.user.id}`}>
                                    {post.user.username}
                                </Link>
                                {post.geolocation !== undefined ? (
                                    <IoLocationSharp
                                        className="geo-pin"
                                        onClick={() => {
                                            const latitude =
                                                post.geolocation.latitude;
                                            const longitude =
                                                post.geolocation.longitude;
                                            const user = post.user.username;
                                            setMap(true);
                                            setLocation({
                                                user,
                                                latitude,
                                                longitude,
                                            });
                                        }}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="text">
                                {edit === post.id ? (
                                    <EditText
                                        disabled={wait}
                                        autoFocus
                                        value={newText}
                                        onChange={(e) =>
                                            setNewText(e.target.value)
                                        }
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
                    </div>
                    <div
                        hidden={
                            comment[i] !== undefined
                                ? !comment[i].hasClicked
                                : true
                        }
                    >
                        <Comments post={post} />
                    </div>
                    {modal === post.id ? (
                        <DeletePost
                            post={post}
                            userInfo={userInfo}
                            attPosts={attPosts}
                            modal={modal}
                            setModal={setModal}
                        />
                    ) : null}
                    {shareModal === post.repostId || (shareModal === post.id && post.repostId === undefined)? <Repost post={post} userInfo={userInfo} attPosts={attPosts} shareModal={shareModal} setShareModal={setShareModal}/>:null}
                </li>
                </PostBox>
            );
        });
    }

    pushItems();

    return (
        <PostsList>
            {map ? <Geolocation setMap={setMap} location={location} /> : ''}
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
        
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        svg{
            margin: 15px 0 0 0;
        }
        
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
        margin-bottom: 30px;
        list-style: none;
        position: relative;
        
    }

    .post {
        width: 611px;
        min-height: 276px;
        height: auto;
        background-color: #171717;
        border-radius: 16px;
        display: flex;
        position: relative;
        z-index: 1;
    }

    .icons {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 14%;

        p {
            font-size: 11px;
            word-break: break-all;
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
        .geo-pin {
            font-size: 16px;
            margin-left: 5px;
        }
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
        .post {
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

const PostBox = styled.div`
    margin: 0 0 ;
    background-color: #1e1e1e;
    border-radius: 16px;

    &&>div{
    height: 33px;
    width: 100%;
    background-color: #1e1e1e;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 10px;
    b{
        font-weight: bolder;
        margin: 0 0 0 3px;
    }
     svg{
        cursor:default;
        margin: 0 4px 0 0;
    }
    }
`


