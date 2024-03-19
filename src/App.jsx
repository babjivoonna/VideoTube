import { useState, useSyncExternalStore } from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

function App() {
 const [sidebar,setSideBar]=useState(true)
  return (
   <div>
    <Navbar setSideBar={setSideBar}/>  
    <Routes>
      <Route path="/" element={<Home sidebar={sidebar}/>}/>
      <Route path="/video/:categoryId/:videoId" element={<Video/>} />
    </Routes>
   </div>
  )
}

export default App
