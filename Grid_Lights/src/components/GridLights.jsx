import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const GridLights = () => {
    const [clicked, setClicked] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const grid = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]

    function deactivateCells() {
        setDisabled(true);

        let timer = setInterval(() => {
            setClicked((prev) => {
                const newClicked = prev.slice(0, -1);
                if (newClicked.length === 0) {
                    clearInterval(timer);
                    setDisabled(false);
                }

                return newClicked
            })
        }, 300);
    }

    function handleCardClick(row, col) {
        if (disabled) return;

        if (!checkClicked([row, col])) {
            const newClicked = [...clicked, [row, col]]
            setClicked(newClicked)

            if (newClicked.length === 8) {
                deactivateCells()
            }

        } else {
            setClicked(clicked.filter(([r, c]) => !(r === row && c === col) ))
        }
    }

    function checkClicked(row, col) {
        return clicked.some(([r, c]) => (r===row && c===col))
    }

    return (
    <div className='grid grid-cols-3 gap-5'>
        {grid.map((row, row_number) => {
            return row.map((cell, col_number) => {
                let isCenter = false;
                if (cell === 0) isCenter = true;
                return <div
                        key={[row_number, col_number]}
                        className={`
                            ${checkClicked(row_number, col_number) 
                                ? "bg-green-500" 
                                : isCenter
                                    ? ""
                                    : "bg-gray-500"
                            } 
                            aspect-square p-10 rounded-lg cursor-pointer`}
                        onClick={() => {
                            if(!isCenter) handleCardClick(row_number, col_number)
                        }}
                    >
                </div>
            })
        })}
    </div>
  )
}

export default GridLights