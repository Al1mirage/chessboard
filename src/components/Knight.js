import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ITEM_TYPES } from '../config/constants';
import knight from '../assets/knight.svg';
import './Knight.css';

const knightSource = {
    beginDrag() {
        return {};
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    };
}

class Knight extends Component {
    componentDidMount() {
        const img = new Image();
        img.src = knight;
        img.onload = () => this.props.connectDragPreview(img); //eslint-disable-line react/prop-types
    }

    render() {
        const { connectDragSource } = this.props; //eslint-disable-line react/prop-types
        return connectDragSource(
            <div className="Knight">
                <img src={knight} alt="Knight" title="Knight" />
            </div>
        );
    }
}

export default DragSource(ITEM_TYPES.KNIGHT, knightSource, collect)(Knight);
