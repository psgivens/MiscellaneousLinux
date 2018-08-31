import { createWorker, ITypedWorker } from 'typed-web-workers'

import { DatabaseCommandEnvelope, DatabaseResponseEnvelope, DatabaseWorkerCommand, DatabaseWorkerEvent, execOnDatabase } from '../data/PomodoroData'

import { Dispatch } from 'redux'



type PromiseBack = {} & {
  resolve: (event:DatabaseWorkerEvent) => void
  reject: (error:any) => void
}
const promiseBacks: { [index:number]: PromiseBack } = {}

// type HandleDatabaseCommand = (
//   command:DatabaseWorkerCommand, 
//   raiseEvent:((event:DatabaseWorkerEvent)=>void),
//   handleException:( (msg:string) =>((error:any)=>void) ) 
//   ) => void


// const handleDatabaseCommand2 = (
//   command:DatabaseWorkerCommand, 
//   raiseEvent:((event:DatabaseWorkerEvent)=>void),
//   handleException:( (msg:string) =>((error:any)=>void) ) 
//   ) => {
//     //
//   }

export class DatabaseWorker {
  private dispatch : Dispatch<any>
  private databaseWorker: ITypedWorker<DatabaseCommandEnvelope, DatabaseResponseEnvelope>
  constructor(dispatch: Dispatch<any>){
    this.dispatch = dispatch
    // this.post = this.post.bind(this)
    //  this.execOnUI = this.execOnUI.bind(this)
    // this.execOnDatabase = this.execOnDatabase.bind(this)
    this.databaseWorker = createWorker(
      execOnDatabase, this.execOnUI)    
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