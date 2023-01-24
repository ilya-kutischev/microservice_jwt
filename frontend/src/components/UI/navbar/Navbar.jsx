import React from 'react';
import {NavLink, Outlet, useMatch} from "react-router-dom";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbar__links">
                <NavLink to="/about">О сайте</NavLink>
                <NavLink to="/posts">Посты</NavLink>
            </div>
        </div>

    );
};

export default Navbar;