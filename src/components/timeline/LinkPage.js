import Iframe from 'react-iframe';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import LinkContext from '../../contexts/LinkContext';

export default function LinkPage() {
    const { link, setLink } = useContext(LinkContext);

    function close() {
        setLink({ link: '', display: false });
    }

    window.onkeydown = e => {
        if (e.which === 27) {
            close();
        }
    }

    if (!link.display) {
        return '';
    }

    return (
        <IframeBody>
            <Frame>
                <div>
                    <NewTab onClick={() => window.open(link, "_blank")}>
                        Open in new tab
                    </NewTab>
                    <AiOutlineClose 
                        onClick={close}/>
                </div>
                <Iframe url={link.link} 
                        className='iframe' 
                        allow="encrypted-media"/>
            </Frame>
        </IframeBody>
    );
}

const IframeBody = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.9);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Frame = styled.div`
    background-color: #333333;
    width: 80%;
    height: 90%;
    padding: 15px 16px 21px 27px;
    border-radius: 20px;
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        height: 31px;
        color: #fff;
        font-size: 20px;
    }
    .iframe {
        width: 100%;
        height: calc(100% - 47px);
        background-color: #fff;
    }
`;

const NewTab = styled.button`
    width: 138px;
    height: 31px;
    background-color: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    text-justify: center;
    text-align: center;
`;

