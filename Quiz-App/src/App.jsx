import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import Home from './Pages/Home/home'
import Catagories from './Pages/Catagories/Catagories'
import GeneralKnowledge from './Pages/GeneralKnowledge/GeneralKnowledge'
import Quiz from './Components/Quiz/Quiz'
import Books from './Pages/Books/Books'
import Music from './Pages/Music/Music'
import History from './Pages/History/History'
function App() {
 
  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route  path='/catagories' element={<Catagories />} />
      <Route path='/categories/general-knowledge' element={<GeneralKnowledge />} />
      <Route path='/categories/books' element={<Books />} />
      <Route path='/categories/history' element={<History />} />
      <Route path='/categories/music' element={<Music />} />
      <Route path='/:category/:type/:difficulty' element={<Quiz />}  />
    </Routes>
    </Router>
    </>
  )
}

export default App
