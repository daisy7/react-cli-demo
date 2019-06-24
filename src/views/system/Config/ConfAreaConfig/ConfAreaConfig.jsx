import React, { Component } from "react";
import cssObj from './ConfAreaConfig.css'
import { Button, Select, Form, Table, Input, Menu, Dropdown, Icon } from 'antd';
const InputGroup = Input.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const kbitArry = [
  { value: 1, bites: '64 kbit/s' },
  { value: 2, bites: '128 kbit/s' },
  { value: 3, bites: '192 kbit/s' },
  { value: 4, bites: '256 kbit/s' },
  { value: 5, bites: '320 kbit/s' },
  { value: 6, bites: '384 kbit/s' },
  { value: 7, bites: '512 kbit/s' },
  { value: 8, bites: '768 kbit/s' },
  { value: 9, bites: '1024 kbit/s' },
  { value: 10, bites: '1152 kbit/s' },
  { value: 11, bites: '1472 kbit/s' },
  { value: 12, bites: '1536 kbit/s' },
  { value: 13, bites: '1920 kbit/s' },
  { value: 14, bites: '2048 kbit/s' },
  { value: 15, bites: '3Mbit/s' },
  { value: 16, bites: '4Mbit/s' },
  { value: 17, bites: '5Mbit/s' },
  { value: 18, bites: '6Mbit/s' },
  { value: 19, bites: '7Mbit/s' },
  { value: 20, bites: '8Mbit/s' },
]

const RateCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        // <Select style={{ width: 70 }}>
        //   <Option value="86">+86</Option>
        //   <Option value="87">+87</Option>
        // </Select>,
        <Input style={{ width: 90 }} />
      );
      const formItemLayout = {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 4 },
        },
      };
      const pformItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      return (

        <Form {...pformItemLayout}>
          <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '50%' }} />)}
          </Form.Item>
          <FormItem
            {...formItemLayout}
            label="最小速率下限"
          >
            {getFieldDecorator('floorLevel', {
              initialValue: 3,
            })(
              <Select>
                {kbitArry.map(item => (
                  <Option key={item.value} value={item.value}>{item.bites}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Form>

      );
    }
  }
);
const SubConfArea = Form.create()(
  class extends React.Component {
    render() {
      const { form, onBlur } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 4 },
        },
      };
      return (

        <Form>
          <FormItem
            {...formItemLayout}
            label="子会议区间个数"
          >
            {getFieldDecorator('SubConfArea', {
              initialValue: 0,
              normalize: (e) => e ? parseInt(e) : '',
              rules: [{
                type: 'number', min: 1, max: 50, message: 'must be 1~50'
              }, {
                required: true, message: 'Please input your SubConfArea '
              },
                // { pattern: regExpConfig.SVC , message: ' 1~49 }
              ],
            })(
              <Input onBlur={onBlur} />
            )}
          </FormItem>
        </Form>

      );
    }
  }
);
const menuDrop = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
        </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
        </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
        </a>
    </Menu.Item>
  </Menu>
);
class ConfAreaConfig extends Component {
  constructor(props) {
    super(props)
    this.columns1 = [{
      title: '区间',
      dataIndex: 'range',
    }, {
      title: '视频协议',
      dataIndex: 'videoProtocol',
      render: text => {
        return <Dropdown overlay={menuDrop}>
          <a className="ant-dropdown-link" href="#">
            Hover me <Icon type="down" />
          </a>
        </Dropdown>
      }
    }, {
      title: '视频格式',
      dataIndex: 'videoResolution',
    },
    {
      title: '音频协议',
      dataIndex: 'audioProtocol',
    },
    {
      title: '阀值',
      dataIndex: 'Threshold',
    },
    {
      title: '最大速率',
      dataIndex: 'highestRate',
    },
    {
      title: '最小速率',
      dataIndex: 'lowestRate',
    },
    ];
    this.columns2 = [
      {
        title: '序号',
        dataIndex: 'number',
      },
      {
        title: '最小值',
        dataIndex: 'min',
      },
      {
        title: '最大值',
        dataIndex: 'max',
      }

      ,]
    this.state = {
      data1: [
        { key: '0', range: '1', videoProtocol: 'H.264', videoResolution: '1080p', audioProtocol: 'AAC-LD 单声道', Threshold: '1', highestRate: '7680', lowestRate: '4 Mbit/s' }
      ],
      data2: [

      ]
    }


  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  handleBlur = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      // const data2 = this.state.data2;
      const data2 = [];
      for (let i = 0; i < values.SubConfArea; i++) {
        let newData = { number: i + 1, min: 0, max: 0 }
        data2.push(newData)
      }
      this.setState({
        data2: data2
      })
      console.log(data2)
    })
  }
  render() {
    return <div>
      <div className={cssObj.GroupTitle}>速率设置范围</div>
      <div className={cssObj.GroupContent}>
        <div className={cssObj.right}>
          <Button className={cssObj.mr}>保存</Button>
          <Button className={cssObj.mr}>取消</Button>
        </div>
        <RateCreateForm
        />
        <Table columns={this.columns1} pagination={false} size="small" dataSource={this.state.data1} />
      </div>
      <div className={cssObj.GroupTitle}>子会议区间设置</div>
      <div className={cssObj.GroupContent}>
        <div className={cssObj.right}>
          <Button className={cssObj.mr}>保存</Button>
          <Button className={cssObj.mr}>取消</Button>
        </div>
        <SubConfArea
          wrappedComponentRef={this.saveFormRef}
          onBlur={this.handleBlur}
        />
        <Table columns={this.columns2} pagination={false} size="small" dataSource={this.state.data2} />
      </div>
    </div>
  }
}
export default ConfAreaConfig
