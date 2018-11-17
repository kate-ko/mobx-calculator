import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import CalculatorStore from './store/CalculatorStore';

const store = new CalculatorStore();

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
