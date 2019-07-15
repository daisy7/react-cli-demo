import React, { Component } from "react";
import { Checkbox, Row, Col, AutoComplete } from 'antd';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

class newFunc extends Component {
    state = {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
    };
    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    render() {
        return (
            <div>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <Checkbox.Group style={{ width: '50%' }} onChange={this.onChange} value={this.state.checkedList}>
                    <Row>{
                        plainOptions.map(el => {
                            return (
                                <Col span={8}>
                                    <Checkbox value={el}>{el}</Checkbox>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Checkbox.Group>
            </div>
        )
    }
}
export default newFunc