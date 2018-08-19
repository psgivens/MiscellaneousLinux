// import { Dispatch } from 'redux'
import { takeEvery } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
// import { api } from '../apis'

import { DatabaseWorker, DatabaseWorkerCommand, DatabaseWorkerEvent } from '../workers/DatabaseWorker'

import { PomodoroIdb } from '../data/PomodoroData'

export type PomodoroManagementCommand = {
    type: "POMODORO_LOADITEMS"
} | {
    type: "POMODORO_ADDITEM"
    item: PomodoroIdb
} | {
    type: "FETCH_CONTENT_SUCCESS"
} | {
    type: "FETCH_CONTENT_FAILED"
}

export const PomodoroManagementCommands = {
    addItem: (item: PomodoroIdb):PomodoroManagementCommand => ({ type: "POMODORO_ADDITEM", item }),
    loadItems: ():PomodoroManagementCommand => ({ type: "POMODORO_LOADITEMS" })
} 

export type PomodoroManagementEvent = {
    type: "POMODORO_ITEMSLOADED"
    items: PomodoroIdb []
} | {
    type: "POMODORO_ITEMADDED"    
    item: PomodoroIdb
} | {
    type: "FETCH_FAILED"
}

export class PomodoroManagementSaga {
    private databaseWorker:DatabaseWorker
    constructor (databaseWorker:DatabaseWorker) {
        this.databaseWorker = databaseWorker
        this.saga.bind(this)
        this.addItem.bind(this)
        this.loadItems.bind(this)
    }

    /*************** Register listeners ********************/
    public *saga(): Iterator<any> {
        yield takeEvery('POMODORO_ADDITEM', (command:PomodoroManagementCommand) => this.addItem(command))
        yield takeEvery('POMODORO_LOADITEMS', (command:PomodoroManagementCommand) => this.loadItems(command))
    }

    private *addItem(action: PomodoroManagementCommand){

        // an 'if' block casts the action. 
        if (action.type === "POMODORO_ADDITEM") {
            const event: DatabaseWorkerEvent = yield call((command: DatabaseWorkerCommand) => this.databaseWorker.post(command), { 
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

    private *loadItems(action: PomodoroManagementCommand){
        
        if (action.type === "POMODORO_LOADITEMS") {
            const event: DatabaseWorkerEvent = yield call((command: DatabaseWorkerCommand) => this.databaseWorker.post(command), { 
                type: "LOAD_DATA",
            } )

            if (event.type === "DATA_LOADED") {
                yield put( {
                    items: event.items,
                    type: "POMODORO_ITEMSLOADED"

                })
            }

        }  
    }

}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
// export const pomodoroSaga = (dispatch: Dispatch<PomodoroCommand>, databaseWorker:DatabaseWorker): PomodoroSaga => new PomodoroSaga(databaseWorker)

// export default pomodoroSaga