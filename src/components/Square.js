import React from 'react';
import './Square.css';
import Knight from './Knight';

export default function Square({ position: {i, j} }) {
    let classNames = 'Square';
    if (i % 2) {
        classNames += ' Odd';
    } else {
        classNames += ' Even';
    }

    if (!(i + j)) {
        return <div className={classNames}><Knight /></div>;
    }
    return <div className={classNames}></div>;
}
