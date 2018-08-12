import { createWorker, ITypedWorker } from 'typed-web-workers'

import { execOnDatabase, PomodoroIdb } from './DatabaseProcessor'

export type DatabaseCommandEnvelope = {} & {
  correlationId: number
  command: DatabaseWorkerCommand
}

export type DatabaseResponseEnvelope = {
  type:"ERROR"
  correlationId: number
  error: any
} | {
  type: "EVENT"
  correlationId: number
  event: DatabaseWorkerEvent
}

export type DatabaseWorkerCommand = {
  type: "LOAD_DATA"
} | {
  type: "INSERT_ITEM"
  item: PomodoroIdb
} | {
  type: "ADD",
  arg1: number,
  arg2: number
}

export type DatabaseWorkerEvent = {
  type: "DATA_LOADED"
  data: any
} | {
  type: "ITEM_INSERTED"
} | {
  type: "DATABASE_ERROR"
  error: any
}

type PromiseBack = {} & {
  resolve: (event:DatabaseWorkerEvent) => void
  reject: (error:any) => void
}
const promiseBacks: { [index:number]: PromiseBack } = {}

const execOnUI = (evtenv:DatabaseResponseEnvelope):void => {
  const promiseBack = promiseBacks[evtenv.correlationId]
  delete promiseBacks[evtenv.correlationId]
  switch(evtenv.type){
    case "ERROR":
      promiseBack.reject(evtenv.error)
      break
    default:
      promiseBack.resolve(evtenv.event)
      break
  }
  // tslint:disable-next-line:no-console
  console.log("execOnUI: " + JSON.stringify(evtenv))
}

const databaseWorker: ITypedWorker<DatabaseCommandEnvelope, DatabaseResponseEnvelope> = createWorker(
  execOnDatabase, execOnUI)

export const postToDb = (command:DatabaseWorkerCommand): Promise<DatabaseWorkerEvent> => {
  const correlationId = Math.floor(Math.random() * 1000000000000000)
  const cmdenv:DatabaseCommandEnvelope = { command, correlationId }
  const promise = new Promise<DatabaseWorkerEvent>((resolve,reject) => {
    promiseBacks[cmdenv.correlationId] = { reject, resolve }
    databaseWorker.postMessage(cmdenv)
  })
  return promise
}



