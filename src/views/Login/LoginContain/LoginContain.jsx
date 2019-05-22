import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import history from '@/config/history';
import { regExpConfig } from '@/config/Reg.confing'
import cssObj from './LoginContain.css'
import intl from '@/config/i18n'
import { setCookie, clearCookie,getCookie } from '@/tools/cookie'

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
    console.log(getCookie('userName'))
    console.log(getCookie('password'))
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
        history.push({ pathname: '/main' })

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
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={intl.get('username')} />
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
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={intl.get('password')} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox >{intl.get('remember_me')}</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className={cssObj.formButton}>
            {intl.get('login')}
          </Button>
        </FormItem>
      </Form>
    );
  }
}
LoginContain = Form.create()(LoginContain);
export default LoginContain