
import * as React from 'react'
import '../App.css'
import logo from '../logo.svg'
import { Counter } from './counterDemo/Counter'
import { PomodoroGuage } from './counterDemo/PomodoroGuage'
import { ValuesButton } from './counterDemo/ValuesButton'

class CounterDemo extends React.Component {
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

        <ValuesButton />

        <div className="columns">
          <div className="column">
            <Counter name="first_pomodoro" />
          </div>
          <div className="column">
            <Counter name="second_pomodoro" />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <PomodoroGuage guageId="first_pomodoro" />
          </div>
          <div className="column">
            <PomodoroGuage guageId="second_pomodoro" />
          </div>
        </div>

      </div>
    );
  }
}

export default CounterDemo