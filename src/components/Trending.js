import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

export default function Trending() {
    const { userInfo } = useContext(UserContext);
    const [hashtags, setHashtags] = useState([]);

    const handleGetHashtags = useCallback(() => {
        const promise = axios.get(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending',
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );

        promise.then((response) => {
            setHashtags(response.data.hashtags);
        });
    }, [userInfo.token]);

    useEffect(() => {
        handleGetHashtags();
    }, [handleGetHashtags]);

    return (
        <Container className="container-aside">
            <Aside>
                <TrendingTop>
                    <p>trending</p>
                </TrendingTop>
                <div className="links">
                    {hashtags.map((hashtag) => {
                        return (
                            <div key={hashtag.id}>
                                <Link to={`/hashtag/${hashtag.name}`}>
                                    # {hashtag.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </Aside>
        </Container>
    );
}

const Container = styled.div`
    margin-left: 25px;
    width: 100%;

    aside {
        @media (max-width: 1275px) {
            width: 150px;
            margin-left: 120px;
        }
    }
`;

const Aside = styled.aside`
    width: 301px;
    height: 420px;
    background: #171717;
    border-radius: 16px;

    .links {
        height: 345px;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 20px;
        margin-top: 20px;

        a {
            color: white;
            display: inline-block;
            margin-left: 20px;
            margin-bottom: 6px;
        }
    }
`;

const TrendingTop = styled.div`
    height: 61px;
    color: #fff;
    border-bottom: 1px solid #484848;
    display: flex;
    justify-content: center;
    align-items: center;
    > p {
        width: 80%;
        font-weight: 700;
        font-size: 27px;
        font-family: 'Oswald', sans-serif;
    }
`;
