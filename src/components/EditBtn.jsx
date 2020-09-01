import React, { Component } from 'react';

class EditBtn extends Component {
    render() {
        return (
            <button className={this.props.jenisButton} onClick={this.props.funcEdit}>{this.props.children}</button>
        )
    }
}

export default EditBtn