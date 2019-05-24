import { Menu, Icon } from 'antd';
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Logo from '@/components/Logo/Logo'
import LangDrop from '@/components/LangDrop/LangDrop'
import cssObj from './Header.css'
import intl from '@/config/i18n'
import { Link } from 'react-router-dom';
import history from '@/config/history';

const SubMenu = Menu.SubMenu;
global.menus = [
    {
        title: '首页',
        icon: 'page',
        key: '/main'
    }, {
        title: '会议',
        icon: 'bulb',
        key: '/meeting',
        subs: [
            { key: '/main/c1cbd7', title: '淡蓝', icon: '' },
        ]
    },
    {
        title: '设置',
        icon: 'bulb',
        key: '/setting',
        subs: [
            { key: '/page/1', title: '弹出框', icon: '' },
            { key: '/page/2', title: '弹出框', icon: '' },
        ]
    },
]
const menus = global.menus;
class Header extends Component {
    constructor() {
        super()
        this.state = {
            theme: "light",
            current:""
        }
    }
    renderSubMenu = ({ key, icon, title, subs }) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon} />}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }
    renderMenuItem = ({ key, icon, title, }) => {
        return (
            <Menu.Item key={key}>
                <NavLink to={key}>
                    {icon && <Icon type={icon} />}
                    <span>{title}</span>
                </NavLink>
            </Menu.Item>
        )
    }
    getInitialState() {
        return {
            current: 'mail'
        };
    };
    handleClick(e) {
        console.log('click ', e);
        history.push({ pathname: e.key });
        // this.setState({
        //     current: e.key
        // })
    };
    render() {
        return (<div className={cssObj.navStyle}>
            <div className={cssObj.LogoBox}><Logo width='120px' height='45px' float='left'></Logo></div>
            <Menu
                onClick={this.handleClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                theme={this.state.theme}
                mode="horizontal"
                className={cssObj.middleNav}
            >
                {
                    menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
            <Menu theme={this.state.theme}
                mode="horizontal" className={cssObj.toolBox}>
                <Menu.Item key="alipay1">
                    <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />修改</a>
                </Menu.Item>
                <Menu.Item>
                    <LangDrop></LangDrop>
                </Menu.Item>
                <Menu.Item key="alipay2">
                    <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />帮助</a>
                </Menu.Item>
                <Menu.Item key="96a48b">
                    <Link to="/main/96a48b">淡绿</Link>
                </Menu.Item>
                <Menu.Item key="c9c0d3">
                    <Link to="/main/c9c0d3">浅紫</Link>
                </Menu.Item>
                <Menu.Item key="b7b1a5">
                    <Link to="/main/b7b1a5">淡棕</Link>
                </Menu.Item>
            </Menu>
        </div>)
    }
}
export default Header
