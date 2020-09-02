import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <button className={this.props.jenisButton} onClick={this.props.func}>{this.props.children}</button>
        )
    }
}

export default Button