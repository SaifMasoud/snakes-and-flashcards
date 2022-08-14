import React from 'react';
import './App.css';
import Board from './Board';
import LineTo from 'react-lineto'

type flashCard = {
    q: string;
    a1: string;
    a2: string;
    a3: string;
}
type props = {
    flashCard: flashCard,
    answerClickCallBack: Function
}


function FlashCard(props: props) {
    const answers = [props.flashCard['a1'], props.flashCard['a2'], props.flashCard['a3']]
    const q = props.flashCard['q']
    const choicesDivs = answers.map(
        c => <button onClick={() => props.answerClickCallBack(q, c)} className='a'>{c}</button>
        )
    return (
        <div className='FlashCard'>
            <button className='q'>{q}</button>
            {choicesDivs}
        </div>
        );
    }
    
    export default FlashCard;
    