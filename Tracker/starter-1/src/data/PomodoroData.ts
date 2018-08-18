import { DatabaseCommandEnvelope, DatabaseResponseEnvelope } from '../workers/DatabaseWorker'

import { PomodoroIdb } from '../data/PomodoroData'

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

export const execOnDatabase = (cmdenv:DatabaseCommandEnvelope,callback:(result:DatabaseResponseEnvelope)=>void): void => {

    const handleException = (error:any):void => {
        callback({
            correlationId: cmdenv.correlationId,
            error,
            type: "ERROR",
            })
    }
    
    try {
        const command = cmdenv.command
        const DBOpenRequest = indexedDB.open("Pomodoro", 2)
        DBOpenRequest.onerror = handleException

        let objectStore: IDBObjectStore
        DBOpenRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const database: IDBDatabase = DBOpenRequest.result;

            if (event.oldVersion < 1){
                objectStore = database.createObjectStore("Pomodoros", { keyPath: "id", autoIncrement: true });
                objectStore.createIndex("idIdx", "id", { unique: true })
                objectStore.createIndex("startIdx", "startTime", { unique: false })
                objectStore.createIndex("userIdIdx", "userId", { unique: false })
            } else if (event.oldVersion < 2) {
                objectStore = DBOpenRequest.transaction!.objectStore("Pomodoros")
                objectStore.createIndex("other", "other")
            }
        };

        let db:IDBDatabase
        DBOpenRequest.onsuccess = (dbOpenEvent: Event) => {

        // store the result of opening the database in the db variable. This is used a lot below
        db = DBOpenRequest.result;

        // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
        const transaction: IDBTransaction = db.transaction(["Pomodoros"], "readwrite");
        transaction.onerror = handleException
        transaction.oncomplete = () => {
            // console.log("**DB** transaction.oncomplete")
        };

        objectStore = transaction.objectStore("Pomodoros");

        switch(command.type){
            case "INSERT_ITEM":
                const objectStoreRequest: IDBRequest = objectStore.add(command.item)
                objectStoreRequest.onerror = handleException
                objectStoreRequest.onsuccess = () => {

                callback({
                    correlationId: cmdenv.correlationId,
                    event:{type: "ITEM_INSERTED", item: command.item},
                    type: "EVENT"})
                    };          

                break;

            case "LOAD_DATA":

                const index: IDBIndex = db.transaction("Pomodoros").objectStore("Pomodoros").index("userIdIdx")
                const boundKeyRange: IDBKeyRange = IDBKeyRange.bound("andy", "zed", false, true);

                // const index: IDBIndex = db.transaction("Pomodoros").objectStore("Pomodoros").index("startIdx")
                // const boundKeyRange: IDBKeyRange = IDBKeyRange.bound(new Date("2010-03-25T12:00:00Z"), new Date("2020-03-25T12:00:00Z"), false, true);

                const items:PomodoroIdb[] = []
                index.openCursor(boundKeyRange).onsuccess = (event: any) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        items.push(cursor.value)
                        cursor.continue();
                    }
                    else {
                        callback({
                            correlationId: cmdenv.correlationId,
                            event:{ type: "DATA_LOADED", data: items },
                            type: "EVENT"})
                    }
                };
                break

                // // const index2: IDBIndex = db.transaction("Pomodoros").objectStore("Pomodoros").index("userIdIdx")
                // // const boundKeyRange2: IDBKeyRange = IDBKeyRange.bound("andy", "zed", false, true);

                // index.openCursor(boundKeyRange).onsuccess = (event:any) => {
                //     const cursor = event.target.result;
                //     if (cursor) {
                //         //   console.log(JSON.stringify(cursor.value))
                //     cursor.continue();
                //     }
                //     else {
                //         //   console.log("Got all records ");
                //     }
                // };
            };
        }
    }
    catch (e) {
        handleException(e)
    }
}
