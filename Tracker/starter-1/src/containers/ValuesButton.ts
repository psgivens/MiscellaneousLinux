
import * as redux from 'redux';
import * as state from '../reducers'

import { CounterCommand, CounterCommands } from '../sagas/CounterSaga'
import { FetchCommand, FetchCommands } from '../sagas/ValuesSaga'

export type AttributeProps = {} & {
}
  
export type StateProps = {} & {
    values?: string[]
}
  
export type ConnectedDispatch = {} & {
    increment?: (name:string) => void
    triggerThing?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
  values: state1.values
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<FetchCommand | CounterCommand>): ConnectedDispatch => ({
  increment: (name:string) => {
    dispatch(CounterCommands.incrementCounter(name)) 
  },
  triggerThing: () => dispatch( FetchCommands.getContent() )
})
