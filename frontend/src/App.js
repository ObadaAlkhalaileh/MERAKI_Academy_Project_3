import React, {useState} from "react";
import "./App.css";
import Navigation from './components/Navigation';
import Register from './components/Register';
import Login from './components/Login';

import { Link, Route } from "react-router-dom";

export default function App() {
  return (
    <div className='app'>
      <Navigation/>
      <Route path="/login" render={()=><Login className="login"/>} />
      <Route path="/Register" render={()=><Register className="register"/>} />
    </div>
  );
}
