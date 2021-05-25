import styled from 'styled-components';

export default function Post() {
    const userImage = 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg';

    return (
        <PostBox>
                <UserImage src={userImage} alt={'user'}/>
                <Form>
                    <p>O que você tem pra favoritar hoje?</p>
                    <input placeholder="http://..."/>
                    <textarea placeholder="Descrição do seu link #descrição"/>
                    <div>
                        <button>Publicar</button>
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
    input,textarea {
        width: 100%;
        padding: 5px 0 7px 13px;
        background-color: #EFEFEF;
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
        background-color: #1877F2;
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