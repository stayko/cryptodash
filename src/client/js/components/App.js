import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Screen from './Screen';
import ScreenHolder from './ScreenHolder';
import DateTime from './DateTime';
import LineChart from 'react-linechart';

import '../../css/line.scss';
import '../../css/main.scss';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  fetchData() {

    fetch('http://localhost:8080/api')
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
    this.poll = setInterval(this.fetchData.bind(this), 48000);
  }

  componentWillUnmount() {
    clearInterval(this.poll);
  }

  renderLine(){
    let p = [];
    for(var i = 0; i < this.state.data.length; i++){
        p.push({x: i, y: parseInt(this.state.data[i].data[0].price)})
    }
    const data = [
			{
				color: "steelblue",
				points: p
			}
		];
    return <LineChart width={400} height={200} data={data} hidePoints={false} interpolate={'monotone'} hideXAxis={true} hideYAxis={true} />
  }
  render() {

    return <div>
              <Header/>
              <DateTime/>
              <ScreenHolder>
                <Screen>
                  {this.renderLine()}
                </Screen>
              </ScreenHolder>
           </div>;
  }
}

export default App;
