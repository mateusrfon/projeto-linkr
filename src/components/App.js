import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import UserContext from '../contexts/UserContext';
import Timeline from './timeline/Timeline';
import Login from './login/login';
import Signup from './login/sign-up';

export default function App() {
    const [userInfo, setUserInfo] = useState({});

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <GlobalStyle />
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/sign-up" exact>
                        <Signup />
                    </Route>
                    <Route path="/timeline">
                        <Timeline />
                    </Route>
                    <Route path="/my-posts"></Route>
                    <Route path="/my-likes"></Route>
                    <Route path="/user/:id"></Route>
                    <Route path="/hashtag/:hashtag"></Route>
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
        vertical-align: baseline;
        box-sizing: border-box;
    }
`;
