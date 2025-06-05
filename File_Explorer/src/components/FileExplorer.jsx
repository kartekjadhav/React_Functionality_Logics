import React, { useState } from 'react'
import { addToHierarchy } from '../utils/AddToHierarchy';

const FileExplorer = ({data, fileData, setFileData}) => {
    const [open, setOpen] = useState([]);
    const [showInput, setShowInput] = useState({
        id: null,
        isFolder: false,
        visible: false
    })
  
    function handleOpen(id) {
        if (open.includes(id)) {
            setOpen(open.filter((val) => {
                return val !== id
            }))
        }
        else {
            setOpen(prev => [...prev, id])
        }
    }

    function handleAddFileFolder (e, id, isFolder) {
        e.stopPropagation();
        setShowInput({
            id: id,
            isFolder: isFolder,
            visible: true
        })
    }

    function createFileFolder(e, parentid) {
        if (e.key === 'Enter' && e.target.value.trim()) {
            // Create file folder
            let name = e.target.value.trim();
            let copy = JSON.parse(JSON.stringify(fileData));
            let [,responseData] =  addToHierarchy(copy, parentid, name, showInput.isFolder);
            setFileData(responseData)

            setShowInput(prev => ({...prev, visible: false}))
        }
    }

    return (
    <div>
        {data && data.map((d, index) => {
            if (d.isFolder) {
                
                return <div key={d.id}>
                    <div onClick={() => handleOpen(d.id)} className='px-3 py-2 mt-1 flex justify-between items-center bg-gray-200 w-100 rounded-lg cursor-pointer'>
                       <p>📁 {d.name}</p>
                       <div>
                           <span onClick={(e) => handleAddFileFolder(e, d.id, true)} className='border rounded px-2 py-1 mr-1' >
                               Folder +
                           </span>
                           <span onClick={(e) => handleAddFileFolder(e, d.id, false)} className='border rounded px-2 py-1' >
                               File +
                           </span>
                       </div>
                   </div>
                   {d?.children && open.includes(d.id) && 
                        <div className='ml-4'>
                            <FileExplorer fileData={fileData} setFileData={setFileData} data={d.children} />
                        </div>
                    }
                    {showInput.visible && showInput.id === d.id && 
                        <div className='ml-3'>
                            {showInput.isFolder ? "📁" : "🗒️"} 
                            <input type="text" 
                                   autoFocus 
                                   onBlur={() => setShowInput(prev => ({...prev, visible: false}))} 
                                   onKeyDown={(e) => createFileFolder(e, d.id)}
                                   />
                        </div>
                    }
                </div> 
            }
            else {
                return <div key={d.id} className='px-3 py-2 mt-1 bg-gray-200 w-100 rounded-lg cursor-pointer'>
                    <p>🗒️ {d.name}</p>
                </div>
            }
        })}
    </div>
  )
}

export default FileExplorer