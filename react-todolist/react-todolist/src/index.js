import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import './index.css';


const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)


render(<Root />, document.getElementById('root'));
registerServiceWorker();
