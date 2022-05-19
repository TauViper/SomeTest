import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import ButtonUI from "@mui/material/Button";
import { useSelector } from "react-redux";
import { push, remove, set } from "firebase/database";
import { selectChatList } from "../../store/chats/selectors";
import { chatsRef, getChatsById } from "src/services/firebase";
import { nanoid } from "nanoid";

export const ChatList: FC = () => {
  const [name, setName] = useState("");

  const chatList = useSelector(
    selectChatList,
    (prev, next) => prev.length === next.length
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      const id = nanoid();

      push(chatsRef, {
        id,
        messageList: {
          empty: true,
        },
        name,
      });

      setName("");
    }
  };

  const handleDeleteChat = (id: string) => {
    remove(getChatsById(id));
  };
  return (
    <>
      <ul>
        {chatList.map((chat) => (
          <li key={chat.id}>
            <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
            <button
              className="delete__chat"
              onClick={() => handleDeleteChat(chat.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          autoFocus
          placeholder="Введите текст"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ButtonUI variant="contained" type="submit">
          Add Chat
        </ButtonUI>
      </form>
    </>
  );
};
