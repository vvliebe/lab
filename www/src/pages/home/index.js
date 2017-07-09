import React from 'react'
import style from './home.scss'
import {NavLink} from 'react-router-dom'

import {dateFormatter} from '@/lib/utils'
import {getLocation, getWeatherByLocation} from '@/lib/api'

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: new Date(),
      alarmId: null
    }
  }
  componentDidMount () {
    let alarmId = setInterval(() => {
      this.setState({time: new Date()})
    }, 1000 * 60)
    this.setState({alarmId})
    getLocation().then(pos => getWeatherByLocation(pos)).then(({data}) => {
      let result = data.query.results.channel
      let location = result.location.region.toUpperCase()
      let temperature = result.item.condition.temp + '°C'
      let code = Number(result.item.condition.code)
      this.setState({location, temperature, code})
    })
  }
  componentWillUnmount () {
    clearInterval(this.state.alarmId)
  }
  render () {
    return <div className={`container ${style.container}`}>
      <ul className={style.menu}>
        <li><NavLink exact activeClassName={style.selected} to="/">Home</NavLink></li>
        <li><NavLink activeClassName={style.selected} to="/projects">Project</NavLink></li>
        <li><NavLink activeClassName={style.selected} to="/about">About</NavLink></li>
        <li><NavLink activeClassName={style.selected} to="/links/0">Links</NavLink></li>
      </ul>
      <div className={style.leftTop}>
        <div className={style.alarm}>
          {dateFormatter(this.state.time, 'hh:mm')}
        </div>
        <div className={style.weather}>
          <div>{this.state.temperature}</div>
          <div>{this.state.location}</div>
        </div>
      </div>
    </div>
  }
}

export default HomePage
