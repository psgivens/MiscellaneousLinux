import { Dispatch } from 'redux'
import { call, put, takeEvery, takeLatest, select, PutEffect } from 'redux-saga/effects'
import * as state from '../reducers'
import { PomodoroState, PomodoroRunningState, initialState } from '../reducers/Pomodoro'
import sagaMiddlewareFactory from 'redux-saga';

/*** Commands ****/
export type PomdodoroCommand = 
    { type: 'POMODORO_START_TIMER' }
    | { type: 'POMODORO_STOP_TIMER' }
    | { type: 'POMODORO_RESET_TIMER' }

export namespace PomodoroCommands {
    export const start = ():PomdodoroCommand => ({ type: 'POMODORO_START_TIMER' })
    export const stop = ():PomdodoroCommand => ({ type: 'POMODORO_STOP_TIMER' })
    export const reset = ():PomdodoroCommand => ({ type: 'POMODORO_RESET_TIMER' })
}


/**************** Events ***********************/
export type PomodoroEvent = 
    { type: 'POMODORO_TICKED'} 
    | { type: 'POMODORO_RESET' } 
    | { type: 'POMODORO_TIMER_STARTED' 
        timerId: number } 
    | { type: 'POMODORO_TIMER_STOPPED' }



/************** Timer processing ***********************/
interface iTimer {
    startTimer (): number 
    stopTimer: (timerId:number) => void
}

class PomodoroTimer implements iTimer {
    constructor (private dispatch: Dispatch<state.All>) {}
    private tick = (): PomodoroEvent => ({ type: 'POMODORO_TICKED' })
    public startTimer = (): number =>  window.setInterval(() => this.dispatch(this.tick()), 1000)
    public stopTimer = (timerId:number): void => window.clearInterval(timerId)
}

/******************** Sagas **************************/
function createRequests(timer:iTimer) {

    const _put = (event:PomodoroEvent): PutEffect<PomodoroEvent> => put(event)
    const getPomodoroState = (state:state.All): PomodoroState => state.pomodoro ? state.pomodoro : initialState

    function *requestStartTimer(action: PomodoroEvent) {
        try {
            const state:PomodoroState = yield select(getPomodoroState)
            if (state.runningState === PomodoroRunningState.NotRunning){
                const timerId = timer.startTimer()
                yield _put({
                    type: 'POMODORO_TIMER_STARTED',
                    timerId: timerId
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    function *requestStopTimer(action: PomodoroEvent) {
        try {
            const state:PomodoroState = yield select(getPomodoroState)
            if (state.runningState === PomodoroRunningState.Running){
                timer.stopTimer(state.timerId)
                yield _put({
                    type: 'POMODORO_TIMER_STOPPED'
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    function *requestResetTimer(action: PomodoroEvent) {
        try {        
            const state:PomodoroState = yield select(getPomodoroState)
            if (state.runningState === PomodoroRunningState.Running){
                yield requestStopTimer(action)
            }
            yield put({ type: 'POMODORO_RESET' })
        } catch (e) {
            console.log(e)
        }
    }

    /*************** Register listeners ********************/
    function *saga(): Iterator<any> {
        yield takeEvery('POMODORO_STOP_TIMER', requestStopTimer)
        yield takeEvery('POMODORO_START_TIMER', requestStartTimer)    
        yield takeEvery('POMODORO_RESET_TIMER', requestResetTimer)
    }

    return saga
}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
const mySaga = (dispatch: Dispatch<state.All>): (() => Iterator<any>) => createRequests(new PomodoroTimer(dispatch))

export default mySaga