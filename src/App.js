import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>POMODORO</h1>

      <div className="timer">
        <div className="timer__circle"></div>
        <div className="timer__counter">25:00</div>
      </div>
    </div>
  );
}

export default App;
