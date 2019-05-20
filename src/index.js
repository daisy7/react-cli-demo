import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Router from '@/config/router';
import { LocaleProvider,Radio } from 'antd';
import { i18n } from '@/config/i18n'

const sdk = require('./app.bundle.js')

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            locale: null,
        };
    }
    changeLocale = e => {
        i18n.setLang(e.target.value)
        this.setState({ locale: i18n.antd_locale });
    };
    render() {
        const { locale } = this.state;
        return (
            <div>
                <div className="change-locale">
                    <span style={{ marginRight: 16 }}>Change locale of components: </span>
                    <Radio.Group defaultValue="en-US" onChange={this.changeLocale}>
                        <Radio.Button key="en" value="en-US">
                            English
                </Radio.Button>
                        <Radio.Button key="cn" value="zh-CN">
                            中文
                </Radio.Button>
                    </Radio.Group>
                </div>
                <LocaleProvider locale={locale}>
                    <Router/>
                </LocaleProvider>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
