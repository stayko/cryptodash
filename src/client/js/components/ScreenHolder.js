import React from 'react';
import ReactDOM from 'react-dom';

class ScreenHolder extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="screen-holder">
            { this.props.children }
           </div>
  }
}

export default ScreenHolder;
