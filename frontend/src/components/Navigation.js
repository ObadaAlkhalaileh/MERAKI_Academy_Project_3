import React from 'react';

import { Link, Route } from "react-router-dom";

const Navigation = () => {
    return (
        <div className='header'>
            <Link to="/login">Login</Link>
            <Link to="/Register">Register</Link>
        </div>
    )
};

export default Navigation;
