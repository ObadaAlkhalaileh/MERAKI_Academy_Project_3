import React from 'react'

const Article = ({title,description,className}) => {
    return (<>
        <div className={className}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        <br></br>
        </>
    )
}

export default Article
