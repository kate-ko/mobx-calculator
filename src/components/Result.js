import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../App.css';

@inject("store")

@observer
class Result extends Component {
  render() {
    return (
          <div className="result"> {this.props.store.result} </div>
    );
  }
}

export default Result;
