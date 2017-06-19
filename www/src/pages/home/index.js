import React from 'react'
import style from './home.scss'

import {dateFormatter} from '@/lib/utils'
import {getLocation, getWeatherByLocation, testAPI, testAPI2} from '@/lib/api'

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
    return <div className="container">
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
