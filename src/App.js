import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to React Chessboard</h2>
                </div>
                <p className="App-intro">
                    To get started, choose desired source position on board and then simply drag the <cite>Knight</cite>!
                </p>
                <Board />
            </div>
        );
    }
}

export default App;
