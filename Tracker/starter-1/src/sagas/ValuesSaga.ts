import { Dispatch } from 'redux'
import { takeEvery } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
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
    }

    /*************** Register listeners ********************/
    function *saga(): Iterator<any> {
        yield takeEvery('FETCH_GETCONTENT', fetchCommand)
    }

    return saga
}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
const valuesSaga = (dispatch: Dispatch<FetchCommand>): (() => Iterator<any>) => createRequests()

export default valuesSaga