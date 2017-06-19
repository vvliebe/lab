import React from 'react'
import style from './links.scss'

class LinksPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      links: []
    }
  }
  getLinks () {
    return <div>
      a
    </div>
  }
  render () {
    return <div className="container">
      <div className={style.links}>
        {this.getLinks()}
      </div>
    </div>
  }
}

export default LinksPage
