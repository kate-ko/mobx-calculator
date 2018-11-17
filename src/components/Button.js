import React, { Component } from 'react';
import '../App.css';
import { inject } from 'mobx-react';

@inject("store")

class Button extends Component {
  render() {
    return (
      <div className={"button " + this.props.class}
        onClick={() => this.props.store.clickButton(this.props.symbol)}>
        {this.props.symbol}
      </div>
    );
  }
}

export default Button;