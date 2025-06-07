import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductsLengthKnown from './components/ProductsLengthKnown'
import ProductsWithUnknownLength from './components/ProductsWithUnknownLength'

function App() {
  return (
    <div className='m-3 flex flex-col justify-center items-center' >
      {/* <ProductsLengthKnown/> */}
      <ProductsWithUnknownLength/>
    </div>
  )
}

export default App
