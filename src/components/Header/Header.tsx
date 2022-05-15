import React, { FC } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "src/store/profile/selectors";
import { changeAuth } from "src/store/profile/slice";

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
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

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
          <button
            className="logout"
            onClick={() => dispatch(changeAuth(false))}
          >
            Logout
          </button>
        ) : (
          <Link className="SingIn" to="/signin">
            SingIn
          </Link>
        )}
      </header>
      <Outlet />
    </>
  );
};
