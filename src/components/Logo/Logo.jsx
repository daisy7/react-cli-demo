import React from "react";
import cssObj from "./Logo.css";

class Logo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className={[cssObj.logoImg, cssObj.logoStyle].join(' ')} style={{ width: this.props.width,height:this.props.height }} ></div>
            </div>
        )
    }
}

export default Logo
