
export default function Like({post, i, setPosts, posts, userInfo}) {
    return  <div className="likes">
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
}