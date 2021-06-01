import { like } from './utils';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function Likes({ post, i, setPosts, posts, userInfo }) {
    const wasLiked = !(
        post.likes.filter((like) => {
            return like.userId === userInfo.user.id;
        }).length === 0
    );

    return (
        <div className="likes">
            {!wasLiked ? (
                <AiOutlineHeart
                    color="white"
                    onClick={() => {
                        like(post, i, setPosts, posts, userInfo);
                    }}
                />
            ) : (
                <AiFillHeart
                    color="red"
                    onClick={() => {
                        like(post, i, setPosts, posts, userInfo);
                    }}
                />
            )}
        </div>
    );
}
