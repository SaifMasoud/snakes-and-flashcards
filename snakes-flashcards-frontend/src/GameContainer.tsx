import React, { useState } from "react";
import "./App.css";
import Board from "./Board";
import FlashCard from "./flashcard";
import PlayerContainer from "./PlayerContainer";
import { Cell, Game, newGame, numWords } from "./utils";
import { Player } from "./utils";

type props = {
  game: Game;
};

function GameContainer(props: props) {
  // state
  const [g, setG] = useState(props.game);
  const [x, setX] = useState(0);

  const onDiceClick = () => {
    console.log("Updating");
    setG(g.update());
    setX((x + 1) % 2);
  };

  const onFlashCardClick = (q: string, c: string) => {
    console.log('Clicked Answer: ' + c)
    g.answer(q, c)
    setG(g)
    setX((x + 1) % 2);
  };

  // Add flashCard
  let flashCard = {
    'q': 'Questions Will Show Here!',
    'a1': 'option1',
    'a2': 'option2',
    'a3': 'option3'
  }
  if (g.waitingOnFlashCard) {
    flashCard = g.getFlashCard()
  }
  
  // Show Dice
  const lastDiceStr = numWords[g.lastDice];

  if (g.winner != null) {
    const w = g.winner
    return (
<div className="GameContainer">
      <Board cells={g.cellList()} nRows={g.nRows} nCols={g.nCols}></Board>
      <div className="bottom-panel">
        <button
          className={"dice " + lastDiceStr}
          onClick={onDiceClick}
        ></button>
        <button
          className="turn-indicator"
          style={{ backgroundColor: g.curPlayer().color }}
        ></button>
        <div className="win-message">Is the winner!</div>
      </div>
    </div>
    )
  }

  return (
    <div className="GameContainer">
      <Board cells={g.cellList()} nRows={g.nRows} nCols={g.nCols}></Board>
      <div className="bottom-panel">
        <button
          className={"dice " + lastDiceStr}
          onClick={onDiceClick}
        ></button>
        <button
          className="turn-indicator"
          style={{ backgroundColor: g.curPlayer().color }}
        ></button>
        <FlashCard
          answerClickCallBack={onFlashCardClick}
          flashCard={flashCard}
        ></FlashCard>
      </div>
    </div>
  );
}

export default GameContainer;
