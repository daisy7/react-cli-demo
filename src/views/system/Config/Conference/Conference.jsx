import React, { Component } from "react";
import { Button, Modal, Form, Input, Table, Menu, Dropdown, Icon } from 'antd';
import { guid } from '@/tools/commons'
const FormItem = Form.Item;
const { TextArea } = Input;

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, data } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    centered
                    title={data.title}
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
                        <FormItem>
                            {getFieldDecorator('type', {
                                initialValue: data.type,
                            })(<Input hidden />)}
                        </FormItem>
                        <FormItem label="内容">
                            {getFieldDecorator('content', {
                                initialValue: data.content,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
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
const types = [
    { key: "1", value: "横幅" },
    { key: "2", value: "字幕" },
    { key: "3", value: "短消息" }
]
const menu = (
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
class Conference extends Component {
    constructor(props) {
        super(props)
        this.columns = [{
            title: '类型',
            dataIndex: 'type',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '内容',
            dataIndex: 'content',
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: text => {
                return <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                        Hover me <Icon type="down" />
                    </a>
                </Dropdown>
            }
        }];
        this.state = {
            visible: false,
            collectionData: {},
            dataSource: [{
                key: '0',
                type: '横幅',
                content: 32,
            }, {
                key: '1',
                type: '横幅',
                content: 42,
            },],
            count: 2,
            isDisable: true,
            delDisable: true
        };
    }

    menu = (
        <Menu onClick={e => this.handleMenuClick(e)}>
            {
                types.map(i => {
                    return <Menu.Item key={i.key}>添加{i.value}</Menu.Item>
                })
            }
        </Menu>
    );

    showModal = (title, type) => {
        this.setState({ collectionData: { title: title, type: type, key: guid() }, visible: true });
    }
    croShowModal = (key) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => key === item.key);
        this.setState({ collectionData: newData[index], visible: true });
    }
    handleMenuClick = e => {
        this.showModal(e.item.props.children, e.key)
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const newData = [...this.state.dataSource];
            const index = newData.findIndex(item => values.key === item.key);
            if (index > -1) {
                let item = newData[index];
                newData.splice(index, 1, {
                    key: item.key,
                    type: types.find(i => i.key === values.type).value,
                    content: values.content
                });
                this.setState({ dataSource: newData });
            } else {
                const { count, dataSource } = this.state;
                this.setState({
                    dataSource: [...dataSource, { key: values.key, type: types.find(i => i.key === values.type).value, content: values.content }],
                    count: count + 1,
                });
            }
            form.resetFields();
            this.setState({ visible: false });

        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    handleDelete = (keys) => {
        let dataSource = [...this.state.dataSource];
        keys.forEach(key => {
            dataSource = dataSource.filter(item => item.key !== key)
        })
        this.setState({ dataSource: dataSource });
    }
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }
    render() {
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
            },
            getCheckboxProps: record => ({
                disabled: record.type === 'Disabled User', // Column configuration not to be checked
                type: record.type,
            }),
        };
        return <div>
            <Dropdown overlay={this.menu}>
                <Button>添加<Icon type="down" /></Button>
            </Dropdown>
            <Button disabled={this.state.isDisable} onClick={() => {
                if (selectedData.length == 1) {
                    this.croShowModal(selectedData[0])
                }
            }}>修改</Button>
            <Button disabled={this.state.delDisable} onClick={() => {
                if (selectedData.length > 0) {
                    this.handleDelete(selectedData)
                } else {
                    console.log("请选择要删除的项")
                }
            }}>删除</Button>
            <Table rowSelection={rowSelection} columns={this.columns} dataSource={this.state.dataSource} />,
      <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                data={this.state.collectionData}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
            />
        </div>
    }
}
export default Conference
