import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import Navbar from "./navbar/Navbar";

const Layout = () => {
    return (
        <div>
            <Navbar/>
            <div id='root'>

                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;