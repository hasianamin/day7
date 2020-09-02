import React, { Component } from 'react';

class ButtonCustom extends Component {
    render() {
        return (
            <button className={this.props.jenisButton} onClick={this.props.func}>{this.props.children}</button>
        )
    }
}

export default ButtonCustom