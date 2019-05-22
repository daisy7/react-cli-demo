import React, { Component } from "react";
import Header from './Header'
import cssObj from './Main.css'
class Main extends Component {
    render(){
        return <div className={cssObj.Main}>
        <Header></Header>
        </div>
    }
}
export default Main
