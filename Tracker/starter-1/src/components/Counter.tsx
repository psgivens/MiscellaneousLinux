import * as React from 'react';
import { connect } from 'react-redux';
import * as redux from 'redux';
// import { incrementCounter, Action, saveCounter, CountdownAction, tick, resetCounter } from '../actions'
import * as state from '../reducers'
// import { compose } from './utils'

const mapStateToProps = (state1: state.IAll, ownProps: OwnProps): ConnectedState => ({
  counter: state1.counters[ownProps.name],
})

const mapDispatchToProps = (dispatch: redux.Dispatch<state.SampleAction>): ConnectedDispatch => ({
  increment: (name:string) => {
    dispatch({type: 'COUNTER_INCREMENT', name}) 
  }
})


// const mapStateToProps = (state: state.All, ownProps: OwnProps): ConnectedState => ({
//   counter: state.counter,
// })

// const mapDispatchToProps = (dispatch: redux.Dispatch<state.All>): ConnectedDispatch => ({
//   increment: (n: number) => {
//     dispatch(incrementCounter(n))
//   },
// })

type OwnProps = {} & {
  name: string
}

type ConnectedState = {} & {
  counter?: number
}

type ConnectedDispatch = {} & {
  increment?: (name:string) => void
}

type OwnState = {} & {}

class PureCounter extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {
  public render () {
    const { counter } = this.props
    return <div>
      <pre>counter = {counter}</pre>
      <button onClick={this.onClickIncrement}>click me!</button>
      <pre>
          {JSON.stringify({
            counter
          }, null, 2)}
        </pre>
    </div>
  }

  private onClickIncrement = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { name } = this.props
    this.props.increment!(name)
  }
}

// export const Counter = compose(
//   PureCounter,
//   connect(mapStateToProps, mapDispatchToProps),
// )

export const Counter = 
  connect<{}, {}, OwnProps>(mapStateToProps, mapDispatchToProps) (PureCounter)



