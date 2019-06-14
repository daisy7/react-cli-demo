import React, { Component } from "react";
import cssObj from './Conference.css'
import { Form, Input, Slider, Select, Checkbox, Table, Modal, Radio } from 'antd';
import { regExpConfig } from '@/config/Reg.confing'
import intl, { SUPPOER_LOCALES } from '@/config/i18n'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, data } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item>
                            {getFieldDecorator('key', {
                                initialValue: data.key,
                            })(<Input hidden/>)}
                        </Form.Item>
                        <Form.Item label="name">
                            {getFieldDecorator('name', {
                                initialValue: data.name,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="age">
                            {getFieldDecorator('age', {
                                initialValue: data.age,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input type="text" />)}
                        </Form.Item>
                        <Form.Item label="address">
                            {getFieldDecorator('address', {
                                initialValue: data.address,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input type="text" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);
const marks = {
    0: '不灵敏',
    100: {
        style: {
            color: '#f50',
        },
        label: '灵敏',
    },
}
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
class Conference extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
            { title: 'Action', key: 'operation', render: (text, record) => <a href="javascript:;" onClick={() => this.showModal(record.key)}>edit</a> },
        ];
    }
    state = {
        data:  [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '4',
                name: 'Disabled User',
                age: 99,
                address: 'Sidney No. 1 Lake Park',
            },
        ],
        visible: false,
        collectionData:{}
    }
    showModal = (key) => {
        console.log(key)
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
            this.setState({ collectionData: newData[index], visible: true });
        } else {
            console.log(index)
        }
        console.log(this.state)
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            let newData = [...this.state.data];
            const index = newData.findIndex(item => values.key === item.key);
            console.log(index)
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                  ...item,
                  ...values,
                });
                this.setState({ data: newData});
              } else {
                newData.push(values);
                this.setState({ data: newData});
              }
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const { getFieldDecorator } = this.props.form;
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

        return <div className={cssObj.scrollDiv}>
            <div className={cssObj.GroupTitle}>会议参数</div>
            <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.data} />,
            <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                data={this.state.collectionData}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
            />
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="默认会议名称"
                >
                    {getFieldDecorator('name', {
                        initialValue: 'Conference',
                        rules: [{
                            type: 'name', message: 'The input is not valid name!',
                        }, {
                            required: true, message: 'Please input your name',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="默认会议名称后缀"
                >
                    {getFieldDecorator('namelast', {
                        initialValue: '1',
                    })(
                        <Select>
                            <Option value="1">当前时区格式</Option>
                            <Option value="2">随机数</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="优先启用视频会议类型"
                >
                    {getFieldDecorator('type', {
                        initialValue: '1',
                    })(
                        <Select >
                            <Option value="1">全适配会议</Option>
                            <Option value="2">SVC会议</Option>
                            <Option value="3">全交换会议</Option>

                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最大会议时长(分钟)"
                >
                    {getFieldDecorator('maxtime', {
                        initialValue: '1440',
                        rules: [{
                            type: 'number', message: 'The input is not valid maxtime!',
                        }, {
                            required: true, message: 'Please input your maxtime'
                        },
                            // { pattern: regExpConfig.maxtime, message: '360~9999' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最小会议时长(分钟)"
                >
                    {getFieldDecorator('mintime', {
                        initialValue: '1',
                        rules: [{
                            type: 'number', message: 'The input is not valid mintime!',
                        }, {
                            required: true, message: 'Please input your mintime'
                        },
                            // { pattern: regExpConfig.mintime, message: '1~360' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最大延长会议时长(分钟)"
                >
                    {getFieldDecorator('maxtimeLay', {
                        initialValue: '360',
                        rules: [{
                            type: 'number', message: 'The input is not valid maxtimeLay!',
                        }, {
                            required: true, message: 'Please input your maxtimeLay'
                        },
                            // { pattern: regExpConfig.maxtimeLay, message: '360~9999' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最小延长会议时长(分钟)"
                >
                    {getFieldDecorator('maxtimeLay', {
                        initialValue: '10',
                        rules: [{
                            type: 'number', message: 'The input is not valid mintimeLay!',
                        }, {
                            required: true, message: 'Please input your mintimeLay'
                        },
                            // { pattern: regExpConfig.mintimeLay, message: '10~360' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="启用普通会议自动延长"
                >
                    {getFieldDecorator('autotimeLay', {
                    })(
                        <Checkbox checked={true} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="会议自动延长最大时长(分钟)"
                >
                    {getFieldDecorator('automaxtimeLay', {
                        initialValue: '60',
                        rules: [{
                            type: 'number', message: 'The input is not valid automaxtimeLay!',
                        }, {
                            required: true, message: 'Please input your automaxtimeLay'
                        },
                            // { pattern: regExpConfig.automaxtimeLay, message: '60~99999' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="预约会议默认时长(分钟)"
                >
                    {getFieldDecorator('defulttime', {
                        initialValue: '120',
                        rules: [{
                            type: 'number', message: 'The input is not valid defulttime!',
                        }, {
                            required: true, message: 'Please input your defulttime'
                        },
                            // { pattern: regExpConfig.defulttime, message: '20~360' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="主叫会场不入会等待时间(分钟)"
                >
                    {getFieldDecorator('ownwaitingtime', {
                        initialValue: '10',
                        rules: [{
                            type: 'number', message: 'The input is not valid ownwaitingtime!',
                        }, {
                            required: true, message: 'Please input your ownwaitingtime'
                        },
                            // { pattern: regExpConfig.ownwaitingtime, message: '1~750' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所有会场不入会等待时间(分钟)"
                >
                    {getFieldDecorator('allwaitingtime', {
                        initialValue: '1',
                        rules: [{
                            type: 'number', message: 'The input is not valid allwaitingtime!',
                        }, {
                            required: true, message: 'Please input your allwaitingtime'
                        },
                            // { pattern: regExpConfig.allwaitingtime, message: '1~750' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所有会场离会后会议结束时间(分钟)"
                >
                    {getFieldDecorator('endtime', {
                        initialValue: '1',
                        rules: [{
                            type: 'endtime', message: 'The input is not valid endtime!',
                        }, {
                            required: true, message: 'Please input your endtime'
                        },
                            // { pattern: regExpConfig.endtime, message: '1~750' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所有会场离会后会议结束时间(分钟)"
                >
                    {getFieldDecorator('endtime', {
                        initialValue: '1',
                        rules: [{
                            type: 'number', message: 'The input is not valid endtime!',
                        }, {
                            required: true, message: 'Please input your endtime'
                        },
                            // { pattern: regExpConfig.endtime, message: '1~750' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="启动会议重试次数"
                >
                    {getFieldDecorator('restarttimes', {
                        initialValue: '3',
                        rules: [{
                            type: 'restarttimes', message: 'The input is not valid restarttimes!',
                        }, {
                            required: true, message: 'Please input your restarttimes'
                        },
                            // { pattern: regExpConfig.restarttimes, message: '1~30' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="结束会议重试次数"
                >
                    {getFieldDecorator('endretrytimes', {
                        initialValue: '3',
                        rules: [{
                            type: 'number', message: 'The input is not valid endretrytimes!',
                        }, {
                            required: true, message: 'Please input your endretrytimes'
                        },
                            // { pattern: regExpConfig.endretrytimes, message: '1~30' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="会控超时时间(秒)"
                >
                    {getFieldDecorator('timeout', {
                        initialValue: '35',
                        rules: [{
                            type: 'number ', message: 'The input is not valid timeout !',
                        }, {
                            required: true, message: 'Please input your timeout '
                        },
                            // { pattern: regExpConfig.timeout , message: '5~120' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="单个会议最大会场个数"
                    help="Should be 128~3000 "
                >
                    {getFieldDecorator('maxmeeting', {
                        initialValue: '2000',
                        rules: [{
                            type: 'number ', message: 'The input is not valid maxmeeting !',
                        }, {
                            required: true, message: 'Please input your maxmeeting '
                        },
                            // { pattern: regExpConfig.maxmeeting , message: '128~3000' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="多级子会议最大个数"
                    help="Should be 2~40"
                >
                    {getFieldDecorator('sub-conferencesmax', {
                        initialValue: '40',
                        rules: [{
                            type: 'number ', message: 'The input is not valid sub-conferencesmax !',
                        }, {
                            required: true, message: 'Please input your sub-conferencesmax '
                        },
                            // { pattern: regExpConfig.sub-conferencesmax , message: '2~40' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="单个周期会议的最大会议数"
                    help="Should be 1~100"
                >
                    {getFieldDecorator('signle-conferencesmax', {
                        initialValue: '30',
                        rules: [{
                            type: 'string', whitespace: true, message: 'The input is not valid maxmeeting !',
                        }, {
                            required: true, message: 'Please input your maxmeeting '
                        },
                            // { pattern: regExpConfig.maxmeeting , message: ' 1~100' }
                        ],
                        getValueFromEvent: (event) => {
                            return event.target.value.replace(/\D/g, '')
                        },
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="持续呼叫时间(分钟)"
                    help="Should be 1~120"
                >
                    {getFieldDecorator('lasttime', {
                        initialValue: '5',
                        rules: [{
                            type: 'number', whitespace: true, message: 'The input is not valid lasttime !',
                        }, {
                            required: true, message: 'Please input your lasttime '
                        },
                            // { pattern: regExpConfig.lasttime , message: ' 1~100' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="呼叫间隔(秒)"
                    help="Should be 2~1000"
                >
                    {getFieldDecorator('spacetime', {
                        initialValue: '30',
                        rules: [{
                            type: 'number', whitespace: true, message: 'The input is not valid ConferenceSwitch !',
                        }, {
                            required: true, message: 'Please input your ConferenceSwitch '
                        },
                            // { pattern: regExpConfig.ConferenceSwitch , message: ' 15~50' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="默认匿名级联通道数"
                    help="Should be 0~32"
                >
                    {getFieldDecorator('Defaultchannels', {
                        initialValue: '0',
                        rules: [{
                            type: 'number', whitespace: true, message: 'The input is not valid spacetime !',
                        }, {
                            required: true, message: 'Please input your spacetime '
                        },
                            // { pattern: regExpConfig.spacetime , message: ' 15~50' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="主叫呼集加密类型"
                >
                    {getFieldDecorator('SiteCall encryption', {
                        initialValue: '1',
                    })(
                        <Select>
                            <Option value="1">强制加密</Option>
                            <Option value="2">自动加密</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="主叫呼集默认语言"
                >
                    {getFieldDecorator('Default language', {
                        initialValue: 'en-US',
                    })(
                        <Select>
                            {SUPPOER_LOCALES.map(locale => (
                                <Option key={locale.value} value={locale.value}>{locale.name}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="锁定会议演示"
                >
                    {getFieldDecorator('lockConference', {
                    })(
                        <Checkbox checked={false} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="TP会场观看远端默认在"
                >
                    {getFieldDecorator('screenSelect', {
                        initialValue: '3',
                    })(
                        <Select>
                            <Option value="1">左屏</Option>
                            <Option value="2">主屏</Option>
                            <Option value="3">右屏</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="禁止离线重呼规则"
                    help="只允许输入数字、字母、“：”、“.”、“@”、“*”，并以英文“，”隔开"
                >
                    {getFieldDecorator('recallProhibition', {
                        initialValue: '8*,4*,',
                        rules: [{
                            type: 'number', whitespace: true, message: 'The input is not valid recall prohibition !',
                        }, {
                            required: true, message: 'Please input your recall prohibition '
                        },
                            // { pattern: regExpConfig.recall prohibition , message: ' 15~50' }
                        ],
                    })(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="声控切换阈值"
                >{getFieldDecorator('vioce', {
                    initialValue: 37,
                    rules: [{ type: 'number', }]
                })(
                    <Slider marks={marks} />
                )}
                </FormItem>
                <FormItem style={{ marginLeft: '10px' }}
                    {...formItemLayout}
                    label="超过声控切换与会方阈值,关闭声控切换"
                >
                    {getFieldDecorator('vioceSwitch', {
                    })(
                        <Checkbox checked={true} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="声控切换与会方阈值"
                >
                    {getFieldDecorator('ConferenceSwitch', {
                        initialValue: 30,
                        normalize: (e) => e ? parseInt(e) : '',
                        rules: [
                            { required: true, message: 'Please input your ConferenceSwitch ' },
                            { type: 'number', min: 15, max: 50, message: 'must be 15~50' },
                            // { pattern: regExpConfig.ConferenceSwitch, message: ' 15~50' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        </div>
    }
}
Conference = Form.create()(Conference);
export default Conference