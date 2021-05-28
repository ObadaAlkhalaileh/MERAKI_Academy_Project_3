import React,{useState} from 'react'

const axios = require('axios').default;


const Login = ({className}) => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const submit =()=>{
        console.log('register buttin click');
        axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            data: {email,password}
        })
        .then((response) => {  
            console.log(response.data);
                // setSuccess(false)
                // console.log(response.data.errors)
            // setSuccess(true);
        })
        .catch((err) => {
            console.log('ERR: ', err);
            
        });
    }
    
    return (
        <form className={className}>
      <label>Login:</label>
      <input type="text" placeholder="email here " onChange={(e) => {setEmail(e.target.value);}}/>
      <input type="password" placeholder="password here " onChange={(e) => {setPassword(e.target.value);}}/>
      <button className='loginButton' type='button' >Login</button>
      </form>
    )
}

export default Login
