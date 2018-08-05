import { Dispatch } from 'redux'
import { takeEvery } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
// import { all, call, put, takeEvery, takeLatest, select, PutEffect } from 'redux-saga/effects'
// import * as state from '../reducers'
// import { PomodoroState, PomodoroRunningState, initialState } from '../reducers/Pomodoro'
// import sagaMiddlewareFactory from 'redux-saga';
// import { local } from 'd3-selection';
import { api } from '../apis'

export type FetchCommand = {
    type: "FETCH_GETCONTENT"
} | {
    type: "FETCH_CONTENT_SUCCESS"
} | {
    type: "FETCH_CONTENT_FAILED"
}

export class FetchCommands {
    public static getContent = ():FetchCommand => ({ type: "FETCH_GETCONTENT" })
} 

export type FetchEvent = {
    type: "FETCH_CONTENTFETCHED"
    values: string[]
} | {
    type: "FETCH_FAILED"
}

function createRequests() {

    function *fetchCommand(action: FetchCommand){

        const responseValues: string[] = yield call(api.fetchValues)

        yield put( { 
            type: "FETCH_CONTENTFETCHED",
            values: responseValues
        })
        // const state:PomodoroState = yield select(getPomodoroState)
        // const version = ++state.version.remote
        // yield put({ type: 'POMODORO_LOCAL_SAVING', version })

        // localStorage.setItem(createKey('1'), JSON.stringify(state))

        // const state1:PomodoroState = yield select(getPomodoroState)
        // if (version === state1.version.remote)
        //     yield put({ type: 'POMODORO_LOCAL_SAVED' })
        // // else: save was called multiple times. 
    }

    /*************** Register listeners ********************/
    function *saga(): Iterator<any> {
        yield takeEvery('FETCH_GETCONTENT', fetchCommand)
    }

    return saga
}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
const mySaga = (dispatch: Dispatch<FetchCommand>): (() => Iterator<any>) => createRequests()

export default mySaga