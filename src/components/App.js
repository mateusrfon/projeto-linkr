import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import UserContext from '../contexts/UserContext';
import Timeline from './timeline/Timeline';
import Navbar from './Navbar/Navbar';
import Login from './login/login';
import Signup from './login/sign-up';
import UserPosts from './UserPosts';
import Hashtags from './hashtags/Hashtags';
import MyLikes from './mylikes/MyLikes';

export default function App() {
    const [userInfo, setUserInfo] = useState({
        token: '',
        user: {
            id: '',
            email: '',
            username: '',
            avatar: '',
        },
    });

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <GlobalStyle />
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/sign-up">
                        <Signup />
                    </Route>
                    <Route path="/timeline">
                        <Navbar />
                        <Timeline />
                    </Route>
                    <Route path="/my-posts">
                        <Navbar />
                        <UserPosts />
                    </Route>
                    <Route path="/my-likes">
                        <Navbar />
                        <MyLikes />
                    </Route>
                    <Route path="/user/:id">
                        <Navbar />
                        <UserPosts />
                    </Route>
                    <Route path="/hashtag/:hashtag">
                        <Navbar />
                        <Hashtags />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        color: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
        text-decoration: none;
 
    }

    body {
        overflow-x: hidden;
    }
`;
