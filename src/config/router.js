import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as base from '@/views'

const BasicRoute = () => (
    <Router>
        <Switch>
            <Route exact  path="/" render={() => {
                return <Redirect to="/newFunc" />
            }} />
            <Route path="/user" component={base.Login} />
            <Route path="/main" component={base.Main} />
            <Route exact path="/newFunc" component={base.NewFunc.CheckAll}/>
            <Route exact path="/newFunc/echarts" component={base.NewFunc.Echarts}/>
        </Switch>
    </Router>
);
export default BasicRoute;