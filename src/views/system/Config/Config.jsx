import React, { Component } from "react";
import {  Layout, Icon, Button } from 'antd';
import LeftNav from './LeftNav'
import { Route } from 'react-router-dom';
import Conference from './Conference/Conference'
const { Sider, Content } = Layout;
let match = '';
class Config extends Component {
    constructor(props) {
        super(props)
        match = props.match;
        this.state = {
            collapsed: false,
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return <div>
           
            <Layout>
                
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    width={280}
                    theme="light"
                >
                <Button type="primary" onClick={this.toggleCollapsed} style={{ }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Content style={{ margin: '24px 16px 0 16px',padding:'16px' ,background: '#fff', minHeight: 300 }}>
                    <Route  path={`${match.url}/conference`} component={Conference}></Route>
                    </Content>
                </Layout>
            </Layout>
        </div>
    }
}
export default Config
