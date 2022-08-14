import './App.css';
import React from 'react';
import Connector from './Connector';
import { Cell, Player } from './utils';
import PlayerContainer from './PlayerContainer';

type props = {
  cell: Cell
}

function CellContainer(props: props) {
  const cellData = props.cell
  const isConnectFrom = cellData.isHead || cellData.isLadderBtm;
  const childPlayers = cellData.players.map((pl, index) => <PlayerContainer p={pl} index={index}></PlayerContainer>)
  const bg = cellData.isDrawAgain ? 'purple' : cellData.isSkipNext ? 'purple' : 'grey'
  return (
    <div className='CellContainer' style={{backgroundColor: bg}}>
      {cellData.index}
      {childPlayers}
      <Connector isSnake={props.cell.isHead} indexToConnectTo={isConnectFrom ? cellData.connectTo : null} indexSelf={props.cell.index}></Connector>
    </div>
  );
}

export default CellContainer;
