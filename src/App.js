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
      selectedOption: amount,
      timeLeft: amount * 60 * 1000
    });

    this.timerRef.current.style.setProperty("--timer-duration", amount * 60 + "s", "important");
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

  componentDidMount() {
    this.setOption(this.state.selectedOption);
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
                <Button value="START" func={this.startTimer.bind(this)} />
              :
                <Button value="STOP" func={this.stopTimer.bind(this)} />
            }
            {
              this.state.timerRunning ?
                <Button value="RESET" func={this.resetTimer.bind(this)} />
              : null
            }
          </div>
        </div>

        { 
          this.state.timerRunning ?
            null
          :
            <div className="options">
              <span>Set duration</span>
              { renderOptionsList.bind(this)(this.state.timerOptions) }
            </div>
        }
      </div>
    );
  }
}

export default App;

function Button({ value, func }) {
  return (
    <button className="button" onClick={func}>{value}</button>
  );
}

function renderButtonList(values, funcs) {
  let buttonsList = [];
  let buttonNum = values.length;

  for (var ii = 0; ii < buttonNum; ii++) {
    buttonsList.push(<Button value={values[ii]} func={funcs[ii]} key={ii} />);
  }

  return buttonsList;
}

function renderOptionsList(durations) {
  let funcsList = [];
  durations.forEach( (option) => {
    funcsList.push(() => { this.setOption.bind(this)(option) });
  });

  return renderButtonList(durations, funcsList);
}
