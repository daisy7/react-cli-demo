
import React from 'react';
import Router from '@/config/router';
import { LocaleProvider } from 'antd';
import Intl,{ antd_locale,default_locale } from '@/config/i18n'
import store from './store.js';
import './App.less'

class App extends React.Component {
    constructor() {
        super();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange() {
        this.setState({ })
    }
    render() {
        return (
            <Intl >
                <LocaleProvider locale={antd_locale}>
                    <Router />
                </LocaleProvider>
            </Intl>
        );
    }
}

export default App