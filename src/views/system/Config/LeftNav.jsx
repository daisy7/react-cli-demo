import React, { Component } from "react";
import { Menu, Icon } from 'antd';
import cssObj from './Config.css';
import { NavLink ,withRouter} from 'react-router-dom';
import intl from '@/config/i18n'
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
            {
                icon: 'inbox',
                key: '/main/system/config/DeviceConfig'
            },
        ]
    }
    componentDidMount(){
        this.props.history.push({ pathname: this.state.meaus[this.state.meaus.length - 1].key })
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
                defaultSelectedKeys={[this.state.meaus[this.state.meaus.length - 1].key]}
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
export default withRouter(LeftNav)
