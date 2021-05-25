import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import UserContext from '../contexts/UserContext';

import Publish from './timeline/Publish';
export default function App() {
    const [userInfo, setUserInfo] = useState({});

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <Publish/>

            <GlobalStyle/>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                    </Route>
                    <Route path="/sign-up"></Route>
                    <Route path="/timeline"></Route>
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