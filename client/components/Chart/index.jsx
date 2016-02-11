import React, { Component, PropTypes } from 'react';
import createChart from './chart';
import { Button } from 'react-bootstrap';
import './chart.scss';

const propTypes = {
  points: PropTypes.array.isRequired,
};

class Chart extends Component {
  componentDidMount() {
    const chart = createChart('chart-container');
    chart.plot(this.props.points);
    this.chart = chart;
  }

  componentDidUpdate() {
    this.chart.plot(this.props.points);
  }

  render() {
    return (
      <div id="chart-container" />
    );
  }
}

Chart.propTypes = propTypes;
export default Chart;
