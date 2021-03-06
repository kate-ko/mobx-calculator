import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../App.css';

@inject("store")

@observer
class Screen extends Component {
  render() {
    return (
          <div className="screen"> {this.props.store.screen} </div>
    );
  }
}

export default Screen;
