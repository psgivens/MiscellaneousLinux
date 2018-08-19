import * as React from 'react'
import './App.css'

import './css/sample.css'

// import Shell from './components/Shell';

import { BrowserRouter as Router, Route, Switch   } from "react-router-dom";

import CounterDemo from './components/CounterDemo'

import { ListDemo } from './components/ListDemo'

import ThirdDemo from './components/ThirdDemo'

import MainMenu from './components/MainMenu'

import PomodoroDemo from './components/PomodoroDemo'

type BasicProps = {} & {}

const App: React.SFC<BasicProps> = () => 
    (<Router>
        <>
          <MainMenu />
          <Switch>
            <Route path="/CounterDemo" component={ CounterDemo } />
            <Route path="/ListDemo" component={ ListDemo } />
            <Route path="/PomodoroDemo" component={ PomodoroDemo } />            
            <Route path="/ThirdDemo" component={ ThirdDemo } />
            <Route path="/" component={ ListDemo } />          
          </Switch>
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

