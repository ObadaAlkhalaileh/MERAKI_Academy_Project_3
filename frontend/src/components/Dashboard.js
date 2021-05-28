import React,{useState,useEffect} from 'react'
import { Route } from "react-router-dom";

import Article from "./Article";

const axios = require('axios').default;

const Dashboard = ({className}) => {
const [articles,setArticles]=useState([])

useEffect(() => {
    getAllArticles();
  }, []);

const getAllArticles=()=>{

    axios({
        method: 'get',
        url: 'http://localhost:5000/articles' 
    })
    .then((response) => {  
        console.log(response.data);
        setArticles(response.data);
    })
    .catch((err) => {
        console.log('ERR: ', err.response);
    });

}
    return (
        <div className={className}>
      <p>Dashboard</p>
      <button type='button' className='loginButton' onClick={getAllArticles} style={{ width: '150px' }}>Get All Articles</button>
      <div className='articles'>
    {articles.map((elem,i)=>(<Article key={i} className="article" title={elem.title} description={elem.description}/>))}
    </div>
    </div>
    
    )
}

export default Dashboard
