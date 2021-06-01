import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart} from 'react-icons/ai'; 
import { FiTrash } from 'react-icons/fi';
import { TiPencil } from 'react-icons/ti';
import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactHashtag from 'react-hashtag';
import UserContext from '../../contexts/UserContext';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import DeletePost from './Deletepost';


import YouTube from 'react-youtube'
var getYouTubeID = require("get-youtube-id");


export default function Posts({ posts, getPosts, setPosts }) {
    const { userInfo } = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState('');
    const [wait, setWait] = useState(false);



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

    if (posts.length === 0) {
        return <p>Nenhuma mensagem encontrada</p>;
    }

    function newTab(link) {
        window.open(link, '_blank');
    }

    function like(post, i) {
        const like = post.likes.filter((like) => {
            return like.userId === userInfo.user.id;
        });

        if (like.length === 0) {
            const promise = axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/like`,
                {},
                config
            );

            promise.then((response) => {
                let newPosts = [...posts];
                newPosts[i].likes = response.data.post.likes;
                setPosts(newPosts);
            });
        } else {
            const promise = axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/dislike`,
                {},
                config
            );
            promise.then((response) => {
                let newPosts = [...posts];
                newPosts[i].likes = response.data.post.likes;
                setPosts(newPosts);
            });
        }
    }

    function SwitchEditPost(post, setNewText, setEdit) {
       if (edit === post.id) {
           setEdit(false);
       } else {
           setEdit(post.id);
           setNewText(post.text);
       }
    }

    function EndEditPost(e, post, body, config, setEdit) {
        if (e.which === 27) {
            setEdit(false)
        } else if (e.which === 13 ) {
            e.preventDefault();
            EditPost(post, body, config)
        }
    }

    function EditPost(post, body, config) {
        setWait(true);
        const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`, body, config);
        request.then(r => {
            setWait(false);
            setEdit(false);
            const newPosts = posts.map(e => {
                if (e.id === post.id) {
                    return r.data.post;
                }
                return e;
            })
            setPosts(newPosts);
        });
        request.catch(() => {
            alert('Não foi possível realizar as alterações');
            setWait(false);
        });
    }

    return (
        <PostsList>
            {posts.map((post, i) => {
                const wasLiked = !(
                    post.likes.filter((like) => {
                        return like.userId === userInfo.user.id;
                    }).length === 0
                );

                const likesWithoutUserLike = post.likes.filter((like) => {
                    return like['user.username'] !== userInfo.user.username;
                });
                return (
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
                                            like(post, i);
                                        }}
                                    />
                                ) : (
                                    <AiFillHeart
                                        color="red"
                                        onClick={() => {
                                            like(post, i);
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
                                {post.user.id === userInfo.user.id?  <span><TiPencil color="white" onClick={() => SwitchEditPost(post, setNewText, setEdit)}/></span> : null }
                                {post.user.id === userInfo.user.id?  <FiTrash color="white" onClick={()=>setModal(post.id)}/> : null }
                            </Icons>
                            {modal === post.id? <DeletePost post={post} userInfo={userInfo} getPosts={getPosts} modal={modal} setModal={setModal}/> :null}
                            <div className="author-name">
                                <Link to={`/user/${post.user.id}`}>
                                    {post.user.username}
                                </Link>
                            </div>
                            <div className="text">
                                {(edit === post.id) 
                                ? <EditText disabled={wait} autoFocus value={newText} onChange={(e) => setNewText(e.target.value)} onKeyDown={(e) => EndEditPost(e, post, { text: newText }, config, setEdit)}/>
                                : <ReactHashtag
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
                            }
                            </div>
                            {post.link.includes("www.youtube.com")?
                            <YTVideo><YouTube className="video" videoId={getYouTubeID(post.link)} opts={opts} id={post.link}  /> <a href={`${post.link}`}>{post.link}</a></YTVideo>:
                            <Button
                                img={post.linkImage}
                                onClick={() => {
                                    newTab(post.link);
                                }}
                            >
                                <div className="link-title">
                                    {post.linkTitle}
                                </div>
                                <div className="description">
                                    {post.linkDescription}
                                </div>
                                <div className="url">{post.link}</div>
                                
                            </Button>}
                        </div>
                    </li>
                );
            })}
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

const Button = styled.button`
    background-color: #171717;
    border-radius: 27px;
    color: white;
    outline: none;
    margin-top: 10px;
    border: 1px solid #4d4d4d;
    height: auto;
    min-height: 155px;
    width: 90%;
    max-height: 10ch;
    background-image: ${({ img }) => `url(${img})`};
    background-repeat: no-repeat;
    background-size: 40% 100%;
    background-position: right;
    cursor: pointer;

    div {
        width: 55%;
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
const YTVideo = styled.div`
    box-sizing: content-box;
    width:100%;
    height: 100%;
    margin:10px 10px 20px 0;
    .video{
        width:480px;
        height:270px;
    }
    @media(max-width:1000px){
        .video{
            width: 75vw;
            height: 30vh;
        }
    }
`
