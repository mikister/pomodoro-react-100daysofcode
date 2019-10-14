import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOptions = [5, 10, 15, 20 ,25], // in minutes
      selectedOption: 5, // in minutes, not an index
    };
  }

  render() {
    return (
      <div className="App">
        <h1>POMODORO</h1>

        <div className="timer">
          <div className="timer__circle"></div>
          <div className="timer__counter">25:00</div>
          <button className="button">RESET</button>
        </div>
      </div>
    );
  }
}

export default App;
