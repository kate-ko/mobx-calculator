import React, { Component } from 'react';
import '../App.css';


class Button extends Component {
  render() {
    return (
          <div className={this.props.class}>{this.props.symbol}</div>
    );
  }
}

export default Button;