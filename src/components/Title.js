import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import Follow from './Follow';

export default function Title(props) {
    const id = useParams().id;
    const { title, posts } = props;
    const { avatar } = (posts[0] ? posts[0].user : { id: '', avatar: '' });
    const { userInfo } = useContext(UserContext);
    const [follow, setFollow] = useState(false);
    const [wait, setWait] = useState(false);

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    
    useEffect(() => {
        if (id !== undefined) {
            const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows', config)
            request.then(r => {
                const data = r.data.users.map(e => e.id);
                setFollow(data.includes(Number(id)));
            });
        }
    }, [id]);

    return (
        <TitlePage>
            <User>
                {
                (id === undefined || title === 'carregando')
                ? null 
                : <img src={avatar} alt='user'/>
                }
                <h1>{title}</h1>
            </User>
            {
            (id === undefined || title === 'carregando' || userInfo.user.id === Number(id))
            ? null 
            : follow 
                ? <UnfollowBtn 
                    disabled={wait} 
                    onClick={() => Follow(id, false, setWait, setFollow, userInfo.token)}
                  >
                      Unfollow
                  </UnfollowBtn> 

                : <FollowBtn 
                    disabled={wait} 
                    onClick={() => Follow(id, true, setWait, setFollow, userInfo.token)}
                  >
                      Follow
                  </FollowBtn>
            }
        </TitlePage>
    );
}

const TitlePage = styled.div`
    margin-top: 53px;
    margin-bottom: 41px;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;  
    button {
        width: 112px;
        height: 31px;
        border-radius: 5px;
        font-size: 14px;
        font-family: 'Lato';
        font-weight: 700;
        cursor: pointer;
    }  
`;

const User = styled.div`
    display: flex;
    align-items: center;
    font-size: 43px;
    color: white;
    font-weight: 700;
    font-family: 'Oswald', sans-serif;
    img {
        margin: 0 18px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
`;

const FollowBtn = styled.button`
    background-color: #1877F2;
    color: #fff;
`;

const UnfollowBtn = styled.button`
    background-color: #fff;
    color: #1877F2;
`;
