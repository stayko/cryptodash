import React from 'react';
import ReactDOM from 'react-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import PropTypes from 'prop-types';

class Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      change: 0,
      loading: true,
      name: null
    };
  }

  fetchData() {
    const apiUrl = 'https://api.coinmarketcap.com/v1/ticker/';

    fetch(apiUrl+this.props.crypto+'/')
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        this.setState({
            price: parseFloat(data[0].price_usd),
            loading:false,
            name: data[0].symbol
          });
      }.bind(this));
  }

  componentDidMount() {
    this.fetchData();
    this.poll = setInterval(this.fetchData.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.poll);
  }

  renderLoading(){
    return <div>Loading...</div>
  }

  renderData(){
    return this.state.name + this.state.price.toFixed(2);
  }

  render() {
    return <div className="screen">
            {this.state.loading ? this.renderLoading() : this.renderData()}
           </div>
  }
}

Screen.propTypes = {
  crypto: PropTypes.string
};

export default Screen;
