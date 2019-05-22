import { Menu, Icon } from 'antd';
import React, { Component } from "react";
import Logo from '@/components/Logo/Logo'
import LangDrop from '@/components/LangDrop/LangDrop'
import cssObj from './Header.css'
import intl from '@/config/i18n'
const SubMenu = Menu.SubMenu;
class Header extends Component {
    constructor(){
        super()
        this.state = {
            theme:"light" 
        }
    }
    getInitialState() {
        return {
          current: 'mail'
        };
    };
    handleClick(e) {
        console.log('click ', e);
        this.setState({
          current: e.key
        })
    };
    render(){
        return <div className = {cssObj.navStyle}>
        <div className={cssObj.LogoBox}><Logo width='120px' height='45px' float='left'></Logo></div>
           
            <Menu 
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        theme={this.state.theme}
        mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="mail" />{intl.get('home')}
        </Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>{intl.get('meet')}</span></span>}>
            <Menu.Item key="1">选项1</Menu.Item>
            <Menu.Item key="2">选项2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>{intl.get('setting')}</span></span>}>
          <Menu.Item key="3">选项3</Menu.Item>
          <Menu.Item key="4">选项4</Menu.Item>
          <SubMenu key="sub3" title="三级导航">
            <Menu.Item key="5">选项5</Menu.Item>
            <Menu.Item key="6">选项6</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu title={<span><Icon type="setting" />{intl.get('table')}</span>}>
            <Menu.Item key="setting:1">选项1</Menu.Item>
            <Menu.Item key="setting:2">选项2</Menu.Item>
        </SubMenu>
        <SubMenu title={<span><Icon type="setting" />{intl.get('task')}</span>}>
            <Menu.Item key="setting:1">选项1</Menu.Item>
            <Menu.Item key="setting:2">选项2</Menu.Item>
        </SubMenu>
        
      </Menu>

      {/* <Menu theme={this.state.theme}
        mode="horizontal">>
         <Menu.Item key="alipay">
        <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />修改</a>
      </Menu.Item>
      <Menu.Item>
        <LangDrop></LangDrop>
        </Menu.Item>
      <Menu.Item key="alipay">
        <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />帮助</a>
      </Menu.Item>
      </Menu> */}
        </div>
    }
}
export default Header
