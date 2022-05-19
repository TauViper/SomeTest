import { onValue, push } from "firebase/database";
import { nanoid } from "nanoid";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { AUTHOR } from "src/constants";
import { getChatsById, getMessageListById } from "src/services/firebase";
import { StoreState } from "src/store";
import { selectChat, selectChats } from "../../store/chats/selectors";
import { Form } from "../FormFunc/Form/Form";
import { MessageList } from "../FormFunc/MessageList";
import { Header } from "../Header/Header";

export const Chats: FC = () => {
  const { chatId } = useParams();

  const messages = useSelector((state: StoreState) =>
    selectChat(state, chatId || "")
  );

  const chats = useSelector(selectChats);

  useEffect(() => {
    if (chatId) {
      onValue(getChatsById(chatId), (snapshot) => {
        const chat = snapshot.val();
        const lastMessage: any = Object.entries(chat.messageList)[
          Object.entries(chat.messageList).length - 2
        ][1];
        if (lastMessage.author !== "bot") {
          push(getMessageListById(chatId), {
            author: AUTHOR.bot,
            id: nanoid(),
            text: "Im BOT",
          });
        }
      });
    }
  }, []);

  if (chatId && !chats[chatId]) {
    return <Navigate replace to="/chats" />;
  }
  return (
    <>
      <Header />
      <main>
        <MessageList messages={chatId ? messages : []} />
        <Form />
      </main>
    </>
  );
};
