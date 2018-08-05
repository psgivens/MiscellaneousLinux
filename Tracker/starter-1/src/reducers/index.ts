// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';

import { CounterEvent } from '../sagas/CounterSaga'
import { FetchEvent } from '../sagas/ValuesSaga'

type Counters = {} & {
  [name:string]: number
}
export class All {
  public counter: number
  public counters: Counters
  public values: string[]
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

export const reducers = reduceReducers(myReducer, valuesReducers)