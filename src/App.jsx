import { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>

      {/* <Routes>
        <Route path="/Register" element={<Register />}/>
      </Routes> */}

    </>
  )
}

export default App
