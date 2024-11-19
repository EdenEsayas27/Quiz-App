import React from 'react'
import { Link } from 'react-router-dom'
import classes from './catagories.module.css'
import Header from '../../Components/Header/Header'
function Catagories() {
  return (
    <div className={classes.container}>
      <div>
        <Header/>
        </div>
      <div className={classes.title} ><p> Choose Category </p> </div>
      <div className={classes.linksContainer}>
     
      <Link to="/categories/generalknowledge">  <label>General Knowledge</label><div className={classes.generalKnowledge}></div></Link>  
      <Link to="/categories/books"><label>Books</label><div className={classes.books}>s</div> </Link>
      <Link to="/categories/History"><label>History</label><div className={classes.history}></div></Link>
      <Link to="/categories/music"><label>Music</label><div className={classes.music}></div></Link>
      </div>
    </div>
  )
}

export default Catagories
