// 共享组织
import React, { Component } from 'react';
import { Form, Switch, Button, Tree } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const { TreeNode } = Tree;
const ShareNode = Form.create()(
    class extends Component {
        constructor() {
            super();
            this.state = {
                treeData: this.convert([
                    { oriName: 'VC', uuid: '0', oriList: ["VC1", "VC2"] },
                    { oriName: 'AD', uuid: '1', oriList: ["AD1", "AD2"] },
                    { oriName: 'Tree Node', uuid: '2', oriList: [] },
                ]),
                expandedKeys: []
            };
        }
        convert = datas => {
            let newDatas = [];
            datas.forEach(e => {
                newDatas.push({ title: e.oriName, key: e.uuid, isLeaf: e.oriList.length <= 0 })
            });
            return newDatas;
        }
        // onLoadData = treeNode =>
        //     new Promise(resolve => {
        //         if (treeNode.props.children) {
        //             resolve();
        //             return;
        //         }
        //         setTimeout(() => {
        //             treeNode.props.dataRef.children = this.convert([
        //                 { oriName: 'Child Node', uuid: `${treeNode.props.eventKey}-0`,oriList:[] },
        //                 { oriName: 'Child Node', uuid: `${treeNode.props.eventKey}-1`,oriList:[] },
        //             ]);
        //             this.setState({
        //                 treeData: [...this.state.treeData],
        //             });
        //             resolve();
        //         }, 1000);
        //     });
        onLoadData = (key, treeNode) => {
            return new Promise(resolve => {
                let { node } = treeNode;
                this.setState({
                    treeNode: node.props.dataRef

                });
                this.setState({
                    expandedKeys: [...this.state.expandedKeys.indexOf(node.props.eventKey) > -1 ? this.state.expandedKeys.splice(this.state.expandedKeys.indexOf(node.props.eventKey), 1) && this.state.expandedKeys : this.state.expandedKeys.push(node.props.eventKey) && this.state.expandedKeys]
                });
                if (node.props.children) {
                    resolve();
                    return;
                }
                setTimeout(() => {
                    node.props.dataRef.children=[...this.convert([
                        { oriName: 'Child Node', uuid: `${node.props.eventKey}-0`, oriList: [] },
                        { oriName: 'Child Node', uuid: `${node.props.eventKey}-1`, oriList: [] },
                    ])];
                    this.setState({
                        treeData: [...this.state.treeData],
                    });
                    resolve();
                }, 1000);
            });
        };
        renderTreeNodes = data =>
            data.map(item => {
                if (item.children) {
                    return (
                        <TreeNode title={item.title} key={item.key} dataRef={item}>
                            {this.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} {...item} dataRef={item} />;
            });
        render() {
            const { getFieldDecorator } = this.props.form;
            const { intl } = this.props;
            return (
                <div >
                    <Form>
                        <div >
                            <FormItem
                                label={intl.formatMessage({ id: 'EUA_RestrictQuery' })}
                                colon={false}
                            >
                                {getFieldDecorator('limitSearch', {
                                })(
                                    <Switch onChange={this.onChange} defaultChecked />
                                )}

                            </FormItem>
                            <span><FormattedMessage id="EUA_RestrictQueryTip" /></span>
                        </div>
                        <div >
                            <Tree showLine checkable onExpand={this.onLoadData} expandedKeys={this.state.expandedKeys}
                                onSelect={this.onLoadData}>{this.renderTreeNodes(this.state.treeData)}</Tree>;
                        </div>
                        <div>
                            <div >
                                <Button type="primary" ><FormattedMessage id="Save" /></Button>
                                <Button><FormattedMessage id="Cancel" /></Button>
                            </div>
                        </div>
                    </Form>
                </div>
            );
        }
    }
);

export default injectIntl(ShareNode);
