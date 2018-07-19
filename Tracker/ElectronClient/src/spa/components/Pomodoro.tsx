import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import * as state from '../reducers'
import { PomodoroState, PomodoroRunningState } from '../reducers/Pomodoro'
import { compose } from '../utils'
import { PomodoroCommands } from '../actions/PomodoroActions'

interface OwnProps {
  label: string
}

type LoadingState = {
  isSaving: boolean,
//  isLoading: boolean,
}

type ConnectedState = {
  pomodoro: PomodoroState,
  isRunning: boolean,
  minutes: string,
  seconds: string
}


const pad = (i:number):string => i < 10 ? "0" + i : "" + i

const mapStateToProps = (state: state.All, ownProps: OwnProps): ConnectedState => ({
  pomodoro: state.pomodoro,
  isRunning: state.pomodoro.runningState === PomodoroRunningState.Running,
  minutes: pad(Math.floor(state.pomodoro.count / 60)),
  seconds: pad(state.pomodoro.count % 60)
})


interface ConnectedDispatch {
  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
}

const mapDispatchToProps = (dispatch: redux.Dispatch<state.All>): ConnectedDispatch => ({
  startTimer: () => dispatch(PomodoroCommands.start()),
  stopTimer: () => dispatch(PomodoroCommands.stop()),
  resetTimer: () => dispatch(PomodoroCommands.reset())
})


interface OwnState {}
class PureCounter extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

  _onClickStart = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.startTimer()
  }

  _onClickStop = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.stopTimer()
  }


  _onClickReset = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.resetTimer()
  }

  render () {
    const { label, pomodoro, isRunning, minutes, seconds } = this.props
    return <div>
      <label>{label}</label>
      timer: {minutes}:{seconds}
      <br />
      <button ref='startTimer' disabled={isRunning} onClick={this._onClickStart}>Start Timer</button><br />
      <button ref='stopTimer' disabled={!isRunning} onClick={this._onClickStop}>Stop Timer</button><br />
      <button ref='resetTimer' onClick={this._onClickReset}>Reset Timer</button><br />
      <pre>
          {JSON.stringify({
            pomodoro,
          }, null, 2)}
        </pre>
    </div>
  }
}

export const Pomodoro = compose(
  PureCounter,
  // loadable(isLoading),
  connect(mapStateToProps, mapDispatchToProps),
)