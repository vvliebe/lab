import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'

import style from './sidebar.scss'

class SideBar extends React.Component {
  constructor (props) {
    super(props)
    console.log(props.data)
    this.state = {
      activeIndex: props.defaultIndex
    }
  }
  handleClickMenu (index) {
    this.setState({activeIndex: index}, () => {
      if (this.props.onChange) this.props.onChange(index)
    })
  }
  render () {
    const links = this.props.data.map((link, index) => {
      return <li
        key={index}
        className={className({[style.active]: index === this.state.activeIndex})}
        onClick={this.handleClickMenu.bind(this, index)}>
          {link.name}
      </li>
    })
    return <div className={style.sidebar}>
      <ul>
        {links}
      </ul>
    </div>
  }
}

SideBar.propTypes = {
  data: PropTypes.array.isRequired,
  defaultIndex: PropTypes.number,
  onClick: PropTypes.func
}

SideBar.defaultProps = {
  defaultIndex: 0
}

export default SideBar
