import React, { Component } from 'react';
import './App.css';

import Buckets from './Components/Buckets/Buckets';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Buckets/>
      </div>
    );
  }
}

export default App;
