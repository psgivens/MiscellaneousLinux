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

import mySaga from './actions/CounterSaga'

import valuesSaga from './actions/ValuesSaga'

import { PomodoroManagementSaga } from './actions/PomodoroManagementSaga'

import createPomodoroSaga from './actions/PomodoroSaga'

// import { createWorker, ITypedWorker } from 'typed-web-workers'

// import { databaseWorker } from './workers/DatabaseWorker'

import { DatabaseWorker, DatabaseWorkerEvent } from './workers/DatabaseWorker'

// import * as workerPath from "file-loader?name=[name].js!./workers/DatabaseWorker";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store: ReduxStore<state.All> = createStore(reducers, { 
  connection: {
    isConnected: false,
    isLoadingPomodoro: false,
    lastConnection: 0,
  },
  counter: 2, 
  counters: { 
    first_pomodoro: 1, 
    second_pomodoro: 6}, 
  pomodoro: { type: "NOT_RUNNING" },    
  pomodoroTimers: { "first_pomodoro": {
      length: "Short", remaining: 2.5*60, timerId:0, type: "BREAK" 
    }},
  pomodoros: [],
  values: [],  
 } as state.All, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(mySaga(store.dispatch))
sagaMiddleware.run(valuesSaga(store.dispatch))

const databaseWorker = new DatabaseWorker(store.dispatch)
databaseWorker.post({ 
  item: {
    actual: "Actually did the thing",
    id: Math.floor(Math.random() * 1000000000),
    planned: "Doing the thing",
    startTime: Date.now(),
    userId: "psgivens",
    version: 0
  },
    type: "INSERT_ITEM",
  })
  .then((event:DatabaseWorkerEvent) =>{
    // tslint:disable-next-line:no-console
    console.log("index.tsx call to postToDb: " + JSON.stringify(event))
  })


const pomodoroManagementSaga = new PomodoroManagementSaga(databaseWorker)
sagaMiddleware.run(() => pomodoroManagementSaga.saga())
sagaMiddleware.run(createPomodoroSaga(store.dispatch))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
