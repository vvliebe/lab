import React from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

import Home from '@/pages/home'
import Projects from '@/pages/projects'
import About from '@/pages/about'
import Links from '@/pages/links'

import style from '@/pages/app.scss'

const App = () => <Router>
  <div className={style.app}>
    <ul className={style.menu}>
      <li><NavLink exact activeClassName={style.selected} to="/">Home</NavLink></li>
      <li><NavLink activeClassName={style.selected} to="/projects">Project</NavLink></li>
      <li><NavLink activeClassName={style.selected} to="/about">About</NavLink></li>
      <li><NavLink activeClassName={style.selected} to="/links">Links</NavLink></li>
    </ul>
    <Route exact path="/" component={Home}></Route>
    <Route path="/projects" component={Projects}></Route>
    <Route path="/about" component={About}></Route>
    <Route path="/links" component={Links}></Route>
  </div>
</Router>

export default App
