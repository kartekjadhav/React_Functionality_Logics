import React from 'react'
import { useState } from 'react'
import useTictactoe from '../customHooks/useTictactoe'


const TicTacToe = () => {

    const {board, xTurn, setMessage, handleClick, resetGame} = useTictactoe();

    return (
        <div className='h-screen flex flex-col items-center'>
            <h1 className='text-5xl font-bold mb-10'>Tic Tac Toe</h1>
            <div className='flex items-center gap-10 mb-10'>
                <p className='text-xl font-medium'>{setMessage()}</p>
                <button 
                    onClick={resetGame}
                    className='rounded-lg cursor-pointer px-4 py-3 border'
                    >Reset
                </button>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                {board.map((val, index) => {
                    return <div 
                                onClick={() => handleClick(index)}
                                key={index}
                                className='w-30 cursor-pointer border rounded-lg aspect-square p-3 text-5xl flex flex-row justify-center items-center'>
                        {val ? val : ""}
                    </div>
                })}
            </div>
        </div>
  )
}

export default TicTacToe