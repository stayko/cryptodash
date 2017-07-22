import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Screen from './Screen';
import '../css/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
            <Header/>
              <div className="screen-holder">
                <Screen crypto="bitcoin"/>
                <Screen crypto="ethereum"/>
                <Screen crypto="litecoin"/>
                <Screen crypto="ripple"/>
              </div>
           </div>;
  }
}

ReactDOM.render(<App/>,document.getElementById('root'));
