// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';

interface ICounters {
  [name:string]: number
}
export interface IAll {
  counter: number,
  counters: ICounters
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

export const reducers = reduceReducers(myReducer)