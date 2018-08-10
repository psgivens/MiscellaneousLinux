import * as React from 'react'
import './App.css'

import './css/sample.css'

import Shell from './components/Shell';

import { BrowserRouter as Router, Link, Route   } from "react-router-dom";

import SandBox from './components/SandBox'

type BasicProps = {} & {}

const App: React.SFC<BasicProps> = () => 
    (<Router>
        <>
        <nav className="navbar" role="navigation" aria-label="dropdown navigation">
  <a className="navbar-item">
    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
  </a>

  <div className="navbar-item has-dropdown is-hoverable">
    <a className="navbar-link">
      Docs
    </a>

    <div className="navbar-dropdown">
      <a className="navbar-item">
        Overview
      </a>
      <a className="navbar-item is-active">
        Elements
      </a>
      <a className="navbar-item">
        Components
      </a>
      <hr className="navbar-divider" />
      <div className="navbar-item">
        Version 0.7.1
      </div>
    </div>
  </div>
</nav>

<section className="hero is-primary">
  <div className="hero-body">
    <p className="title">
      Documentation
    </p>
    <p className="subtitle">
      Everything you need to <strong>create a website</strong> with Bulma
    </p>
  </div>
</section>
        {/* <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>
  <div className="navbar-menu">

    <div className="navbar-end">
    <a className="navbar-item">
        Home
        </a>
        <a className="navbar-item">
        Other
        </a>
    </div>

  </div>
</nav> */}
        {/* <aside className="menu">
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
          </aside> */}



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

// document.addEventListener('DOMContentLoaded', () => {

//     // Get all "navbar-burger" elements
//     const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
//     // Check if there are any navbar burgers
//     if ($navbarBurgers.length > 0) {
  
//       // Add a click event on each of them
//       $navbarBurgers.forEach( (el:any) => {
//         el.addEventListener('click', () => {
  
//           // Get the target from the "data-target" attribute
//           const target = el.dataset.target;
//           const $target:any = document.getElementById(target);
  
//           // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//           el.classList.toggle('is-active');
//           $target.classList.toggle('is-active');
  
//         });
//       });
//     }
  
//   });

export default App

