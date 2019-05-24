import React, { Component } from "react";
import Header from './Header'
import Bottom from './Bottom'
import cssObj from './Main.css'
import { Route, Link } from 'react-router-dom';

const Topic = ({ match }) => {
    return <div style={{width:"500px",height:"500px",textAlign:"center",lineHeight:"500px",background:'#'+match.params.background}}><h3 style={{color:"#fff"}}>莫兰迪色系</h3></div>
};
let match = ""
class Main extends Component {
    constructor(props) {
        super()
        this.state = {
        }
        match = props.match;
    }
    render() {
        return <div className={cssObj.Main}>
            <Header></Header>
            <Route path={`${match.url}/:background`} component={Topic}/>
            <Bottom></Bottom>
        </div>
    }
}
export default Main
