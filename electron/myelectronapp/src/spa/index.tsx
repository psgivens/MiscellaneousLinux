import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, Store as ReduxStore } from 'redux'
import { reducers } from './reducers'
import * as state from './reducers'
import { incrementCounter } from './actions'
import { Provider } from 'react-redux'


const store: ReduxStore<state.All> = createStore(reducers, {} as state.All)



import { Hello } from "./components/Hello";

function test() {
    console.log('test')
}

test()

store.subscribe(() => {
    console.log(store.getState())
});


ReactDOM.render(
    <Provider store={store}>
    <Hello compiler="TypeScript" framework="React" />
    </Provider>,
    document.getElementById("example")
);

// Requires script name as input
const myWorker = new Worker("./workers/worker1.js");

setInterval(() => {
    store.dispatch(incrementCounter(1)) 


        // onkeyup could be used instead of onchange if you wanted to update the answer every time
        // an entered value is changed, and you don't want to have to unfocus the field to update its .value

	
	  myWorker.postMessage([0, 1]); // Sending message as an array to the worker
	  console.log('Message posted to worker');
	
	  myWorker.postMessage([2, 3]);
	  console.log('Message posted to worker');

	myWorker.onmessage = function(e) {
		
		console.log('Message received from worker' + e.data);
    };
    
}, 20000);

store.dispatch(incrementCounter(1)) // { counter: { value: 1 } }
store.dispatch(incrementCounter(1)) // { counter: { value: 2 } }
store.dispatch(incrementCounter(1)) // { counter: { value: 3 } }

