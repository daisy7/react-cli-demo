import React, { Component } from "react";
import { Menu, Icon } from 'antd';
import cssObj from './Config.css';
import { NavLink ,withRouter} from 'react-router-dom';
import zh_CN from './locale/zh_CN'
import en_US from './locale/en_US'
import { injectIntl } from 'react-intl';
import  { setLocale } from '@/config/i18n'

setLocale('zh-CN',zh_CN);
setLocale('en-US',en_US);
class LeftNav extends Component {
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
            {
                icon: 'inbox',
                key: '/main/system/config/ServiceAreas'
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
                    <span>{this.props.intl.formatMessage({id:key.split('/').filter(i => i).pop()})}</span>
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
export default injectIntl(withRouter(LeftNav))
