import React from 'react'
import { Link } from 'react-router-dom'
function Catagories() {
  return (
    <div>
      <h2>choose which quiz you want to  take </h2>
      <div>
        <Link to="/categories/general-knowledge">General Knowledge</Link>
        <Link to="/categories/books">Books</Link>
        <Link to="/categories/History">History</Link>
        <Link to="/categories/music">Music</Link>
      </div>
    </div>
  )
}

export default Catagories
