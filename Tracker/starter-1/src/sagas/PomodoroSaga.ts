// import { Dispatch } from 'redux'
import { takeEvery } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
import { api } from '../apis'

import { DatabaseWorker, DatabaseWorkerCommand, DatabaseWorkerEvent } from '../workers/DatabaseWorker'

import { PomodoroIdb } from '../data/PomodoroData'

export type PomodoroCommand = {
    type: "POMODORO_LOADITEMS"
} | {
    type: "POMODORO_ADDITEM"
    item: PomodoroIdb
} | {
    type: "FETCH_CONTENT_SUCCESS"
} | {
    type: "FETCH_CONTENT_FAILED"
}

export const PomodoroCommands = {
    addItem: (item: PomodoroIdb):PomodoroCommand => ({ type: "POMODORO_ADDITEM", item })
} 

export type PomodoroEvent = {
    type: "POMODORO_ITEMSLOADED"
    items: PomodoroIdb []
} | {
    type: "POMODORO_ITEMADDED"    
    item: PomodoroIdb
} | {
    type: "FETCH_FAILED"
}

export class PomodoroSaga {
    private databaseWorker:DatabaseWorker
    constructor (databaseWorker:DatabaseWorker) {
        this.databaseWorker = databaseWorker
        this.saga.bind(this)
        this.addItem.bind(this)
        this.loadItems.bind(this)
    }

    /*************** Register listeners ********************/
    public *saga(): Iterator<any> {
        yield takeEvery('POMODORO_ADDITEM', (command:PomodoroCommand) => this.addItem(command))
        yield takeEvery('POMODORO_LOADITEMS', this.loadItems)
    }

    private *addItem(action: PomodoroCommand){

        // an 'if' block casts the action. 
        if (action.type === "POMODORO_ADDITEM") {
            const that = this
            const event: DatabaseWorkerEvent = yield call((command: DatabaseWorkerCommand) => that.databaseWorker.post(command), { 
                item:action.item,
                type: "INSERT_ITEM",
            } )

            if (event.type === "ITEM_INSERTED") {
                yield put( {
                    item: event.item,
                    type: "POMODORO_ITEMADDED"
                })
            }
        }  
    }

    private *loadItems(action: PomodoroCommand){

        if (action.type === "POMODORO_ADDITEM") {
            const responseValues: string[] = yield call(api.fetchValues)

            yield put( { 
                type: "FETCH_CONTENTFETCHED",
                values: responseValues
            })

            const event: DatabaseWorkerEvent = yield call(this.databaseWorker.post, { 
                item:action.item,
                type: "INSERT_ITEM",
            } )

            if (event.type === "ITEM_INSERTED") {
                yield put( {
                    item: event.item,
                    type: "POMODORO_ITEMADDED"
                })
            }
        }  
    }

}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
// export const pomodoroSaga = (dispatch: Dispatch<PomodoroCommand>, databaseWorker:DatabaseWorker): PomodoroSaga => new PomodoroSaga(databaseWorker)

// export default pomodoroSaga