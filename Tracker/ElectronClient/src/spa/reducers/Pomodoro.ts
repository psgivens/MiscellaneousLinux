import { PomodoroEvent } from '../actions/PomodoroActions'
import { stat } from 'fs';


export enum PomodoroRunningState { NotRunning, Running }
export type PomodoroState = { 
  count: number
  runningState: PomodoroRunningState 
  timerId: number,
  version: { 
    local: number,
    remote: number
  },
  synced: {
    local: boolean,
    remote: boolean
  },
  myIp: string
}

export const initialState: PomodoroState = { 
  count:25*60,
  runningState: PomodoroRunningState.NotRunning, 
  timerId: 0, 
  version: {
    local: 0,
    remote: 0
  },
  synced: {
    local: true,
    remote: true
  },
  myIp: ""
 }

export function reducePomodoroState (state: PomodoroState = initialState, action: PomodoroEvent): PomodoroState {
  switch (action.type) {
    case 'POMODORO_RESET':
      return { count: 25 * 60, runningState: PomodoroRunningState.NotRunning, timerId: 0, ...state }
    case 'POMODORO_TICKED':
      return { count: --state.count, ...state }
    case 'POMODORO_TIMER_STOPPED':
      return { runningState: PomodoroRunningState.NotRunning, timerId: 0, ...state }
    case 'POMODORO_TIMER_STARTED':
      return { runningState: PomodoroRunningState.Running, timerId: action.timerId, ...state }

    case 'POMODORO_LOCAL_SAVING':
      return { 
        ...state,
        version: { 
          ...state.version,
          local:action.version, 
          },
        synced: {
          ...state.synced,
          local: false,          
        },
        }
    case 'POMODORO_LOCAL_SAVED':
      return { ...state, synced:{...state.synced, local: true, }, }

    case 'POMODORO_LOCAL_LOADING':
      return { 
        ...state ,
        version: { 
          ...state.version,
          local:action.version, 
          }, 
          synced: {
            ...state.synced,
            local: false,            
          },
        }
    case 'POMODORO_LOCAL_LOADED':
      return { ...state, synced:{...state.synced,local: true, }, }


    case 'POMODORO_REMOTE_SAVING':
      return { 
        ...state,
        version: { 
          ...state.version,
          remote:action.version, 
        },
        synced: {
          ...state.synced,
          remote: false,
        },
        }
    case 'POMODORO_REMOTE_SAVED':
      return { synced:{remote: true, ...state.synced}, ...state }

    case 'POMODORO_REMOTE_LOADING':
      return { 
        ...state,
        version: { 
          ...state.version,
          remote:action.version, }, 
          synced: {
            ...state.synced,
            remote: false
          },
         }
    case 'POMODORO_REMOTE_LOADED':
      console.log("action")
      console.log(action)
      return { 
        ...state,
        synced:{
          ...state.synced,
          remote: true, 
        },
        myIp: action.myIp,
         }


  


    default: 
      return state
  }  
}

