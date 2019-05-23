import React, { Component } from "react";


let match = {};
let baseUrl = ""
class Register extends Component {
    constructor(props) {
        super()
        this.state = {
           
        }
        match = props.match;
        baseUrl = match.url;
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.match)
    }
    render() {
        return (
            <div>注册组件</div>
        )
    }
}

export default Register