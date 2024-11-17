import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Question({Question_cata}) {
    const [visiblity,setVisiblity] = useState(false);
     const [isVisible ,setIsVisible] = useState(false)
    const toggleVisiblity = ()=>{
       setVisiblity(!visiblity);
    }
    const toggleIsvisible =() =>{
        setIsVisible(!isVisible)
    }
    const category = Question_cata || 'defaultCategory';
  return (
    <div>
      <div>
    <h2>choose type of questions</h2>   
    <div onClick={toggleVisiblity}> 1 True / False</div> 
    { visiblity && (
        <div>
            <h3>Difficulty level</h3>
            <ul>
              <Link to={`/${category}/boolean/easy`}><li>Easy</li></Link> 
              <Link to={`/${category}/boolean/medium`}><li>Medium</li></Link>      
              <Link to={`/${category}/boolean/hard`}><li>Hard</li></Link>  
            </ul> 
        </div>
            )
        
            }
    
    <div onClick={toggleIsvisible}> 2 multiple </div>
    { isVisible && (
        <div>
            <h3>Difficulty level</h3>
            <ul>
              <Link to={`/${category}/multiple/easy`}><li>Easy</li></Link> 
              <Link to={`/${category}/multiple/medium`}><li>Medium</li></Link>      
              <Link to={`/${category}/multiple/hard`}><li>Hard</li></Link> 
            </ul> 
        </div>
            )
            }
       
    </div>
    </div>
  )
}

export default Question
