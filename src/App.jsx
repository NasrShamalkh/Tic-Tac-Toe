import React, { useState } from 'react';
import './style.css';

const App = () => {
  return <Game />;
};

//Square component has two props its value and the onClick function
//returns a button (which is our square)
const Square = function({ value, onClick }) {
  return (
    <button className='square' onClick={onClick}>
      {value}
    </button>
  );
};

//Our Reset component
const Reset = function({ onClick }) {
  return (
    <button className='reset' onClick={onClick}>
      Reset
    </button>
  );
};

//our restart button
const Restart = function({ onClick }) {
  return (
    <button className='restart' onClick={onClick}>
      Play Again
    </button>
  );
};

//names button
const Names = function({ onClick }) {
  return (
    <button className='names' onClick={onClick}>
      Enter Names
    </button>
  );
};

//our main components (Game) which holds most of the functionality
//and is the item that will be rendered to App
const Game = function() {
  //our squares state ** initial value is a 9-element array with values of null
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1, setPlayer1Name] = useState('Player X');
  const [player2, setPlayer2Name] = useState('Player O');

  //a state to determain who's next
  //game always starts with X
  const [isXNext, setXNext] = useState(true);
  const next = isXNext ? 'X' : 'O';
  const winner = calcWinner(squares);

  //status function
  const status = function() {
    if (winner) {
      if (winner === 'X') {
        alert(`Winner: ${player1}`);
      }
      if (winner === 'O') {
        alert(`Winner: ${player2}`);
      }
      return `Winner: ${winner}`;
    } else if (isBoradFull(squares)) {
      alert(`DRAW !!`);
      return `DRAW !!`;
    } else {
      return `Next Player: ${next}`;
    }
  };
  const renderSquare = function(i) {
    return (
      //return our square component
      <Square
        value={squares[i]}
        onClick={() => {
          //if the square is not empty or there is a winner do nothing !
          if (squares[i] != null || winner != null) {
            return;
          }
          //else our new squares array
          //set the next value (X || O) to the element in the new array and
          //then assign the newSquares array to the squares state
          const newSquares = squares.slice();
          newSquares[i] = next;
          setSquares(newSquares);
          //flip the turn
          setXNext(!isXNext);
        }}
      />
    );
  };
  //--------------------
  const increaseScore = function() {
    if (winner === 'X') {
      setPlayer1Score(player1Score + 1);
    }
    if (winner === 'O') {
      setPlayer2Score(player2Score + 1);
    }
  };
  //--------------------
  const renderNamesButton = function() {
    return (
      <Names
        onClick={() => {
          var player1Name = prompt('Enter player 1 (X) name') || 'Player X';
          var player2Name = prompt('Enter player 2 (O) name') || 'Player O';
          setPlayer1Name(player1Name);
          setPlayer2Name(player2Name);
        }}
      />
    );
  };

  //reset function
  const renderResetButton = function() {
    return (
      <Reset
        onClick={() => {
          //reassigin all square values to null
          setSquares(Array(9).fill(null));
          setPlayer1Score(0);
          setPlayer2Score(0);
          //return the next to X
          setXNext(true);
          // setPlayer1Score(0);
          // setPlayer2Score(0);
        }}
      />
    );
  };

  //restart function
  const renderRestartButton = function() {
    return (
      //render our restart component
      <Restart
        onClick={() => {
          increaseScore();
          //reassigin all square values to null
          setSquares(Array(9).fill(null));
          //return the next to X
          setXNext(true);
        }}
      />
    );
  };

  return (
    <div className='container'>
      <div id='main-div'>
        <h1>Tic Tac Toe</h1>
        <h2>
          <span className='nameSpan'>{player1}</span> |{' '}
          <span className='nameSpan'>{player2}</span>
        </h2>
        <h2>
          {player1Score} : {player2Score}
        </h2>
        <div className='game'>
          <div className='game-info'>{status()}</div>
          <div className='game-board'>
            <div className='board-row'>
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className='board-row'>
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className='board-row'>
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div id='buttons-div'>
            <div className='control-button'>{renderRestartButton()}</div>
            <div className='control-button'>{renderResetButton()}</div>
            <div className='control-button'>{renderNamesButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
//our function to calculate the winner
const calcWinner = function(squares) {
  //all wining cases based on the values (position values)
  const winningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningCases.length; i++) {
    const [a, b, c] = winningCases[i]; // a , b, c equal a wining case from above
    //if a = b = c then we have a wining case (either O or X)
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

//we must have a function for when the board is full
const isBoradFull = function(squares) {
  for (var i = 0; i < squares.length; i++) {
    //for the length of squares if we found a square with the value of null then it is not full
    if (squares[i] === null) {
      return false;
    }
  }
  return true;
};
export default App;
