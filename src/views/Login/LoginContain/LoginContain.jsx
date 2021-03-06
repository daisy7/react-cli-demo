import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { regExpConfig } from '@/config/Reg.confing'
import cssObj from './LoginContain.css'
// import intl from '@/config/i18n'
import { setCookie, clearCookie,getCookie } from '@/tools/cookie'
import { FormattedMessage  } from 'react-intl';

// import sdk from '@/sdk.js'
const FormItem = Form.Item;
class LoginContain extends Component {
  constructor() {
    super();
    this.state = {
        userName:"",
        password:""
    };
  }
  componentDidMount(){
    this.setState({ 
      userName:getCookie('userName'),
      password:getCookie('password')
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields(['userName', 'password', 'remember'], (err, values) => {
      // values.callback=function(res){
      //   if(res.code!=0){

      //   }
      // }
      if (!err) {
        console.log('Received values of form: ', values);
        if (values['remember']) {
          setCookie('userName', values['userName'], 7);
          setCookie('password', values['password'], 7);
        }
        else {
          clearCookie('userName');
          clearCookie('password');
        }
        this.props.history.push({ pathname: '/main' })
        // sdk.SMCSDK_User_Auth.login(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={cssObj.loginForm}>
        <FormItem>
          {getFieldDecorator('userName', {
            initialValue: this.state.userName,
            rules: [
              { required: true, message: 'Please input your username!' },
              { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' }
            ],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: this.state.password,
            rules: [
              { required: true, message: 'Please input your Password!' },
              { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
            ],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox ></Checkbox>
          )}
          <Button type="primary" htmlType="submit" className={cssObj.formButton}>
          {/* <FormattedMessage id="login" /> */}
          </Button>
        </FormItem>
      </Form>
    );
  }
}
LoginContain = Form.create()(LoginContain);
export default LoginContain