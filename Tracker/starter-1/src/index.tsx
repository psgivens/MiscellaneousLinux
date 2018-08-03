import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, Store as ReduxStore } from 'redux'

import { applyMiddleware } from 'redux'

import createSagaMiddleware from 'redux-saga'

import App from './App';
import './index.css';
import * as state from './reducers'
import { reducers } from './reducers'

import registerServiceWorker from './registerServiceWorker';


// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store: ReduxStore<state.IAll> = createStore(reducers, { counter: 2, counters: { first_pomodoro: 1} } as state.IAll, applyMiddleware(sagaMiddleware))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
