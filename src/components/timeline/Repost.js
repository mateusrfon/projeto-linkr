import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";



export default function Repost({post,userInfo,attPosts,shareModal,setShareModal}){
    const [disabled, setDisabled] = useState(false);

    return (
        <>
            <Confirm onClick={() => setShareModal(false)}>
                
                <div>
                    <h1>
                        {disabled
                            ? 'Compartilhando post'
                            : 'Tem certeza que deseja compartilhar essa publicação?'}
                    </h1>
                    <span>
                        <No disabled={disabled} onClick={() => setShareModal(false)}>
                            Não, voltar
                        </No>
                        <Yes disabled={disabled} onClick={() => share()}>
                            {' '}
                            Sim, repostar{' '}
                        </Yes>
                    </span>
                </div>
            </Confirm>
        </>
    );

    function share(){
        setDisabled(true);
      
        
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/share`,null,  { headers: { Authorization: `Bearer ${userInfo.token}` } })
            request.then(promise => {
                attPosts();
                setShareModal(false);
            })
            request.catch(error => {alert('não foi possivel compartilhar o post');
                setShareModal(false);})


}
}

const Confirm = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        background-color: #333;
        width: 60vw;
        height: 25vh;
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
        @media (max-width: 1000px) {
            width: 90vw;
        }
        span {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        h1 {
            color: #fff;
            font-size: 34px;
            

            @media (max-width: 1000px) {
                font-size: 20px;
                text-align: center;
            }
        }
        button {
            width: 10vw;
            height: 4vh;
            border-radius: 5px;
            font-size: 18px;
            margin: 0 3vw;

            @media (max-width: 1000px) {
                width: 25vw;
                height: 6vh;
            }
        }
    }
`;
const Yes = styled.button`
    background-color: ${(props) => (props.disabled ? '#0867h2' : '#1877F2')};
    color: #fff;
`;
const No = styled.button`
    background-color: ${(props) => (props.disabled ? '#141414' : '#fffff')};
    color: #1877f2;
`;
