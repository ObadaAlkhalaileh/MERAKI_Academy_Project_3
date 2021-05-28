import React from 'react';

import { Link, Route } from "react-router-dom";

const Navigation = ({token}) => {
    return (
        <div className='header'>
            
            {token?<><Link to="/dashboard">Dashboard</Link>
            <Link to="/newArticle">New Article</Link></>
            :<><Link to="/login">Login</Link>
            <Link to="/register">Register</Link></>}
            

        </div>
    )
};

export default Navigation;
