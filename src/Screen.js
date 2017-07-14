import React from 'react';
import ReactDOM from 'react-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      change: 0,
    };
  }

  componentDidMount() {
    
  }

  render() {
    return <div className="screen">{this.state.price}</div>
  }
}

export default Screen;
