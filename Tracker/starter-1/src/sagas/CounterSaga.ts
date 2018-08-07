import { Dispatch } from 'redux'
import { takeEvery } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'

export type CounterCommand = {
    type: "COUNTER_INCREMENT",
    name: string
  } | { 
    type: "COUNTER_DECREMENT",
    name: string
  }

export class CounterCommands {
    public static incrementCounter = (name: string):CounterCommand => ({type: 'COUNTER_INCREMENT', name})
} 

export type CounterEvent = {
    type: "COUNTER_INCREMENTED",
    name: string
  } | { 
    type: "COUNTER_DECREMENTED",
    name: string
  }
  
function createRequests() {

    function *handleIncrementCounter(action: CounterCommand){
        yield put( { 
            name: action.name,
            type: "COUNTER_INCREMENTED"
        })
    }

    /*************** Register listeners ********************/
    function *saga(): Iterator<any> {
        yield takeEvery('COUNTER_INCREMENT', handleIncrementCounter)
    }

    return saga
}

// So this is ugly. It defines DI and the generator as a return before creating the generator. 
const mySaga = (dispatch: Dispatch<CounterCommand>): (() => Iterator<any>) => createRequests()

export default mySaga