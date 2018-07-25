import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, Store as ReduxStore } from 'redux'
import { reducers } from './reducers'
import * as state from './reducers'
import { incrementCounter } from './actions'
import { Provider } from 'react-redux'


import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import mySaga from './actions/PomodoroActions'








// import * as sql from "sqlite3"
// import Sqlite = require('sqlite');

// class User {
//   constructor(public id: number, public name: string) { }
// }

// var database = new Sqlite<User>('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name TEXT NOT NULL)',
//   (row) => {
//     return new User(row.id, row.name);
//   }, function(error: Error) {
//     if (error === null) {
//       database.where('SELECT * FROM user WHERE name = ?', ['karl'], function(error: Error, users: User[]) {
//         if (error === null) {
//           console.log(users);
//         } else {
//           console.log(error);
//         }
//       }
//     } else {
//       console.log(error);
//     }
//   });

type Person = {
  FirstName: string,
  LastName: string
}

// const person:Person = { FirstName: "Michael", LastName: "Givens"}

// window.localStorage.setItem("brother", JSON.stringify(person))

const brother = window.localStorage.getItem("brother")
console.log(brother);







// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store: ReduxStore<state.All> = createStore(reducers, {} as state.All, applyMiddleware(sagaMiddleware))

// then run the saga
sagaMiddleware.run(mySaga(store.dispatch))


import { Hello } from "./components/Hello";

function test() {
    console.log('test')
}

test()

store.subscribe(() => {
    console.log(store.getState())
    // setTimeout(() => {
    //     console.log("Responding inside a subscriber.")
    //     store.dispatch(incrementCounter(1))
    // }, 5000)
});


ReactDOM.render(
    <Provider store={store}>
    <Hello compiler="TypeScript" framework="React" />
    </Provider>,
    document.getElementById("example")
);

// Requires script name as input

// const myWorker = new Worker("./workers/worker1.js");
//      myWorker.postMessage([0, 1]); // Sending message as an array to the worker
//  	console.log('Message posted to worker');

// setInterval(() => {
//     store.dispatch(incrementCounter(1)) 
//     store.dispatch({type: "POMODORO_SAVE_META"})

//     // onkeyup could be used instead of onchange if you wanted to update the answer every time
//     // an entered value is changed, and you don't want to have to unfocus the field to update its .value

	
//     myWorker.postMessage([0, 1]); // Sending message as an array to the worker
// 	console.log('Message posted to worker');
	
// 	myWorker.postMessage([2, 3]);
// 	console.log('Message posted to worker');

// 	myWorker.onmessage = function(e) {
		
// 		console.log('Message received from worker' + e.data);
//     };
    
// }, 2000);

store.dispatch(incrementCounter(1)) // { counter: { value: 1 } }
store.dispatch(incrementCounter(1)) // { counter: { value: 2 } }
store.dispatch(incrementCounter(1)) // { counter: { value: 3 } }

