import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Ai from './pages/Ai'
import User from './pages/User'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Welcome></Welcome>}></Route>
      <Route path='/sign-up' element={<Signup></Signup>}></Route>
      <Route path='/sign-in' element={<Signin></Signin>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/ai' element={<Ai></Ai>}></Route>
      <Route path='/profile' element={<User></User>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
