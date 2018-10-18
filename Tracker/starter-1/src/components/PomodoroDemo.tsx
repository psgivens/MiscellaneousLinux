
import * as React from 'react'
import '../App.css'
import logo from '../logo.svg'
import { PomodoroArc } from './pomodoroDemo/PomodoroArc'
import { PomodoroControls } from './pomodoroDemo/PomodoroControls'


class PomodoroDemo extends React.Component {
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

        <div className="columns">
          <div className="column">
            <PomodoroControls name="first_pomodoro" />
          </div>
          <div className="column">
            <PomodoroArc guageId="first_pomodoro" />
          </div>
        </div>

      </div>
    );
  }
}

export default PomodoroDemo