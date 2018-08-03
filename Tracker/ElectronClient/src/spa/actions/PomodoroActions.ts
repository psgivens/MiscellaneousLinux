import { Dispatch } from 'redux'
import { all, call, put, takeEvery, takeLatest, select, PutEffect } from 'redux-saga/effects'
import * as state from '../reducers'
import { PomodoroState, PomodoroRunningState, initialState } from '../reducers/Pomodoro'
import sagaMiddlewareFactory from 'redux-saga';
import { local } from 'd3-selection';
import { api, GetIpResult } from '../apis'

/*** Commands ****/
export type PomdodoroCommand = 
    { type: 'POMODORO_START_TIMER' }
    | { type: 'POMODORO_STOP_TIMER' }
    | { type: 'POMODORO_RESET_TIMER' }
    | { type: 'POMODORO_SAVE_META' }
    | { type: 'POMODORO_LOAD_META' }
    | { type: 'POMODORO_LOAD_REMOTE' }

export namespace PomodoroCommands {
    export const start = ():PomdodoroCommand => ({ type: 'POMODORO_START_TIMER' })
    export const stop = ():PomdodoroCommand => ({ type: 'POMODORO_STOP_TIMER' })
    export const reset = ():PomdodoroCommand => ({ type: 'POMODORO_RESET_TIMER' })
    export const getIp = ():PomdodoroCommand => ({ type: 'POMODORO_LOAD_REMOTE' })
}

/**************** Events ***********************/
export type PomodoroEvent = 
    { type: 'POMODORO_TICKED'} 
    | { type: 'POMODORO_RESET' } 
    | { type: 'POMODORO_TIMER_STARTED' 
        timerId: number } 
    | { type: 'POMODORO_TIMER_STOPPED' }
    | { type: 'POMODORO_LOCAL_SAVING', 
        version: number }
    | { type: 'POMODORO_LOCAL_SAVED' }
    | { type: 'POMODORO_LOCAL_LOADING',
        version: number }
    | { type: 'POMODORO_LOCAL_LOADED' }
    | { type: 'POMODORO_REMOTE_SAVING',
        version: number }
    | { type: 'POMODORO_REMOTE_SAVED' }
    | { type: 'POMODORO_REMOTE_LOADING',
        version: number }
    | { type: 'POMODORO_REMOTE_LOADED',
        myIp: string }

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

    function *requestStartTimer(action: PomdodoroCommand) {
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

    function *requestStopTimer(action: PomdodoroCommand) {
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

    function *requestResetTimer(action: PomdodoroCommand) {
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

    function *postAction(action: PomdodoroCommand){
        const state:PomodoroState = yield select(getPomodoroState)
        const version = ++state.version.remote
        yield put({ type: 'POMODORO_REMOTE_SAVING', version })

        // yield call(PomodoroApi, state)

        const state1:PomodoroState = yield select(getPomodoroState)
        if (version === state1.version.remote)
            yield put({ type: 'POMODORO_REMOTE_SAVED' })
        // else: save was called multiple times. 
    }

    function *loadRemoteAction(action: PomdodoroCommand){
        const state:PomodoroState = yield select(getPomodoroState)
        const version = ++state.version.remote
        yield put({ type: 'POMODORO_REMOTE_LOADING', version })

        let response:GetIpResult = { ip: "unknown" }
        try{
            response = yield call(api.fetchUser, 3)
            
            console.log(response)
        }
        catch (e) {
            console.log(e)
        }
        const state1:PomodoroState = yield select(getPomodoroState)
        if (version === state1.version.remote)
            yield put({ type: 'POMODORO_REMOTE_LOADED', myIp: response.ip })
        // else: save was called multiple times. 

    }

    function *saveAction(action: PomdodoroCommand){
        const state:PomodoroState = yield select(getPomodoroState)
        const version = ++state.version.remote
        yield put({ type: 'POMODORO_LOCAL_SAVING', version })

        localStorage.setItem(createKey('1'), JSON.stringify(state))

        const state1:PomodoroState = yield select(getPomodoroState)
        if (version === state1.version.remote)
            yield put({ type: 'POMODORO_LOCAL_SAVED' })
        // else: save was called multiple times. 
    }

    const createKey = (id:string):string => ["pomodoro", id].join('/')
    function *requestSaveMeta(action: PomdodoroCommand) {
        try {        
            yield all([
                call(saveAction, action),
                call(postAction, action)
            ])
        } catch (e) {
            console.log(e)
        }
    }

    /*************** Register listeners ********************/
    function *saga(): Iterator<any> {
        yield takeEvery('POMODORO_STOP_TIMER', requestStopTimer)
        yield takeEvery('POMODORO_START_TIMER', requestStartTimer)    
        yield takeEvery('POMODORO_RESET_TIMER', requestResetTimer)
        yield takeEvery('POMODORO_SAVE_META', requestSaveMeta )
        yield takeEvery('POMODORO_LOAD_REMOTE', loadRemoteAction)
    }

    return saga
}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
const mySaga = (dispatch: Dispatch<state.All>): (() => Iterator<any>) => createRequests(new PomodoroTimer(dispatch))

export default mySaga