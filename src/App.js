import React, { Component } from 'react';
import Button from './components/Button';
import Screen from './components/Screen';
import Result from './components/Result';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="calculator">
          <Screen/>
          <Result/>

          <Button class="white" symbol="C" />
          <Button class="white" symbol="+/-" />
          <Button class="white" symbol="%" />
          <Button class="orange" symbol="/" />

          <Button class="white" symbol="7" />
          <Button class="white" symbol="8" />
          <Button class="white" symbol="9" />
          <Button class="orange" symbol="*" />


          <Button class="white" symbol="4" />
          <Button class="white" symbol="5" />
          <Button class="white" symbol="6" />
          <Button class="orange" symbol="-"/>

          <Button class="white" symbol="1" />
          <Button class="white" symbol="2" />
          <Button class="white" symbol="3" />
          <Button class="orange" symbol="+"/>

          <Button class="white zero" symbol="0" />
          <Button class="white" symbol="." />
          <Button class="orange" symbol="="/>

        </div>

    );
  }
}

export default App;
