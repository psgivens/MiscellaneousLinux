import { PomodoroEvent } from '../actions/PomodoroActions'


export enum PomodoroRunningState { NotRunning, Running }
export type PomodoroState = { 
  count: number
  runningState: PomodoroRunningState 
  timerId: number
}

export const initialState: PomodoroState = { count:25*60, runningState: PomodoroRunningState.NotRunning, timerId: 0 }

export function reducePomodoroState (state: PomodoroState = initialState, action: PomodoroEvent): PomodoroState {
  switch (action.type) {
    case 'POMODORO_RESET':
      return { count: 25 * 60, runningState: PomodoroRunningState.NotRunning, timerId: 0 }
    case 'POMODORO_TICKED':
      return { count: --state.count, ...state }
    case 'POMODORO_TIMER_STOPPED':
      return { ...state, runningState: PomodoroRunningState.NotRunning, timerId: 0 }
    case 'POMODORO_TIMER_STARTED':
      return { ...state,  runningState: PomodoroRunningState.Running, timerId: action.timerId }
    default: 
      return state
  }  
}

