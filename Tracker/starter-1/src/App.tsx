import * as React from 'react'
import './App.css'
import { PomodoroGuage } from './containers/PomodoroGuage'
import { Counter } from './Counter'

import logo from './logo.svg'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Counter />
        <p>... and so it begins. </p>
        <p>This is it! </p>
        <PomodoroGuage guageId="first_pomodoro" />
        <PomodoroGuage guageId="second_pomodoro" />
      </div>
    );
  }
}

export default App