import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Screen from './Screen';
import './main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
            <Header/>
              <div className="screen-holder">
                <Screen crypto="btc-gbp"/>
                <Screen crypto="eth-gbp"/>
                <Screen crypto="ltc-gbp"/>
              </div>
           </div>;
  }
}

ReactDOM.render(<App/>,document.getElementById('root'));
