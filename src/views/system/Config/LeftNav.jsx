import React, { Component } from "react";
import { Menu, Icon } from 'antd';
import cssObj from './Config.css';
import { NavLink } from 'react-router-dom';
import intl from '@/config/i18n'
import history from '@/config/history';
class LeftNav extends Component {
    state = {
        meaus: [
            {
                icon: 'desktop',
                key: '/main/system/config/conference'
            },
            {
                icon: 'inbox',
                key: '/main/system/config/range'
            },
        ]
    }
    componentDidMount(){
        history.push({ pathname: '/main/system/config/conference' })
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
                defaultSelectedKeys={['/main/system/config/conference']}
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
