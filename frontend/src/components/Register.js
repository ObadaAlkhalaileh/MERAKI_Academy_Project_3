import React, {useState} from "react";
import SuccessReg from "./SuccessReg";

const axios = require('axios').default;

const Register = ({className}) => {

const [firstName,setFirstName]=useState()
const [lastName,setLastName]=useState()
const [age,setAge]=useState()
const [country,setCountry]=useState()
const [email,setEmail]=useState()
const [password,setPassword]=useState()

const [success,setSuccess]=useState(undefined)
    
const submit =()=>{
    console.log('register buttin click');
    axios({
        method: 'post',
        url: 'http://localhost:5000/users',
        data: {firstName,lastName,age,country,email,password}
      })
      .then((response) => {  
        // console.log(response.data);
        console.log(response.data);
        if(response.data.errors || response.data.name==="MongoError"){
            if(response.data.errors){
                if(response.data.errors.password){if(response.data.errors.password.kind==="required"){setSuccess('Password required')}}
                if(response.data.errors.email){if(response.data.errors.email.kind==="required"){setSuccess('E-mail required')}}
            }
            if(response.data.name==="MongoError"){if(response.data.code===11000){setSuccess(11000)}}
            
            // setSuccess(false)
            // console.log(response.data.errors)
        }else{setSuccess(true);}
      })
      .catch((err) => {
          //this error only occur when we cant reach the path
          //all other errors in entring data will come with a message to response
        console.log('ERR: ', err);
        alert("Please connect to the right host");
      });
}

  return (
    <form className={className}>
      <label>Register:</label>
      <input type="text" placeholder="firstName here " onChange={(e) => {setFirstName(e.target.value);}}/>
      <input type="text" placeholder="lastName here " onChange={(e) => {setLastName(e.target.value);}}/>
      <input type="number" placeholder="age here " onChange={(e) => {setAge(e.target.value);}}/>
      <input type="text" placeholder="country here " onChange={(e) => {setCountry(e.target.value);}}/>
      <input type="text" placeholder="email here " onChange={(e) => {setEmail(e.target.value);}}/>
      <input type="password" placeholder="password here " onChange={(e) => {setPassword(e.target.value);}}/>
    {/* type of button is set to button instead of submit(default) */}
      <button className='registerButton' type='button' onClick={submit}>Register</button>

      {/* {success===true?<SuccessReg className='successMessage' text='The user has been created successfuly'/>
      :success===false?<SuccessReg className='failMessage' text='Error happened while register, Please try again'/>
      :null} */}

    {success===true?<SuccessReg className='successMessage' text='The user has been created successfuly'/>
      :success==="E-mail required"?<SuccessReg className='failMessage' text={success}/>
      :success==="Password required"?<SuccessReg className='failMessage' text={success}/>
      :success===11000?<SuccessReg className='failMessage' text={`E-mail is already taken`}/>
      :null}
    </form>
  );
};

export default Register;
