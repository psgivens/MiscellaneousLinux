onmessage = function(e: MessageEvent) {
    console.log('Message received from main script');
    const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    const DBOpenRequest = this.indexedDB.open("Pomodoro", 4)
    
    let objectStore: IDBObjectStore
    DBOpenRequest.onupgradeneeded = function(e: IDBVersionChangeEvent) {
      let db: IDBDatabase = DBOpenRequest.result;
      db.deleteObjectStore("Pomodoros")
      objectStore = db.createObjectStore("Pomodoros", { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("idIdx", "id", { unique: true })
      objectStore.createIndex("startIdx", "startTime", { unique: false })
      objectStore.createIndex("userIdIdx", "userId", { unique: false })
      console.log("**DB** Successfully upgraded db")
    };


    DBOpenRequest.onerror = function(event: Event) {
      console.log("**DB** DBRequest.onerror")
      console.log(JSON.stringify(event))
    };
  
    let db:IDBDatabase
    DBOpenRequest.onsuccess = function(event: Event) {
      console.log("**DB** DBRequest.onsuccess")
      console.log(JSON.stringify(event))
  
      // store the result of opening the database in the db variable. This is used a lot below
      db = DBOpenRequest.result;
  
      // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
      const transaction: IDBTransaction = db.transaction(["Pomodoros"], "readwrite");
      transaction.oncomplete = function() {
        console.log("**DB** transaction.oncomplete")
      };

      objectStore = transaction.objectStore("Pomodoros");
      console.log(JSON.stringify(objectStore.indexNames))
      console.log(JSON.stringify(objectStore.keyPath))
      console.log(JSON.stringify(objectStore.name))
      console.log(JSON.stringify(objectStore.transaction))
      console.log(JSON.stringify(objectStore.autoIncrement))

      const objectStoreRequest: IDBRequest = objectStore.add({name: "rob", userId: "bsmith", startTime: new Date("2015-03-25T12:00:00Z") });
      objectStoreRequest.onsuccess = function() {
          console.log("**DB** OSRequest.onsucces")
      };      
      const index: IDBIndex = db.transaction("Pomodoros").objectStore("Pomodoros").index("startIdx")
      var boundKeyRange: IDBKeyRange = IDBKeyRange.bound(new Date("2010-03-25T12:00:00Z"), new Date("2018-03-25T12:00:00Z"), false, true);

      index.openCursor(boundKeyRange).onsuccess = function(event: any) {
        var cursor = event.target.result;
        if (cursor) {
          console.log(JSON.stringify(cursor.value))
          cursor.continue();
        }
        else {
          console.log("Got all records ");
        }
      };

      const index2: IDBIndex = db.transaction("Pomodoros").objectStore("Pomodoros").index("userIdIdx")
      var boundKeyRange2: IDBKeyRange = IDBKeyRange.bound("andy", "zed", false, true);

      index.openCursor(boundKeyRange).onsuccess = function(event:any) {
        var cursor = event.target.result;
        if (cursor) {
          console.log(JSON.stringify(cursor.value))
          cursor.continue();
        }
        else {
          console.log("Got all records ");
        }
      };

    };

    console.log('Posting message back to main script');
    postMessage(workerResult, "worker1");
}