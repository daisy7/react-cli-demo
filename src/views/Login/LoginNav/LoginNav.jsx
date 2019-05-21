import { Menu, Icon } from 'antd';
import React, { Component } from "react";
import cssObj from "./LoginNav.css"
import intl, { SUPPOER_LOCALES } from '@/config/i18n'
// import store from '@/store.js';
// import { changeLocale } from '@/actions/lang-actions';
// const SubMenu = Menu.SubMenu;

import LangDrop from '@/components/LangDrop/LangDrop'

class LoginNav extends Component {
  constructor() {
    super()
    this.state = {
      theme: "dark",
    }
  }
  getInitialState() {
    return {
      current: 'mail'
    };
  };
  handleClick(e) {
    // store.dispatch(changeLocale(e.key))
  };

  render() {
    return <Menu
      onClick={this.handleClick}
      selectedKeys={[this.state.current]}
      className={cssObj.navRight}
      theme={this.state.theme}
      mode="horizontal">
      <Menu.Item key="mail">
        <Icon type="mail" />{intl.get('login')}
      </Menu.Item>
      <Menu.Item key="app">
        <Icon type="appstore" />TE Desktop下载
        </Menu.Item>
      {/* <SubMenu title={<span><Icon type="setting" />{intl.get('lang')} </span>}>
          {SUPPOER_LOCALES.map(locale => (
            <Menu.Item key={locale.value} value={locale.value}>{locale.name}</Menu.Item>
          ))}
      </SubMenu> */}
      <Menu.Item key="lang">
        <LangDrop></LangDrop>
      </Menu.Item>

      <Menu.Item key="alipay">
        <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />帮助</a>
      </Menu.Item>
    </Menu>
  }
}
export default LoginNav
