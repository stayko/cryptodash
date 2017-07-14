import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="header"><h1>Cryptodash</h1></div>;
  }
}

export default Header;
