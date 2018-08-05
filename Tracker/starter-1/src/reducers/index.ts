// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';

import { FetchEvent } from '../sagas/CounterActions'

interface ICounters {
  [name:string]: number
}
export class IAll {
  public counter: number
  public counters: ICounters
  public values: string[]
}

export type SampleAction = {
  type: "COUNTER_INCREMENT",
  name: string
} | { 
  type: "COUNTER_DECREMENT",
  name: string
}

function myReducer(state:IAll, action: SampleAction): IAll {
  const counters = state.counters
  switch(action.type) {
    case "COUNTER_INCREMENT":    
      counters[action.name] += 1
      return { ...state, counter: state.counter + 1, counters }
    case "COUNTER_DECREMENT":
      counters[action.name] -= 1
      return { ...state, counter: state.counter - 1, counters }
  }
  return state
}

function valuesReducers(state:IAll, action: FetchEvent): IAll {
  switch(action.type) {
    case "FETCH_CONTENTFETCHED":
      return { ...state, values: action.values}
  }
  return state
}

export const reducers = reduceReducers(myReducer, valuesReducers)