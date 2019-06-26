import React, { Component } from "react";
import cssObj from './DeviceConfig.css'
import { Form, Input, Select, Checkbox, Button, Table, Modal, Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const muteArry = [
    { value: 1, bites: '不启用' },
    { value: 2, bites: '始终启用' },
    { value: 3, bites: '会场5个以上启用' },
    { value: 4, bites: '会场10个以上启用' },
    { value: 5, bites: '会场20个以上启用' },
    { value: 6, bites: '会场40个以上启用' },
    { value: 7, bites: '会场60个以上启用' },
    { value: 8, bites: '会场80个以上启用' },
];
// 定义弹框组件
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, data } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    centered
                    title="SNMP通知消息接受地址"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item>
                            {getFieldDecorator('key', {
                                initialValue: data.key,
                            })(<Input hidden />)}
                        </Form.Item>
                        <FormItem label="地址">
                            {getFieldDecorator('address', {
                                initialValue: data.address,
                                rules: [{ required: true, message: 'Please input the address!' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="备注">
                            {getFieldDecorator('content', {
                                initialValue: data.content,
                                rules: [{ message: 'Please input content' }],
                            })(
                                <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);
let selectedData = [];
let id = 0;
class DeviceConfig extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
            title: '地址',
            dataIndex: 'address',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '内容',
            dataIndex: 'content',
        }];
        this.state = {
            visible: false,
            collectionData: {},
            dataSource: [{
                key: '0',
                address: '128.105.166.23',
                content: '',
            },],
            count: 1,
            delDisable: true
        };
    }
    // 显示新增弹框
    showModal = (title, type) => {
        console.log(type)
        this.setState({ collectionData: { title: title, type: type, key: this.state.count }, visible: true });
    }
    //   弹框取消事件
    handleCancel = () => {
        this.setState({ visible: false });
    }

    //   弹框确认事件
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            const newData = [...this.state.dataSource];
            const index = newData.findIndex(item => values.key === item.key);
            console.log(index)
            if (index > -1) {
                let item = newData[index];
                newData.splice(index, 1, {
                    key: item.key,
                    type: types.find(i => i.key === values.type).value,
                    content: values.title
                });
                this.setState({ dataSource: newData });
            } else {
                const { count, dataSource } = this.state;
                this.setState({
                    dataSource: [...dataSource, { key: values.key, type: types.find(i => i.key === values.type).value, content: values.content }],
                    count: count + 1,
                })
            }
            form.resetFields();

            this.setState({ visible: false });

        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    //   删除
    handleDelete = (keys) => {
        let dataSource = [...this.state.dataSource];
        console.log(keys)
        keys.forEach(key => {
            dataSource = dataSource.filter(item => item.key !== key)
        })
        this.setState({ dataSource: dataSource });
    }
    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };
    handleChange = value => {
        console.log(`selected ${value}`);
        this.add();
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
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
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                selectedData.length = 0
                selectedData.push(...selectedRowKeys);
                if (selectedData.length == 1) {
                    this.setState({ isDisable: false, delDisable: false })
                } else if (selectedData.length == 0) {
                    this.setState({ delDisable: true })
                } else {
                    this.setState({ isDisable: true, delDisable: false })
                }
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.type === 'Disabled User', // Column configuration not to be checked
                type: record.type,
            }),
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                    ],
                })(<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return <div>
            <div className={cssObj.GroupTitle}>VP8600系列MCU</div>
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="点名后看自己"
                >
                    {getFieldDecorator('viewMyOwn', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="启用抗丢包"
                >
                    {getFieldDecorator('packetLossConcealment', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="广播后观看类型"
                >
                    {getFieldDecorator('videoDisplayed', {
                        initialValue: '1',
                    })(
                        <Select onChange={this.handleChange}>
                            <Option value="1">不变</Option>
                            <Option value="2">看自己</Option>
                            <Option value="3">看主席</Option>
                        </Select>
                    )}
                </FormItem>
                {formItems}
                <FormItem
                    {...formItemLayout}
                    label="恢复配置周期(分钟)"
                >
                    {getFieldDecorator('restorationFrequency ', {
                        initialValue: 10,
                        normalize: (e) => e ? parseInt(e) : '',
                        rules: [{
                            type: 'number', min: 3, max: 60, message: 'must be 3~60'
                        }, {
                            required: true, message: 'Please input your restorationFrequency '
                        },
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="提示音语种"
                >
                    {getFieldDecorator('IVRLanguage', {
                        initialValue: '1',
                    })(
                        <Select>
                            <Option value="1">英语</Option>
                            <Option value="2">非英语</Option>
                        </Select>
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>VP8600/VP9600/Cloud系列MCU</div>
                <FormItem
                    {...formItemLayout}
                    label="是否启用闭音控制"
                >
                    {getFieldDecorator('muteControl', {
                        initialValue: 1,
                    })(
                        <Select>
                            {muteArry.map(item => (
                                <Option key={item.value} value={item.value}>{item.bites}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>融合网关配置</div>
                <FormItem
                    {...formItemLayout}
                    label="启用融合网关"
                >
                    {getFieldDecorator('enableGateway', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>eSight配置</div>
                <FormItem
                    {...formItemLayout}
                    label="启用eSight"
                >
                    {getFieldDecorator('enableeSight', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>uPortal配置</div>
                <FormItem
                    {...formItemLayout}
                    label="启用uPortal"
                >
                    {getFieldDecorator('enableuPortal', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>证书验证策略</div>
                <FormItem
                    {...formItemLayout}
                    label="验证服务端证书"
                >
                    {getFieldDecorator('verifyServerCertificate', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="验证服务端证书的CN"
                >
                    {getFieldDecorator('verifyServerCertificateCN', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>自动恢复配置</div>
                <FormItem
                    {...formItemLayout}
                    label="启用可管理终端设备自动握手"
                >
                    {getFieldDecorator('enableAutomaticHandshake', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="启动自动恢复"
                >
                    {getFieldDecorator('enableAutomaticallyRestore', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="恢复配置周期(分钟)"
                >
                    {getFieldDecorator('restorationFrequency ', {
                        initialValue: 10,
                        normalize: (e) => e ? parseInt(e) : '',
                        rules: [{
                            type: 'number', min: 3, max: 60, message: 'must be 3~60'
                        }, {
                            required: true, message: 'Please input your restorationFrequency '
                        },
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>文件服务器</div>
                <FormItem
                    {...formItemLayout}
                    label="文件服务器地址(IPv4)"
                >
                    {getFieldDecorator(' IPv4', {
                        rules: [{
                            type: 'string',
                        }, {
                            required: true, message: 'Please input your IPv4 '
                        },
                            // { pattern: regExpConfig.SVC , message: ' 1~49 }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="文件服务器地址(IPv6)"
                >
                    {getFieldDecorator(' IPv6', {
                        rules: [{
                            type: 'string',
                        }, {
                            required: true, message: 'Please input your IPv4 '
                        },
                            // { pattern: regExpConfig.SVC , message: ' 1~49 }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>私网终端告警配置</div>
                <FormItem
                    {...formItemLayout}
                    label="Engine ID"
                >
                    {getFieldDecorator(' EngineID', {
                        initialValue: '800007DB040001',
                        rules: [{
                            type: 'string',
                        }, {
                            required: true, message: 'Please input your EngineID '
                        },
                            // { pattern: regExpConfig.SVC , message: ' 1~49 }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator(' userName', {
                        initialValue: 'trapinit',
                        rules: [{
                            type: 'string',
                        }, {
                            required: true, message: 'Please input your userName '
                        },
                            // { pattern: regExpConfig.SVC , message: ' 1~49 }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="认证协议"
                >
                    {getFieldDecorator('authenticationProtocol', {
                        initialValue: '2',
                    })(
                        <Select>
                            <Option value="1">MD5</Option>
                            <Option value="2">SHA</Option>
                            <Option value="3">None</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="认证密码"
                >
                    {getFieldDecorator('authenticationPassword', {
                        initialValue: "123456",
                        rules: [
                            { required: true, message: 'Please input your Password!' },
                            //   { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                        ],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="加密协议"
                >
                    {getFieldDecorator('encryptionProtocol', {
                        initialValue: '2',
                    })(
                        <Select>
                            <Option value="1">DES</Option>
                            <Option value="2">AES</Option>
                            <Option value="3">None</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="协议密码"
                >
                    {getFieldDecorator('encryptionPassword', {
                        initialValue: "123456",
                        rules: [
                            { required: true, message: 'Please input your Password!' },
                            //   { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                        ],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <div className={cssObj.GroupTitle}>SNMP通知消息接收地址</div>
                <div style={{ textAlign: "right" }}>
                    <Button onClick={() => {
                        this.showModal()
                    }}>添加 </Button>
                    <Button disabled={this.state.delDisable} onClick={() => {
                        if (selectedData.length > 0) {
                            this.handleDelete(selectedData)
                        } else {
                            console.log("请选择要删除的项")
                        }
                    }}>删除</Button>
                </div>
                <Table className={cssObj.tableScroll} rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource} pagination={false} size="small" />,
      <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    data={this.state.collectionData}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </Form>
            <div className={cssObj.ConfigOperateDiv}>
                <Button type="primary" size="small" onClick={this.handleSubmit} className={cssObj.saveButton}>
                    保存
          </Button>
                <Button type="primary" size="small" className={cssObj.cancleButton}>
                    取消
          </Button>
            </div>
        </div>
    }
}
DeviceConfig = Form.create()(DeviceConfig);
export default DeviceConfig
