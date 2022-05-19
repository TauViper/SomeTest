import { Input } from "@mui/material";
import { nanoid } from "nanoid";
import { push, set } from "firebase/database";
import { useParams } from "react-router-dom";
import React, { FC, memo, useState } from "react";

import { AUTHOR } from "src/constants";

import { Button } from "../Button/Button";

import { getMessageListById } from "src/services/firebase";

export const Form: FC = memo(() => {
  const [value, setValue] = useState("");
  const { chatId } = useParams();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId && value) {
      const id = nanoid();
      push(getMessageListById(chatId), {
        author: AUTHOR.user,
        id,
        text: value,
      });
    }
    setValue("");
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        className="input"
        autoFocus
        placeholder="Введите текст"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button />
    </form>
  );
});
