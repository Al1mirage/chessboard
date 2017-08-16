import React from 'react';
import './Board.css';
import Square from './Square';

export default function Board() {
    const boardSize = {
        x: 8,
        y: 8
    }, squaresList = [];
    for (let i = 0; i < boardSize.x; i++) {
        for (let j = 0; j < boardSize.y; j++) {
            const key = i * boardSize.x + j;
            squaresList.push(<Square key={key} position={{i, j}} />);
        }
    }
    return (
        <div className="Board">{squaresList}</div>
    );
}
