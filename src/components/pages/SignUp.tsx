import { useDispatch } from "react-redux";
import React, { FC, useState } from "react";

import { signUp } from "src/services/firebase";
import { useNavigate } from "react-router-dom";

export const SignUp: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await signUp(email, password);
      navigate("/signin");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
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
        <button className="Sing__In">SingUp</button>

        {error && <p className="Login__error">{error}</p>}
      </form>
    </>
  );
};
