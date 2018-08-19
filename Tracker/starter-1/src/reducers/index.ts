// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';

import { CounterEvent } from '../actions/CounterSaga'
import { FetchEvent } from '../actions/ValuesSaga'

import { PomodoroManagementEvent } from '../actions/PomodoroManagementSaga'
import { PomodoroIdb } from '../data/PomodoroData'


type Counters = {} & {
  [name:string]: number
}

export type PomodoroTimerState = {
  type: "NOT_RUNNING"
} | {
  type: "RUNNING"
  remaining: number
  timerId: number
} | {
  type: "BREAK"
  length: "Short" | "Long"
  remaining: number
  timerId: number
}

export const initialPomodoroTimerState:PomodoroTimerState = {
  type: "NOT_RUNNING"
}

type PomodoroTimerStates = {} & {
  [name:string]: PomodoroTimerState
}

export type All = {} & {
  connection: {
    isConnected: boolean
    lastConnection: number
    isLoadingPomodoro: boolean
  },
  counter: number
  counters: Counters
  values: string[]
  pomodoros: PomodoroIdb[],
  pomodoroTimers: PomodoroTimerStates
  pomodoro: PomodoroTimerState
}

function pomodoroReducers(state:All, action: PomodoroManagementEvent): All {
  switch(action.type) {
    case "POMODORO_ITEMSLOADED":
      return { ...state, pomodoros: action.items }
    case "POMODORO_ITEMADDED":
      return { ...state, pomodoros:[...state.pomodoros, action.item]}
    default:
      return state
  }
}

function myReducer(state:All, action: CounterEvent): All {
  const counters = state.counters
  const pomodoros = state.pomodoroTimers
  const ps = pomodoros[action.name]
  switch(action.type) {
    case "COUNTER_INCREMENTED":    
      counters[action.name] += 1
      if (ps.type === "BREAK"){
        ps.remaining = counters[action.name] * 30 
        pomodoros[action.name] = { ...ps }
      }
      return { ...state, 
        counter: state.counter + 1, 
        counters }
    case "COUNTER_DECREMENTED":
      counters[action.name] -= 1
      if (ps.type === "BREAK"){
        ps.remaining = counters[action.name] * 30 
        pomodoros[action.name] = { ...ps }
      }
      return { ...state, counter: state.counter - 1, counters }
  }
  return state
}

function valuesReducers(state:All, action: FetchEvent): All {
  switch(action.type) {
    case "FETCH_CONTENTFETCHED":
      return { ...state, values: action.values}
  }
  return state
}

export const reducers = reduceReducers(myReducer, valuesReducers, pomodoroReducers)