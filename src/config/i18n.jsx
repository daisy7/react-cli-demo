import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import enUS from '@/locale/en_US';
import zhCN from '@/locale/zh_CN';
import antd_zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { Component } from 'react';

addLocaleData([...en, ...zh]);

const locales = {
    'en-US': {
        name: "English",
        custom: enUS,
        antd: undefined,
        moment: "en"
    },
    'zh-CN': {
        name: '简体中文',
        custom: zhCN,
        antd: antd_zhCN,
        moment: "zh-cn"
    }
}

const default_locale = function () {
    for (var key in locales) {
        return key
    }
}()

const SUPPOER_LOCALES = function () {
    let locales_t = []
    for (var key in locales) {
        let locale = {};
        locale["name"] = locales[key].name;
        locale["value"] = key;
        locales_t.push(locale)
    }
    return locales_t
}();
let antd_locale = undefined;
let locale = default_locale
const setLang = e => {
    if (locales.hasOwnProperty(e)) {
        // intl.options.currentLocale = e;
        let value = locales[e]
        antd_locale = value.antd
        moment.locale(value.moment)
        localStorage.setItem('lang_type', e);
        locale = e;
    }
    else {
        console.error(`no key is ${e} to set locale`)
    }
};

setLang(localStorage.getItem('lang_type') || default_locale)

const setLocale=(locale,messages)=>{
    if (locales.hasOwnProperty(locale)) {
        Object.assign(locales[locale].custom, messages);
        console.log(locales[locale].custom)
    }
    else {
        console.error(`no key is ${e} to set locale`)
    }
}

class Intl extends Component {
    render() {
        let { children } = this.props;
        return (
            // eslint-disable-next-line react/react-in-jsx-scope
            <IntlProvider locale={locale} messages={locales[locale].custom}>
                {children}
            </IntlProvider>
        )
    }
};
export default Intl
export { SUPPOER_LOCALES, antd_locale, moment, setLang, IntlProvider, default_locale,setLocale }