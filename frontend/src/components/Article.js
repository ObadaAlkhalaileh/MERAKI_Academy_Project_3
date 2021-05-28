import React from 'react'

const Article = ({title,description,className}) => {
    return (<>
        <div className={className}>
            <span style={{display:'inline'}}>{title}</span><span className="moreDetails" style={{fontSize:'16px'}}>More Details</span>
            <p>{description}</p>
        </div>
        <br></br>
        </>
    )
}

export default Article
