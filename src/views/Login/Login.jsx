import React, { Component } from "react";
import cssObj from "./Login.css";
import LoginNav from "@/components/LoginNav/LoginNav.jsx"
import Logo from "@/components/Logo/Logo.jsx"
import LoginContain from "@/components/LoginContain/LoginContain"
import history from '@/config/history';
import intl from '@/config/i18n'
class Login extends Component {
    constructor(){
        super()
        this.state = {
        //   logoStyle:cssObj.logoImg
         
        }
    }
    render() {
        return (
            <div className={cssObj.Login}>
                <LoginNav></LoginNav>
                <div className={cssObj.bgDiv}>
                <Logo width="400px" height="90px"></Logo>
                <LoginContain></LoginContain>
                <button onClick= {()=> history.push({pathname:'/main'})}>{intl.get('redirect')}</button>
                </div>
            </div>
        )
    }
}

export default Login