import React, { useState } from 'react'
import {Link} from 'react-router-dom'
function Home() {
    const [selectedValue,setSelectedValue] = useState("");
    const  handleChange=(event)=>{
      setSelectedValue(event.target.value)
     }
  return (
    <div>
        <div>
            <Link to="/">HOME</Link>
            <select id="dropDown" value={selectedValue} onChange={handleChange}>
                <option value=""  disabled>
                    Catagories
                </option>
                <option value="General Knowledge">General Knowledge</option>
                <option value="Books">Books</option>
                <option value="History">History</option>
                <option value="Music">music</option>

            </select>

        </div>
      <h1>Charm Quiz App</h1>
      <h2>Quizzes Made Fun!
      Challenge Yourself, Learn Something New!</h2>
     <Link to="/Catagories"><button>Get Started</button></Link> 
    </div>
  )
}

export default Home
