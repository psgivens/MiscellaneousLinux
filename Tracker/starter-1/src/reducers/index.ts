// import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';

export interface IAll {
    counter: number,
  }

function myReducer(state:IAll, action: {}): IAll {
  return state
}

export const reducers = reduceReducers(myReducer)