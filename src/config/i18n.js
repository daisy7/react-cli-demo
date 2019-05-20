import intl from 'react-intl-universal';
import enUS from '@/locale/en_US';
import zhCN from '@/locale/zh_CN';
import antd_zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

const locales = {
    'en-US': enUS,
    'zh-CN': zhCN
}

const antd_locales = {
    'en-US': undefined,
    'zh-CN': antd_zhCN
}

const monment_locales = {
    'en-US': "en",
    'zh-CN': "zh-cn"
}

const i18n = {

    SUPPOER_LOCALES: [
        {
            name: 'English',
            value: 'en-US',
        },
        {
            name: '简体中文',
            value: 'zh-CN',
        }
    ],
    antd_locale: undefined,
    setLang: e => {
        if (antd_locales.hasOwnProperty(e)) {
            i18n.antd_locale = antd_locales[e]
        }
        if (monment_locales.hasOwnProperty(e)) {
            moment.locale(monment_locales[e])
        }
        intl.options.currentLocale = e;
    }
}
intl.init({
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    currentLocale: i18n.SUPPOER_LOCALES[0].value,
    locales
})

export default intl
export { i18n, moment }