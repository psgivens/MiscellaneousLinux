

export type CountdownAction = {
    type: 'COUNTDOWN_DECREMENT'
} | {
    type: 'COUNTDOWN_RESET'
} | {
    type: 'COUNTDOWN_TOGGLE_PAUSE'
}

export const tick = (): CountdownAction => ({
    type: 'COUNTDOWN_DECREMENT'
})

export type Action = {
    type: 'INCREMENT_COUNTER',
    delta: number,
} | {
    type: 'RESET_COUNTER',
} | {
    type: 'SAVE_COUNTER',
    value: number
}
  
export const incrementCounter = (delta: number): Action => ({
    type: 'INCREMENT_COUNTER',
    delta,
})

export const saveCounter = (value: number): Action => ({
    type: 'SAVE_COUNTER',
    value,
})

export const resetCounter = (): Action => ({
    type: 'RESET_COUNTER',
})

// import { api } from '../api'

// import {
//   Action,
//   LoadCount,
//   SaveCount,
//   dispatcher,
//   asReq,
//   asRes,
//   asErr,
// } from './action'

// export { Action }

// export const incrementCounter = (delta: number): Action => ({
//   type: 'INCREMENT_COUNTER',
//   delta,
// })

// export const resetCounter = (): Action => ({
//   type: 'RESET_COUNTER',
// })

// export const loadCount = dispatcher(api.load)<LoadCount>(
//   asReq('LOAD_COUNT_REQUEST'),
//   asRes('LOAD_COUNT_SUCCESS'),
//   asErr('LOAD_COUNT_ERROR'))

// export const saveCount = dispatcher(api.save)<SaveCount>(
//   asReq('SAVE_COUNT_REQUEST'),
//   asRes('SAVE_COUNT_SUCCESS'),
//   asErr('SAVE_COUNT_ERROR'))
