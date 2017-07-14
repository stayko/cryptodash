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
    const apiUrl = 'https://api.cryptonator.com/api/full/';
        
    fetch(apiUrl+this.props.crypto)
    	.then(function(response) {
    		if (response.status >= 400) {
    			throw new Error("Bad response from server");
    		}
    		return response.json();
    	})
    	.then(function(data) {
    		this.setState({price: data.ticker.price});
    	}.bind(this));
  }

  render() {
    return <div className="screen">{this.state.price}</div>
  }
}

export default Screen;
