import React from 'react'

import style from './links.scss'
import NavBar from '@/components/navbar'
import SideBar from '@/components/sidebar'
import {scrollTop} from '@/lib/utils'
import {navLinks} from '@/mocks/links'

class LinksPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      links: navLinks,
      menuIndex: 0
    }
    this.menus = []
  }
  componentWillReceiveProps () {}
  changeNav (index) {
    this.props.history.replace(`/links/${index}`)
  }
  changeMenu (index) {
    this.setState({menuIndex: index}, () => {
      let top = this.menus[index].offsetTop - 64 - 20
      scrollTop(this.linksDom, top)
    })
  }
  render () {
    let index = Number(this.props.match.params.index)
    let currentMenus = this.state.links[index]

    const links = currentMenus.links.map(menu => {
      let list = menu.links.map((link, index) => <li key={index}>
        <a href={link.link} target="_blank" className={style.card}>
          <img src={link.icon} alt=""/>
          <div>{link.name}</div>
        </a>
      </li>)
      return <div key={menu.name} className={style.menu} ref={ref => { this.menus.push(ref) }}>
        <div>{menu.name}</div>
        <ul>
          {list}
        </ul>
      </div>
    })

    return <div className={`container ${style.links}`}>
      <NavBar
        links={this.state.links}
        defaultIndex={index}
        onClick={this.changeNav.bind(this)}/>
      <div className={style.main}>
        <SideBar
          data={currentMenus ? currentMenus.links : null}
          onChange={this.changeMenu.bind(this)}/>
        <div className={style.linksContainer} ref={ref => { this.linksDom = ref }}>
          {links}
        </div>
      </div>
    </div>
  }
}

export default LinksPage
