import React, { Component } from "react";
import { Menu, Icon } from 'antd';
import cssObj from './Config.css';
import { NavLink } from 'react-router-dom';
import intl from '@/config/i18n'
import history from '@/config/history';
import zh_CN from './locale/zh_CN'
import en_US from './locale/en_US'
class LeftNav extends Component {
    constructor(){
        super()
        Object.assign(intl.options.locales['zh-CN'], zh_CN);
        Object.assign(intl.options.locales['en-US'], en_US);
    }
    state = {
        meaus: [
            {
                icon: 'desktop',
                key: '/main/system/config/ConferenceConfig'
            },
            {
                icon: 'inbox',
                key: '/main/system/config/ConfAreaConfig'
            },
        ]
    }
    componentDidMount(){
        history.push({ pathname: '/main/system/config/ConferenceConfig' })
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
        return <div style={{ width: 280 }}>
            <Menu
                defaultSelectedKeys={['/main/system/config/ConferenceConfig']}
                mode="inline"
                theme="light"
                className={cssObj.leftnav}
            >
                {
                    this.state.meaus.map(item => {
                        return this.renderMenuItem(item)
                    })
                }
            </Menu>
        </div>
    }
}
export default LeftNav
