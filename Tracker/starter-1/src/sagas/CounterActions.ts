import { Dispatch } from 'redux'
// import { all, call, put, takeEvery, takeLatest, select, PutEffect } from 'redux-saga/effects'
// import * as state from '../reducers'
// import { PomodoroState, PomodoroRunningState, initialState } from '../reducers/Pomodoro'
// import sagaMiddlewareFactory from 'redux-saga';
// import { local } from 'd3-selection';
// import { api, GetIpResult } from '../apis'

export type FetchCommand = {
    type: "FETCH_GETCONTENT"
} | {
    type: "FETCH_CONTENT_SUCCESS"
} | {
    type: "FETCH_CONTENT_FAILED"
}

export class FetchCommands {
    public getContent = ():FetchCommand => ({ type: "FETCH_GETCONTENT" })
} 

