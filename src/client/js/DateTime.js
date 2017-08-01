import React from 'react';
import ReactDOM from 'react-dom';

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    let d = Date();
    this.state = {dateTime: d};
  }

  tick() {
    let d = Date();
    this.setState({dateTime: d});
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>{this.state.dateTime}</div>
  }
}

export default DateTime;
