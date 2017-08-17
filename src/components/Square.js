import React, { Component } from 'react';
import './Square.css';
import Knight from './Knight';

export default class Square extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.handleSquareSelection(this.props.position);
    }

    render() {
        let classNames = 'Square';
        const { isSource, isDest, position: { i, j } } = this.props;
        const squareMark = String.fromCharCode((65 + i)) + '' +  (j + 1);

        if (i % 2) {
            classNames += ' Odd';
        } else {
            classNames += ' Even';
        }

        if (isDest) {
            classNames += ' Dest';
        }

        if (isSource) {
            return (
                <div className={classNames} onClick={this.handleClick}>
                    <i>{squareMark}</i>
                    <Knight />
                </div>
            );
        }

        return <div className={classNames} onClick={this.handleClick}><i>{squareMark}</i></div>;
    }
}
