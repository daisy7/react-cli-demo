import { Menu, Icon } from 'antd';
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Logo from '@/components/Logo/Logo'
import LangDrop from '@/components/LangDrop/LangDrop'
import cssObj from './Header.css'
import intl from '@/config/i18n'
const SubMenu = Menu.SubMenu;
let match = {}
class Header extends Component {
    constructor(props) {
        super()
        this.state = {
            theme: "light",
            menus: [
                {
                    icon: 'page',
                    key: '/main'
                }, {
                    icon: 'bulb',
                    key: '/main/meeting',
                    subs: [
                        { key: '/main/meeting/blue',  icon: '' },
                        { key: '/main/meeting/meetCreate',  icon: '' },
                        { key: '/main/meeting/ConferenceTemplate',  icon: '' },
                        { key: '/main/meeting/ScheduledConference', icon: '' },
                        { key: '/main/meeting/HistoryConference', icon: '' },
                    ]
                },
                {
                    icon: 'bulb',
                    key: '/device',
                    subs: [
                        { key: '/main/device/sites',icon: '' },
                        { key: '/main/device/mcu',  icon: '' },
                        { key: '/main/device/sc', icon: '' },
                        {
                            key: '/main/device/SoftwareManage',
                            icon: '',
                            subs: [
                                { key: '/main/device/SoftwareManage', icon: '' },
                                { key: '/main/device/DeviceUpgrade',  icon: '' },
                            ]
                        },
                    ]
                },
                {
                    icon: 'bulb',
                    key: '/system',
                    subs: [
                        { key: '/main/system/config/', icon: '' },
                        { key: '/main/system/user', icon: '' },
                    ]
                },
            ]
        }
        match = props.match;
    }
    renderSubMenu = ({ key, icon, subs }) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon} />}<span>{intl.get(key.split('/').filter(i => i).pop())}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }
    renderMenuItem = ({ key, icon }) => {
        return (
            <Menu.Item key={key}>
                <NavLink to={key}>
                    {icon && <Icon type={icon} />}
                    <span>{intl.get(key.split('/').filter(i => i).pop())}</span>
                </NavLink>
            </Menu.Item>
        )
    }
    render() {
        return <div className={cssObj.navStyle}>
            <div className={cssObj.LogoBox}><Logo width='120px' height='45px' float='left'></Logo></div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                theme={this.state.theme}
                mode="horizontal"
                className={cssObj.middleNav}
            >
                {
                    this.state.menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
                <Menu.Item key="alipay1">
                    <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />{intl.get('modfied')}</a>
                </Menu.Item>
                <Menu.Item>
                    <LangDrop></LangDrop>
                </Menu.Item>
                <Menu.Item key="alipay2">
                    <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />{intl.get('help')}</a>
                </Menu.Item>
            </Menu>
        </div>
    }
}
export default Header
