import React, { FC } from "react"
import { Outlet, NavLink } from "react-router-dom"

const navigate = [
    {
        id: 1,
        to: '/',
        name: 'Home',
    },
    {
        id: 2,
        to: '/Chats',
        name: 'Chats',
    },
    {
        id: 3,
        to: '/Profile',
        name: 'Profile',
    },
    {
        id: 4,
        to: '/Error',
        name: 'ErrorViewer',
    },
];

export const Header: FC = () => (
    <>
        <header>
            {navigate.map((link) => (
                <NavLink key={link.id}
                    to={link.to}
                    style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
                >{link.name}
                </NavLink>
            ))}
        </header >
        <Outlet />
    </>


)