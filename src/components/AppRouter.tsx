import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { ChatList } from "./pages/ChatList"
import { Chats } from "./pages/Chats"
import { Profile } from "./pages/Profile"
import React, { FC } from 'react';
import { Header } from "./Header/Header";

export const AppRouter: FC = () => (
    < BrowserRouter >
        <Routes>
            <Route path='/' element={<Header />} />
            <Route path='/Chats'>
                <Route index element={<ChatList />} />
                <Route path=':chatId' element={<Chats />} />
            </Route>
            <Route path='/Profile' element={<Profile />} />
            <Route path='*' element={<div className="ErrorPage">
                <h2>Page not found.</h2>
                <h4 className="ErrorPage__message">Our apologies, this is almost certainly not the page you were looking for.</h4>
                <h4 className="ErrorPage__secondaryMessage">Please try the search tool, above, or visit our  <Link to="/">Home Page</Link>.</h4>
                <a className="Link" href="/"></a>
            </div>} />
        </Routes>
    </BrowserRouter >
);