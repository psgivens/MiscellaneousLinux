
import * as redux from 'redux';
import * as state from '../reducers'

import { PomodoroCommand, PomodoroCommands } from "../sagas/PomodoroSaga";

import { PomodoroIdb } from '../data/PomodoroData'

// import { CounterCommand, CounterCommands } from '../sagas/CounterSaga'
// import { FetchCommand } from '../sagas/ValuesSaga'

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
    counter?: number
}
  
export type ConnectedDispatch = {} & {
    addItem?: (item: PomodoroIdb) => void
    loadItems?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
  counter: state1.counters[ownProps.name]
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<PomodoroCommand>): ConnectedDispatch => ({
  addItem: (item:PomodoroIdb) => dispatch(PomodoroCommands.addItem(item)),
  loadItems: () => dispatch(PomodoroCommands.loadItems())
})
