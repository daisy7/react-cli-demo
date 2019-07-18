import React, { Component } from "react";
import { Tabs, Button, Table, Modal, Form, Input } from 'antd';
import cssObj from './ServiceAreas.css'
const FormItem = Form.Item;
const { TextArea } = Input;
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
                    title="添加服务区"
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
                        <FormItem label="服务区名称">
                            {getFieldDecorator('serveName', {
                                initialValue: data.serveName,
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="服务区备注">
                            {getFieldDecorator('remark', {
                                initialValue: data.remark,
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
class ServiceAreas extends Component {
    constructor() {
        super()
        this.columns = [{
            title: '服务区名称',
            dataIndex: 'serveName',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '服务区备注',
            dataIndex: 'remark',
        }];
        this.state = {
            visible: false,
            collectionData: {},
            dataSource: [{
                key: 0,
                serveName: 'A省',
                remark: '',
            },],
            count: 1,
            isDisable: true,
            delDisable: true,
            selectKey: 0
        };
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
            console.log('Received values of form: ', values);
            const newData = [...this.state.dataSource];
            console.log(newData)
            const index = newData.findIndex(item => values.key === item.key);

            console.log(index)
            console.log(newData[index])
            if (index > -1) {
                let item = newData[index];
                newData.splice(index, 1, {
                    key: item.key,
                    serveName: item.serveName,
                    remark: item.remark
                });
                this.setState({ dataSource: newData });
            } else {
                const { count, dataSource } = this.state;
                this.setState({
                    dataSource: [...dataSource, { key: values.key, serveName: values.serveName, remark: values.remark }],
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
    showModal = () => {
        this.setState({ collectionData: { serveName: '', remark: '', key: this.state.count }, visible: true });
    }
    onClickRow = (record) => {
        return {
            onClick: () => {
                if (record.key > -1) {
                    this.setState({ delDisable: false, isDisable: false, selectKey: record.key });
                }
            },
        };
    }
    croShowModal = () => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => this.state.selectKey === item.key);
        this.setState({ collectionData: newData[index], visible: true });
    }
    render() {
        return <div>
            <div className={cssObj.GroupTitle}>
                <div className={cssObj.buttonDiv}>
                    <Button size='small' onClick={() => {
                        this.showModal()
                    }}>添加服务区</Button>
                    <Button size='small' disabled={this.state.isDisable} onClick={() => { this.croShowModal() }}>修改服务区</Button>
                    <Button size='small' disabled={this.state.delDisable}>删除服务区</Button>
                    <Button size='small'>SBC管理</Button>
                </div>
            </div>
            <Table className={cssObj.tableScroll} columns={this.columns} dataSource={this.state.dataSource} onRow={this.onClickRow} pagination={false} size="small" />
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
export default ServiceAreas
