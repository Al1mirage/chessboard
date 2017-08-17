import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { ITEM_TYPES } from '../config/constants';
import Knight from './Knight';
import './Square.css';

const squareTarget = {
    drop(props) {
        props.handleMoveKnight(props.position);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Square extends Component {
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
        let figure = null;
        const { position: [i, j], isSource, isStep, isOver, connectDropTarget } = this.props; //eslint-disable-line react/prop-types
        const squareMark = String.fromCharCode((65 + i)) + '' +  (j + 1);

        if (i % 2) {
            classNames += ' Odd';
        } else {
            classNames += ' Even';
        }

        if (isSource) {
            figure = <Knight />;
        }

        if (isOver) {
            classNames += ' Over';
        }

        if (typeof isStep === 'number') {
            classNames += ' Step';
            figure = <cite>{isStep}</cite>;
        }

        return connectDropTarget(
            <div className={classNames} onClick={this.handleClick}>
                <i>{squareMark}</i>
                {figure}
            </div>
        );
    }
}

Square.propTypes = {
    position: PropTypes.array.isRequired,
    isSource: PropTypes.bool.isRequired,
    isStep: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    handleSquareSelection: PropTypes.func.isRequired,
    handleMoveKnight: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

export default DropTarget(ITEM_TYPES.KNIGHT, squareTarget, collect)(Square);
