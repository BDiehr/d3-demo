import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';
import Chart from '../Chart';
import ChartStore from '../../stores/ChartStore';
import ChartActions from '../../actions/ChartActions';
import { Button } from 'react-bootstrap';

import moment from 'moment';
import _ from 'lodash';

class IndexComponent extends Component {
  randomizeData() {
    const range = _.range(0, 100);
    const data = range
      .map(n => moment().add(n, 'days').toDate())
      .map(n => ({
        date: n,
        y: Math.random() * 100,
      }));
    ChartActions.setData(data);
  }

  static getStores() {
    return [ChartStore];
  }

  static getPropsFromStores() {
    return ChartStore.getState();
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Button onClick={this.randomizeData}>Randomize Data</Button>
        <Chart points={data} />
      </div>
    );
  }
}

IndexComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default connectToStores(IndexComponent);
