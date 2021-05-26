import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className='app'>
      <div className='header'>
      <span>Login</span> <span>Register</span>
    </div>
    <form className='register'>
      <label>Register:</label>
      <input type='text' placeholder='firstName here '/>
      <input type='text' placeholder='lastName here '/>
      <input type='number' placeholder='age here '/>
      <input type='text' placeholder='country here '/>
      <input type='text' placeholder='email here '/>
      <input type='password' placeholder='password here '/>
      <button>Register</button>
    </form>
    </div>
  );
}
