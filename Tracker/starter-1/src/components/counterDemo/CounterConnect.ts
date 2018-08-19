
import * as redux from 'redux';
import * as state from '../../reducers'

import { CounterCommand, CounterCommands } from '../../actions/CounterSaga'
import { FetchCommand } from '../../actions/ValuesSaga'

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
    counter?: number
}
  
export type ConnectedDispatch = {} & {
    increment?: (name:string) => void
    decrement?: (name:string) => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
  counter: state1.counters[ownProps.name]
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<FetchCommand | CounterCommand>): ConnectedDispatch => ({
  decrement: (name:string) => dispatch(CounterCommands.decrementCounter(name)),
  increment: (name:string) => dispatch(CounterCommands.incrementCounter(name)),  
})
