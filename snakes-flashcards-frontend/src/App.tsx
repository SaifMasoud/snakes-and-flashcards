import React from 'react';
import './App.css';
import Board from './Board';
import GameContainer from './GameContainer';
import * as utils from './utils'




function App() {
  return (
    <div className="App">
      <GameContainer game={utils.newGame()}></GameContainer>
    </div>
  );
}

export default App;
