import React, { Component } from 'react';
import _ from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Square from './Square';
import pathFinder from '../libs/pathFinder';
import './Board.css';

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
            knightPosition: null,
            movesCount: undefined,
            path: undefined
        };
    }

    /**
     * Serves only for the very first position selection
     * @param position
     */
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
        this.setState((prevState) => {
            let { knightPosition } = prevState;
            const { amountOfMoves: movesCount, path } = new pathFinder(
                knightPosition,
                position,
                boardSize
            ).run();
            knightPosition = position;

            return { knightPosition, movesCount, path };
        });
    }

    renderSquare(index) {
        const i = Math.floor(index / boardSize);
        const j = index % boardSize;
        const { knightPosition, path } = this.state;

        const squareProps = {
            key: index,
            position: [i, j],
            isSource: false,
            isStep: false,
            handleSquareSelection: this.handleSquareSelection,
            handleMoveKnight: this.handleMoveKnight,
        };

        if (_.isEqual(knightPosition, [i, j])) {
            squareProps.isSource = true;
        }

        if (path) {
            for (let step = 0; step < path.length; step++) {
                if (_.isEqual(path[step], [i, j])) {
                    squareProps.isStep = step;
                }
            }
        }

        return <Square {...squareProps} />;
    }

    render() {
        const squaresList = [];
        const { knightPosition, movesCount } = this.state;
        let boardInfo = 'Knight will appear soon...';

        if (knightPosition) {
            boardInfo = 'Now you can move it!';
        }
        if (movesCount) {
            boardInfo = 'Wooot! You can reach there in ';
            if (movesCount === 1) {
                boardInfo += `${movesCount} move.`;
            } else {
                boardInfo += `${movesCount} moves.`;
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
