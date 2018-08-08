import * as React from 'react'
import './App.css'

import Shell from './components/Shell';

import { BrowserRouter as Router, Link, Route   } from "react-router-dom";

import SandBox from './components/SandBox'

type BasicProps = {} & {}

const App: React.SFC<BasicProps> = () => 
    (<Router>
        <>
          <Route path="/" component={ SandBox } />
          Hello World
          <ul>
              <li><Link to="/">Home</Link> </li>
          </ul>
          
          <Shell >
              <div>
                  Hello Shell
              </div>
          </Shell>
        </>
    </Router>)

export default App

