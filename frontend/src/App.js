import React, {useState} from "react";
import "./App.css";

import { Link, Route,Switch } from "react-router-dom";

import Navigation from './components/Navigation';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import NewArticle from './components/NewArticle';

export default function App() {
  
  return (
  <div className='app'>
      <Navigation/>
  <Route path="/login" render={()=><Login className="login"/>} />
  <Route path="/register" render={()=><Register className="register"/>} />
  <Route path="/dashboard" render={()=><Dashboard className="dashboard"/>} />
  <Route path="/newArticle" render={()=><NewArticle/>} />
  </div>
  
  );
}
