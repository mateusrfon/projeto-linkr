import { useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import UserContext from '../../contexts/UserContext';

export default function Tooltip({ post }) {
    const { userInfo } = useContext(UserContext);

    const wasLiked = !(
        post.likes.filter((like) => {
            return like.userId === userInfo.user.id;
        }).length === 0
    );

    const likesWithoutUserLike = post.likes.filter((like) => {
        return like['user.username'] !== userInfo.user.username;
    });
    return (
        <>
            {' '}
            <p
                data-tip={
                    post.likes.length === 1
                        ? `${post.likes[0][`user.username`]}`
                        : post.likes.length >= 2 && !wasLiked
                        ? post.likes[0]['user.username'] +
                          ' e ' +
                          post.likes[1]['user.username'] +
                          ` curtiram e outras ${post.likes.length - 2} pessoas`
                        : post.likes.length >= 2
                        ? `Voce e ${
                              likesWithoutUserLike[0][`user.username`]
                          } curtiram e outras ${post.likes.length - 2} pessoas`
                        : ''
                }
                data-event="mouseover"
            >
                {post.likes.length} likes
            </p>
            <ReactTooltip globalEventOff="mouseout" />
        </>
    );
}
