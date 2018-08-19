import * as redux from 'redux';
import * as state from '../../reducers'

import { CounterCommand } from '../../actions/CounterSaga'

export type AttributeProps = {} & {
  guageId: string 
}
  
export type StateProps = {} & {
  timerState?: state.PomodoroTimerState
}

export type ConnectedDispatch = {} & {
  triggerThing?: () => void
}

export const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => {
  // const pomodoroTimerState:state.PomodoroTimerState = 
  //   state1.pomodoroTimers[ownProps.guageId] 
  //     ? state1.pomodoroTimers[ownProps.guageId] 
  //     : { type: "NOT_RUNNING"}
  return {
    timerState: state1.pomodoro    
  }
}

export const mapDispatchToProps = (dispatch: redux.Dispatch<CounterCommand>): ConnectedDispatch => ({
    
})  
