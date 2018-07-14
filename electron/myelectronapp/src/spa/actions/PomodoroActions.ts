import { Dispatch } from 'redux'
import { call, put, takeEvery, takeLatest, select, PutEffect } from 'redux-saga/effects'
import * as state from '../reducers'
import { PomodoroState, PomodoroRunningState, initialState } from '../reducers/Pomodoro'
import { start } from 'repl';

let _dispatch: Dispatch<state.All>
const _put = (event:PomodoroEvent):PutEffect<PomodoroEvent> => put(event)
const getPomodoroState = (state:state.All): PomodoroState => state.pomodoro ? state.pomodoro : initialState


/*** Commands ****/
export type PomdodoroCommand = 
    { type: 'POMODORO_START_TIMER' }
    | { type: 'POMODORO_STOP_TIMER' }
    | { type: 'POMDORO_RESET_TIMER' }


export namespace PomodoroCommands {
    export const start = ():PomdodoroCommand => ({ type: 'POMODORO_START_TIMER' })
    export const stop = ():PomdodoroCommand => ({ type: 'POMODORO_STOP_TIMER' })
    export const reset = ():PomdodoroCommand => ({ type: 'POMDORO_RESET_TIMER' })
}


/**************** Events ***********************/
export type PomodoroEvent = 
    { type: 'POMODORO_TICKED'} 
    | { type: 'POMODORO_RESET' } 
    | { type: 'POMODORO_TIMER_STARTED' 
        timerId: number } 
    | { type: 'POMODORO_TIMER_STOPPED' }



/************** Timer processing ***********************/
export const tick = (): PomodoroEvent => ({ type: 'POMODORO_TICKED' })

function startTimer(): number {
    return window.setInterval(() => _dispatch(tick()), 1000)
}


/******************** Sagas **************************/
function* requestTimer(action: PomodoroEvent) {
    try {
        const state:PomodoroState = yield select(getPomodoroState)
        if (state.runningState === PomodoroRunningState.NotRunning){
            const timerId = startTimer()
            yield _put({
                type: 'POMODORO_TIMER_STARTED',
                timerId: timerId
            })
        }
    } catch (e) {
        console.log(e)
    }
}


 /*************** Register listeners ********************/
function* _mySaga(): Iterator<any> {
    yield takeEvery('POMODORO_START_TIMER', requestTimer);
}
  
function mySaga(dispatch: Dispatch<state.All>) {
    _dispatch = dispatch
    return _mySaga
}

export default mySaga;