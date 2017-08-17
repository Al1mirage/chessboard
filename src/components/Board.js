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
        this.handleMoveKnight = this.handleMoveKnight.bind(this);
        this.state = {
            knightPosition: null
        };
    }

    handleSquareSelection(position) {
        this.setState((prevState) => {
            let { knightPosition } = prevState;
            if (!knightPosition) {
                knightPosition = position;
            }
            return { knightPosition };
        });
    }

    handleMoveKnight(position) {
        this.movesCount = null;
        this.setState((prevState) => {
            let { knightPosition } = prevState;

            this.movesCount = getShortestPath(
                {
                    x: knightPosition.i,
                    y: knightPosition.j
                }, {
                    x: position.i,
                    y: position.j
                }
            );
            knightPosition = position;

            return { knightPosition };
        });
    }

    renderSquare(index) {
        const i = Math.floor(index / boardSize);
        const j = index % boardSize;
        const { knightPosition } = this.state;

        const squareProps = {
            key: index,
            position: { i, j },
            isSource: false,
            isDest: false,
            handleSquareSelection: this.handleSquareSelection,
            handleMoveKnight: this.handleMoveKnight,
        };

        if (_.isEqual(knightPosition, { i, j })) {
            squareProps.isSource = true;
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
