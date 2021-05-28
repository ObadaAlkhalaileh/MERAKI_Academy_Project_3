import React,{useState} from 'react'
import SuccessReg from "./SuccessReg";

const axios = require('axios').default;

const NewArticle = ({className,token}) => {
const [title,setTitle]=useState()
const [description,setDescription]=useState()

const [success,setSuccess]=useState(undefined)

    const createArticle=()=>{
        if(token){
        axios({
            method: 'post',
            url: 'http://localhost:5000/articles',
            data: {title,description},
            headers: {'Authorization': `Bearer ${token}` }
        })
        .then((response) => {  
            console.log(response);
            console.log(token);
            if(response.data.errors){setSuccess('Error happened while creating a new article, please try again ')}
            else{setSuccess('The article has been created successfully')}
        })
        .catch((err) => {
            console.log('ERR: ', err.response);
            // if(err.response.status===404){setLoginResult(404)}
            // if(err.response.status===403){setLoginResult(403)}
        });
    }
    }

    return (
        <div className={className}>
           New Article
           <input type="text" placeholder="title here " onChange={(e) => {setTitle(e.target.value);}}/>
           <input type="text" style={{height:'120px'}} placeholder="description here " onChange={(e) => {setDescription(e.target.value);}}/>
           <button className='registerButton' type='button' onClick={createArticle}>Create new article</button>
        {success==='Error happened while creating a new article, please try again ' ?<SuccessReg className='failMessage' text={success}/>
        :success==='The article has been created successfully'?<SuccessReg className='successMessage' text={success}/>
    :null}
        </div>
    )
}

export default NewArticle
