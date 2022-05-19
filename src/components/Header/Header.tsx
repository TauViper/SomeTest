import React, { FC, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "src/store/profile/selectors";
import { logout } from "src/services/firebase";

const navigate = [
  {
    id: 1,
    name: "Home",
    to: "/",
  },
  {
    id: 2,
    to: "/Chats",
    name: "Chats",
  },
  {
    id: 3,
    to: "/Profile",
    name: "Profile",
  },
  {
    id: 4,
    to: "/Error",
    name: "ErrorViewer",
  },
  {
    id: 5,
    name: "Articles",
    to: "/articles",
  },
];

export const Header: FC = () => {
  const [error, setError] = useState("");
  const auth = useSelector(selectAuth);

  const handleSignOut = async () => {
    setError("");
    try {
      await logout();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <header>
        {navigate.map((link) => (
          <NavLink
            key={link.id}
            to={link.to}
            style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}
          >
            {link.name}
          </NavLink>
        ))}

        {auth ? (
          <button className="logout" onClick={handleSignOut}>
            logout
          </button>
        ) : (
          <>
            <Link className="SingIn" to="/signin">
              SingIn
            </Link>
            <Link className="SingIn" to="/signup">
              SingUp
            </Link>
          </>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <Outlet />
    </>
  );
};
