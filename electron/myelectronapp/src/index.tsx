import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore, Store as ReduxStore } from 'redux'
import { reducers, Store } from './reducers'
import { incrementCounter } from './actions'

const store: ReduxStore<Store.All> = createStore(reducers)



import { Hello } from "./components/Hello";

function test() {
    console.log('test')
}

test()

store.subscribe(() => {
    console.log(store.getState())
  })
  
  store.dispatch(incrementCounter(1)) // { counter: { value: 1 } }
  store.dispatch(incrementCounter(1)) // { counter: { value: 2 } }
  store.dispatch(incrementCounter(1)) // { counter: { value: 3 } }

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);