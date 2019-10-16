import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOptions: [5, 10, 15, 20 ,25], // in minutes
      selectedOption: 5, // in minutes, not an index
      timeLeft: 5 * 60 * 1000, // in milliseconds
      timerRunning: false,
      timerPaused: true,
    };

    this.timerRef = React.createRef();
    this.timerID = null;
  }

  setOption(amount) {
    this.setState({
      selectedOption: amount
    });

    this.timerRef.current.style.setProperty("--timer-duration", amount + "s");
  }

  startTimer() {
    this.setState({
      timerRunning: true,
      timerPaused: false,
    });

    this.timerID = setInterval(
      () => {
        if (this.state.timeLeft !== 1) {
          this.setState({
            timeLeft: this.state.timeLeft - 10
          });
        }
        else {
          this.setState({
            timeLeft: 0
          });
          this.resetTimer();
        }
      },
      10
    );
  }

  resetTimer() {
    this.setState({
      timeLeft: this.state.selectedOption * 60 * 1000,
      timerRunning: false,
      timerPaused: true,
    });

    clearInterval(this.timerID);
  }

  stopTimer() {
    this.setState({
      timerPaused: true,
    });

    clearInterval(this.timerID);
  }

  getTimeLeft() {
    let minutesLeft = this.state.timeLeft - this.state.timeLeft % (60 * 1000);
    minutesLeft = minutesLeft / (60 * 1000);
    let secondsLeft = (this.state.timeLeft - minutesLeft * 60 * 1000) / 1000;

    if (Math.round(secondsLeft) === 60) {
      secondsLeft = 0;
      minutesLeft = minutesLeft + 1;
    }

    return (minutesLeft) + ":" + Math.round(secondsLeft);
  }

  render() {
    return (
      <div className="App">
        <h1>POMODORO</h1>

        <div className={
          "timer " + 
          (this.state.timerRunning ? "timer--on " : "") + 
          (this.state.timerPaused ? "timer--paused " : "")
        } ref={this.timerRef}>
          <div className="timer__circle"></div>
          <div className="timer__counter">{ this.getTimeLeft() }</div>
          <div>
            {
              this.state.timerPaused ?
              <button className="button" onClick={this.startTimer.bind(this)}>START</button>
              :
              <button className="button" onClick={this.stopTimer.bind(this)}>STOP</button>
            }
            {
              this.state.timerRunning ?
              <button className="button" onClick={this.resetTimer.bind(this)}>RESET</button>
              :
              null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
