// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';

import { CounterEvent } from '../sagas/CounterSaga'
import { FetchEvent } from '../sagas/ValuesSaga'

import { PomodoroIdb } from '../data/PomodoroData'
import { PomodoroEvent } from '../sagas/PomodoroSaga';

type Counters = {} & {
  [name:string]: number
}
export type All = {} & {
  counter: number
  counters: Counters
  values: string[]
  connection: {
    isConnected: boolean
    lastConnection: number
    isLoadingPomodoro: boolean
  }, 
  pomodoros: PomodoroIdb[]
}

function pomodoroReducers(state:All, action: PomodoroEvent): All {
  switch(action.type) {
    case "POMODORO_ITEMSLOADED":
      return { ...state, pomodoros: action.items }
    default:
      return state
  }
}

function myReducer(state:All, action: CounterEvent): All {
  const counters = state.counters
  switch(action.type) {
    case "COUNTER_INCREMENTED":    
      counters[action.name] += 1
      return { ...state, counter: state.counter + 1, counters }
    case "COUNTER_DECREMENTED":
      counters[action.name] -= 1
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