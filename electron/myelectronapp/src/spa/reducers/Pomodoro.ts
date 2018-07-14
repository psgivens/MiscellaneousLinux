import { PomodoroEvent } from '../actions/PomodoroActions'


export enum PomodoroRunningState { NotRunning, Running }
export type PomodoroState = { 
  count: number
  runningState: PomodoroRunningState 
  timer: NodeJS.Timer
}

export const initialState: PomodoroState = { count:25*60, runningState: PomodoroRunningState.NotRunning, timer: null }

export function reducePomodoroState (state: PomodoroState = initialState, action: PomodoroEvent): PomodoroState {
  switch (action.type) {
    case 'POMODORO_RESET':
      return { count: 25 * 60, runningState: PomodoroRunningState.NotRunning, timer: null }
    case 'POMODORO_TICKED':
      return { count: --state.count, ...state }
    case 'POMODORO_TIMER_STOPPED':
      return { ...state, runningState: PomodoroRunningState.NotRunning }
    case 'POMODORO_TIMER_STARTED':
      return { ...state,  runningState: PomodoroRunningState.Running }
    default: 
      return state
  }  
}

