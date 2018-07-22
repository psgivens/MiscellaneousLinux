onmessage = function(e) {
    console.log('Message received from main script');
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    const DBOpenRequest = this.indexedDB.open("toDoList")
    
    let objectStore
    DBOpenRequest.onupgradeneeded = function(e) {
      let db = DBOpenRequest.result;
      objectStore = db.createObjectStore("toDoList", { autoIncrement: true });
      console.log("Successfully upgraded db")
      console.log("Successfully upgraded db")
      console.log("Successfully upgraded db")
      console.log("Successfully upgraded db")
    };


    DBOpenRequest.onerror = function(event) {
      console.log("onerror")
      console.log("onerror")
      console.log("onerror")
      console.log("onerror")
      console.log("onerror")
      console.log(event)
    };
  
    let db;
    DBOpenRequest.onsuccess = function(event) {
      console.log("onsuccess")
      console.log("onsuccess")
      console.log("onsuccess")
      console.log("onsuccess")
      console.log("onsuccess")
      console.log(event)
  
      // store the result of opening the database in the db variable. This is used a lot below
      db = DBOpenRequest.result;
  
      // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
      const transaction = db.transaction(["toDoList"], "readwrite");
      transaction.oncomplete = function() {
        console.log("oncomplete")
        console.log("oncomplete")
        console.log("oncomplete")
        console.log("oncomplete")
        console.log("oncomplete")
        console.log("oncomplete")
        console.log("oncomplete")
      };

      objectStore = transaction.objectStore("toDoList");
      console.log(objectStore.indexNames);
      console.log(objectStore.keyPath);
      console.log(objectStore.name);
      console.log(objectStore.transaction);
      console.log(objectStore.autoIncrement);



      const objectStoreRequest = objectStore.add({name: "bob" });
      objectStoreRequest.onsuccess = function() {
          console.log("onsucces")
          console.log("onsucces")
          console.log("onsucces")
          console.log("onsucces")
          console.log("onsucces")
      };
    };
    console.log('Posting message back to main script');
    postMessage(workerResult, "worker1");
}