import { Menu, Dropdown, Icon, message } from 'antd';
import React, { Component } from "react";
import { SUPPOER_LOCALES } from '@/config/i18n'
import store from '@/store.js';
import { changeLocale } from '@/actions/lang-actions';
import { FormattedMessage  } from 'react-intl';

const onClick = function ({ key }) {
  message.info(`Click on item ${key}`);
  store.dispatch(changeLocale(key))
};

const menu = (
  <Menu onClick={onClick}>
    {SUPPOER_LOCALES.map(locale => (
      <Menu.Item key={locale.value} value={locale.value}>{locale.name}</Menu.Item>
    ))}
  </Menu>
);
class LangDrop extends Component {
  render() {
    return (
      <Dropdown overlay={menu}>
        <div>
        <FormattedMessage id="lang" />
          {/* {intl.get('lang')}<Icon type="down" />由于Dropdown标签（除此标签外还有其他标签）底下的直属标签个数只能有一个，所以 {intl.get('lang')}和<Icon type="down" /> 不能并存，解决办法就是可以给这俩个包一个div或者其他的，这种错误以后经常会有，报错比较恶心，只会在ReactDOM.render这个调用的时候出现，没法定位具体位置，特记此 */}
        </div>
      </Dropdown>
    );
  }
}

export default LangDrop


