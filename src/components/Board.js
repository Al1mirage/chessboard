import React, { Component } from 'react';
import _ from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './Board.css';
import Square from './Square';
import getShortestPath from '../libs/knightMoves';

/**
 * Can be configurable during future development
 * @type {number}
 */
const boardSize = 8;
class Board extends Component {
    constructor(props) {
        super(props);
        this.handleSquareSelection = this.handleSquareSelection.bind(this);
        this.state = {
            selectedSquares: []
        };
    }

    handleSquareSelection(position) {
        this.movesCount = null;
        this.setState((prevState) => {
            let selectedSquares = prevState.selectedSquares;

            switch(selectedSquares.length) {
                case 0:
                    selectedSquares.push(position);
                    break;
                case 1:
                    this.movesCount = getShortestPath(
                        {
                            x: selectedSquares[0].i,
                            y: selectedSquares[0].j
                        }, {
                            x: position.i,
                            y: position.j
                        }
                    );
                    selectedSquares.push(position);
                    break;
                case 2:
                default:
                    selectedSquares = [position];
                    break;
            }

            return { selectedSquares };
        });
    }

    renderSquare(index) {
        const i = Math.floor(index / boardSize);
        const j = index % boardSize;
        const { selectedSquares } = this.state;

        const squareProps = {
            key: index,
            position: { i, j },
            isSource: false,
            isDest: false,
            handleSquareSelection: this.handleSquareSelection
        };

        if (selectedSquares.length && _.isEqual(selectedSquares[0], { i, j })) {
            squareProps.isSource = true;
        } else if (selectedSquares.length === 2 && _.isEqual(selectedSquares[1], { i, j })) {
            squareProps.isDest = true;
        }

        return <Square {...squareProps} />;
    }

    render() {
        const squaresList = [];
        let boardInfo = 'Knight will appear soon!';

        if (this.movesCount) {
            boardInfo = 'Wooot! You can reach there in ';
            if (this.movesCount === 1) {
                boardInfo += `${this.movesCount} moves.`;
            } else {
                boardInfo += `${this.movesCount} moves.`;
            }
        }

        for (let i = 0; i < Math.pow(boardSize, 2); i++) {
            squaresList.push(this.renderSquare(i));
        }

        return (
            <div className="Board">
                <h3 className="Board-Info">{boardInfo}</h3>
                <div className="Board-Data">{squaresList}</div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);
