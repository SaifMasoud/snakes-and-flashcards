import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import { Cell, Game, newGame, numWords } from './utils';
import {Player} from './utils'


type props = {
    game: Game
}

function GameContainer(props: props) {
    // state
    const [g, setG] = useState(props.game);
    const [x, setX] = useState(0);

    const onClick = () => {
        console.log('Updating')
        setG(g.update())
        setX((x + 1) % 2)
    }

    const lastDiceStr = numWords[g.lastDice]
  return (
    <div className="GameContainer" >
        <Board cells={g.cellList()} nRows={g.nRows} nCols={g.nCols}></Board>
        <div className='bottom-panel'>
            <div className={'dice ' + lastDiceStr} onClick={onClick}></div>
            <button className='turn-indicator' style={{backgroundColor: g.curPlayer().color}}></button>
        </div>
    </div>
  );
}


export default GameContainer;
