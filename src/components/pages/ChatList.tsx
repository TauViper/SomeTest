import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ButtonUI from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from '../../store/chats/actions';
import { selectChatList } from '../../store/chats/selectors';


export const ChatList: FC = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const chatList = useSelector(
        selectChatList,
        (prev, next) => prev.length === next.length
    );
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name) {
            dispatch(addChat(name));
            setName('');
        }
    };
    return (
        <>
            <ul>
                {chatList.map((chat) => (
                    <li key={chat.id}>
                        <Link to={`/chats/${chat.name}`}>{chat.name}</Link>
                        <button className="delete__chat" onClick={() => dispatch(deleteChat(chat.name))}>x</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input className='input' autoFocus placeholder='Введите текст' type='text'
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <ButtonUI variant='contained' type='submit' endIcon={<SendIcon />}>Add Chat</ButtonUI>
            </form>
        </>
    );
};