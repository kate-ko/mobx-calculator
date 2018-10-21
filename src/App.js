import React, { Component } from 'react';
import Button from './components/Button';
import Screen from './components/Screen';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="calculator">
          <Screen/>

          <Button class="number" symbol="C" />
          <Button class="number" symbol="+/-" />
          <Button class="number" symbol="%" />
          <Button class="button" symbol="/" />

          <Button class="number" symbol="7" />
          <Button class="number" symbol="8" />
          <Button class="number" symbol="9" />
          <Button class="button" symbol="*" />


          <Button class="number" symbol="4" />
          <Button class="number" symbol="5" />
          <Button class="number" symbol="6" />
          <Button class="button" symbol="-"/>

          <Button class="number" symbol="1" />
          <Button class="number" symbol="2" />
          <Button class="number" symbol="3" />
          <Button class="button" symbol="+"/>

          <Button class="number zero" symbol="0" />
          <Button class="number" symbol="." />
          <Button class="button" symbol="="/>
        </div>

    );
  }
}

export default App;
