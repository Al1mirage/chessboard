import React, { Component, PropTypes } from 'react';
import './Square.css';
import Knight from './Knight';

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
        const { isSource, isDest, position: { i, j } } = this.props;
        const squareMark = String.fromCharCode((65 + i)) + '' +  (j + 1);

        if (i % 2) {
            classNames += ' Odd';
        } else {
            classNames += ' Even';
        }

        if (isSource) {
            figure = <Knight />;
        }

        if (isDest) {
            classNames += ' Dest';
        }

        return (
            <div className={classNames} onClick={this.handleClick}>
                <i>{squareMark}</i>
                {figure}
            </div>
        );
    }
}

Square.propTypes = {
    position: PropTypes.shape({
        i: PropTypes.number,
        j: PropTypes.number
    }).isRequired,
    isSource: PropTypes.bool.isRequired,
    isDest: PropTypes.bool.isRequired,
    handleSquareSelection: PropTypes.func.isRequired
};

export default Square;
