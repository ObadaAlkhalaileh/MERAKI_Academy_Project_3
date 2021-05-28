import React from 'react';

import { Link, Route } from "react-router-dom";

const Navigation = () => {
    return (
        <div className='header'>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/newArticle">New Article</Link>
        </div>
    )
};

export default Navigation;
