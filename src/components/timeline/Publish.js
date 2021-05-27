import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

export default function Publish({ reloadTimeline }) {
    const { userInfo } = useContext(UserContext);
    const [link, setLink] = useState('');
    const [text, setText] = useState('');
    const [wait, setWait] = useState(false);

    function publish(e) {
        e.preventDefault();
        setWait(true);
        const body = {
            text,
            link,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const request = axios.post(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts',
            body,
            config
        );
        request.then(() => {
            setWait(false);
            setLink('');
            setText('');
            reloadTimeline(false);
        });
        request.catch(() => {
            alert('Houve um erro ao publicar seu link');
            setWait(false);
        });
    }

    return (
        <PostBox>
            <UserImage src={userInfo.user.avatar} alt={'user'} />
            <Form onSubmit={publish}>
                <p>O que você tem pra favoritar hoje?</p>
                <input
                    required
                    type="url"
                    placeholder="http://..."
                    disabled={wait}
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                />
                <textarea
                    placeholder="Descrição do seu link #descrição"
                    disabled={wait}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <div>
                    <button disabled={wait}>
                        {wait ? 'Publicando...' : 'Publicar'}
                    </button>
                </div>
            </Form>
        </PostBox>
    );
}

const PostBox = styled.div`
    display: flex;
    width: 611px;
    height: 209px;
    background-color: #fff;
    border-radius: 16px;
    margin-bottom: 29px;
    @media (max-width: 1000px) {
        width: 100%;
        border-radius: 0;
    }
`;

const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin: 16px 18px 0 18px;
    @media (max-width: 1000px) {
        display: none;
    }
`;

const Form = styled.form`
    width: 100%;
    margin-top: 21px;
    margin-right: 22px;
    display: flex;
    flex-direction: column;
    color: #707070;
    font-family: 'Lato';
    font-size: 20px;
    font-weight: 300;
    p {
        margin-bottom: 15px;
    }
    input,
    textarea {
        width: 100%;
        padding: 5px 0 7px 13px;
        background-color: #efefef;
        border-radius: 5px;
        color: #949494;
        font-size: 15px;
        margin-bottom: 5px;
    }
    textarea {
        height: 66px;
        resize: none;
    }
    div {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    button {
        width: 112px;
        height: 31px;
        margin-top: 0;
        margin-bottom: 16px;
        background-color: #1877f2;
        border-radius: 5px;
        color: #fff;
        font-family: 'Lato';
        font-size: 14px;
        font-weight: 700;
    }
    @media (max-width: 1000px) {
        align-items: center;
        margin: 10px 15px 0 15px;
        button {
            margin-bottom: 12px;
        }
    }
`;
