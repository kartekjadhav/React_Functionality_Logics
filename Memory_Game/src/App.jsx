import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Grid from './components/Grid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Grid/>
    </div>
  )
}

export default App
