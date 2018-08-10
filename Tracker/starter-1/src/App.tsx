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
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
              </a>

              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="my-important-menu" >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>
            <div className="navbar-menu" id="my-important-menu">
              <div className="navbar-end">
              <a className="navbar-item">
                  Home
                  </a>
                  <a className="navbar-item">
                  Other
                  </a>
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

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( (el:any) => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target:any = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });

export default App

