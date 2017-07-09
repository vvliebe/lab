import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from '@/pages/home'
import Projects from '@/pages/projects'
import About from '@/pages/about'
import Links from '@/pages/links'

import style from '@/pages/app.scss'

const App = () => <Router>
  <div className={style.app}>
    <Route exact path="/" component={Home}></Route>
    <Route path="/projects" component={Projects}></Route>
    <Route path="/about" component={About}></Route>
    <Route path="/links/:index(\d+)" component={Links}></Route>
  </div>
</Router>

export default App
