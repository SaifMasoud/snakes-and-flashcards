import React, {
  cloneElement,
  Component,
  ReactComponentElement,
  ReactNode,
} from "react";
import "./App.css";
import CellContainer from "./Cell";
import { Cell, Player } from "./utils";

type props = {
  cells: Cell[];
  nRows: number;
  nCols: number;
};

function Board(props: props) {
  const nCells = props.nCols * props.nRows;
  const aspectRatio = String(props.nCols) + " / " + String(props.nRows);

  // Add cells
  const cellList = [];
  for (let i = 0; i < nCells; i++) {
      cellList.push(<CellContainer cell={props.cells[i]}></CellContainer>)
  }

  // Converts the list into snake-ladder (start at bottom, shift direction) format:
  const visualCellList = []
  let shouldReverse = true;
  for (let i = cellList.length; i >= 0; i -= props.nRows) {
    if (shouldReverse)
      visualCellList.push(...cellList.slice(i - props.nCols, i).reverse())
    else
      visualCellList.push(...cellList.slice(i - props.nCols, i))
    shouldReverse = !shouldReverse
  }
  return (
    <div className="Board" style={{ aspectRatio: aspectRatio, gridTemplateColumns: "auto ".repeat(props.nCols)}}>
      {visualCellList}
    </div>
  );
}

export default Board;
