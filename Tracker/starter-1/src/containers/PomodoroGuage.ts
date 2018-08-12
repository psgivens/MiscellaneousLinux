import * as redux from 'redux';
import * as state from '../reducers'

import { CounterCommand } from '../sagas/CounterSaga'

export type AttributeProps = {} & {
  guageId: string 
}
  
export type StateProps = {} & {
  counter?: number
}

export type ConnectedDispatch = {} & {
  triggerThing?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => {
  const value = state1.counters[ownProps.guageId] ? state1.counters[ownProps.guageId] : 0
  return {
    counter: value
  }
}

export const mapDispatchToProps = (dispatch: redux.Dispatch<CounterCommand>): ConnectedDispatch => ({
    
})  
