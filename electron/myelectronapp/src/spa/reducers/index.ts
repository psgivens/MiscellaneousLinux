// export namespace Store {

//     export type Counter = { value: number }
  
//     export type All = {
//       counter: Counter
//     }
//   }


//   import { Action } from '../actions'

// const initialState: Store.Counter = {
//   value: 0,
// }

// function counter (state: Store.Counter = initialState, action: Action): Store.Counter {
//   const { value } = state
//   switch (action.type) {
//     case 'INCREMENT_COUNTER':
//       const newValue = value + action.delta
//       return { value: newValue }
//     case 'RESET_COUNTER':
//       return { value: 0 }
//   }

//   return state
// }






import { combineReducers } from 'redux'

import { Action, CountdownAction } from '../actions'
import { EAGAIN } from 'constants';

export type Counter = { value: number }
export type TimerState = { count: number, isPaused: boolean }

export type All = {
  counter: Counter,
  timerState: TimerState,
  isSaving: boolean,
  // isLoading: boolean,
  // error: string, 
}

const timerState: TimerState = { count:25*60, isPaused:false }

function timerCount (state: TimerState = timerState, action: CountdownAction): TimerState {
  switch (action.type) {
    case 'COUNTDOWN_RESET':
      return { count: 25 * 60, isPaused: false }
    case 'COUNTDOWN_DECREMENT':
      return { count: --state.count, ...state }
    case 'COUNTDOWN_TOGGLE_PAUSE':
      return { ...state, isPaused: !state.isPaused }
    default: 
      return state
  }  
}

function isSaving (state: boolean = false, action: Action): boolean {
  switch (action.type) {
    // case 'SAVE_COUNT_REQUEST':
    //   return true
    // case 'SAVE_COUNT_SUCCESS':
    // case 'SAVE_COUNT_ERROR':
    //   return false

    case 'SAVE_COUNTER':
      return !state
    default:
      return state
  }
}


function isLoading (state: boolean = false, action: Action): boolean {
  switch (action.type) {
    // case 'LOAD_COUNT_REQUEST':
    //   return true
    // case 'LOAD_COUNT_SUCCESS':
    // case 'LOAD_COUNT_ERROR':
    //   return false
    default:
      return state
  }
}

function error (state: string = '', action: Action): string {
  switch (action.type) {
    // case 'LOAD_COUNT_REQUEST':
    // case 'SAVE_COUNT_REQUEST':
    //   return ''
    // case 'LOAD_COUNT_ERROR':
    // case 'SAVE_COUNT_ERROR':
    //   return action.error
    default:
      return state
  }
}

const counterState: Counter = {
  value: 0,
}

function counter (state: Counter = counterState, action: Action): Counter {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const { delta } = action
      return { value: state.value + delta }

    case 'RESET_COUNTER':
      return { value: 0 }

    // case 'LOAD_COUNT_SUCCESS':
    //   return { value: action.response.value }

    default:
      return state
  }
}

export const initialState = {
  counter: counterState,
  timerCount: 25 * 60,
  isSaving: false,
  isLoading: false,
  error: '',
}

export const reducers = combineReducers<All>({
  counter,
  timerState:timerCount,
  isSaving,
  // isLoading,
  // error,
});

//export reducers;
