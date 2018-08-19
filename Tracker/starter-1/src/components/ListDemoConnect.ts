
import * as redux from 'redux';
import * as state from '../reducers'

import { PomodoroManagementCommand, PomodoroManagementCommands } from "../actions/PomodoroManagementSaga";

import { PomodoroIdb } from '../data/PomodoroData'

// import { CounterCommand, CounterCommands } from '../actions/CounterSaga'
// import { FetchCommand } from '../actions/ValuesSaga'

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps = {} & {
    counter?: number
    pomodoros: PomodoroIdb[]
}
  
export type ConnectedDispatch = {} & {
    addItem?: (item: PomodoroIdb) => void
    loadItems?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => ({
  counter: state1.counters[ownProps.name],
  pomodoros: state1.pomodoros
})

export const mapDispatchToProps = (dispatch: redux.Dispatch<PomodoroManagementCommand>): ConnectedDispatch => ({
  addItem: (item:PomodoroIdb) => dispatch(PomodoroManagementCommands.addItem(item)),
  loadItems: () => dispatch(PomodoroManagementCommands.loadItems())
})
