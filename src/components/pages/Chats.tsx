import React, { FC } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { WithClasses } from '../../HOC/WithClasses';
import { selectChatList, selectChats } from '../../store/chats/selectors';
import { Form } from '../FormFunc/Form/Form';
import { MessageList } from '../FormFunc/MessageList';
import { Header } from '../Header/Header';

export const Chats: FC = () => {
    const { chatId } = useParams();
    const MessageListWithClass = WithClasses(MessageList);
    const chats = useSelector(selectChats, shallowEqual);
    const chatList = useSelector(selectChatList, shallowEqual);
    if (!chatList.find((chat) => chat.name === chatId)) {
        return <Navigate replace to="/chats" />;
    }
    return (<>
        <Header />
        <main>
            <MessageList messages={chatId ? chats[chatId] : []} />
            <Form />
        </main>
    </>
    )
}