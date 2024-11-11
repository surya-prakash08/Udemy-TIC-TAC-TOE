import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from './winning-combinations.js';
import GameOver from "./components/GameOver.jsx";
const initialGameBoard=[
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

// const WINNING_COMBINATIONS=[
//   [
//     {row:0, col:0},
//     {row:0, col:1},
//     {row:0, col:2}
//   ]
// ]
function deriveActivePlayer(gameTurns){
  let currentPlayer ='X';
  if(gameTurns.length>0 && gameTurns[0].player==="X"){
    currentPlayer="O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]
  
        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol=== thirdSquareSymbol){
          winner = players[firstSquareSymbol];
        }
  }

  return winner;
}

function App() {
const [gameTurns, setGameTurns] = useState([]);

const [players, setPlayers] = useState({
  X:"Player 1",
  O:"Player 2",
})
//const [activePlayer, setActivePlayer] = useState("X");

const activePlayer= deriveActivePlayer(gameTurns);

let gameBoard= [...initialGameBoard.map(array=>[...array])];

for (const turn of gameTurns) {
    const {square, player}= turn;
    const {row, col}= square;

    gameBoard[row][col]=player;
}


const winner = deriveWinner(gameBoard, players);
const hasDraw = gameTurns.length ===9 && !winner;

function handleSelectSquare(rowIndex, colIndex){
  // setActivePlayer((curActivePlayer)=> curActivePlayer==="X" ? "O" : "X");
  setGameTurns((prevTurns) =>{

    const currentPlayer = deriveActivePlayer(prevTurns);
    const updatedTurns=[{square:{row: rowIndex, col:colIndex}, player: currentPlayer}, ...prevTurns,];

    return updatedTurns;
  });
}

function handleRestart(){
  setGameTurns([]);
}

function handlePlayerNameChange(symbol, newName){
  setPlayers(prevPlayers =>{
    return{
      ...prevPlayers,
      [symbol]:newName
    }
  });
}
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">


         <Player initialName="Player 1" symbol="X" isActive={activePlayer==="X"} onChnageName={handlePlayerNameChange}/>


         <Player initialName="Player 2" symbol="O"
         isActive={activePlayer==="O"} onChnageName={handlePlayerNameChange}/>
          
        </ol>
        {(winner || hasDraw) && (<GameOver winner={winner}
        onRestart={handleRestart}
        />)}
        <GameBoard 
        onSelectSquare={handleSelectSquare}
         turns={gameTurns} board={gameBoard} 
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
