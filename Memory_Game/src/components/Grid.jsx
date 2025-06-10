import React, { useEffect, useState } from 'react'

const Grid = () => {
    const [gridSize, setGridSize] = useState(2);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [solved, setSolved] = useState([]);
    const [won, setWon] = useState(false);


    function handleGridSizeChange(e) {
        const size = parseInt(e.target.value);
        if (size >=2 && size <= 10) setGridSize(size);
    }

    function initializeGame() {
        const totalCards = gridSize * gridSize;
        const pairs = Math.floor(totalCards / 2);
        const numbers = [...Array(pairs).keys()].map(val => val+1);
        const shuffled = [...numbers, ...numbers].sort(() => (Math.random() - 0.5))
        const cards = shuffled.map((value, index) => ({id:index, value:value}));
        setCards(cards);
        setFlipped([]);
        setDisabled(false);
        setSolved([]);
        setWon(false);
    }

    function checkSame(secondId) {
        let firstId = flipped[0];
        if (cards[firstId].value === cards[secondId].value) {
            setSolved( [...solved, firstId, secondId])
            setFlipped([]);
            setDisabled(false);
        }
        else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000);
        }
    }

    function handleCardClick(id) {
        if (disabled || won || solved.includes(id)) return;

        if (flipped.length === 0) {
            setFlipped([id])
            return;
        }

        if (flipped.length === 1) {
            setDisabled(true);
            if (id !== flipped[0]) {
                setFlipped([...flipped, id]);
                checkSame(id);
            } 
            else {
                setFlipped([]);
                setDisabled(false);
            }
        }
    }

    useEffect(() => {
        initializeGame()
    }, [gridSize])

    useEffect(() => {
        if (solved.length === cards.length && cards.length > 0) {
            setWon(true);
            setDisabled(true);
        }
    }, [solved, cards]);

  return (
    <div className='bg-gray-400 rounded-lg px-10 py-9 flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-semibold mb-6'>Memory Game</h1>
        <div className='mb-6'>
            <label htmlFor="gridSize" className='mr-5 text-xl font-medium'>Grid Size </label>
            <input 
                className=' border rounded-lg px-4 py-3'
                id='gridSize'
                type="number" 
                min={2} 
                max={10} 
                value={gridSize} 
                onChange={handleGridSizeChange}
                />
        </div>
        <div 
            className={`grid gap-5 mb-6`}
            style={{
                width: `min(100%, ${gridSize * 5.5}rem)`,
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`, 
            }}
            >
            {cards && cards.map((card, index) => {
                return <div 
                            key={card.id} 
                            className={`aspect-square text-xl text-gray-600 rounded-lg p-5 flex justify-center items-center cursor-pointer transition-all duration-300 
                                ${solved.includes(index) ? 
                                    "bg-green-500 text-black"
                                    : flipped.includes(index)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-500 text-white" } `}
                            onClick={() => handleCardClick(card.id)}
                            >
                    { (flipped.includes(card.id) || solved.includes(card.id)) ? card.value : "?"}
                </div>
            })}
        </div>
        { won ? <p className='text-2xl text-green-800 animate-bounce'>Yay! You Won 🎉</p> : ""}
        <button onClick={initializeGame} className='border rounded-lg text-xl bg-green-400 text-white px-4 py-3 cursor-pointer'>{won ? "Play Again" : "Reset"}</button>
    </div>
  )
}

export default Grid