import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as base from '@/views'

const BasicRoute = () => (
    <Router>
        <Switch>
            <Route exact  path="/" render={() => {
                return <Redirect to="/user/login" />
            }} />
            <Route path="/user" component={base.Login} />
            <Route path="/main" component={base.Main} />
        </Switch>
    </Router>
);
export default BasicRoute;