// import { PomodoroIdb } from '../data/PomodoroData'
// import { DatabaseWorkerCommand, DatabaseWorkerEvent } from '../workers/DatabaseWorker'

export type PomodoroIdb = {} & {
    id: number
    userId: string
    planned: string
    actual: string
    startTime: number
    version: number
}

export const createPomodoro = (userId:string, planned:string, actual:string="", startTime:number=Date.now()):PomodoroIdb => ({    
    actual,
    id: Math.floor(Math.random() * 1000000000),
    planned,
    startTime,
    userId,
    version: 0
})





// *************************************************************************
// handleDatabaseCommand is defined in "../workers/DatabaseWorker" due to 
// inadequacies in JavaScript. I want so badly to move it here!
// *************************************************************************



