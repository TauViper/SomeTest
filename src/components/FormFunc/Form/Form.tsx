
import React, { useState, FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AUTHOR } from '../../../constants';
import { addMessageWithReply } from '../../../store/chats/actions';
import { ChatsState } from '../../../store/chats/reducer';
import { AddMessage } from '../../../store/chats/types';
import { Button } from '../Button/Button';



export const Form: FC = memo(() => {
    const [value, setValue] = useState('');
    const { chatId } = useParams();
    const dispatch =
        useDispatch<ThunkDispatch<ChatsState, void, ReturnType<AddMessage>>>();

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (chatId && value) {
            dispatch(
                addMessageWithReply(chatId, { text: value, author: AUTHOR.user })
            );
        }
        setValue('');
    };

    return (
        <form onSubmit={handleSubmitForm}>
            <input
                className='input'
                autoFocus placeholder='Введите текст'
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button />
        </form>
    );
});