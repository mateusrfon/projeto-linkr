import styled from 'styled-components';
import React,{ useState, useContext } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import UserContext from '../../contexts/UserContext';

import './icons.css';

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);

    function logout() {
        setUserInfo({
            "token": '',
            "user": {
                "id": '',
                "email": '',
                "username": '',
                "avatar": ''
            }
        });
    }

    return (
        <StyledNavbar>
            <Linkr>linkr</Linkr>
            <MenuButton onClick={() => setMenu(!menu)}>
                <IconContext.Provider value={{ className: "arrow" }}>
                    {menu ? <AiOutlineUp /> : <AiOutlineDown />}
                    <img src={userInfo.user.avatar} alt="user"/>
                </IconContext.Provider>
            </MenuButton>
            <Menu display={menu.toString()}>
                <BrowserRouter>
                        <Link to='/my-posts'>My posts</Link>
                        <Link to='/my-likes'>My likes</Link>
                        <Link to='/' onClick={logout}>Logout</Link>
                </BrowserRouter>
            </Menu>
        </StyledNavbar>
    );
}

const StyledNavbar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 72px;
    background-color: #151515;
    padding: 0 17px 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1000px) {
        padding: 0 14px 0 17px;
    }
`;

const Linkr = styled.h1`
    color: #fff;
    font-size: 45px;
    font-family: 'Passion One';
    font-weight: 700;
    letter-spacing: 5%;
`;

const MenuButton = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 53px;
        height: 53px;
        border-radius: 27px;

        @media (max-width: 1000px) {
            width: 44px;
            height: 44px;
        }
    }
`;

const Menu = styled.div`
    position: fixed;
    top: 72px;
    right: 0;
    width: 130px;
    height: 109px;
    background-color: #171717;
    display: ${props => (props.display === 'true') ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 17px 0;
    border-bottom-left-radius: 20px;

    font-family: 'Lato';
    font-weight: 700;
    color: #fff;
    font-size: 17px;
    letter-spacing: 5%;

    @media (max-width: 1000px) {
        height: 97px;
        font-size: 15px;
    }
`;