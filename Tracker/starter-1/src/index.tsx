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

import mySaga from './sagas/CounterSaga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store: ReduxStore<state.All> = createStore(reducers, { counter: 2, counters: { first_pomodoro: 1}, values:[] } as state.All, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(mySaga(store.dispatch))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
