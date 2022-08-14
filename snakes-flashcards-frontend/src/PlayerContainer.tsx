import './App.css';
import React from 'react';
import Connector from './Connector';
import { Player } from './utils';

type props = {
    p: Player;
    index: number;
}

function PlayerContainer(props: props) {
    // Determine where player sits in cell
    const gridRow = props.index in [0,1] ? 3 : 1;
    const gridColumn = props.index==0 ? 1 : 3
    
  return (
    <div className={'PlayerContainer'} style={{gridRow: gridRow, gridColumn: gridColumn, 'backgroundColor': props.p.color}}>
    </div>
  );
}

export default PlayerContainer;
