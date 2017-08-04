import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import LineChart from 'react-linechart';
import '../../css/line.scss';

class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="screen">
            <div>{this.props.title}</div>
            <div>{this.props.price}</div>
            <LineChart width={400} height={200} data={this.props.data} hidePoints={false} interpolate={'monotone'} hideXAxis={true} hideYAxis={true} />
           </div>
  }
}

Screen.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number
};

export default Screen;
