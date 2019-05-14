import React from 'react';
import { Router, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import history from '@/config/history'
import * as base from '@/views'

const BasicRoute = () => (
    <Router history={history}>
        <Switch>
            <Route exact  path="/" render={() => {
                return <Redirect to="/login" />
            }} />
            <Route exact path="/login" component={base.Login} />
            <Route exact path="/main" component={base.Main} />
        </Switch>
    </Router>
);
export default BasicRoute;