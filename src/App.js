
import React from 'react';
import Router from '@/config/router';
import { LocaleProvider } from 'antd';
import { antd_locale } from '@/config/i18n'
import store from './store.js';
import './App.css'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            locale:store.getState().locale
        };
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);
    }
    handleStoreChange() {
        let locale = store.getState().locale;
        this.setState({ locale })
    }
    render() {
        return (
            <LocaleProvider locale={antd_locale}>
                <Router />
            </LocaleProvider>
        );
    }
}

export default App