import React, { Component } from "react";
import { Layout, Icon, Button } from 'antd';
import LeftNav from './LeftNav'
import { Route } from 'react-router-dom';
import Conference from './Conference/Conference'
import ConfAreaConfig from './ConfAreaConfig/ConfAreaConfig'
import DeviceConfig from './DeviceConfig/DeviceConfig'
import ServiceAreas from './ServiceAreas/ServiceAreas'
import cssObj from './Config.css';
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
                    <Button type="primary" onClick={this.toggleCollapsed} style={{}}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Content style={{ margin: '0px 16px', background: '#fff', minHeight: 300, }}>
                        <div className={cssObj.scrollDiv}>
                            <Route path={`${match.url}/ConferenceConfig`} component={Conference}></Route>
                            <Route path={`${match.url}/ConfAreaConfig`} component={ConfAreaConfig}></Route>
                            <Route path={`${match.url}/DeviceConfig`} component={DeviceConfig}></Route>
                            <Route path={`${match.url}/ServiceAreas`} component={ServiceAreas}></Route>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    }
}
export default Config
