import { useDispatch } from "react-redux";
import React, { FC, useState } from "react";

import { changeAuth } from "src/store/profile/slice";

export const SignIn: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(false);
    if (login === "gb" && password === "gb") {
      dispatch(changeAuth(true));
    } else {
      setError(true);
    }
  };

  return (
    <>
      <h2>Sign In</h2>
      <hr />
      <form className="Form__Login" onSubmit={handleSubmit}>
        <p className="For__login">Логин:</p>
        <input
          className="input"
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
        <p className="For__login">Пароль:</p>
        <input
          className="input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button className="Sing__In">SingIn</button>

        {error && <p className="Login__error">Логин или пароль не верны</p>}
      </form>
    </>
  );
};
