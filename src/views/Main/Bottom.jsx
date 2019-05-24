import React, { Component } from "react";
import { Icon } from 'antd';
import cssObj from './Bottom.css'
class Bottom extends Component {
    constructor(){
        super()
        this.state = {
            number:11,
            date:this.formatDateTime(new Date())
        }
    }
    componentWillMount() {
        setInterval(()=>{
            this.setState({
                date: this.formatDateTime(new Date())
            })
        }, 60000)
    }
    formatDateTime = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d+' '+h+':'+minute;
        };
    render() {
        return <div className={cssObj.bottom}><span>系统消息</span>
            <div className={cssObj.bottomRight}>
            <Icon type="sound" />
            <Icon type="exclamation-circle" theme="twoTone"  twoToneColor="red"/>
            <span>告警：<span>{this.state.number}</span></span>
            当前服务器时间：<span>{this.state.date}</span>
            </div>
        </div>
    }
}
export default Bottom
