import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { Radio, DatePicker } from 'antd';
import cssObj from './McuResouce.css';
// import {zh_CN_Device} from '@/locale/zh_CN';
// import {en_US_Device} from '@/locale/en_US';
import { setLocale } from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
function range(start, end, unit) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i + unit);
    }
    return result;
}
let Body = [{ 'videoResourceUsage': 0.1, 'audioResourceUsage': 3.0, 'time': '2019-10-16 09:25:00.0' }, { 'videoResourceUsage': 0.3, 'audioResourceUsage': 0.0, 'time': '2019-10-16 09:40:00.0' }, { 'videoResourceUsage': 0.3, 'audioResourceUsage': 0.0, 'time': '2019-10-16 09:55:00.0' }];

function mock(count) {
    let result = [];
    let time = new Date('2019-10-16 09:55:00.0');
    // let time = new Date();
    for (let i = 0; i < count; i++) {
        result.push({
            'videoResourceUsage': Math.random(), 'audioResourceUsage': Math.random(), 'time': (new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes() + i * 15).toUTCString())
        });
    }
    return result;
}
class McuResouce extends Component {
    constructor(props) {
        super(props);
        // setLocale('zh-CN', zh_CN_Device);
        // setLocale('en-US', en_US_Device);
        this.state = {
            // id:props.location.state.id,
            xType: 'days',
            datas: [],
            hasData: true,
            emptyData: true
        };
    }
    componentWillMount() {//渲染前调用
        this.getMcuResource('SORT_BY_DAY');
    }
    getMcuResource = (type) => {
        let statusCodeSuccess = 200;
        let dataCnt = 193;
        this.setState({
            datas: mock(dataCnt)
        });
        // let resouceCallback = res => {
        //     console.log(res);
        //     if(res.data === '') {
        //         this.setState({
        //             emptyData:true
        //         });
        //     }
        //     if (res.status !== statusCodeSuccess) {
        //         console.log('请求失败');
        //         this.setState({
        //             hasData:true
        //         });
        //     } else {
        //         console.log('请求成功');
        //         console.log(res.data);
        //         this.setState({
        //             datas: res.data,
        //             hasData:true
        //         });
        //     }
        // };
        // let data = { id:this.state.id, sortType: type };
        // csm.registOpCallback('queryResource', resouceCallback);
        // csm.queryResource(data);
    }
    getTest() {
        const option = {
            title: {
                text: '视频资源利用率'
            },
            lineStyle: {
                normal: {
                    // color: '#0D94FF',
                    // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#0D94FF' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#68BCFF' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 4
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    let date = new Date(params[0].value[0]);
                    let data = date.getFullYear() + '-'
                        + (date.getMonth() + 1) + '-'
                        + date.getDate() + ' '
                        + date.getHours() + ':'
                        + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
                    return '利用率：' +  params[0].value[1] + '% <br/> 日期：' + data;
                },
                textStyle:{color:'#333'},
                backgroundColor:'rgba(255,255,255,1)',
                axisPointer:{
                    type:'line',
                    axis:'x'
                }
            },
            dataZoom: [{
                startValue:this.state.datas ? new Date(this.state.datas[0]['time']) : ''
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
                show:false,
                pieces: [{
                    gt: 80,
                    lte: 100,
                    color: '#FA7A4D'
                }],
                outOfRange: {
                    color: '#0D94FF'
                }
            },
            xAxis: [
                {
                    type: 'time',
                    splitNumber: 20,
                    interval:3600 * 4 * 1000,
                    splitLine: {
                        show: false
                    }
                }],
            yAxis: [{
                type: 'value',
                scale: true,
                max: 100,
                min: 0,
                splitNumber: 5,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}%'
                }
            }],
            series: [
                {
                    name: '利用率',
                    type: 'line',
                    // showSymbol:false,
                    showAllSymbol: true,
                    symbolSize: 1 | 2,
                    smooth: false, //true 为平滑曲线，false为直线
                    hoverAnimation:true,
                    data: (() => {
                        switch (this.state.xType) {
                        case 'days': return (() => {
                            let result = [];
                            this.state.datas.forEach(element => {
                                if(element.videoResourceUsage === 'NaN') {
                                    element.videoResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), element.videoResourceUsage.toFixed(2) * 100]);
                            });
                       
                            return result;
                        })();
                        case 'weeks': return (() => {
                            const result = [];
                            this.state.datas.forEach(element => {
                                if(element.videoResourceUsage === 'NaN') {
                                    element.videoResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), element.videoResourceUsage.toFixed(2) * 100]);
                            });
                            return result;
                        })();
                        case 'months': return (() => {
                            const result = [];
                            this.state.datas.forEach(element => {
                                if(element.videoResourceUsage === 'NaN') {
                                    element.videoResourceUsage = 0;
                                }
                                result.push([new Date(element['time']), element.videoResourceUsage.toFixed(2) * 100]);
                            });
                            return result;
                        })();
                        default:
                            console.log(`no matched xType ${this.state.xType}`);
                        }
                    })(),
                   
                    markLine: {
                        silent: true,
                        data: [ {
                            yAxis:80,
                            color:'#FA7A4D'
                        }]
                    },
                 
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(51,164,253,1)' //同一个红色，透明度0.12
                                }, {
                                    offset: 1,
                                    color: 'rgba(255,255,255,0.28)' //同一个红色，透明度0
                                }],
                                globalCoord: false
                            }
                        }
                    }
                }
            ]
        };
        return option;
    }
    getOptionH264() {
        const option = {
            title: {
                subtext: '视频资源利用率'
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255,255,255,0.8)', //通过设置rgba调节背景颜色与透明度
                color: 'black',
                borderWidth: '1',
                borderColor: 'gray',
                textStyle: {
                    color: 'black'
                }
            },

            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: (() => {
                    switch (this.state.xType) {
                    case 'days': return (() => {
                        let result = [];
                        let time = new Date();
                        for (let i = 0; i < 48 / 4; i++) {
                            result.push(time.getMonth() + 1 + '月' + time.getDate() + '日' + time.getHours() + '点');
                            time.setHours(time.getHours() + 4);
                        }
                        return result;
                    })();
                    case 'weeks': return (() => {
                        const result = [];
                        let date = new Date();
                        for (let i = 0; i < 14; i++) {
                            result.push(date.getMonth() + 1 + '月' + date.getDate() + '日');
                            date.setDate(date.getDate() + 1);
                        }
                        return result;
                    })();
                    case 'months': return (() => {
                        const result = [];
                        let date = new Date();
                        let days = new Date(date.getFullYear(), date.getMonth(), 0).getDate() + new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                        for (let i = 0; i < days / 3; i++) {
                            result.push(date.getMonth() + 1 + '月' + date.getDate() + '日');
                            date.setDate(date.getDate() + 3);
                        }
                        return result;
                    })();
                    default:
                        console.log(`no matched xType ${this.state.xType}`);
                    }
                })()
            },
            yAxis: {
                type: 'value',
                scale: true,
                max: 100,
                min: 0,
                splitNumber: 5,
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            series: [
                {
                    name: '利用率',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: this.state.data1.map((i) => {
                        return i['videoResourceUsage'];
                    }),
                    // data: this.state.data1.map((i) => {
                    //     return Math.ceil(i['usedResource'].h264Resource / i['totalResource'].h264Resource * 100);
                    // }),
                    lineStyle: {
                        normal: {
                            // color: '#0D94FF',
                            // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#0D94FF' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#68BCFF' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            width: 4
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            color: 'blue'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                position: 'outer',
                                color: '#000000'//hover拐点颜色定义
                            },

                            labelLine: {
                                show: true,
                                lineStyle: {
                                    color: 'red'
                                }
                            }
                        }
                    },

                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]
        };
        return option;
    }

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    disabledRangeTime = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => range(0, 60).splice(4, 20),
                disabledMinutes: () => range(30, 60),
                disabledSeconds: () => [55, 56]
            };
        }
        return {
            disabledHours: () => range(0, 60).splice(20, 4),
            disabledMinutes: () => range(0, 31),
            disabledSeconds: () => [55, 56]
        };
    }
    handleTimeChange = (e) => {
        let type = '';
        switch (e.target.value) {
        case 'days': type = 'SORT_BY_DAY';
            break;
        case 'weeks': type = 'SORT_BY_WEEK';
            break;
        case 'months': type = 'SORT_BY_MONTH';
            break;
        default: console.log(`no matched type: ${e.target.value}`);
        }
        // this.getMcuResource(type);
        this.setState({
            xType: e.target.value
        });
    }
    render() {
        return (
            !this.state.hasData ? (!this.state.emptyData ?
                <div style={{ margin: 'auto', textAlign: 'center', marginTop: '15%' }}>
                    <h2><FormattedMessage id="MCU_Loading" /></h2></div> :
                <div style={{ margin: 'auto', textAlign: 'center', marginTop: '15%' }}>
                    <h2>资源还未上报，请先上报资源</h2></div>) :
                (<div>
                    <div className={cssObj.title}>
                        <span style={{ color: '#333333', fontSize: '14px', marginRight: 25 }}>统计时段</span>
                        <RadioGroup value={this.state.timeSlot} >
                            {/* onChange={this.onTimeSlotChange} */}
                            <Radio value={1}>昨天</Radio>
                            <Radio value={2}>最近7天</Radio>
                            <Radio value={3}>最近30天</Radio>
                            <Radio value={4}>自定义时间
                                <RangePicker
                                    style={{ marginLeft: 20 }}
                                    disabledDate={this.disabledDate}
                                    disabledTime={this.disabledRangeTime}
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
                                    }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                /></Radio>
                        </RadioGroup>
                    </div>
                    <div className={cssObj.btnGroup}>
                        <Radio.Group defaultValue={this.state.xType} onChange={this.handleTimeChange} buttonStyle="solid">
                            <Radio.Button value="days">按天</Radio.Button>
                            <Radio.Button value="weeks">按周</Radio.Button>
                            <Radio.Button value="months">按月</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div>
                        <ReactEcharts
                            option={this.getTest()}
                            style={{ height: '425px', width: '1300px' }}
                            className="react_for_echarts"
                        />
                    </div>
                </div>)
        );
    }
}
export default McuResouce;
