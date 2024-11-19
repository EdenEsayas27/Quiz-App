import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classes from './Header.module.css'

function Header() {
    const [selectedValue,setSelectedValue] = useState("");
    const navigate = useNavigate();
    const  handleChange=(event)=>{
     setSelectedValue(event.target.value)
      if (event.target.value) {
        navigate(`/categories/${event.target.value.toLowerCase().replace(/\s+/g, '-')}`);
    }
     }
  return (
    <div>
       <div className={classes.header}>
            <Link to="/">HOME</Link>
            <select id="dropDown" value={selectedValue} onChange={handleChange}>
                <option value=""  disabled>
                    Catagories
                </option>
                <option value="GeneralKnowledge">General Knowledge</option>
                <option value="Books">Books</option>
                <option value="History">History</option>
                <option value="Music">music</option>

            </select>

        </div>
    </div>
  )
}

export default Header
