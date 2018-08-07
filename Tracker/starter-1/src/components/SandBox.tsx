import * as React from 'react'
import './App.css'
import { Counter } from './Counter'
import { PomodoroGuage } from './PomodoroGuage'


class SandBox extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Counter name="first_pomodoro" />
        <p>... and so it begins. </p>
        <Counter name="second_pomodoro" />
        <p>This is it! </p>
        <PomodoroGuage guageId="first_pomodoro" />
        <PomodoroGuage guageId="second_pomodoro" />
      </div>
    );
  }
}

export default SandBox