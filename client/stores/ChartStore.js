const ChartActions = require('../actions/ChartActions');
const alt = require('../util/alt');

class ChartStore {
  constructor() {
    this.bindListeners({ setData: ChartActions.setData });

    this.state = { data: [] };
  }

  setData(data) {
    this.setState({ data });
  }
}

module.exports = alt.createStore(ChartStore, 'ChartStore');