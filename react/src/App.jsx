import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './NavBar'
import Course from './Course'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <NavBar /> */}
      <Course name="HTML" duration="4 weeks" price="$99" />
    </>
  )
}

export default App
