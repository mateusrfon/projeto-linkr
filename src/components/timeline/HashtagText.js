import ReactHashtag from 'react-hashtag';
import { Link } from 'react-router-dom';

export default function HashtagText({ post }) {
    return (
        <ReactHashtag
            renderHashtag={(hashtag) => (
                <Link
                    key={Math.random()}
                    to={`/hashtag/${
                        hashtag[0] === '#'
                            ? hashtag.slice(1, hashtag.length)
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
    );
}
