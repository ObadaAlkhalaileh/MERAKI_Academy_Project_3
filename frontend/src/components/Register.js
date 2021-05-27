import React, {useState} from "react";

const axios = require('axios').default;

const Register = () => {
const [firstName,setFirstName]=useState()
const [lastName,setLastName]=useState()
const [age,setAge]=useState()
const [country,setCountry]=useState()
const [email,setEmail]=useState()
const [password,setPassword]=useState()
    
const submit =()=>{
    console.log('hi');
    axios({
        method: 'post',
        url: 'http://localhost:5000/users',
        data: {firstName,lastName,age,country,email,password}
      })
      .then((response) => {  
        console.log(response.data);
        // setPosts(response.data);
      })
      .catch((err) => {
        console.log('ERR: ', err);
      });
}

  return (
    <form className="register">
      <label>Register:</label>
      <input type="text" placeholder="firstName here " onChange={(e) => {setFirstName(e.target.value);}}/>
      <input type="text" placeholder="lastName here " onChange={(e) => {setLastName(e.target.value);}}/>
      <input type="number" placeholder="age here " onChange={(e) => {setAge(e.target.value);}}/>
      <input type="text" placeholder="country here " onChange={(e) => {setCountry(e.target.value);}}/>
      <input type="text" placeholder="email here " onChange={(e) => {setEmail(e.target.value);}}/>
      <input type="password" placeholder="password here " onChange={(e) => {setPassword(e.target.value);}}/>
      <button onClick={submit}>Register</button>
    </form>
  );
};

export default Register;
