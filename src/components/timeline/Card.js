import { newTab } from './utils';
import styled from 'styled-components';
import LinkPage from './LinkPage';
import { useState } from 'react';

export default function Card({ post }) {
    const [iframe, setIframe] = useState(false);

    return (
        <>
            <Button
                key={post.id}
                img={post.linkImage}
                onClick={() => {
                    setIframe(true);
                }}
            >
                <div className="link-title">{post.linkTitle}</div>
                <div className="description">{post.linkDescription}</div>
                <div className="url">{post.link}</div>
            </Button>
            {iframe 
            ? <LinkPage link={post.link} iframe={iframe} setIframe={setIframe} />
            : ''}    
        </>
    );
}

const Button = styled.button`
    background-color: #171717;
    border-radius: 27px;
    color: white;
    outline: none;
    margin-top: 10px;
    border: 1px solid #4d4d4d;
    height: auto;
    min-height: 155px;
    width: 80%;
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
