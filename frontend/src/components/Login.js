import React,{useState} from 'react'
import SuccessReg from "./SuccessReg";

const axios = require('axios').default;


const Login = ({className, token,setToken}) => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const [loginResult,setLoginResult]=useState(undefined)

    const login =()=>{
        console.log('login button click');
        axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            data: {email,password}
        })
        .then((response) => {  
            console.log(response);
            setToken(response.data.token)
            //token connected to navigation options and redirect condition in app.js
        })
        .catch((err) => {
            // console.log('ERR: ', err.response);
            if(err.response.status===404){setLoginResult(404)}
            if(err.response.status===403){setLoginResult(403)}
        });
    }
    
    return (
        <form className={className}>
      <label>Login:</label>
      <input type="text" placeholder="email here " onChange={(e) => {setEmail(e.target.value);}}/>
      <input type="password" placeholder="password here " onChange={(e) => {setPassword(e.target.value);}}/>
      <button className='loginButton' type='button' onClick={login} >Login</button>
     {loginResult===404?<SuccessReg className='failMessage' text="The email doesn't exist"/>
     :loginResult===403?<SuccessReg className='failMessage' text="The password you've entered is incorrect "/>
     :null}
      </form>
   )
}

export default Login
