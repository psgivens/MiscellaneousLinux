import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { incrementCounter, Action, saveCounter, CountdownAction, tick, resetCounter } from '../actions'
import * as state from '../reducers'
import { compose } from '../utils'




const mapStateToProps = (state: state.All, ownProps: OwnProps): ConnectedState => ({
  counter: state.counter,
  timerState: state.timerState,
  isSaving: state.isSaving,
  // isLoading: state.isLoading,
  // error: state.error,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<state.All>): ConnectedDispatch => ({
  increment: (n: number) => {
    dispatch(tick())
    dispatch(incrementCounter(n))    
  },
  // load: () =>
  //   loadCount({})(dispatch),
  saveCount: (value: number) =>
    dispatch(saveCounter(value))
//    saveCount({ value })(dispatch),
})


// const mapStateToProps = (state: state.All, ownProps: OwnProps): ConnectedState => ({
//   counter: state.counter,
// })

// const mapDispatchToProps = (dispatch: redux.Dispatch<state.All>): ConnectedDispatch => ({
//   increment: (n: number) => {
//     dispatch(incrementCounter(n))
//   },
// })

interface OwnProps {
  label: string
}

type LoadingState = {
  isSaving: boolean,
//  isLoading: boolean,
}

type ConnectedState = LoadingState & {
  counter: { value: number },
  timerState: state.TimerState
}

interface ConnectedDispatch {
  increment: (n: number) => void
  saveCount: (n: number) => void
}

interface OwnState {}

class PureCounter extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

  _onClickIncrement = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.increment(1)
  }

  _onClickSave = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!this.props.isSaving) {
      this.props.saveCount(this.props.counter.value)
    }
  }

  render () {
    const { counter, timerState, isSaving, label } = this.props
    return <div>
      <label>{label}</label>
      <pre>counter = {counter.value}</pre>
      <button ref='increment' onClick={this._onClickIncrement}>click me!</button>
      <button ref='save' disabled={isSaving} onClick={this._onClickSave}>{isSaving ? 'saving...' : 'save'}</button>
      <pre>
          {JSON.stringify({
            counter,
            timerState,
            isSaving,
            // isLoading,
          }, null, 2)}
        </pre>
    </div>
  }
}

export const Counter = compose(
  PureCounter,
  // loadable(isLoading),
  connect(mapStateToProps, mapDispatchToProps),
)