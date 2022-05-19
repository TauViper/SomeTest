import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "src/services/firebase";

export const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      await login(email, password);
      navigate("/Chats");
    } catch (err) {
      setError((err as Error).message);
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
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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

        {error && <p className="Login__error">{error}</p>}
      </form>
    </>
  );
};
