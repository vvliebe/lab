import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import style from './navbar.scss'

export default class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: props.defaultIndex
    }
  }
  changeNavIndex (index) {
    this.setState({activeIndex: index}, () => {
      if (this.props.onClick) this.props.onClick(index)
    })
  }
  render () {
    const links = this.props.links.map((link, index) => {
      return <li key={index}
        className={className({[style.active]: index === this.state.activeIndex})}
        onClick={this.changeNavIndex.bind(this, index)}>
          {link.name}
      </li>
    })
    return <div className={style.navbar}>
      <ul>
        {links}
      </ul>
    </div>
  }
}

NavBar.propTypes = {
  links: PropTypes.array.isRequired,
  defaultIndex: PropTypes.number,
  onClick: PropTypes.func
}

NavBar.defaultProps = {
  defaultIndex: 0
}
