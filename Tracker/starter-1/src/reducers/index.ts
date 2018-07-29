// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';

export interface IAll {
  counter: number,
}

export type SampleAction = {
  type: "COUNTER_INCREMENT"
} | { 
  type: "COUNTER_DECREMENT"
}

function myReducer(state:IAll, action: SampleAction): IAll {
  switch(action.type) {
    case "COUNTER_INCREMENT":    
      return { ...state, counter: state.counter + 1 }
    case "COUNTER_DECREMENT":
    return { ...state, counter: state.counter - 1 }
  }
  return state
}

export const reducers = reduceReducers(myReducer)