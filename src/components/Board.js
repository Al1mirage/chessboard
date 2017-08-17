import React, { Component } from 'react';
import './Board.css';
import Square from './Square';
import _ from 'lodash';
import getShortestPath from '../libs/knightMoves';

export default class Board extends Component {
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

    render() {
        const boardSize = 8;
        const squaresList = [];
        const { selectedSquares } = this.state;
        let boardInfo = 'Knight will appear soon!';

        if (this.movesCount) {
            boardInfo = 'Wooot! You can reach there in ';
            if (this.movesCount === 1) {
                boardInfo += `${this.movesCount} moves.`;
            } else {
                boardInfo += `${this.movesCount} moves.`;
            }
        }

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const squareProps = {
                    key: (i * boardSize) + j,
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

                squaresList.push(
                    <Square {...squareProps} />
                );
            }
        }
        return (
            <div className="Board">
                <h3 className="Board-Info">{boardInfo}</h3>
                <div className="Board-Data">{squaresList}</div>
            </div>
        );
    }
}
