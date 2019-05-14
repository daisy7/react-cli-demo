import React, { Component } from "react";
import history from '@/config/history';

class Main extends Component {
    render() {
        return (
            <div>
                <div>main页面</div>
                <div onClick={() => history.push('/login')}>返回login</div>
            </div>
        )
    }
}
export default Main
