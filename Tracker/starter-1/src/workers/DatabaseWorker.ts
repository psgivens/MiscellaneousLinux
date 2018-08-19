import { createWorker, ITypedWorker } from 'typed-web-workers'

import { handleDatabaseCommand, PomodoroIdb } from '../data/PomodoroData'

import { Dispatch } from 'redux'

type DatabaseCommandEnvelope = {} & {
  correlationId: number
  command: DatabaseWorkerCommand
}

type DatabaseResponseEnvelope = {
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
  items: any
} | {
  type: "ITEM_INSERTED"
  item: PomodoroIdb
} | {
  type: "DATABASE_ERROR"
  error: any
}

type PromiseBack = {} & {
  resolve: (event:DatabaseWorkerEvent) => void
  reject: (error:any) => void
}
const promiseBacks: { [index:number]: PromiseBack } = {}

const execOnDatabase = (cmdenv:DatabaseCommandEnvelope,callback:(result:DatabaseResponseEnvelope)=>void): void => {
  const handleException = (error:any):void => {
      callback({
          correlationId: cmdenv.correlationId,
          error,
          type: "ERROR",
          })
  }

  const raiseEvent = (event:DatabaseWorkerEvent) => {
      callback({
      correlationId: cmdenv.correlationId,
      event,
      type: "EVENT"})
  }
  
  try{
      handleDatabaseCommand(cmdenv.command, raiseEvent, handleException)
  }
  catch (e) {
      handleException(e)
  }
}

export class DatabaseWorker {
  private dispatch : Dispatch<any>
  private databaseWorker: ITypedWorker<DatabaseCommandEnvelope, DatabaseResponseEnvelope>
  constructor(dispatch: Dispatch<any>){
    this.dispatch = dispatch
    this.databaseWorker = createWorker(
      execOnDatabase, this.execOnUI)
    this.post.bind(this)
    this.execOnUI.bind(this)
  }
  public post (command:DatabaseWorkerCommand): Promise<DatabaseWorkerEvent> {
    const correlationId = Math.floor(Math.random() * 1000000000000000)
    const cmdenv:DatabaseCommandEnvelope = { command, correlationId }
    const promise = new Promise<DatabaseWorkerEvent>((resolve,reject) => {
      promiseBacks[cmdenv.correlationId] = { reject, resolve }
      this.databaseWorker.postMessage(cmdenv)
    })
    return promise
  }

  private execOnUI (evtenv:DatabaseResponseEnvelope):void {
    if (evtenv.correlationId in promiseBacks) {
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
    } else if (evtenv.type === "EVENT") {
      this.dispatch(evtenv.event)
    } else {
      this.dispatch(evtenv.error)
    }
  }
}



