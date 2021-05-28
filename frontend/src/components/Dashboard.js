import React from 'react'
import { Route } from "react-router-dom";


const Dashboard = ({className}) => {


    return (
        <div className={className}>
      <p>Dashboard</p>
      <button type='button' className='loginButton' style={{ width: '150px' }}>Get All Articles</button>
    </div>
    )
}

export default Dashboard
