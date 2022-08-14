import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import { Cell, Game, newGame2 } from './utils';
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

  return (
    <div className="GameContainer" onClick={onClick}>
        <Board cells={g.cellList()} nRows={g.nRows} nCols={g.nCols}></Board>
    </div>
  );
}


export default GameContainer;
