import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Screen from './Screen';
import ScreenHolder from './ScreenHolder';
import DateTime from './DateTime';

import '../../css/main.scss';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const CONFIG = require('../../../../config');
const API_URL = CONFIG.ENV=='PROD' ? "/api" : "http://localhost:8080/api"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  fetchData() {
    fetch(API_URL)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        this.setState({ data: data, loading: false });
      }.bind(this));
  }

  componentDidMount() {
    this.fetchData();
    this.poll = setInterval(this.fetchData.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.poll);
  }

  render() {
    return <div>
              <Header/>
              <DateTime/>
              <ScreenHolder>
                {!this.state.loading ? this.state.data[0].data.map((item) => <Screen key={item.symbol} title={item.name} price={item.currentPrice} data={[{ color: "steelblue", points: item.data}]} />) : "Loading..." }
              </ScreenHolder>
           </div>;
  }
}

export default App;
