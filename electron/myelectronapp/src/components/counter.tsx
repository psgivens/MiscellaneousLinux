import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { incrementCounter, Action } from '../actions'
import * as state from '../reducers'
import { compose } from '../utils'




const mapStateToProps = (state: state.All, ownProps: OwnProps): ConnectedState => ({
  counter: state.counter,
  // isSaving: state.isSaving,
  // isLoading: state.isLoading,
  // error: state.error,
})

const mapDispatchToProps = (dispatch: redux.Dispatch<state.All>): ConnectedDispatch => ({
  increment: (n: number) =>
    dispatch(incrementCounter(n)),
  // load: () =>
  //   loadCount({})(dispatch),
  // save: (value: number) =>
  //   saveCount({ value })(dispatch),
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

interface ConnectedState {
  counter: { value: number }
}

interface ConnectedDispatch {
  increment: (n: number) => void
}

interface OwnState {}

class PureCounter extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

  _onClickIncrement = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.increment(1)
  }

  render () {
    const { counter, label } = this.props
    return <div>
      <label>{label}</label>
      <pre>counter = {counter.value}</pre>
      <button ref='increment' onClick={this._onClickIncrement}>click me!</button>
      <pre>
          {JSON.stringify({
            counter,
            // isSaving,
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