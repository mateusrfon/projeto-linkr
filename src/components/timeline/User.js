import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function User({ post }) {
    return (
        <div>
            <Link className="user-icon" to={`/user/${post.user.id}`}>
                <Avatar avatar={post.user.avatar}></Avatar>
            </Link>
        </div>
    );
}

const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 27px;
    margin: 20px 0;
    background-image: ${({ avatar }) => `url(${avatar})`};
    background-repeat: no-repeat;
    background-size: cover;
`;
