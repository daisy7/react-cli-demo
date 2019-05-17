import { Menu, Icon } from 'antd';
import React, { Component } from "react";
import cssObj from "./LoginNav.css"
import intl,{i18n} from '@/config/i18n'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LoginNav extends Component {
  constructor() {
    super()
    this.state = {
      theme: "dark"
    }
  }
  getInitialState() {
    return {
      current: 'mail'
    };
  };
  render() {
    return <Menu
      onClick={i18n.setLang}
      selectedKeys={[this.state.current]}
      className={cssObj.navRight}
      theme={this.state.theme}
      mode="horizontal">
      <Menu.Item key="mail">
        <Icon type="mail" />{intl.get('login')}
        </Menu.Item>
      {/* <Menu.Item key="app">
          <Icon type="appstore" />TE Desktop下载
        </Menu.Item> */}
        <SubMenu title={<span><Icon type="setting" />{intl.get('lang')} </span>}>
          <MenuItemGroup title={intl.get('group1')}>
          {i18n.SUPPOER_LOCALES.map(locale => (
            <Menu.Item key={locale.value} value={locale.value}>{locale.name}</Menu.Item>
          ))}
          </MenuItemGroup>
        </SubMenu>
        {/* <Menu.Item key="alipay">
          <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />帮助</a>
        </Menu.Item> */}
      </Menu>
  }
}
export default LoginNav
