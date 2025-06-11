import { useState } from "react";

const initialBoard = Array(9).fill(null);

const useTictactoe = () => {
    const [board, setBoard] = useState(initialBoard);
    const [xTurn, setXturn] = useState(Math.random() > 0.5);

    const WINNING_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function checkWon() {
        for (let i=0; i<8; i++) {
            let [a, b, c] = WINNING_PATTERNS[i];
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            } 
        }
        return null;
    }

    function handleClick(index) {
        if (board[index]) return;

        const newBoard = [...board];
        newBoard[index] = xTurn ? "X" : "O";
        setBoard(newBoard);
        setXturn(!xTurn);
    }
    
    function setMessage() {
        let winner = checkWon()
        if (winner) return `${winner} has won the Game!`
        if (!board.includes(null)) return `It's a Draw!`
        return `${xTurn ? "X" : "O"}'s turn`
    }

    function resetGame() {
        setBoard(initialBoard);
        setXturn(Math.random() > 0.5);
    }

    return {board, xTurn, handleClick, setMessage, resetGame}

}

export default useTictactoe;