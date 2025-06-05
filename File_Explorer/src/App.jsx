import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileExplorer from './components/FileExplorer'
import { fileHeirarchy } from './constants/FileHierarchy'

function App() {
  const [fileData, setFileData] = useState(fileHeirarchy);

  return (
    <div className='m-3'>
      <FileExplorer data={fileData} fileData={fileData} setFileData={setFileData} />
    </div>
  )
}

export default App
