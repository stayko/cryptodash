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
                <Screen/>
                <Screen/>
                <Screen/>
              </div>
           </div>;
  }
}

ReactDOM.render(<App/>,document.getElementById('root'));
