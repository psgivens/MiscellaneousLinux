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

store.dispatch(incrementCounter(1)) // { counter: { value: 1 } }
store.dispatch(incrementCounter(1)) // { counter: { value: 2 } }
store.dispatch(incrementCounter(1)) // { counter: { value: 3 } }

ReactDOM.render(
    <Provider store={store}>
    <Hello compiler="TypeScript" framework="React" />
    </Provider>,
    document.getElementById("example")
);