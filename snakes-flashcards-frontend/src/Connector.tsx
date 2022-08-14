import React from 'react';
import './App.css';
import Board from './Board';
import LineTo from 'react-lineto'

type props = {
    indexSelf: number
    indexToConnectTo: number | null
    isSnake: boolean
}


function Connector(props: props) {
    const bg = props.isSnake ? 'green' : 'rgb(142,89,60)'
    return (
        <div className={'Connector '}>
        <div className={'Connector-inner ' + String(props.indexSelf)}></div>
        <LineTo from={'Connector-inner ' + String(props.indexSelf)} to={'Connector-inner ' + String(props.indexToConnectTo)} borderColor={bg} borderWidth={5} delay={0}></LineTo>
        </div>
        );
    }
    
    export default Connector;
    