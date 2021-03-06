import React, { Component } from "react";
import Header from './Header'
import Bottom from './Bottom'
import cssObj from './Main.css'
import Meeting from '@/views/meetCreate'
import Config from '@/views/system/Config/Config'
import defaultIndex from './defaultIndex'
import { Route, Link, Switch, withRouter, Redirect } from 'react-router-dom';
import { Icon, Breadcrumb, Alert } from 'antd';
import {injectIntl} from 'react-intl';

const Topic = ({ match }) => {
    return <div style={{ width: "300px", height: "300px", textAlign: "center", lineHeight: "300px", background: '#' + match.params.background }}><h3 style={{ color: "#fff" }}>莫兰迪色系</h3></div>
};
const Main = withRouter(props => {
    const { location, match,intl } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{intl.formatMessage({id:_})}</Link>
            </Breadcrumb.Item>
        );
    });
    return (
        <div className={cssObj.Main}>
            <Header></Header>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            <div className={cssObj.content}>
                <Switch>
                    <Route exact path={`${match.url}`} component={defaultIndex}></Route>
                    <Route path={`${match.url}/meeting/blue`} component={Topic} />
                    <Route path={`${match.url}/meeting/meetCreate`} component={Meeting.meetCreate}></Route>
                    <Route path={`${match.url}/system/config`} component={Config}></Route>
                </Switch>
            </div>
            <Bottom></Bottom>
        </div>
    );
});
export default injectIntl(Main)