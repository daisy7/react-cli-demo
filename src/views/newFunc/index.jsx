import React, { Component } from "react";
import { Checkbox, Row, Col, AutoComplete } from 'antd';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const plainOptions1 = ['A', 'B', 'C'];

class newFunc extends Component {
    state = {
        checkedList: ['Apple', 'Orange'],
        checkedList1: ['A'],
        indeterminate: true,
        indeterminate1: true,
        checkAll: false,
        checkAll1: false,
    };
    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };
    onChange1 = checkedList1 => {
        this.setState({
            checkedList1,
            indeterminate1: !!checkedList1.length && checkedList1.length < plainOptions1.length,
            checkAll1: checkedList1.length === plainOptions1.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    onCheckAllChange1 = e => {
        this.setState({
            checkedList1: e.target.checked ? plainOptions1 : [],
            indeterminate1: false,
            checkAll1: e.target.checked,
        });
    };
    onCheckAllChange3 = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            checkedList1: e.target.checked ? plainOptions1 : [],
            indeterminate: false,
            indeterminate1: false,
            checkAll: e.target.checked,
            checkAll1: e.target.checked,
        });
    };
    render() {
        return (
            <div>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate || this.state.indeterminate1 || (this.state.checkAll || this.state.checkAll1) && !(this.state.checkAll && this.state.checkAll1)}
                        onChange={this.onCheckAllChange3}
                        checked={this.state.checkAll && this.state.checkAll1}
                    >
                        Check all all
                    </Checkbox>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                    <div style={{ borderBottom: '1px solid #E9E9E9', width: '40%' }}>
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            Check all
                    </Checkbox>
                        <Checkbox.Group onChange={this.onChange} value={this.state.checkedList}>
                            <Row>{
                                plainOptions.map(el => {
                                    return (
                                        <Col key={el}>
                                            <Checkbox value={el}>{el}</Checkbox>
                                        </Col>
                                    )
                                })
                            }
                            </Row>
                        </Checkbox.Group>
                    </div>
                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                            indeterminate={this.state.indeterminate1}
                            onChange={this.onCheckAllChange1}
                            checked={this.state.checkAll1}
                        >
                            Check all
                    </Checkbox>
                        <Checkbox.Group onChange={this.onChange1} value={this.state.checkedList1}>
                            <Row>{
                                plainOptions1.map(el => {
                                    return (
                                        <Col key={el}>
                                            <Checkbox value={el}>{el}</Checkbox>
                                        </Col>
                                    )
                                })
                            }
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
            </div >
        )
    }
}
export default newFunc