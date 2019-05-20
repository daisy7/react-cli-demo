import intl from 'react-intl-universal';
import enUS from '@/locale/en_US';
import zhCN from '@/locale/zh_CN';
import antd_zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

const locales = {
    'en-US': {
        name: "English",
        custom: enUS,
        antd: undefined,
        monmen: "en"
    },
    'zh-CN': {
        name: '简体中文',
        custom: zhCN,
        antd: antd_zhCN,
        monmen: "zh-cn"
    }
}

const default_locale = function () {
    for (var key in locales) {
        return key
    }
}()

intl.init({
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    currentLocale: default_locale,
    locales: function () {
        let locale = {}
        for (var key in locales) {
            locale[key] = locales[key].custom;
        }
        return locale
    }()
})

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
function setLang(e) {
    if (locales.hasOwnProperty(e)) {
        intl.options.currentLocale = e;
        let value = locales[e]
        antd_locale = value.antd
        moment.locale(value.moment)
        localStorage.setItem('lang_type', e);
    }
    else {
        console.error(`no key is ${e} to set locale`)
    }
};

setLang(localStorage.getItem('lang_type') || default_locale)

export default intl
export { SUPPOER_LOCALES, antd_locale, moment, setLang }