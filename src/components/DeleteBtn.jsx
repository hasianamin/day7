import React, { Component } from 'react';

class DeleteBtn extends Component {
    render() {
        return(
            <button className={this.props.jenisButton} onClick={this.props.funcDelete}>{this.props.children}</button>
        )
    }
}

export default DeleteBtn