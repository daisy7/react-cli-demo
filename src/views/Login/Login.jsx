import React, { Component } from "react";
import cssObj from "./Login.css";
import Logo from "@/components/Logo/Logo.jsx"
import LoginContain from "./LoginContain/LoginContain"
import Register from "./Register"
import intl, { moment } from '@/config/i18n'
import { Calendar, Menu, Icon } from 'antd';
import LangDrop from '@/components/LangDrop/LangDrop'
import { Route, Link } from 'react-router-dom';
import zh_CN from './locale/zh_CN'
import en_US from './locale/en_US'
let match = {};
let baseUrl = ""
class Login extends Component {
    constructor(props) {
        super()
        this.state = {
            //   logoStyle:cssObj.logoImg
            theme: "dark",
        }
        match = props.match;
        baseUrl = match.url;
        Object.assign(intl.options.locales['zh-CN'], zh_CN);
    Object.assign(intl.options.locales['en-US'], en_US);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.match)
    }
    handleClick(e) {
        if (e.key === "register") {
        }
    }
    render() {
        return (
            <div className={cssObj.Login}>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    className={cssObj.navRight}
                    theme={this.state.theme}
                    mode="vertical">
                    <Menu.Item key="register">
                        <Icon type="mail" />
                        {intl.get('register')}
                        <Link to={`${baseUrl}/register/test`}></Link>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <Icon type="mail" />
                        {intl.get('login')}
                        <Link to={{ pathname: `${baseUrl}/login`, query: { name: "test" } }}></Link>
                        {/* <Link to={`${baseUrl}/login?name=test`}>{intl.get('login')}</Link> */}
                    </Menu.Item>
                    <Menu.Item key="app">
                        <Icon type="appstore" />
                       {intl.get('TEDesktop')}
                    </Menu.Item>
                    <Menu.Item key="lang">
                        <LangDrop></LangDrop>
                    </Menu.Item>
                    <Menu.Item key="alipay">
                        <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />{intl.get('help')}</a>
                    </Menu.Item>
                </Menu>
                <div className={cssObj.bgDiv}>
                    <Logo width="400px" height="90px"></Logo>
                    <Route path={`${baseUrl}/login`} component={LoginContain} />
                    <Route path={`${baseUrl}/register/:name`} component={Register} />
                    <button onClick={() => this.props.history.push({ pathname: '/main' })}>{intl.get('redirect')}</button>
                </div>
                <div style={{ width: 319, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} value={moment()} />
                </div>
            </div>
        )
    }
}

export default Login