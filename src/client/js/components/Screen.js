import React from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';

class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="screen">
            { this.props.children }
           </div>
  }
}

/*
Screen.propTypes = {
  data: PropTypes.Object
};*/

export default Screen;
