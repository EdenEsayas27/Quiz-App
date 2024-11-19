import React from 'react'
import Header from '../../Components/Header/Header';
import {Link} from 'react-router-dom'
import classes from './Home.module.css'
function Home() {
   
  return (
    <div className={classes.container}>
      <Header />
      <h1>Charm Quiz App</h1>
      <h2>Quizzes Made Fun!
      Challenge Yourself, Learn Something New!</h2>
      <div className={classes.buttonContainer}>
     <Link to="/Categories"><button>Get Started</button></Link>
     </div> 
    </div>
  )
}

export default Home
