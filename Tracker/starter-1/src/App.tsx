import * as React from 'react'
import './App.css'

import Shell from './components/Shell';

import { BrowserRouter as Router, Link, Route   } from "react-router-dom";

import SandBox from './components/SandBox'

type BasicProps = {} & {}

const App: React.SFC<BasicProps> = () => 
    (<Router>
        <>
        <aside className="menu">
            <p className="menu-label">
                General
            </p>
            <ul className="menu-list">
                <li><a>Dashboard</a></li>
                <li><a>Customers</a></li>
            </ul>
            <p className="menu-label">
                Administration
            </p>
            <ul className="menu-list">
                <li><a>Team Settings</a></li>
                <li>
                <a className="is-active">Manage Your Team</a>
                <ul>
                    <li><a>Members</a></li>
                    <li><a>Plugins</a></li>
                    <li><a>Add a member</a></li>
                </ul>
                </li>
                <li><a>Invitations</a></li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li>
            </ul>
            <p className="menu-label">
                Transactions
            </p>
            <ul className="menu-list">
                <li><a>Payments</a></li>
                <li><a>Transfers</a></li>
                <li><a>Balance</a></li>
            </ul>
          </aside>
          <Route path="/" component={ SandBox } />
          <section className="section">
            <div className="container">
            <h1 className="title">
                Hello World
            </h1>
            <p className="subtitle">
                My first website with <strong>Bulma</strong>!
            </p>
            </div>
        </section>
          Hello World
          <ul >
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

