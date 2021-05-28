import React, {useState} from "react";
import "./App.css";

import { Link, Route,Switch,Redirect } from "react-router-dom";

import Navigation from './components/Navigation';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import NewArticle from './components/NewArticle';

export default function App() {
  const [token,setToken]=useState()

  return (<>
  <div className='app'>
      <Navigation token={token}/>
  <Route path="/login" render={()=><Login className="login" token={token} setToken={setToken}/>} />
  <Route path="/register" render={()=><Register className="register"/>} />
  <Route path="/dashboard" render={()=><Dashboard className="dashboard"/>} />
  <Route path="/newArticle" render={()=><NewArticle className="newArticle" token={token}/>} />
  </div>
  {token?<Redirect to="/dashboard" />:null}
    </>
  );
}
