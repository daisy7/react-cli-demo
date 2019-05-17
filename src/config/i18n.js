import intl from 'react-intl-universal';
import enUS from '@/locale/en_US';
import zhCN from '@/locale/zh_CN';

const locales = {
    'en-US': enUS,
    'zh-CN': zhCN
}

const i18n = {

    SUPPOER_LOCALES: [
        {
            name: 'English',
            value: 'en-US'
        },
        {
            name: '简体中文',
            value: 'zh-CN'
        }
    ],

    getLang: () => {
        return localStorage.getItem('lang_type') || 'en-US';
    },
    setLang: ev => {
        localStorage.setItem('lang_type', ev.key);
        window.location.reload();
    }
}

const locale = i18n.getLang();

intl.init({
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    currentLocale: locale, // TODO: determine locale here
    locales
})

export default intl
export { i18n }